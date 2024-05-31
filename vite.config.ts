import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 

export default defineConfig({
  base : '/',
  plugins: [
    RubyPlugin(),
    react(),
    svgr()
  ],
  build: {
  	outDir: 'public/vite'
  }
})
