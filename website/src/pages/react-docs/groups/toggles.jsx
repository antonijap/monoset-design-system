/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Switch, Checkbox } from '@monoset/react';
import { Code, H1, H2, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/choice-controls.css';


function PlatformPreview({ web, bg }) {
  return <Preview bg={bg}>{web}</Preview>;
}

function PageToggles() {
  const [cb, setCb] = useState(true);
  const [sw, setSw] = useState(true);
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Checkbox &amp; Switch</H1>
      <Lead>Two similar-looking controls with different semantics. Use a checkbox when the choice is part of a form that gets submitted. Use a switch when flipping it takes effect right away, like email notifications or dark mode.</Lead>

      <H2 id="checkbox">Checkbox</H2>
      <Preview bg="var(--bg)">
        <Checkbox checked={cb} onCheckedChange={value => setCb(value === true)} label="Accept terms" />
      </Preview>
      <Code>{`<Checkbox
  checked={accepted}
  onCheckedChange={value => setAccepted(value === true)}
  label="Accept terms"
/>`}</Code>

      <H2 id="switch">Switch</H2>
      <PlatformPreview
        bg="var(--bg)"
        native="SwitchDemo"
        web={
          <Switch checked={sw} onCheckedChange={setSw} label="Email alerts" />
        }
      />
      <Code>{`<Switch checked={enabled} onCheckedChange={setEnabled} label="Email alerts"/>`}</Code>
    </div>
  );
}

export const PAGES = {
  toggles: PageToggles,
};
