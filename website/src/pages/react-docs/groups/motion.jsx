/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_STANDARD, EASE_EMPHASIS, EASE_EXIT, DUR, fadeUp, hoverLift, pressDown } from '@monoset/react/motion';
import { Code, InlineCode, H1, H2, P, Lead, Divider, Preview } from '../../../ui/docs.jsx';

function PageMotion() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
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

      <Divider/>
      <P>When CSS transitions hit their limit, like FLIP layout animations or anything that needs to interrupt itself mid-play, reach for Framer Motion. Same rules as the CSS tokens: short durations, one curve, no springs.</P>

      <H2 id="install">Install</H2>
      <Code language="bash" filename="terminal">npm install @monoset/react @monoset/tokens framer-motion</Code>
      <div style={{ height:16 }}/>

      <H2 id="presets">Monoset motion presets</H2>
      <P>Import React motion helpers from the motion subpath. They are kept out of the package root so static component imports do not pull them in.</P>
      <Code language="jsx" filename="MotionExample.jsx">{`import { motion } from "framer-motion";
import {
  DUR,
  EASE_EMPHASIS,
  fadeUp,
  hoverLift,
  pressDown,
  Reveal,
} from "@monoset/react/motion";

<Reveal variant={fadeUp}>Welcome.</Reveal>`}</Code>
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
            <button key={t} type="button" onClick={() => setTab(i)}
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
      <P><InlineCode>MonosetProvider</InlineCode> configures Framer Motion with <InlineCode>reducedMotion="user"</InlineCode>, and Monoset components use targeted CSS media queries. Add reduced-motion behavior to animation owned by your application.</P>
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

export const PAGES = {
  motion: PageMotion,
};
