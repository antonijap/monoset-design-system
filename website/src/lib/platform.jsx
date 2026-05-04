import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Platform toggle. "react" shows the web kit (@monoset/react),
 * "native" shows the native kit (@monoset/native via react-native-web).
 *
 * Persisted in localStorage so the toggle sticks across navigation.
 */

const PlatformCtx = createContext(null);

export function PlatformProvider({ children }) {
  const [platform, setPlatform] = useState(() => {
    try {
      return localStorage.getItem('monoset-platform') === 'native' ? 'native' : 'react';
    } catch {
      return 'react';
    }
  });

  useEffect(() => {
    try { localStorage.setItem('monoset-platform', platform); } catch {}
  }, [platform]);

  return (
    <PlatformCtx.Provider value={{ platform, setPlatform }}>
      {children}
    </PlatformCtx.Provider>
  );
}

export function usePlatform() {
  const ctx = useContext(PlatformCtx);
  if (!ctx) return { platform: 'react', setPlatform: () => {} };
  return ctx;
}
