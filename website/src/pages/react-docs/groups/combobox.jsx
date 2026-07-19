/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, H3, P, Lead, PropsTable } from '../../../ui/docs.jsx';
import DemoLauncher from '../DemoLauncher.jsx';

function PageCombobox() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Combobox</H1>
      <Lead>An editable input with a filtered list of options. Use it when a Select would be slow to scan. Arrow keys move through results, Enter selects, and Escape closes the list.</Lead>

      <H2 id="basic">Basic usage</H2>
      <DemoLauncher label="Run Combobox demo" load={() => import('../demos/combobox.jsx')}/>
      <Code language="jsx">{`import { Combobox } from "@monoset/react";
import { useState } from "react";

function CountryPicker() {
  const [country, setCountry] = useState(null);
  return (
    <Combobox
      aria-label="Country"
      value={country}
      onValueChange={setCountry}
      options={[
        { value: "us", label: "United States" },
        { value: "fr", label: "France" },
        { value: "de", label: "Germany" },
      ]}
      placeholder="Pick a country"
    />
  );
}`}</Code>

      <H2 id="descriptions">With descriptions</H2>
      <P>Add a <InlineCode>description</InlineCode> when a short label needs more context.</P>
      <Code language="jsx">{`const plans = [
  { value: "free", label: "Free",    description: "1 project, 100 MB" },
  { value: "pro",  label: "Pro",     description: "10 projects, 10 GB" },
  { value: "team", label: "Team",    description: "Unlimited" },
];

<Combobox aria-label="Plan" options={plans} placeholder="Pick a plan"/>`}</Code>

      <H2 id="keywords">Search keywords</H2>
      <P>The default filter matches against label, description, and an optional <InlineCode>keywords</InlineCode> array. Use keywords for terms you want to find but not show.</P>
      <Code language="jsx">{`{ value: "us", label: "United States", keywords: ["usa", "america"] }`}</Code>

      <H2 id="duplicate-labels">Duplicate labels</H2>
      <P>If two rows share a label, give each one a unique <InlineCode>textValue</InlineCode>. This is the text shown in the input after selection and the text announced by assistive technology.</P>
      <Code language="jsx">{`{ value: "springfield-il", label: "Springfield", textValue: "Springfield, Illinois" }
{ value: "springfield-ma", label: "Springfield", textValue: "Springfield, Massachusetts" }`}</Code>

      <H2 id="custom-filter">Custom filter</H2>
      <P>Pass a <InlineCode>filter</InlineCode> function for non-default matching, like prefix-only or fuzzy.</P>
      <Code language="jsx">{`<Combobox
  aria-label="Project"
  options={options}
  filter={(query, option) =>
    option.label.toLowerCase().startsWith(query.toLowerCase())
  }
/>`}</Code>

      <H2 id="form">In a form</H2>
      <P>Use <InlineCode>Field.Control</InlineCode> to connect the label, help text, and error message to the editable input. Add <InlineCode>name</InlineCode> when the selected value should be submitted with a form.</P>
      <Code language="jsx">{`<Field label="Country" description="We'll use this for billing.">
  <Field.Control>
    {props => (
      <Combobox {...props} name="country" options={countries} value={country} onValueChange={setCountry}/>
    )}
  </Field.Control>
</Field>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"options",            type:"ComboboxOption[]",          default:"[]",           desc:"List of selectable options." },
        { name:"value",              type:"string | null",             default:"—",            desc:"Controlled selected value." },
        { name:"defaultValue",       type:"string | null",             default:"—",            desc:"Initial value when uncontrolled." },
        { name:"onValueChange",      type:"(value: string | null) => void", default:"—",         desc:"Called when selection changes." },
        { name:"inputValue",         type:"string",                    default:"—",            desc:"Controlled text in the editable input." },
        { name:"defaultInputValue",  type:"string",                    default:'""',           desc:"Initial editable text when uncontrolled." },
        { name:"onInputValueChange", type:"(value: string) => void",    default:"—",            desc:"Called when the editable text changes." },
        { name:"placeholder",        type:"string",                    default:'"Select..."',  desc:"Editable input placeholder." },
        { name:"emptyMessage",       type:"string",                    default:'"No results."', desc:"Shown when nothing matches." },
        { name:"filter",             type:"(query, option) => boolean", default:"built-in",    desc:"Custom filter function." },
        { name:"open",               type:"boolean",                   default:"—",            desc:"Controlled list visibility." },
        { name:"defaultOpen",        type:"boolean",                   default:"false",        desc:"Initial list visibility when uncontrolled." },
        { name:"onOpenChange",       type:"(open: boolean) => void",    default:"—",            desc:"Called when list visibility changes." },
        { name:"name",               type:"string",                    default:"—",            desc:"Form field name for the selected key." },
        { name:"form",               type:"string",                    default:"—",            desc:"ID of an external form owner." },
        { name:"disabled",           type:"boolean",                   default:"false",        desc:"Disables the control." },
        { name:"readOnly",           type:"boolean",                   default:"false",        desc:"Keeps the value readable but not editable." },
        { name:"required",           type:"boolean",                   default:"false",        desc:"Marks the control as required." },
        { name:"invalid",            type:"boolean",                   default:"false",        desc:"Applies invalid semantics and styling." },
      ]}/>

      <H3>ComboboxOption</H3>
      <PropsTable rows={[
        { name:"value",       type:"string",   default:"—",     desc:"Unique identifier." },
        { name:"label",       type:"string",   default:"—",     desc:"Visible label." },
        { name:"textValue",   type:"string",   default:"label", desc:"Unique selected and announced text. Set it when labels repeat." },
        { name:"description", type:"string",   default:"—",     desc:"Secondary text under the label." },
        { name:"keywords",    type:"string[]", default:"—",     desc:"Extra search terms (not displayed)." },
        { name:"disabled",    type:"boolean",  default:"false", desc:"Prevents selection." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  combobox: PageCombobox,
};
