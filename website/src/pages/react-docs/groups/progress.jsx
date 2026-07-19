/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Button, Progress, Stack } from '@monoset/react';
import { Code, H1, H2, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/progress.css';
import '@monoset/react/styles/button.css';
import '@monoset/react/styles/layout.css';

function PageProgress() {
  const [value, setValue] = useState(60);
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Progress</H1>
      <Lead>A bar that fills as a task makes progress. Use it when you can measure how much work is left. If you can't, use Spinner.</Lead>

      <H2 id="basic">Basic progress</H2>
      <Preview bg="var(--bg)">
        <Stack gap={3} style={{ width:"100%", maxWidth:320 }}>
          <Progress value={value} aria-label="Upload progress"/>
          <div style={{ display:"flex", gap:8, fontSize:12, alignItems:"center" }}>
            <Button size="sm" onClick={() => setValue(v => Math.max(0, v - 20))}>-20</Button>
            <Button size="sm" onClick={() => setValue(v => Math.min(100, v + 20))}>+20</Button>
            <span style={{ marginLeft:"auto", color:"var(--fg3)", fontFamily:"var(--font-mono)" }}>{value}%</span>
          </div>
        </Stack>
      </Preview>
      <Code language="jsx">{`import { Progress } from "@monoset/react";

<Progress value={60} aria-label="Upload progress"/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"value",      type:"number", default:"—", desc:"Current progress, 0 to 100." },
        { name:"max",        type:"number", default:"100", desc:"Maximum value." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  progress: PageProgress,
};
