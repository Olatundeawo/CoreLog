import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.wasm"], // optional, helps bundler know to include wasm
  server: {
    port: 5175, // optional, whatever port you use
  },
});

