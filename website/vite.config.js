import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const liveDist = (p) => fileURLToPath(new URL(p, import.meta.url))

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
    alias: [
      // react-native-svg pulls this Flow-typed RN internal; the docs never load
      // native image assets on web, so stub it to keep the bundle Flow-free.
      { find: '@react-native/assets-registry/registry', replacement: liveDist('./src/shims/assets-registry.js') },
      // Bundle the live workspace build of @monoset/native (pnpm materializes "*"
      // workspace deps as a cached copy that can go stale after a local rebuild).
      { find: '@monoset/native', replacement: liveDist('../packages/native/dist/index.js') },
      // Same staleness fix for the tokens CSS (it ships as source, no build step).
      { find: '@monoset/tokens/css', replacement: liveDist('../packages/tokens/src/colors_and_type.css') },
      // Exact 'react-native' goes through our shim so Modal portals into the
      // PhonePreview frame instead of covering the whole site.
      { find: /^react-native$/, replacement: liveDist('./src/shims/react-native.js') },
      // Subpath imports (react-native/Libraries/...) still map to react-native-web.
      { find: 'react-native', replacement: 'react-native-web' },
    ],
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
