import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path for GitHub Pages: served at https://<user>.github.io/AI_Chalange_2/
export default defineConfig({
  plugins: [react()],
  base: '/AI_Chalange_2/',
})
