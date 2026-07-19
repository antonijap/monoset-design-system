/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, P, Lead, PropsTable } from '../../../ui/docs.jsx';
import DemoLauncher from '../DemoLauncher.jsx';

function PageNumberInput() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Number input</H1>
      <Lead>A locale-aware number field with stepper buttons. It keeps unfinished input such as <InlineCode>-</InlineCode> or <InlineCode>1,</InlineCode> intact until the user commits it.</Lead>

      <H2 id="basic">Basic</H2>
      <DemoLauncher label="Run NumberInput demo" load={() => import('../demos/numberinput.jsx')}/>
      <Code language="jsx">{`<NumberInput aria-label="Quantity" value={qty} onValueChange={setQty} min={0} max={99}/>`}</Code>

      <H2 id="locale">Locale and formatting</H2>
      <P>Pass <InlineCode>locale</InlineCode> to control decimal parsing. <InlineCode>formatOptions</InlineCode> accepts standard <InlineCode>Intl.NumberFormat</InlineCode> options.</P>
      <Code language="jsx">{`<NumberInput
  aria-label="Price"
  locale="de-DE"
  step={0.1}
  formatOptions={{ maximumFractionDigits: 2 }}
/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"value",         type:"number | null",  default:"—", desc:"Controlled value. Null represents an empty field." },
        { name:"defaultValue",  type:"number | null",  default:"—", desc:"Initial value when uncontrolled." },
        { name:"onValueChange", type:"(n: number | null) => void", default:"—", desc:"Called when a valid draft commits or a stepper changes the value." },
        { name:"min",           type:"number",  default:"—", desc:"Lower bound." },
        { name:"max",           type:"number",  default:"—", desc:"Upper bound." },
        { name:"step",          type:"number",  default:"1", desc:"Increment." },
        { name:"locale",        type:"string",  default:"browser", desc:"Locale used for parsing and formatting." },
        { name:"formatOptions", type:"Intl.NumberFormatOptions", default:"—", desc:"Number formatting options." },
        { name:"name",          type:"string",  default:"—", desc:"Form field name." },
        { name:"form",          type:"string",  default:"—", desc:"ID of an external form owner." },
        { name:"hideStepper",   type:"boolean", default:"false", desc:"Hide the +/- buttons." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  numberinput: PageNumberInput,
};
