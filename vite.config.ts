import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    sitemap({
  hostname: 'https://zvychaika.com',
  generateRobotsTxt: true,
    }),
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    }
  }
})
