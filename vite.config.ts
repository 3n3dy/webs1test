import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    sitemap({
      hostname: "https://zvychaika.com",
      dynamicRoutes: ["/", "/consultation.html", "/survey.html"],
      changefreq: "weekly",
      priority: 1.0,
      lastmod: new Date(),
      readable: true,
      exclude: ["/404", "/googledf8d5994ec777781"], // ← виключити обидва
      robots: [
        {
          userAgent: "*",
          allow: "/",
        },
        {
          userAgent: "GPTBot",
          disallow: "/",
        },
        {
          userAgent: "ChatGPT-User",
          disallow: "/",
        },
        {
          userAgent: "CCBot",
          disallow: "/",
        },
      ],
    }),
  ],
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
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'modals': [
            './src/components/MultiStepFormModal',
            './src/components/ContactModal',
            './src/components/AboutAuthorModal'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});
