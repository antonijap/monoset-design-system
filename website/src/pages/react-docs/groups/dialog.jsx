/* eslint-disable react-refresh/only-export-components */
import { Button, Dialog, DialogTrigger, DialogContent, DialogClose } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/dialog.css';
import '@monoset/react/styles/button.css';

function PageDialog() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Dialog</H1>
      <Lead>A modal that interrupts the user. Use it for actions that need attention or confirmation. Built on Radix Dialog: focus trap, scroll lock, Escape to close.</Lead>

      <H2 id="basic">Basic dialog</H2>
      <Preview bg="var(--bg)">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent title="Are you sure?" description="This action cannot be undone.">
            <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)" }}>
              <p style={{ fontSize:13, color:"var(--fg2)", lineHeight:1.55 }}>
                The project and all its data will be permanently removed.
              </p>
              <div style={{ display:"flex", justifyContent:"flex-end", gap:"var(--space-2)" }}>
                <DialogClose asChild><Button>Cancel</Button></DialogClose>
                <DialogClose asChild><Button variant="primary">Delete</Button></DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Preview>
      <Code language="jsx">{`import { Dialog, DialogTrigger, DialogContent, DialogClose, Button } from "@monoset/react";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogContent title="Are you sure?" description="This action cannot be undone.">
    <p>The project and all its data will be permanently removed.</p>
    <DialogClose asChild><Button>Cancel</Button></DialogClose>
    <DialogClose asChild><Button variant="primary">Delete</Button></DialogClose>
  </DialogContent>
</Dialog>`}</Code>

      <H2 id="vs-sheet">Dialog vs Sheet</H2>
      <P>Use <InlineCode>Dialog</InlineCode> for short, focused actions: confirmations, simple forms, alerts. Use <InlineCode>Sheet</InlineCode> when the panel needs more room or feels like an extension of the page (filters, detail views, mobile menus).</P>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"title",       type:"ReactNode", default:"required", desc:"Accessible header title." },
        { name:"description", type:"ReactNode", default:"—", desc:"Subtitle rendered as a Radix DialogDescription." },
        { name:"overlayClassName", type:"string", default:"—", desc:"Appended to the scrim element." },
        { name:"className",   type:"string",    default:"—", desc:"Appended to the panel element." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  dialog: PageDialog,
};
