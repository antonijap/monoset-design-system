/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, H3, P, Lead, PropsTable } from '../../../ui/docs.jsx';
import DemoLauncher from '../DemoLauncher.jsx';

function PageMultiCombobox() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Multi-select</H1>
      <Lead>An editable multi-select that keeps each selected value as a removable tag. It stays searchable as the list grows, and the list marks every selected option.</Lead>

      <H2 id="basic">Basic</H2>
      <DemoLauncher label="Run MultiCombobox demo" load={() => import('../demos/multicombobox.jsx')}/>
      <Code language="jsx">{`const [tags, setTags] = useState(["react"]);

<MultiCombobox
  aria-label="Tags"
  options={[
    { value: "react",  label: "React" },
    { value: "tokens", label: "Tokens" },
  ]}
  value={tags}
  onValueChange={setTags}
  placeholder="Pick tags"
/>`}</Code>

      <H2 id="paste">Paste several values</H2>
      <P>Paste comma-separated or line-separated values to add several options at once. Exact values, labels, and <InlineCode>textValue</InlineCode> strings are accepted. Text that does not match stays in the input so it is not lost.</P>

      <H2 id="form">Form values</H2>
      <P>Pass <InlineCode>name</InlineCode> to submit one value for each selected option. The component also supports an external form through <InlineCode>form</InlineCode>.</P>
      <Code language="jsx">{`<MultiCombobox
  aria-label="Project tags"
  name="tags"
  options={options}
  defaultValue={["react", "design"]}
/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"options",            type:"MultiComboboxOption[]",       default:"[]",           desc:"List of selectable options." },
        { name:"value",              type:"string[]",                   default:"—",            desc:"Controlled selected values." },
        { name:"defaultValue",       type:"string[]",                   default:"[]",           desc:"Initial values when uncontrolled." },
        { name:"onValueChange",      type:"(value: string[]) => void",  default:"—",            desc:"Called when selection changes." },
        { name:"inputValue",         type:"string",                     default:"—",            desc:"Controlled search text." },
        { name:"defaultInputValue",  type:"string",                     default:'""',           desc:"Initial search text when uncontrolled." },
        { name:"onInputValueChange", type:"(value: string) => void",    default:"—",            desc:"Called when the search text changes." },
        { name:"placeholder",        type:"string",                     default:'"Select..."',  desc:"Editable input placeholder." },
        { name:"emptyMessage",       type:"string",                     default:'"No results."', desc:"Shown when nothing matches." },
        { name:"filter",             type:"(query, option) => boolean", default:"built-in",    desc:"Custom filter function." },
        { name:"open",               type:"boolean",                    default:"—",            desc:"Controlled list visibility." },
        { name:"defaultOpen",        type:"boolean",                    default:"false",        desc:"Initial list visibility when uncontrolled." },
        { name:"onOpenChange",       type:"(open: boolean) => void",     default:"—",            desc:"Called when list visibility changes." },
        { name:"name",               type:"string",                     default:"—",            desc:"Repeated form field name for selected keys." },
        { name:"form",               type:"string",                     default:"—",            desc:"ID of an external form owner." },
        { name:"disabled",           type:"boolean",                    default:"false",        desc:"Disables the control." },
        { name:"readOnly",           type:"boolean",                    default:"false",        desc:"Keeps tags readable but not removable." },
        { name:"required",           type:"boolean",                    default:"false",        desc:"Requires at least one selected option." },
        { name:"invalid",            type:"boolean",                    default:"false",        desc:"Applies invalid semantics and styling." },
      ]}/>

      <H3>MultiComboboxOption</H3>
      <PropsTable rows={[
        { name:"value",       type:"string",   default:"—",     desc:"Unique identifier." },
        { name:"label",       type:"string",   default:"—",     desc:"Visible tag and row label." },
        { name:"textValue",   type:"string",   default:"label", desc:"Unique search and announced text. Set it when labels repeat." },
        { name:"description", type:"string",   default:"—",     desc:"Secondary text under the row label." },
        { name:"keywords",    type:"string[]", default:"—",     desc:"Extra search terms that are not displayed." },
        { name:"disabled",    type:"boolean",  default:"false", desc:"Prevents selection and removal." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  multicombobox: PageMultiCombobox,
};
