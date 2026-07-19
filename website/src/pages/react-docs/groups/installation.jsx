/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, H3, P, Lead, Divider, Step } from '../../../ui/docs.jsx';

function PageInstallation() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Getting Started</div>
      <H1>Installation</H1>
      <Lead>Three ways in, depending on how deep you're going. The starter CLI is the fastest for a new project, the React kit is the usual pick, and the tokens-only package is there if you're not using React.</Lead>

      <H2 id="option-starter">Starter CLI (new project)</H2>
      <P>Creates a Vite + React 19 project with the Monoset package and CSS imports in place.</P>
      <Step n="1" title="Run create-monoset-app">
        <Code filename="terminal">{`npm create monoset-app@latest my-app`}</Code>
      </Step>
      <Step n="2" title="Install and run">
        <Code filename="terminal">{`cd my-app
npm install
npm run dev`}</Code>
      </Step>

      <Divider/>

      <H2 id="option-react">React kit (existing project)</H2>
      <P>Install the component package and tokens in an existing React app. Motion helpers are available from the React motion subpath.</P>
      <Step n="1" title="Install the packages">
        <Code filename="terminal">{`npm install @monoset/react @monoset/tokens react react-dom`}</Code>
      </Step>

      <H3 id="css-entry-points">Choose the CSS entry points</H3>
      <P><InlineCode>@monoset/tokens/css</InlineCode> includes variables, base element styles, and typography. If the application owns its reset and typography, import only the variables. The React stylesheet comes after either option.</P>
      <Code filename="src/main.css">{`/* Full token stack */
@import "@monoset/tokens/css";
@import "@monoset/react/styles.css";

/* Or keep your application base styles */
@import "@monoset/tokens/variables.css";
@import "@monoset/react/styles.css";`}</Code>
      <Step n="2" title="Import the CSS at your app root">
        <Code filename="src/main.jsx">{`import "@monoset/tokens/css";
import "@monoset/react/styles.css";`}</Code>
      </Step>
      <Step n="3" title="Wrap the tree in MonosetProvider and use components">
        <Code filename="src/App.jsx">{`import { MonosetProvider, Button, Badge, Card } from "@monoset/react";

export default function App() {
  return (
    <MonosetProvider>
      <Card>
        <h2>Hello, Monoset.</h2>
        <Badge variant="solid">New</Badge>
        <Button variant="primary">Save changes</Button>
      </Card>
    </MonosetProvider>
  );
}`}</Code>
      </Step>

      <Divider/>

      <H2 id="option-tokens">CSS tokens only (any framework)</H2>
      <P>If you're building components yourself, or your stack isn't React, pull in just the token file and style against the CSS variables.</P>
      <Step n="1" title="Install">
        <Code filename="terminal">{`npm install @monoset/tokens`}</Code>
      </Step>
      <Step n="2" title="Import the CSS">
        <Code filename="src/main.css">{`@import "@monoset/tokens/css";`}</Code>
      </Step>
      <Step n="3" title="Style against the variables">
        <Code filename="src/button.css">{`.btn {
  background: var(--mono-1000);
  color: var(--mono-0);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-5);
  font-family: var(--font-sans);
}`}</Code>
      </Step>

      <Divider/>

      <H2 id="fonts">Fonts</H2>
      <P>Inter for UI, JetBrains Mono for code. Both open source, both self-hosted. The easiest path is <InlineCode>@fontsource</InlineCode>: one CSS import per weight, files get bundled by Vite, zero third-party requests.</P>
      <Code filename="terminal">{`npm install @fontsource/inter @fontsource/jetbrains-mono`}</Code>
      <Code filename="src/main.jsx">{`import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@fontsource/jetbrains-mono/latin-600.css";`}</Code>
      <P>Prefer Google Fonts instead? Drop a <InlineCode>&lt;link&gt;</InlineCode> into your HTML head and skip the npm packages. The tokens work either way.</P>

      <Divider/>

      <H2 id="react-v1-migration">React v1 migration</H2>
      <P>React v1 removes the old form-state and stagger helpers. It also moves motion helpers out of the package root.</P>
      <Code language="jsx">{`// Before
import { Reveal, fadeUp } from "@monoset/react";

// React v1
import { TableHeader } from "@monoset/react";
import { Reveal, fadeUp } from "@monoset/react/motion";
<TableHeader sortable sortDirection="asc">Name</TableHeader>`}</Code>
      <P>The old TableHeader sort prop becomes <InlineCode>sortable</InlineCode> with <InlineCode>sortDirection</InlineCode>. Replace <InlineCode>Form</InlineCode> and <InlineCode>useMonosetForm</InlineCode> with React state or your existing form library. Replace <InlineCode>StaggerList</InlineCode> with an application-owned motion composition if you still need it.</P>
    </div>
  );
}

export const PAGES = {
  installation: PageInstallation,
};
