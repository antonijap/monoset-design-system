/* eslint-disable react-refresh/only-export-components */
import { Button, EmptyState } from '@monoset/react';
import { Code, H1, H2, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/empty.css';
import '@monoset/react/styles/button.css';

function PageEmptyState() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Empty state</H1>
      <Lead>A friendly message when there's nothing to show. Title, one-line description, an action. That's the recipe. Don't apologize and don't write a paragraph.</Lead>

      <H2 id="basic">Basic empty state</H2>
      <Preview bg="var(--bg)">
        <EmptyState
          title="No projects yet"
          body="Create your first project to get started."
          action={<Button variant="primary">New project</Button>}
        />
      </Preview>
      <Code language="jsx">{`import { EmptyState, Button } from "@monoset/react";

<EmptyState
  title="No projects yet"
  body="Create your first project to get started."
  action={<Button variant="primary">New project</Button>}
/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"title",  type:"ReactNode", default:"—", desc:"Main heading." },
        { name:"body",   type:"ReactNode", default:"—", desc:"One-line explanation." },
        { name:"action", type:"ReactNode", default:"—", desc:"Optional CTA." },
        { name:"icon",   type:"ReactNode", default:"—", desc:"Optional icon above the title." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  empty: PageEmptyState,
};
