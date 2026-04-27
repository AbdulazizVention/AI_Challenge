import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed on Vercel at the domain root; no base path override needed.
export default defineConfig({
  plugins: [react()],
})
