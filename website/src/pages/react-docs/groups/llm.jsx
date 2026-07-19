/* eslint-disable react-refresh/only-export-components */
import { Icon, Code, InlineCode, H1, H2, P, Lead, Divider } from '../../../ui/docs.jsx';

function PageLLM() {
  const prompt = `# Monoset data-ms naming prompt

You are refactoring a React codebase built on the Monoset design system
(@monoset/react). Add \`data-ms="<kebab-name>"\` attributes to every
semantically-distinct UI region so designers and AI tools can target them.

## Rules
1. Use kebab-case, namespaced by page or feature (e.g. "dashboard-sidebar",
   "pricing-hero-cta", "settings-theme-row").
2. Tag the OUTERMOST element of each logical region, not every child.
3. Always tag:
   - page hero / header / footer
   - main content containers, sidebars, drawers
   - each card, tile, or list group
   - every CTA button row and primary action
   - form containers and each field group
   - tabs, modals, toasts, menus
4. Do not tag decorative wrappers (motion divs, flex spacers).
5. Preserve existing data-ms attributes. Never rename without asking.
6. Prefer stable names tied to intent ("save-bar", "empty-state")
   over style ("flex-row", "gray-box").

## Output
Return a diff that only adds data-ms attributes. No other changes.

## Example
Before:
  <section className="hero">
    <h1>Welcome</h1>
    <button>Sign up</button>
  </section>

After:
  <section data-ms="landing-hero" className="hero">
    <h1>Welcome</h1>
    <button data-ms="landing-hero-cta">Sign up</button>
  </section>
`;
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>LLM naming prompt</H1>
      <Lead>Paste the prompt below into any coding agent to add stable <InlineCode>data-ms</InlineCode> names to your app. With stable names in place, your Playwright tests, your analytics selectors, and your next design-tool integration stop breaking every time someone renames a className.</Lead>

      <H2 id="why">Why semantic names</H2>
      <P>Class names get renamed when someone reaches for a new CSS framework. Layouts get rewritten when a redesign lands. A <InlineCode>data-ms</InlineCode> named by <em>what the thing is for</em>, rather than how it looks, tends to survive both. Monoset uses this pattern internally: the landing page carries <InlineCode>data-ms="bento-player"</InlineCode> and <InlineCode>data-ms="hero-title"</InlineCode>, which is why the responsive CSS can target them without caring about the markup underneath.</P>

      <H2 id="prompt">The prompt</H2>
      <P>Run it on one page or feature at a time. Whole-app passes tend to produce generic names that all sound the same.</P>
      <Code language="markdown">{prompt}</Code>

      <Divider/>

      <H2 id="conventions">Naming conventions</H2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
        {[
          { good:"dashboard-sidebar", bad:"sidebar-left" },
          { good:"pricing-hero-cta", bad:"big-black-button" },
          { good:"settings-theme-row", bad:"row-3" },
          { good:"empty-state", bad:"placeholder" },
        ].map(row => (
          <div key={row.good} style={{ border:"1px solid var(--border-subtle)", borderRadius:8,
                                        padding:"12px 14px", fontSize:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, color:"var(--fg1)", marginBottom:4 }}>
              <Icon name="check" size={13}/> <code style={{ fontFamily:"var(--font-mono)" }}>{row.good}</code>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, color:"var(--fg4)" }}>
              <Icon name="x" size={13}/> <code style={{ fontFamily:"var(--font-mono)" }}>{row.bad}</code>
            </div>
          </div>
        ))}
      </div>

      <H2 id="inspecting">Using the names</H2>
      <P>Once they're in place, the rest is boring. Any tool that speaks CSS selectors can find what it needs:</P>
      <Code language="javascript">{`// Jump to any region in the DOM
document.querySelector('[data-ms="pricing-hero-cta"]').scrollIntoView();

// Test it in Playwright
await page.locator('[data-ms="save-bar"]').click();

// Override it in CSS
[data-ms="settings-theme-row"] { border-color: var(--accent); }`}</Code>

      <Divider/>

      <H2 id="why-stable">Why design systems need stable selectors</H2>
      <P>Class names are styling concerns. They change when you refactor CSS, swap to Tailwind, or rename a component. IDs are unique but brittle and overloaded (anchor links, ARIA, form controls). Data attributes are the only selector that carries no styling or behavioral meaning, which is exactly what makes them stable across rewrites.</P>
      <P>Three things benefit from stable selectors:</P>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
        {[
          { title:"End-to-end tests", desc:"Playwright and Cypress tests that use data-ms selectors survive redesigns. No more updating 200 test files because someone renamed a CSS class." },
          { title:"Analytics and tracking", desc:"Product analytics that track clicks on data-ms regions stay accurate across deploys. No more phantom events from renamed selectors." },
          { title:"AI and design tools", desc:"Coding agents, design tools, and scrapers that reference UI regions by data-ms can target elements without understanding the CSS or component tree." },
        ].map(item => (
          <div key={item.title} style={{ padding:"12px 14px", border:"1px solid var(--border-subtle)", borderRadius:6 }}>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>{item.title}</div>
            <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.6 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H2 id="component-naming">Component-specific conventions</H2>
      <P>Different UI patterns need different naming strategies. Here's what works for common Monoset patterns:</P>
      <Code language="markdown">{`# Tables
data-ms="users-table"           # the table wrapper
data-ms="users-table-header"    # the thead
data-ms="users-table-row"       # each tbody tr (use with nth-child or data-id)
data-ms="users-table-actions"   # bulk action bar

# Forms
data-ms="settings-form"         # the form element
data-ms="settings-form-email"   # a specific field group
data-ms="settings-form-submit"  # the submit button

# Navigation
data-ms="sidebar"               # the sidebar container
data-ms="sidebar-nav"           # the nav element
data-ms="sidebar-nav-item"      # each nav link
data-ms="topbar"                # the header bar
data-ms="topbar-search"         # the search input

# Modals and overlays
data-ms="delete-dialog"         # the dialog
data-ms="delete-dialog-confirm" # the confirm button
data-ms="toast-container"       # the toast stack`}</Code>

      <H2 id="playwright">Playwright test example</H2>
      <P>A complete Playwright test that uses data-ms selectors. No fragile class names, no text matchers that break with copy changes.</P>
      <Code language="typescript">{`import { test, expect } from "@playwright/test";

test("admin can update user role", async ({ page }) => {
  await page.goto("/admin/users");

  // Filter to the target user
  const search = page.locator('[data-ms="users-table"] input');
  await search.fill("ada@monoset.dev");

  // Open the row actions
  const row = page.locator('[data-ms="users-table-row"]').first();
  await expect(row).toContainText("Ada Turing");
  await row.locator('[data-ms="row-actions"]').click();

  // Change role
  await page.locator('[data-ms="role-select"]').click();
  await page.locator('[data-ms="role-option-admin"]').click();

  // Verify the toast
  const toast = page.locator('[data-ms="toast-container"]');
  await expect(toast).toContainText("Role updated");
});`}</Code>

      <H2 id="ai-tools">Using with AI coding tools</H2>
      <P>When your codebase has data-ms attributes, AI tools like Cursor, Copilot, and Claude Code can reference UI regions by name instead of guessing at the DOM structure. This makes prompts like "add a loading state to the users-table" unambiguous.</P>
      <P>Add a note to your project's AI instructions (CLAUDE.md, .cursorrules, etc.):</P>
      <Code language="markdown">{`# UI selectors
This codebase uses data-ms attributes for stable UI region targeting.
When referencing UI elements in code, tests, or analytics, always use
data-ms selectors: document.querySelector('[data-ms="region-name"]')

Never target by className, id, or text content for test or tracking purposes.`}</Code>
    </div>
  );
}

export const PAGES = {
  llm: PageLLM,
};
