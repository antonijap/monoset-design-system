/* eslint-disable react-refresh/only-export-components */
import { AppShell } from '@monoset/react';
import { Code, InlineCode, H1, H2, H3, P, Lead, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/layout.css';

function PageAppShell() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>AppShell</H1>
      <Lead>The shell every dashboard ends up needing: a sidebar, a sticky header, a scrollable content area, and a mobile drawer. Composed from sub-components so you can drop in your own brand and nav items.</Lead>

      <H2 id="basic">Basic structure</H2>
      <P>Five pieces compose the shell: <InlineCode>AppShell</InlineCode> as the root, <InlineCode>AppShell.Sidebar</InlineCode> as the left rail, and <InlineCode>AppShell.Main</InlineCode> wrapping the header and scrollable content.</P>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden", marginBottom:16, height:380 }}>
        <AppShell sidebarWidth={180} style={{ height:"100%" }}>
          <AppShell.Sidebar brand={<strong>Acme</strong>}>
            <AppShell.SidebarGroup label="Main">
              <AppShell.SidebarItem active>Dashboard</AppShell.SidebarItem>
              <AppShell.SidebarItem>Reports</AppShell.SidebarItem>
              <AppShell.SidebarItem>Activity</AppShell.SidebarItem>
            </AppShell.SidebarGroup>
            <AppShell.SidebarGroup label="Settings">
              <AppShell.SidebarItem>Team</AppShell.SidebarItem>
              <AppShell.SidebarItem>Billing</AppShell.SidebarItem>
            </AppShell.SidebarGroup>
          </AppShell.Sidebar>
          <AppShell.Main>
            <AppShell.Header>
              <AppShell.MobileTrigger/>
              <strong>Dashboard</strong>
            </AppShell.Header>
            <AppShell.Content>The content area scrolls independently.</AppShell.Content>
          </AppShell.Main>
        </AppShell>
      </div>
      <Code language="jsx">{`import { AppShell } from "@monoset/react";

function Layout({ children }) {
  return (
    <AppShell>
      <AppShell.Sidebar brand={<strong>Acme</strong>}>
        <AppShell.SidebarGroup label="Main">
          <AppShell.SidebarItem active>Dashboard</AppShell.SidebarItem>
          <AppShell.SidebarItem>Reports</AppShell.SidebarItem>
        </AppShell.SidebarGroup>
        <AppShell.SidebarGroup label="Settings">
          <AppShell.SidebarItem>Team</AppShell.SidebarItem>
          <AppShell.SidebarItem>Billing</AppShell.SidebarItem>
        </AppShell.SidebarGroup>
      </AppShell.Sidebar>

      <AppShell.Main>
        <AppShell.Header>
          <AppShell.MobileTrigger/>
          <h1 style={{ fontSize:14, fontWeight:600 }}>Dashboard</h1>
        </AppShell.Header>
        <AppShell.Content>{children}</AppShell.Content>
      </AppShell.Main>
    </AppShell>
  );
}`}</Code>

      <H2 id="responsive">Responsive behavior</H2>
      <P>Below 768px the sidebar becomes a modal drawer and the hamburger trigger appears. The same sidebar DOM moves between both layouts, so forms and local state are not duplicated.</P>

      <H2 id="route-change">Close after navigation</H2>
      <P>Pass your router's current path as <InlineCode>navigationSignal</InlineCode>. A changed value closes an open mobile drawer and restores focus.</P>
      <Code language="jsx">{`<AppShell navigationSignal={pathname}>
  ...
</AppShell>`}</Code>

      <H2 id="active">Active state</H2>
      <P>Pass <InlineCode>active</InlineCode> on the current page's item. AppShell handles the visual style and sets <InlineCode>aria-current="page"</InlineCode>. You drive the routing.</P>
      <Code language="jsx">{`<AppShell.SidebarItem
  active={path === "/reports"}
  onClick={() => navigate("/reports")}
>
  Reports
</AppShell.SidebarItem>`}</Code>

      <H2 id="icons">Icons</H2>
      <P>Pass any element as the <InlineCode>icon</InlineCode> prop. Lucide icons work well at 15-16px.</P>
      <Code language="jsx">{`import { LayoutDashboard, BarChart3 } from "lucide-react";

<AppShell.SidebarItem icon={<LayoutDashboard size={15}/>}>Dashboard</AppShell.SidebarItem>
<AppShell.SidebarItem icon={<BarChart3 size={15}/>}>Reports</AppShell.SidebarItem>`}</Code>

      <H2 id="footer">Sidebar footer</H2>
      <P>Pass any element as <InlineCode>footer</InlineCode>. It sticks to the bottom of the sidebar with a separator above it.</P>
      <Code language="jsx">{`<AppShell.Sidebar
  brand={<strong>Acme</strong>}
  footer={
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <Avatar name="Ada Turing"/>
      <span style={{ fontSize:12, color:"var(--fg2)" }}>ada@acme.com</span>
    </div>
  }>
  ...
</AppShell.Sidebar>`}</Code>

      <H2 id="sidebar-width">Custom sidebar width</H2>
      <P>The default is 240px. Pass <InlineCode>sidebarWidth</InlineCode> on the root to change it.</P>
      <Code language="jsx">{`<AppShell sidebarWidth={280}>...</AppShell>`}</Code>

      <H2 id="hook">useAppShellMobile</H2>
      <P>Use the hook when a control inside the shell needs to read or change the drawer directly. Prefer <InlineCode>navigationSignal</InlineCode> for route changes.</P>
      <Code language="jsx">{`import { useAppShellMobile } from "@monoset/react";

function CloseDrawerOnRouteChange() {
  const { setOpen } = useAppShellMobile();
  const path = useRouterPath();
  useEffect(() => setOpen(false), [path]);
  return null;
}`}</Code>

      <H2 id="api">API</H2>
      <H3>AppShell</H3>
      <PropsTable rows={[
        { name:"sidebarWidth", type:"number", default:"240", desc:"Sidebar width in pixels." },
        { name:"mobileOpen", type:"boolean", default:"—", desc:"Controlled mobile drawer state." },
        { name:"defaultMobileOpen", type:"boolean", default:"false", desc:"Initial uncontrolled drawer state." },
        { name:"onMobileOpenChange", type:"(open: boolean) => void", default:"—", desc:"Called when the drawer requests a state change." },
        { name:"navigationSignal", type:"string | number", default:"—", desc:"Changing this value closes an open drawer." },
        { name:"className",    type:"string", default:"—",   desc:"Appended to the root grid." },
      ]}/>

      <H3>AppShell.Sidebar</H3>
      <PropsTable rows={[
        { name:"brand",     type:"ReactNode", default:"—", desc:"Block rendered at the top of the sidebar." },
        { name:"footer",    type:"ReactNode", default:"—", desc:"Block rendered at the bottom." },
      ]}/>

      <H3>AppShell.SidebarItem</H3>
      <PropsTable rows={[
        { name:"icon",   type:"ReactNode", default:"—",     desc:"Leading icon." },
        { name:"active", type:"boolean",   default:"false", desc:"Marks the item as the current page." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  appshell: PageAppShell,
};
