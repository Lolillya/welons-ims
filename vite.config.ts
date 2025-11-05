import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: [
      // Match imports starting with `@/` and replace with absolute `src/` path
      { find: /^@\//, replacement: path.resolve(__dirname, "./src") + "/" },
      // Also allow bare `@` -> `src` if someone imports exactly `@`
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
});
