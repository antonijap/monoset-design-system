/* eslint-disable react-refresh/only-export-components */
import { Icon, Code, InlineCode, H1, H2, P, Lead, Divider } from '../../../ui/docs.jsx';

function PageA11yGuide() {
  const checks = [
    { title: "Keyboard behavior", desc: "Native controls, Radix, React Aria, and Monoset's custom controls provide their documented keyboard behavior. Test the composed page because wrappers and event handlers can still interfere." },
    { title: "Focus indicators", desc: "Component styles include focus-visible treatment. Check it again after adding application styles and custom themes." },
    { title: "Screen reader semantics", desc: "Components provide roles and relationships where the API has enough context. You still need useful labels, descriptions, headings, and status text." },
    { title: "Color contrast", desc: "The default semantic tokens are designed for readable UI. Recheck contrast after overriding tokens or placing text on custom surfaces." },
    { title: "Reduced motion", desc: "MonosetProvider sets Framer Motion to follow the user preference. Components with movement also include targeted reduced-motion behavior. Unrelated application CSS is not changed." },
    { title: "Form errors", desc: "The Field component wires aria-describedby to the error message and sets aria-invalid on the input when an error is present." },
  ];

  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>Accessibility checklist</H1>
      <Lead>Monoset supplies component-level behavior, not a blanket guarantee for the finished page. This checklist separates what the package implements from what your application must provide and verify.</Lead>

      <H2 id="built-in">What Monoset handles</H2>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
        {checks.map(c => (
          <div key={c.title} style={{ display:"flex", gap:12, alignItems:"flex-start",
                                       border:"1px solid var(--border-subtle)", borderRadius:8, padding:"14px 16px" }}>
            <div style={{ width:22, height:22, borderRadius:6, background:"var(--bg-muted)",
                          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
              <Icon name="check" size={13} style={{ color:"var(--fg1)" }}/>
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, marginBottom:3 }}>{c.title}</div>
              <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.6 }}>{c.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Divider/>

      <H2 id="testing">Testing with axe</H2>
      <P>Use <InlineCode>vitest-axe</InlineCode> to catch regressions in your own pages. The test below checks that a rendered settings page has no accessibility violations.</P>
      <Code language="jsx" filename="settings.a11y.test.tsx">{`import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "vitest-axe";
import { expect, test } from "vitest";
import SettingsPage from "./SettingsPage";

expect.extend(toHaveNoViolations);

test("settings page has no a11y violations", async () => {
  const { container } = render(<SettingsPage />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});`}</Code>

      <Divider/>

      <H2 id="your-job">What you need to add</H2>
      <P>Test with a keyboard and a screen reader before shipping. Page content and application composition are still your responsibility:</P>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
        {[
          "Add alt text to all images and icons that convey meaning.",
          "Use heading levels (h1, h2, h3) in order. Don't skip from h1 to h3.",
          "Add a skip-to-content link at the top of each page.",
          "Set the page lang attribute on your <html> element.",
          "Test with a real screen reader (VoiceOver, NVDA) at least once before shipping.",
          "Ensure custom interactive elements outside Monoset have proper roles and labels.",
        ].map(item => (
          <div key={item} style={{ display:"flex", gap:10, alignItems:"flex-start", fontSize:13, color:"var(--fg2)", lineHeight:1.6 }}>
            <span style={{ color:"var(--fg3)", flexShrink:0 }}>-</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export const PAGES = {
  a11y: PageA11yGuide,
};
