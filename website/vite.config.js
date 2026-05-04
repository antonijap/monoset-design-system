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
    dedupe: ['react', 'react-dom', 'react-native', 'react-native-web'],
    alias: {
      // Render @monoset/native components on the web via react-native-web.
      'react-native': 'react-native-web',
    },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  define: {
    // react-native-web's Animated code references Node globals.
    global: 'globalThis',
    __DEV__: 'false',
    'process.env.JEST_WORKER_ID': 'undefined',
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
