/* eslint-disable react-refresh/only-export-components */
import { Button, Alert, useToast } from '@monoset/react';
import { Code, InlineCode, H1, H2, H3, Lead, Divider, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/alert.css';
import '@monoset/react/styles/button.css';

function PageAlerts() {
  const { toast } = useToast();
  const addToast = () => toast({
    title: "Changes saved",
    description: "Your profile is up to date.",
    kind: "success",
    action: "Undo",
    actionAltText: "Undo the saved profile changes",
  });
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Alert &amp; Toast</H1>
      <Lead>Inline alerts sit in the layout and stay there until the problem is fixed. Toasts pop in, say their piece, and disappear. Both stay monotone. No red-green traffic light; the icon and the copy do the work.</Lead>

      <H2 id="alert">Inline alert</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:10 }}>
          <Alert title="Verify your email">We sent a link to ada@monoset.dev.</Alert>
          <Alert title="Usage near limit" urgent>92% of monthly quota used.</Alert>
        </div>
      </Preview>

      <H2 id="toast">Toast</H2>
      <Preview>
        <Button onClick={addToast}>Trigger toast</Button>
      </Preview>
      <Code language="jsx">{`import { Button, useToast } from "@monoset/react";

function SaveButton() {
  const { toast } = useToast();

  return (
    <Button onClick={() => toast({
      title: "Changes saved",
      description: "Your profile is up to date.",
      kind: "success",
      action: "Undo",
      actionAltText: "Undo the saved profile changes",
    })}>
      Save profile
    </Button>
  );
}`}</Code>
      <H3>Alert props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["title","ReactNode","--","Bold heading line"],
              ["icon","ReactNode",'"i"',"Leading icon element"],
              ["urgent","boolean","false","Applies urgent styling"],
              ["children","ReactNode","--","Alert body text"],
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

      <Divider/>

      <H2 id="alert-code">Usage</H2>
      <Code language="jsx">{`import { Alert } from "@monoset/react";

{/* Inline alert */}
<Alert title="Verify your email">
  We sent a link to ada@monoset.dev.
</Alert>

{/* Urgent variant */}
<Alert title="Usage near limit" urgent>
  92% of monthly quota used.
</Alert>`}</Code>
    </div>
  );
}

export const PAGES = {
  alerts: PageAlerts,
};
