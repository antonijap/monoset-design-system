/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { PinInput } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/pin-input.css';

function PagePinInput() {
  const [code, setCode] = useState("");
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Pin input</H1>
      <Lead>A fixed row of one-character fields for verification codes. Editing a middle cell leaves the later cells in place. Paste and one-time-code autofill start at the active cell.</Lead>

      <H2 id="basic">Basic</H2>
      <Preview bg="var(--bg)">
        <PinInput aria-label="Verification code" length={6} value={code} onValueChange={setCode}/>
      </Preview>
      <Code language="jsx">{`const [code, setCode] = useState("");

<PinInput
  aria-label="Verification code"
  length={6}
  value={code}
  onValueChange={setCode}
  onComplete={(v) => verifyCode(v)}
/>`}</Code>

      <H2 id="editing">Editing and paste</H2>
      <P>Arrow keys move between cells. Backspace on an empty cell moves to the previous one. Pasted text is filtered through <InlineCode>pattern</InlineCode> and fills the remaining cells from the current position.</P>

      <H2 id="form">In a form</H2>
      <P>Pass <InlineCode>name</InlineCode> to submit the current code as one value. <InlineCode>required</InlineCode> keeps the form invalid until every cell is filled. External forms and native reset are supported.</P>
      <Code language="jsx">{`<PinInput
  aria-label="Verification code"
  name="verificationCode"
  form="sign-in"
  length={6}
  required
/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"length",        type:"number",   default:"6", desc:"Number of cells." },
        { name:"value",         type:"string",   default:"—", desc:"Controlled value." },
        { name:"defaultValue",  type:"string",   default:'""', desc:"Initial value when uncontrolled." },
        { name:"onValueChange", type:"(v: string) => void", default:"—", desc:"Called on each change." },
        { name:"onComplete",    type:"(v: string) => void", default:"—", desc:"Called once when an edit completes every cell." },
        { name:"mask",          type:"boolean",  default:"false", desc:"Mask each cell (password style)." },
        { name:"pattern",       type:"RegExp",   default:"/^[0-9]$/", desc:"Allowed character pattern." },
        { name:"autoFocus",     type:"boolean",  default:"false", desc:"Focus the first cell on mount." },
        { name:"name",          type:"string",   default:"—", desc:"Form field name for the flattened code." },
        { name:"form",          type:"string",   default:"—", desc:"ID of an external form owner." },
        { name:"disabled",      type:"boolean",  default:"false", desc:"Disables every cell and omits the form value." },
        { name:"readOnly",      type:"boolean",  default:"false", desc:"Keeps the code focusable without allowing edits." },
        { name:"required",      type:"boolean",  default:"false", desc:"Requires every cell before form submission." },
        { name:"invalid",       type:"boolean",  default:"false", desc:"Applies invalid semantics and styling." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  pininput: PagePinInput,
};
