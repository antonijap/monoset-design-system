/* eslint-disable react-refresh/only-export-components */
import { PasswordInput } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/input.css';
import '@monoset/react/styles/password-input.css';

function PagePasswordInput() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Password input</H1>
      <Lead>An <InlineCode>Input</InlineCode> with a Show / Hide toggle on the right. Tabs to the toggle so keyboard users can flip visibility too.</Lead>

      <H2 id="basic">Basic</H2>
      <Preview bg="var(--bg)">
        <PasswordInput placeholder="Password" defaultValue="secret123"/>
      </Preview>
      <Code language="jsx">{`<PasswordInput placeholder="Password"/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"showToggle", type:"boolean", default:"true", desc:"Show the visibility toggle." },
        { name:"showLabel",  type:"string", default:'"Show"', desc:"Label when password is hidden." },
        { name:"hideLabel",  type:"string", default:'"Hide"', desc:"Label when password is visible." },
      ]}/>
      <P>Other props forward to <InlineCode>Input</InlineCode>.</P>
    </div>
  );
}

export const PAGES = {
  password: PagePasswordInput,
};
