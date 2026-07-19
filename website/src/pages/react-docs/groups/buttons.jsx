/* eslint-disable react-refresh/only-export-components */
import { Button } from '@monoset/react';
import { Code, InlineCode, H1, H2, H3, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/button.css';

function PlatformPreview({ web, bg }) {
  return <Preview bg={bg}>{web}</Preview>;
}

function PageButtons() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Button</H1>
      <Lead>Four variants across three sizes. Keep labels short (two or three words) and write them in sentence case. All-caps looks shouty in a monotone system.</Lead>

      <H2 id="variants">Variants</H2>
      <PlatformPreview
        web={
          <>
            <Button variant="primary">Save changes</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="ghost">Skip</Button>
            <Button variant="danger">Delete</Button>
          </>
        }
        native="ButtonDemo"
      />
      <Code>{`<Button variant="primary">Save changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Skip</Button>
<Button variant="danger">Delete</Button>`}</Code>

      <H2 id="sizes">Sizes</H2>
      <Preview>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary">Default</Button>
        <Button variant="primary" size="lg">Large</Button>
      </Preview>
      <Code>{`<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>`}</Code>

      <H2 id="states">States</H2>
      <Preview>
        <Button variant="primary">Default</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="primary" loading>Saving</Button>
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
            {[["variant",'"primary" | "secondary" | "ghost" | "danger"','"secondary"',"Visual style"],
              ["size",'"sm" | "md" | "lg"','"md"',"Control size"],
              ["disabled","boolean","false","Prevents interaction"],
              ["loading","boolean","false","Shows a spinner and disables the button"],
              ["leadingIcon","ReactNode","–","Content before the label"],
              ["trailingIcon","ReactNode","–","Content after the label"],
              ["onClick","() => void","–","Click handler"]].map(([p,t,d,desc],i,arr)=>(
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
  buttons: PageButtons,
};
