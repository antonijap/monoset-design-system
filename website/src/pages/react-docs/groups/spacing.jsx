/* eslint-disable react-refresh/only-export-components */
import { InlineCode, H1, H2, P, Lead } from '../../../ui/docs.jsx';

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
        {[[0,"--radius-none","0"],[2,"--radius-xs","xs"],[4,"--radius-sm","sm"],[6,"--radius-md","md ·"],[10,"--radius-lg","lg"],[14,"--radius-xl","xl"]].map(([r]) => (
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

export const PAGES = {
  spacing: PageSpacing,
};
