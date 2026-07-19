/* eslint-disable react-refresh/only-export-components */
import { Button, Checkbox, Popover, PopoverTrigger, PopoverContent } from '@monoset/react';
import { SlidersHorizontal } from 'lucide-react';
import { Code, H1, H2, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/choice-controls.css';
import '@monoset/react/styles/menu.css';
import '@monoset/react/styles/button.css';

function PagePopover() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Popover</H1>
      <Lead>A floating panel anchored to a trigger. Reach for it when content is too much for a Tooltip but not big enough to deserve its own Dialog: inline forms, filter controls, color pickers.</Lead>

      <H2 id="basic">Basic popover</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", minHeight:300, display:"flex", justifyContent:"center", alignItems:"flex-start", paddingTop:8 }}>
          <Popover>
            <PopoverTrigger asChild>
              <Button><SlidersHorizontal size={14}/> Filter</Button>
            </PopoverTrigger>
            <PopoverContent aria-label="Filters">
              <div style={{ minWidth:228, display:"flex", flexDirection:"column", gap:"var(--space-3)" }}>
                <div style={{ fontSize:13, fontWeight:600 }}>Filters</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}>
                  <Checkbox label="Active" defaultChecked/>
                  <Checkbox label="Pending"/>
                  <Checkbox label="Paused"/>
                </div>
                <div style={{ borderTop:"1px solid var(--border-subtle)", margin:"2px -14px 0", paddingTop:10,
                              display:"flex", justifyContent:"flex-end", paddingRight:14 }}>
                  <Button size="sm" variant="primary">Apply</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Preview>
      <Code language="jsx">{`import { Popover, PopoverTrigger, PopoverContent } from "@monoset/react";

<Popover>
  <PopoverTrigger asChild>
    <Button>Filter results</Button>
  </PopoverTrigger>
  <PopoverContent aria-label="Filters">
    <Stack gap={3}>
      <Checkbox label="Active"/>
      <Checkbox label="Pending"/>
      <Checkbox label="Paused"/>
    </Stack>
  </PopoverContent>
</Popover>`}</Code>

      <H2 id="api">API on PopoverContent</H2>
      <PropsTable rows={[
        { name:"side",       type:'"top" | "right" | "bottom" | "left"', default:'"bottom"', desc:"Which side of the trigger to render." },
        { name:"sideOffset", type:"number",                              default:"6",        desc:"Distance from the trigger in pixels." },
        { name:"align",      type:'"start" | "center" | "end"',          default:'"center"', desc:"Alignment relative to the trigger." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  popover: PagePopover,
};
