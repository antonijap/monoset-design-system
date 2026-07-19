/* eslint-disable react-refresh/only-export-components */
import { Icon, Code, H1, Lead } from '../../../ui/docs.jsx';

function PageIntroduction({ setPage }) {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em",
                    textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Getting Started</div>
      <H1>Introduction</H1>
      <Lead>Monoset is a neutral token system and React component library. It gives you the common UI pieces while leaving the product decisions to you.</Lead>
      <Code filename="terminal">{`npm install @monoset/react @monoset/tokens`}</Code>
      <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:20 }}>
        {[
          { title:"Installation", desc:"Add the packages and CSS to an existing React app.", page:"installation" },
          { title:"Browse components", desc:"Start with Button, then browse the rest of the React library.", page:"buttons" },
        ].map(link => (
          <a key={link.page} href={`/${link.page}`} onClick={(event) => { event.preventDefault(); setPage(link.page); }}
            style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12,
              padding:"10px 12px", border:"1px solid var(--border-subtle)", borderRadius:6,
              color:"inherit", textDecoration:"none", transition:"background 0.12s" }}
            onMouseEnter={e => e.currentTarget.style.background="var(--bg-muted)"}
            onMouseLeave={e => e.currentTarget.style.background="transparent"}>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:"var(--fg1)", marginBottom:2 }}>{link.title}</div>
              <div style={{ fontSize:12, color:"var(--fg3)" }}>{link.desc}</div>
            </div>
            <Icon name="chevronRight" size={14} style={{ color:"var(--fg4)", flexShrink:0 }}/>
          </a>
        ))}
      </div>
    </div>
  );
}

export const PAGES = {
  introduction: PageIntroduction,
};
