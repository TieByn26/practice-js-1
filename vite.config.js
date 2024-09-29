import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    build: {
      target: "esnext",
    },
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "api":"http://localhost:3000",
    }
  }
});
