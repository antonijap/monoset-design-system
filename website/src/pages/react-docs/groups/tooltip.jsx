/* eslint-disable react-refresh/only-export-components */
import { Button, Tooltip, TooltipProvider } from '@monoset/react';
import { Icon, Code, InlineCode, H1, H2, P, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/menu.css';
import '@monoset/react/styles/button.css';

function PageTooltip() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Tooltip</H1>
      <Lead>A short label shown on hover or focus. Two or three words, max. If you need more, reach for HoverCard.</Lead>

      <H2 id="basic">Basic tooltip</H2>
      <Preview bg="var(--bg)">
        <TooltipProvider>
          <div style={{ display:"flex", gap:14 }}>
            <Tooltip content="Save changes">
              <Button aria-label="Save" style={{ width:34, height:34, padding:0 }}><Icon name="check" size={14}/></Button>
            </Tooltip>
            <Tooltip content="Copy link">
              <Button aria-label="Copy" style={{ width:34, height:34, padding:0 }}><Icon name="copy" size={14}/></Button>
            </Tooltip>
            <Tooltip content="Open in new tab">
              <Button aria-label="Open" style={{ width:34, height:34, padding:0 }}><Icon name="arrowRight" size={14}/></Button>
            </Tooltip>
          </div>
        </TooltipProvider>
      </Preview>
      <Code language="jsx">{`import { Tooltip, TooltipProvider, Button } from "@monoset/react";

// Wrap your app once
<TooltipProvider>
  <Tooltip content="Save changes">
    <Button aria-label="Save">✓</Button>
  </Tooltip>
</TooltipProvider>`}</Code>
      <P>The <InlineCode>TooltipProvider</InlineCode> belongs at the app root so all tooltips share the same delay timing. Monoset's <InlineCode>MonosetProvider</InlineCode> includes it for you.</P>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"content",    type:"ReactNode",                           default:"—",      desc:"The label text." },
        { name:"children",   type:"ReactElement",                        default:"required", desc:"One trigger element." },
        { name:"side",       type:'"top" | "right" | "bottom" | "left"', default:'"top"',  desc:"Which side of the trigger." },
        { name:"sideOffset", type:"number",                              default:"6",      desc:"Distance from the trigger in pixels." },
        { name:"align",      type:'"start" | "center" | "end"',          default:'"center"', desc:"Alignment relative to the trigger." },
        { name:"delayDuration", type:"number",                           default:"provider", desc:"Delay for this tooltip." },
        { name:"open",       type:"boolean",                              default:"—", desc:"Controlled open state." },
        { name:"onOpenChange", type:"(open: boolean) => void",            default:"—", desc:"Called when visibility changes." },
        { name:"contentProps", type:"object",                             default:"—", desc:"Additional Radix content props and handlers." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  tooltip: PageTooltip,
};
