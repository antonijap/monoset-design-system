/* eslint-disable react-refresh/only-export-components */
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/collapsible.css';


function PageCollapsible() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Collapsible</H1>
      <Lead>A single open-or-closed disclosure. One trigger, one panel. Reach for Accordion when you have a set of sections; reach for Collapsible when you have one optional region, like an advanced-settings block.</Lead>

      <H2 id="example">Example</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:380 }}>
          <Collapsible defaultOpen>
            <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
            <CollapsibleContent>
              Tune cache size, retry limits, and request timeouts. Most teams never touch these. The defaults are tuned for typical workloads.
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Preview>
      <Code language="jsx">{`import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@monoset/react";

<Collapsible>
  <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
  <CollapsibleContent>
    Tune cache size, retry limits, and request timeouts.
  </CollapsibleContent>
</Collapsible>`}</Code>

      <H2 id="api">API</H2>
      <P>The root takes Radix Collapsible props: <InlineCode>open</InlineCode>, <InlineCode>defaultOpen</InlineCode>, <InlineCode>onOpenChange</InlineCode>, <InlineCode>disabled</InlineCode>.</P>
      <PropsTable rows={[
        { name:"hideChevron", type:"boolean", default:"false", desc:"Hide the built-in chevron on the trigger." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  collapsible: PageCollapsible,
};
