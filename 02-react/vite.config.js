// Vite 설정 파일 (백엔드의 application.yml 같은 위치)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // JSX 문법을 브라우저가 읽을 수 있는 JS로 바꿔주는 플러그인
  plugins: [react()],

  server: {
    port: 5173, // npm run dev 했을 때 뜨는 포트 (Spring의 server.port)

    // [실무 메모] Spring 백엔드(8080)랑 붙일 때 CORS 피하는 설정
    // 프론트에서 fetch('/api/todos') 하면 → http://localhost:8080/api/todos 로 대신 보내줌
    // proxy: {
    //   '/api': 'http://localhost:8080',
    // },
  },
});
