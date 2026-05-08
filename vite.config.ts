import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
   build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        consultation: path.resolve(__dirname, 'consultation.html'),
        survey: path.resolve(__dirname, 'survey.html'),
        privacy: path.resolve(__dirname, 'privacy.html'),
        faq: path.resolve(__dirname, 'faq.html'),
      },
    },
  },
});
