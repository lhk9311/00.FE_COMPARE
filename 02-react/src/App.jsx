import { useState } from 'react';

// 컴포넌트 = 화면 조각을 만드는 "함수". return 하는 JSX가 화면이 된다.
export default function App() {
  // ===== 1. 데이터(상태) =====
  // useState: "이 값이 바뀌면 화면을 다시 그려줘"라고 React에 등록하는 것
  // [값, 값을바꾸는함수] 쌍으로 받는다. 값을 직접 수정(todos.push)하면 화면이 안 바뀐다!
  const [todos, setTodos] = useState([
    { id: 1, title: 'DOM 개념 정리', done: true },
    { id: 2, title: 'Vite 정리', done: false },
  ]);
  const [title, setTitle] = useState('');   // 입력창 값
  const [nextId, setNextId] = useState(3);  // 시퀀스

  // 파생 값: 상태로 따로 안 두고 매번 계산 (바닐라처럼 직접 넣어줄 필요 없음)
  const remain = todos.filter(t => !t.done).length;

  // ===== 2. Create =====
  const addTodo = () => {
    if (!title.trim()) return alert('할 일을 입력하세요');
    // ★ 기존 배열을 고치지 않고 "새 배열"을 만들어 넘긴다 (불변성)
    //   React는 "참조가 바뀌었나?"로 변경을 감지하기 때문
    setTodos([...todos, { id: nextId, title: title.trim(), done: false }]);
    setNextId(nextId + 1);
    setTitle('');
    // render() 호출이 없다! setTodos만 하면 React가 알아서 다시 그림 ← 바닐라와의 핵심 차이
  };

  // ===== 3. Update =====
  const toggleTodo = (id) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const editTodo = (id) => {
    const target = todos.find(t => t.id === id);
    const newTitle = prompt('수정할 내용', target.title);
    if (newTitle && newTitle.trim()) {
      setTodos(todos.map(t => (t.id === id ? { ...t, title: newTitle.trim() } : t)));
    }
  };

  // ===== 4. Delete =====
  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  // ===== 5. 화면 (JSX) =====
  // HTML처럼 보이지만 JS다. {} 안에 JS 표현식을 넣는다.
  // class 대신 className, onclick 대신 onClick (카멜케이스)
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 480, margin: '40px auto' }}>
      <h1>할 일 (React)</h1>

      {/* 양방향 바인딩이 기본이 아님: value + onChange 를 직접 연결해야 함 (Vue의 v-model과 비교) */}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyUp={e => e.key === 'Enter' && addTodo()}
        placeholder="할 일을 입력하고 Enter"
      />
      <button onClick={addTodo}>추가</button>

      <p>남은 할 일: {remain} / 전체 {todos.length}</p>

      <ul style={{ padding: 0 }}>
        {/* 반복은 배열의 map으로. key는 React가 "어느 항목이 바뀌었는지" 추적하는 ID (DB의 PK 같은 것) */}
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', gap: 8, margin: '4px 0' }}>
            <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
            {/* 조건부 스타일도 JS 삼항연산자로 */}
            <span style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => editTodo(todo.id)}>수정</button>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
  [실무 메모] 서버 연동하면 보통 이렇게 쓴다
  import { useEffect } from 'react';
  import axios from 'axios';

  // 컴포넌트가 처음 화면에 뜰 때 1번 실행 (빈 배열 [] = 최초 1회)
  useEffect(() => {
    axios.get('/api/todos').then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    const res = await axios.post('/api/todos', { title });
    setTodos([...todos, res.data]); // 서버가 돌려준 id 포함 객체를 추가
  };
*/
