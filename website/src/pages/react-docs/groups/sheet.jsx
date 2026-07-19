/* eslint-disable react-refresh/only-export-components */
import { Button, Input, Sheet, SheetTrigger, SheetContent, SheetClose } from '@monoset/react';
import { Code, InlineCode, H1, H2, H3, P, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/sheet.css';
import '@monoset/react/styles/button.css';
import '@monoset/react/styles/input.css';

function PageSheet() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Sheet</H1>
      <Lead>A slide-over panel that enters from any edge. It traps focus and locks page scrolling. Escape closes it and returns focus to the trigger.</Lead>

      <H2 id="basic">Basic sheet</H2>
      <P>Use <InlineCode>Sheet</InlineCode> as the root, <InlineCode>SheetTrigger</InlineCode> to open it, and <InlineCode>SheetContent</InlineCode> for the panel. The <InlineCode>side</InlineCode> prop controls which edge it slides from.</P>
      <Preview bg="var(--bg)">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Open filters</Button>
          </SheetTrigger>
          <SheetContent title="Filters" description="Narrow down your results." side="right">
            <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)" }}>
              <Input placeholder="Search…"/>
              <Input placeholder="Status: all"/>
              <SheetClose asChild>
                <Button variant="primary">Apply</Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </Preview>
      <Code language="jsx">{`import { Sheet, SheetTrigger, SheetContent, SheetClose, Button } from "@monoset/react";

<Sheet>
  <SheetTrigger asChild>
    <Button>Open filters</Button>
  </SheetTrigger>
  <SheetContent title="Filters" description="Narrow down your results." side="right">
    <p>Filter controls go here.</p>
    <SheetClose asChild>
      <Button variant="secondary">Done</Button>
    </SheetClose>
  </SheetContent>
</Sheet>`}</Code>

      <H2 id="sides">All four sides</H2>
      <P>Pass <InlineCode>side="left"</InlineCode>, <InlineCode>"right"</InlineCode>, <InlineCode>"top"</InlineCode>, or <InlineCode>"bottom"</InlineCode>. Left and right panels span the full height; top and bottom span the full width.</P>
      <Code language="jsx">{`<SheetContent title="Navigation" side="left" size={320}>
  Navigation drawer
</SheetContent>

<SheetContent title="Actions" side="bottom" size="50vh">
  Mobile action sheet
</SheetContent>`}</Code>

      <H2 id="size">Custom size</H2>
      <P>The <InlineCode>size</InlineCode> prop sets the panel width (for left/right) or height (for top/bottom). Accepts a number (pixels) or any CSS length string.</P>
      <Code language="jsx">{`<SheetContent title="Details" side="right" size={480}>
  Wide detail panel
</SheetContent>

<SheetContent title="Filters" side="bottom" size="60vh">
  Tall bottom sheet
</SheetContent>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"side",        type:'"left" | "right" | "top" | "bottom"', default:'"right"', desc:"Which edge the panel enters from." },
        { name:"size",        type:"string | number", default:"380",      desc:"Panel width (left/right) or height (top/bottom)." },
        { name:"title",       type:"ReactNode",       default:"required", desc:"Accessible title rendered in the header." },
        { name:"description", type:"ReactNode",       default:"—",        desc:"Optional description below the title." },
        { name:"showClose",   type:"boolean",         default:"true",     desc:"Shows the built-in close button." },
        { name:"overlayClassName", type:"string",     default:"—",        desc:"Appended to the scrim element." },
        { name:"className",   type:"string",          default:"—",        desc:"Appended to the panel element." },
      ]}/>

      <H2 id="patterns">Common patterns</H2>

      <H3>Mobile navigation drawer</H3>
      <Code language="jsx">{`<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" aria-label="Menu">☰</Button>
  </SheetTrigger>
  <SheetContent side="left" size={280} title="Navigation">
    <nav>
      <a href="/dashboard">Dashboard</a>
      <a href="/settings">Settings</a>
    </nav>
  </SheetContent>
</Sheet>`}</Code>

      <H3>Detail panel</H3>
      <Code language="jsx">{`function UserRow({ user }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>{user.name}</button>
      </SheetTrigger>
      <SheetContent side="right" size={420} title={user.name} description={user.email}>
        <Stack gap={4}>
          <Card>Account details</Card>
          <Card>Activity log</Card>
        </Stack>
      </SheetContent>
    </Sheet>
  );
}`}</Code>
    </div>
  );
}

export const PAGES = {
  sheet: PageSheet,
};
