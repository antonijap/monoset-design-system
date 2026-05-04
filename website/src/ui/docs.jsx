import { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';

/* ─── MONOSET MOTION PRESETS ──────────────────────────────────────────── */
export const EASE_STANDARD = [0.2, 0, 0, 1];
export const EASE_EMPHASIS = [0.3, 0, 0, 1];
export const EASE_EXIT     = [0.4, 0, 1, 1];
export const DUR = { fast: 0.12, base: 0.18, slow: 0.28 };

export const fadeUp = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
};
export const hoverLift = { transition: { duration: DUR.fast, ease: EASE_STANDARD } };
// Monoset press: shade one step, no scale, no translate. Brightness works on any color.
export const pressDown = { filter: "brightness(0.88)", transition: { duration: DUR.fast, ease: EASE_STANDARD } };


/* ─── ICONS ──────────────────────────────────────────────────────────── */
export const ICONS = {
  menu: <path d="M3 7h18M3 12h18M3 17h18"/>,
  x: <path d="M18 6 6 18M6 6l12 12"/>,
  copy: <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
  check: <path d="M5 12l5 5L20 7"/>,
  chevronRight: <path d="m9 6 6 6-6 6"/>,
  chevronDown: <path d="m6 9 6 6 6-6"/>,
  sun: <><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></>,
  moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
  github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>,
  arrowRight: <path d="M5 12h14M12 5l7 7-7 7"/>,
  box: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/></>,
  palette: <><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></>,
  type: <><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></>,
  layout: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></>,
  zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
  layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
};
export function Icon({ name, size=16, strokeWidth=2, style, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
         style={style} className={className}>
      {ICONS[name]}
    </svg>
  );
}

/* ─── COPY BUTTON ─────────────────────────────────────────────────────── */
export function CopyButton({ text, style }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).catch(()=>{});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} style={{ background:"transparent", border:"none", cursor:"pointer",
      color: copied ? "#4ade80" : "var(--mono-400)", padding:"4px", display:"flex",
      alignItems:"center", gap:4, fontSize:11, transition:"color 120ms", ...style }}>
      <Icon name={copied?"check":"copy"} size={13}/>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ─── CODE BLOCK ──────────────────────────────────────────────────────── */
export function Code({ children, language="bash", filename }) {
  return (
    <div style={{ background:"var(--mono-1000)", borderRadius:8, overflow:"hidden", fontSize:13, marginBottom:18 }}>
      {filename && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"8px 16px", borderBottom:"1px solid #27272b" }}>
          <span style={{ color:"var(--mono-400)", fontFamily:"var(--font-mono)", fontSize:11 }}>{filename}</span>
          <CopyButton text={children}/>
        </div>
      )}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
                    padding: filename ? "14px 16px" : "14px 16px" }}>
        <pre style={{ margin:0, color:"var(--mono-200)", fontFamily:"var(--font-mono)",
                      overflowX:"auto", lineHeight:1.7, fontSize:13, flex:1 }}>{children}</pre>
        {!filename && <CopyButton text={children} style={{ flexShrink:0, marginLeft:8, marginTop:0 }}/>}
      </div>
    </div>
  );
}

/* ─── INLINE CODE ─────────────────────────────────────────────────────── */
export function InlineCode({ children }) {
  return <code style={{ fontFamily:"var(--font-mono)", fontSize:"0.9em", background:"var(--bg-muted)",
    border:"1px solid var(--border-subtle)", padding:"1px 5px", borderRadius:4 }}>{children}</code>;
}

/* ─── CONTENT PRIMITIVES ──────────────────────────────────────────────── */
export function H1({ children }) {
  return <h1 style={{ fontSize:30, fontWeight:700, letterSpacing:"-0.02em", lineHeight:1.15,
                       margin:"0 0 10px", color:"var(--fg1)" }}>{children}</h1>;
}
export function H2({ children, id }) {
  return <h2 id={id} style={{ fontSize:20, fontWeight:600, letterSpacing:"-0.01em", lineHeight:1.3,
                                margin:"36px 0 12px", color:"var(--fg1)", scrollMarginTop:80 }}>{children}</h2>;
}
export function H3({ children, id }) {
  return <h3 id={id} style={{ fontSize:15, fontWeight:600, margin:"24px 0 8px",
                               color:"var(--fg1)", scrollMarginTop:80 }}>{children}</h3>;
}
export function P({ children }) {
  return <p style={{ margin:"0 0 14px", color:"var(--fg2)", lineHeight:1.7 }}>{children}</p>;
}
export function Lead({ children }) {
  return <p style={{ fontSize:16, lineHeight:1.7, color:"var(--fg3)", margin:"0 0 24px" }}>{children}</p>;
}
export function Divider() {
  return <hr style={{ border:0, borderTop:"1px solid var(--border-subtle)", margin:"28px 0" }}/>;
}

/* ─── PREVIEW BOX ─────────────────────────────────────────────────────── */
export function Preview({ children, bg = "var(--bg-subtle)" }) {
  return (
    <div data-ms="preview" style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden", marginBottom:16 }}>
      <div data-ms="preview-stage" style={{ padding:"28px 24px", background:bg, display:"flex", alignItems:"center",
                    justifyContent:"center", flexWrap:"wrap", gap:10 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── PHONE PREVIEW (for native demos) ────────────────────────────────── */

function SignalIcon() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" aria-hidden>
      <rect x="0"  y="7" width="3" height="4" rx="1" fill="currentColor"/>
      <rect x="4"  y="5" width="3" height="6" rx="1" fill="currentColor"/>
      <rect x="8"  y="2" width="3" height="9" rx="1" fill="currentColor"/>
      <rect x="12" y="0" width="3" height="11" rx="1" fill="currentColor"/>
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" aria-hidden>
      <path d="M7.5 1.5C5 1.5 2.6 2.4 0.7 4l1.4 1.4C3.6 4 5.5 3.2 7.5 3.2s3.9 0.8 5.4 2.2L14.3 4C12.4 2.4 10 1.5 7.5 1.5zm0 3.7C6.1 5.2 4.7 5.7 3.6 6.7l1.4 1.4c0.7-0.6 1.6-1 2.5-1s1.8 0.4 2.5 1l1.4-1.4c-1.1-1-2.5-1.5-3.9-1.5zm0 3.5c-0.7 0-1.3 0.3-1.7 0.7L7.5 11l1.7-1.6c-0.4-0.4-1-0.7-1.7-0.7z" fill="currentColor"/>
    </svg>
  );
}
function BatteryIcon() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden>
      <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" fill="none" stroke="currentColor" strokeOpacity="0.4"/>
      <rect x="2"   y="2"   width="19" height="8"  rx="1.4" fill="currentColor"/>
      <rect x="23"  y="4"   width="2"  height="4"  rx="0.5" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

/**
 * A monotone phone frame in real iPhone proportions (~19.5:9, ~2.17:1).
 * Children render inside a 360x780 screen with a status bar and home
 * indicator. The screen area scrolls when content overflows.
 */
export function PhonePreview({ children, screenBg = "#fff", title }) {
  return (
    <div data-ms="preview" style={{ border:"1px solid var(--border-subtle)", borderRadius:8,
        overflow:"hidden", marginBottom:18, background:"var(--bg-subtle)",
        padding:"32px 0", display:"flex", justifyContent:"center" }}>
      <div data-ms="phone-frame" style={{
        width: 360,
        height: 780,
        background:"#0a0a0c",
        borderRadius: 52,
        padding: 8,
        boxShadow: "0 24px 48px -12px rgb(0 0 0 / 0.18), 0 0 0 1px rgb(0 0 0 / 0.04)",
        position:"relative",
        flexShrink: 0,
      }}>
        {/* dynamic island */}
        <div style={{ position:"absolute", top:14, left:"50%", transform:"translateX(-50%)",
            width: 118, height: 32, background:"#0a0a0c", borderRadius:18, zIndex:2 }}/>
        <div data-ms="phone-screen" style={{
          width:"100%", height:"100%", background: screenBg, borderRadius: 44,
          overflow: "hidden", position:"relative", display:"flex", flexDirection:"column",
        }}>
          {/* status bar */}
          <div style={{ flexShrink:0, height:44, paddingTop:14, paddingLeft:30, paddingRight:24,
              display:"flex", alignItems:"center", justifyContent:"space-between",
              fontFamily:"-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui",
              fontWeight:600, fontSize:13, color:"#000" }}>
            <span>9:41</span>
            <span style={{ display:"inline-flex", alignItems:"center", gap:5 }}>
              <SignalIcon/>
              <WifiIcon/>
              <BatteryIcon/>
            </span>
          </div>
          {/* optional title bar */}
          {title && (
            <div style={{ flexShrink:0, padding:"6px 20px 10px", fontSize:15, fontWeight:600, color:"#0a0a0c",
                borderBottom:"1px solid rgba(0,0,0,0.06)" }}>
              {title}
            </div>
          )}
          {/* scrollable content */}
          <div data-ms="phone-content" style={{ flex:1, overflow:"auto", padding:"16px 16px 28px" }}>
            {children}
          </div>
          {/* home indicator */}
          <div style={{ flexShrink:0, padding:"8px 0 10px", display:"flex", justifyContent:"center" }}>
            <div style={{ width:130, height:5, borderRadius:5, background:"#000", opacity:0.85 }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── STEP ─────────────────────────────────────────────────────────────── */
export function Step({ n, title, children }) {
  return (
    <div style={{ display:"flex", gap:16, marginBottom:24 }}>
      <div style={{ width:28, height:28, borderRadius:"50%", border:"1px solid var(--border)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:12, fontWeight:600, flexShrink:0 }}>{n}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:14, fontWeight:600, lineHeight:"28px", marginBottom:8 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

/* ─── DEMO COMPONENTS ─────────────────────────────────────────────────── */
export const DemoButton = forwardRef(function DemoButton({ variant="secondary", size, disabled, children, style, ...rest }, ref) {
  const [hover, setHover] = useState(false);
  const base = { fontFamily:"inherit", fontWeight:500, lineHeight:1, borderRadius:6,
                  border:"1px solid transparent", cursor:disabled?"not-allowed":"pointer",
                  display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6, transition:"background 120ms, border-color 120ms" };
  const sz = size==="sm" ? {fontSize:12,padding:"5px 10px"}
           : size==="lg" ? {fontSize:15,padding:"11px 20px"}
           : {fontSize:13,padding:"8px 14px"};
  const v = variant==="primary" ? { background: hover?"#27272b":"#09090b", color:"#fff" }
          : variant==="ghost"   ? { background: hover?"var(--bg-muted)":"transparent", color:"var(--fg1)" }
          : { background: hover?"var(--bg-subtle)":"var(--bg)", color:"var(--fg1)", borderColor:"var(--border)" };
  const dis = disabled ? { background:"var(--bg-muted)", color:"var(--fg4)", borderColor:"transparent" } : {};
  return <motion.button ref={ref} whileTap={disabled ? undefined : pressDown}
           style={{...base,...sz,...v,...dis,...style}} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} disabled={disabled} {...rest}>{children}</motion.button>;
});

export function DemoBadge({ variant="neutral", children }) {
  const v = {
    neutral: { background:"var(--bg-muted)", color:"var(--fg2)" },
    solid:   { background:"var(--mono-1000)", color:"#fff" },
    outline: { background:"var(--bg)", color:"var(--fg2)", border:"1px solid var(--border)" },
  }[variant] || { background:"var(--bg-muted)", color:"var(--fg2)" };
  return <span style={{ ...v, fontSize:11, fontWeight:500, padding:"3px 9px", borderRadius:999,
                         display:"inline-flex", alignItems:"center", lineHeight:1 }}>{children}</span>;
}

export function PropsTable({ rows = [] }) {
  return (
    <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden", marginBottom:18 }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
        <thead>
          <tr style={{ background:"var(--bg-subtle)" }}>
            <th style={thStyle}>Prop</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Default</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.name} style={{ borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)" }}>
              <td style={tdMonoStyle}>{r.name}</td>
              <td style={tdMonoStyle}>{r.type}</td>
              <td style={tdMonoStyle}>{r.default}</td>
              <td style={tdStyle}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  textAlign: "left", padding: "8px 12px",
  fontWeight: 600, color: "var(--fg2)", fontSize: 11,
};
const tdStyle = {
  padding: "10px 12px", color: "var(--fg2)", lineHeight: 1.55, verticalAlign: "top",
};
const tdMonoStyle = {
  ...tdStyle, fontFamily: "var(--font-mono)", color: "var(--fg1)", fontSize: 12, whiteSpace: "nowrap",
};
