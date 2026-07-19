/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent, ToggleGroup, ToggleGroupItem } from '@monoset/react';
import { Code, InlineCode, H1, H2, H3, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/toggle.css';
import '@monoset/react/styles/tabs.css';


function PageTabs() {
  const [tab, setTab] = useState("overview");
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Tabs</H1>
      <Lead>Underline tabs for switching between related panels. Use them inside one view, not as a replacement for links between pages.</Lead>

      <H2 id="underline">Underline tabs</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%" }}>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview"><div style={{ padding:"14px 0" }}>Overview content</div></TabsContent>
            <TabsContent value="activity"><div style={{ padding:"14px 0" }}>Activity content</div></TabsContent>
            <TabsContent value="members"><div style={{ padding:"14px 0" }}>Members content</div></TabsContent>
            <TabsContent value="settings"><div style={{ padding:"14px 0" }}>Settings content</div></TabsContent>
          </Tabs>
        </div>
      </Preview>
      <Code language="jsx">{`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="members">Members</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
</Tabs>`}</Code>

      <H2 id="segmented">Segmented choices</H2>
      <P><InlineCode>Tabs</InlineCode> ships one underline treatment. Use <InlineCode>ToggleGroup</InlineCode> for a compact segmented choice such as a time range.</P>
      <Preview>
        <ToggleGroup type="single" defaultValue="week" aria-label="Report range">
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
          <ToggleGroupItem value="year">Year</ToggleGroupItem>
        </ToggleGroup>
      </Preview>

      <H2 id="controlled">Controlled</H2>
      <P>For controlled usage, pass <InlineCode>value</InlineCode> and <InlineCode>onValueChange</InlineCode> instead of <InlineCode>defaultValue</InlineCode>.</P>
      <Code language="jsx">{`const [tab, setTab] = useState("overview");

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <Card>Overview content</Card>
  </TabsContent>
  <TabsContent value="billing">
    <Card>Billing content</Card>
  </TabsContent>
</Tabs>`}</Code>

      <H3>Props</H3>
      <P><InlineCode>Tabs</InlineCode> wraps Radix UI Tabs. All Radix props are forwarded.</P>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["defaultValue","string","--","Initially active tab (uncontrolled)"],
              ["value","string","--","Active tab (controlled)"],
              ["onValueChange","(value: string) => void","--","Called when the active tab changes"],
              ["children","ReactNode","--","TabsList + TabsContent elements"]].map(([p,t,d,desc],i,arr)=>(
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
  tabs: PageTabs,
};
