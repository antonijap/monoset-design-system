/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, P, Lead, Divider } from '../../../ui/docs.jsx';

function PageNextjsGuide() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>Using with Next.js</H1>
      <Lead>Set up Monoset with the App Router or Pages Router. A short Remix example follows.</Lead>

      <H2 id="install">Installation</H2>
      <Code filename="terminal">{`npm install @monoset/tokens @monoset/react`}</Code>

      <H2 id="app-router">App Router setup</H2>
      <P>Keep the root layout as a Server Component. Import the styles there, then pass the page through a small client provider.</P>
      <Code language="tsx" filename="app/layout.tsx">{`import "@monoset/tokens/css";
import "@monoset/react/styles.css";
import type { ReactNode } from "react";
import { Providers } from "./providers";

export const metadata = {
  title: "My App",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`}</Code>
      <Code language="tsx" filename="app/providers.tsx">{`"use client";

import { MonosetProvider } from "@monoset/react";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MonosetProvider theme={{ initialTheme: "system" }}>
      {children}
    </MonosetProvider>
  );
}`}</Code>

      <Divider/>

      <H2 id="pages-router">Pages Router setup</H2>
      <P>For the Pages Router, put the same styles and provider in <InlineCode>_app.tsx</InlineCode>. Pages Router does not use the App Router's <InlineCode>"use client"</InlineCode> directive.</P>
      <Code language="tsx" filename="pages/_app.tsx">{`import type { AppProps } from "next/app";
import "@monoset/tokens/css";
import "@monoset/react/styles.css";
import { MonosetProvider } from "@monoset/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MonosetProvider theme={{ initialTheme: "system" }}>
      <Component {...pageProps} />
    </MonosetProvider>
  );
}`}</Code>

      <Divider/>

      <H2 id="server-components">Server Components</H2>
      <P>Render components that use hooks, browser APIs, or event handlers from a client component. Keep the boundary around the interactive part of the page.</P>
      <P>Layout primitives like <InlineCode>Container</InlineCode>, <InlineCode>Stack</InlineCode>, and <InlineCode>Card</InlineCode> are plain HTML wrappers with no interactivity. You can render them in Server Components without a client boundary.</P>
      <Code language="tsx" filename="app/dashboard/page.tsx">{`// This is a Server Component (no "use client")
import { Container, Stack, Card } from "@monoset/react";
import { DashboardControls } from "./controls"; // client component

export default function DashboardPage() {
  return (
    <Container size="lg">
      <Stack gap={24}>
        <Card>
          <h2>Overview</h2>
          <p>Server-rendered content here.</p>
        </Card>
        <DashboardControls />
      </Stack>
    </Container>
  );
}`}</Code>

      <Divider/>

      <H2 id="remix">With Remix</H2>
      <P>Remix uses a similar pattern. Import the CSS in your root route and wrap the <InlineCode>Outlet</InlineCode> with the provider.</P>
      <Code language="tsx" filename="app/root.tsx">{`import "@monoset/tokens/css";
import "@monoset/react/styles.css";
import { MonosetProvider } from "@monoset/react";
import {
  Links, Meta, Outlet, Scripts, ScrollRestoration,
} from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MonosetProvider theme={{ initialTheme: "system" }}>
          <Outlet />
        </MonosetProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}`}</Code>
    </div>
  );
}

export const PAGES = {
  nextjs: PageNextjsGuide,
};
