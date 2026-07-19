/* eslint-disable react-refresh/only-export-components */
import { useState, useCallback } from 'react';
import { Icon, Code, H1, Lead } from '../../../ui/docs.jsx';
import { useClipboardCopy } from '../../../ui/useClipboardCopy.js';
import { getAvatarNameError } from '../../../playground/avatar.js';
import DemoLauncher from '../DemoLauncher.jsx';
import './playground.css';

const PLAYGROUND_COMPONENTS = [
  "Button","Badge","Alert","Avatar","Card","Input","Textarea",
  "Switch","Checkbox","Spinner",
];

const PLAYGROUND_DEMOS = {
  Button: () => import('../demos/playground/button.jsx'),
  Badge: () => import('../demos/playground/badge.jsx'),
  Alert: () => import('../demos/playground/alert.jsx'),
  Avatar: () => import('../demos/playground/avatar.jsx'),
  Card: () => import('../demos/playground/card.jsx'),
  Input: () => import('../demos/playground/input.jsx'),
  Textarea: () => import('../demos/playground/textarea.jsx'),
  Switch: () => import('../demos/playground/switch.jsx'),
  Checkbox: () => import('../demos/playground/checkbox.jsx'),
  Spinner: () => import('../demos/playground/spinner.jsx'),
};

const PLAYGROUND_DEFAULTS = {
  Button:   { variant: "secondary", size: "md", disabled: false, children: "Click me" },
  Badge:    { variant: "neutral", children: "New" },
  Alert:    { title: "Heads up", children: "Something worth knowing about." },
  Avatar:   { name: "Ada Turing", size: "md", initials: "", src: "" },
  Card:     { variant: "outline", children: "Card content goes here." },
  Input:    { placeholder: "Type something...", disabled: false },
  Textarea: { placeholder: "Write a longer message...", rows: 3, disabled: false },
  Switch:   { checked: false, label: "Enable notifications" },
  Checkbox: { checked: false, label: "Accept terms" },
  Spinner:  { size: 20 },
};

function PlaygroundField({ label, children }) {
  return (
    <label style={{ display:"flex", flexDirection:"column", gap:5 }}>
      <span style={{ fontSize:11, fontWeight:500, color:"var(--fg3)", textTransform:"uppercase", letterSpacing:"0.05em" }}>{label}</span>
      {children}
    </label>
  );
}

function generateCode(component, props) {
  const defaults = PLAYGROUND_DEFAULTS[component];
  const avatarNameError = component === "Avatar" ? getAvatarNameError(props.name) : null;
  if (avatarNameError) return `/* ${avatarNameError} */`;
  const selfClosing = ["Input","Textarea","Switch","Checkbox","Spinner"].includes(component);
  const parts = [];
  const children = props.children;

  for (const [key, val] of Object.entries(props)) {
    if (key === "children") continue;
    if (val === defaults[key] && !(component === "Avatar" && key === "name")) continue;
    if (val === "" || val === false) continue;
    if (val === true) {
      parts.push(key);
    } else if (typeof val === "number") {
      parts.push(`${key}={${val}}`);
    } else {
      parts.push(`${key}="${val}"`);
    }
  }

  const propsStr = parts.length ? " " + parts.join(" ") : "";

  if (selfClosing) return `<${component}${propsStr} />`;
  if (children !== undefined && children !== "") {
    return `<${component}${propsStr}>${children}</${component}>`;
  }
  return `<${component}${propsStr} />`;
}

function PgSelect({ label, value, options, onChange }) {
  return (
    <PlaygroundField label={label}>
      <select value={value} onChange={event => onChange(event.target.value)} style={{
        width:'100%', minHeight:32, padding:'4px 8px',
        border:'1px solid var(--border)', borderRadius:6,
        background:'var(--bg)', color:'var(--fg1)', font:'inherit', fontSize:13,
      }}>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </PlaygroundField>
  );
}

function PgSwitch({ label, checked, onChange }) {
  return (
    <PlaygroundField label={label}>
      <input type="checkbox" checked={checked} onChange={event => onChange(event.target.checked)} style={{ margin:0 }}/>
    </PlaygroundField>
  );
}

function PgInput({ label, value, onChange, placeholder }) {
  return (
    <PlaygroundField label={label}>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || ""} style={{
        minHeight:32, padding:'4px 8px', border:'1px solid var(--border)', borderRadius:6,
        background:'var(--bg)', color:'var(--fg1)', font:'inherit', fontSize:13,
      }}/>
    </PlaygroundField>
  );
}

function PlaygroundControls({ component, props, setProps }) {
  const set = (key) => (v) => setProps(p => ({...p, [key]: v}));
  switch (component) {
    case "Button":
      return (<>
        <PgSelect label="variant" value={props.variant} options={["primary","secondary","ghost","danger"]} onChange={set("variant")} />
        <PgSelect label="size" value={props.size} options={["sm","md","lg"]} onChange={set("size")} />
        <PgSwitch label="disabled" checked={props.disabled} onChange={set("disabled")} />
        <PgInput label="label" value={props.children} onChange={set("children")} />
      </>);
    case "Badge":
      return (<>
        <PgSelect label="variant" value={props.variant} options={["neutral","outline","solid"]} onChange={set("variant")} />
        <PgInput label="text" value={props.children} onChange={set("children")} />
      </>);
    case "Alert":
      return (<>
        <PgInput label="title" value={props.title} onChange={set("title")} />
        <PgInput label="message" value={props.children} onChange={set("children")} />
      </>);
    case "Avatar":
      return (<>
        <PgInput label="name" value={props.name} onChange={set("name")} />
        <PgSelect label="size" value={props.size} options={["sm","md","lg"]} onChange={set("size")} />
        <PgInput label="initials override" value={props.initials} onChange={set("initials")} />
        <PgInput label="src" value={props.src} onChange={set("src")} placeholder="Image URL (optional)" />
      </>);
    case "Card":
      return (<>
        <PgSelect label="variant" value={props.variant} options={["outline","elevated","inset"]} onChange={set("variant")} />
        <PgInput label="content" value={props.children} onChange={set("children")} />
      </>);
    case "Input":
      return (<>
        <PgInput label="placeholder" value={props.placeholder} onChange={set("placeholder")} />
        <PgSwitch label="disabled" checked={props.disabled} onChange={set("disabled")} />
      </>);
    case "Textarea":
      return (<>
        <PgInput label="placeholder" value={props.placeholder} onChange={set("placeholder")} />
        <PgSwitch label="disabled" checked={props.disabled} onChange={set("disabled")} />
      </>);
    case "Switch":
      return (<>
        <PgSwitch label="checked" checked={props.checked} onChange={set("checked")} />
        <PgInput label="label" value={props.label} onChange={set("label")} />
      </>);
    case "Checkbox":
      return (<>
        <PgSwitch label="checked" checked={props.checked} onChange={set("checked")} />
        <PgInput label="label" value={props.label} onChange={set("label")} />
      </>);
    case "Spinner":
      return (<>
        <PgSelect label="size" value={String(props.size)} options={["14","20","28","40"]} onChange={v => set("size")(Number(v))} />
      </>);
    default:
      return null;
  }
}

function PagePlayground() {
  const [active, setActive] = useState("Button");
  const [propsMap, setPropsMap] = useState(() => {
    const m = {};
    for (const c of PLAYGROUND_COMPONENTS) m[c] = { ...PLAYGROUND_DEFAULTS[c] };
    return m;
  });

  const currentProps = propsMap[active];
  const setCurrentProps = useCallback((updater) => {
    setPropsMap(m => ({ ...m, [active]: typeof updater === "function" ? updater(m[active]) : updater }));
  }, [active]);

  const codeStr = generateCode(active, currentProps);
  const { copy: handleCopy, copyStatus } = useClipboardCopy(codeStr);
  const copied = copyStatus === "copied";
  const copyLabel = copied ? "Copied" : copyStatus === "failed" ? "Copy failed" : "Copy";

  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Tools</div>
      <H1>Playground</H1>
      <Lead>Pick a component, adjust its props, and see the result. The generated code below is ready to paste into your project.</Lead>

      {/* Component selector */}
      <div data-ms="playground-selector" style={{ marginBottom:24, maxWidth:240 }}>
        <PlaygroundField label="Component">
          <select value={active} onChange={event => setActive(event.target.value)} style={{
            width:'100%', minHeight:32, padding:'4px 8px',
            border:'1px solid var(--border)', borderRadius:6,
            background:'var(--bg)', color:'var(--fg1)', font:'inherit', fontSize:13,
          }}>
            {PLAYGROUND_COMPONENTS.map(component => (
              <option key={component} value={component}>{component}</option>
            ))}
          </select>
        </PlaygroundField>
      </div>

      {/* Preview + Controls grid */}
      <div data-ms="playground-workspace" className="ms-pg-w" style={{
        display:"grid", gap:1,
        border:"1px solid var(--border-subtle)", borderRadius:10, overflow:"hidden", marginBottom:24,
        background:"var(--border-subtle)",
      }}>
        {/* Live preview */}
        <div data-ms="playground-preview" className="ms-pg-p" style={{
          background:"var(--bg)", padding:40,
          display:"flex", alignItems:"center", justifyContent:"center", minHeight:200,
        }}>
          <DemoLauncher
            key={active}
            label={`Run ${active} demo`}
            load={PLAYGROUND_DEMOS[active]}
            demoProps={{ props: currentProps }}
          />
        </div>

        {/* Controls panel */}
        <div data-ms="playground-controls" className="ms-pg-c" style={{
          background:"var(--bg-subtle)", padding:"20px 18px",
          display:"flex", flexDirection:"column", gap:16,
        }}>
          <div style={{ fontSize:12, fontWeight:600, color:"var(--fg1)", paddingBottom:8, borderBottom:"1px solid var(--border-subtle)" }}>
            Props
          </div>
          <PlaygroundControls component={active} props={currentProps} setProps={setCurrentProps} />
          <button type="button" data-ms="playground-action" className="ms-pg-a" onClick={() => setPropsMap(m => ({...m, [active]: {...PLAYGROUND_DEFAULTS[active]}}))}
            style={{
              all:"unset", fontFamily:"inherit", fontSize:11, fontWeight:500, color:"var(--fg3)",
              cursor:"pointer", padding:"6px 0", marginTop:"auto",
              transition:"color var(--duration-fast) var(--ease-standard)",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--fg1)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--fg3)"}>
            Reset to defaults
          </button>
        </div>
      </div>

      {/* Generated code */}
      <div data-ms="playground-code" style={{ position:"relative" }}>
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          marginBottom:8,
        }}>
          <div style={{ fontSize:12, fontWeight:600, color:"var(--fg2)" }}>Generated code</div>
          <button type="button" data-ms="playground-action" className="ms-pg-a" onClick={handleCopy}
            style={{
              all:"unset", fontFamily:"inherit", fontSize:11, fontWeight:500,
              color: copyStatus === "idle" ? "var(--fg3)" : "var(--fg1)", cursor:"pointer",
              display:"inline-flex", alignItems:"center", gap:4,
              transition:"color var(--duration-fast) var(--ease-standard)",
            }}
            onMouseEnter={e => { if (copyStatus === "idle") e.currentTarget.style.color = "var(--fg1)"; }}
            onMouseLeave={e => { if (copyStatus === "idle") e.currentTarget.style.color = "var(--fg3)"; }}>
            <Icon name={copied ? "check" : "copy"} size={12} />
            <span aria-live="polite">{copyLabel}</span>
          </button>
        </div>
        <Code language="jsx">{codeStr}</Code>
      </div>
    </div>
  );
}

export const PAGES = {
  playground: PagePlayground,
};
