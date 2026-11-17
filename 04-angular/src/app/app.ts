// Angular 컴포넌트 = TypeScript 클래스 + 데코레이터(@Component)
// Spring에서 @Controller 붙인 클래스랑 생김새가 제일 비슷하다.
// 실무에서는 Vue의 3블록을 "파일 3개"로 쪼갠다: app.ts(로직) / app.html(화면) / app.css(스타일)

import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // [(ngModel)] 양방향 바인딩을 쓰려면 필요

// TypeScript: 타입을 명시한다 (Java의 DTO/VO 클래스 같은 것)
interface Todo {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-root',          // index.html의 <app-root></app-root> 태그 자리에 그려짐
  imports: [FormsModule],        // 이 컴포넌트에서 쓸 모듈 (Spring의 의존성 주입 느낌)
  templateUrl: './app.html',     // 화면 (Vue의 <template>)
  styleUrl: './app.css',         // 스타일 (Vue의 <style scoped>, 기본으로 이 컴포넌트에만 적용)
})
export class App {
  // ===== 1. 데이터(상태) =====
  // signal(): 최신 Angular의 반응형 값 (React useState / Vue ref 와 같은 역할)
  // 읽을 때: todos()   바꿀 때: todos.set(...) 또는 todos.update(...)
  todos = signal<Todo[]>([
    { id: 1, title: 'DOM 개념 정리', done: true },
    { id: 2, title: 'Vite 정리', done: false },
  ]);
  title = ''; // ngModel로 입력창과 묶는 값 (일반 필드도 바인딩 가능)
  private nextId = 3;

  // computed: Vue의 computed와 똑같은 개념. todos가 바뀌면 자동 재계산
  remain = computed(() => this.todos().filter(t => !t.done).length);

  // ===== 2. Create =====
  addTodo(): void {
    const title = this.title.trim();
    if (!title) {
      alert('할 일을 입력하세요');
      return;
    }
    // update: 이전 값을 받아서 새 값을 돌려준다 (React처럼 새 배열 생성 방식)
    this.todos.update(list => [...list, { id: this.nextId++, title, done: false }]);
    this.title = '';
  }

  // ===== 3. Update =====
  toggleTodo(id: number): void {
    this.todos.update(list => list.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  editTodo(todo: Todo): void {
    const newTitle = prompt('수정할 내용', todo.title);
    if (newTitle && newTitle.trim()) {
      this.todos.update(list =>
        list.map(t => (t.id === todo.id ? { ...t, title: newTitle.trim() } : t))
      );
    }
  }

  // ===== 4. Delete =====
  deleteTodo(id: number): void {
    this.todos.update(list => list.filter(t => t.id !== id));
  }
}

/*
  [실무 메모] Angular는 서버 통신을 "서비스 클래스"로 분리하고 주입받는 게 정석이다.
  → Spring의 @Service + 생성자 주입이랑 구조가 거의 똑같아서 Java 개발자가 적응이 빠른 편.

  // todo.service.ts
  @Injectable({ providedIn: 'root' })        // ≒ @Service
  export class TodoService {
    private http = inject(HttpClient);       // ≒ @Autowired
    findAll() { return this.http.get<Todo[]>('/api/todos'); }
    save(title: string) { return this.http.post<Todo>('/api/todos', { title }); }
  }

  // app.ts
  private todoService = inject(TodoService);
  ngOnInit() {                               // 화면 처음 뜰 때 (Vue onMounted, React useEffect)
    this.todoService.findAll().subscribe(list => this.todos.set(list));
  }
  ※ app.config.ts 의 providers 에 provideHttpClient() 추가 필요
*/
