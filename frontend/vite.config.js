import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({ 
      gifsicle: { optimizationLevel: 3 },
      mozjpeg: { quality: 70 },
      pngquant: { quality: [0.7, 0.9] },
      svgo: { plugins: [{ removeViewBox: false }] }
    })
  ],
    server: {
    host: true 
  },
   preview: {
    host: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./public', import.meta.url))
    }
  },
  build: {
    assetsInlineLimit: 10240,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  }
})