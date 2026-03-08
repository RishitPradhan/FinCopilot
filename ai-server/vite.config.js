import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/ai-server/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist'
  }
})
