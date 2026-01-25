import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Vavnota-React/',  // Change 'Vavnota-React' to your repository name
  server: {
  },
})
