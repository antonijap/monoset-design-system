/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Toggle, ToggleGroup, ToggleGroupItem } from '@monoset/react';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Code, InlineCode, H1, H2, H3, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/toggle.css';


function PageToggle() {
  const [view, setView] = useState("grid");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [align, setAlign] = useState("center");
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Toggle group</H1>
      <Lead>A segmented control. Use it when the options are mutually exclusive and you can fit them on one line. Past four options it gets cramped; a Select does that job better.</Lead>

      <H2 id="default">Default</H2>
      <Preview bg="var(--bg)">
        <ToggleGroup type="single" value={view} onValueChange={setView} aria-label="View">
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
          <ToggleGroupItem value="list">List</ToggleGroupItem>
          <ToggleGroupItem value="kanban">Kanban</ToggleGroupItem>
        </ToggleGroup>
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
          <Toggle pressed={bold} onPressedChange={setBold} aria-label="Bold" style={{ fontWeight:700 }}>B</Toggle>
          <Toggle pressed={italic} onPressedChange={setItalic} aria-label="Italic" style={{ fontStyle:"italic" }}>I</Toggle>
        </div>
      </Preview>
      <Code language="jsx">{`<Toggle pressed={bold} onPressedChange={setBold}>B</Toggle>
<Toggle pressed={italic} onPressedChange={setItalic}>I</Toggle>`}</Code>

      <H2 id="with-icons">With icons</H2>
      <P>Toggle groups work well for toolbar-style controls. Pass icon elements as children for compact controls like alignment or view switchers.</P>
      <Preview bg="var(--bg)">
        <ToggleGroup type="single" value={align} onValueChange={setAlign} aria-label="Text alignment">
          <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft size={14}/></ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter size={14}/></ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right"><AlignRight size={14}/></ToggleGroupItem>
        </ToggleGroup>
      </Preview>
      <Code language="jsx">{`<ToggleGroup type="single" value={align} onValueChange={setAlign}>
  <ToggleGroupItem value="left"><AlignLeft size={14}/></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter size={14}/></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight size={14}/></ToggleGroupItem>
</ToggleGroup>`}</Code>

      <H3>Props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
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
  toggle: PageToggle,
};
