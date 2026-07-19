/* eslint-disable react-refresh/only-export-components */
import { Stepper } from '@monoset/react';
import { Code, H1, H2, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/stepper.css';


function PageStepper() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Stepper</H1>
      <Lead>A horizontal multi-step indicator. Pass a list of steps and the current index — done steps get a checkmark, the current one gets the accent color, pending steps stay neutral.</Lead>

      <H2 id="basic">Basic</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:480 }}>
          <Stepper
            current={1}
            steps={[
              { label: "Account", description: "Email, password" },
              { label: "Profile", description: "Display name" },
              { label: "Plan", description: "Pick a tier" },
              { label: "Done" },
            ]}
          />
        </div>
      </Preview>
      <Code language="jsx">{`<Stepper
  current={currentStep}
  steps={[
    { label: "Account",   description: "Email, password" },
    { label: "Profile",   description: "Display name" },
    { label: "Plan",      description: "Pick a tier" },
    { label: "Done" },
  ]}
/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"steps",   type:"StepperStep[]", default:"—", desc:"Each step has a label and optional description." },
        { name:"current", type:"number",        default:"—", desc:"0-indexed current step." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  stepper: PageStepper,
};
