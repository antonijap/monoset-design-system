/* eslint-disable react-refresh/only-export-components */
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '@monoset/react';
import { Code, InlineCode, H1, H2, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/menu.css';


function PageContextMenu() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Context menu</H1>
      <Lead>Right-click menu. Use it for row actions in tables, file lists, or any contextual operation that doesn't deserve a dedicated button. Built on Radix's <InlineCode>ContextMenu</InlineCode> primitive.</Lead>

      <H2 id="basic">Basic</H2>
      <Preview bg="var(--bg)">
        <ContextMenu>
          <ContextMenuTrigger>
            <div tabIndex={0} style={{ padding:"24px 32px", border:"1px dashed var(--border)", borderRadius:8, color:"var(--fg2)", fontSize:13 }}>
              Right-click me
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Edit</ContextMenuItem>
            <ContextMenuItem>Duplicate</ContextMenuItem>
            <ContextMenuSeparator/>
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Preview>
      <Code language="jsx">{`<ContextMenu>
  <ContextMenuTrigger>
    <Row tabIndex={0}/>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onSelect={edit}>Edit</ContextMenuItem>
    <ContextMenuItem onSelect={duplicate}>Duplicate</ContextMenuItem>
    <ContextMenuSeparator/>
    <ContextMenuItem onSelect={remove}>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}</Code>
    </div>
  );
}

export const PAGES = {
  contextmenu: PageContextMenu,
};
