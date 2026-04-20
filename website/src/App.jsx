import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PAGE_META } from './pages/docs-meta.js';
import CommandPalette from './components/CommandPalette.jsx';

// Route-level code splitting. Landing and DocsShell each ship as a separate
// chunk, so `/` and `/<docs-page>` only load the code they need.
const Landing = lazy(() => import('./pages/Landing.jsx'));
const DocsShell = lazy(() => import('./pages/DocsShell.jsx'));

/* ─── TWEAKS PANEL ───────────────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#09090b",
  "bodySize": 14,
  "defaultRadius": 6
}/*EDITMODE-END*/;

function TweaksPanel({ visible, tweaks, setTweaks }) {
  if (!visible) return null;
  const update = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    if (k === "accentColor") document.documentElement.style.setProperty("--mono-1000", v);
    if (k === "bodySize") document.documentElement.style.setProperty("--text-base", v + "px");
    if (k === "defaultRadius") document.documentElement.style.setProperty("--radius-md", v + "px");
    window.parent.postMessage({ type:"__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };
  return (
    <div style={{ position:"fixed", bottom:20, right:20, zIndex:1300, background:"var(--bg)",
                  border:"1px solid var(--border)", borderRadius:10, padding:18,
                  boxShadow:"var(--shadow-xl)", width:240, display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ fontSize:12, fontWeight:600, borderBottom:"1px solid var(--border-subtle)", paddingBottom:10 }}>Tweaks</div>
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        <label style={{ fontSize:11, color:"var(--fg3)" }}>Accent color</label>
        <div style={{ display:"flex", gap:6 }}>
          {["#09090b","#1d4ed8","#15803d","#7c3aed","#be185d"].map(c=>(
            <button key={c} onClick={()=>update("accentColor",c)}
              style={{ width:24, height:24, borderRadius:"50%", background:c, border:`2px solid ${tweaks.accentColor===c?"var(--fg1)":"transparent"}`, cursor:"pointer" }}/>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        <label style={{ fontSize:11, color:"var(--fg3)" }}>Body size: {tweaks.bodySize}px</label>
        <input type="range" min={12} max={18} value={tweaks.bodySize} onChange={e=>update("bodySize",+e.target.value)}
          style={{ width:"100%", accentColor:"var(--mono-1000)" }}/>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        <label style={{ fontSize:11, color:"var(--fg3)" }}>Default radius: {tweaks.defaultRadius}px</label>
        <input type="range" min={0} max={14} value={tweaks.defaultRadius} onChange={e=>update("defaultRadius",+e.target.value)}
          style={{ width:"100%", accentColor:"var(--mono-1000)" }}/>
      </div>
    </div>
  );
}

/* ─── APP ROOT ───────────────────────────────────────────────────── */
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const slug = location.pathname.slice(1);
  const screen = slug ? "docs" : "home";
  const page = PAGE_META[slug] ? slug : "introduction";

  const [tweaksVisible, setTweaksVisible] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);

  // Iframe-editor message bridge. Listener is cleaned up on unmount.
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === "__activate_edit_mode") setTweaksVisible(true);
      if (e.data?.type === "__deactivate_edit_mode") setTweaksVisible(false);
    };
    window.addEventListener("message", handler);
    if (window.parent !== window) {
      try {
        window.parent.postMessage({ type: "__edit_mode_available" }, "*");
      } catch {}
    }
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--mono-1000", tweaks.accentColor);
    root.style.setProperty("--text-base", tweaks.bodySize + "px");
    root.style.setProperty("--radius-md", tweaks.defaultRadius + "px");
  }, [tweaks.accentColor, tweaks.bodySize, tweaks.defaultRadius]);

  useEffect(() => {
    if (screen === "home") {
      document.title = "Monoset. A minimal, monotone, unopinionated design system";
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", "https://monoset.design/");
    }
  }, [screen]);

  return (
    <>
      <Suspense fallback={<div style={{ minHeight:"100vh" }}/>}>
        {screen === "docs"
          ? <DocsShell page={page} setPage={p => navigate(`/${p}`)} onHome={() => navigate("/")}/>
          : <Landing onStart={p => navigate(`/${p}`)}/>}
      </Suspense>
      <CommandPalette/>
      <TweaksPanel visible={tweaksVisible} tweaks={tweaks} setTweaks={setTweaks}/>
    </>
  );
}

export default App;
