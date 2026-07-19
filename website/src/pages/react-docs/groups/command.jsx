/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Button, CommandPalette } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/command.css';
import '@monoset/react/styles/button.css';

function PageCommand() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteItems = [
    { id: "home",     label: "Go to Home",     description: "Jump back to the dashboard" },
    { id: "settings", label: "Open Settings",  description: "Account, billing, and team" },
    { id: "theme",    label: "Toggle theme",   description: "Switch between light and dark" },
    { id: "logout",   label: "Log out",        description: "Sign out of this session" },
  ];
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Command palette</H1>
      <Lead>A controlled, searchable command menu with announced keyboard navigation. Your app decides when to open it and what each action does.</Lead>

      <H2 id="basic">Basic usage</H2>
      <P>Pass an array of items, control the open state, and handle selection via <InlineCode>onSelect</InlineCode> on each item.</P>
      <Preview bg="var(--bg)">
        <Button onClick={() => setPaletteOpen(true)}>Open command palette</Button>
        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          items={paletteItems}
          placeholder="Type a command…"
        />
      </Preview>
      <Code language="jsx">{`import { CommandPalette, Button } from "@monoset/react";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  const items = [
    { id: "home",     label: "Go to Home",     onSelect: () => navigate("/") },
    { id: "settings", label: "Open Settings",  onSelect: () => navigate("/settings") },
    { id: "theme",    label: "Toggle theme",   onSelect: () => toggleTheme() },
    { id: "logout",   label: "Log out",        onSelect: () => logout() },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open commands</Button>
      <CommandPalette open={open} onOpenChange={setOpen} items={items} />
    </>
  );
}`}</Code>

      <H2 id="groups">Grouped items</H2>
      <P>Pass an array of groups instead of a flat list. Each group gets an optional heading.</P>
      <Code language="jsx">{`const items = [
  {
    heading: "Navigation",
    items: [
      { id: "home",     label: "Home",     onSelect: () => navigate("/") },
      { id: "projects", label: "Projects", onSelect: () => navigate("/projects") },
    ],
  },
  {
    heading: "Actions",
    items: [
      { id: "new",    label: "New project",  onSelect: () => createProject() },
      { id: "theme",  label: "Toggle theme", onSelect: () => toggleTheme() },
    ],
  },
];

<CommandPalette open={open} onOpenChange={setOpen} items={items} />`}</Code>

      <H2 id="keyboard">Keyboard shortcut</H2>
      <P>The palette itself does not register a global keyboard shortcut. Wire it up yourself so you control when it activates.</P>
      <Code language="jsx">{`useEffect(() => {
  const onKey = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen(true);
    }
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);`}</Code>

      <H2 id="filter">Custom filter</H2>
      <P>By default the palette matches against <InlineCode>label</InlineCode>, <InlineCode>description</InlineCode>, and <InlineCode>keywords</InlineCode>. Pass a custom <InlineCode>filter</InlineCode> function to change this.</P>
      <Code language="jsx">{`<CommandPalette
  open={open}
  onOpenChange={setOpen}
  items={items}
  filter={(query, item) => item.label.toLowerCase().startsWith(query.toLowerCase())}
/>`}</Code>

      <H2 id="footer">Footer</H2>
      <P>Pass a <InlineCode>footer</InlineCode> prop to render keyboard hints or branding below the list.</P>
      <Code language="jsx">{`<CommandPalette
  open={open}
  onOpenChange={setOpen}
  items={items}
  footer={
    <>
      <span>↑↓ navigate</span>
      <span>↵ select</span>
      <span>esc close</span>
    </>
  }
/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"open",          type:"boolean",                           default:"—",           desc:"Controlled open state." },
        { name:"onOpenChange",  type:"(open: boolean) => void",          default:"—",           desc:"Called when the palette wants to open or close." },
        { name:"items",         type:"CommandItem[] | CommandGroup[]",    default:"[]",          desc:"Flat or grouped list of commands." },
        { name:"placeholder",   type:"string",                           default:'"Search..."', desc:"Input placeholder text." },
        { name:"emptyMessage",  type:"string",                           default:'"No results."', desc:"Shown when nothing matches." },
        { name:"filter",        type:"(query, item) => boolean",         default:"built-in",    desc:"Custom filter function." },
        { name:"footer",        type:"ReactNode",                        default:"—",           desc:"Content rendered below the list." },
      ]}/>

      <H2 id="item-shape">CommandItem shape</H2>
      <PropsTable rows={[
        { name:"id",          type:"string",     default:"—",  desc:"Unique identifier." },
        { name:"label",       type:"string",     default:"—",  desc:"Display label." },
        { name:"description", type:"string",     default:"—",  desc:"Secondary text below the label." },
        { name:"icon",        type:"ReactNode",  default:"—",  desc:"Leading icon." },
        { name:"onSelect",    type:"() => void", default:"—",  desc:"Called when the item is picked." },
        { name:"keywords",    type:"string[]",   default:"—",  desc:"Extra search terms (not displayed)." },
        { name:"disabled",    type:"boolean",    default:"false", desc:"Prevents selection." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  command: PageCommand,
};
