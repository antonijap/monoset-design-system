import { Suspense, lazy } from 'react';
import { usePlatform } from '../lib/platform.jsx';

/**
 * Wraps a Preview slot. Shows the web children when the platform toggle is "react",
 * and lazy-loads the native demo (rendered via react-native-web) when it's "native".
 *
 * Usage on a doc page:
 *
 *   <PlatformPreview
 *     web={<Button variant="primary">Save</Button>}
 *     native="ButtonDemo"
 *   />
 *
 * The `native` prop is a key into the NATIVE_DEMOS map (see ./native-demos/).
 */

// Lazy chunk for the entire native preview surface so the web bundle
// doesn't pay for it unless someone toggles to Native.
const NativeSurface = lazy(() => import('./NativeSurface.jsx'));

function PreviewShell({ bg = 'var(--bg-subtle)', children }) {
  return (
    <div data-ms="preview" style={{ border:'1px solid var(--border-subtle)', borderRadius:8, overflow:'hidden', marginBottom:16 }}>
      <div data-ms="preview-stage" style={{ padding:'28px 24px', background:bg, display:'flex', alignItems:'center', justifyContent:'center', flexWrap:'wrap', gap:10 }}>
        {children}
      </div>
    </div>
  );
}

export function PlatformPreview({ web, native, bg }) {
  const { platform } = usePlatform();
  if (platform === 'native' && native) {
    return (
      <PreviewShell bg={bg}>
        <Suspense fallback={<div style={{ fontSize:12, color:'var(--fg3)' }}>Loading native preview…</div>}>
          <NativeSurface demoKey={native}/>
        </Suspense>
      </PreviewShell>
    );
  }
  return <PreviewShell bg={bg}>{web}</PreviewShell>;
}
