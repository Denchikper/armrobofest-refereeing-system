import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.1.99', // ваш IP адрес
    port: 5173, // ваш порт
    strictPort: true, // не искать свободный порт, если занят
    open: false,
    cors: true // не открывать браузер автоматически
  }
})
