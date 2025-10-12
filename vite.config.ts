import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
   // host: '192.168.190.60', // Set your desired IP address
   // port: 5175,             // Set your desired port
  open: true,             // Optional: Opens the browser automatically
  },
})
