import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
const BACKEND_PORT = process.env.BACKEND_PORT || 2000;
export default defineConfig({
  plugins: [react()],
});
