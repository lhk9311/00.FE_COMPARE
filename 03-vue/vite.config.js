// React 예제의 vite.config.js와 비교해보면 플러그인 한 줄만 다르다.
// → Vite는 프레임워크와 상관없는 "빌드 도구"라는 뜻
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // .vue 파일(SFC)을 해석해주는 플러그인

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5174, // React 예제랑 동시에 띄워도 안 겹치게
    // proxy: { '/api': 'http://localhost:8080' },
  },
});
