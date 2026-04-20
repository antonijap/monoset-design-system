import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  EASE_STANDARD, EASE_EMPHASIS, EASE_EXIT, DUR,
  fadeUp, hoverLift, pressDown,
  Icon,
  DemoBadge,
} from './ui/docs.jsx';
import { PAGE_META } from './pages/docs-meta.js';
import ThemeToggle from './components/ThemeToggle.jsx';
import CommandPalette from './components/CommandPalette.jsx';

const DocsContent = lazy(() => import('./pages/docs.jsx'));

/* ─── SIDEBAR NAV ─────────────────────────────────────────────────────── */
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
  ]},
  { section: "Guides", items: [
    { id:"llm",       label:"LLM naming prompt" },
  ]},
];

function Sidebar({ active, setPage, mobile, onClose }) {
  return (
    <div style={{ width:"100%", padding:"16px 0", overflowY:"auto", height:"100%" }}>
      {mobile && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"0 20px 16px", borderBottom:"1px solid var(--border-subtle)" }}>
          <span style={{ fontSize:14, fontWeight:600 }}>Docs</span>
          <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--fg2)",padding:4 }}>
            <Icon name="x" size={18}/>
          </button>
        </div>
      )}
      {NAV.map(group => (
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


/* ─── HERO ────────────────────────────────────────────────────────────── */
/* ─── LANDING HELPERS ─────────────────────────────────────────────── */
function LandingSection({ eyebrow, title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DUR.slow, ease: EASE_EMPHASIS }}
      style={{ maxWidth: 1080, margin: "0 auto", width: "100%", padding: "72px 32px" }}>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)",
                     letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>{eyebrow}</div>
      <h2 style={{ fontSize:36, fontWeight:600, letterSpacing:"-0.02em", lineHeight:1.15,
                    margin:"0 0 40px", color:"var(--fg1)", maxWidth:640 }}>{title}</h2>
      {children}
    </motion.section>
  );
}

function ShowcaseCard({ title, hint, span = 2, children }) {
  return (
    <motion.div whileHover={hoverLift}
      style={{ gridColumn: `span ${span}`, background:"var(--bg)", border:"1px solid var(--border-subtle)",
               borderRadius:10, padding:"20px 22px", display:"flex", flexDirection:"column", gap:18,
               minHeight:160, boxSizing:"border-box" }}>
      <div>
        <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)" }}>{title}</div>
        <div style={{ fontSize:11, color:"var(--fg3)", marginTop:2 }}>{hint}</div>
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"flex-start", flexWrap:"wrap" }}>
        {children}
      </div>
    </motion.div>
  );
}

function InlineInputDemo() {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:4 }}>
      <label style={{ fontSize:11, fontWeight:500, color:"var(--fg2)" }}>Email</label>
      <input defaultValue="ada@monoset.dev"
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ fontFamily:"inherit", fontSize:13, padding:"8px 12px",
          border:`1px solid ${focused?"var(--fg1)":"var(--border)"}`, borderRadius:6,
          color:"var(--fg1)", background:"var(--bg)", outline:"none",
          transition:"border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
          boxShadow: focused ? "0 0 0 3px var(--mono-100)" : "none" }}/>
    </div>
  );
}

function HeroSwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <label onClick={()=>setOn(v=>!v)} style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:12, cursor:"pointer" }}>
      <motion.span
        animate={{ backgroundColor: on ? "#09090b" : "#d4d4d7" }}
        transition={{ duration: DUR.base, ease: EASE_STANDARD }}
        style={{ width:32, height:18, borderRadius:999, position:"relative", display:"inline-block" }}>
        <motion.span
          animate={{ x: on ? 14 : 0 }}
          transition={{ duration: DUR.base, ease: EASE_EMPHASIS }}
          style={{ position:"absolute", top:2, left:2, width:14, height:14, borderRadius:"50%",
                   background:"#fff", boxShadow:"0 1px 2px rgb(0 0 0 / 0.2)" }}/>
      </motion.span>
      Notifications
    </label>
  );
}

function HeroCheckDemo() {
  const [on, setOn] = useState(true);
  return (
    <label onClick={()=>setOn(v=>!v)} style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:12, cursor:"pointer" }}>
      <span style={{ width:16, height:16, borderRadius:3,
                     border:`1px solid ${on?"var(--mono-1000)":"var(--mono-400)"}`,
                     background:on?"var(--mono-1000)":"var(--bg)", display:"inline-flex",
                     alignItems:"center", justifyContent:"center", color:"#fff",
                     transition:"background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)" }}>
        <AnimatePresence initial={false}>
          {on && (
            <motion.span key="c"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: DUR.fast, ease: EASE_EMPHASIS } }}
              exit={{ opacity: 0, scale: 0.6, transition: { duration: DUR.fast, ease: EASE_EXIT } }}
              style={{ display:"inline-flex" }}>
              <Icon name="check" size={11}/>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      Accept terms
    </label>
  );
}

function HeroTabsDemo() {
  const [tab, setTab] = useState("overview");
  return (
    <div style={{ width:"100%", borderBottom:"1px solid var(--border-subtle)", display:"flex", gap:18 }}>
      {["overview","activity","members"].map(t => (
        <div key={t} onClick={()=>setTab(t)} style={{ position:"relative", padding:"8px 0", fontSize:12, cursor:"pointer",
          color:tab===t?"var(--fg1)":"var(--fg3)", fontWeight:tab===t?500:400, marginBottom:-1,
          textTransform:"capitalize", transition:"color var(--duration-fast) var(--ease-standard)" }}>
          {t}
          {tab===t && (
            <motion.div layoutId="hero-tabs-underline"
              transition={{ duration: DUR.base, ease: EASE_EMPHASIS }}
              style={{ position:"absolute", left:0, right:0, bottom:-1, height:1.5, background:"var(--fg1)" }}/>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── BENTO TILES ─────────────────────────────────────────────────── */
function BentoTile({ span = 4, rowSpan = 1, children, pad = "24px", bg = "var(--bg)" }) {
  return (
    <div
      style={{ gridColumn:`span ${span}`, gridRow:`span ${rowSpan}`, background:bg,
               border:"1px solid var(--border-subtle)", borderRadius:12, padding:pad,
               boxShadow:"var(--shadow-sm)", display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" }}>
      {children}
    </div>
  );
}

function BentoAuth() {
  const [focus, setFocus] = useState(null);
  return (
    <BentoTile span={4} pad="22px 22px 20px">
      <div style={{ fontSize:24, fontWeight:600, letterSpacing:"-0.01em", color:"var(--fg1)", marginBottom:6 }}>
        Welcome back.
      </div>
      <div style={{ fontSize:13, color:"var(--fg3)", lineHeight:1.55, marginBottom:20 }}>
        Use your Monoset account to continue.
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:14 }}>
        {[
          { id:"e", label:"Email", value:"ada@monoset.dev" },
          { id:"p", label:"Password", value:"•••••••••", type:"password" },
        ].map(f => (
          <div key={f.id} style={{ display:"flex", flexDirection:"column", gap:4 }}>
            <label style={{ fontSize:11, fontWeight:500, color:"var(--fg2)" }}>{f.label}</label>
            <input readOnly defaultValue={f.value} type={f.type||"text"}
              onFocus={()=>setFocus(f.id)} onBlur={()=>setFocus(null)}
              style={{ fontFamily:"inherit", fontSize:13, padding:"9px 12px",
                border:`1px solid ${focus===f.id?"var(--fg1)":"var(--border)"}`, borderRadius:6,
                color:"var(--fg1)", background:"var(--bg)", outline:"none",
                transition:"border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
                boxShadow: focus===f.id ? "0 0 0 3px var(--mono-100)" : "none" }}/>
          </div>
        ))}
      </div>
      <motion.button whileHover={hoverLift} whileTap={pressDown}
        style={{ background:"var(--mono-1000)", color:"#fff", border:"1px solid var(--mono-1000)",
                 borderRadius:6, padding:"10px 14px", fontSize:13, fontWeight:500, fontFamily:"inherit",
                 cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
        Continue <Icon name="arrowRight" size={14}/>
      </motion.button>
      <div style={{ fontSize:12, color:"var(--fg3)", textAlign:"center", marginTop:12 }}>
        New here? <span style={{ color:"var(--fg1)", fontWeight:500, cursor:"pointer" }}>Create an account</span>
      </div>
    </BentoTile>
  );
}

function BentoAnalytics() {
  const [range, setRange] = useState(1);
  const series = [
    [22, 26, 30, 32, 38, 42, 46, 50, 54, 58, 62, 66],        // 7d
    [28, 32, 38, 42, 48, 54, 58, 64, 70, 76, 84, 92],        // 30d
    [16, 22, 28, 34, 40, 48, 54, 60, 68, 76, 84, 94],        // 12m
  ];
  const bars = series[range];
  const max = Math.max(...bars);
  const w = 260, h = 80;
  const stepX = w / (bars.length - 1);
  const pts = bars.map((v,i) => [i*stepX, h - (v/max)*h]);
  // Catmull-Rom → cubic bezier for a smooth monotone curve
  const smoothPath = (() => {
    if (pts.length < 2) return "";
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i-1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i+1];
      const p3 = pts[i+2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
    }
    return d;
  })();
  const fillPath = `${smoothPath} L${w},${h} L0,${h} Z`;

  return (
    <div
      data-ms="bento-analytics"
      style={{ gridColumn:"span 6", background:"var(--mono-1000)", color:"#fff",
               borderRadius:12, padding:"22px 22px 18px", boxShadow:"var(--shadow-lg)", position:"relative", overflow:"hidden",
               display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontSize:12, fontWeight:500, color:"var(--mono-400)", marginBottom:10 }}>Monthly revenue</div>
          <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
            <div data-ms="analytics-value" style={{ fontSize:40, fontWeight:700, letterSpacing:"-0.02em", lineHeight:1, color:"#fff" }}>$24,310</div>
            <div style={{ fontSize:12, color:"#7fc193", fontWeight:500, display:"flex", alignItems:"center", gap:4 }}>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor"><polygon points="5,0 10,8 0,8"/></svg>
              8.4%
            </div>
          </div>
          <div style={{ fontSize:11, color:"var(--mono-400)", marginTop:4 }}>vs. last month</div>
        </div>
        <div style={{ display:"inline-flex", padding:2, background:"var(--mono-800)", borderRadius:6 }}>
          {["7d","30d","12m"].map((s,i) => (
            <div key={s} onClick={()=>setRange(i)} style={{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center",
              padding:"6px 12px", lineHeight:1, borderRadius:4, fontSize:11, fontWeight:500, cursor:"pointer",
              color: range===i?"#fff":"var(--mono-400)",
              transition:"color var(--duration-fast) var(--ease-standard)" }}>
              {range===i && (
                <motion.div layoutId="bento-analytics-seg"
                  transition={{ duration:DUR.base, ease:EASE_EMPHASIS }}
                  style={{ position:"absolute", inset:0, background:"var(--mono-600)", borderRadius:4, zIndex:0 }}/>
              )}
              <span style={{ position:"relative", zIndex:1 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sparkline area chart */}
      <div style={{ marginTop:"auto", position:"relative", width:"100%", height:140 }}>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" width="100%" height="140"
             style={{ display:"block", position:"absolute", inset:0 }}>
          <defs>
            <linearGradient id="bento-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.22"/>
              <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <motion.path
            key={`fill-${range}`}
            d={fillPath}
            fill="url(#bento-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration:DUR.slow, ease:EASE_EMPHASIS }}/>
          <motion.path
            key={`line-${range}`}
            d={smoothPath}
            fill="none" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.slow, ease: EASE_EMPHASIS }}/>
        </svg>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:12,
                     fontSize:10, fontFamily:"var(--font-mono)", color:"var(--mono-500)" }}>
        <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
      </div>
    </div>
  );
}

function BentoTypography() {
  const [weight, setWeight] = useState(700);
  const weights = [
    { w: 400, label: "Regular" },
    { w: 500, label: "Medium" },
    { w: 600, label: "Semi" },
    { w: 700, label: "Bold" },
  ];
  return (
    <BentoTile span={3} pad="20px 20px 16px">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
        <div style={{ fontSize:12, fontWeight:600, color:"var(--fg1)" }}>Inter</div>
        <span style={{ fontSize:10, color:"var(--fg4)" }}>11 → 64px</span>
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <motion.div
          key={weight}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DUR.base, ease: EASE_EMPHASIS }}
          data-ms="bento-typography-aa"
          style={{ fontSize: 96, fontWeight: weight, letterSpacing: "-0.04em",
                   lineHeight: 1, color: "var(--fg1)" }}>
          Aa
        </motion.div>
      </div>
      <div style={{ display:"flex", gap:3, marginTop:8 }}>
        {weights.map(w => (
          <div key={w.w} onClick={()=>setWeight(w.w)}
            style={{ flex:1, padding:"6px 0", textAlign:"center",
                     fontSize:10, fontWeight:500,
                     color: weight===w.w ? "var(--fg1)" : "var(--fg3)",
                     background: weight===w.w ? "var(--bg-muted)" : "transparent",
                     borderRadius:4, cursor:"pointer",
                     transition:"background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)" }}>
            {w.w}
          </div>
        ))}
      </div>
    </BentoTile>
  );
}

function BentoColors() {
  const [active, setActive] = useState("--mono-800");
  const ramp = [
    ["0", "#ffffff"], ["50", "#fafafa"], ["100", "#f4f4f5"], ["200", "#e8e8ea"],
    ["300", "#d4d4d7"], ["400", "#a1a1a6"], ["500", "#71717a"], ["600", "#52525a"],
    ["700", "#3f3f45"], ["800", "#27272b"], ["900", "#18181b"], ["1000", "#09090b"],
  ];
  const activeStep = active.replace("--mono-","");
  const activeHex = ramp.find(([n]) => n === activeStep)?.[1] || "#27272b";
  return (
    <BentoTile span={4} pad="22px 22px 20px">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)" }}>Neutral ramp</div>
          <div style={{ fontSize:11, color:"var(--fg3)", marginTop:2 }}>12 steps · tap to preview</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ width:22, height:22, borderRadius:5, background:activeHex,
                          border:"1px solid var(--border-subtle)" }}/>
          <span style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg2)" }}>
            {activeHex}
          </span>
        </div>
      </div>
      <div data-ms="bento-colors-swatches" style={{ display:"flex", gap:3, flex:1 }}>
        {ramp.map(([n, hex]) => (
          <div key={n}
            onClick={()=>setActive(`--mono-${n}`)}
            style={{ flex: 1, background: hex, borderRadius: 6,
                     border: active === `--mono-${n}` ? "1px solid var(--fg1)" : "1px solid var(--border-subtle)",
                     cursor: "pointer",
                     transition: "border-color var(--duration-fast) var(--ease-standard)" }}/>
        ))}
      </div>
    </BentoTile>
  );
}

function BentoTeam() {
  const people = [
    { ini:"AT", name:"Ada T.",    online:true },
    { ini:"GH", name:"Grace H.",  online:true },
    { ini:"LT", name:"Linus T.",  online:false },
    { ini:"MC", name:"Margaret C.", online:true },
    { ini:"DK", name:"Donald K.", online:false },
  ];
  const activity = [
    { ini:"AT", bg:"var(--mono-900)", action:"edited",       target:"Dashboard.jsx", ago:"2m" },
    { ini:"GH", bg:"var(--mono-800)", action:"commented on", target:"PR #42",        ago:"5m" },
    { ini:"MC", bg:"var(--mono-600)", action:"shipped",      target:"v1.2.0",        ago:"1h" },
    { ini:"LT", bg:"var(--mono-700)", action:"merged",       target:"feat/motion",   ago:"3h" },
    { ini:"DK", bg:"var(--mono-500)", action:"opened",       target:"Ticket #218",   ago:"6h" },
  ];
  return (
    <BentoTile span={4} pad="22px 22px 18px">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)" }}>Team</div>
          <div style={{ fontSize:11, color:"var(--fg3)", marginTop:2 }}>3 of 16 active now</div>
        </div>
        <motion.button whileTap={pressDown}
          style={{ background:"var(--mono-1000)", color:"#fff", border:"none",
                   borderRadius:6, padding:"6px 10px", fontSize:11, fontWeight:500, fontFamily:"inherit",
                   cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Invite
        </motion.button>
      </div>

      {/* Overlapping avatar stack */}
      <div style={{ display:"flex", marginBottom:16 }}>
        {people.map((p, i) => (
          <div key={p.ini}
            style={{ width:34, height:34, borderRadius:"50%", background:`var(--mono-${900 - i*100})`,
                     color:"#fff", fontSize:11, fontWeight:600,
                     display:"flex", alignItems:"center", justifyContent:"center",
                     marginLeft: i===0 ? 0 : -8, border:"2px solid var(--bg)",
                     position:"relative", zIndex: 5 - i }}>
            {p.ini}
            {p.online && (
              <span style={{ position:"absolute", bottom:-1, right:-1, width:9, height:9,
                             borderRadius:"50%", background:"#2e4a33",
                             border:"2px solid var(--bg)" }}/>
            )}
          </div>
        ))}
        <div style={{ width:34, height:34, borderRadius:"50%", background:"var(--bg-muted)",
                      border:"2px solid var(--bg)", color:"var(--fg2)",
                      fontSize:10, fontWeight:500, display:"flex", alignItems:"center", justifyContent:"center",
                      marginLeft:-8 }}>
          +11
        </div>
      </div>

      {/* Activity feed */}
      <div style={{ display:"flex", flexDirection:"column", gap:10, flex:1 }}>
        {activity.map((a, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, minWidth:0 }}>
            <span style={{ width:22, height:22, borderRadius:"50%", background:a.bg, color:"#fff",
                           fontSize:9, fontWeight:600, flexShrink:0,
                           display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
              {a.ini}
            </span>
            <div style={{ flex:1, minWidth:0, fontSize:12, color:"var(--fg2)",
                           whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
              <span style={{ color:"var(--fg1)", fontWeight:500 }}>{a.ini}</span>
              {" "}{a.action}{" "}
              <span style={{ color:"var(--fg1)", fontWeight:500 }}>{a.target}</span>
            </div>
            <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--fg4)", flexShrink:0 }}>
              {a.ago}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop:14, paddingTop:12, borderTop:"1px solid var(--border-subtle)",
                     display:"flex", alignItems:"center", justifyContent:"space-between",
                     fontSize:11 }}>
        <span style={{ color:"var(--fg3)" }}>
          <span style={{ color:"var(--fg1)", fontWeight:500 }}>24</span> updates today
        </span>
        <span style={{ color:"var(--fg2)", fontWeight:500, cursor:"pointer",
                        display:"inline-flex", alignItems:"center", gap:4 }}>
          View all
          <Icon name="arrowRight" size={11}/>
        </span>
      </div>
    </BentoTile>
  );
}

function BentoToastsStack_UNUSED() {
  return (
    <BentoTile span={4} pad="24px 22px 20px" bg="var(--bg-subtle)">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)" }}>Notifications</div>
        <span style={{ fontSize:11, color:"var(--fg3)" }}>3 new</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, flex:1 }}>
        {[
          { kind:"success", title:"Deploy successful", msg:"monoset-web · 1.8s" },
          { kind:"info",    title:"New invitation",    msg:"grace@monoset.dev" },
          { kind:"alert",   title:"Usage near limit",  msg:"92% of quota used" },
        ].map((t,i) => (
          <motion.div key={t.title}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0, transition:{ duration: DUR.slow, ease: EASE_EMPHASIS, delay: i*0.06 }}}
            viewport={{ once:true, margin:"-40px" }}
            style={{ background:"var(--bg)", border:"1px solid var(--border-subtle)",
                     borderRadius:8, padding:"10px 12px",
                     boxShadow:"var(--shadow-sm)",
                     display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ width:22, height:22, borderRadius:"50%",
                           background: t.kind==="alert" ? "var(--bg-muted)" : "var(--mono-1000)",
                           color: t.kind==="alert" ? "var(--fg1)" : "#fff",
                           display:"inline-flex", alignItems:"center", justifyContent:"center",
                           fontSize:11, fontWeight:700, flexShrink:0 }}>
              {t.kind==="success" ? "✓" : t.kind==="alert" ? "!" : "i"}
            </span>
            <div style={{ minWidth:0, flex:1 }}>
              <div style={{ fontSize:12, fontWeight:600, color:"var(--fg1)",
                             whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t.title}</div>
              <div style={{ fontSize:11, color:"var(--fg3)", marginTop:1,
                             whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t.msg}</div>
            </div>
            <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--fg4)", flexShrink:0 }}>
              {["2m","9m","1h"][i]}
            </span>
          </motion.div>
        ))}
      </div>
    </BentoTile>
  );
}

function BentoPlayer() {
  const [playing, setPlaying] = useState(true);
  const duration = 204; // 3:24 in seconds
  const [elapsed, setElapsed] = useState(104); // start at 1:44
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed(s => (s >= duration ? 0 : s + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [playing]);
  const fmt = s => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`;
  const pct = (elapsed / duration) * 100;

  return (
    <div
      data-ms="bento-player"
      style={{ gridColumn:"span 3", background:"var(--mono-1000)", color:"#fff", borderRadius:12,
               overflow:"hidden", boxShadow:"var(--shadow-lg)", position:"relative",
               display:"flex", flexDirection:"column" }}>
      {/* Artwork. Fills full width, aspect 1:1 */}
      <div data-ms="bento-player-art" style={{ position:"relative", width:"100%", height:160, background:"var(--mono-800)" }}>
        <img
          src="/assets/player-art.jpg"
          width="800"
          height="800"
          loading="lazy"
          decoding="async"
          alt="Monoset Ensemble · Vol. 02 album art"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block" }}
        />
        {/* Now playing pill */}
        <div style={{ position:"absolute", top:12, left:12,
                       display:"inline-flex", alignItems:"center", gap:6,
                       fontSize:10, fontWeight:500, color:"#fff",
                       padding:"4px 9px", borderRadius:999,
                       background:"rgb(0 0 0 / 0.55)" }}>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width:6, height:6, borderRadius:"50%", background:"#fff" }}/>
          Now playing
        </div>
        {/* Subtle bottom vignette for text legibility */}
        <div style={{ position:"absolute", left:0, right:0, bottom:0, height:64,
                       background:"linear-gradient(to bottom, rgb(0 0 0 / 0), rgb(0 0 0 / 0.85))" }}/>
      </div>

      {/* Content */}
      <div style={{ padding:"16px 18px 18px", display:"flex", flexDirection:"column", gap:14, flex:1 }}>
        <div>
          <div style={{ fontSize:15, fontWeight:600, color:"#fff", letterSpacing:"-0.01em", lineHeight:1.25 }}>
            Interlude IV
          </div>
          <div style={{ fontSize:12, color:"var(--mono-400)", marginTop:4 }}>
            Monoset Ensemble · Vol. 02
          </div>
        </div>

        {/* Progress */}
        <div style={{ marginTop:"auto" }}>
          <div style={{ position:"relative", height:14, display:"flex", alignItems:"center", cursor:"pointer" }}>
            <div style={{ position:"relative", height:3, width:"100%",
                           background:"var(--mono-800)", borderRadius:2 }}>
              <div style={{ position:"absolute", left:0, top:0, height:"100%", width:`${pct}%`,
                             background:"#fff", borderRadius:2,
                             transition:"width 1000ms linear" }}/>
              <div style={{ position:"absolute", left:`${pct}%`, top:"50%",
                             width:10, height:10, borderRadius:"50%", background:"#fff",
                             transform:"translate(-50%, -50%)",
                             boxShadow:"0 1px 4px rgb(0 0 0 / 0.5)",
                             transition:"left 1000ms linear" }}/>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:6,
                         fontSize:10, fontFamily:"var(--font-mono)", color:"var(--mono-400)" }}>
            <span>{fmt(elapsed)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:18 }}>
          <motion.button whileTap={pressDown}
            style={{ background:"transparent", border:"none", cursor:"pointer", color:"var(--mono-400)",
                     padding:0, display:"flex" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="19,20 9,12 19,4"/><rect x="5" y="4" width="2" height="16"/>
            </svg>
          </motion.button>
          <motion.button whileTap={pressDown} onClick={()=>setPlaying(p=>!p)}
            style={{ width:44, height:44, borderRadius:999, background:"#fff", color:"var(--mono-1000)",
                     border:"none", display:"flex", alignItems:"center", justifyContent:"center",
                     cursor:"pointer", boxShadow:"0 2px 10px rgb(255 255 255 / 0.15)" }}>
            {playing
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft:2 }}><polygon points="6,4 20,12 6,20"/></svg>}
          </motion.button>
          <motion.button whileTap={pressDown}
            style={{ background:"transparent", border:"none", cursor:"pointer", color:"var(--mono-400)",
                     padding:0, display:"flex" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,4 15,12 5,20"/><rect x="17" y="4" width="2" height="16"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function BentoCalendar() {
  // Week view -5 days × hour grid with meeting blocks
  const days = [
    { label:"Mon", num:13 },
    { label:"Tue", num:14 },
    { label:"Wed", num:15, isToday:true },
    { label:"Thu", num:16 },
    { label:"Fri", num:17 },
  ];
  // Meeting blocks: day index (0-4), start hour (0-8 relative to 9am), duration in hours, title, variant
  const blocks = [
    { day:0, start:0,   span:1,   title:"Standup",        variant:"muted" },
    { day:0, start:2,   span:2,   title:"Design review",  variant:"solid" },
    { day:1, start:1,   span:1.5, title:"1:1 w/ Ada",     variant:"outline" },
    { day:1, start:4,   span:2,   title:"Sprint planning",variant:"muted" },
    { day:2, start:0,   span:1,   title:"Standup",        variant:"muted" },
    { day:2, start:1.5, span:2.5, title:"Deep work",      variant:"solid" },
    { day:2, start:5,   span:1.5, title:"Retro",          variant:"outline" },
    { day:3, start:0.5, span:2,   title:"Customer call",  variant:"solid" },
    { day:3, start:3.5, span:1,   title:"Sync",           variant:"muted" },
    { day:4, start:1,   span:3,   title:"Focus block",    variant:"outline" },
    { day:4, start:5,   span:1,   title:"Demo",           variant:"muted" },
  ];
  const totalHours = 8;
  const hourHeight = 18;

  const variants = {
    solid:   { background:"var(--mono-1000)", color:"#fff",       border:"none" },
    muted:   { background:"var(--bg-muted)",  color:"var(--fg1)", border:"none" },
    outline: { background:"var(--bg)",        color:"var(--fg1)", border:"1px dashed var(--border)" },
  };

  return (
    <BentoTile span={7} pad="22px 22px 20px">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)" }}>This week</div>
          <div style={{ fontSize:11, color:"var(--fg3)", marginTop:2 }}>11 meetings · 4 focus blocks</div>
        </div>
        <div style={{ display:"inline-flex", padding:2, background:"var(--bg-muted)", borderRadius:6 }}>
          {["Day","Week","Month"].map((v,i) => (
            <div key={v} style={{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center",
              padding:"5px 10px", lineHeight:1, borderRadius:4, fontSize:11, fontWeight:500, cursor:"pointer",
              color: i===1?"var(--fg1)":"var(--fg3)",
              background: i===1?"var(--bg)":"transparent",
              boxShadow: i===1?"var(--shadow-xs)":"none" }}>{v}</div>
          ))}
        </div>
      </div>

      {/* Day header row */}
      <div data-ms="calendar-week" style={{ display:"grid", gridTemplateColumns:"28px repeat(5, 1fr)", gap:4, marginBottom:6 }}>
        <div/>
        {days.map(d => (
          <div key={d.label} style={{ textAlign:"center" }}>
            <div style={{ fontSize:10, color:"var(--fg3)", fontWeight:500 }}>{d.label}</div>
            <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center",
                           width:22, height:22, borderRadius:"50%", marginTop:2,
                           background: d.isToday ? "var(--mono-1000)" : "transparent",
                           color: d.isToday ? "#fff" : "var(--fg1)",
                           fontSize:12, fontWeight: d.isToday ? 600 : 500 }}>
              {d.num}
            </div>
          </div>
        ))}
      </div>

      {/* Hour grid + blocks */}
      <div data-ms="calendar-week" style={{ display:"grid", gridTemplateColumns:"28px repeat(5, 1fr)", gap:4,
                     position:"relative", height: totalHours*hourHeight, marginBottom:4 }}>
        {/* Hour labels */}
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"space-between",
                       fontSize:9, fontFamily:"var(--font-mono)", color:"var(--fg4)", paddingTop:1 }}>
          {["9","11","1","3","5"].map(h => (
            <div key={h}>{h}</div>
          ))}
        </div>
        {/* Day columns with grid lines */}
        {days.map((d, i) => (
          <div key={i} style={{ position:"relative", borderLeft:"1px solid var(--border-subtle)",
                                 borderRight: i===days.length-1 ? "1px solid var(--border-subtle)" : "none" }}>
            {/* Hour separators */}
            {[1,2,3,4,5,6,7].map(h => (
              <div key={h} style={{ position:"absolute", left:0, right:0, top:h*hourHeight,
                                     height:1, background:"var(--border-subtle)", opacity:0.5 }}/>
            ))}
            {/* Meeting blocks for this day */}
            {blocks.filter(b => b.day === i).map((b, bi) => {
              const v = variants[b.variant];
              return (
                <div key={bi} style={{
                  position:"absolute",
                  left:2, right:2,
                  top: b.start*hourHeight,
                  height: b.span*hourHeight - 2,
                  borderRadius:4,
                  background: v.background,
                  color: v.color,
                  border: v.border,
                  padding:"3px 6px",
                  fontSize:10, fontWeight:500, lineHeight:1.2,
                  overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis",
                  cursor:"pointer",
                }}>
                  {b.title}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Mobile agenda: today's schedule as a vertical list */}
      <div data-ms="calendar-agenda" style={{ display:"none", flexDirection:"column", gap:8, marginTop:6 }}>
        {[
          { time:"9:00", title:"Standup",       variant:"muted",   len:"30m" },
          { time:"10:30", title:"Deep work",    variant:"solid",   len:"2h 30m" },
          { time:"2:00", title:"Retro",         variant:"outline", len:"1h 30m" },
          { time:"4:30", title:"Sync w/ Ada",   variant:"muted",   len:"45m" },
        ].map((b,i) => {
          const v = variants[b.variant];
          return (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px",
                                   background:"var(--bg-subtle)", border:"1px solid var(--border-subtle)",
                                   borderRadius:8 }}>
              <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", width:42, flexShrink:0 }}>
                {b.time}
              </div>
              <div style={{ flex:1, minWidth:0, display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ width:3, height:20, borderRadius:2, flexShrink:0,
                               background: b.variant==="solid" ? "var(--mono-1000)" :
                                           b.variant==="outline" ? "var(--fg3)" : "var(--border)" }}/>
                <div style={{ fontSize:13, fontWeight:500, color:"var(--fg1)",
                              whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                  {b.title}
                </div>
              </div>
              <span style={{ fontSize:10, color:"var(--fg3)", flexShrink:0 }}>{b.len}</span>
            </div>
          );
        })}
      </div>
    </BentoTile>
  );
}

function BentoCommand() {
  const items = [
    { icon:"search",  label:"Search anywhere",      meta:"⌘ K" },
    { icon:"layers",  label:"Open Components",      meta:"G · C" },
    { icon:"palette", label:"Change theme",         meta:"T" },
  ];
  return (
    <BentoTile span={5} pad="20px 20px 16px" lift={false}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:"var(--bg-subtle)",
                     border:"1px solid var(--border-subtle)", borderRadius:8, marginBottom:12 }}>
        <Icon name="search" size={14} style={{ color:"var(--fg3)" }}/>
        <span style={{ fontSize:13, color:"var(--fg3)", flex:1 }}>Search components, tokens, docs…</span>
        <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--fg3)", background:"var(--bg-muted)",
                        border:"1px solid var(--border-subtle)", padding:"2px 6px", borderRadius:4 }}>⌘ K</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
        {items.map((it,i) => (
          <div key={it.label} className="bento-cmd-row"
            style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 10px", borderRadius:5,
                     background: i===0 ? "var(--bg-muted)" : "transparent", cursor:"pointer",
                     transition:"background var(--duration-fast) var(--ease-standard)" }}
            onMouseEnter={e => { if (i!==0) e.currentTarget.style.background = "var(--bg-subtle)"; }}
            onMouseLeave={e => { if (i!==0) e.currentTarget.style.background = "transparent"; }}>
            <span style={{ width:22, height:22, borderRadius:4, background:"var(--bg-muted)",
                            display:"inline-flex", alignItems:"center", justifyContent:"center", color:"var(--fg2)" }}>
              <Icon name={it.icon} size={12}/>
            </span>
            <span style={{ fontSize:13, color:"var(--fg1)", flex:1 }}>{it.label}</span>
            <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--fg3)" }}>{it.meta}</span>
          </div>
        ))}
      </div>
    </BentoTile>
  );
}

function BentoPricing() {
  return (
    <BentoTile span={5} pad="22px 22px 20px">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
        <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)" }}>Team</div>
        <DemoBadge variant="solid">Popular</DemoBadge>
      </div>
      <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:14 }}>
        <div style={{ fontSize:36, fontWeight:700, letterSpacing:"-0.02em", color:"var(--fg1)" }}>$24</div>
        <div style={{ fontSize:12, color:"var(--fg3)" }}>/ user / month</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
        {["Unlimited projects","Shared component library","Role-based access","SSO + audit log"].map(f => (
          <div key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"var(--fg2)" }}>
            <Icon name="check" size={12}/>
            {f}
          </div>
        ))}
      </div>
      <motion.button whileHover={hoverLift} whileTap={pressDown}
        style={{ background:"var(--bg)", color:"var(--fg1)", border:"1px solid var(--border)",
                 borderRadius:6, padding:"9px 14px", fontSize:13, fontWeight:500, fontFamily:"inherit",
                 cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:"auto" }}>
        Start free trial
      </motion.button>
    </BentoTile>
  );
}

function BentoSettings() {
  const [s, setS] = useState({ email:true, push:false, twoFA:true });
  const rows = [
    { k:"email",  label:"Email alerts",       desc:"Daily summary of activity" },
    { k:"push",   label:"Push notifications", desc:"Ping me on mentions" },
    { k:"twoFA",  label:"Two-factor auth",    desc:"Require code on sign-in" },
  ];
  return (
    <BentoTile span={5} pad="22px 24px 22px">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)" }}>Preferences</div>
          <div style={{ fontSize:11, color:"var(--fg3)", marginTop:2 }}>Personal notification + security.</div>
        </div>
        <span style={{ fontSize:11, fontWeight:500, color:"var(--fg2)",
                        background:"var(--bg-muted)",
                        padding:"4px 10px", borderRadius:999 }}>
          {Object.values(s).filter(Boolean).length}/{rows.length} on
        </span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, flex:1 }}>
        {rows.map(r => (
          <div key={r.k} onClick={()=>setS(v=>({ ...v, [r.k]: !v[r.k] }))}
            style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12,
                     padding:"10px 12px", borderRadius:8, border:"1px solid var(--border-subtle)",
                     background:"var(--bg-subtle)", cursor:"pointer",
                     transition:"background var(--duration-fast) var(--ease-standard)" }}>
            <div>
              <div style={{ fontSize:13, fontWeight:500, color:"var(--fg1)", lineHeight:1.2 }}>{r.label}</div>
              <div style={{ fontSize:11, color:"var(--fg3)", marginTop:3 }}>{r.desc}</div>
            </div>
            <motion.span
              animate={{ backgroundColor: s[r.k] ? "#09090b" : "#d4d4d7" }}
              transition={{ duration: DUR.base, ease: EASE_STANDARD }}
              style={{ width:32, height:18, borderRadius:999, position:"relative", display:"inline-block", flexShrink:0 }}>
              <motion.span
                animate={{ x: s[r.k] ? 14 : 0 }}
                transition={{ duration: DUR.base, ease: EASE_EMPHASIS }}
                style={{ position:"absolute", top:2, left:2, width:14, height:14, borderRadius:"50%",
                         background:"#fff", boxShadow:"0 1px 2px rgb(0 0 0 / 0.2)" }}/>
            </motion.span>
          </div>
        ))}
      </div>
    </BentoTile>
  );
}

function ThemedSurface({ theme }) {
  return (
    <motion.div whileHover={hoverLift} data-theme={theme}
      style={{ background:"var(--bg)", border:"1px solid var(--border-subtle)", borderRadius:10,
               padding:"24px 24px 20px", display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:11, fontWeight:500,
                        color:"var(--fg2)", padding:"3px 10px", borderRadius:999,
                        border:"1px solid var(--border-subtle)", background:"var(--bg-subtle)" }}>
          <span style={{ width:8, height:8, borderRadius:"50%",
                          background: theme==="dark" ? "var(--mono-1000)" : "#fff",
                          border:"1px solid var(--border)" }}/>
          {theme==="dark" ? "Dark theme" : "Light theme"}
        </span>
      </div>
      <div style={{ fontSize:20, fontWeight:600, color:"var(--fg1)", letterSpacing:"-0.01em" }}>Monthly revenue</div>
      <div style={{ fontSize:32, fontWeight:700, color:"var(--fg1)", letterSpacing:"-0.02em" }}>$24,310</div>
      <div style={{ display:"flex", gap:6 }}>
        <button style={{ background:"var(--accent)", color:"var(--accent-fg)", border:"none", borderRadius:6,
                         padding:"7px 14px", fontSize:12, fontWeight:500, fontFamily:"inherit", cursor:"pointer" }}>
          View report
        </button>
        <button style={{ background:"var(--bg)", color:"var(--fg1)", border:"1px solid var(--border)",
                         borderRadius:6, padding:"7px 14px", fontSize:12, fontWeight:500, fontFamily:"inherit", cursor:"pointer" }}>
          Export
        </button>
      </div>
    </motion.div>
  );
}

function BentoShortcuts() {
  const rows = [
    { label:"Open command bar",    keys:["Cmd","K"] },
    { label:"Search",              keys:["/"] },
    { label:"New document",        keys:["Cmd","N"] },
    { label:"Toggle sidebar",      keys:["Cmd","B"] },
    { label:"Go to settings",      keys:["G","S"] },
  ];
  return (
    <div
      data-ms="bento-shortcuts"
      style={{ background:"var(--bg)", border:"1px solid var(--border-subtle)",
               borderRadius:12, padding:"20px 20px 18px", display:"flex", flexDirection:"column",
               boxShadow:"var(--shadow-sm)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)" }}>Shortcuts</div>
          <div style={{ fontSize:11, color:"var(--fg3)", marginTop:2 }}>Every surface, keyboard-first</div>
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, flex:1 }}>
        {rows.map(r => (
          <div key={r.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                                       fontSize:12, color:"var(--fg2)" }}>
            <span>{r.label}</span>
            <span style={{ display:"inline-flex", gap:4 }}>
              {r.keys.map(k => (
                <kbd key={k} style={{ fontFamily:"var(--font-mono)", fontSize:10, background:"var(--bg-muted)",
                                       color:"var(--fg1)", border:"1px solid var(--border-subtle)",
                                       borderBottomWidth:2, borderRadius:4, padding:"0 5px", height:20,
                                       minWidth:20, display:"inline-flex", alignItems:"center",
                                       justifyContent:"center", lineHeight:1 }}>{k}</kbd>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BentoChangelog() {
  const items = [
    { tag:"v1.2.0", kind:"New",   title:"Slider, Toggle group, Kbd, Spinner"   },
    { tag:"v1.1.4", kind:"Fixed", title:"Mobile drawer slides in from the right" },
    { tag:"v1.1.3", kind:"Docs",  title:"LLM semantic naming prompt"           },
    { tag:"v1.1.0", kind:"New",   title:"Framer Motion presets"                },
  ];
  const kindColor = { New:"var(--fg1)", Fixed:"var(--fg2)", Docs:"var(--fg3)" };
  return (
    <div
      data-ms="bento-changelog"
      style={{ background:"var(--bg)", border:"1px solid var(--border-subtle)",
               borderRadius:12, padding:"20px 20px 18px", display:"flex", flexDirection:"column",
               boxShadow:"var(--shadow-sm)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)" }}>Changelog</div>
          <div style={{ fontSize:11, color:"var(--fg3)", marginTop:2 }}>Shipped last 30 days</div>
        </div>
        <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--fg3)" }}>4 releases</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:0, flex:1 }}>
        {items.map((it, i) => (
          <div key={it.tag}
               style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"8px 0",
                        borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)" }}>
            <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--fg3)",
                           minWidth:44 }}>{it.tag}</span>
            <span style={{ fontSize:10, fontWeight:600, color: kindColor[it.kind], minWidth:36,
                           textTransform:"uppercase", letterSpacing:"0.04em" }}>{it.kind}</span>
            <span style={{ fontSize:12, color:"var(--fg1)", flex:1, lineHeight:1.45 }}>{it.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BentoActivity() {
  const rows = [
    { who:"AT", text:"deployed", target:"monoset.design", time:"just now" },
    { who:"GH", text:"commented on", target:"PR #42",      time:"4m" },
    { who:"MC", text:"merged",      target:"feat/kbd",     time:"22m" },
    { who:"LT", text:"opened",      target:"Ticket #218",  time:"1h" },
    { who:"DK", text:"released",    target:"v1.2.0",       time:"3h" },
  ];
  return (
    <div
      data-ms="bento-activity"
      style={{ background:"var(--bg)", border:"1px solid var(--border-subtle)",
               borderRadius:12, padding:"20px 20px 18px", display:"flex", flexDirection:"column",
               boxShadow:"var(--shadow-sm)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)" }}>Team activity</div>
          <div style={{ fontSize:11, color:"var(--fg3)", marginTop:2 }}>Live across your workspace</div>
        </div>
        <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10,
                        color:"var(--fg3)" }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:"#2e4a33" }}/>live
        </span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:8,
                                 padding:"8px 0", fontSize:12, color:"var(--fg2)",
                                 borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)" }}>
            <span style={{ width:22, height:22, borderRadius:"50%", background:"var(--mono-1000)",
                            color:"#fff", fontSize:9, fontWeight:600,
                            display:"inline-flex", alignItems:"center", justifyContent:"center",
                            flexShrink:0 }}>{r.who}</span>
            <span style={{ flex:1, minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {r.text} <span style={{ color:"var(--fg1)", fontWeight:500 }}>{r.target}</span>
            </span>
            <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--fg4)" }}>{r.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BentoTokens() {
  const ramp = [
    ["0","#ffffff"],["50","#fafafa"],["100","#f4f4f5"],["200","#e8e8ea"],
    ["300","#d4d4d7"],["400","#a1a1a6"],["500","#71717a"],["600","#52525a"],
    ["700","#3f3f45"],["800","#27272b"],["900","#18181b"],["1000","#09090b"],
  ];
  return (
    <div
      data-ms="bento-tokens"
      style={{ background:"var(--bg)", border:"1px solid var(--border-subtle)",
               borderRadius:12, padding:"20px 20px 18px", display:"flex", flexDirection:"column",
               boxShadow:"var(--shadow-sm)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)" }}>Tokens</div>
          <div style={{ fontSize:11, color:"var(--fg3)", marginTop:2 }}>Every surface, one scale</div>
        </div>
        <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--fg3)" }}>12 steps</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        {ramp.map(([n, hex]) => (
          <div key={n} style={{ display:"flex", alignItems:"center", gap:10, fontSize:10,
                                 fontFamily:"var(--font-mono)", color:"var(--fg2)" }}>
            <span style={{ width:18, height:18, borderRadius:4, background:hex,
                            border:"1px solid var(--border-subtle)", flexShrink:0 }}/>
            <span style={{ flex:1, color:"var(--fg2)" }}>mono-{n}</span>
            <span style={{ color:"var(--fg4)" }}>{hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ onStart }) {
  const [copied, setCopied] = useState(false);
  const cmd = "npm install monoset";
  const copy = () => { navigator.clipboard?.writeText(cmd).catch(()=>{}); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      {/* NAV */}
      <header data-ms="hero-header" style={{ position:"sticky", top:0, zIndex:100, background:"rgba(255,255,255,0.9)",
                       backdropFilter:"blur(8px)", borderBottom:"1px solid var(--border-subtle)",
                       display:"flex", alignItems:"center", padding:"0 24px", height:60, gap:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <img src="/assets/monoset-mark.svg" width="22" height="22" alt=""/>
          <span style={{ fontSize:15, fontWeight:600, letterSpacing:"-0.01em" }}>Monoset</span>
        </div>
        <nav data-ms="hero-nav" style={{ display:"flex", gap:4, marginLeft:8 }}>
          {[["Docs",()=>onStart("introduction")],["Components",()=>onStart("buttons")],["Foundations",()=>onStart("colors")]].map(([l,fn])=>(
            <button key={l} onClick={fn} style={{ background:"none", border:"none", cursor:"pointer",
              fontSize:13, color:"var(--fg2)", padding:"6px 10px", borderRadius:5, fontFamily:"inherit",
              transition:"color 120ms, background 120ms" }}
              onMouseEnter={e=>{e.currentTarget.style.color="var(--fg1)";e.currentTarget.style.background="var(--bg-muted)";}}
              onMouseLeave={e=>{e.currentTarget.style.color="var(--fg2)";e.currentTarget.style.background="none";}}>{l}</button>
          ))}
        </nav>
        <div data-ms="hero-header-actions" style={{ marginLeft:"auto", display:"flex", gap:8, alignItems:"center" }}>
          <span style={{ fontSize:12, fontWeight:500, color:"var(--fg3)", background:"var(--bg-muted)",
                         border:"1px solid var(--border-subtle)", padding:"3px 10px", borderRadius:999 }}>v0.1</span>
          <button onClick={()=>onStart("introduction")} style={{ background:"var(--mono-1000)", color:"#fff",
            fontSize:13, fontWeight:500, border:"none", borderRadius:6, padding:"7px 16px", cursor:"pointer",
            display:"flex", alignItems:"center", fontFamily:"inherit" }}>
            Get started
          </button>
        </div>
      </header>

      {/* HERO BODY */}
      <div data-ms="hero-body" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                    padding:"120px 32px 40px", textAlign:"center", maxWidth:760, margin:"0 auto", width:"100%" }}>
        <div data-ms="hero-eyebrow" style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:24,
                      fontSize:12, fontWeight:500, color:"var(--fg2)",
                      padding:"5px 12px 5px 10px", borderRadius:999,
                      border:"1px solid var(--border-subtle)", background:"var(--bg-subtle)" }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--fg1)" }}/>
          Design system
          <span style={{ width:1, height:10, background:"var(--border)" }}/>
          <span style={{ color:"var(--fg3)" }}>v0.1</span>
        </div>
        <h1 data-ms="hero-title" style={{ fontSize:64, fontWeight:700, letterSpacing:"-0.03em", lineHeight:1.05, margin:"0 0 20px",
                     color:"var(--fg1)" }}>
          Everything.<br/>
          <span style={{ color:"var(--fg3)" }}>Nothing extra.</span>
        </h1>
        <p data-ms="hero-lead" style={{ fontSize:18, color:"var(--fg3)", lineHeight:1.65, maxWidth:520, margin:"0 0 36px" }}>
          A minimal monotone design system. One neutral ramp, one typeface, all the components you'd build anyway, and nothing that tries to upstage the product you're putting it inside.
        </p>
        <div data-ms="hero-ctas" style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
          <motion.button onClick={()=>onStart("introduction")}
            whileHover={hoverLift} whileTap={pressDown}
            style={{ background:"var(--mono-1000)", color:"#fff", fontSize:14,
            fontWeight:500, border:"1px solid var(--mono-1000)", borderRadius:7, padding:"0 24px", height:44, cursor:"pointer",
            display:"flex", alignItems:"center", gap:8, fontFamily:"inherit", boxSizing:"border-box" }}>
            Read the docs
          </motion.button>
          <motion.div onClick={copy}
            whileHover={hoverLift} whileTap={pressDown}
            style={{ display:"flex", alignItems:"center", gap:10, padding:"0 18px", height:44,
               background:"var(--bg-subtle)", border:"1px solid var(--border)", borderRadius:7,
               cursor:"pointer", fontSize:13, fontFamily:"var(--font-mono)", color:"var(--fg2)", boxSizing:"border-box" }}>
            $ {cmd}
            <Icon name={copied?"check":"copy"} size={14} style={{ color:"var(--fg3)" }}/>
          </motion.div>
        </div>

      </div>

      {/* ── BENTO PRODUCT SHOWCASE ────────────────────────────────── */}
      <motion.section
        data-ms="bento"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: DUR.slow, ease: EASE_EMPHASIS }}
        style={{ maxWidth: 1720, margin: "0 auto", width: "100%", padding: "96px clamp(20px, 3vw, 40px) 96px" }}>
        <div data-ms="bento-wide-wrap" style={{ display:"grid",
                 gridTemplateColumns:"minmax(0, 1fr) min(1080px, 100%) minmax(0, 1fr)", gap:16, alignItems:"start" }}>
          <div data-ms="bento-wide-col" style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <BentoShortcuts/>
            <BentoActivity/>
          </div>
          <div data-ms="bento-grid" style={{ display:"grid", gridTemplateColumns:"repeat(12, 1fr)", gridAutoRows:"minmax(220px, 320px)", gap:16 }}>
            <BentoAnalytics/>
            <BentoTypography/>
            <BentoPlayer/>
            <BentoAuth/>
            <BentoTeam/>
            <BentoColors/>
            <BentoCalendar/>
            <BentoSettings/>
          </div>
          <div data-ms="bento-wide-col" style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <BentoChangelog/>
            <BentoTokens/>
          </div>
        </div>
      </motion.section>

      {/* ── LIGHT / DARK ────────────────────────────────────────────── */}
      <motion.section
        data-ms="theme-section"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: DUR.slow, ease: EASE_EMPHASIS }}
        style={{ maxWidth: 1080, margin: "0 auto", width: "100%", padding: "0 32px 80px" }}>
        <div data-ms="theme-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <ThemedSurface theme="light"/>
          <ThemedSurface theme="dark"/>
        </div>
      </motion.section>

      {/* FEATURE STRIP */}
      <div data-ms="features" style={{ padding:"52px 32px",
                    display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:24, maxWidth:1080, margin:"0 auto", width:"100%" }}>
        {[
          { icon:"layers",  title:"All the basics",     desc:"Buttons, inputs, badges, tables, tabs, alerts, avatars. Nothing exotic." },
          { icon:"palette", title:"Full token system",  desc:"Color, type, spacing, radii, shadows, and motion. One CSS file." },
          { icon:"zap",     title:"Drop-in CSS",        desc:"Ship the tokens as-is. Works in React, Vue, or plain HTML." },
          { icon:"moon",    title:"Dark mode ready",    desc:"Flip data-theme=\"dark\" on any container. All tokens adapt." },
        ].map(f=>(
          <div key={f.title} style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ color:"var(--fg1)", marginBottom:2 }}><Icon name={f.icon} size={18}/></div>
            <div style={{ fontSize:13, fontWeight:600 }}>{f.title}</div>
            <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer data-ms="hero-footer" style={{ borderTop:"1px solid var(--border-subtle)", padding:"20px 32px",
                       display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <img src="/assets/monoset-mark.svg" width="16" height="16" alt=""/>
          <span style={{ fontSize:12, color:"var(--fg3)" }}>Monoset v0.1</span>
        </div>
        <div style={{ fontSize:12, color:"var(--fg4)" }}>MIT license · No opinions supplied.</div>
      </footer>
    </div>
  );
}

/* ─── DOCS LAYOUT ─────────────────────────────────────────────────────── */
function DocsLayout({ page, setPage, onHome }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    const meta = PAGE_META[page];
    if (meta) {
      document.title = `${meta.title} · Monoset`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", meta.desc);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", `${meta.title} · Monoset`);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", meta.desc);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", `https://monoset.design/${page}`);
    }
  }, [page]);

  return (
    <div data-ms="docs-layout" style={{ height:"100vh", display:"flex", flexDirection:"column", background:"var(--bg)", color:"var(--fg1)" }}>
      {/* TOP NAV */}
      <header data-ms="docs-header" style={{ height:60, borderBottom:"1px solid var(--border-subtle)", background:"var(--bg)",
                       display:"flex", alignItems:"center", padding:"0 24px", gap:12, flexShrink:0, zIndex:100 }}>
        <button onClick={onHome} style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none",
                                          cursor:"pointer", padding:0, fontFamily:"inherit" }}>
          <img src="/assets/monoset-mark.svg" width="22" height="22" alt=""/>
          <span style={{ fontSize:15, fontWeight:600, letterSpacing:"-0.01em", color:"var(--fg1)" }}>Monoset</span>
        </button>
        <span style={{ color:"var(--border)", fontSize:18, fontWeight:300 }}>/</span>
        <span style={{ fontSize:13, color:"var(--fg3)" }}>Docs</span>
        <div style={{ marginLeft:"auto", display:"flex", gap:8, alignItems:"center" }}>
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
          <span style={{ fontSize:11, fontWeight:500, color:"var(--fg3)", background:"var(--bg-muted)",
                         border:"1px solid var(--border-subtle)", padding:"3px 9px", borderRadius:999 }}>v0.1</span>
          <ThemeToggle/>
          {/* Mobile menu */}
          <button data-ms="docs-mobile-btn" onClick={() => setMobileNavOpen(true)}
            style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:4, alignItems:"center", justifyContent:"center", color:"var(--fg1)" }}>
            <Icon name="menu" size={20}/>
          </button>
        </div>
      </header>

      <div style={{ flex:1, display:"grid", gridTemplateColumns:"var(--sidebar-w) 1fr", overflow:"hidden", minHeight:0 }}>
        {/* SIDEBAR */}
        <aside data-ms="docs-sidebar" style={{ borderRight:"1px solid var(--border-subtle)", background:"var(--bg-subtle)",
                        overflowY:"auto", flexShrink:0 }}>
          <Sidebar active={page} setPage={p => setPage(p)}/>
        </aside>
        {/* CONTENT */}
        <div data-ms="docs-content" ref={contentRef} style={{ overflowY:"auto", padding:"32px 48px 80px" }}>
          <div style={{ maxWidth:720 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_EMPHASIS } }}
                exit={{ opacity: 0, transition: { duration: DUR.fast, ease: EASE_EXIT } }}>
                <Suspense fallback={<div style={{height:200}}/>}>
                  <DocsContent page={page} setPage={setPage}/>
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile drawer: slides in from the right since the trigger lives top-right */}
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
              <Sidebar active={page} setPage={p => setPage(p)} mobile onClose={() => setMobileNavOpen(false)}/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── TWEAKS ──────────────────────────────────────────────────────────── */
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

/* ─── APP ROOT ─────────────────────────────────────────────────────────── */
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const slug = location.pathname.slice(1); // "" for home, "colors" for /colors, etc.
  const screen = slug ? "docs" : "home";
  const page = PAGE_META[slug] ? slug : "introduction";

  const [tweaksVisible, setTweaksVisible] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);

  // Iframe-editor message bridge. Guards: listener is cleaned up on unmount,
  // parent origin is restricted to Vercel preview URLs.
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === "__activate_edit_mode") setTweaksVisible(true);
      if (e.data?.type === "__deactivate_edit_mode") setTweaksVisible(false);
    };
    window.addEventListener("message", handler);
    // Only announce availability if we're actually embedded
    if (window.parent !== window) {
      try {
        window.parent.postMessage({ type: "__edit_mode_available" }, "*");
      } catch {}
    }
    return () => window.removeEventListener("message", handler);
  }, []);

  // Apply tweaks to CSS custom properties whenever they change
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

  if (screen === "docs") {
    return <>
      <DocsLayout page={page} setPage={p => navigate(`/${p}`)} onHome={() => navigate("/")}/>
      <CommandPalette/>
      <TweaksPanel visible={tweaksVisible} tweaks={tweaks} setTweaks={setTweaks}/>
    </>;
  }
  return <>
    <Hero onStart={p => navigate(`/${p}`)}/>
    <CommandPalette/>
    <TweaksPanel visible={tweaksVisible} tweaks={tweaks} setTweaks={setTweaks}/>
  </>;
}


export default App;
