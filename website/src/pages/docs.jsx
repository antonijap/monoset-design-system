import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EASE_STANDARD, EASE_EMPHASIS, EASE_EXIT, DUR,
  fadeUp, hoverLift, pressDown,
  Icon,
  CopyButton, Code, InlineCode,
  H1, H2, H3, P, Lead, Divider,
  Preview, Step,
  DemoButton, DemoBadge,
} from '../ui/docs.jsx';

function PageIntroduction({ setPage }) {
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em",
                    textTransform:"uppercase", marginBottom:12 }}>Getting Started</div>
      <H1>Introduction</H1>
      <Lead>Monoset is a design system for teams that want their product to look like their product, not like the design system. One neutral ramp, one typeface, and the usual set of components, done the way you'd build them anyway if you had the afternoon.</Lead>
      <div data-ms="intro-pillars" style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, margin:"24px 0 32px" }}>
        {[
          { icon:"palette", title:"Monotone",   desc:"A 12-step neutral ramp does all the work. No brand hues, no gradients, no accents pretending to mean something." },
          { icon:"box",     title:"Unopinionated", desc:"Components stay quiet on purpose. Your product adds the personality; the kit just holds the structure." },
          { icon:"zap",     title:"Minimal",    desc:"4px grid, hairline borders, barely-there shadows. The components that aren't here, you probably didn't need." },
        ].map(c => (
          <motion.div key={c.title} whileHover={hoverLift}
            style={{ border:"1px solid var(--border-subtle)", borderRadius:8, padding:"18px 16px" }}>
            <div style={{ width:32, height:32, background:"var(--bg-muted)", borderRadius:6, display:"flex",
                          alignItems:"center", justifyContent:"center", marginBottom:12, color:"var(--fg1)" }}>
              <Icon name={c.icon} size={16}/>
            </div>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>{c.title}</div>
            <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.6 }}>{c.desc}</div>
          </motion.div>
        ))}
      </div>

      <H2 id="what">What's included</H2>
      <P>Monoset ships a CSS token file and a set of React primitives for every common UI surface:</P>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:24 }}>
        {["Color tokens (12-step ramp + semantic)","Typography (Inter + JetBrains Mono)","Spacing (4px base grid)","Radii + shadow system","Motion tokens (easing + duration)","Buttons (4 variants × 3 sizes)","Text inputs + textarea","Checkbox, radio, switch","Badges + tags","Cards (outline, elevated, inset)","Data tables","Tabs, breadcrumbs","Alerts + toasts","Avatars + progress","Empty states + skeletons"].map(f => (
          <div key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"var(--fg2)", padding:"5px 0" }}>
            <Icon name="check" size={14} style={{ color:"var(--fg1)", flexShrink:0 }}/>
            {f}
          </div>
        ))}
      </div>

      <div style={{ background:"var(--bg-subtle)", border:"1px solid var(--border-subtle)", borderRadius:8, padding:"20px 22px",
                    display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>Ready to install?</div>
          <div style={{ fontSize:12, color:"var(--fg3)" }}>Two commands and you're running.</div>
        </div>
        <button onClick={() => setPage("installation")}
          style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"8px 16px", background:"var(--accent)",
                   color:"var(--accent-fg)", fontSize:13, fontWeight:500, border:"none", borderRadius:6, cursor:"pointer" }}>
          Install now <Icon name="arrowRight" size={14}/>
        </button>
      </div>
    </div>
  );
}

function PageInstallation() {
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Getting Started</div>
      <H1>Installation</H1>
      <Lead>Three ways in, depending on how deep you're going. The starter CLI is the fastest for a new project, the React kit is the usual pick, and the tokens-only package is there if you're not using React.</Lead>

      <H2 id="option-starter">Starter CLI (new project)</H2>
      <P>Scaffolds a Vite + React 19 project pre-wired with Monoset. Zero configuration.</P>
      <Step n="1" title="Run create-monoset-app">
        <Code filename="terminal">{`npm create monoset-app@latest my-app`}</Code>
      </Step>
      <Step n="2" title="Install and run">
        <Code filename="terminal">{`cd my-app
npm install
npm run dev`}</Code>
      </Step>

      <Divider/>

      <H2 id="option-react">React kit (existing project)</H2>
      <P>The component library plus the tokens and the Framer Motion presets. If you already have a React app, this is the path.</P>
      <Step n="1" title="Install the packages">
        <Code filename="terminal">{`npm install @monoset/react @monoset/tokens react react-dom framer-motion`}</Code>
      </Step>
      <Step n="2" title="Import the CSS at your app root">
        <Code filename="src/main.jsx">{`import "@monoset/tokens/css";
import "@monoset/react/styles.css";`}</Code>
      </Step>
      <Step n="3" title="Wrap the tree in MonosetProvider and use components">
        <Code filename="src/App.jsx">{`import { MonosetProvider, Button, Badge, Card } from "@monoset/react";

export default function App() {
  return (
    <MonosetProvider>
      <Card>
        <h2>Hello, Monoset.</h2>
        <Badge variant="solid">New</Badge>
        <Button variant="primary">Save changes</Button>
      </Card>
    </MonosetProvider>
  );
}`}</Code>
      </Step>

      <Divider/>

      <H2 id="option-tokens">CSS tokens only (any framework)</H2>
      <P>If you're building components yourself, or your stack isn't React, pull in just the token file and style against the CSS variables.</P>
      <Step n="1" title="Install">
        <Code filename="terminal">{`npm install @monoset/tokens`}</Code>
      </Step>
      <Step n="2" title="Import the CSS">
        <Code filename="src/main.css">{`@import "@monoset/tokens/css";`}</Code>
      </Step>
      <Step n="3" title="Style against the variables">
        <Code filename="src/button.css">{`.btn {
  background: var(--mono-1000);
  color: var(--mono-0);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-5);
  font-family: var(--font-sans);
}`}</Code>
      </Step>

      <Divider/>

      <H2 id="fonts">Fonts</H2>
      <P>Two families, both open source: Inter for words, JetBrains Mono for code and numbers. The website self-hosts them via <InlineCode>@fontsource/inter</InlineCode> and <InlineCode>@fontsource/jetbrains-mono</InlineCode>; in your app you can do the same or drop in any other method that works for you.</P>
      <Code filename="index.html">{`<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>`}</Code>
      <P>If the extra Google Fonts request bothers you, grab the WOFF2 files, drop them in <InlineCode>/fonts/</InlineCode>, and swap the <InlineCode>@import</InlineCode> at the top of <InlineCode>colors_and_type.css</InlineCode> for an <InlineCode>@font-face</InlineCode> block.</P>
    </div>
  );
}

function PageUsage() {
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Getting Started</div>
      <H1>Basic usage</H1>
      <Lead>A quick end-to-end example: a sign-in card built with Monoset tokens and primitives.</Lead>

      <H2 id="example">Full example</H2>
      <Preview>
        <div style={{ width:320, background:"var(--bg)", border:"1px solid var(--border-subtle)", borderRadius:8, padding:24, display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <div style={{ fontSize:16, fontWeight:600 }}>Sign in</div>
            <div style={{ fontSize:12, color:"var(--fg3)", marginTop:4 }}>Use your workspace email.</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <label style={{ fontSize:12, fontWeight:500 }}>Email</label>
            <input readOnly value="ada@monoset.dev" style={{ fontFamily:"inherit", fontSize:13, padding:"9px 12px",
              border:"1px solid var(--border)", borderRadius:6, background:"var(--bg)", color:"var(--fg1)", outline:"none" }}/>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <label style={{ fontSize:12, fontWeight:500 }}>Password</label>
            <input readOnly type="password" value="monoset" style={{ fontFamily:"inherit", fontSize:13, padding:"9px 12px",
              border:"1px solid var(--border)", borderRadius:6, background:"var(--bg)", color:"var(--fg1)", outline:"none" }}/>
          </div>
          <DemoButton variant="primary" size="lg">Continue</DemoButton>
        </div>
      </Preview>

      <Code filename="SignIn.jsx">{`function SignIn() {
  return (
    <Card pad={24}>
      <h2 className="h2">Sign in</h2>
      <p className="meta">Use your workspace email.</p>

      <Field label="Email">
        <Input type="email" placeholder="you@example.com"/>
      </Field>
      <Field label="Password">
        <Input type="password"/>
      </Field>

      <Button variant="primary" size="lg">Continue</Button>
    </Card>
  );
}`}</Code>

      <H2 id="dark">Dark theme</H2>
      <P>Stick <InlineCode>data-theme="dark"</InlineCode> on any element and the semantic tokens flip for everything inside it. No class overrides, no ThemeProvider. Do it on <InlineCode>&lt;html&gt;</InlineCode> for a whole-app switch, or on a single panel for an inverted card.</P>
      <Code>{`<div data-theme="dark">
  <Button variant="primary">Inverted surface</Button>
</div>`}</Code>
      <Preview bg="var(--mono-1000)">
        <div data-theme="dark" style={{ display:"flex", gap:8 }}>
          <DemoButton variant="primary">Save</DemoButton>
          <DemoButton variant="secondary">Cancel</DemoButton>
          <DemoBadge variant="outline">v0.1</DemoBadge>
        </div>
      </Preview>
    </div>
  );
}

function PageColors() {
  const ramp = [
    ["0","#ffffff"],["50","#fafafa"],["100","#f4f4f5"],["200","#e8e8ea"],
    ["300","#d4d4d7"],["400","#a1a1a6"],["500","#71717a"],["600","#52525a"],
    ["700","#3f3f45"],["800","#27272b"],["900","#18181b"],["1000","#09090b"],
  ];
  const semantic = [
    { token:"--bg",          val:"#ffffff",  role:"Primary canvas" },
    { token:"--bg-subtle",   val:"#fafafa",  role:"Sidebar, inset" },
    { token:"--bg-muted",    val:"#f4f4f5",  role:"Fields, chips" },
    { token:"--fg1",         val:"#09090b",  role:"Primary text" },
    { token:"--fg2",         val:"#3f3f45",  role:"Body text" },
    { token:"--fg3",         val:"#71717a",  role:"Secondary / meta" },
    { token:"--fg4",         val:"#a1a1a6",  role:"Placeholder" },
    { token:"--border-subtle",val:"#e8e8ea", role:"Hairline" },
    { token:"--border",      val:"#d4d4d7",  role:"Form inputs" },
    { token:"--accent",      val:"#09090b",  role:"CTA / focus ring" },
  ];
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Foundations</div>
      <H1>Colors</H1>
      <Lead>One 12-step neutral ramp. Backgrounds, text, borders, and shadows all pull from it. No hues and no gradients. The constraint is the whole point.</Lead>

      <H2 id="ramp">Neutral ramp</H2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(12, 1fr)", gap:6, marginBottom:8 }}>
        {ramp.map(([step, hex]) => (
          <div key={step} style={{ display:"flex", flexDirection:"column", gap:4 }}>
            <div style={{ aspectRatio:"1", background:hex, borderRadius:4,
                          border: step==="0"||step==="50"||step==="100" ? "1px solid var(--border-subtle)" : "none" }}/>
            <div style={{ fontSize:9, fontFamily:"var(--font-mono)", color:"var(--fg3)", textAlign:"center" }}>{step}</div>
          </div>
        ))}
      </div>
      <Code>{`var(--mono-0)    /* #ffffff */
var(--mono-100)  /* #f4f4f5 */
var(--mono-500)  /* #71717a */
var(--mono-1000) /* #09090b */`}</Code>

      <H2 id="semantic">Semantic tokens</H2>
      <P>Reach for the semantic tokens (<InlineCode>--bg</InlineCode>, <InlineCode>--fg1</InlineCode>, <InlineCode>--border</InlineCode>) inside components. Raw ramp values (<InlineCode>--mono-500</InlineCode>) are for defining new semantic tokens, not for sprinkling into UI. Otherwise the dark-mode flip misses you.</P>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden", marginBottom:16 }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr style={{ background:"var(--bg-subtle)" }}>
              {["Token","Value","Role"].map(h => (
                <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11,
                                     color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase",
                                     borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {semantic.map((r,i) => (
              <tr key={r.token} style={{ borderBottom: i<semantic.length-1?"1px solid var(--border-subtle)":"none" }}>
                <td style={{ padding:"9px 14px" }}><InlineCode>{r.token}</InlineCode></td>
                <td style={{ padding:"9px 14px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:14, height:14, borderRadius:3, background:r.val,
                                  border:"1px solid var(--border-subtle)", flexShrink:0 }}/>
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--fg3)" }}>{r.val}</span>
                  </div>
                </td>
                <td style={{ padding:"9px 14px", color:"var(--fg3)" }}>{r.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageTypography() {
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Foundations</div>
      <H1>Typography</H1>
      <Lead>Inter for UI and body, JetBrains Mono for code. A scale from 11px to 64px (hit ratios, not arbitrary sizes) with two ways to create contrast: tone and size. Weight does some of the work too, but tone carries it.</Lead>

      <H2 id="scale">Type scale</H2>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden", marginBottom:24 }}>
        {[
          { tok:"--text-5xl", px:64, w:700, sample:"Display", track:"-0.02em" },
          { tok:"--text-4xl", px:48, w:600, sample:"Heading 1", track:"-0.02em" },
          { tok:"--text-3xl", px:36, w:600, sample:"Heading 2", track:"-0.01em" },
          { tok:"--text-2xl", px:28, w:600, sample:"Heading 3", track:"-0.01em" },
          { tok:"--text-xl",  px:22, w:600, sample:"Heading 4" },
          { tok:"--text-lg",  px:18, w:400, sample:"Lead body text" },
          { tok:"--text-base",px:14, w:400, sample:"Body default" },
          { tok:"--text-sm",  px:12, w:400, sample:"Small / meta" },
          { tok:"--text-xs",  px:11, w:500, sample:"EYEBROW LABEL", track:"0.12em", upper:true },
        ].map((row, i, arr) => (
          <div key={row.tok} style={{ display:"grid", gridTemplateColumns:"110px 1fr", alignItems:"center",
                                       padding:"12px 16px", gap:16,
                                       borderBottom: i<arr.length-1?"1px solid var(--border-subtle)":"none",
                                       background: i%2===0?"var(--bg)":"var(--bg-subtle)" }}>
            <div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--fg3)" }}>{row.tok}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--fg4)" }}>{row.px}px · {row.w}</div>
            </div>
            <div style={{ fontSize:row.px>32?row.px*0.7:row.px, fontWeight:row.w, letterSpacing:row.track||0,
                          textTransform:row.upper?"uppercase":"none", lineHeight:1.15,
                          color:"var(--fg1)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {row.sample}
            </div>
          </div>
        ))}
      </div>

      <H2 id="families">Families</H2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
        <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, padding:"20px 18px" }}>
          <div style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--fg3)", marginBottom:10 }}>SANS · INTER</div>
          <div style={{ fontSize:36, fontWeight:600, letterSpacing:"-0.02em", lineHeight:1 }}>Aa Gg</div>
          <div style={{ fontSize:36, fontWeight:400, letterSpacing:"-0.01em", lineHeight:1, color:"var(--fg2)" }}>01 &amp;!</div>
          <div style={{ fontSize:11, color:"var(--fg3)", marginTop:10 }}>Weights 400 / 500 / 600 / 700 · Variable</div>
        </div>
        <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, padding:"20px 18px" }}>
          <div style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--fg3)", marginBottom:10 }}>MONO · JETBRAINS MONO</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:28, fontWeight:500, lineHeight:1.1 }}>Aa Gg</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:28, fontWeight:400, lineHeight:1.1, color:"var(--fg2)" }}>01 []</div>
          <div style={{ fontSize:11, color:"var(--fg3)", marginTop:10 }}>Code, tokens, numeric UI</div>
        </div>
      </div>

      <Code>{`/* Use via CSS vars */
font-family: var(--font-sans);
font-family: var(--font-mono);

/* Semantic class helpers */
.h1 { font-size: var(--text-4xl); font-weight: var(--weight-semibold); letter-spacing: var(--tracking-tight); }
.eyebrow { font-size: var(--text-xs); font-weight: var(--weight-medium); letter-spacing: var(--tracking-widest); text-transform: uppercase; }`}</Code>
    </div>
  );
}

function PageSpacing() {
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Foundations</div>
      <H1>Spacing &amp; radii</H1>
      <Lead>A 4px base grid with named tokens. Components snap to these values; resist the urge to sneak in a stray 7px padding because it "looks better". It usually doesn't, and the system falls apart one off-grid value at a time.</Lead>

      <H2 id="spacing">Spacing scale</H2>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
        {[[2,4],[3,8],[4,12],[5,16],[6,20],[7,24],[8,32],[9,40],[10,48],[11,64],[12,80]].map(([n,px]) => (
          <div key={n} style={{ display:"grid", gridTemplateColumns:"90px 1fr 40px", alignItems:"center", gap:12 }}>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg3)" }}>--space-{n}</span>
            <div style={{ height:8, background:"var(--mono-900)", borderRadius:2, width:px }}/>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg3)", textAlign:"right" }}>{px}</span>
          </div>
        ))}
      </div>

      <H2 id="radii">Radii</H2>
      <div data-ms="radii-grid" style={{ display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:12, marginBottom:24 }}>
        {[[0,"--radius-none","0"],[2,"--radius-xs","xs"],[4,"--radius-sm","sm"],[6,"--radius-md","md ·"],[10,"--radius-lg","lg"],[14,"--radius-xl","xl"]].map(([r,tok,label]) => (
          <div key={r} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
            <div style={{ width:56, height:56, background:"var(--bg-muted)", border:"1px solid var(--border-subtle)", borderRadius:r }}/>
            <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--fg3)", textAlign:"center" }}>{r}px</span>
          </div>
        ))}
      </div>
      <P>Everything that isn't a pill uses <InlineCode>--radius-md</InlineCode> (6px). Keeping one radius across inputs, buttons, cards and menus makes surfaces feel like they came from the same kit. <InlineCode>--radius-full</InlineCode> is reserved for avatars and status chips.</P>
    </div>
  );
}

function PageMotion() {
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Foundations</div>
      <H1>Motion</H1>
      <Lead>Three durations and one easing curve. Fast and quiet by design: no springs, no bounces, nothing that hangs around for 900ms. Motion should confirm what just happened, then get out of the way.</Lead>

      <H2 id="easing">Easing</H2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginBottom:24 }}>
        {[
          { name:"standard", curve:"cubic-bezier(0.2, 0, 0, 1)", tok:"--ease-standard", use:"Hover, color, border transitions" },
          { name:"emphasis", curve:"cubic-bezier(0.3, 0, 0, 1)", tok:"--ease-emphasis", use:"Opening overlays, menus" },
          { name:"exit",     curve:"cubic-bezier(0.4, 0, 1, 1)", tok:"--ease-exit",     use:"Closing, dismissing" },
        ].map(e => (
          <div key={e.name} style={{ border:"1px solid var(--border-subtle)", borderRadius:8, padding:"16px 14px" }}>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>{e.name}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--fg3)", marginBottom:10 }}>{e.curve}</div>
            <div style={{ height:24, background:"var(--bg-muted)", borderRadius:4, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:5, left:4, width:14, height:14, borderRadius:"50%", background:"var(--fg1)",
                            animationName:"moveDot", animationDuration:"2s", animationIterationCount:"infinite",
                            animationDirection:"alternate", animationTimingFunction:e.curve }}/>
            </div>
            <div style={{ fontSize:11, color:"var(--fg3)", marginTop:10, lineHeight:1.4 }}>{e.use}</div>
          </div>
        ))}
      </div>
      <style>{`@keyframes moveDot { from { left: 4px } to { left: calc(100% - 18px) } }`}</style>

      <H2 id="duration">Durations</H2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:8, marginBottom:24 }}>
        {[["fast","120ms","--duration-fast","Hover colors, borders"],["base","180ms","--duration-base","Menus, tooltips opening"],["slow","280ms","--duration-slow","Modals, page transitions"]].map(([n,ms,tok,use])=>(
          <div key={n} style={{ border:"1px solid var(--border-subtle)", borderRadius:6, padding:"14px" }}>
            <div style={{ fontSize:22, fontWeight:600, letterSpacing:"-0.01em" }}>{ms}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--fg3)", margin:"4px 0 8px" }}>{tok}</div>
            <div style={{ fontSize:11, color:"var(--fg3)", lineHeight:1.4 }}>{use}</div>
          </div>
        ))}
      </div>

      <Code>{`transition: background var(--duration-fast) var(--ease-standard);
transition: opacity var(--duration-base) var(--ease-emphasis),
            transform var(--duration-base) var(--ease-emphasis);`}</Code>
    </div>
  );
}

/* ─── FRAMER MOTION PAGE ──────────────────────────────────────────────── */
function PageFramerMotion() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);

  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Foundations</div>
      <H1>Framer Motion</H1>
      <Lead>Reach for Framer Motion when CSS transitions hit their limit, like FLIP layout animations or anything that needs to interrupt itself mid-play. Same rules as the CSS tokens: short durations, one curve, no springs.</Lead>

      <H2 id="install">Install</H2>
      <Code language="bash" filename="terminal">npm install framer-motion</Code>
      <div style={{ height:16 }}/>

      <H2 id="presets">Monoset motion presets</H2>
      <P>A handful of presets, shared across the kit. Same easings and durations as the CSS tokens, so your JS-driven animations match the CSS-driven ones.</P>
      <Code language="jsx" filename="motion-presets.js">{`// Same values as --ease-* and --duration-* tokens
export const EASE_STANDARD = [0.2, 0, 0, 1];
export const EASE_EMPHASIS = [0.3, 0, 0, 1];
export const EASE_EXIT     = [0.4, 0, 1, 1];
export const DUR = { fast: 0.12, base: 0.18, slow: 0.28 };

export const fadeUp = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
};
export const hoverLift = { y: -2, transition: { duration: DUR.fast, ease: EASE_STANDARD } };
// Press: shade one step via brightness. No scale, no translate (Monoset rule).
export const pressDown = { filter: "brightness(0.88)", transition: { duration: DUR.fast, ease: EASE_STANDARD } };`}</Code>
      <div style={{ height:24 }}/>

      <H2 id="hover">Hover & press</H2>
      <P>Start here. <InlineCode>whileHover</InlineCode> and <InlineCode>whileTap</InlineCode> cover 80% of what you'll ever need. Pick one property (a 2px lift or a shade), keep it under 180ms, and don't stack them.</P>
      <Preview>
        <motion.button
          whileHover={hoverLift}
          whileTap={pressDown}
          style={{ background:"var(--accent)", color:"var(--accent-fg)", border:"1px solid var(--accent)", borderRadius:6,
                   padding:"10px 18px", fontSize:13, fontWeight:500, fontFamily:"inherit", cursor:"pointer" }}>
          Hover me
        </motion.button>
        <motion.div
          initial={{ backgroundColor: "rgba(244, 244, 245, 0)" }}
          whileHover={{ backgroundColor: "rgba(244, 244, 245, 1)", transition: { duration: DUR.fast, ease: EASE_STANDARD } }}
          style={{ padding:"10px 18px", border:"1px solid var(--border)", borderRadius:6, fontSize:13, cursor:"pointer" }}>
          Shade on hover
        </motion.div>
      </Preview>
      <Code language="jsx">{`<motion.button whileHover={hoverLift} whileTap={pressDown}>
  Hover me
</motion.button>`}</Code>
      <div style={{ height:24 }}/>

      <H2 id="enter">Enter on mount</H2>
      <P>A small fade and 8px rise on mount. Use it for first-paint reveals, not for every re-render. The animation loses meaning if it plays every time state changes.</P>
      <Preview bg="var(--bg)">
        <EnterDemo/>
      </Preview>
      <Code language="jsx">{`<motion.div
  variants={fadeUp}
  initial="hidden"
  animate="visible">
  Welcome.
</motion.div>`}</Code>
      <div style={{ height:24 }}/>

      <H2 id="presence">Mount / unmount</H2>
      <P>Without <InlineCode>AnimatePresence</InlineCode>, unmounts just vanish. Wrap conditional children and they get an exit. Monoset's exit is a quick opacity drop, no slide, no scale; sliding panels off-screen is noisier than they deserve.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, width:"100%" }}>
          <motion.button
            whileHover={hoverLift}
            whileTap={pressDown}
            onClick={() => setOpen(o => !o)}
            style={{ background:"var(--bg)", color:"var(--fg1)", border:"1px solid var(--border)", borderRadius:6,
                     padding:"8px 14px", fontSize:13, fontFamily:"inherit", cursor:"pointer" }}>
            {open ? "Hide" : "Show"} panel
          </motion.button>
          <div style={{ minHeight:60, width:"100%", display:"flex", justifyContent:"center" }}>
            <AnimatePresence>
              {open && (
                <motion.div
                  key="panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } }}
                  exit={{ opacity: 0, transition: { duration: DUR.base, ease: EASE_EXIT } }}
                  style={{ padding:"16px 20px", background:"var(--bg-subtle)", border:"1px solid var(--border-subtle)",
                           borderRadius:8, fontSize:13, color:"var(--fg2)" }}>
                  Smooth in. Quiet out.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Preview>
      <Code language="jsx">{`<AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_EMPHASIS } }}
      exit={{ opacity: 0, transition: { duration: 0.18, ease: EASE_EXIT } }}>
      Panel content
    </motion.div>
  )}
</AnimatePresence>`}</Code>
      <div style={{ height:24 }}/>

      <H2 id="layout">Layout transitions</H2>
      <P>Share a <InlineCode>layoutId</InlineCode> across mounted siblings and Framer does the FLIP math. The tab indicator below slides between items without you writing a single pixel offset.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", gap:0, borderBottom:"1px solid var(--border-subtle)" }}>
          {["Overview","Usage","Tokens"].map((t, i) => (
            <button key={t} onClick={() => setTab(i)}
              style={{ position:"relative", padding:"10px 18px", border:"none", background:"transparent",
                       fontFamily:"inherit", fontSize:13, fontWeight: tab===i ? 600 : 500,
                       color: tab===i ? "var(--fg1)" : "var(--fg3)", cursor:"pointer",
                       transition:"color var(--duration-fast) var(--ease-standard)" }}>
              {t}
              {tab===i && (
                <motion.div
                  layoutId="ds-tab-underline"
                  transition={{ duration: DUR.base, ease: EASE_EMPHASIS }}
                  style={{ position:"absolute", left:10, right:10, bottom:-1, height:2, background:"var(--fg1)", borderRadius:1 }}/>
              )}
            </button>
          ))}
        </div>
      </Preview>
      <Code language="jsx">{`{tab === i && (
  <motion.div layoutId="ds-tab-underline"
    transition={{ duration: 0.18, ease: EASE_EMPHASIS }}/>
)}`}</Code>
      <div style={{ height:24 }}/>

      <H2 id="rules">Rules</H2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
        {[
          { k:"Do", text:"Use opacity + small translate (≤ 8px). Short durations (120–280ms). One standard curve." },
          { k:"Do", text:"Respect prefers-reduced-motion. Wrap with MotionConfig reducedMotion=\"user\"." },
          { k:"Don't", text:"Use spring({ stiffness, damping }) for UI. It introduces bounce. Reserve springs for physical drag." },
          { k:"Don't", text:"Animate color + transform + scale at once. Pick one. Quiet over expressive." },
        ].map((r,i) => (
          <div key={i} style={{ border:"1px solid var(--border-subtle)", borderRadius:6, padding:"14px 16px" }}>
            <div style={{ fontSize:11, fontFamily:"var(--font-mono)", letterSpacing:"0.08em", textTransform:"uppercase",
                          color: r.k==="Do" ? "var(--fg1)" : "var(--fg3)", marginBottom:6 }}>{r.k}</div>
            <div style={{ fontSize:13, color:"var(--fg2)", lineHeight:1.6 }}>{r.text}</div>
          </div>
        ))}
      </div>

      <H2 id="reduced">Reduced motion</H2>
      <P>One wrap at the app root and the whole system respects the OS preference. People who opted out get opacity-only transitions; no 8px rises, no slides.</P>
      <Code language="jsx">{`import { MotionConfig } from "framer-motion";

<MotionConfig reducedMotion="user">
  <App/>
</MotionConfig>`}</Code>
    </div>
  );
}

function EnterDemo() {
  const [key, setKey] = useState(0);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
      <motion.div
        key={key}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{ padding:"16px 22px", background:"var(--bg-subtle)", border:"1px solid var(--border-subtle)",
                 borderRadius:8, fontSize:14, color:"var(--fg1)", fontWeight:500 }}>
        Welcome.
      </motion.div>
      <motion.button
        whileHover={hoverLift}
        whileTap={pressDown}
        onClick={() => setKey(k => k+1)}
        style={{ background:"var(--bg)", color:"var(--fg1)", border:"1px solid var(--border)", borderRadius:6,
                 padding:"7px 12px", fontSize:12, fontFamily:"inherit", cursor:"pointer" }}>
        Replay
      </motion.button>
    </div>
  );
}

function PageButtons() {
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Button</H1>
      <Lead>Four variants across three sizes. Keep labels short (two or three words) and write them in sentence case. All-caps looks shouty in a monotone system.</Lead>

      <H2 id="variants">Variants</H2>
      <Preview>
        <DemoButton variant="primary">Save changes</DemoButton>
        <DemoButton variant="secondary">Cancel</DemoButton>
        <DemoButton variant="ghost">Skip</DemoButton>
        <DemoButton variant="danger">Delete</DemoButton>
      </Preview>
      <Code>{`<Button variant="primary">Save changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Skip</Button>
<Button variant="danger">Delete</Button>`}</Code>

      <H2 id="sizes">Sizes</H2>
      <Preview>
        <DemoButton variant="primary" size="sm">Small</DemoButton>
        <DemoButton variant="primary">Default</DemoButton>
        <DemoButton variant="primary" size="lg">Large</DemoButton>
      </Preview>
      <Code>{`<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>`}</Code>

      <H2 id="states">States</H2>
      <Preview>
        <DemoButton variant="primary">Default</DemoButton>
        <DemoButton variant="primary" disabled>Disabled</DemoButton>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"8px 14px",
                      background:"var(--accent)", color:"var(--accent-fg)", fontSize:13, fontWeight:500, borderRadius:6,
                      boxShadow:"0 0 0 2px var(--bg), 0 0 0 4px var(--fg1)" }}>
          Focused
        </div>
      </Preview>

      <H3>Props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["variant",'"primary" | "secondary" | "ghost" | "danger"','"secondary"',"Visual style"],
              ["size",'"sm" | "lg"',"–","Height/font override"],
              ["disabled","boolean","false","Prevents interaction"],
              ["icon","string","–","Lucide icon name prepended to label"],
              ["onClick","() => void","–","Click handler"]].map(([p,t,d,desc],i,arr)=>(
              <tr key={p} style={{ borderBottom:i<arr.length-1?"1px solid var(--border-subtle)":"none" }}>
                <td style={{ padding:"9px 14px" }}><InlineCode>{p}</InlineCode></td>
                <td style={{ padding:"9px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg3)" }}>{t}</td>
                <td style={{ padding:"9px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg4)" }}>{d}</td>
                <td style={{ padding:"9px 14px", color:"var(--fg3)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageInputs() {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Input</H1>
      <Lead>Text fields, textareas, selects. Wrap them in a <InlineCode>Field</InlineCode> and you get the label, helper text, and error state wired up. Otherwise you'll end up copy-pasting the same aria boilerplate around every input.</Lead>

      <H2 id="field">Field</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:280, display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <label style={{ fontSize:12, fontWeight:500 }}>Email</label>
            <input defaultValue="ada@monoset.dev"
              onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
              style={{ fontFamily:"inherit", fontSize:13, padding:"9px 12px",
              border:`1px solid ${focused?"var(--fg1)":"var(--border)"}`, borderRadius:6, color:"var(--fg1)", background:"var(--bg)", outline:"none",
              transition:"border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
              boxShadow: focused?"0 0 0 3px var(--mono-100)":"none" }}/>
            <span style={{ fontSize:11, color:"var(--fg3)" }}>We'll send a confirmation.</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <label style={{ fontSize:12, fontWeight:500 }}>Password</label>
            <input readOnly type="password" defaultValue="••••••" style={{ fontFamily:"inherit", fontSize:13, padding:"9px 12px",
              border:"1px solid var(--status-danger, #5a2626)", borderRadius:6, color:"var(--fg1)", background:"var(--bg)", outline:"none" }}/>
            <span style={{ fontSize:11, color:"var(--status-danger, #5a2626)" }}>At least 8 characters.</span>
          </div>
        </div>
      </Preview>
      <Code>{`<Field label="Email" help="We'll send a confirmation.">
  <Input type="email" placeholder="you@example.com"/>
</Field>

<Field label="Password" error="At least 8 characters.">
  <Input type="password"/>
</Field>`}</Code>

      <H2 id="states-input">States</H2>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", gap:10 }}>
          {["Default","Disabled","Error"].map(s => (
            <input key={s} readOnly value={s} disabled={s==="Disabled"}
              style={{ fontFamily:"inherit", fontSize:13, padding:"8px 12px", borderRadius:6, color:"var(--fg1)",
                background: s==="Disabled"?"var(--bg-muted)":"var(--bg)", outline:"none",
                border: `1px solid ${s==="Error"?"#5a2626":s==="Disabled"?"var(--border-subtle)":"var(--border)"}` }}/>
          ))}
        </div>
      </Preview>
    </div>
  );
}

function PageBadges() {
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Badge</H1>
      <Lead>Small labels for status, counts, and category tags. Three variants, all monotone, because a badge that screams louder than the thing it's on defeats the point.</Lead>

      <H2 id="variants-badge">Variants</H2>
      <Preview>
        <DemoBadge variant="neutral">Neutral</DemoBadge>
        <DemoBadge variant="outline">Outline</DemoBadge>
        <DemoBadge variant="solid">Solid</DemoBadge>
      </Preview>
      <Code>{`<Badge variant="neutral">Neutral</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="solid">Solid</Badge>`}</Code>

      <H2 id="status-badge">Status with dot</H2>
      <Preview>
        {[["Active","success","var(--status-success)"],["Pending","warning","var(--status-warning)"],["Failed","danger","var(--status-danger)"],["Paused","neutral","var(--fg3)"]].map(([l,v,dc])=>(
          <span key={l} style={{ fontSize:11, fontWeight:500, padding:"3px 9px", borderRadius:999, lineHeight:1,
            background:"var(--bg-muted)", color:`var(--status-${v},${dc})`, border:"1px solid var(--border-subtle)",
            display:"inline-flex", alignItems:"center", gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:`var(--status-${v},${dc})` }}/>
            {l}
          </span>
        ))}
      </Preview>
      <Code>{`<Badge variant="success" dot>Active</Badge>
<Badge variant="warning" dot>Pending</Badge>
<Badge variant="danger" dot>Failed</Badge>`}</Code>

      <H2 id="tags">Tags</H2>
      <Preview>
        {["design","monotone","v0.1"].map(t => (
          <span key={t} style={{ fontSize:12, color:"var(--fg2)", background:"var(--bg-muted)", borderRadius:4,
                                  padding:"3px 8px", display:"inline-flex", alignItems:"center", gap:6 }}>
            {t}<span style={{ color:"var(--fg3)", cursor:"pointer" }}>×</span>
          </span>
        ))}
      </Preview>
    </div>
  );
}

function PageCards() {
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Card</H1>
      <Lead>A surface container. Outline by default. Use the elevated variant when a card needs to feel lifted off the page, or the inset variant inside forms and modals where the surrounding panel already does the grouping.</Lead>

      <H2 id="outline">Outline</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:320, border:"1px solid var(--border-subtle)", borderRadius:6, padding:16 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:6 }}>Outline card</div>
          <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.5 }}>Default surface. Hairline border, no shadow.</div>
        </div>
      </Preview>
      <Code>{`<Card>
  <h3>Outline card</h3>
  <p>Default surface. Hairline border, no shadow.</p>
</Card>`}</Code>

      <H2 id="elevated">Elevated</H2>
      <Preview>
        <div style={{ width:"100%", maxWidth:320, border:"1px solid var(--border-subtle)", borderRadius:6, padding:16, background:"var(--bg)",
                      boxShadow:"0 1px 2px 0 rgb(0 0 0 / 0.06)" }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:6 }}>Elevated card</div>
          <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.5 }}>Use when lifting off a subtle background.</div>
        </div>
      </Preview>
      <Code>{`<Card elevated>Elevated card</Card>`}</Code>

      <H2 id="inset">Inset</H2>
      <Preview>
        <div style={{ width:"100%", maxWidth:320, background:"var(--bg-subtle)", borderRadius:6, padding:16 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:6 }}>Inset card</div>
          <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.5 }}>Borderless. For sidebars or quiet sections.</div>
        </div>
      </Preview>
      <Code>{`<Card style={{background:"var(--bg-subtle)", border:"none"}}>Inset card</Card>`}</Code>
    </div>
  );
}

function PageToggles() {
  const [cb, setCb] = useState(true);
  const [sw, setSw] = useState(true);
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Checkbox &amp; Switch</H1>
      <Lead>Two similar-looking controls with different semantics. Use a checkbox when the choice is part of a form that gets submitted. Use a switch when flipping it takes effect right away, like email notifications or dark mode.</Lead>

      <H2 id="checkbox">Checkbox</H2>
      <Preview bg="var(--bg)">
        <label onClick={()=>setCb(v=>!v)} style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:13, cursor:"pointer" }}>
          <span style={{ width:16, height:16, borderRadius:3,
                         border:`1px solid ${cb?"var(--accent)":"var(--border)"}`,
                         background:cb?"var(--accent)":"var(--bg)", display:"inline-flex", alignItems:"center", justifyContent:"center", color:"var(--accent-fg)",
                         transition:"background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)" }}>
            <AnimatePresence initial={false}>
              {cb && (
                <motion.span key="check"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: DUR.fast, ease: EASE_EMPHASIS } }}
                  exit={{ opacity: 0, scale: 0.6, transition: { duration: DUR.fast, ease: EASE_EXIT } }}
                  style={{ display:"inline-flex" }}>
                  <Icon name="check" size={11}/>
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          {cb?"Checked":"Unchecked"}
        </label>
      </Preview>
      <Code>{`<Checkbox checked={cb} onChange={setCb} label="Accept terms"/>`}</Code>

      <H2 id="switch">Switch</H2>
      <Preview bg="var(--bg)">
        <label onClick={()=>setSw(v=>!v)} style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:13, cursor:"pointer" }}>
          <span
            style={{ width:32, height:18, borderRadius:999, position:"relative", display:"inline-block",
                     background: sw ? "var(--accent)" : "var(--border)",
                     transition:"background var(--duration-base) var(--ease-standard)" }}>
            <motion.span
              animate={{ x: sw ? 14 : 0 }}
              transition={{ duration: DUR.base, ease: EASE_EMPHASIS }}
              style={{ position:"absolute", top:2, left:2, width:14, height:14, borderRadius:"50%",
                       background:"var(--accent-fg)", boxShadow:"0 1px 2px rgb(0 0 0 / 0.2)" }}/>
          </span>
          Email alerts {sw?"on":"off"}
        </label>
      </Preview>
      <Code>{`<Switch checked={on} onChange={setOn}/>
<label>Email alerts</label>`}</Code>
    </div>
  );
}

function PageTable() {
  const rows = [
    { name:"Ada Turing",   email:"ada@monoset.dev",   role:"Admin",  status:"active",  mrr:"$240" },
    { name:"Grace Hopper", email:"grace@monoset.dev", role:"Member", status:"pending", mrr:"$120" },
    { name:"Linus Bell",   email:"linus@monoset.dev", role:"Viewer", status:"paused",  mrr:"$0" },
  ];
  const colors = ["var(--mono-800)","var(--mono-600)","var(--mono-700)"];
  const statusColor = { active:"var(--status-success)", pending:"var(--status-warning)", paused:"var(--fg3)" };
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Table</H1>
      <Lead>Dense rows with hairline separators. Hover shifts the row background by one tone, just enough to track across a long table without making it look like a spreadsheet.</Lead>

      <H2 id="example-table">Example</H2>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden", marginBottom:16 }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Name","Role","Status","MRR"].map(h=>(
              <th key={h} style={{ padding:"9px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)",
                                   letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={r.email} style={{ borderBottom:i<rows.length-1?"1px solid var(--border-subtle)":"none" }}>
                <td style={{ padding:"11px 14px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ width:24, height:24, borderRadius:"50%", background:colors[i], color:"#fff",
                                   display:"inline-flex", alignItems:"center", justifyContent:"center",
                                   fontSize:10, fontWeight:600 }}>{r.name.split(" ").map(s=>s[0]).join("")}</span>
                    <div><div style={{ color:"var(--fg1)", fontWeight:500 }}>{r.name}</div>
                         <div style={{ color:"var(--fg3)", fontSize:11 }}>{r.email}</div></div>
                  </div>
                </td>
                <td style={{ padding:"11px 14px", color:"var(--fg2)" }}>{r.role}</td>
                <td style={{ padding:"11px 14px" }}>
                  <span style={{ fontSize:11, fontWeight:500, padding:"2px 8px", borderRadius:999, background:"var(--bg-muted)",
                                 color:statusColor[r.status]||"var(--fg2)", border:"1px solid var(--border-subtle)",
                                 display:"inline-flex", alignItems:"center", gap:4 }}>
                    <span style={{ width:5, height:5, borderRadius:"50%", background:statusColor[r.status]||"var(--fg2)" }}/>
                    {r.status.charAt(0).toUpperCase()+r.status.slice(1)}
                  </span>
                </td>
                <td style={{ padding:"11px 14px", fontFamily:"var(--font-mono)", fontSize:12, color:"var(--fg2)" }}>{r.mrr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageTabs() {
  const [tab, setTab] = useState("overview");
  const [seg, setSeg] = useState("week");
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Tabs</H1>
      <Lead>Underline tabs for page-level navigation like Account, Billing, Security. Segmented tabs for inline switches inside a panel. Don't mix the two on one page; they start competing for attention.</Lead>

      <H2 id="underline">Underline tabs</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", borderBottom:"1px solid var(--border-subtle)", display:"flex", gap:24 }}>
          {["overview","activity","members","settings"].map(t=>(
            <div key={t} onClick={()=>setTab(t)} style={{ position:"relative", padding:"10px 0", fontSize:13, cursor:"pointer",
              color:tab===t?"var(--fg1)":"var(--fg3)", fontWeight:tab===t?500:400,
              marginBottom:-1, textTransform:"capitalize",
              transition:"color var(--duration-fast) var(--ease-standard)" }}>
              {t}
              {tab===t && (
                <motion.div layoutId="tabs-underline"
                  transition={{ duration: DUR.base, ease: EASE_EMPHASIS }}
                  style={{ position:"absolute", left:0, right:0, bottom:-1, height:1.5, background:"var(--fg1)" }}/>
              )}
            </div>
          ))}
        </div>
      </Preview>
      <Code>{`<Tabs value={tab} onChange={setTab} tabs={[
  { id:"overview", label:"Overview" },
  { id:"activity", label:"Activity" },
  { id:"members",  label:"Members" },
  { id:"settings", label:"Settings" },
]}/>`}</Code>

      <H2 id="segmented">Segmented</H2>
      <Preview>
        <div style={{ display:"inline-flex", padding:2, background:"var(--bg-muted)", borderRadius:6 }}>
          {["day","week","month","year"].map(s=>(
            <div key={s} onClick={()=>setSeg(s)} style={{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center",
              padding:"6px 12px", lineHeight:1, borderRadius:4, fontSize:12, fontWeight:500, cursor:"pointer",
              color:seg===s?"var(--fg1)":"var(--fg3)", textTransform:"capitalize",
              transition:"color var(--duration-fast) var(--ease-standard)" }}>
              {seg===s && (
                <motion.div layoutId="segmented-thumb"
                  transition={{ duration: DUR.base, ease: EASE_EMPHASIS }}
                  style={{ position:"absolute", inset:0, background:"var(--bg)", borderRadius:4,
                           boxShadow:"0 1px 2px rgb(0 0 0 / 0.06)", zIndex:0 }}/>
              )}
              <span style={{ position:"relative", zIndex:1 }}>{s.charAt(0).toUpperCase()+s.slice(1)}</span>
            </div>
          ))}
        </div>
      </Preview>
    </div>
  );
}

function PageAlerts() {
  const [toasts, setToasts] = useState([{ id:1, kind:"success", msg:"Changes saved" }]);
  const addToast = () => setToasts(t => [...t, { id: Date.now(), kind: Math.random()>0.5?"success":"error",
    msg: Math.random()>0.5?"Changes saved":"Couldn't save. Try again." }]);
  const dismiss = (id) => setToasts(t => t.filter(x => x.id !== id));
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Alert &amp; Toast</H1>
      <Lead>Inline alerts sit in the layout and stay there until the problem is fixed. Toasts pop in, say their piece, and disappear. Both stay monotone. No red-green traffic light; the icon and the copy do the work.</Lead>

      <H2 id="alert">Inline alert</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:10 }}>
          {[
            { title:"Verify your email", msg:"We sent a link to ada@monoset.dev.", dot:"var(--fg1)" },
            { title:"Usage near limit",  msg:"92% of monthly quota used.",         dot:"#5a4a1e", bg:"#fdf9ee", bc:"#e0d9c5", tc:"#3d3214", mc:"#5a4a1e" },
          ].map(a=>(
            <div key={a.title} style={{ display:"flex", gap:10, padding:"10px 14px", background:a.bg||"var(--bg-subtle)",
                                         border:`1px solid ${a.bc||"var(--border-subtle)"}`, borderRadius:6 }}>
              <span style={{ width:16, height:16, borderRadius:"50%", border:`1px solid ${a.dot}`, color:a.dot,
                             display:"inline-flex", alignItems:"center", justifyContent:"center",
                             fontSize:11, fontWeight:600, flexShrink:0, marginTop:1 }}>i</span>
              <div>
                <div style={{ fontSize:12, fontWeight:600, color:a.tc||"var(--fg1)" }}>{a.title}</div>
                <div style={{ fontSize:12, color:a.mc||"var(--fg2)", marginTop:2, lineHeight:1.5 }}>{a.msg}</div>
              </div>
            </div>
          ))}
        </div>
      </Preview>

      <H2 id="toast">Toast</H2>
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:10, width:320, alignItems:"center" }}>
          <motion.button whileHover={hoverLift} whileTap={pressDown} onClick={addToast}
            style={{ background:"var(--bg)", color:"var(--fg1)", border:"1px solid var(--border)", borderRadius:6,
                     padding:"7px 12px", fontSize:12, fontFamily:"inherit", cursor:"pointer" }}>
            Trigger toast
          </motion.button>
          <div style={{ display:"flex", flexDirection:"column", gap:8, width:"100%" }}>
            <AnimatePresence initial={false}>
              {toasts.map(t => (
                <motion.div key={t.id} layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } }}
                  exit={{ opacity: 0, y: -4, transition: { duration: DUR.base, ease: EASE_EXIT } }}
                  style={{ display:"flex", gap:10, padding:"10px 14px",
                           background: t.kind==="success" ? "var(--bg-inverse)" : "var(--status-danger)",
                           color:"var(--fg-inverse)", borderRadius:6, fontSize:12, alignItems:"center",
                           boxShadow:"0 10px 24px -6px rgb(0 0 0 / 0.25)" }}>
                  <span style={{ width:14, height:14, borderRadius:"50%", background:"var(--fg-inverse)",
                                 color: t.kind==="success" ? "var(--bg-inverse)" : "var(--status-danger)",
                                 display:"inline-flex", alignItems:"center", justifyContent:"center",
                                 fontSize:10, fontWeight:700 }}>{t.kind==="success" ? "✓" : "!"}</span>
                  <span style={{ flex:1 }}>{t.msg}</span>
                  <motion.span onClick={()=>dismiss(t.id)}
                    whileHover={{ color: "#fff", transition: { duration: DUR.fast, ease: EASE_STANDARD } }}
                    style={{ color:"var(--mono-400)", fontSize:11, fontWeight:500, cursor:"pointer" }}>
                    Dismiss
                  </motion.span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Preview>
    </div>
  );
}

function PageAvatars() {
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Avatar</H1>
      <Lead>Initials on a neutral background. Three sizes. They stack, and when the group gets crowded an overflow chip shows how many more there are.</Lead>

      <H2 id="sizes-av">Sizes</H2>
      <Preview>
        {[[20,"AT"],[26,"AT"],[32,"AT"],[40,"AT"],[52,"AT"]].map(([s,init])=>(
          <span key={s} style={{ width:s, height:s, borderRadius:"50%", background:"var(--mono-800)", color:"#fff",
                                  display:"inline-flex", alignItems:"center", justifyContent:"center",
                                  fontSize:s*0.38, fontWeight:600 }}>{init}</span>
        ))}
      </Preview>

      <H2 id="stack">Stacked</H2>
      <Preview>
        <div style={{ display:"flex" }}>
          {[["AT","var(--mono-800)"],["GH","var(--mono-600)"],["LB","var(--mono-700)"],["+5","var(--mono-400)"]].map(([i,bg])=>(
            <span key={i} style={{ width:32, height:32, borderRadius:"50%", background:bg, color:"#fff", fontSize:12, fontWeight:600,
                                    display:"inline-flex", alignItems:"center", justifyContent:"center",
                                    border:"2px solid var(--bg)", marginLeft:i==="AT"?0:-8 }}>{i}</span>
          ))}
        </div>
      </Preview>
      <Code>{`<Avatar name="Ada Turing" size={32}/>
<Avatar name="Grace Hopper" size={32} bg="var(--mono-600)"/>

{/* Stacked */}
<div class="avatar-stack">
  <Avatar name="Ada Turing"/>
  <Avatar name="Grace Hopper"/>
  <Avatar name="+5"/>
</div>`}</Code>
    </div>
  );
}

function PageAccordion() {
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Accordion</H1>
      <Lead>A disclosure pattern. The headings stay visible, the bodies collapse by default. Keyboard and screen reader behavior comes from Radix, so you don't have to wire any of it yourself.</Lead>

      <H2 id="default">Default</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:520, borderTop:"1px solid var(--border-subtle)" }}>
          {[
            { q:"Is Monoset free?", a:"Yes. MIT-licensed tokens and components, usable anywhere." },
            { q:"Does it work with Tailwind?", a:"Yes. The CSS variables integrate cleanly with any utility framework." },
            { q:"Can I theme it?", a:"Every component reads from CSS custom properties. Swap the tokens and you're done." },
          ].map(item => (
            <AccordionRow key={item.q} q={item.q} a={item.a}/>
          ))}
        </div>
      </Preview>
      <Code language="jsx">{`<Accordion type="single" collapsible>
  <AccordionItem value="q1">
    <AccordionTrigger>Is Monoset free?</AccordionTrigger>
    <AccordionContent>Yes. MIT-licensed…</AccordionContent>
  </AccordionItem>
</Accordion>`}</Code>

      <H2 id="api">API</H2>
      <P>Props forward to <InlineCode>@radix-ui/react-accordion</InlineCode>. Set <InlineCode>type="single"</InlineCode> so only one panel opens at a time, or <InlineCode>type="multiple"</InlineCode> if you want people to open several.</P>
    </div>
  );
}

function PageSlider() {
  const [slider, setSlider] = useState(42);
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Slider</H1>
      <Lead>A range input. Good for values that feel continuous, like volume or opacity. The thumb is small on purpose; put the current value next to the label so people don't have to squint at it.</Lead>

      <H2 id="default">Default</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:360, display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--fg2)" }}>
            <span>Volume</span>
            <span style={{ fontFamily:"var(--font-mono)", color:"var(--fg1)" }}>{slider}</span>
          </div>
          <input type="range" min={0} max={100} value={slider}
            onChange={e=>setSlider(+e.target.value)}
            style={{ width:"100%", accentColor:"var(--fg1)" }}/>
        </div>
      </Preview>
      <Code language="jsx">{`<Slider defaultValue={[42]} min={0} max={100} onValueChange={…}/>`}</Code>

      <H2 id="api">API</H2>
      <P>Wraps <InlineCode>@radix-ui/react-slider</InlineCode>. Pass an array of two numbers if you want a min/max range with two thumbs.</P>
    </div>
  );
}

function PageToggle() {
  const [view, setView] = useState("grid");
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Toggle group</H1>
      <Lead>A segmented control. Use it when the options are mutually exclusive and you can fit them on one line. Past four options it gets cramped; a Select does that job better.</Lead>

      <H2 id="default">Default</H2>
      <Preview bg="var(--bg)">
        <div style={{ display:"inline-flex", background:"var(--bg-muted)",
                       borderRadius:8, padding:3, gap:2 }}>
          {[
            { v:"grid", label:"Grid" },
            { v:"list", label:"List" },
            { v:"kanban", label:"Kanban" },
          ].map(opt => (
            <button key={opt.v} onClick={()=>setView(opt.v)}
              style={{ all:"unset", fontFamily:"inherit", fontSize:12, fontWeight:500,
                       padding:"6px 14px", borderRadius:5, cursor:"pointer",
                       background: view===opt.v ? "var(--bg)" : "transparent",
                       color: view===opt.v ? "var(--fg1)" : "var(--fg3)",
                       transition:"background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)" }}>
              {opt.label}
            </button>
          ))}
        </div>
      </Preview>
      <Code language="jsx">{`<ToggleGroup type="single" value={view} onValueChange={setView}>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
  <ToggleGroupItem value="list">List</ToggleGroupItem>
</ToggleGroup>`}</Code>

      <H2 id="single-toggle">Single toggle</H2>
      <P>The standalone <InlineCode>Toggle</InlineCode> is for a single on/off action, like a bold button in a toolbar or a pin on a list item.</P>
      <Code language="jsx">{`<Toggle pressed={bold} onPressedChange={setBold}>B</Toggle>`}</Code>
    </div>
  );
}

function PageKbd() {
  const [pressed, setPressed] = useState(new Set());
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [lastShortcut, setLastShortcut] = useState(null);

  useEffect(() => {
    const norm = (e) => {
      const k = e.key;
      if (k === "Meta") return "Cmd";
      if (k === "Control") return "Ctrl";
      if (k === "Shift") return "Shift";
      if (k === "Alt") return "Alt";
      if (k === " ") return "Space";
      return k.length === 1 ? k.toUpperCase() : k;
    };
    const down = (e) => {
      setPressed(p => new Set(p).add(norm(e)));
      // ⌘K / Ctrl+K → open palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(v => !v);
        setLastShortcut("⌘K");
      }
      // / → focus search
      if (e.key === "/" && !(e.target?.tagName === "INPUT")) {
        e.preventDefault();
        setLastShortcut("/");
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    const up = (e) => setPressed(p => { const n = new Set(p); n.delete(norm(e)); return n; });
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Kbd</H1>
      <Lead>Renders a keyboard shortcut. The little <InlineCode>⌘K</InlineCode> chip you see in search bars and menus. Use it anywhere a user might reach for the mouse when they didn't have to.</Lead>

      <H2 id="try">Try it: press a key</H2>
      <P>The chips below light up when you press the matching key. <InlineCode>⌘K</InlineCode> (or <InlineCode>Ctrl+K</InlineCode>) opens the fake command palette.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", flexDirection:"column", gap:14, alignItems:"center", minHeight:80 }}>
          <div style={{ display:"flex", gap:6 }}>
            {["Cmd", "Ctrl", "Shift", "Alt", "K", "/", "Enter", "Esc"].map(k => (
              <KbdSpan key={k} active={pressed.has(k) || (k === "Esc" && pressed.has("Escape"))}>{k}</KbdSpan>
            ))}
          </div>
          <div style={{ fontSize:12, color:"var(--fg3)", minHeight:18 }}>
            {lastShortcut
              ? <>Last shortcut caught: <span style={{ fontFamily:"var(--font-mono)", color:"var(--fg1)" }}>{lastShortcut}</span></>
              : "Press something…"}
          </div>
          <AnimatePresence>
            {paletteOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_EMPHASIS } }}
                exit={{ opacity: 0, transition: { duration: DUR.fast, ease: EASE_EXIT } }}
                style={{ width:"100%", maxWidth:360, background:"var(--bg)",
                         border:"1px solid var(--border)", borderRadius:8,
                         boxShadow:"var(--shadow-lg)", padding:"10px 12px",
                         display:"flex", alignItems:"center", gap:8 }}>
                <Icon name="search" size={13} style={{ color:"var(--fg4)" }}/>
                <input autoFocus placeholder="Type a command…"
                  style={{ flex:1, border:"none", outline:"none", fontSize:13, fontFamily:"inherit",
                           background:"transparent", color:"var(--fg1)" }}/>
                <KbdSpan>Esc</KbdSpan>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Preview>

      <H2 id="default">In context</H2>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", gap:10, alignItems:"center", fontSize:12, color:"var(--fg2)" }}>
          Open command bar
          <span style={{ display:"inline-flex", gap:4 }}>
            <KbdSpan>⌘</KbdSpan>
            <KbdSpan>K</KbdSpan>
          </span>
        </div>
      </Preview>
      <Code language="jsx">{`<Kbd>⌘</Kbd> <Kbd>K</Kbd>`}</Code>

      <H2 id="sizes">Sizes</H2>
      <P><InlineCode>sm</InlineCode> for inside body text, <InlineCode>md</InlineCode> (the default) for menus and tooltips.</P>
      <Code language="jsx">{`<Kbd size="sm">Esc</Kbd>
<Kbd size="md">Enter</Kbd>`}</Code>
    </div>
  );
}

function PageSpinner() {
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Components</div>
      <H1>Spinner</H1>
      <Lead>For waits longer than ~400ms when you don't have a better placeholder. Anything faster, skip it; a spinner that flashes for 80ms just looks broken.</Lead>

      <H2 id="default">Default</H2>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", gap:24, alignItems:"center" }}>
          <SpinnerSpan size={14}/>
          <SpinnerSpan size={20}/>
          <SpinnerSpan size={28}/>
        </div>
      </Preview>
      <Code language="jsx">{`<Spinner size={20}/>`}</Code>

      <H2 id="inside-button">Inside a button</H2>
      <P>Put it in a button while the request is in flight. Leave the label in place; swapping "Save" for the spinner makes the button width jump and the eye catches it.</P>
      <Code language="jsx">{`<Button disabled>
  <Spinner size={14}/> Saving…
</Button>`}</Code>
    </div>
  );
}

function AccordionRow({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid var(--border-subtle)" }}>
      <button onClick={()=>setOpen(v=>!v)}
        style={{ all:"unset", width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"14px 2px", fontSize:14, fontWeight:500, color:"var(--fg1)", cursor:"pointer" }}>
        <span>{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: DUR.base, ease: EASE_STANDARD }}
          style={{ display:"inline-flex", color:"var(--fg3)" }}>
          <Icon name="chevronDown" size={14}/>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: DUR.base, ease: EASE_EMPHASIS } }}
            exit={{ height: 0, opacity: 0, transition: { duration: DUR.fast, ease: EASE_EXIT } }}
            style={{ overflow:"hidden" }}>
            <div style={{ padding:"0 2px 14px", fontSize:13, color:"var(--fg2)", lineHeight:1.7 }}>{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function KbdSpan({ children, active = false }) {
  return (
    <kbd style={{ fontFamily:"var(--font-mono)", fontSize:11,
                  background: active ? "var(--accent)" : "var(--bg)",
                  color: active ? "var(--accent-fg)" : "var(--fg1)",
                  border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                  borderBottomWidth:2, borderRadius:4,
                  padding:"0 5px", height:22, minWidth:20, display:"inline-flex",
                  alignItems:"center", justifyContent:"center", lineHeight:1,
                  transition: "background 80ms ease, color 80ms ease, border-color 80ms ease, transform 80ms ease",
                  transform: active ? "translateY(1px)" : "translateY(0)" }}>{children}</kbd>
  );
}

function SpinnerSpan({ size = 16 }) {
  return (
    <span role="status" aria-label="Loading"
      style={{ display:"inline-block", width:size, height:size,
                border:"2px solid var(--border)", borderTopColor:"var(--fg1)",
                borderRadius:"50%", animation:"ms-spin 600ms linear infinite" }}/>
  );
}

function PageLLM() {
  const prompt = `# Monoset data-ms naming prompt

You are refactoring a React codebase built on the Monoset design system
(@monoset/react). Add \`data-ms="<kebab-name>"\` attributes to every
semantically-distinct UI region so designers and AI tools can target them.

## Rules
1. Use kebab-case, namespaced by page or feature (e.g. "dashboard-sidebar",
   "pricing-hero-cta", "settings-theme-row").
2. Tag the OUTERMOST element of each logical region, not every child.
3. Always tag:
   - page hero / header / footer
   - main content containers, sidebars, drawers
   - each card, tile, or list group
   - every CTA button row and primary action
   - form containers and each field group
   - tabs, modals, toasts, menus
4. Do not tag decorative wrappers (motion divs, flex spacers).
5. Preserve existing data-ms attributes. Never rename without asking.
6. Prefer stable names tied to intent ("save-bar", "empty-state")
   over style ("flex-row", "gray-box").

## Output
Return a diff that only adds data-ms attributes. No other changes.

## Example
Before:
  <section className="hero">
    <h1>Welcome</h1>
    <button>Sign up</button>
  </section>

After:
  <section data-ms="landing-hero" className="hero">
    <h1>Welcome</h1>
    <button data-ms="landing-hero-cta">Sign up</button>
  </section>
`;
  return (
    <div>
      <div style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Guides</div>
      <H1>LLM naming prompt</H1>
      <Lead>Paste the prompt below into any coding agent to add stable <InlineCode>data-ms</InlineCode> names to your app. With stable names in place, your Playwright tests, your analytics selectors, and your next design-tool integration stop breaking every time someone renames a className.</Lead>

      <H2 id="why">Why semantic names</H2>
      <P>Class names get renamed when someone reaches for a new CSS framework. Layouts get rewritten when a redesign lands. A <InlineCode>data-ms</InlineCode> named by <em>what the thing is for</em>, rather than how it looks, tends to survive both. Monoset uses this pattern internally: the landing page carries <InlineCode>data-ms="bento-player"</InlineCode> and <InlineCode>data-ms="hero-title"</InlineCode>, which is why the responsive CSS can target them without caring about the markup underneath.</P>

      <H2 id="prompt">The prompt</H2>
      <P>Run it on one page or feature at a time. Whole-app passes tend to produce generic names that all sound the same.</P>
      <Code language="markdown">{prompt}</Code>

      <Divider/>

      <H2 id="conventions">Naming conventions</H2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
        {[
          { good:"dashboard-sidebar", bad:"sidebar-left" },
          { good:"pricing-hero-cta", bad:"big-black-button" },
          { good:"settings-theme-row", bad:"row-3" },
          { good:"empty-state", bad:"placeholder" },
        ].map(row => (
          <div key={row.good} style={{ border:"1px solid var(--border-subtle)", borderRadius:8,
                                        padding:"12px 14px", fontSize:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, color:"var(--fg1)", marginBottom:4 }}>
              <Icon name="check" size={13}/> <code style={{ fontFamily:"var(--font-mono)" }}>{row.good}</code>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, color:"var(--fg4)" }}>
              <Icon name="x" size={13}/> <code style={{ fontFamily:"var(--font-mono)" }}>{row.bad}</code>
            </div>
          </div>
        ))}
      </div>

      <H2 id="inspecting">Using the names</H2>
      <P>Once they're in place, the rest is boring. Any tool that speaks CSS selectors can find what it needs:</P>
      <Code language="javascript">{`// Jump to any region in the DOM
document.querySelector('[data-ms="pricing-hero-cta"]').scrollIntoView();

// Test it in Playwright
await page.locator('[data-ms="save-bar"]').click();

// Override it in CSS
[data-ms="settings-theme-row"] { border-color: var(--accent); }`}</Code>
    </div>
  );
}

const PAGES = {
  introduction: PageIntroduction,
  installation: PageInstallation,
  usage:        PageUsage,
  colors:       PageColors,
  typography:   PageTypography,
  spacing:      PageSpacing,
  motion:       PageMotion,
  framer:       PageFramerMotion,
  buttons:      PageButtons,
  inputs:       PageInputs,
  badges:       PageBadges,
  cards:        PageCards,
  toggles:      PageToggles,
  table:        PageTable,
  tabs:         PageTabs,
  alerts:       PageAlerts,
  avatars:      PageAvatars,
  accordion:    PageAccordion,
  slider:       PageSlider,
  toggle:       PageToggle,
  kbd:          PageKbd,
  spinner:      PageSpinner,
  llm:          PageLLM,
};

export default function DocsContent({ page, setPage }) {
  const PageComp = PAGES[page] || PageIntroduction;
  return <PageComp setPage={setPage}/>;
}
