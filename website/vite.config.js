import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '19' }]],
      },
    }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    cssMinify: 'lightningcss',
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('react-router')) return 'react-vendor';
            if (id.includes('/react/') || id.includes('/react-dom/')) return 'react-vendor';
          }
        },
      },
    },
  },
})
