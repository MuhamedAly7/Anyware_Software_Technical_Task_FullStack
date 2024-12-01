import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api":
        "https://anyware-software-technical-task-full-stack-ojeqdr3bj.vercel.app",
    },
  },
  plugins: [react()],
});
