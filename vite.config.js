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
});