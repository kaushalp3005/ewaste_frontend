import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The SPA calls the API with relative /api/... paths.
// - Dev: Vite proxies /api to the backend below (set VITE_API_URL to your local
//   or Render backend; defaults to http://localhost:3000).
// - Production (Vercel): add a rewrite that forwards /api/* to your backend
//   (see README.md / vercel.json).
const API_TARGET = process.env.VITE_API_URL || "http://localhost:3000";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": { target: API_TARGET, changeOrigin: true },
    },
  },
  build: {
    outDir: "dist",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
    },
  },
});
