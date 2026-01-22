import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext"
  },
  plugins: [],
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
      supported: {
        "top-level-await": true
      }
    }
  }
});
