import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // 꼭 이 값을 설정해야 Netlify에서 정적 자산 경로를 제대로 인식함
});
