/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, P, Lead } from '../../../ui/docs.jsx';

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
                <td style={{ padding:"11px 14px" }}><InlineCode>{r.token}</InlineCode></td>
                <td style={{ padding:"11px 14px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:14, height:14, borderRadius:3, background:r.val,
                                  border:"1px solid var(--border-subtle)", flexShrink:0 }}/>
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--fg3)" }}>{r.val}</span>
                  </div>
                </td>
                <td style={{ padding:"11px 14px", color:"var(--fg3)" }}>{r.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const PAGES = {
  colors: PageColors,
};
