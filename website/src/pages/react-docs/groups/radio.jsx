/* eslint-disable react-refresh/only-export-components */
import { RadioGroup, Radio, Stack } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/choice-controls.css';
import '@monoset/react/styles/layout.css';

function PageRadio() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Radio group</H1>
      <Lead>Pick one from a few. If the list is longer than three or four options, use Select or Combobox instead.</Lead>

      <H2 id="basic">Basic radio group</H2>
      <Preview bg="var(--bg)">
        <RadioGroup defaultValue="card" aria-label="Payment method">
          <Stack gap={2}>
            <Radio value="card"   label="Credit card"/>
            <Radio value="bank"   label="Bank transfer"/>
            <Radio value="invoice" label="Invoice"/>
          </Stack>
        </RadioGroup>
      </Preview>
      <Code language="jsx">{`import { RadioGroup, Radio } from "@monoset/react";

<RadioGroup defaultValue="card" aria-label="Payment method">
  <Radio value="card"   label="Credit card"/>
  <Radio value="bank"   label="Bank transfer"/>
  <Radio value="invoice" label="Invoice"/>
</RadioGroup>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"value",         type:"string",                     default:"—",     desc:"Controlled selected value." },
        { name:"defaultValue",  type:"string",                     default:"—",     desc:"Uncontrolled default." },
        { name:"onValueChange", type:"(value: string) => void",    default:"—",     desc:"Called when selection changes." },
        { name:"disabled",      type:"boolean",                    default:"false", desc:"Disables every radio in the group." },
      ]}/>
      <P>Each <InlineCode>Radio</InlineCode> takes a <InlineCode>value</InlineCode> and a <InlineCode>label</InlineCode>. It can be disabled individually with <InlineCode>disabled</InlineCode>.</P>
    </div>
  );
}

export const PAGES = {
  radio: PageRadio,
};
