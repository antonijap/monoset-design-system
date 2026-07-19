/* eslint-disable react-refresh/only-export-components */
import { Badge } from '@monoset/react';
import { Code, InlineCode, H1, H2, H3, P, Lead, Preview } from '../../../ui/docs.jsx';
import { REACT_VERSION } from '../../../version.js';
import '@monoset/react/styles/badge.css';

function PageBadges() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Badge</H1>
      <Lead>Small labels for status, counts, and category tags. Three variants, all monotone, because a badge that screams louder than the thing it's on defeats the point.</Lead>

      <H2 id="variants-badge">Variants</H2>
      <Preview>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="solid">Solid</Badge>
      </Preview>
      <Code>{`<Badge variant="neutral">Neutral</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="solid">Solid</Badge>`}</Code>

      <H2 id="status-badge">Status labels</H2>
      <P>Keep status text explicit. Monoset does not assign meaning to color, so add a dot only as a second visual cue.</P>
      <Preview>
        {["Active", "Pending", "Failed", "Paused"].map(label => (
          <Badge key={label} variant="outline">{label}</Badge>
        ))}
      </Preview>
      <Code>{`<Badge variant="outline">Active</Badge>
<Badge variant="outline">Pending</Badge>
<Badge variant="outline">Failed</Badge>`}</Code>

      <H2 id="tags">Tags</H2>
      <P>Dismissible tags for filters, categories, or multi-select inputs.</P>
      <Preview>
        {["design","monotone",REACT_VERSION].map(t => (
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
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
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
                <td style={{ padding:"11px 14px" }}><InlineCode>{p}</InlineCode></td>
                <td style={{ padding:"11px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg3)" }}>{t}</td>
                <td style={{ padding:"11px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg4)" }}>{d}</td>
                <td style={{ padding:"11px 14px", color:"var(--fg3)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const PAGES = {
  badges: PageBadges,
};
