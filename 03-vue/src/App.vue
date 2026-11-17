<!--
  Vue SFC(Single File Component) = template / script / style 3블록
  React 예제(App.jsx)와 나란히 띄워놓고 보면 차이가 잘 보인다.
-->

<!-- ===== 1. script: 데이터와 로직 ===== -->
<script setup>
import { ref, computed } from 'vue';

// ref(): "이 값이 바뀌면 화면 다시 그려줘" 등록 (React의 useState와 같은 역할)
// 차이점: React는 setTodos()로 바꿔야 하지만, Vue는 .value 를 그냥 고치면 된다.
const todos = ref([
  { id: 1, title: 'DOM 개념 정리', done: true },
  { id: 2, title: 'Vite 정리', done: false },
]);
const title = ref('');
let nextId = 3; // 화면에 안 보이는 값은 ref 안 써도 됨

// computed: 다른 상태로부터 계산되는 값. todos가 바뀔 때만 다시 계산 (캐싱됨)
const remain = computed(() => todos.value.filter(t => !t.done).length);

// ===== Create =====
function addTodo() {
  if (!title.value.trim()) return alert('할 일을 입력하세요');
  // ★ React와 비교: 새 배열 안 만들고 push 해도 화면이 바뀐다 (Vue가 변경을 감시하고 있음)
  //   → JPA 더티체킹이랑 가장 비슷한 느낌
  todos.value.push({ id: nextId++, title: title.value.trim(), done: false });
  title.value = '';
}

// ===== Update =====
// 체크박스 토글은 template의 v-model이 알아서 해서 함수가 필요 없다!
function editTodo(todo) {
  const newTitle = prompt('수정할 내용', todo.title);
  if (newTitle && newTitle.trim()) {
    todo.title = newTitle.trim(); // 객체 속성을 직접 바꿔도 반영됨
  }
}

// ===== Delete =====
function deleteTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id);
}

// script 안에서는 todos.value 로 쓰지만, template 안에서는 .value 없이 todos 로 쓴다 (자동으로 풀어줌)
</script>

<!-- ===== 2. template: 화면 구조 (HTML에 Vue 문법 추가) ===== -->
<template>
  <div class="wrap">
    <h1>할 일 (Vue)</h1>

    <!-- v-model: 양방향 바인딩. 입력하면 title이 바뀌고, title을 바꾸면 입력창도 바뀜
         React에서는 value + onChange 두 개로 했던 걸 한 번에 -->
    <!-- @keyup.enter: 엔터 키만 골라 받는 수식어 (React는 e.key === 'Enter' 직접 검사) -->
    <input v-model="title" @keyup.enter="addTodo" placeholder="할 일을 입력하고 Enter" />
    <!-- @click 은 v-on:click 의 줄임말 -->
    <button @click="addTodo">추가</button>

    <!-- {{ }} : 머스태시 문법. 값을 화면에 출력 (Thymeleaf의 th:text, JSP의 ${} 같은 것) -->
    <p>남은 할 일: {{ remain }} / 전체 {{ todos.length }}</p>

    <ul>
      <!-- v-for: 반복 (JSTL의 c:forEach 와 거의 같다). :key 는 React의 key와 같은 역할 -->
      <!-- :class 는 v-bind:class 의 줄임말. 조건에 따라 클래스 붙이기 -->
      <li v-for="todo in todos" :key="todo.id" :class="{ done: todo.done }">
        <input type="checkbox" v-model="todo.done" />
        <span>{{ todo.title }}</span>
        <button @click="editTodo(todo)">수정</button>
        <button @click="deleteTodo(todo.id)">삭제</button>
      </li>
    </ul>

    <!-- 조건부 렌더링: v-if (JSTL의 c:if) -->
    <p v-if="todos.length === 0">할 일이 없습니다.</p>
  </div>
</template>

<!-- ===== 3. style: 꾸미기 ===== -->
<!-- scoped: 이 컴포넌트 안에만 적용 (다른 화면의 li에는 영향 X) -->
<style scoped>
.wrap { font-family: sans-serif; max-width: 480px; margin: 40px auto; }
ul { padding: 0; }
li { display: flex; gap: 8px; align-items: center; margin: 4px 0; }
li span { flex: 1; }
li.done span { text-decoration: line-through; color: #999; }
</style>

<!--
  [실무 메모] 서버 연동
  import { onMounted } from 'vue';
  import axios from 'axios';

  onMounted(async () => {               // 화면이 처음 뜰 때 (React의 useEffect(..., []))
    const res = await axios.get('/api/todos');
    todos.value = res.data;
  });
-->
