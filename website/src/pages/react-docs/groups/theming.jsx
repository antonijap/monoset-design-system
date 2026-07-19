/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, H3, P, Lead, Divider } from '../../../ui/docs.jsx';

function PageThemeGuide() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>Theming Monoset</H1>
      <Lead>Monoset ships light and dark modes, scoped theme overrides, and a single accent channel you can swap in one line of CSS.</Lead>

      <H2 id="dark-mode">How dark mode works</H2>
      <P>Monoset flips the entire neutral ramp when the root element carries <InlineCode>data-monoset-theme="dark"</InlineCode> or the <InlineCode>.monoset-dark</InlineCode> class. Every semantic token (--bg, --fg1, --border, etc.) re-maps automatically. No extra imports, no separate stylesheet.</P>

      <H3 id="theme-provider">Setting up ThemeProvider</H3>
      <P>Wrap your app in <InlineCode>MonosetProvider</InlineCode> and pass your default theme. The provider reads the user's system preference on first load and syncs it to localStorage.</P>
      <Code language="jsx" filename="App.tsx">{`import { MonosetProvider } from "@monoset/react";
import "@monoset/tokens/css";
import "@monoset/react/styles.css";

export default function App({ children }) {
  return (
    <MonosetProvider theme={{ initialTheme: "system" }}>
      {children}
    </MonosetProvider>
  );
}`}</Code>

      <H3 id="use-theme">Using the useTheme hook</H3>
      <P>Read and set the current theme from anywhere inside the provider tree.</P>
      <Code language="jsx" filename="ThemeStatus.tsx">{`import { useTheme } from "@monoset/react";

function ThemeStatus() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <p>
      Current: {resolvedTheme} (preference: {theme})
      <button onClick={() => setTheme("dark")}>Go dark</button>
    </p>
  );
}`}</Code>

      <H3 id="theme-toggle">ThemeToggle component</H3>
      <P>Drop in the built-in toggle for a sun/moon switch that works out of the box.</P>
      <Code language="jsx">{`import { ThemeToggle } from "@monoset/react";

// Renders a button that cycles light / dark / system
<ThemeToggle />`}</Code>

      <Divider/>

      <H2 id="scoped">Scoped dark mode</H2>
      <P>You can force dark mode on a single container without touching the rest of the page. Add the <InlineCode>.monoset-dark</InlineCode> class to any element, and every Monoset token inside it flips.</P>
      <Code language="jsx" filename="DarkCard.tsx">{`function DarkCard() {
  return (
    <div className="monoset-dark" style={{
      background: "var(--bg)",
      color: "var(--fg1)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      padding: 24,
    }}>
      <h3>This card is always dark</h3>
      <p style={{ color: "var(--fg2)" }}>
        The rest of the page stays in whatever theme the user chose.
      </p>
    </div>
  );
}`}</Code>

      <Divider/>

      <H2 id="accent">Customizing the accent</H2>
      <P>Monoset uses three CSS custom properties for the accent color channel: <InlineCode>--accent</InlineCode>, <InlineCode>--accent-fg</InlineCode>, and <InlineCode>--accent-hover</InlineCode>. Override them at any scope to swap the brand color without rebuilding anything.</P>
      <Code language="css" filename="brand.css">{`:root {
  --accent: #2563eb;
  --accent-fg: #ffffff;
  --accent-hover: #1d4ed8;
}

/* Dark mode gets its own values if needed */
.monoset-dark,
[data-monoset-theme="dark"] {
  --accent: #3b82f6;
  --accent-fg: #ffffff;
  --accent-hover: #60a5fa;
}`}</Code>
      <P>Every Monoset component that uses accent (primary buttons, focused inputs, active tabs) picks up the new values automatically.</P>
    </div>
  );
}

export const PAGES = {
  theming: PageThemeGuide,
};
