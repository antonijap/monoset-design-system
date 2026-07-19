/* eslint-disable react-refresh/only-export-components */
import { Avatar } from '@monoset/react';
import { Code, InlineCode, H1, H2, H3, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/avatar.css';

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
          {["sm", "md", "lg"].map(size => (
            <div key={size} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
              <Avatar name="Ada Turing" size={size} />
              <span style={{ fontSize:11, color:"var(--fg3)", fontFamily:"var(--font-mono)" }}>{size}</span>
            </div>
          ))}
        </div>
      </Preview>
      <Code>{`<Avatar name="Ada Turing" size="sm"/>
<Avatar name="Ada Turing" size="md"/>
<Avatar name="Ada Turing" size="lg"/>`}</Code>

      <H2 id="fallback">Image with initials fallback</H2>
      <P>When <InlineCode>src</InlineCode> is set, the image renders. If it fails to load (broken URL, 404), the initials show instead. No layout shift either way.</P>
      <Preview>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <Avatar name="Ada Turing" src="/missing-avatar.jpg" />
          <Avatar name="Grace Hopper" />
          <Avatar name="Linus Bell" />
        </div>
      </Preview>
      <Code>{`<Avatar name="Ada Turing" src="/team/ada.jpg" alt="Portrait of Ada Turing"/>
<Avatar name="Grace Hopper"/>  {/* No image, derives GH */}`}</Code>

      <H2 id="stack">Stacked group</H2>
      <P>Overlap avatars with a negative margin. The overflow chip at the end shows the remaining count.</P>
      <Preview>
        <div style={{ display:"flex" }}>
          {["Ada Turing", "Grace Hopper", "Linus Bell"].map((name, index) => (
            <Avatar key={name} name={name} style={{ border:"2px solid var(--bg)", marginLeft:index===0 ? 0 : -8 }} />
          ))}
          <Avatar name="5 additional team members" initials="+5" style={{ border:"2px solid var(--bg)", marginLeft:-8 }} />
        </div>
      </Preview>
      <Code>{`<div style={{ display:"flex" }}>
  {team.map((user, i) => (
    <Avatar key={user.id} name={user.name}
      style={{ marginLeft: i > 0 ? -8 : 0 }}/>
  ))}
  {overflow > 0 && (
    <Avatar name={\`\${overflow} additional team members\`}
      initials={\`+\${overflow}\`}/>
  )}
</div>`}</Code>

      <H2 id="in-list">In a list</H2>
      <P>A common pattern: avatar next to a name and subtitle in a compact row.</P>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:320, display:"flex", flexDirection:"column", gap:2 }}>
          {[["Ada Turing","Admin"],["Grace Hopper","Member"],["Linus Bell","Viewer"]].map(([name,role])=>(
            <div key={name} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:6 }}>
              <Avatar name={name} size="sm" />
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
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["name","string","--","Required unless decorative. Also supplies fallback initials"],
              ["size",'"sm" | "md" | "lg"','"md"',"Diameter"],
              ["initials","string","--","Optional fallback override"],
              ["src","string","--","Image URL"],
              ["alt","string","name","Optional image description used for the accessible name"],
              ["decorative","boolean","false","Hides the avatar from accessibility APIs"],
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
  avatars: PageAvatars,
};
