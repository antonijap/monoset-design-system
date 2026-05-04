import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MonosetProvider } from '@monoset/react'

// Preload the two most-used fonts so they race the CSS, not wait for it.
// `?url` returns Vite's hashed production URL; @fontsource stores files under /files/.
import interUrl from '@fontsource/inter/files/inter-latin-400-normal.woff2?url'
import jbMonoUrl from '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2?url'
for (const href of [interUrl, jbMonoUrl]) {
  const l = document.createElement('link')
  l.rel = 'preload'
  l.as = 'font'
  l.type = 'font/woff2'
  l.href = href
  l.crossOrigin = 'anonymous'
  document.head.appendChild(l)
}

// Self-hosted fonts — Latin subsets, only the weights we actually use
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import '@fontsource/jetbrains-mono/latin-600.css'

import '@monoset/tokens/css'
import '@monoset/react/styles.css'
import './index.css'
import App from './App.jsx'
import { PlatformProvider } from './lib/platform.jsx'
import { initAnalytics } from './lib/analytics.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MonosetProvider>
        <PlatformProvider>
          <App />
        </PlatformProvider>
      </MonosetProvider>
    </BrowserRouter>
  </StrictMode>,
)

// Kick off analytics on idle so it never blocks first paint.
initAnalytics()
