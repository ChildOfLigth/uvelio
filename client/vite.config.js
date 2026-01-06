import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/uvelio/',
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/components/pages'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
      '@imgs': path.resolve(__dirname, 'src/assets/imgs'),
    },
  },
  plugins: [react(), tailwindcss()],
})
