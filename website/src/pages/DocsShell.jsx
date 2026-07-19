import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EASE_STANDARD, EASE_EMPHASIS, EASE_EXIT, DUR,
  Icon,
} from '../ui/docs.jsx';
import { PAGE_META } from './docs-meta.js';
import { NATIVE_PAGE_META } from './native-meta.js';
import { NAV, NATIVE_NAV } from './docs-navigation.js';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { usePlatform } from '../lib/platform.jsx';
import { NATIVE_VERSION, REACT_VERSION } from '../version.js';

const DocsContent = lazy(() => import('./react-docs/docs.jsx'));
const NativeDocsContent = lazy(() => import('./native-docs.jsx'));

function Sidebar({ active, setPage, mobile = false, compact = false, onClose, nav = NAV }) {
  const className = [
    "ms-docs-nav",
    compact && "ms-docs-nav--compact",
    mobile && "ms-docs-nav--mobile",
  ].filter(Boolean).join(" ");

  return (
    <nav aria-label="Documentation" className={className}>
      {mobile && (
        <>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                        padding:"0 20px 16px", borderBottom:"1px solid var(--border-subtle)" }}>
            <span style={{ fontSize:14, fontWeight:600 }}>Docs</span>
            <button type="button" aria-label="Close documentation navigation" onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--fg2)",padding:4 }}>
              <Icon name="x" size={18}/>
            </button>
          </div>
          <div style={{ padding:"12px 20px", borderBottom:"1px solid var(--border-subtle)" }}>
            <PlatformToggle dataMs="docs-platform-mobile" fullWidth/>
          </div>
        </>
      )}
      {nav.map(group => (
        <div key={group.section} className="ms-docs-nav__group">
          <div className="ms-docs-nav__section">{group.section}</div>
          {group.items.map(item => (
            <a key={item.id} data-nav-id={item.id} href={`/${item.id}`} aria-current={active===item.id ? "page" : undefined}
              onClick={(event) => { event.preventDefault(); setPage(item.id); if(onClose) onClose(); }}
              className="ms-docs-nav__item">
              {item.label}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}

function PlatformToggle({ dataMs = "docs-platform", fullWidth = false }) {
  const { platform, setPlatform } = usePlatform();
  return (
    <div
      role="group"
      aria-label="Platform"
      data-ms={dataMs}
      className={`ms-platform-toggle${fullWidth ? " ms-platform-toggle--full-width" : ""}`}
    >
      {[["react","React"],["native","Native"]].map(([k,label]) => (
        <button
          key={k}
          type="button"
          aria-pressed={platform===k}
          onClick={() => setPlatform(k)}
          className={`ms-platform-toggle__segment${platform===k ? " ms-platform-toggle__segment--active" : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function NativeBanner() {
  const { platform, setPlatform } = usePlatform();
  if (platform !== 'native') return null;
  return (
    <div role="status" style={{
      display:"flex", alignItems:"center", gap:10,
      padding:"10px 14px", marginBottom:24,
      background:"var(--bg-subtle)", border:"1px solid var(--border-subtle)", borderRadius:8,
      fontSize:12, color:"var(--fg2)" }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--fg1)" }}/>
      <span style={{ flex:1 }}>
        <strong style={{ color:"var(--fg1)", fontWeight:500 }}>React Native mode.</strong>{" "}
        Supported previews re-render via <code style={{ fontFamily:"var(--font-mono)", fontSize:11 }}>react-native-web</code>.
      </span>
      <button type="button" onClick={() => setPlatform('react')} style={{
        background:"none", border:"none", cursor:"pointer", color:"var(--fg3)",
        fontSize:11, padding:"4px 8px", borderRadius:4, fontFamily:"inherit" }}>
        Switch back
      </button>
    </div>
  );
}

export default function DocsLayout({ page, setPage, onHome }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const contentRef = useRef(null);
  const { platform } = usePlatform();
  const isNative = platform === 'native';
  const meta = isNative ? NATIVE_PAGE_META : PAGE_META;
  const nav  = isNative ? NATIVE_NAV : NAV;
  const Content = isNative ? NativeDocsContent : DocsContent;
  const version = isNative ? NATIVE_VERSION : REACT_VERSION;
  const versionHref = isNative
    ? "https://www.npmjs.com/package/@monoset/native"
    : "https://www.npmjs.com/package/@monoset/react";
  const versionLabel = `View ${isNative ? "@monoset/native" : "@monoset/react"} on npm`;
  // If the current slug has no entry in this platform's meta, fall back to introduction.
  const safePage = meta[page] ? page : 'introduction';

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    const m = meta[safePage];
    if (m) {
      document.title = `${m.title} · Monoset${isNative ? ' Native' : ''}`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", m.desc);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", `${m.title} · Monoset${isNative ? ' Native' : ''}`);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", m.desc);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", `https://monoset.design/${safePage}`);
    }
  }, [safePage, isNative, meta]);

  return (
    <div data-ms="docs-layout" style={{ height:"100vh", display:"flex", flexDirection:"column", background:"var(--bg)", color:"var(--fg1)" }}>
      <header data-ms="docs-header" style={{ height:60, borderBottom:"1px solid var(--border-subtle)", background:"var(--bg)",
                       display:"flex", alignItems:"center", padding:"0 24px", gap:12, flexShrink:0, zIndex:100 }}>
        <button type="button" onClick={onHome} style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none",
                                          cursor:"pointer", padding:0, fontFamily:"inherit" }}>
          <img src="/assets/monoset-mark.svg" width="22" height="22" alt=""/>
          <span style={{ fontSize:15, fontWeight:600, letterSpacing:"-0.01em", color:"var(--fg1)" }}>Monoset</span>
        </button>
        <span data-ms="docs-breadcrumb" style={{ display:"inline-flex", alignItems:"center", gap:12 }}>
          <span style={{ color:"var(--border)", fontSize:18, fontWeight:300 }}>/</span>
          <span style={{ fontSize:13, color:"var(--fg3)" }}>Docs</span>
        </span>
        <a
          href={versionHref}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={versionLabel}
          data-ms="docs-version"
          style={{ marginLeft:4, fontSize:11, fontWeight:500, color:"var(--fg3)",
                   background:"var(--bg-subtle)", border:"1px solid var(--border-subtle)",
                   borderRadius:999, padding:"2px 8px", textDecoration:"none", lineHeight:1.4,
                   transition:"color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard)" }}
          onMouseEnter={e => { e.currentTarget.style.color="var(--fg1)"; e.currentTarget.style.background="var(--bg-muted)"; }}
          onMouseLeave={e => { e.currentTarget.style.color="var(--fg3)"; e.currentTarget.style.background="var(--bg-subtle)"; }}>
          {version}
        </a>
        <div style={{ marginLeft:"auto", display:"flex", gap:8, alignItems:"center" }}>
          <PlatformToggle/>
          <button data-ms="docs-search" type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("monoset:open-palette"))}
            aria-label="Open command palette (Cmd K)"
            style={{ display:"inline-flex", alignItems:"center", gap:8,
              fontFamily:"inherit", fontSize:12, padding:"6px 8px 6px 10px",
              border:"1px solid var(--border)", borderRadius:6, background:"var(--bg-subtle)", color:"var(--fg3)",
              cursor:"pointer", width:220, justifyContent:"space-between" }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:8 }}>
              <Icon name="search" size={13}/>
              Search docs…
            </span>
            <kbd style={{ fontFamily:"var(--font-mono)", fontSize:10, background:"var(--bg)",
              color:"var(--fg3)", border:"1px solid var(--border-subtle)", borderRadius:3, padding:"1px 5px", lineHeight:1 }}>⌘K</kbd>
          </button>
          <a
            href="https://github.com/antonijap/monoset-design-system"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View on GitHub"
            title="View on GitHub"
            data-ms="docs-github"
            style={{ width:30, height:30, display:"inline-flex", alignItems:"center", justifyContent:"center",
                     background:"transparent", border:"1px solid var(--border)", borderRadius:6,
                     color:"var(--fg2)", textDecoration:"none",
                     transition:"color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard)" }}
            onMouseEnter={e => { e.currentTarget.style.color="var(--fg1)"; e.currentTarget.style.background="var(--bg-subtle)"; }}
            onMouseLeave={e => { e.currentTarget.style.color="var(--fg2)"; e.currentTarget.style.background="transparent"; }}>
            <Icon name="github" size={15}/>
          </a>
          <ThemeToggle/>
          <button data-ms="docs-mobile-btn" type="button" aria-label="Open documentation navigation" onClick={() => setMobileNavOpen(true)}
            style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:4, alignItems:"center", justifyContent:"center", color:"var(--fg1)" }}>
            <Icon name="menu" size={20}/>
          </button>
        </div>
      </header>

      <div className="ms-docs-layout__body ms-docs-layout__body--compact"
        style={{ flex:1, overflow:"hidden", minHeight:0 }}>
        <aside data-ms="docs-sidebar" style={{ borderRight:"1px solid var(--border-subtle)", background:"var(--bg-subtle)",
                        overflowY:"auto", flexShrink:0 }}>
          <Sidebar active={safePage} setPage={p => setPage(p)} compact nav={nav}/>
        </aside>
        <div data-ms="docs-content" ref={contentRef} style={{ overflowY:"auto", padding:"32px 48px 80px" }}>
          <div style={{ maxWidth:720 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${platform}:${safePage}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_EMPHASIS } }}
                exit={{ opacity: 0, transition: { duration: DUR.fast, ease: EASE_EXIT } }}>
                <Suspense fallback={<div style={{height:200}}/>}>
                  <Content page={safePage} setPage={setPage}/>
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.base, ease: EASE_STANDARD }}
            style={{ position:"fixed", inset:0, zIndex:200 }}>
            <button type="button" aria-label="Close documentation navigation" onClick={() => setMobileNavOpen(false)}
                 style={{ position:"absolute", inset:0, background:"rgb(0 0 0 / 0.4)", border:0, padding:0 }}/>
            <motion.div
              initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }}
              transition={{ duration: DUR.slow, ease: EASE_EMPHASIS }}
              style={{ position:"absolute", right:0, top:0, bottom:0, width:280,
                       background:"var(--bg)", overflowY:"auto", boxShadow:"var(--shadow-xl)" }}>
              <Sidebar active={safePage} setPage={p => setPage(p)} mobile onClose={() => setMobileNavOpen(false)} nav={nav}/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
