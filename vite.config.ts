import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base : '/',
  plugins: [
    RubyPlugin(),
    react(),
  ],
})