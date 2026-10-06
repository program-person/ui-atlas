import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 相対パスならローカルとPagesのリポジトリ配下を同じビルドで確認できる。
  base: './',
  build: { emptyOutDir: false },
});
