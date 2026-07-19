/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Button, Spinner } from '@monoset/react';
import { Code, InlineCode, H1, H2, H3, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/spinner.css';
import '@monoset/react/styles/button.css';

function PlatformPreview({ web, bg }) {
  return <Preview bg={bg}>{web}</Preview>;
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
      <PlatformPreview
        bg="var(--bg)"
        native="SpinnerDemo"
        web={
          <div style={{ display:"flex", gap:24, alignItems:"flex-end" }}>
            {[14, 20, 28, 40].map(s => (
              <div key={s} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                <span style={{ display:"flex", height:40, alignItems:"center" }}><Spinner size={s}/></span>
                <span style={{ fontSize:11, color:"var(--fg3)", fontFamily:"var(--font-mono)" }}>{s}px</span>
              </div>
            ))}
          </div>
        }
      />
      <Code language="jsx">{`<Spinner size={14}/>
<Spinner size={20}/>
<Spinner size={28}/>
<Spinner size={40}/>`}</Code>

      <H2 id="inside-button">Inside a button</H2>
      <P>Put it in a button while the request is in flight. Leave the label in place; swapping "Save" for the spinner makes the button width jump and the eye catches it.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <Button variant="primary" disabled={saving} onClick={handleSave}>
            {saving && <Spinner size={14}/>} {saving ? "Saving..." : "Save changes"}
          </Button>
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
          <Spinner size={14}/> Loading results...
        </div>
      </Preview>
      <Code language="jsx">{`<div style={{ display:"flex", alignItems:"center", gap:8 }}>
  <Spinner size={14}/> Loading results…
</div>`}</Code>

      <H3>Props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
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
  spinner: PageSpinner,
};
