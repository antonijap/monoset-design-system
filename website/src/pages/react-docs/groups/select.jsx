/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Field, Select, SelectTrigger, SelectContent, SelectItem, Kbd } from '@monoset/react';
import { Code, InlineCode, H1, H2, H3, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/select.css';
import '@monoset/react/styles/kbd.css';
import '@monoset/react/styles/menu.css';
import '@monoset/react/styles/field.css';

function KbdKey({ children, active = false }) {
  return (
    <Kbd style={{
      background: active ? "var(--accent)" : undefined,
      color: active ? "var(--accent-fg)" : undefined,
      borderColor: active ? "var(--accent)" : undefined,
      transform: active ? "translateY(1px)" : undefined,
    }}>{children}</Kbd>
  );
}

function PageSelect() {
  const [value, setValue] = useState("viewer");
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Select</H1>
      <Lead>A list for choosing one option. It works with keyboard and screen reader input. The selected item is marked, and long lists stay inside the viewport.</Lead>

      <H2 id="default-select">Default</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:220 }}>
          <Field label="Role">
            <Select value={value} onValueChange={setValue}>
              <Field.Control>
                {props => <SelectTrigger {...props} placeholder="Choose a role"/>}
              </Field.Control>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Preview>
      <Code language="jsx">{`<Field label="Role">
  <Select value={role} onValueChange={setRole}>
    <Field.Control>
      {props => <SelectTrigger {...props} placeholder="Choose a role"/>}
    </Field.Control>
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="member">Member</SelectItem>
      <SelectItem value="viewer">Viewer</SelectItem>
      <SelectItem value="billing">Billing</SelectItem>
    </SelectContent>
  </Select>
</Field>`}</Code>

      <H2 id="with-placeholder">With placeholder</H2>
      <P>The <InlineCode>placeholder</InlineCode> prop on <InlineCode>SelectTrigger</InlineCode> shows when no value is selected.</P>
      <Code language="jsx">{`<Select>
  <SelectTrigger placeholder="Select a country"/>
  <SelectContent>
    <SelectItem value="us">United States</SelectItem>
    <SelectItem value="uk">United Kingdom</SelectItem>
    <SelectItem value="de">Germany</SelectItem>
  </SelectContent>
</Select>`}</Code>

      <H2 id="in-form">In a form</H2>
      <P><InlineCode>Field</InlineCode> works with native React state and any form library. Use <InlineCode>Field.Control</InlineCode> to pass its accessibility props to the select trigger.</P>
      <Code language="jsx">{`const [role, setRole] = useState("");

<form onSubmit={event => {
  event.preventDefault();
  onSave({ role });
}}>
  <Field label="Role" error={!role ? "Choose a role" : undefined}>
    <Select value={role} onValueChange={setRole}>
      <Field.Control>
        {props => <SelectTrigger {...props} placeholder="Choose a role"/>}
      </Field.Control>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="member">Member</SelectItem>
      </SelectContent>
    </Select>
  </Field>
  <Button type="submit">Save</Button>
</form>`}</Code>

      <H2 id="long-lists">Long lists</H2>
      <P><InlineCode>SelectContent</InlineCode> stays inside the available viewport. Scroll controls appear when the options do not fit, and the selected item keeps a visible check mark.</P>

      <H3>Props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Component","Prop","Type","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["Select","value","string","Selected value (controlled)"],
              ["Select","defaultValue","string","Initial value when uncontrolled"],
              ["Select","onValueChange","(v: string) => void","Called on selection change"],
              ["Select","name","string","Form field name"],
              ["Select","required","boolean","Marks the field as required"],
              ["SelectTrigger","placeholder","string","Placeholder when empty"],
              ["SelectContent","sideOffset","number","Distance from the trigger; defaults to 6"],
              ["SelectItem","value","string","Option value (required)"],
              ["SelectItem","disabled","boolean","Prevents selection"],
              ["SelectItem","children","ReactNode","Option label"]].map(([c,p,t,desc],i,arr)=>(
              <tr key={c+p} style={{ borderBottom:i<arr.length-1?"1px solid var(--border-subtle)":"none" }}>
                <td style={{ padding:"11px 14px" }}><InlineCode>{c}</InlineCode></td>
                <td style={{ padding:"11px 14px" }}><InlineCode>{p}</InlineCode></td>
                <td style={{ padding:"11px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg3)" }}>{t}</td>
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
  select: PageSelect,
};
