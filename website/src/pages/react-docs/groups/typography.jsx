/* eslint-disable react-refresh/only-export-components */
import { Code, H1, H2, Lead } from '../../../ui/docs.jsx';

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

export const PAGES = {
  typography: PageTypography,
};
