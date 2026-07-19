/* eslint-disable react-refresh/only-export-components */
import { Button, Badge, Field, Input, Card } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/button.css';
import '@monoset/react/styles/badge.css';
import '@monoset/react/styles/field.css';
import '@monoset/react/styles/input.css';
import '@monoset/react/styles/card.css';

function PageUsage() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Getting Started</div>
      <H1>Basic usage</H1>
      <Lead>A quick end-to-end example: a sign-in card built with Monoset tokens and primitives.</Lead>

      <H2 id="example">Full example</H2>
      <Preview>
        <Card style={{ width:320, display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <div style={{ fontSize:16, fontWeight:600 }}>Sign in</div>
            <div style={{ fontSize:12, color:"var(--fg3)", marginTop:4 }}>Use your workspace email.</div>
          </div>
          <Field label="Email">
            <Input type="email" defaultValue="ada@monoset.dev" />
          </Field>
          <Field label="Password">
            <Input type="password" defaultValue="monoset" />
          </Field>
          <Button variant="primary" size="lg">Continue</Button>
        </Card>
      </Preview>

      <Code filename="SignIn.jsx">{`function SignIn() {
  return (
    <Card pad={24}>
      <h2 className="h2">Sign in</h2>
      <p className="meta">Use your workspace email.</p>

      <Field label="Email">
        <Input type="email" placeholder="you@example.com"/>
      </Field>
      <Field label="Password">
        <Input type="password"/>
      </Field>

      <Button variant="primary" size="lg">Continue</Button>
    </Card>
  );
}`}</Code>

      <H2 id="dark">Dark theme</H2>
      <P>Add the <InlineCode>monoset-dark</InlineCode> class to any element and the semantic tokens flip for everything inside it. No ThemeProvider, no context. Put it on <InlineCode>&lt;html&gt;</InlineCode> for a whole-app switch, or on a single panel for an inverted card.</P>
      <Code>{`<div className="monoset-dark">
  <Button variant="primary">Inverted surface</Button>
</div>`}</Code>
      <Preview bg="var(--mono-1000)">
        <div className="monoset-dark" style={{ display:"flex", gap:8 }}>
          <Button variant="primary">Save</Button>
          <Button variant="secondary">Cancel</Button>
          <Badge variant="outline">v1.0</Badge>
        </div>
      </Preview>
    </div>
  );
}

export const PAGES = {
  usage: PageUsage,
};
