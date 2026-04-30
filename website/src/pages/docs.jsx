import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, Button, Badge, Alert, Avatar, Input, Textarea, Switch, Checkbox, Spinner, Card, Select, SelectTrigger, SelectContent, SelectItem } from '@monoset/react';
import {
  EASE_STANDARD, EASE_EMPHASIS, EASE_EXIT, DUR,
  fadeUp, hoverLift, pressDown,
  Icon,
  CopyButton, Code, InlineCode,
  H1, H2, H3, P, Lead, Divider,
  Preview, Step,
  DemoButton, DemoBadge,
  PropsTable,
} from '../ui/docs.jsx';

function PageIntroduction({ setPage }) {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em",
                    textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Getting Started</div>

      {/* ── The problem ───────────────────────────────── */}
      <H1>Introduction</H1>
      <p style={{ fontSize:15, color:"var(--fg2)", lineHeight:1.75, margin:"0 0 10px" }}>
        Every design system ships with an opinion about how your product should look. A color palette you didn't pick. Type pairings that scream "we used Chakra" or "that's definitely Shadcn." Components that carry someone else's brand into yours.
      </p>
      <p style={{ fontSize:15, color:"var(--fg2)", lineHeight:1.75, margin:"0 0 28px" }}>
        Monoset is the opposite. One neutral ramp, one typeface, and the usual set of components built the way you'd build them yourself if you had the afternoon. The system disappears. Your product is what people see.
      </p>

      <H2 id="approach">The approach</H2>
      <p style={{ fontSize:14, color:"var(--fg2)", lineHeight:1.7, margin:"0 0 20px" }}>
        There are three ideas behind every decision in Monoset:
      </p>

      <div style={{ display:"flex", flexDirection:"column", gap:0, marginBottom:32,
        border:"1px solid var(--border-subtle)", borderRadius:10, overflow:"hidden" }}>
        {[
          { title:"Monotone by default",
            body:"A 12-step neutral ramp handles backgrounds, borders, and text. No brand colors baked in. When you add an accent, it's yours, not the system's. Every component reads from CSS custom properties, so swapping the palette is one file change." },
          { title:"Ordinary components, done well",
            body:"Buttons, inputs, tables, cards, tabs. Nothing clever, nothing novel. The value is that they're already accessible, already token-wired, already tested. You skip the boring part and start building the thing that makes your product different." },
          { title:"Three depths",
            body:"Use just the CSS tokens with any framework. Add the React components when you want pre-built primitives. Layer in the motion presets when you care about feel. Each layer works without the others." },
        ].map((item, i, arr) => (
          <div key={item.title} style={{ padding:"18px 20px",
            borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
            <div style={{ fontSize:14, fontWeight:600, color:"var(--fg1)", marginBottom:6 }}>{item.title}</div>
            <div style={{ fontSize:13, color:"var(--fg3)", lineHeight:1.7 }}>{item.body}</div>
          </div>
        ))}
      </div>

      {/* ── What ships ────────────────────────────────── */}
      <H2 id="whats-included">What ships</H2>
      <p style={{ fontSize:14, color:"var(--fg2)", lineHeight:1.7, margin:"0 0 16px" }}>
        A token file, a component library, and a set of motion presets. Everything below is production-ready and published on npm.
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:1, marginBottom:32,
        border:"1px solid var(--border-subtle)", borderRadius:10, overflow:"hidden" }}>
        {[
          { cat:"Foundations", items:["12-step color ramp","Semantic tokens","Inter + JetBrains Mono","4px spacing grid","Radii + shadows","Motion tokens"] },
          { cat:"Components",  items:["Button (4 variants)","Input, Textarea, Select","Table (sort, select)","Card, Badge, Alert","Tabs, Toggle, Accordion","Avatar, Spinner, Kbd"] },
          { cat:"Extras",      items:["Layout (Stack, Grid)","Dark mode","Form validation","Toast notifications","Empty states","Skeleton loaders"] },
        ].map((col, ci) => (
          <div key={col.cat} style={{ borderRight: ci < 2 ? "1px solid var(--border-subtle)" : "none" }}>
            <div style={{ padding:"10px 16px", background:"var(--bg-subtle)", fontSize:11, fontWeight:600,
              color:"var(--fg3)", letterSpacing:"0.05em", textTransform:"uppercase",
              borderBottom:"1px solid var(--border-subtle)" }}>{col.cat}</div>
            {col.items.map((item, ii) => (
              <div key={item} style={{ padding:"7px 16px", fontSize:12, color:"var(--fg2)",
                borderBottom: ii < col.items.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── AI-native ─────────────────────────────────── */}
      <H2 id="ai-native">Built for AI workflows</H2>
      <p style={{ fontSize:14, color:"var(--fg2)", lineHeight:1.7, margin:"0 0 16px" }}>
        Monoset ships an MCP server. If you use Claude Code, Cursor, or Windsurf, your AI agent can query Monoset's components, tokens, and docs directly. No copy-pasting from a browser tab. No hallucinated prop names. The agent knows what's available and how to use it.
      </p>

      <div style={{ display:"flex", flexDirection:"column", gap:0, marginBottom:16,
        border:"1px solid var(--border-subtle)", borderRadius:10, overflow:"hidden" }}>
        {[
          { title:"List and inspect components",
            body:"The agent can look up every component, its props, import path, and usage examples without leaving your editor." },
          { title:"Query design tokens",
            body:"Need the value of --mono-600 or the spacing scale? The agent reads tokens directly instead of guessing." },
          { title:"Search the docs",
            body:"Full-text search across every page. The agent finds the right guide, the right example, the right API." },
        ].map((item, i, arr) => (
          <div key={item.title} style={{ padding:"14px 18px",
            borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
            <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)", marginBottom:3 }}>{item.title}</div>
            <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.6 }}>{item.body}</div>
          </div>
        ))}
      </div>

      <Code filename="terminal">{`npm install -g @monoset/mcp-server`}</Code>
      <p style={{ fontSize:13, color:"var(--fg3)", lineHeight:1.6, margin:"0 0 32px" }}>
        One install, then <span onClick={() => setPage("mcp")} style={{ color:"var(--fg1)", fontWeight:500, cursor:"pointer", textDecoration:"underline", textUnderlineOffset:2 }}>configure it for your editor</span>. Your agent picks it up on the next session.
      </p>

      {/* ── Where to go ───────────────────────────────── */}
      <H2 id="next">Where to start</H2>
      <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:32 }}>
        {[
          { title:"Install in 2 minutes",        desc:"Scaffold a new project or add Monoset to an existing React app.", page:"installation" },
          { title:"Set up the MCP server",        desc:"Give your AI coding agent direct access to Monoset's components and tokens.", page:"mcp" },
          { title:"Browse the components",        desc:"See every primitive with live previews and copy-paste code.", page:"buttons" },
          { title:"Read the token system",        desc:"Understand the color ramp, spacing scale, and motion values.", page:"colors" },
          { title:"Try the playground",           desc:"Edit props, see the result, copy the code.", page:"playground" },
        ].map(link => (
          <div key={link.page} onClick={() => setPage(link.page)}
            style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12,
              padding:"14px 18px", border:"1px solid var(--border-subtle)", borderRadius:8,
              cursor:"pointer", transition:"background 0.12s" }}
            onMouseEnter={e => e.currentTarget.style.background="var(--bg-subtle)"}
            onMouseLeave={e => e.currentTarget.style.background="transparent"}>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)", marginBottom:2 }}>{link.title}</div>
              <div style={{ fontSize:12, color:"var(--fg3)" }}>{link.desc}</div>
            </div>
            <Icon name="chevronRight" size={14} style={{ color:"var(--fg4)", flexShrink:0 }}/>
          </div>
        ))}
      </div>

      {/* ── Install CTA ───────────────────────────────── */}
      <Code filename="terminal">{`npm create monoset-app@latest my-app`}</Code>
    </div>
  );
}

function PageInstallation() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Getting Started</div>
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
      <P>Inter for UI, JetBrains Mono for code. Both open source, both self-hosted. The easiest path is <InlineCode>@fontsource</InlineCode>: one CSS import per weight, files get bundled by Vite, zero third-party requests.</P>
      <Code filename="terminal">{`npm install @fontsource/inter @fontsource/jetbrains-mono`}</Code>
      <Code filename="src/main.jsx">{`import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@fontsource/jetbrains-mono/latin-600.css";`}</Code>
      <P>Prefer Google Fonts instead? Drop a <InlineCode>&lt;link&gt;</InlineCode> into your HTML head and skip the npm packages. The tokens work either way.</P>
    </div>
  );
}

function PageUsage() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Getting Started</div>
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
      <P>Add the <InlineCode>monoset-dark</InlineCode> class to any element and the semantic tokens flip for everything inside it. No ThemeProvider, no context. Put it on <InlineCode>&lt;html&gt;</InlineCode> for a whole-app switch, or on a single panel for an inverted card.</P>
      <Code>{`<div className="monoset-dark">
  <Button variant="primary">Inverted surface</Button>
</div>`}</Code>
      <Preview bg="var(--mono-1000)">
        <div className="monoset-dark" style={{ display:"flex", gap:8 }}>
          <DemoButton variant="primary">Save</DemoButton>
          <DemoButton variant="secondary">Cancel</DemoButton>
          <DemoBadge variant="outline">v0.4</DemoBadge>
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
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Foundations</div>
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
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Foundations</div>
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
          <div style={{ fontSize:10, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:10 }}>Sans · Inter</div>
          <div style={{ fontSize:36, fontWeight:600, letterSpacing:"-0.02em", lineHeight:1 }}>Aa Gg</div>
          <div style={{ fontSize:36, fontWeight:400, letterSpacing:"-0.01em", lineHeight:1, color:"var(--fg2)" }}>01 &amp;!</div>
          <div style={{ fontSize:11, color:"var(--fg3)", marginTop:10 }}>Weights 400 / 500 / 600 / 700 · Variable</div>
        </div>
        <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, padding:"20px 18px" }}>
          <div style={{ fontSize:10, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:10 }}>Mono · JetBrains Mono</div>
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
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Foundations</div>
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
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Foundations</div>
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
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Foundations</div>
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
                  style={{ padding:"14px 20px", background:"var(--bg-subtle)", border:"1px solid var(--border-subtle)",
                           borderRadius:8, fontSize:13, lineHeight:1.2, color:"var(--fg2)" }}>
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
            <div style={{ fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:600,
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
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
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
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
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
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
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
      <P>Add a colored dot for statuses that need to be scannable at a glance. Useful in tables and list views.</P>
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
      <P>Dismissible tags for filters, categories, or multi-select inputs.</P>
      <Preview>
        {["design","monotone","v0.4"].map(t => (
          <span key={t} style={{ fontSize:12, color:"var(--fg2)", background:"var(--bg-muted)", borderRadius:4,
                                  padding:"3px 8px", display:"inline-flex", alignItems:"center", gap:6 }}>
            {t}<span style={{ color:"var(--fg3)", cursor:"pointer" }}>×</span>
          </span>
        ))}
      </Preview>

      <H2 id="in-context">In context</H2>
      <P>Badges sit next to nav labels for unread counts, inside table cells for row status, or beside headings for version numbers.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", flexDirection:"column", gap:12, width:"100%", maxWidth:280 }}>
          {[["Inbox", 12], ["Drafts", 3], ["Sent", null]].map(([label, count]) => (
            <div key={label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"8px 12px", borderRadius:6, fontSize:13, color:"var(--fg2)",
              background: label==="Inbox" ? "var(--bg-muted)" : "transparent" }}>
              <span style={{ fontWeight: label==="Inbox" ? 500 : 400, color: label==="Inbox" ? "var(--fg1)" : "var(--fg2)" }}>{label}</span>
              {count && <span style={{ fontSize:11, fontWeight:600, background:"var(--accent)", color:"var(--accent-fg)",
                borderRadius:999, padding:"1px 7px", lineHeight:"18px" }}>{count}</span>}
            </div>
          ))}
        </div>
      </Preview>
      <Code>{`<nav>
  <NavItem label="Inbox" badge={<Badge variant="solid">12</Badge>}/>
  <NavItem label="Drafts" badge={<Badge variant="solid">3</Badge>}/>
  <NavItem label="Sent"/>
</nav>`}</Code>

      <H3>Props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["variant",'"neutral" | "solid" | "outline"','"neutral"',"Visual style"],
              ["children","ReactNode","--","Badge content"],
              ["className","string","--","Additional CSS classes"]].map(([p,t,d,desc],i,arr)=>(
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

function PageCards() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
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
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
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
                  <Icon name="check" size={11} strokeWidth={3}/>
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
    { name:"Ada Turing",     email:"ada@monoset.dev",     role:"Admin",  status:"active",  mrr:"$240" },
    { name:"Grace Hopper",   email:"grace@monoset.dev",   role:"Member", status:"pending", mrr:"$120" },
    { name:"Linus Bell",     email:"linus@monoset.dev",   role:"Viewer", status:"paused",  mrr:"$0"   },
    { name:"Margaret Clarke",email:"margaret@monoset.dev",role:"Admin",  status:"active",  mrr:"$320" },
    { name:"Donald Keene",   email:"donald@monoset.dev",  role:"Member", status:"active",  mrr:"$180" },
    { name:"Rosa Park",      email:"rosa@monoset.dev",    role:"Viewer", status:"pending", mrr:"$0"   },
    { name:"Hedy Lamarr",    email:"hedy@monoset.dev",    role:"Admin",  status:"active",  mrr:"$420" },
    { name:"Alan Turing",    email:"alan@monoset.dev",    role:"Member", status:"paused",  mrr:"$0"   },
    { name:"Katherine Goble",email:"katherine@monoset.dev",role:"Member",status:"active",  mrr:"$160" },
  ];
  const palette = ["var(--mono-800)","var(--mono-600)","var(--mono-700)","var(--mono-900)","var(--mono-500)"];
  const statusColor = { active:"var(--status-success)", pending:"var(--status-warning)", paused:"var(--fg3)" };
  const renderRow = (r, i) => (
    <tr key={r.email}>
      <td>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ width:24, height:24, borderRadius:"50%", background:palette[i % palette.length], color:"#fff",
                         display:"inline-flex", alignItems:"center", justifyContent:"center",
                         fontSize:10, fontWeight:600, flexShrink:0 }}>{r.name.split(" ").map(s=>s[0]).join("")}</span>
          <div><div style={{ color:"var(--fg1)", fontWeight:500 }}>{r.name}</div>
               <div style={{ color:"var(--fg3)", fontSize:11 }}>{r.email}</div></div>
        </div>
      </td>
      <td style={{ color:"var(--fg2)" }}>{r.role}</td>
      <td>
        <span style={{ fontSize:11, fontWeight:500, padding:"2px 8px", borderRadius:999, background:"var(--bg-muted)",
                       color:statusColor[r.status]||"var(--fg2)", border:"1px solid var(--border-subtle)",
                       display:"inline-flex", alignItems:"center", gap:4 }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:statusColor[r.status]||"var(--fg2)" }}/>
          {r.status.charAt(0).toUpperCase()+r.status.slice(1)}
        </span>
      </td>
      <td style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--fg2)" }}>{r.mrr}</td>
    </tr>
  );
  const header = (
    <thead><tr>{["Name","Role","Status","MRR"].map(h=>(<th key={h}>{h}</th>))}</tr></thead>
  );
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Table</H1>
      <Lead>Dense rows with hairline separators. Pass `maxHeight` and the wrapper caps its height with the header pinned. Narrower viewports scroll sideways.</Lead>

      <H2 id="example-table">Example</H2>
      <div style={{ marginBottom:16 }}>
        <Table>
          {header}
          <tbody>{rows.slice(0, 3).map(renderRow)}</tbody>
        </Table>
      </div>
      <Code language="jsx">{`<Table>
  <thead>…</thead>
  <tbody>{rows.map(…)}</tbody>
</Table>`}</Code>

      <H2 id="scroll-table">Scrollable with sticky header</H2>
      <P>Pass <InlineCode>maxHeight</InlineCode> and the wrapper caps its height and scrolls. The <InlineCode>thead</InlineCode> stays pinned.</P>
      <div style={{ marginBottom:16 }}>
        <Table maxHeight={220}>
          {header}
          <tbody>{rows.map(renderRow)}</tbody>
        </Table>
      </div>
      <Code language="jsx">{`<Table maxHeight={220}>
  <thead>…</thead>
  <tbody>{rows.map(…)}</tbody>
</Table>`}</Code>
    </div>
  );
}

function PageTabs() {
  const [tab, setTab] = useState("overview");
  const [seg, setSeg] = useState("week");
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
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
      <Code language="jsx">{`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="members">Members</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
</Tabs>`}</Code>

      <H2 id="segmented">Segmented</H2>
      <P>The pill style for inline switches inside a panel. Time ranges, view modes, filter toggles.</P>
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

      <H2 id="controlled">Controlled</H2>
      <P>For controlled usage, pass <InlineCode>value</InlineCode> and <InlineCode>onValueChange</InlineCode> instead of <InlineCode>defaultValue</InlineCode>.</P>
      <Code language="jsx">{`const [tab, setTab] = useState("overview");

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <Card>Overview content</Card>
  </TabsContent>
  <TabsContent value="billing">
    <Card>Billing content</Card>
  </TabsContent>
</Tabs>`}</Code>

      <H3>Props</H3>
      <P><InlineCode>Tabs</InlineCode> wraps Radix UI Tabs. All Radix props are forwarded.</P>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["defaultValue","string","--","Initially active tab (uncontrolled)"],
              ["value","string","--","Active tab (controlled)"],
              ["onValueChange","(value: string) => void","--","Called when the active tab changes"],
              ["children","ReactNode","--","TabsList + TabsContent elements"]].map(([p,t,d,desc],i,arr)=>(
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

function PageAlerts() {
  const [toasts, setToasts] = useState([{ id:1, kind:"success", msg:"Changes saved" }]);
  const addToast = () => setToasts(t => [...t, { id: Date.now(), kind: Math.random()>0.5?"success":"error",
    msg: Math.random()>0.5?"Changes saved":"Couldn't save. Try again." }]);
  const dismiss = (id) => setToasts(t => t.filter(x => x.id !== id));
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
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
      <H3>Alert props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["title","ReactNode","--","Bold heading line"],
              ["icon","ReactNode",'"i"',"Leading icon element"],
              ["urgent","boolean","false","Applies urgent styling"],
              ["children","ReactNode","--","Alert body text"],
              ["className","string","--","Additional CSS classes"]].map(([p,t,d,desc],i,arr)=>(
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

      <Divider/>

      <H2 id="alert-code">Usage</H2>
      <Code language="jsx">{`import { Alert } from "@monoset/react";

{/* Inline alert */}
<Alert title="Verify your email">
  We sent a link to ada@monoset.dev.
</Alert>

{/* Urgent variant */}
<Alert title="Usage near limit" urgent>
  92% of monthly quota used.
</Alert>`}</Code>
    </div>
  );
}

function PageAvatars() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Avatar</H1>
      <Lead>Initials on a neutral background. Three sizes. Pass an image URL and it renders the photo; leave it blank and you get the initials fallback. They stack, and when the group gets crowded an overflow chip shows how many more.</Lead>

      <H2 id="sizes-av">Sizes</H2>
      <P>Three named sizes. <InlineCode>sm</InlineCode> for dense lists and table rows, <InlineCode>md</InlineCode> for cards and nav, <InlineCode>lg</InlineCode> for profiles and headers.</P>
      <Preview>
        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
          {[["sm",24],["md",32],["lg",44]].map(([name,s])=>(
            <div key={name} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
              <span style={{ width:s, height:s, borderRadius:"50%", background:"var(--mono-800)", color:"#fff",
                              display:"inline-flex", alignItems:"center", justifyContent:"center",
                              fontSize:s*0.38, fontWeight:600 }}>AT</span>
              <span style={{ fontSize:11, color:"var(--fg3)", fontFamily:"var(--font-mono)" }}>{name}</span>
            </div>
          ))}
        </div>
      </Preview>
      <Code>{`<Avatar size="sm" initials="AT"/>
<Avatar size="md" initials="AT"/>
<Avatar size="lg" initials="AT"/>`}</Code>

      <H2 id="fallback">Image with initials fallback</H2>
      <P>When <InlineCode>src</InlineCode> is set, the image renders. If it fails to load (broken URL, 404), the initials show instead. No layout shift either way.</P>
      <Preview>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <span style={{ width:32, height:32, borderRadius:"50%", background:"var(--mono-800)", color:"#fff",
                          display:"inline-flex", alignItems:"center", justifyContent:"center",
                          fontSize:12, fontWeight:600 }}>AT</span>
          <span style={{ width:32, height:32, borderRadius:"50%", background:"var(--mono-600)", color:"#fff",
                          display:"inline-flex", alignItems:"center", justifyContent:"center",
                          fontSize:12, fontWeight:600 }}>GH</span>
          <span style={{ width:32, height:32, borderRadius:"50%", background:"var(--mono-700)", color:"#fff",
                          display:"inline-flex", alignItems:"center", justifyContent:"center",
                          fontSize:12, fontWeight:600 }}>LB</span>
        </div>
      </Preview>
      <Code>{`<Avatar initials="AT" src="/team/ada.jpg" alt="Ada Turing"/>
<Avatar initials="GH"/>  {/* No image — shows initials */}`}</Code>

      <H2 id="stack">Stacked group</H2>
      <P>Overlap avatars with a negative margin. The overflow chip at the end shows the remaining count.</P>
      <Preview>
        <div style={{ display:"flex" }}>
          {[["AT","var(--mono-800)"],["GH","var(--mono-600)"],["LB","var(--mono-700)"],["+5","var(--mono-400)"]].map(([i,bg],idx)=>(
            <span key={i} style={{ width:32, height:32, borderRadius:"50%", background:bg, color:"#fff", fontSize:12, fontWeight:600,
                                    display:"inline-flex", alignItems:"center", justifyContent:"center",
                                    border:"2px solid var(--bg)", marginLeft:idx===0?0:-8 }}>{i}</span>
          ))}
        </div>
      </Preview>
      <Code>{`<div style={{ display:"flex" }}>
  {team.map((user, i) => (
    <Avatar key={user.id} initials={user.initials}
      style={{ marginLeft: i > 0 ? -8 : 0 }}/>
  ))}
  {overflow > 0 && <Avatar initials={\`+\${overflow}\`}/>}
</div>`}</Code>

      <H2 id="in-list">In a list</H2>
      <P>A common pattern: avatar next to a name and subtitle in a compact row.</P>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:320, display:"flex", flexDirection:"column", gap:2 }}>
          {[["Ada Turing","Admin","var(--mono-800)"],["Grace Hopper","Member","var(--mono-600)"],["Linus Bell","Viewer","var(--mono-700)"]].map(([name,role,bg])=>(
            <div key={name} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:6 }}>
              <span style={{ width:28, height:28, borderRadius:"50%", background:bg, color:"#fff", fontSize:10, fontWeight:600,
                              display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{name.split(" ").map(s=>s[0]).join("")}</span>
              <div>
                <div style={{ fontSize:13, fontWeight:500, color:"var(--fg1)" }}>{name}</div>
                <div style={{ fontSize:11, color:"var(--fg3)" }}>{role}</div>
              </div>
            </div>
          ))}
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
            {[["size",'"sm" | "md" | "lg"','"md"',"Diameter"],
              ["initials","string","--","One or two characters shown when no image"],
              ["src","string","--","Image URL"],
              ["alt","string",'""',"Alt text for the image"],
              ["className","string","--","Additional CSS classes"]].map(([p,t,d,desc],i,arr)=>(
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

function PageAccordion() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
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
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
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
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [align, setAlign] = useState("left");
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
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
  <ToggleGroupItem value="kanban">Kanban</ToggleGroupItem>
</ToggleGroup>`}</Code>

      <H2 id="single-toggle">Single toggle</H2>
      <P>The standalone <InlineCode>Toggle</InlineCode> is for a single on/off action, like a bold button in a toolbar or a pin on a list item.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", gap:2, border:"1px solid var(--border-subtle)", borderRadius:6, padding:2, width:"fit-content" }}>
          {[["B", bold, setBold, "font-weight:700"], ["I", italic, setItalic, "font-style:italic"]].map(([label, on, set, style]) => (
            <button key={label} onClick={() => set(v => !v)}
              style={{ all:"unset", fontFamily:"inherit", fontSize:13, fontWeight: label==="B" ? 700 : 400,
                fontStyle: label==="I" ? "italic" : "normal",
                width:28, height:28, display:"inline-flex", alignItems:"center", justifyContent:"center",
                borderRadius:4, cursor:"pointer",
                background: on ? "var(--bg-muted)" : "transparent",
                color: on ? "var(--fg1)" : "var(--fg3)" }}>{label}</button>
          ))}
        </div>
      </Preview>
      <Code language="jsx">{`<Toggle pressed={bold} onPressedChange={setBold}>B</Toggle>
<Toggle pressed={italic} onPressedChange={setItalic}>I</Toggle>`}</Code>

      <H2 id="with-icons">With icons</H2>
      <P>Toggle groups work well for toolbar-style controls. Pass icon elements as children for compact controls like alignment or view switchers.</P>
      <Code language="jsx">{`<ToggleGroup type="single" value={align} onValueChange={setAlign}>
  <ToggleGroupItem value="left"><AlignLeft size={14}/></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter size={14}/></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight size={14}/></ToggleGroupItem>
</ToggleGroup>`}</Code>

      <H3>Props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["type",'"single" | "multiple"',"--","Whether one or many items can be active"],
              ["value","string | string[]","--","Currently active item(s)"],
              ["onValueChange","(value) => void","--","Called when selection changes"],
              ["children","ReactNode","--","ToggleGroupItem elements"]].map(([p,t,d,desc],i,arr)=>(
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
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
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
  const [saving, setSaving] = useState(false);
  const handleSave = () => { setSaving(true); setTimeout(() => setSaving(false), 2000); };
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Spinner</H1>
      <Lead>For waits longer than ~400ms when you don't have a better placeholder. Anything faster, skip it; a spinner that flashes for 80ms just looks broken.</Lead>

      <H2 id="sizes">Sizes</H2>
      <P>Pass a pixel value. Match the spinner to the text size around it.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", gap:24, alignItems:"center" }}>
          {[14, 20, 28, 40].map(s => (
            <div key={s} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
              <SpinnerSpan size={s}/>
              <span style={{ fontSize:11, color:"var(--fg3)", fontFamily:"var(--font-mono)" }}>{s}px</span>
            </div>
          ))}
        </div>
      </Preview>
      <Code language="jsx">{`<Spinner size={14}/>
<Spinner size={20}/>
<Spinner size={28}/>
<Spinner size={40}/>`}</Code>

      <H2 id="inside-button">Inside a button</H2>
      <P>Put it in a button while the request is in flight. Leave the label in place; swapping "Save" for the spinner makes the button width jump and the eye catches it.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <DemoButton variant="primary" disabled={saving} onClick={handleSave}>
            {saving && <SpinnerSpan size={14}/>} {saving ? "Saving..." : "Save changes"}
          </DemoButton>
          <span style={{ fontSize:11, color:"var(--fg3)" }}>{saving ? "Click triggered a 2s wait" : "Click to try"}</span>
        </div>
      </Preview>
      <Code language="jsx">{`<Button variant="primary" disabled={saving} onClick={save}>
  {saving && <Spinner size={14}/>}
  {saving ? "Saving…" : "Save changes"}
</Button>`}</Code>

      <H2 id="inline">Inline with text</H2>
      <P>Works in any inline context. Match the size to the surrounding font.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"var(--fg2)" }}>
          <SpinnerSpan size={14}/> Loading results...
        </div>
      </Preview>
      <Code language="jsx">{`<div style={{ display:"flex", alignItems:"center", gap:8 }}>
  <Spinner size={14}/> Loading results…
</div>`}</Code>

      <H3>Props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["size","number","16","Diameter in pixels"],
              ["label","string",'"Loading"',"Screen reader text (aria-label)"],
              ["className","string","--","Additional CSS classes"]].map(([p,t,d,desc],i,arr)=>(
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

function PageTextarea() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Textarea</H1>
      <Lead>A multi-line text input. Same styling as Input, same Field wrapper pattern. Use it for comments, descriptions, notes, and anything that might run past a single line.</Lead>

      <H2 id="default-textarea">Default</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:6 }}>
          <label style={{ fontSize:12, fontWeight:500 }}>Description</label>
          <textarea readOnly defaultValue="A minimal, monotone design system for teams that want their product to look like their product."
            style={{ fontFamily:"inherit", fontSize:13, padding:"9px 12px", minHeight:80, resize:"vertical",
              border:"1px solid var(--border)", borderRadius:6, color:"var(--fg1)", background:"var(--bg)", outline:"none", lineHeight:1.5 }}/>
          <span style={{ fontSize:11, color:"var(--fg3)" }}>Supports markdown formatting.</span>
        </div>
      </Preview>
      <Code language="jsx">{`<Field label="Description" help="Supports markdown formatting.">
  <Textarea rows={3} placeholder="Tell us more…"/>
</Field>`}</Code>

      <H2 id="with-field">With Field wrapper</H2>
      <P>Wrap in <InlineCode>Field</InlineCode> for label, helper text, and error handling. Same pattern as Input.</P>
      <Code language="jsx">{`<Field label="Bio" error={errors.bio}>
  <Textarea rows={4} placeholder="A few words about yourself"/>
</Field>

<Field label="Notes" help="Optional. Only visible to admins.">
  <Textarea rows={3}/>
</Field>`}</Code>

      <H2 id="states-textarea">States</H2>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", gap:10 }}>
          {["Default","Disabled","Error"].map(s => (
            <textarea key={s} readOnly value={s} disabled={s==="Disabled"} rows={2}
              style={{ fontFamily:"inherit", fontSize:13, padding:"8px 12px", borderRadius:6, color:"var(--fg1)",
                background: s==="Disabled"?"var(--bg-muted)":"var(--bg)", outline:"none", resize:"none", width:120,
                border: `1px solid ${s==="Error"?"#5a2626":s==="Disabled"?"var(--border-subtle)":"var(--border)"}` }}/>
          ))}
        </div>
      </Preview>

      <H3>Props</H3>
      <P>Textarea accepts all native <InlineCode>&lt;textarea&gt;</InlineCode> attributes plus:</P>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["rows","number","3","Visible line count"],
              ["disabled","boolean","false","Prevents interaction"],
              ["placeholder","string","--","Placeholder text"],
              ["className","string","--","Additional CSS classes"]].map(([p,t,d,desc],i,arr)=>(
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

function PageSelect() {
  const [value, setValue] = useState("viewer");
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Select</H1>
      <Lead>A dropdown menu for picking one option from a list. Wraps Radix UI Select for keyboard navigation, screen reader support, and portal rendering. Use it when you have five or more options; under five, a Toggle group is usually cleaner.</Lead>

      <H2 id="default-select">Default</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:220 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <label style={{ fontSize:12, fontWeight:500 }}>Role</label>
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger placeholder="Choose a role"/>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Preview>
      <Code language="jsx">{`<Field label="Role">
  <Select value={role} onValueChange={setRole}>
    <SelectTrigger placeholder="Choose a role"/>
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="member">Member</SelectItem>
      <SelectItem value="viewer">Viewer</SelectItem>
      <SelectItem value="billing">Billing</SelectItem>
    </SelectContent>
  </Select>
</Field>`}</Code>

      <H2 id="with-placeholder">With placeholder</H2>
      <P>The <InlineCode>placeholder</InlineCode> prop on <InlineCode>SelectTrigger</InlineCode> shows when no value is selected.</P>
      <Code language="jsx">{`<Select>
  <SelectTrigger placeholder="Select a country"/>
  <SelectContent>
    <SelectItem value="us">United States</SelectItem>
    <SelectItem value="uk">United Kingdom</SelectItem>
    <SelectItem value="de">Germany</SelectItem>
  </SelectContent>
</Select>`}</Code>

      <H2 id="in-form">In a form</H2>
      <P>Selects work inside <InlineCode>Field</InlineCode> wrappers and with <InlineCode>useMonosetForm</InlineCode> just like other inputs.</P>
      <Code language="jsx">{`const form = useMonosetForm({
  fields: {
    role:    { initial: "", validate: v => !v && "Required" },
    region:  { initial: "", validate: v => !v && "Required" },
  },
});

<Form onSubmit={form.handleSubmit(onSave)}>
  <Field label="Role" error={form.error("role")}>
    <Select value={form.field("role").value}
      onValueChange={form.field("role").onChange}>
      <SelectTrigger placeholder="Choose a role"/>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="member">Member</SelectItem>
      </SelectContent>
    </Select>
  </Field>
</Form>`}</Code>

      <H3>Props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Component","Prop","Type","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["Select","value","string","Selected value (controlled)"],
              ["Select","onValueChange","(v: string) => void","Called on selection change"],
              ["SelectTrigger","placeholder","string","Placeholder when empty"],
              ["SelectItem","value","string","Option value (required)"],
              ["SelectItem","children","ReactNode","Option label"]].map(([c,p,t,desc],i,arr)=>(
              <tr key={c+p} style={{ borderBottom:i<arr.length-1?"1px solid var(--border-subtle)":"none" }}>
                <td style={{ padding:"9px 14px" }}><InlineCode>{c}</InlineCode></td>
                <td style={{ padding:"9px 14px" }}><InlineCode>{p}</InlineCode></td>
                <td style={{ padding:"9px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg3)" }}>{t}</td>
                <td style={{ padding:"9px 14px", color:"var(--fg3)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageLayout() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Layout</H1>
      <Lead>Four layout primitives that handle spacing so you never write <InlineCode>display: flex; gap: 16px</InlineCode> by hand again. Stack for vertical, Inline for horizontal, Grid for auto-fit columns, Container for max-width centering.</Lead>

      <H2 id="stack">Stack</H2>
      <P>Vertical spacing. The <InlineCode>gap</InlineCode> prop maps to the <InlineCode>--space-*</InlineCode> token scale (0-14).</P>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:300, display:"flex", flexDirection:"column", gap:16 }}>
          {["First item","Second item","Third item"].map(t => (
            <div key={t} style={{ padding:"10px 14px", background:"var(--bg-muted)", borderRadius:6, fontSize:13 }}>{t}</div>
          ))}
        </div>
      </Preview>
      <Code language="jsx">{`<Stack gap={4}>
  <Card>First item</Card>
  <Card>Second item</Card>
  <Card>Third item</Card>
</Stack>`}</Code>

      <H2 id="inline">Inline</H2>
      <P>Horizontal with wrap. Good for tag lists, button rows, or any set of items that should flow left to right and wrap naturally.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {["design","monotone","v0.4","react","tokens","motion","layout"].map(t => (
            <span key={t} style={{ fontSize:12, color:"var(--fg2)", background:"var(--bg-muted)", borderRadius:4, padding:"3px 8px" }}>{t}</span>
          ))}
        </div>
      </Preview>
      <Code language="jsx">{`<Inline gap={2}>
  <Badge>design</Badge>
  <Badge>monotone</Badge>
  <Badge>v0.4</Badge>
</Inline>`}</Code>

      <H2 id="grid">Grid</H2>
      <P>Auto-fit responsive grid. Cards wrap to the next row when they can't fit at <InlineCode>minWidth</InlineCode>. No breakpoints needed.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:12, width:"100%" }}>
          {["Users","Revenue","Orders","Growth"].map(t => (
            <div key={t} style={{ padding:"16px 14px", background:"var(--bg-muted)", borderRadius:6, border:"1px solid var(--border-subtle)" }}>
              <div style={{ fontSize:11, color:"var(--fg3)", marginBottom:4 }}>{t}</div>
              <div style={{ fontSize:20, fontWeight:600 }}>{Math.floor(Math.random()*900+100)}</div>
            </div>
          ))}
        </div>
      </Preview>
      <Code language="jsx">{`<Grid minWidth={200} gap={3}>
  <StatCard title="Users" value={1234}/>
  <StatCard title="Revenue" value="$12k"/>
  <StatCard title="Orders" value={89}/>
  <StatCard title="Growth" value="+12%"/>
</Grid>`}</Code>

      <H2 id="container">Container</H2>
      <P>Centers content with a max-width. Five sizes from <InlineCode>sm</InlineCode> (640px) to <InlineCode>2xl</InlineCode> (1536px). Adds horizontal padding by default.</P>
      <Code language="jsx">{`<Container size="lg">
  <Stack gap={6}>
    <h1>Page title</h1>
    <p>Content is centered with a max-width of 1024px.</p>
  </Stack>
</Container>`}</Code>

      <H2 id="composing">Composing layouts</H2>
      <P>These primitives are designed to nest. A typical page layout stacks sections vertically, each section uses a Container, and the content inside uses Grid or Inline.</P>
      <Code language="jsx">{`<Stack gap={8}>
  <Container size="lg">
    <Stack gap={4}>
      <h1>Dashboard</h1>
      <Grid minWidth={240} gap={4}>
        <StatCard title="Users" value={1234}/>
        <StatCard title="Revenue" value="$12k"/>
        <StatCard title="Orders" value={89}/>
      </Grid>
      <Inline gap={2}>
        <Button variant="primary">Export</Button>
        <Button variant="ghost">Settings</Button>
      </Inline>
    </Stack>
  </Container>
</Stack>`}</Code>

      <Divider/>

      <H3>Stack props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden", marginBottom:24 }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["gap","0-14","4","Spacing scale step (maps to --space-*)"],
              ["align",'"start" | "center" | "end" | "stretch"',"--","Cross-axis alignment"]].map(([p,t,d,desc],i,arr)=>(
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

      <H3>Inline props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden", marginBottom:24 }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["gap","0-14","4","Spacing scale step"],
              ["align",'"start" | "center" | "end" | "baseline"',"--","Cross-axis alignment"],
              ["wrap","boolean","true","Whether items wrap to new lines"]].map(([p,t,d,desc],i,arr)=>(
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

      <H3>Grid props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden", marginBottom:24 }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["columns","number","--","Fixed column count (overrides auto-fit)"],
              ["minWidth","number | string","240","Minimum column width for auto-fit"],
              ["gap","0-14","4","Spacing scale step"]].map(([p,t,d,desc],i,arr)=>(
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

      <H3>Container props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["size",'"sm" | "md" | "lg" | "xl" | "2xl"','"lg"',"Max-width (640-1536px)"],
              ["padding","boolean","true","Horizontal padding"]].map(([p,t,d,desc],i,arr)=>(
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

function PageDashboardGuide() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>Building a dashboard</H1>
      <Lead>A sidebar, a header, stat cards, and a data table. This is the layout you end up building for every SaaS admin panel. Here's how it comes together with Monoset.</Lead>

      <H2 id="shell">The shell</H2>
      <P>The outer frame is a CSS grid: a fixed sidebar on the left, the main content area on the right. The header sits inside the content area, not spanning the full width.</P>
      <Code language="jsx">{`function DashboardShell({ children }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"240px 1fr",
                  height:"100vh" }}>
      <Sidebar/>
      <div style={{ display:"flex", flexDirection:"column",
                    overflow:"hidden" }}>
        <Header/>
        <main style={{ flex:1, overflowY:"auto", padding:24 }}>
          <Container size="xl">
            {children}
          </Container>
        </main>
      </div>
    </div>
  );
}`}</Code>

      <H2 id="sidebar">Sidebar</H2>
      <P>A vertical nav with grouped links. The active item gets a muted background.</P>
      <Code language="jsx">{`function Sidebar() {
  const [active, setActive] = useState("overview");
  const groups = [
    { label:"General", items:[
      { id:"overview", label:"Overview", icon:"layout" },
      { id:"analytics", label:"Analytics", icon:"barChart" },
      { id:"reports", label:"Reports", icon:"file" },
    ]},
    { label:"Management", items:[
      { id:"users", label:"Users", icon:"users" },
      { id:"billing", label:"Billing", icon:"creditCard" },
      { id:"settings", label:"Settings", icon:"settings" },
    ]},
  ];

  return (
    <aside style={{ borderRight:"1px solid var(--border-subtle)",
                    padding:"20px 12px", background:"var(--bg-subtle)" }}>
      <Stack gap={6}>
        {groups.map(g => (
          <Stack key={g.label} gap={1}>
            <div className="meta" style={{ padding:"0 8px" }}>
              {g.label}
            </div>
            {g.items.map(item => (
              <button key={item.id} onClick={() => setActive(item.id)}
                style={{
                  background: active===item.id
                    ? "var(--bg-muted)" : "transparent",
                  borderRadius:6, padding:"7px 10px",
                  fontSize:13, display:"flex", gap:8,
                }}>
                <Icon name={item.icon} size={15}/>
                {item.label}
              </button>
            ))}
          </Stack>
        ))}
      </Stack>
    </aside>
  );
}`}</Code>

      <H2 id="stat-cards">Stat cards</H2>
      <P>A responsive grid of summary metrics. The Grid component handles the responsive layout; each card is just a Card with a title, value, and optional trend indicator.</P>
      <Code language="jsx">{`const stats = [
  { title:"Total users",  value:"12,847", change:"+12%" },
  { title:"Revenue",      value:"$48.2k", change:"+8.3%" },
  { title:"Active now",   value:"342",    change:null },
  { title:"Conversion",   value:"3.2%",   change:"-0.4%" },
];

<Grid minWidth={200} gap={4}>
  {stats.map(s => (
    <Card key={s.title} pad={16}>
      <div className="meta">{s.title}</div>
      <div style={{ fontSize:24, fontWeight:600, marginTop:4 }}>
        {s.value}
      </div>
      {s.change && (
        <div style={{ fontSize:12, marginTop:4,
          color: s.change.startsWith("+")
            ? "var(--status-success)" : "var(--status-danger)" }}>
          {s.change} from last month
        </div>
      )}
    </Card>
  ))}
</Grid>`}</Code>

      <H2 id="data-table">Data table</H2>
      <P>Below the stat cards, a sortable table with row selection. Use <InlineCode>TableHeader</InlineCode> for sortable columns and <InlineCode>TableSelectAll</InlineCode> / <InlineCode>TableSelectRow</InlineCode> for the checkboxes.</P>
      <Code language="jsx">{`const [sort, setSort] = useState({ key:"name", dir:"asc" });
const [selected, setSelected] = useState(new Set());

<Table maxHeight={400}>
  <thead>
    <tr>
      <TableSelectAll
        checked={selected.size === users.length}
        onChange={() => {/* toggle all */}}/>
      <TableHeader sorted={sort.key==="name" ? sort.dir : null}
        onSort={() => toggleSort("name")}>Name</TableHeader>
      <TableHeader sorted={sort.key==="role" ? sort.dir : null}
        onSort={() => toggleSort("role")}>Role</TableHeader>
      <th>Status</th>
      <th>MRR</th>
    </tr>
  </thead>
  <tbody>
    {sorted.map(user => (
      <tr key={user.id}>
        <TableSelectRow checked={selected.has(user.id)}
          onChange={() => toggle(user.id)}/>
        <td>
          <Inline gap={2} align="center">
            <Avatar size="sm" initials={user.initials}/>
            <div>
              <div>{user.name}</div>
              <div className="meta">{user.email}</div>
            </div>
          </Inline>
        </td>
        <td>{user.role}</td>
        <td><Badge dot variant={user.statusVariant}>
          {user.status}
        </Badge></td>
        <td>{user.mrr}</td>
      </tr>
    ))}
  </tbody>
</Table>`}</Code>

      <H2 id="full-page">Putting it together</H2>
      <P>The full dashboard page composes all three sections inside the shell.</P>
      <Code language="jsx">{`export default function DashboardPage() {
  return (
    <DashboardShell>
      <Stack gap={6}>
        <Inline gap={4} align="center">
          <h1>Overview</h1>
          <Badge variant="outline">Live</Badge>
        </Inline>
        <StatCards/>
        <UsersTable/>
      </Stack>
    </DashboardShell>
  );
}`}</Code>
    </div>
  );
}

function PageDataTableGuide() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>Data table with filters</H1>
      <Lead>A searchable, filterable, sortable data table with row selection and bulk actions. The pattern you need every time someone says "can we add an admin view for this?"</Lead>

      <H2 id="overview">What we're building</H2>
      <P>A table of users with: a search input that filters by name or email, a select dropdown that filters by role, sortable column headers, row checkboxes, and a bulk action bar that appears when rows are selected.</P>

      <H2 id="search">Search filter</H2>
      <P>An Input above the table. Filter rows on each keystroke.</P>
      <Code language="jsx">{`const [search, setSearch] = useState("");

const filtered = users.filter(u =>
  u.name.toLowerCase().includes(search.toLowerCase()) ||
  u.email.toLowerCase().includes(search.toLowerCase())
);

<Field>
  <Input
    placeholder="Search by name or email..."
    value={search}
    onChange={e => setSearch(e.target.value)}
    icon="search"/>
</Field>`}</Code>

      <H2 id="column-filter">Column filter</H2>
      <P>A Select for role filtering. Combine it with the search filter.</P>
      <Code language="jsx">{`const [roleFilter, setRoleFilter] = useState("all");

const filtered = users
  .filter(u => roleFilter === "all" || u.role === roleFilter)
  .filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

<Inline gap={3}>
  <div style={{ flex:1 }}>
    <Input placeholder="Search..." value={search}
      onChange={e => setSearch(e.target.value)}/>
  </div>
  <Select value={roleFilter} onValueChange={setRoleFilter}>
    <SelectTrigger placeholder="All roles"/>
    <SelectContent>
      <SelectItem value="all">All roles</SelectItem>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="member">Member</SelectItem>
      <SelectItem value="viewer">Viewer</SelectItem>
    </SelectContent>
  </Select>
</Inline>`}</Code>

      <H2 id="sort">Sort</H2>
      <P>Use <InlineCode>TableHeader</InlineCode> with an <InlineCode>onSort</InlineCode> callback. Keep the sort state in a single object.</P>
      <Code language="jsx">{`const [sort, setSort] = useState({ key:"name", dir:"asc" });

function toggleSort(key) {
  setSort(prev =>
    prev.key === key
      ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
      : { key, dir: "asc" }
  );
}

const sorted = [...filtered].sort((a, b) => {
  const v = a[sort.key].localeCompare(b[sort.key]);
  return sort.dir === "asc" ? v : -v;
});`}</Code>

      <H2 id="selection">Row selection and bulk actions</H2>
      <P>Track selected row IDs in a Set. Show the bulk action bar only when the set is non-empty.</P>
      <Code language="jsx">{`const [selected, setSelected] = useState(new Set());

function toggleAll() {
  setSelected(prev =>
    prev.size === sorted.length ? new Set() : new Set(sorted.map(u => u.id))
  );
}

function toggleOne(id) {
  setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
}

{selected.size > 0 && (
  <Inline gap={3} align="center">
    <span className="meta">{selected.size} selected</span>
    <Button variant="ghost" size="sm" onClick={exportSelected}>
      Export
    </Button>
    <Button variant="danger" size="sm" onClick={deleteSelected}>
      Delete
    </Button>
  </Inline>
)}`}</Code>

      <H2 id="full-table">Full example</H2>
      <P>Everything wired together.</P>
      <Code language="jsx">{`export default function UsersAdmin() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sort, setSort] = useState({ key:"name", dir:"asc" });
  const [selected, setSelected] = useState(new Set());

  const filtered = users
    .filter(u => roleFilter === "all" || u.role === roleFilter)
    .filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );

  const sorted = [...filtered].sort((a, b) => {
    const v = a[sort.key].localeCompare(b[sort.key]);
    return sort.dir === "asc" ? v : -v;
  });

  return (
    <Stack gap={4}>
      <Inline gap={3}>
        <div style={{ flex:1 }}>
          <Input placeholder="Search..." value={search}
            onChange={e => setSearch(e.target.value)}/>
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger placeholder="All roles"/>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>
      </Inline>

      {selected.size > 0 && (
        <Inline gap={3} align="center">
          <Badge variant="solid">{selected.size} selected</Badge>
          <Button variant="ghost" size="sm">Export</Button>
          <Button variant="danger" size="sm">Delete</Button>
        </Inline>
      )}

      <Table maxHeight={400}>
        <thead><tr>
          <TableSelectAll checked={selected.size === sorted.length}
            onChange={toggleAll}/>
          <TableHeader sorted={sort.key==="name" ? sort.dir : null}
            onSort={() => toggleSort("name")}>Name</TableHeader>
          <TableHeader sorted={sort.key==="role" ? sort.dir : null}
            onSort={() => toggleSort("role")}>Role</TableHeader>
          <th>Status</th>
        </tr></thead>
        <tbody>
          {sorted.map(u => (
            <tr key={u.id}>
              <TableSelectRow checked={selected.has(u.id)}
                onChange={() => toggleOne(u.id)}/>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td><Badge dot>{u.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
}`}</Code>
    </div>
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
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
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

      <Divider/>

      <H2 id="why-stable">Why design systems need stable selectors</H2>
      <P>Class names are styling concerns. They change when you refactor CSS, swap to Tailwind, or rename a component. IDs are unique but brittle and overloaded (anchor links, ARIA, form controls). Data attributes are the only selector that carries no styling or behavioral meaning, which is exactly what makes them stable across rewrites.</P>
      <P>Three things benefit from stable selectors:</P>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
        {[
          { title:"End-to-end tests", desc:"Playwright and Cypress tests that use data-ms selectors survive redesigns. No more updating 200 test files because someone renamed a CSS class." },
          { title:"Analytics and tracking", desc:"Product analytics that track clicks on data-ms regions stay accurate across deploys. No more phantom events from renamed selectors." },
          { title:"AI and design tools", desc:"Coding agents, design tools, and scrapers that reference UI regions by data-ms can target elements without understanding the CSS or component tree." },
        ].map(item => (
          <div key={item.title} style={{ padding:"12px 14px", border:"1px solid var(--border-subtle)", borderRadius:6 }}>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>{item.title}</div>
            <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.6 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H2 id="component-naming">Component-specific conventions</H2>
      <P>Different UI patterns need different naming strategies. Here's what works for common Monoset patterns:</P>
      <Code language="markdown">{`# Tables
data-ms="users-table"           # the table wrapper
data-ms="users-table-header"    # the thead
data-ms="users-table-row"       # each tbody tr (use with nth-child or data-id)
data-ms="users-table-actions"   # bulk action bar

# Forms
data-ms="settings-form"         # the form element
data-ms="settings-form-email"   # a specific field group
data-ms="settings-form-submit"  # the submit button

# Navigation
data-ms="sidebar"               # the sidebar container
data-ms="sidebar-nav"           # the nav element
data-ms="sidebar-nav-item"      # each nav link
data-ms="topbar"                # the header bar
data-ms="topbar-search"         # the search input

# Modals and overlays
data-ms="delete-dialog"         # the dialog
data-ms="delete-dialog-confirm" # the confirm button
data-ms="toast-container"       # the toast stack`}</Code>

      <H2 id="playwright">Playwright test example</H2>
      <P>A complete Playwright test that uses data-ms selectors. No fragile class names, no text matchers that break with copy changes.</P>
      <Code language="typescript">{`import { test, expect } from "@playwright/test";

test("admin can update user role", async ({ page }) => {
  await page.goto("/admin/users");

  // Filter to the target user
  const search = page.locator('[data-ms="users-table"] input');
  await search.fill("ada@monoset.dev");

  // Open the row actions
  const row = page.locator('[data-ms="users-table-row"]').first();
  await expect(row).toContainText("Ada Turing");
  await row.locator('[data-ms="row-actions"]').click();

  // Change role
  await page.locator('[data-ms="role-select"]').click();
  await page.locator('[data-ms="role-option-admin"]').click();

  // Verify the toast
  const toast = page.locator('[data-ms="toast-container"]');
  await expect(toast).toContainText("Role updated");
});`}</Code>

      <H2 id="ai-tools">Using with AI coding tools</H2>
      <P>When your codebase has data-ms attributes, AI tools like Cursor, Copilot, and Claude Code can reference UI regions by name instead of guessing at the DOM structure. This makes prompts like "add a loading state to the users-table" unambiguous.</P>
      <P>Add a note to your project's AI instructions (CLAUDE.md, .cursorrules, etc.):</P>
      <Code language="markdown">{`# UI selectors
This codebase uses data-ms attributes for stable UI region targeting.
When referencing UI elements in code, tests, or analytics, always use
data-ms selectors: document.querySelector('[data-ms="region-name"]')

Never target by className, id, or text content for test or tracking purposes.`}</Code>
    </div>
  );
}

/* ── Playground ─────────────────────────────────────────────── */

const PLAYGROUND_COMPONENTS = [
  "Button","Badge","Alert","Avatar","Card","Input","Textarea",
  "Switch","Checkbox","Spinner",
];

const PLAYGROUND_DEFAULTS = {
  Button:   { variant: "secondary", size: "md", disabled: false, children: "Click me" },
  Badge:    { variant: "neutral", children: "New" },
  Alert:    { title: "Heads up", children: "Something worth knowing about." },
  Avatar:   { size: "md", initials: "AT", src: "" },
  Card:     { variant: "outline", children: "Card content goes here." },
  Input:    { placeholder: "Type something...", disabled: false },
  Textarea: { placeholder: "Write a longer message...", rows: 3, disabled: false },
  Switch:   { checked: false, label: "Enable notifications" },
  Checkbox: { checked: false, label: "Accept terms" },
  Spinner:  { size: 20 },
};

function PlaygroundField({ label, children }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
      <label style={{ fontSize:11, fontWeight:500, color:"var(--fg3)", textTransform:"uppercase", letterSpacing:"0.05em" }}>{label}</label>
      {children}
    </div>
  );
}

function generateCode(component, props) {
  const defaults = PLAYGROUND_DEFAULTS[component];
  const selfClosing = ["Input","Textarea","Switch","Checkbox","Spinner"].includes(component);
  const parts = [];
  const children = props.children;

  for (const [key, val] of Object.entries(props)) {
    if (key === "children") continue;
    if (val === defaults[key]) continue;
    if (val === "" || val === false) continue;
    if (val === true) {
      parts.push(key);
    } else if (typeof val === "number") {
      parts.push(`${key}={${val}}`);
    } else {
      parts.push(`${key}="${val}"`);
    }
  }

  const propsStr = parts.length ? " " + parts.join(" ") : "";

  if (selfClosing) return `<${component}${propsStr} />`;
  if (children !== undefined && children !== "") {
    return `<${component}${propsStr}>${children}</${component}>`;
  }
  return `<${component}${propsStr} />`;
}

function PgSelect({ label, value, options, onChange }) {
  return (
    <PlaygroundField label={label}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger placeholder={`Choose ${label}`}/>
        <SelectContent>
          {options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </PlaygroundField>
  );
}

function PgSwitch({ label, checked, onChange }) {
  return (
    <PlaygroundField label={label}>
      <Switch checked={checked} onCheckedChange={onChange}/>
    </PlaygroundField>
  );
}

function PgInput({ label, value, onChange, placeholder }) {
  return (
    <PlaygroundField label={label}>
      <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || ""} style={{ fontSize:13 }}/>
    </PlaygroundField>
  );
}

function PlaygroundControls({ component, props, setProps }) {
  const set = (key) => (v) => setProps(p => ({...p, [key]: v}));
  switch (component) {
    case "Button":
      return (<>
        <PgSelect label="variant" value={props.variant} options={["primary","secondary","ghost","danger"]} onChange={set("variant")} />
        <PgSelect label="size" value={props.size} options={["sm","md","lg"]} onChange={set("size")} />
        <PgSwitch label="disabled" checked={props.disabled} onChange={set("disabled")} />
        <PgInput label="label" value={props.children} onChange={set("children")} />
      </>);
    case "Badge":
      return (<>
        <PgSelect label="variant" value={props.variant} options={["neutral","outline","solid"]} onChange={set("variant")} />
        <PgInput label="text" value={props.children} onChange={set("children")} />
      </>);
    case "Alert":
      return (<>
        <PgInput label="title" value={props.title} onChange={set("title")} />
        <PgInput label="message" value={props.children} onChange={set("children")} />
      </>);
    case "Avatar":
      return (<>
        <PgSelect label="size" value={props.size} options={["sm","md","lg"]} onChange={set("size")} />
        <PgInput label="initials" value={props.initials} onChange={set("initials")} />
        <PgInput label="src" value={props.src} onChange={set("src")} placeholder="Image URL (optional)" />
      </>);
    case "Card":
      return (<>
        <PgSelect label="variant" value={props.variant} options={["outline","elevated","inset"]} onChange={set("variant")} />
        <PgInput label="content" value={props.children} onChange={set("children")} />
      </>);
    case "Input":
      return (<>
        <PgInput label="placeholder" value={props.placeholder} onChange={set("placeholder")} />
        <PgSwitch label="disabled" checked={props.disabled} onChange={set("disabled")} />
      </>);
    case "Textarea":
      return (<>
        <PgInput label="placeholder" value={props.placeholder} onChange={set("placeholder")} />
        <PgSwitch label="disabled" checked={props.disabled} onChange={set("disabled")} />
      </>);
    case "Switch":
      return (<>
        <PgSwitch label="checked" checked={props.checked} onChange={set("checked")} />
        <PgInput label="label" value={props.label} onChange={set("label")} />
      </>);
    case "Checkbox":
      return (<>
        <PgSwitch label="checked" checked={props.checked} onChange={set("checked")} />
        <PgInput label="label" value={props.label} onChange={set("label")} />
      </>);
    case "Spinner":
      return (<>
        <PgSelect label="size" value={String(props.size)} options={["14","20","28","40"]} onChange={v => set("size")(Number(v))} />
      </>);
    default:
      return null;
  }
}

function PlaygroundPreview({ component, props }) {
  switch (component) {
    case "Button":
      return <Button variant={props.variant} size={props.size} disabled={props.disabled}>{props.children}</Button>;
    case "Badge":
      return <Badge variant={props.variant}>{props.children}</Badge>;
    case "Alert":
      return <Alert title={props.title} style={{ width:"100%", maxWidth:400 }}>{props.children}</Alert>;
    case "Avatar":
      return <Avatar size={props.size} initials={props.initials} src={props.src || undefined} />;
    case "Card":
      return (
        <Card style={{ width:"100%", maxWidth:320, padding:16,
          ...(props.variant==="elevated" ? { boxShadow:"0 1px 3px rgb(0 0 0 / 0.08)" } : {}),
          ...(props.variant==="inset" ? { background:"var(--bg-subtle)", border:"none" } : {}) }}>
          <div style={{ fontSize:13 }}>{props.children}</div>
        </Card>
      );
    case "Input":
      return <Input placeholder={props.placeholder} disabled={props.disabled} style={{ width:"100%", maxWidth:320 }} />;
    case "Textarea":
      return <Textarea placeholder={props.placeholder} rows={props.rows} disabled={props.disabled} style={{ width:"100%", maxWidth:320 }} />;
    case "Switch":
      return <Switch checked={props.checked} label={props.label} />;
    case "Checkbox":
      return <Checkbox checked={props.checked} label={props.label} />;
    case "Spinner":
      return <Spinner size={props.size} />;
    default:
      return null;
  }
}

function PagePlayground() {
  const [active, setActive] = useState("Button");
  const [propsMap, setPropsMap] = useState(() => {
    const m = {};
    for (const c of PLAYGROUND_COMPONENTS) m[c] = { ...PLAYGROUND_DEFAULTS[c] };
    return m;
  });

  const currentProps = propsMap[active];
  const setCurrentProps = useCallback((updater) => {
    setPropsMap(m => ({ ...m, [active]: typeof updater === "function" ? updater(m[active]) : updater }));
  }, [active]);

  const codeStr = generateCode(active, currentProps);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Tools</div>
      <H1>Playground</H1>
      <Lead>Pick a component, adjust its props, and see the result. The generated code below is ready to paste into your project.</Lead>

      {/* Component selector */}
      <div data-ms="playground-selector" style={{ marginBottom:24, maxWidth:240 }}>
        <PlaygroundField label="Component">
          <Select value={active} onValueChange={setActive}>
            <SelectTrigger placeholder="Pick a component"/>
            <SelectContent>
              {PLAYGROUND_COMPONENTS.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PlaygroundField>
      </div>

      {/* Preview + Controls grid */}
      <div data-ms="playground-workspace" style={{
        display:"grid", gridTemplateColumns:"1fr 280px", gap:1,
        border:"1px solid var(--border-subtle)", borderRadius:10, overflow:"hidden", marginBottom:24,
        background:"var(--border-subtle)",
      }}>
        {/* Live preview */}
        <div data-ms="playground-preview" style={{
          background:"var(--bg)", padding:40,
          display:"flex", alignItems:"center", justifyContent:"center", minHeight:200,
        }}>
          <PlaygroundPreview component={active} props={currentProps} />
        </div>

        {/* Controls panel */}
        <div data-ms="playground-controls" style={{
          background:"var(--bg-subtle)", padding:"20px 18px",
          display:"flex", flexDirection:"column", gap:16,
          borderLeft:"1px solid var(--border-subtle)",
        }}>
          <div style={{ fontSize:12, fontWeight:600, color:"var(--fg1)", paddingBottom:8, borderBottom:"1px solid var(--border-subtle)" }}>
            Props
          </div>
          <PlaygroundControls component={active} props={currentProps} setProps={setCurrentProps} />
          <button onClick={() => setPropsMap(m => ({...m, [active]: {...PLAYGROUND_DEFAULTS[active]}}))}
            style={{
              all:"unset", fontFamily:"inherit", fontSize:11, fontWeight:500, color:"var(--fg3)",
              cursor:"pointer", padding:"6px 0", marginTop:"auto",
              transition:"color var(--duration-fast) var(--ease-standard)",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--fg1)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--fg3)"}>
            Reset to defaults
          </button>
        </div>
      </div>

      {/* Generated code */}
      <div data-ms="playground-code" style={{ position:"relative" }}>
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          marginBottom:8,
        }}>
          <div style={{ fontSize:12, fontWeight:600, color:"var(--fg2)" }}>Generated code</div>
          <button onClick={handleCopy}
            style={{
              all:"unset", fontFamily:"inherit", fontSize:11, fontWeight:500,
              color: copied ? "var(--fg1)" : "var(--fg3)", cursor:"pointer",
              display:"inline-flex", alignItems:"center", gap:4,
              transition:"color var(--duration-fast) var(--ease-standard)",
            }}
            onMouseEnter={e => { if (!copied) e.currentTarget.style.color = "var(--fg1)"; }}
            onMouseLeave={e => { if (!copied) e.currentTarget.style.color = "var(--fg3)"; }}>
            <Icon name={copied ? "check" : "copy"} size={12} />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <Code language="jsx">{codeStr}</Code>
      </div>
    </div>
  );
}

/* ── Theming Guide ─────────────────────────────────────────── */

function PageThemeGuide() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>Theming Monoset</H1>
      <Lead>Monoset ships light and dark modes, scoped theme overrides, and a single accent channel you can swap in one line of CSS.</Lead>

      <H2 id="dark-mode">How dark mode works</H2>
      <P>Monoset flips the entire neutral ramp when the root element carries <InlineCode>data-monoset-theme="dark"</InlineCode> or the <InlineCode>.monoset-dark</InlineCode> class. Every semantic token (--bg, --fg1, --border, etc.) re-maps automatically. No extra imports, no separate stylesheet.</P>

      <H3 id="theme-provider">Setting up ThemeProvider</H3>
      <P>Wrap your app in <InlineCode>MonosetProvider</InlineCode> and pass your default theme. The provider reads the user's system preference on first load and syncs it to localStorage.</P>
      <Code language="jsx" filename="App.tsx">{`import { MonosetProvider } from "@monoset/react";
import "@monoset/tokens/monoset.css";

export default function App({ children }) {
  return (
    <MonosetProvider defaultTheme="system">
      {children}
    </MonosetProvider>
  );
}`}</Code>

      <H3 id="use-theme">Using the useTheme hook</H3>
      <P>Read and set the current theme from anywhere inside the provider tree.</P>
      <Code language="jsx" filename="ThemeStatus.tsx">{`import { useTheme } from "@monoset/react";

function ThemeStatus() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <p>
      Current: {resolvedTheme} (preference: {theme})
      <button onClick={() => setTheme("dark")}>Go dark</button>
    </p>
  );
}`}</Code>

      <H3 id="theme-toggle">ThemeToggle component</H3>
      <P>Drop in the built-in toggle for a sun/moon switch that works out of the box.</P>
      <Code language="jsx">{`import { ThemeToggle } from "@monoset/react";

// Renders a button that cycles light / dark / system
<ThemeToggle />`}</Code>

      <Divider/>

      <H2 id="scoped">Scoped dark mode</H2>
      <P>You can force dark mode on a single container without touching the rest of the page. Add the <InlineCode>.monoset-dark</InlineCode> class to any element, and every Monoset token inside it flips.</P>
      <Code language="jsx" filename="DarkCard.tsx">{`function DarkCard() {
  return (
    <div className="monoset-dark" style={{
      background: "var(--bg)",
      color: "var(--fg1)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      padding: 24,
    }}>
      <h3>This card is always dark</h3>
      <p style={{ color: "var(--fg2)" }}>
        The rest of the page stays in whatever theme the user chose.
      </p>
    </div>
  );
}`}</Code>

      <Divider/>

      <H2 id="accent">Customizing the accent</H2>
      <P>Monoset uses three CSS custom properties for the accent color channel: <InlineCode>--accent</InlineCode>, <InlineCode>--accent-fg</InlineCode>, and <InlineCode>--accent-hover</InlineCode>. Override them at any scope to swap the brand color without rebuilding anything.</P>
      <Code language="css" filename="brand.css">{`:root {
  --accent: #2563eb;
  --accent-fg: #ffffff;
  --accent-hover: #1d4ed8;
}

/* Dark mode gets its own values if needed */
.monoset-dark,
[data-monoset-theme="dark"] {
  --accent: #3b82f6;
  --accent-fg: #ffffff;
  --accent-hover: #60a5fa;
}`}</Code>
      <P>Every Monoset component that uses accent (primary buttons, focused inputs, active tabs) picks up the new values automatically.</P>
    </div>
  );
}

/* ── Settings Guide ────────────────────────────────────────── */

function PageSettingsGuide({ setPage }) {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>Building a settings page</H1>
      <Lead>A settings page is a good stress test for any component library. It needs tabs, form controls, cards, validation, and a layout that holds up on mobile. Here is how the pieces fit together in Monoset.</Lead>

      <H2 id="full-example">Full settings layout</H2>
      <P>Tabs across the top, cards for each section, and a save bar pinned to the bottom. This is the pattern most teams end up with.</P>
      <Code language="jsx" filename="Settings.tsx">{`import {
  Tabs, TabsList, TabsTrigger, TabsContent,
  Card, CardHeader, CardTitle, CardContent,
  Field, Input, Switch, Button, Stack, Container,
} from "@monoset/react";

function SettingsPage() {
  return (
    <Container size="md">
      <h1>Settings</h1>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile details</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap={16}>
                <Field label="Display name">
                  <Input placeholder="Jane Doe" />
                </Field>
                <Field label="Email">
                  <Input type="email" placeholder="jane@example.com" />
                </Field>
                <Field label="Bio">
                  <Input as="textarea" rows={3} />
                </Field>
              </Stack>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Email notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap={12}>
                <Field label="Marketing emails" horizontal>
                  <Switch />
                </Field>
                <Field label="Security alerts" horizontal>
                  <Switch defaultChecked />
                </Field>
              </Stack>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Change password</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap={16}>
                <Field label="Current password">
                  <Input type="password" />
                </Field>
                <Field label="New password">
                  <Input type="password" />
                </Field>
                <Button variant="primary">Update password</Button>
              </Stack>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  );
}`}</Code>

      <Divider/>

      <H2 id="validation">Form validation</H2>
      <P>The <InlineCode>useMonosetForm</InlineCode> hook wires validation to Field's error state. Pass a map of field names to validation functions and the hook returns helpers for the rest.</P>
      <Code language="jsx" filename="ProfileForm.tsx">{`import { useMonosetForm, Field, Input, Button, Stack } from "@monoset/react";

function ProfileForm() {
  const { values, errors, handleChange, handleSubmit } = useMonosetForm({
    initialValues: { name: "", email: "" },
    validate: {
      name: (v) => (!v ? "Name is required" : null),
      email: (v) =>
        !v ? "Email is required"
        : !v.includes("@") ? "Enter a valid email"
        : null,
    },
    onSubmit: (data) => {
      console.log("Saving", data);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={16}>
        <Field label="Name" error={errors.name}>
          <Input
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <Input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Field>
        <Button type="submit" variant="primary">Save</Button>
      </Stack>
    </form>
  );
}`}</Code>

      <Divider/>

      <H2 id="layout">Layout with Stack and Container</H2>
      <P><InlineCode>Container</InlineCode> caps the width and centers the content. <InlineCode>Stack</InlineCode> handles vertical spacing between form fields. Both are thin wrappers that apply Monoset spacing tokens so you don't end up with magic numbers in every file.</P>
      <Code language="jsx">{`<Container size="sm">
  <Stack gap={24}>
    <Card>...</Card>
    <Card>...</Card>
  </Stack>
</Container>

{/* Container sizes: "sm" (480px), "md" (640px), "lg" (768px), "xl" (1024px) */}`}</Code>
    </div>
  );
}

/* ── Accessibility Guide ───────────────────────────────────── */

function PageA11yGuide() {
  const checks = [
    { title: "Keyboard navigation", desc: "All interactive Monoset components (Button, Input, Tabs, Switch, Accordion, Slider) are reachable and operable with the keyboard. Focus order follows the DOM." },
    { title: "Focus indicators", desc: "Every focusable element shows a visible focus ring using the --focus-ring token. The ring color adapts to the current theme." },
    { title: "Screen readers", desc: "Components ship with proper ARIA roles, labels, and live regions. Radix UI primitives handle the heavy lifting." },
    { title: "Color contrast", desc: "The mono ramp is designed so that every semantic token pairing (--fg1 on --bg, --fg2 on --bg-subtle, etc.) meets WCAG AA contrast ratios." },
    { title: "Reduced motion", desc: "MonosetProvider checks prefers-reduced-motion and disables CSS transitions and Framer Motion animations when the preference is set." },
    { title: "Form errors", desc: "The Field component wires aria-describedby to the error message and sets aria-invalid on the input when an error is present." },
  ];

  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>Accessibility checklist</H1>
      <Lead>Monoset components are built on Radix UI and ship accessible by default. Keyboard support, focus management, and ARIA attributes are handled for you. This page lists what you get and what you still need to add.</Lead>

      <H2 id="built-in">What Monoset handles</H2>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
        {checks.map(c => (
          <div key={c.title} style={{ display:"flex", gap:12, alignItems:"flex-start",
                                       border:"1px solid var(--border-subtle)", borderRadius:8, padding:"14px 16px" }}>
            <div style={{ width:22, height:22, borderRadius:6, background:"var(--bg-muted)",
                          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
              <Icon name="check" size={13} style={{ color:"var(--fg1)" }}/>
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, marginBottom:3 }}>{c.title}</div>
              <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.6 }}>{c.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Divider/>

      <H2 id="testing">Testing with axe</H2>
      <P>Use <InlineCode>vitest-axe</InlineCode> to catch regressions in your own pages. The test below checks that a rendered settings page has no accessibility violations.</P>
      <Code language="jsx" filename="settings.a11y.test.tsx">{`import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "vitest-axe";
import { expect, test } from "vitest";
import SettingsPage from "./SettingsPage";

expect.extend(toHaveNoViolations);

test("settings page has no a11y violations", async () => {
  const { container } = render(<SettingsPage />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});`}</Code>

      <Divider/>

      <H2 id="your-job">What you need to add</H2>
      <P>Monoset handles component-level accessibility. Page-level concerns are still on you:</P>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
        {[
          "Add alt text to all images and icons that convey meaning.",
          "Use heading levels (h1, h2, h3) in order. Don't skip from h1 to h3.",
          "Add a skip-to-content link at the top of each page.",
          "Set the page lang attribute on your <html> element.",
          "Test with a real screen reader (VoiceOver, NVDA) at least once before shipping.",
          "Ensure custom interactive elements outside Monoset have proper roles and labels.",
        ].map(item => (
          <div key={item} style={{ display:"flex", gap:10, alignItems:"flex-start", fontSize:13, color:"var(--fg2)", lineHeight:1.6 }}>
            <span style={{ color:"var(--fg3)", flexShrink:0 }}>-</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Next.js Guide ─────────────────────────────────────────── */

function PageNextjsGuide() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>Using with Next.js</H1>
      <Lead>Monoset works with both the App Router and Pages Router. The setup takes two minutes. Remix gets its own section at the bottom.</Lead>

      <H2 id="install">Installation</H2>
      <Code filename="terminal">{`npm install @monoset/tokens @monoset/react`}</Code>

      <H2 id="app-router">App Router setup</H2>
      <P>Import the CSS file in your root layout and wrap the children with <InlineCode>MonosetProvider</InlineCode>. The provider needs <InlineCode>"use client"</InlineCode> because it manages theme state with React context.</P>
      <Code language="tsx" filename="app/layout.tsx">{`import "@monoset/tokens/monoset.css";
import { MonosetProvider } from "@monoset/react";

export const metadata = {
  title: "My App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// Extracted so the "use client" boundary stays narrow
"use client";
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MonosetProvider defaultTheme="system">
      {children}
    </MonosetProvider>
  );
}`}</Code>
      <P>In practice you would put the <InlineCode>Providers</InlineCode> component in its own file (<InlineCode>app/providers.tsx</InlineCode>) with the <InlineCode>"use client"</InlineCode> directive at the top. The example above keeps it inline for clarity.</P>

      <Divider/>

      <H2 id="pages-router">Pages Router setup</H2>
      <P>For the Pages Router the setup goes in <InlineCode>_app.tsx</InlineCode>. No client boundary needed since everything in Pages Router is client-rendered by default.</P>
      <Code language="tsx" filename="pages/_app.tsx">{`import type { AppProps } from "next/app";
import "@monoset/tokens/monoset.css";
import { MonosetProvider } from "@monoset/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MonosetProvider defaultTheme="system">
      <Component {...pageProps} />
    </MonosetProvider>
  );
}`}</Code>

      <Divider/>

      <H2 id="server-components">Server Components</H2>
      <P>Most Monoset components use Radix UI primitives under the hood, which means they run client-side JavaScript. Any component that handles user interaction (Button, Switch, Tabs, Accordion, Slider, etc.) needs to be inside a <InlineCode>"use client"</InlineCode> boundary.</P>
      <P>Layout primitives like <InlineCode>Container</InlineCode>, <InlineCode>Stack</InlineCode>, and <InlineCode>Card</InlineCode> are plain HTML wrappers with no interactivity. You can render them in Server Components without a client boundary.</P>
      <Code language="tsx" filename="app/dashboard/page.tsx">{`// This is a Server Component (no "use client")
import { Container, Stack, Card, CardContent } from "@monoset/react";
import { DashboardControls } from "./controls"; // client component

export default function DashboardPage() {
  return (
    <Container size="lg">
      <Stack gap={24}>
        <Card>
          <CardContent>
            <h2>Overview</h2>
            <p>Server-rendered content here.</p>
          </CardContent>
        </Card>
        <DashboardControls />
      </Stack>
    </Container>
  );
}`}</Code>

      <Divider/>

      <H2 id="remix">With Remix</H2>
      <P>Remix uses a similar pattern. Import the CSS in your root route and wrap the <InlineCode>Outlet</InlineCode> with the provider.</P>
      <Code language="tsx" filename="app/root.tsx">{`import "@monoset/tokens/monoset.css";
import { MonosetProvider } from "@monoset/react";
import {
  Links, Meta, Outlet, Scripts, ScrollRestoration,
} from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MonosetProvider defaultTheme="system">
          <Outlet />
        </MonosetProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}`}</Code>
    </div>
  );
}

function PageMcpGuide() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>MCP server</H1>
      <Lead>Give your AI coding agent direct access to Monoset's components, tokens, and documentation. No browser tabs, no hallucinated props. The agent knows what's available and writes correct code the first time.</Lead>

      <H2 id="what-is-mcp">What this does</H2>
      <P>MCP (Model Context Protocol) is a standard way for AI tools to talk to external systems. Monoset's MCP server exposes five tools your agent can call:</P>

      <div style={{ display:"flex", flexDirection:"column", gap:0, marginBottom:24,
        border:"1px solid var(--border-subtle)", borderRadius:10, overflow:"hidden" }}>
        {[
          { name:"list_components", desc:"Returns every component in @monoset/react with a one-line description." },
          { name:"get_component", desc:"Look up a specific component: import path, props, usage example, and docs link." },
          { name:"list_tokens", desc:"Returns all design tokens: colors, fonts, spacing, radii, shadows, motion values." },
          { name:"get_token", desc:"Look up a specific token by name, like color.mono.600 or spacing.4." },
          { name:"search_docs", desc:"Full-text search across the entire docs site. Returns deep links to the right section." },
        ].map((tool, i, arr) => (
          <div key={tool.name} style={{ padding:"12px 18px", display:"flex", gap:12, alignItems:"flex-start",
            borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
            <code style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--fg1)", background:"var(--bg-muted)",
              padding:"2px 8px", borderRadius:4, whiteSpace:"nowrap", flexShrink:0 }}>{tool.name}</code>
            <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.5 }}>{tool.desc}</div>
          </div>
        ))}
      </div>

      <H2 id="install-mcp">Install</H2>
      <Code filename="terminal">{`npm install -g @monoset/mcp-server`}</Code>

      <H2 id="claude-code">Claude Code</H2>
      <P>Claude Code picks up MCP servers from your project settings or global config. Add Monoset to your project:</P>
      <Code filename="terminal">{`claude mcp add monoset -- monoset-mcp`}</Code>
      <P>That's it. On your next conversation, Claude Code can query Monoset directly. Try asking it to "add a sortable user table with status badges" and watch it pull the right components.</P>

      <H2 id="claude-desktop">Claude Desktop</H2>
      <P>Add this to your Claude Desktop config file:</P>
      <Code filename="~/Library/Application Support/Claude/claude_desktop_config.json">{`{
  "mcpServers": {
    "monoset": {
      "command": "monoset-mcp"
    }
  }
}`}</Code>
      <P>Restart Claude Desktop. The Monoset tools appear in the tools panel.</P>

      <H2 id="cursor">Cursor and Windsurf</H2>
      <P>Both editors support MCP via the same stdio protocol. Add a <InlineCode>.cursor/mcp.json</InlineCode> to your project root:</P>
      <Code filename=".cursor/mcp.json">{`{
  "mcpServers": {
    "monoset": {
      "command": "monoset-mcp"
    }
  }
}`}</Code>

      <Divider/>

      <H2 id="what-it-looks-like">What it looks like in practice</H2>
      <P>When your agent has the MCP server connected, prompts like these just work:</P>

      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
        {[
          "Add a data table with sortable columns, row selection, and avatar + name in the first column",
          "Build a settings form with tabs for Profile, Notifications, and Security",
          "What spacing token should I use for 16px gap?",
          "Show me how to set up dark mode with ThemeProvider",
        ].map(prompt => (
          <div key={prompt} style={{ padding:"10px 14px", background:"var(--bg-subtle)", borderRadius:6,
            fontSize:12, color:"var(--fg2)", lineHeight:1.5, fontFamily:"var(--font-mono)",
            border:"1px solid var(--border-subtle)" }}>
            {prompt}
          </div>
        ))}
      </div>

      <P>The agent calls <InlineCode>list_components</InlineCode> to see what's available, <InlineCode>get_component</InlineCode> to get the exact props and import paths, and <InlineCode>search_docs</InlineCode> to find relevant guides. No guessing, no hallucination.</P>

      <H2 id="why">Why this matters</H2>
      <P>Most design systems expect you to read their docs in a browser and translate what you see into code. That workflow breaks the moment you're using an AI coding agent, because the agent can't see your browser. It guesses at prop names, invents components that don't exist, and uses APIs from the wrong version.</P>
      <P>The MCP server closes that gap. Your agent has the same knowledge a human developer gets from the docs site, but structured as data it can act on immediately. The result: fewer corrections, fewer hallucinations, faster builds.</P>

      <H2 id="combine-with-llm">Combine with LLM naming</H2>
      <P>The MCP server pairs well with <InlineCode>data-ms</InlineCode> attributes from the LLM naming guide. When your components carry stable semantic names and your agent understands the full component API, you get a workflow where the AI can both build new UI and modify existing UI by targeting named regions. The selectors survive redesigns, and the agent always knows what props are available.</P>
    </div>
  );
}

function PageSheet() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Sheet</H1>
      <Lead>A slide-over panel that enters from any edge. Built on Radix Dialog, so you get focus trapping, scroll locking, and accessible dismiss for free.</Lead>

      <H2 id="basic">Basic sheet</H2>
      <P>Use <InlineCode>Sheet</InlineCode> as the root, <InlineCode>SheetTrigger</InlineCode> to open it, and <InlineCode>SheetContent</InlineCode> for the panel. The <InlineCode>side</InlineCode> prop controls which edge it slides from.</P>
      <Code language="jsx">{`import { Sheet, SheetTrigger, SheetContent, SheetClose, Button } from "@monoset/react";

<Sheet>
  <SheetTrigger asChild>
    <Button>Open filters</Button>
  </SheetTrigger>
  <SheetContent title="Filters" description="Narrow down your results." side="right">
    <p>Filter controls go here.</p>
    <SheetClose asChild>
      <Button variant="secondary">Done</Button>
    </SheetClose>
  </SheetContent>
</Sheet>`}</Code>

      <H2 id="sides">All four sides</H2>
      <P>Pass <InlineCode>side="left"</InlineCode>, <InlineCode>"right"</InlineCode>, <InlineCode>"top"</InlineCode>, or <InlineCode>"bottom"</InlineCode>. Left and right panels span the full height; top and bottom span the full width.</P>
      <Code language="jsx">{`<SheetContent side="left" size={320}>
  Navigation drawer
</SheetContent>

<SheetContent side="bottom" size="50vh">
  Mobile action sheet
</SheetContent>`}</Code>

      <H2 id="size">Custom size</H2>
      <P>The <InlineCode>size</InlineCode> prop sets the panel width (for left/right) or height (for top/bottom). Accepts a number (pixels) or any CSS length string.</P>
      <Code language="jsx">{`<SheetContent side="right" size={480}>
  Wide detail panel
</SheetContent>

<SheetContent side="bottom" size="60vh">
  Tall bottom sheet
</SheetContent>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"side",        type:'"left" | "right" | "top" | "bottom"', default:'"right"', desc:"Which edge the panel enters from." },
        { name:"size",        type:"string | number", default:"380",      desc:"Panel width (left/right) or height (top/bottom)." },
        { name:"title",       type:"ReactNode",       default:"—",        desc:"Optional title rendered in the header." },
        { name:"description", type:"ReactNode",       default:"—",        desc:"Optional description below the title." },
        { name:"className",   type:"string",          default:"—",        desc:"Appended to the panel element." },
      ]}/>

      <H2 id="patterns">Common patterns</H2>

      <H3>Mobile navigation drawer</H3>
      <Code language="jsx">{`<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" aria-label="Menu">☰</Button>
  </SheetTrigger>
  <SheetContent side="left" size={280} title="Navigation">
    <nav>
      <a href="/dashboard">Dashboard</a>
      <a href="/settings">Settings</a>
    </nav>
  </SheetContent>
</Sheet>`}</Code>

      <H3>Detail panel</H3>
      <Code language="jsx">{`function UserRow({ user }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>{user.name}</button>
      </SheetTrigger>
      <SheetContent side="right" size={420} title={user.name} description={user.email}>
        <Stack gap={4}>
          <Card>Account details</Card>
          <Card>Activity log</Card>
        </Stack>
      </SheetContent>
    </Sheet>
  );
}`}</Code>
    </div>
  );
}

function PageCommand() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Command palette</H1>
      <Lead>A searchable command menu with keyboard navigation. Built on Radix Dialog, styled to match the rest of Monoset. No extra dependencies.</Lead>

      <H2 id="basic">Basic usage</H2>
      <P>Pass an array of items, control the open state, and handle selection via <InlineCode>onSelect</InlineCode> on each item.</P>
      <Code language="jsx">{`import { CommandPalette, Button } from "@monoset/react";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  const items = [
    { id: "home",     label: "Go to Home",     onSelect: () => navigate("/") },
    { id: "settings", label: "Open Settings",  onSelect: () => navigate("/settings") },
    { id: "theme",    label: "Toggle theme",   onSelect: () => toggleTheme() },
    { id: "logout",   label: "Log out",        onSelect: () => logout() },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open commands</Button>
      <CommandPalette open={open} onOpenChange={setOpen} items={items} />
    </>
  );
}`}</Code>

      <H2 id="groups">Grouped items</H2>
      <P>Pass an array of groups instead of a flat list. Each group gets an optional heading.</P>
      <Code language="jsx">{`const items = [
  {
    heading: "Navigation",
    items: [
      { id: "home",     label: "Home",     onSelect: () => navigate("/") },
      { id: "projects", label: "Projects", onSelect: () => navigate("/projects") },
    ],
  },
  {
    heading: "Actions",
    items: [
      { id: "new",    label: "New project",  onSelect: () => createProject() },
      { id: "theme",  label: "Toggle theme", onSelect: () => toggleTheme() },
    ],
  },
];

<CommandPalette open={open} onOpenChange={setOpen} items={items} />`}</Code>

      <H2 id="keyboard">Keyboard shortcut</H2>
      <P>The palette itself does not register a global keyboard shortcut. Wire it up yourself so you control when it activates.</P>
      <Code language="jsx">{`useEffect(() => {
  const onKey = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen(true);
    }
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);`}</Code>

      <H2 id="filter">Custom filter</H2>
      <P>By default the palette matches against <InlineCode>label</InlineCode>, <InlineCode>description</InlineCode>, and <InlineCode>keywords</InlineCode>. Pass a custom <InlineCode>filter</InlineCode> function to change this.</P>
      <Code language="jsx">{`<CommandPalette
  open={open}
  onOpenChange={setOpen}
  items={items}
  filter={(query, item) => item.label.toLowerCase().startsWith(query.toLowerCase())}
/>`}</Code>

      <H2 id="footer">Footer</H2>
      <P>Pass a <InlineCode>footer</InlineCode> prop to render keyboard hints or branding below the list.</P>
      <Code language="jsx">{`<CommandPalette
  open={open}
  onOpenChange={setOpen}
  items={items}
  footer={
    <>
      <span>↑↓ navigate</span>
      <span>↵ select</span>
      <span>esc close</span>
    </>
  }
/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"open",          type:"boolean",                           default:"—",           desc:"Controlled open state." },
        { name:"onOpenChange",  type:"(open: boolean) => void",          default:"—",           desc:"Called when the palette wants to open or close." },
        { name:"items",         type:"CommandItem[] | CommandGroup[]",    default:"[]",          desc:"Flat or grouped list of commands." },
        { name:"placeholder",   type:"string",                           default:'"Search..."', desc:"Input placeholder text." },
        { name:"emptyMessage",  type:"string",                           default:'"No results."', desc:"Shown when nothing matches." },
        { name:"filter",        type:"(query, item) => boolean",         default:"built-in",    desc:"Custom filter function." },
        { name:"footer",        type:"ReactNode",                        default:"—",           desc:"Content rendered below the list." },
      ]}/>

      <H2 id="item-shape">CommandItem shape</H2>
      <PropsTable rows={[
        { name:"id",          type:"string",     default:"—",  desc:"Unique identifier." },
        { name:"label",       type:"string",     default:"—",  desc:"Display label." },
        { name:"description", type:"string",     default:"—",  desc:"Secondary text below the label." },
        { name:"icon",        type:"ReactNode",  default:"—",  desc:"Leading icon." },
        { name:"onSelect",    type:"() => void", default:"—",  desc:"Called when the item is picked." },
        { name:"keywords",    type:"string[]",   default:"—",  desc:"Extra search terms (not displayed)." },
        { name:"disabled",    type:"boolean",    default:"false", desc:"Prevents selection." },
      ]}/>
    </div>
  );
}

function PageCli() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Tools</div>
      <H1>CLI</H1>
      <Lead>Add Monoset components to your project as source files. Keep full ownership of the code, customize whatever you want, and stay up to date by re-running the command.</Lead>

      <H2 id="install">Install</H2>
      <Code language="bash" filename="terminal">{`npm install -g @monoset/cli`}</Code>
      <P>Or use it without installing via <InlineCode>npx</InlineCode>:</P>
      <Code language="bash" filename="terminal">{`npx @monoset/cli add button card`}</Code>

      <H2 id="init">Initialize a project</H2>
      <P>Run <InlineCode>monoset init</InlineCode> to scaffold the CSS entry point and get instructions for installing the token and component packages.</P>
      <Code language="bash" filename="terminal">{`monoset init`}</Code>
      <P>This creates a <InlineCode>src/monoset.css</InlineCode> file that imports the token and component stylesheets. Then install the packages:</P>
      <Code language="bash" filename="terminal">{`npm install @monoset/tokens @monoset/react`}</Code>

      <H2 id="add">Add components</H2>
      <P>Copy component source files directly into your project. The CLI resolves internal dependencies (like the <InlineCode>cx</InlineCode> utility) automatically.</P>
      <Code language="bash" filename="terminal">{`monoset add button card input dialog`}</Code>
      <P>Files land in <InlineCode>src/components/monoset/</InlineCode> by default. The CLI also extracts the relevant CSS from the component stylesheet and writes a single <InlineCode>monoset.css</InlineCode> file.</P>

      <H2 id="add-all">Add everything</H2>
      <Code language="bash" filename="terminal">{`monoset add --all`}</Code>

      <H2 id="list">List available components</H2>
      <Code language="bash" filename="terminal">{`monoset list`}</Code>

      <H2 id="options">Options</H2>
      <PropsTable rows={[
        { name:"--out <dir>",   type:"flag", default:"src/components/monoset", desc:"Where to write the files." },
        { name:"--overwrite",   type:"flag", default:"false",                  desc:"Replace existing files." },
        { name:"--all",         type:"flag", default:"false",                  desc:"Add every component." },
      ]}/>

      <H2 id="how">How it works</H2>
      <P>The CLI fetches component source directly from the GitHub repo. Each component is a single <InlineCode>.tsx</InlineCode> file that wraps a Radix primitive. The CSS is extracted from the monorepo stylesheet by matching named section banners.</P>
      <P>Because you own the source files, you can rename props, strip features you don't need, or change the styling. When Monoset ships updates, run the command again with <InlineCode>--overwrite</InlineCode> and diff the result.</P>

      <H2 id="vs-npm">CLI vs npm package</H2>
      <P>Both approaches work. Use <InlineCode>@monoset/react</InlineCode> from npm if you want a standard dependency you can upgrade with a version bump. Use the CLI if you want full source ownership and the ability to modify components in place.</P>
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
  textarea:     PageTextarea,
  select:       PageSelect,
  layout:       PageLayout,
  sheet:        PageSheet,
  command:      PageCommand,
  cli:          PageCli,
  llm:          PageLLM,
  playground:   PagePlayground,
  theming:      PageThemeGuide,
  settings:     PageSettingsGuide,
  a11y:         PageA11yGuide,
  nextjs:       PageNextjsGuide,
  mcp:          PageMcpGuide,
  dashboard:    PageDashboardGuide,
  datatable:    PageDataTableGuide,
};

export default function DocsContent({ page, setPage }) {
  const PageComp = PAGES[page] || PageIntroduction;
  return <PageComp setPage={setPage}/>;
}
