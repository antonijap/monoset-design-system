import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import { PAGE_META } from "../pages/docs-meta.js";
import { NAV, NATIVE_NAV } from "../pages/docs-navigation.js";
import { REACT_DOC_ROUTES } from "../pages/react-docs/routes.js";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

const groupSources = [...new Set(Object.values(REACT_DOC_ROUTES))].map((modulePath) =>
  read(`../pages/react-docs/${modulePath.slice(2)}`),
);
const docs = groupSources.join("\n");
const shell = read("../pages/DocsShell.jsx");
const versionSource = read("../version.js");
const nativeDocs = read("../pages/native-docs.jsx");
const nativeMeta = read("../pages/native-meta.js");
const docsMeta = read("../pages/docs-meta.js");
const indexCss = read("../index.css");
const searchIndex = JSON.parse(read("../../public/search-index.json"));
const landing = read("../pages/Landing.jsx");
const themeToggle = read("../components/ThemeToggle.jsx");
const websiteIndex = read("../../index.html");
const rootReadme = read("../../../README.md");
const reactReadme = read("../../../packages/react/README.md");
const mcpComponents = JSON.parse(read("../../../packages/mcp-server/data/components.json"));
const websitePackage = JSON.parse(read("../../package.json"));
const reactPackage = JSON.parse(read("../../../packages/react/package.json"));
const nativePackage = JSON.parse(read("../../../packages/native/package.json"));
const workspaceLock = read("../../../pnpm-lock.yaml");
const docsUi = read("../ui/docs.jsx");
const publicReactDocs = [docs, landing, rootReadme, reactReadme].join("\n");
const playground = read(`../pages/react-docs/${REACT_DOC_ROUTES.playground.slice(2)}`);
const playgroundCssUrl = new URL("../pages/react-docs/groups/playground.css", import.meta.url);
const playgroundCss = existsSync(playgroundCssUrl) ? readFileSync(playgroundCssUrl, "utf8") : "";
const clipboardHookUrl = new URL("../ui/useClipboardCopy.js", import.meta.url);
const clipboardHook = existsSync(clipboardHookUrl) ? readFileSync(clipboardHookUrl, "utf8") : "";
const rootHeroUrl = new URL("../../../assets/hero.png", import.meta.url);
const rootOgUrl = new URL("../../../assets/og.png", import.meta.url);
const canonicalHeroUrl = new URL("../../public/assets/hero.png", import.meta.url);
const canonicalOgUrl = new URL("../../public/assets/og.png", import.meta.url);
const reactDocsSource = (path) => read(`../pages/react-docs/${path}`);
const reactDocsRoot = new URL("../pages/react-docs/", import.meta.url);
const allReactDocsModules = readdirSync(reactDocsRoot, { recursive: true })
  .filter((path) => path.endsWith(".jsx"))
  .map((path) => readFileSync(new URL(path, reactDocsRoot), "utf8"))
  .join("\n");
const inputStyleOwners = {
  "groups/password.jsx": ["input.css", "password-input.css"],
  "groups/fileupload.jsx": ["file-upload.css"],
  "groups/pininput.jsx": ["pin-input.css"],
  "demos/combobox.jsx": ["combobox.css"],
  "demos/multicombobox.jsx": ["combobox.css", "multi-combobox.css"],
  "demos/datepicker.jsx": ["date-picker.css", "calendar.css"],
  "demos/calendar.jsx": ["calendar.css"],
  "demos/numberinput.jsx": ["number-input.css"],
};

const primitiveStyleOwners = {
  "groups/alerts.jsx": ["alert.css", "button.css"],
  "groups/command.jsx": ["command.css", "button.css"],
  "groups/dialog.jsx": ["dialog.css", "button.css"],
  "groups/dropdown.jsx": ["menu.css", "button.css"],
  "groups/empty.jsx": ["empty.css", "button.css"],
  "groups/hovercard.jsx": ["hover-card.css", "avatar.css"],
  "groups/inputs.jsx": ["field.css", "input.css"],
  "groups/popover.jsx": ["choice-controls.css", "menu.css", "button.css"],
  "groups/progress.jsx": ["progress.css", "button.css", "layout.css"],
  "groups/select.jsx": ["select.css", "kbd.css", "menu.css", "field.css"],
  "groups/sheet.jsx": ["sheet.css", "button.css", "input.css"],
  "groups/spinner.jsx": ["spinner.css", "button.css"],
  "groups/tooltip.jsx": ["menu.css", "button.css"],
  "groups/usage.jsx": ["button.css", "badge.css", "field.css", "input.css", "card.css"],
};

function reactStyleImports(source) {
  return [...source.matchAll(/import ['"]@monoset\/react\/styles\/([^'"]+\.css)['"];?/g)]
    .map(([, fileName]) => fileName);
}

function functionSource(name) {
  const start = docs.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} must exist`);
  const bodyStart = docs.indexOf("{", docs.indexOf(")", start));
  let depth = 0;
  for (let index = bodyStart; index < docs.length; index += 1) {
    if (docs[index] === "{") depth += 1;
    if (docs[index] === "}") depth -= 1;
    if (depth === 0) return docs.slice(start, index + 1);
  }
  throw new Error(`${name} has no complete function body`);
}

const introduction = functionSource("PageIntroduction");
const sidebar = shell.slice(
  shell.indexOf("function Sidebar"),
  shell.indexOf("function PlatformToggle"),
);
const pages = groupSources.map((source) => source.slice(source.indexOf("export const PAGES ="))).join("\n");

test("React docs use canonical install and stylesheet paths", () => {
  assert.doesNotMatch(publicReactDocs, /npm install monoset(?:\s|`|"|$)/);
  assert.doesNotMatch(publicReactDocs, /@monoset\/tokens\/monoset\.css/);
  assert.match(docs, /npm install @monoset\/react @monoset\/tokens/);
  assert.match(docs, /@monoset\/tokens\/css/);
  assert.match(docs, /@monoset\/react\/styles\.css/);
});

test("motion helpers are documented from the React motion subpath", () => {
  assert.match(docs, /from ["']@monoset\/react\/motion["']/);
  assert.match(reactReadme, /@monoset\/react\/motion/);
  assert.doesNotMatch(docs, /filename="motion-presets\.js"/);
  assert.doesNotMatch(`${docs}\n${reactReadme}`, /<Reveal\s+variants=/);
  assert.match(`${docs}\n${reactReadme}`, /<Reveal\s+variant={fadeUp}>/);
});

test("component previews use the package components instead of demo replicas", () => {
  assert.doesNotMatch(docs, /\bDemoButton\b/);
  assert.doesNotMatch(docs, /\bDemoBadge\b/);

  const usage = functionSource("PageUsage");
  assert.doesNotMatch(usage, /<(?:input|textarea)\b/);
  assert.match(usage, /<Field label="Email"/);
  assert.match(usage, /<Button variant="primary"/);

  const inputs = functionSource("PageInputs");
  assert.doesNotMatch(inputs, /<(?:input|textarea)\b/);
  assert.match(inputs, /<Field label="Email"/);
  assert.match(inputs, /<Textarea/);
});

test("the landing page uses honest v1 and typography copy", () => {
  assert.doesNotMatch(landing, /v1\.2\.0|Shipped last 30 days|4 releases/);
  assert.match(landing, /Example interface/);
  assert.doesNotMatch(landing, /one typeface/i);
  assert.match(landing, /A minimal, monotone React system built on one neutral ramp\. Finished behavior without a house style\./);
  assert.doesNotMatch(landing, /No opinions supplied/);
  assert.match(landing, /Brand-neutral by design/);
  assert.doesNotMatch(landing, /Every surface, keyboard-first/);
});

test("public React and Native versions come from their exact package versions", () => {
  assert.match(versionSource, /import reactPkg from "\.\.\/\.\.\/packages\/react\/package\.json"/);
  assert.match(versionSource, /import nativePkg from "\.\.\/\.\.\/packages\/native\/package\.json"/);
  assert.match(versionSource, /export const REACT_VERSION = `v\$\{reactPkg\.version\}`/);
  assert.match(versionSource, /export const NATIVE_VERSION = `v\$\{nativePkg\.version\}`/);
  assert.equal(`v${reactPackage.version}`, "v1.0.1");
  assert.equal(`v${nativePackage.version}`, "v0.4.0");
});

test("the docs badge routes each platform to its exact npm package", () => {
  assert.match(shell, /isNative\s*\?\s*NATIVE_VERSION\s*:\s*REACT_VERSION/);
  assert.match(shell, /isNative\s*\?\s*["']https:\/\/www\.npmjs\.com\/package\/@monoset\/native["']/);
  assert.match(shell, /:\s*["']https:\/\/www\.npmjs\.com\/package\/@monoset\/react["']/);
  assert.doesNotMatch(shell, /github\.com\/antonijap\/monoset-design-system\/releases/);
});

test("rendered docs use exact package versions without stale release labels", () => {
  assert.doesNotMatch(allReactDocsModules, /v1\.0(?!\.0)/);
  assert.match(reactDocsSource("groups/layout.jsx"), /<Badge>\$\{REACT_VERSION\}<\/Badge>/);
  assert.doesNotMatch(`${shell}\n${nativeDocs}`, /v0\.1|v1\.2\.0/);
  assert.doesNotMatch(`${docsMeta}\n${nativeMeta}\n${nativeDocs}`, /v0\.[0-9]/);
});

test("the README uses canonical website marketing images without root duplicates", () => {
  assert.match(rootReadme, /\.\/website\/public\/assets\/hero\.png/);
  assert.doesNotMatch(rootReadme, /\.\/assets\/hero\.png/);
  assert.equal(existsSync(canonicalHeroUrl), true);
  assert.equal(existsSync(canonicalOgUrl), true);
  assert.equal(existsSync(rootHeroUrl), false);
  assert.equal(existsSync(rootOgUrl), false);
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  assert.deepEqual(readFileSync(canonicalHeroUrl).subarray(0, 8), pngSignature);
  assert.deepEqual(readFileSync(canonicalOgUrl).subarray(0, 8), pngSignature);
});

test("landing interactions use semantic controls and awaited clipboard feedback", () => {
  assert.doesNotMatch(landing, /<(?:motion\.)?(?:div|span)[^>]*\bonClick=/);
  assert.match(landing, /data-ms="bento-colors-swatches"[\s\S]*?<button[^>]*aria-label=/);
  assert.match(landing, /<button[^>]*aria-pressed=\{active === `--mono-\$\{n\}`\}/);
  assert.match(landing, /data-ms="install-copy"/);
  assert.match(landing, /useClipboardCopy\(cmd\)/);
  assert.match(landing, /copyStatus === "failed"[\s\S]*?Copy failed/);
  assert.match(landing, /aria-live="polite"/);
  assert.doesNotMatch(landing, /navigator\.clipboard/);
});

test("input docs load only their component-owned CSS dependencies", () => {
  for (const [path, expected] of Object.entries(inputStyleOwners)) {
    assert.deepEqual(reactStyleImports(reactDocsSource(path)), expected, path);
  }

  assert.deepEqual(reactStyleImports(reactDocsSource("groups/inputs.jsx")), ["field.css", "input.css"]);
  assert.doesNotMatch(
    Object.keys(inputStyleOwners).map(reactDocsSource).join("\n"),
    /@monoset\/react\/styles\/inputs\.css/,
  );
});

test("React docs never load the broad primitive compatibility bundle", () => {
  assert.doesNotMatch(
    allReactDocsModules,
    /@monoset\/react\/styles\/primitives\.css/,
  );
});

test("compound and support routes load their exact primitive style owners", () => {
  for (const [path, expected] of Object.entries(primitiveStyleOwners)) {
    assert.deepEqual(reactStyleImports(reactDocsSource(path)), expected, path);
  }
});

test("Dialog and Sheet previews do not load the full layout family for Stack wrappers", () => {
  for (const path of ["groups/dialog.jsx", "groups/sheet.jsx"]) {
    const source = reactDocsSource(path);
    const header = source.slice(0, source.indexOf("function Page"));

    assert.doesNotMatch(header, /\bStack\b/, path);
    assert.doesNotMatch(header, /@monoset\/react\/styles\/layout\.css/, path);
  }
});

test("PasswordInput docs include the shared input styles", () => {
  const source = reactDocsSource("groups/password.jsx");

  assert.match(source, /@monoset\/react\/styles\/input\.css/);
  assert.match(source, /@monoset\/react\/styles\/password-input\.css/);
});

test("Field examples use supported direct controls and compound control props", () => {
  assert.match(docs, /<Field label="Email"[\s\S]*?<Input[\s\S]*?<\/Field>/);
  assert.match(docs, /<Field\.Control>[\s\S]*?<SelectTrigger[\s\S]*?<\/Field\.Control>/);
  assert.doesNotMatch(docs, /import[^;\n]*useMonosetForm|<Form\b/);
  assert.doesNotMatch(docs, /\bCard(?:Header|Title|Content)\b/);
  assert.doesNotMatch(docs, /<MonosetProvider\s+defaultTheme=/);
  assert.doesNotMatch(docs, /<Badge[^>]*\bdot\b/);
});

test("Table sorting examples use the v1 TableHeader contract", () => {
  assert.doesNotMatch(publicReactDocs, /<TableHeader[^>]*\bsorted=/);
  assert.match(docs, /<TableHeader[^>]*\bsortable[^>]*\bsortDirection=/);
});

test("Tabs docs reserve segmented choices for ToggleGroup", () => {
  assert.doesNotMatch(publicReactDocs, /segmented tabs/i);
  assert.match(
    docs,
    /<InlineCode>Tabs<\/InlineCode> ships one underline treatment\. Use <InlineCode>ToggleGroup<\/InlineCode> for a compact segmented choice/,
  );
  assert.match(
    reactReadme,
    /`Tabs` ships the underline treatment\. Use `ToggleGroup` for a segmented choice\./,
  );
  assert.equal(
    mcpComponents.find(({ name }) => name === "Tabs")?.description,
    "Underline tabs for switching between related panels.",
  );
});

test("the documentation sidebar exposes real navigation semantics", () => {
  assert.match(shell, /<nav[^>]*aria-label="Documentation"/);
  assert.ok(shell.includes('href={`/${item.id}`}'));
  assert.match(shell, /<a[^>]*aria-current=/);
  assert.match(shell, /type="button"[^>]*aria-label="Close documentation navigation"/);
  assert.match(shell, /type="button"[^>]*aria-label="Open documentation navigation"/);
  assert.doesNotMatch(docs, /<span[^>]*onClick[^>]*setPage/);
  assert.ok(docs.includes('href={`/${link.page}`}'));
  assert.match(docs, /setPage\(link\.page\)/);
});

test("React density is compact without changing Native desktop or mobile tap targets", () => {
  assert.match(indexCss, /\.ms-docs-layout__body\s*\{[^}]*grid-template-columns:\s*260px 1fr;/);
  assert.match(indexCss, /\.ms-docs-layout__body--compact\s*\{[^}]*grid-template-columns:\s*232px 1fr;/);
  assert.match(indexCss, /\.ms-docs-nav\s*\{[^}]*padding:\s*16px 0;/);
  assert.match(indexCss, /\.ms-docs-nav__group\s*\{[^}]*padding:\s*12px 12px 4px;/);
  assert.match(indexCss, /\.ms-docs-nav__item\s*\{[^}]*padding:\s*7px 10px;[^}]*font-size:\s*13px;/);
  assert.match(indexCss, /\.ms-docs-nav--compact\s*\{[^}]*padding:\s*8px 0;/);
  assert.match(indexCss, /\.ms-docs-nav--compact \.ms-docs-nav__item\s*\{[^}]*padding:\s*5px 8px;[^}]*font-size:\s*12px;/);
  assert.match(indexCss, /\.ms-docs-nav--mobile \.ms-docs-nav__item\s*\{[^}]*min-height:\s*44px;/);
  assert.ok(shell.includes("compact={!isNative} nav={nav}"));
  assert.ok(shell.includes("mobile onClose={() => setMobileNavOpen(false)} nav={nav}"));
});

test("React tools and guides keep the v1 navigation hierarchy", () => {
  const ids = (nav, section) => nav.find((group) => group.section === section).items.map((item) => item.id);
  assert.deepEqual(ids(NAV, "Tools"), ["cli", "playground", "llm"]);
  assert.deepEqual(ids(NAV, "Guides"), ["theming", "a11y", "mcp", "nextjs"]);
  assert.ok(NATIVE_NAV.length > 0);
  for (const id of ["settings", "dashboard", "datatable"]) {
    assert.ok(PAGE_META[id]);
    assert.match(pages, new RegExp(`\\b${id}:\\s*Page`));
  }
});

test("the Next.js App Router guide keeps the server and client files separate", () => {
  const nextjs = reactDocsSource("groups/nextjs.jsx");
  const layout = nextjs.slice(
    nextjs.indexOf('filename="app/layout.tsx"'),
    nextjs.indexOf('filename="app/providers.tsx"'),
  );
  const providers = nextjs.slice(nextjs.indexOf('filename="app/providers.tsx"'));

  assert.match(layout, /import \{ Providers \} from "\.\/providers";/);
  assert.doesNotMatch(layout, /"use client"/);
  assert.doesNotMatch(layout, /import \{ MonosetProvider \}/);
  assert.match(providers, /\{`"use client";\n\nimport \{ MonosetProvider \}/);
});

test("the MCP guide describes the bundled lookup data without accuracy guarantees", () => {
  const mcp = reactDocsSource("groups/mcp.jsx");

  assert.match(mcp, /import path, optional example, and docs link/);
  assert.match(mcp, /Returns the value and type for one dotted token name/);
  assert.doesNotMatch(mcp, /props, usage example/);
  assert.doesNotMatch(mcp, /writes correct code the first time|no hallucination|No guessing/i);
  assert.doesNotMatch(mcp, /same knowledge a human developer gets|always knows what props are available/i);
});

test("the CLI guide limits source copying to its current registry", () => {
  const cli = reactDocsSource("groups/cli.jsx");

  assert.match(cli, /supported source groups/);
  assert.match(cli, /Run <InlineCode>monoset list<\/InlineCode>/);
  assert.doesNotMatch(cli, /extracts? the relevant CSS|CSS is extracted/i);
  assert.doesNotMatch(cli, /Each component is a single|wraps a Radix primitive/i);
  assert.doesNotMatch(cli, /stay up to date by re-running/i);
});

test("the Playground workspace becomes one column on narrow screens", () => {
  assert.match(playground, /data-ms="playground-workspace"/);
  assert.match(playground, /data-ms="playground-controls"/);
  assert.match(playground, /className="ms-pg-w"/);
  assert.doesNotMatch(playground, /gridTemplateColumns/);
  assert.doesNotMatch(playground, /borderLeft/);
  assert.match(playground, /import ['"]\.\/playground\.css['"]/);
  assert.doesNotMatch(indexCss, /\.ms-pg-(?:w|p|c|a)/);
  assert.match(
    playgroundCss,
    /\.ms-pg-w\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\) 280px;/,
  );
  assert.match(
    playgroundCss,
    /@media \(max-width: 768px\)[\s\S]*?\.ms-pg-w\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\);/,
  );
  assert.match(
    playgroundCss,
    /@media \(max-width: 768px\)[\s\S]*?\.ms-pg-c\s*\{[^}]*border-left:\s*0;[^}]*border-top:\s*1px solid var\(--border-subtle\);/,
  );
});

test("the Playground reset and copy actions restore a keyboard focus ring", () => {
  assert.equal(playground.match(/data-ms="playground-action"/g)?.length, 2);
  assert.equal(playground.match(/className="ms-pg-a"/g)?.length, 2);
  assert.match(
    playgroundCss,
    /\.ms-pg-a:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--ring\);[^}]*outline-offset:\s*2px;/,
  );
});

test("copy controls announce awaited success and clipboard failure", () => {
  assert.match(docsUi, /useClipboardCopy/);
  assert.match(playground, /useClipboardCopy/);
  assert.match(clipboardHook, /await copyText\(text\)/);
  assert.match(clipboardHook, /setTimeout\([^]*?setCopyStatus\(['"]idle['"]\)/);

  for (const source of [docsUi, playground]) {
    assert.doesNotMatch(source, /navigator\.clipboard/);
    assert.match(source, /aria-live="polite"/);
    assert.match(source, /Copy failed/);
  }
});

test("every native Playground control is named by its visible field label", () => {
  const fieldStart = playground.indexOf("function PlaygroundField");
  const fieldEnd = playground.indexOf("function generateCode", fieldStart);
  const field = playground.slice(fieldStart, fieldEnd);

  assert.match(field, /<label[^>]*>[\s\S]*?<span[^>]*>\{label\}<\/span>[\s\S]*?\{children\}[\s\S]*?<\/label>/);
  assert.doesNotMatch(field, /<div[^>]*>[\s\S]*?<label/);
});

test("code blocks stay plain and do not auto-load a runtime highlighter", () => {
  assert.doesNotMatch(`${docsUi}\n${shell}`, /import\(['"]shiki\//);
  assert.doesNotMatch(docsUi, /configureDocsHighlighter|dangerouslySetInnerHTML/);
  assert.equal(websitePackage.dependencies.shiki, undefined);
  assert.doesNotMatch(workspaceLock, /^\s+shiki:\s*$/m);
  assert.match(docsUi, /export function Code[\s\S]*?<pre/);
});

test("the React introduction is short and gives two next steps", () => {
  for (const heading of [
    "The approach",
    "What ships",
    "Built for AI workflows",
    "Where to start",
  ]) {
    assert.doesNotMatch(introduction, new RegExp(heading));
  }
  assert.match(introduction, />Getting Started<\/div>/);
  assert.match(introduction, /<H1>Introduction<\/H1>/);
  assert.equal((introduction.match(/<Lead>/g) ?? []).length, 1);
  assert.match(introduction, /npm install @monoset\/react @monoset\/tokens/);
  assert.deepEqual(
    [...introduction.matchAll(/\bpage:"([^"]+)"/g)].map((match) => match[1]),
    ["installation", "buttons"],
  );
  assert.deepEqual(
    [...introduction.matchAll(/\btitle:"([^"]+)"/g)].map((match) => match[1]),
    ["Installation", "Browse components"],
  );
  assert.match(introduction, /padding:"10px 12px"/);
});

test("the short introduction metadata and search index stay in sync", () => {
  assert.equal(
    PAGE_META.introduction.desc,
    "A neutral token system and React component library that leaves product decisions to you.",
  );
  const introRecords = searchIndex.filter(({ slug }) => slug === "introduction");
  assert.equal(introRecords.length, 1);
  assert.equal(introRecords[0].desc, PAGE_META.introduction.desc);
  assert.equal(introRecords[0].body, "Monoset is a neutral token system and React component library. It gives you the common UI pieces while leaving the product decisions to you.");
  assert.deepEqual(
    introRecords.filter(({ hash }) => ["#approach", "#whats-included", "#ai-native", "#next"].includes(hash)),
    [],
  );
});

test("the selected React page is one neutral step stronger than hover", () => {
  assert.deepEqual(
    [...indexCss.matchAll(/--docs-nav-selected:\s*var\((--mono-\d+)\)/g)].map((match) => match[1]),
    ["--mono-200", "--mono-700"],
  );
  assert.match(indexCss, /\.monoset-dark \.ms-docs-nav,/);
  assert.match(indexCss, /\[data-monoset-theme="dark"\] \.ms-docs-nav\s*\{/);
  assert.doesNotMatch(indexCss, /\.ms-docs-nav__item\s*\{[^}]*background:/);
  assert.match(indexCss, /\.ms-docs-nav--compact \.ms-docs-nav__item:hover\s*\{[^}]*background:\s*var\(--bg-muted\);/);
  assert.match(indexCss, /\.ms-docs-nav__item\[aria-current="page"\]\s*\{[^}]*color:\s*var\(--fg1\);[^}]*font-weight:\s*500;/);
  assert.match(indexCss, /\.ms-docs-nav--compact \.ms-docs-nav__item\[aria-current="page"\]\s*\{[^}]*background:\s*var\(--docs-nav-selected\);/);
  const selectedRule = indexCss.match(/\.ms-docs-nav__item\[aria-current="page"\]\s*\{([^}]*)\}/)?.[1] ?? "";
  const compactSelectedRule = indexCss.match(/\.ms-docs-nav--compact \.ms-docs-nav__item\[aria-current="page"\]\s*\{([^}]*)\}/)?.[1] ?? "";
  assert.ok(selectedRule);
  assert.ok(compactSelectedRule);
  assert.doesNotMatch(selectedRule, /border-inline-start/);
  assert.doesNotMatch(compactSelectedRule, /border-inline-start/);
  assert.doesNotMatch(indexCss, /\.ms-docs-nav--compact \.ms-docs-nav__item\[aria-current="page"\]\s*\{[^}]*background:\s*var\(--bg\);/);
  assert.match(
    indexCss,
    /@media\s*\(forced-colors:\s*active\)\s*\{[\s\S]*?\.ms-docs-nav__item\[aria-current="page"\]\s*\{[^}]*outline:\s*2px solid Highlight;[^}]*outline-offset:\s*-2px;/,
  );
  assert.match(
    indexCss,
    /@media\s*\(forced-colors:\s*active\)\s*\{[\s\S]*?\.ms-docs-nav__item:focus-visible\s*\{[^}]*outline:\s*3px solid CanvasText;[^}]*outline-offset:\s*2px;/,
  );
});

test("the documentation sidebar preserves native keyboard focus behavior", () => {
  assert.ok(sidebar.includes('href={`/${item.id}`}'));
  assert.match(sidebar, /<a[^>]*aria-current=\{active===item\.id \? "page" : undefined\}/);
  assert.doesNotMatch(sidebar, /\btabIndex=/);
  assert.doesNotMatch(sidebar, /\bonKeyDown=/);
  assert.doesNotMatch(sidebar, /\.(?:blur|focus|scrollIntoView)\(/);
});

test("the docs theme reaches body portals and resets when docs unmount", () => {
  assert.match(
    themeToggle,
    /document\.documentElement\.classList\.toggle\("monoset-dark", theme === "dark"\)/,
  );
  assert.match(
    themeToggle,
    /return \(\) => document\.documentElement\.classList\.remove\("monoset-dark"\)/,
  );
  assert.doesNotMatch(themeToggle, /querySelector\(['"]\[data-ms=["']docs-layout["']\]/);
});

test("the pre-render theme bootstrap gives the docs route one root theme owner", () => {
  assert.match(websiteIndex, /if \(existing\) \{ apply\(document\.documentElement\); return; \}/);
  assert.match(websiteIndex, /if \(el\) \{ apply\(document\.documentElement\); mo\.disconnect\(\); \}/);
  assert.doesNotMatch(websiteIndex, /apply\((?:existing|el)\)/);
});

test("accessibility copy states responsibilities without blanket guarantees", () => {
  assert.doesNotMatch(docs, /already accessible, already token-wired, already tested/);
  assert.doesNotMatch(docs, /ship accessible by default/);
  assert.doesNotMatch(docs, /disables CSS transitions and Framer Motion animations/);
  assert.doesNotMatch(docs, /every semantic token pairing[\s\S]{0,100}meets WCAG AA/);
  assert.match(docs, /test with a keyboard and a screen reader/i);
});

test("public React docs avoid stale Radix-only architecture claims", () => {
  assert.doesNotMatch(rootReadme, /interactive components wrap Radix primitives/);
  assert.doesNotMatch(rootReadme, /menus, dialogs, sliders\), reach for Radix/);
  assert.match(rootReadme, /React Aria/);
  assert.match(reactReadme, /Radix/);
  assert.match(reactReadme, /React Aria/);
});
