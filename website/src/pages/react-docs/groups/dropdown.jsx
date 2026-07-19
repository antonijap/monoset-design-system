/* eslint-disable react-refresh/only-export-components */
import { Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@monoset/react';
import { ChevronDown, User, CreditCard, Settings, LogOut } from 'lucide-react';
import { Code, InlineCode, H1, H2, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/menu.css';
import '@monoset/react/styles/button.css';

function PageDropdown() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Dropdown menu</H1>
      <Lead>A vertical list of actions triggered by a button. For navigation use the sidebar instead. DropdownMenu is for actions on a row, a record, or the current view.</Lead>

      <H2 id="basic">Basic menu</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", minHeight:280, display:"flex", justifyContent:"center", alignItems:"flex-start", paddingTop:8 }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Actions <ChevronDown size={14}/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ minWidth:200 }}>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem><User size={15}/> Profile <span className="ms-menu__shortcut">⌘P</span></DropdownMenuItem>
              <DropdownMenuItem><CreditCard size={15}/> Billing</DropdownMenuItem>
              <DropdownMenuItem><Settings size={15}/> Settings <span className="ms-menu__shortcut">⌘,</span></DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem><LogOut size={15}/> Log out <span className="ms-menu__shortcut">⇧⌘Q</span></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Preview>
      <Code language="jsx">{`import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@monoset/react";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuItem><User size={15}/> Profile</DropdownMenuItem>
    <DropdownMenuItem><CreditCard size={15}/> Billing</DropdownMenuItem>
    <DropdownMenuSeparator/>
    <DropdownMenuItem><LogOut size={15}/> Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}</Code>

      <H2 id="vs-popover">DropdownMenu vs Popover</H2>
      <P>If your panel is a list of clickable actions, use <InlineCode>DropdownMenu</InlineCode>. It has the right keyboard semantics (arrow keys, type-ahead, Enter to activate). For a panel containing inputs, sliders, or anything that isn't a menu of actions, use <InlineCode>Popover</InlineCode>.</P>

      <H2 id="choices">Choices and submenus</H2>
      <P>Use checkbox items for independent settings, radio items for one choice from a group, and submenus for a short second level.</P>
      <Code language="jsx">{`<DropdownMenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
  <DropdownMenuItemIndicator>✓</DropdownMenuItemIndicator>
  Grid view
</DropdownMenuCheckboxItem>

<DropdownMenuSub>
  <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>Email</DropdownMenuItem>
    <DropdownMenuItem>Copy link</DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>`}</Code>
    </div>
  );
}

export const PAGES = {
  dropdown: PageDropdown,
};
