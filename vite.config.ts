import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 
import path from 'path'

export default defineConfig({
  base : '/',
  plugins: [
    RubyPlugin(),
    react(),
    svgr()
  ],
  build: {
  	rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'app/frontend/entrypoints/home.tsx')
      }
    },
    outDir: 'public',
    emptyOutDir: true
  }
})
