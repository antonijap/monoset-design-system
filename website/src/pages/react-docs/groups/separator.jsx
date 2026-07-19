/* eslint-disable react-refresh/only-export-components */
import { Separator } from '@monoset/react';
import { Code, H1, H2, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/separator.css';


function PageSeparator() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Separator</H1>
      <Lead>A horizontal or vertical hairline. Use it sparingly. Most layouts don't need them; spacing alone usually carries the weight. Reach for one when two regions need a clear boundary.</Lead>

      <H2 id="horizontal">Horizontal</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:360 }}>
          <div style={{ fontSize:13, color:"var(--fg1)", fontWeight:500 }}>Account</div>
          <div style={{ fontSize:12, color:"var(--fg3)", marginTop:2 }}>Manage profile and billing</div>
          <Separator style={{ margin:"14px 0" }}/>
          <div style={{ fontSize:13, color:"var(--fg1)", fontWeight:500 }}>Notifications</div>
          <div style={{ fontSize:12, color:"var(--fg3)", marginTop:2 }}>Email and push preferences</div>
        </div>
      </Preview>
      <Code language="jsx">{`import { Separator } from "@monoset/react";

<Separator/>
<Separator orientation="vertical"/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"orientation", type:'"horizontal" | "vertical"', default:'"horizontal"', desc:"Direction of the line." },
        { name:"decorative",  type:"boolean",                   default:"true",         desc:"Hide from screen readers when purely visual." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  separator: PageSeparator,
};
