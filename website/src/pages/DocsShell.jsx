import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EASE_STANDARD, EASE_EMPHASIS, EASE_EXIT, DUR,
  Icon,
} from '../ui/docs.jsx';
import { PAGE_META } from './docs-meta.js';
import { NATIVE_PAGE_META } from './native-meta.js';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { usePlatform } from '../lib/platform.jsx';

const DocsContent = lazy(() => import('./docs.jsx'));
const NativeDocsContent = lazy(() => import('./native-docs.jsx'));

const NAV = [
  { section: "Getting Started", items: [
    { id:"introduction", label:"Introduction" },
    { id:"installation", label:"Installation" },
    { id:"usage",        label:"Basic usage" },
  ]},
  { section: "Foundations", items: [
    { id:"colors",     label:"Colors" },
    { id:"typography", label:"Typography" },
    { id:"spacing",    label:"Spacing & radii" },
    { id:"motion",     label:"Motion" },
    { id:"framer",     label:"Framer Motion" },
  ]},
  { section: "Components", items: [
    { id:"buttons",   label:"Button" },
    { id:"inputs",    label:"Input" },
    { id:"badges",    label:"Badge" },
    { id:"cards",     label:"Card" },
    { id:"toggles",   label:"Checkbox & Switch" },
    { id:"table",     label:"Table" },
    { id:"tabs",      label:"Tabs" },
    { id:"alerts",    label:"Alert & Toast" },
    { id:"avatars",   label:"Avatar" },
    { id:"accordion", label:"Accordion" },
    { id:"slider",    label:"Slider" },
    { id:"toggle",    label:"Toggle group" },
    { id:"kbd",       label:"Kbd" },
    { id:"spinner",   label:"Spinner" },
    { id:"textarea",  label:"Textarea" },
    { id:"select",    label:"Select" },
    { id:"layout",    label:"Layout" },
    { id:"sheet",     label:"Sheet" },
    { id:"command",   label:"Command palette" },
    { id:"appshell",  label:"AppShell" },
    { id:"combobox",  label:"Combobox" },
    { id:"hovercard", label:"HoverCard" },
    { id:"dialog",    label:"Dialog" },
    { id:"tooltip",   label:"Tooltip" },
    { id:"popover",   label:"Popover" },
    { id:"dropdown",  label:"Dropdown menu" },
    { id:"radio",     label:"Radio group" },
    { id:"skeleton",  label:"Skeleton" },
    { id:"empty",     label:"Empty state" },
    { id:"paging",    label:"Pagination" },
    { id:"breadcrumb",label:"Breadcrumb" },
    { id:"progress",  label:"Progress" },
    { id:"separator", label:"Separator" },
    { id:"datepicker", label:"DatePicker" },
    { id:"numberinput", label:"Number input" },
    { id:"pininput", label:"Pin input" },
    { id:"password", label:"Password input" },
    { id:"fileupload", label:"File upload" },
    { id:"stepper", label:"Stepper" },
    { id:"navmenu", label:"Navigation menu" },
    { id:"contextmenu", label:"Context menu" },
    { id:"multicombobox", label:"Multi-select" },
    { id:"carousel", label:"Carousel" },
  ]},
  { section: "Tools", items: [
    { id:"cli",       label:"CLI" },
    { id:"playground", label:"Playground" },
  ]},
  { section: "Guides", items: [
    { id:"llm",       label:"LLM naming prompt" },
    { id:"theming",   label:"Theming" },
    { id:"settings",  label:"Settings page" },
    { id:"a11y",      label:"Accessibility" },
    { id:"mcp",       label:"MCP server" },
    { id:"nextjs",    label:"Next.js & Remix" },
    { id:"dashboard", label:"Dashboard" },
    { id:"datatable", label:"Data table" },
  ]},
];

const NATIVE_NAV = [
  { section: "Getting Started", items: [
    { id:"introduction", label:"Introduction" },
    { id:"installation", label:"Installation" },
    { id:"usage",        label:"Basic usage" },
  ]},
  { section: "Foundations", items: [
    { id:"tokens", label:"Tokens" },
    { id:"motion", label:"Motion" },
  ]},
  { section: "Display", items: [
    { id:"avatar",   label:"Avatar" },
    { id:"badge",    label:"Badge" },
    { id:"alert",    label:"Alert" },
    { id:"divider",  label:"Divider" },
    { id:"empty",    label:"Empty state" },
    { id:"list",     label:"List item" },
    { id:"chip",     label:"Chip" },
    { id:"progress", label:"Progress" },
    { id:"skeleton", label:"Skeleton" },
    { id:"spinner",  label:"Spinner" },
  ]},
  { section: "Form", items: [
    { id:"buttons",     label:"Button" },
    { id:"inputs",      label:"Input" },
    { id:"passwordn",   label:"Password input" },
    { id:"numberinputn",label:"Number input" },
    { id:"pininputn",   label:"Pin input" },
    { id:"checkbox",    label:"Checkbox" },
    { id:"radio",       label:"Radio group" },
    { id:"switch",      label:"Switch" },
    { id:"slider",      label:"Slider" },
    { id:"segmented",   label:"Segmented control" },
    { id:"comboboxn",   label:"Combobox" },
    { id:"datepickern", label:"DatePicker" },
  ]},
  { section: "Layout", items: [
    { id:"cards",     label:"Card" },
    { id:"layout",    label:"Stack & Inline" },
    { id:"accordionn",label:"Accordion" },
    { id:"appshell",  label:"AppShell" },
  ]},
  { section: "Overlay & navigation", items: [
    { id:"sheet",      label:"Sheet" },
    { id:"dialog",     label:"Dialog" },
    { id:"toast",      label:"Toast" },
    { id:"actionsheet",label:"Action sheet" },
    { id:"popovern",   label:"Popover" },
    { id:"tooltipn",   label:"Tooltip" },
    { id:"tabsn",      label:"Tabs" },
    { id:"tabbar",     label:"Tab bar" },
    { id:"navheader",  label:"Navigation header" },
  ]},
];

function Sidebar({ active, setPage, mobile, onClose, nav = NAV }) {
  return (
    <div style={{ width:"100%", padding:"16px 0", overflowY:"auto", height:"100%" }}>
      {mobile && (
        <>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                        padding:"0 20px 16px", borderBottom:"1px solid var(--border-subtle)" }}>
            <span style={{ fontSize:14, fontWeight:600 }}>Docs</span>
            <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--fg2)",padding:4 }}>
              <Icon name="x" size={18}/>
            </button>
          </div>
          <div style={{ padding:"12px 20px", borderBottom:"1px solid var(--border-subtle)" }}>
            <PlatformToggle dataMs="docs-platform-mobile" fullWidth/>
          </div>
        </>
      )}
      {nav.map(group => (
        <div key={group.section} style={{ padding:"12px 12px 4px" }}>
          <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase",
                        color:"var(--fg3)", padding:"0 8px 8px" }}>{group.section}</div>
          {group.items.map(item => (
            <div key={item.id} onClick={() => { setPage(item.id); if(onClose) onClose(); }}
              style={{ padding:"7px 10px", borderRadius:5, fontSize:13, cursor:"pointer",
                       background: active===item.id ? "var(--bg-muted)" : "transparent",
                       color: active===item.id ? "var(--fg1)" : "var(--fg2)",
                       fontWeight: active===item.id ? 500 : 400,
                       transition:"background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)" }}
              onMouseEnter={e => { if(active!==item.id) e.currentTarget.style.background="var(--bg-subtle)"; }}
              onMouseLeave={e => { if(active!==item.id) e.currentTarget.style.background="transparent"; }}>
              {item.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function PlatformToggle({ dataMs = "docs-platform", fullWidth = false }) {
  const { platform, setPlatform } = usePlatform();
  return (
    <div role="tablist" aria-label="Platform" data-ms={dataMs} style={{
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : "auto",
      padding:2, background:"var(--bg-subtle)",
      border:"1px solid var(--border-subtle)", borderRadius:7,
      height: fullWidth ? 36 : 30, boxSizing:"border-box",
    }}>
      {[["react","React"],["native","Native"]].map(([k,label]) => (
        <button key={k} role="tab" aria-selected={platform===k}
          onClick={() => setPlatform(k)}
          style={{ position:"relative", border:"none", background: platform===k?"var(--bg)":"transparent",
            color: platform===k?"var(--fg1)":"var(--fg3)", fontFamily:"inherit",
            fontSize: fullWidth ? 13 : 11,
            fontWeight: platform===k?500:400,
            padding: fullWidth ? "0" : "0 10px",
            flex: fullWidth ? 1 : "none",
            borderRadius:5, cursor:"pointer",
            boxShadow: platform===k?"var(--shadow-xs)":"none",
            transition:"color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard)" }}>
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
        Previews on supported pages re-render via <code style={{ fontFamily:"var(--font-mono)", fontSize:11 }}>react-native-web</code>.
        v0.1 covers Button, Card, Input, Switch, Spinner, Skeleton, and Layout.
      </span>
      <button onClick={() => setPlatform('react')} style={{
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
        <button onClick={onHome} style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none",
                                          cursor:"pointer", padding:0, fontFamily:"inherit" }}>
          <img src="/assets/monoset-mark.svg" width="22" height="22" alt=""/>
          <span style={{ fontSize:15, fontWeight:600, letterSpacing:"-0.01em", color:"var(--fg1)" }}>Monoset</span>
        </button>
        <span data-ms="docs-breadcrumb" style={{ display:"inline-flex", alignItems:"center", gap:12 }}>
          <span style={{ color:"var(--border)", fontSize:18, fontWeight:300 }}>/</span>
          <span style={{ fontSize:13, color:"var(--fg3)" }}>Docs</span>
        </span>
        <a
          href="https://github.com/antonijap/monoset-design-system/releases"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="View releases on GitHub"
          data-ms="docs-version"
          style={{ marginLeft:4, fontSize:11, fontWeight:500, color:"var(--fg3)",
                   background:"var(--bg-subtle)", border:"1px solid var(--border-subtle)",
                   borderRadius:999, padding:"2px 8px", textDecoration:"none", lineHeight:1.4,
                   transition:"color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard)" }}
          onMouseEnter={e => { e.currentTarget.style.color="var(--fg1)"; e.currentTarget.style.background="var(--bg-muted)"; }}
          onMouseLeave={e => { e.currentTarget.style.color="var(--fg3)"; e.currentTarget.style.background="var(--bg-subtle)"; }}>
          v0.5
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
          <button data-ms="docs-mobile-btn" onClick={() => setMobileNavOpen(true)}
            style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:4, alignItems:"center", justifyContent:"center", color:"var(--fg1)" }}>
            <Icon name="menu" size={20}/>
          </button>
        </div>
      </header>

      <div style={{ flex:1, display:"grid", gridTemplateColumns:"var(--sidebar-w) 1fr", overflow:"hidden", minHeight:0 }}>
        <aside data-ms="docs-sidebar" style={{ borderRight:"1px solid var(--border-subtle)", background:"var(--bg-subtle)",
                        overflowY:"auto", flexShrink:0 }}>
          <Sidebar active={safePage} setPage={p => setPage(p)} nav={nav}/>
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
            <div onClick={() => setMobileNavOpen(false)}
                 style={{ position:"absolute", inset:0, background:"rgb(0 0 0 / 0.4)" }}/>
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
