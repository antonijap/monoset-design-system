/* eslint-disable react-refresh/only-export-components */
import { Field, Input, Textarea } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/field.css';
import '@monoset/react/styles/input.css';

function PlatformPreview({ web, bg }) {
  return <Preview bg={bg}>{web}</Preview>;
}

function PageInputs() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Input</H1>
      <Lead>Text fields, textareas, selects. Wrap them in a <InlineCode>Field</InlineCode> to connect the label, description, and error state to the control.</Lead>

      <H2 id="field">Field</H2>
      <PlatformPreview
        bg="var(--bg)"
        native="InputDemo"
        web={
          <div style={{ width:280, display:"flex", flexDirection:"column", gap:24 }}>
            <Field label="Email" description="We'll send a confirmation.">
              <Input type="email" defaultValue="ada@monoset.dev" />
            </Field>
            <Field label="Password" error="At least 8 characters.">
              <Input type="password" defaultValue="••••••" />
            </Field>
          </div>
        }
      />
      <Code>{`<Field label="Email" description="We'll send a confirmation.">
  <Input type="email" placeholder="you@example.com"/>
</Field>

<Field label="Password" error="At least 8 characters.">
  <Input type="password"/>
</Field>`}</Code>

      <H2 id="states-input">States</H2>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", gap:10 }}>
          <Input aria-label="Default example" defaultValue="Default" />
          <Input aria-label="Disabled example" defaultValue="Disabled" disabled />
          <Input aria-label="Invalid example" defaultValue="Error" invalid />
        </div>
      </Preview>

      <H2 id="textarea">Textarea</H2>
      <P>Multi-line input, same styling and the same <InlineCode>Field</InlineCode> pattern. It accepts every native <InlineCode>textarea</InlineCode> attribute; <InlineCode>rows</InlineCode> defaults to 4.</P>
      <Preview bg="var(--bg)">
        <Field label="Description" description="Supports markdown formatting." style={{ width:"100%", maxWidth:400 }}>
          <Textarea defaultValue="A minimal, monotone design system for teams that want their product to look like their product." />
        </Field>
      </Preview>
      <Code language="jsx">{`<Field label="Description" description="Supports markdown formatting.">
  <Textarea rows={3} placeholder="Tell us more…"/>
</Field>

<Field label="Bio" error={errors.bio}>
  <Textarea rows={4} placeholder="A few words about yourself"/>
</Field>`}</Code>
    </div>
  );
}

export const PAGES = {
  inputs: PageInputs,
};
