import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    sitemap({
      hostname: 'https://zvychaika.com',
      dynamicRoutes: ['/', '/survey.html'],  // ← додав опитування
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date(),
      readable: true,
      exclude: ['/404', '/googledf8d5994ec777781'],
      robots: [
        {
          userAgent: '*',
          allow: '/',
        },
        {
          userAgent: 'GPTBot',
          disallow: '/',
        },
        {
          userAgent: 'ChatGPT-User',
          disallow: '/',
        },
        {
          userAgent: 'CCBot',
          disallow: '/',
        },
      ],
    }),
  ],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
  // ← ДОДАТИ ЦЕ:
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        survey: resolve(__dirname, 'survey.html'),
      },
    },
  },
})
