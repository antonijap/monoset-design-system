/* eslint-disable react-refresh/only-export-components */
import { Breadcrumb } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/breadcrumb.css';


function PageBreadcrumb() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Breadcrumb</H1>
      <Lead>Show where the current page sits in the hierarchy. Two levels deep is fine, four is a smell. If you need that many, the navigation is too nested.</Lead>

      <H2 id="basic">Basic breadcrumb</H2>
      <Preview bg="var(--bg)">
        <Breadcrumb
          items={[
            { label: "Home",     href: "#" },
            { label: "Projects", href: "#" },
            { label: "Monoset" },
          ]}
        />
      </Preview>
      <Code language="jsx">{`import { Breadcrumb } from "@monoset/react";

<Breadcrumb
  items={[
    { label: "Home",     href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Monoset" },
  ]}
/>`}</Code>
      <P>The last item without an <InlineCode>href</InlineCode> is treated as the current page.</P>
    </div>
  );
}

export const PAGES = {
  breadcrumb: PageBreadcrumb,
};
