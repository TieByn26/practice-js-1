import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        target: 'https://order-app-ddpz.onrender.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
