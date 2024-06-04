import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 
import path from 'path'
import { env } from 'process'

export default defineConfig({
  base : '/',
  plugins: [
    RubyPlugin(),
    react(),
    svgr(),
  ],
  build: {
  	rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'app/frontend/entrypoints/home.tsx')
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['axios', 'moment', 'styled-components', 'react-router-dom', 'react-icons', 'web-vitals', 'xlsx']
        }
      }
    },
    outDir: 'public',
    emptyOutDir: true,
  },
  define: {
    'process.env': {
      VITE_API_URL: JSON.stringify(env.VITE_API_URL)
    }
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
