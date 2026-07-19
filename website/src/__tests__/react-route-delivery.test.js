import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { PAGE_META } from "../pages/docs-meta.js";
import { NAV, NATIVE_NAV } from "../pages/docs-navigation.js";
import { REACT_DOC_DEMOS, REACT_DOC_ROUTES } from "../pages/react-docs/routes.js";

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const registry = read("../pages/react-docs/docs.jsx");
const shell = read("../pages/DocsShell.jsx");
const main = read("../main.jsx");
const searchBuilder = read("../../scripts/build-search-index.mjs");
const budgetCli = read("../../scripts/check-route-budgets.mjs");

const reactNavSlugs = NAV.flatMap(({ items }) => items.map(({ id }) => id));
const nativeNavSlugs = NATIVE_NAV.flatMap(({ items }) => items.map(({ id }) => id));

test("every React navigation item has exactly one route owner", () => {
  assert.equal(new Set(reactNavSlugs).size, reactNavSlugs.length);

  for (const slug of reactNavSlugs) {
    assert.equal(Object.keys(REACT_DOC_ROUTES).filter((route) => route === slug).length, 1);
  }
});

test("the route map covers React metadata and excludes native-only routes", () => {
  assert.deepEqual(
    Object.keys(REACT_DOC_ROUTES).sort(),
    Object.keys(PAGE_META).sort(),
  );

  const nativeOnlySlugs = nativeNavSlugs.filter((slug) => !PAGE_META[slug]);
  for (const slug of nativeOnlySlugs) {
    assert.equal(REACT_DOC_ROUTES[slug], undefined);
  }
});

test("React docs routes are data-only modules under the groups directory", () => {
  const modules = Object.values(REACT_DOC_ROUTES);

  for (const modulePath of modules) {
    assert.match(modulePath, /^\.\/groups\/[a-z0-9-]+\.jsx$/);
  }
});

test("the React docs shell lazy-loads the route registry", () => {
  assert.match(shell, /lazy\(\(\) => import\(['"]\.\/react-docs\/docs\.jsx['"]\)\)/);
  assert.doesNotMatch(shell, /import\(['"]\.\/docs\.jsx['"]\)/);
  assert.equal(existsSync(new URL("../pages/docs.jsx", import.meta.url)), false);
});

test("the registry resolves only the mapped route group", () => {
  assert.match(registry, /import\.meta\.glob\(['"]\.\/groups\/\*\.jsx['"]\)/);
  assert.match(registry, /Object\.entries\(REACT_DOC_ROUTES\)/);
  assert.match(registry, /module\.PAGES\?\.\[page\]/);
  assert.match(registry, /pageComponents\.introduction/);
});

test("every route has one existing Page owner and groups exclude Native modules", () => {
  const groupSources = new Map();
  const ownerCounts = new Map();

  for (const modulePath of new Set(Object.values(REACT_DOC_ROUTES))) {
    const url = new URL(`../pages/react-docs/${modulePath.slice(2)}`, import.meta.url);
    assert.equal(existsSync(url), true, `${modulePath} must exist`);
    const source = read(`../pages/react-docs/${modulePath.slice(2)}`);
    groupSources.set(modulePath, source);
    assert.doesNotMatch(source, /from\s+['"][^'"]*(?:Native|native)[^'"]*['"]/);
    assert.match(source, /export const PAGES\s*=\s*\{/);

    for (const [, slug] of source.matchAll(/^\s*([a-z0-9]+):\s*Page\w+,?$/gm)) {
      ownerCounts.set(slug, (ownerCounts.get(slug) ?? 0) + 1);
    }
  }

  for (const [slug, modulePath] of Object.entries(REACT_DOC_ROUTES)) {
    const source = groupSources.get(modulePath);
    assert.match(source, new RegExp(`^\\s*${slug}:\\s*Page\\w+,?$`, "m"));
    assert.equal(ownerCounts.get(slug), 1, `${slug} must have exactly one owner`);
  }
  assert.deepEqual([...ownerCounts.keys()].sort(), Object.keys(PAGE_META).sort());
});

test("route groups own component CSS while the app owns base and feedback", () => {
  assert.match(main, /@monoset\/react\/styles\/base\.css/);
  assert.match(main, /@monoset\/react\/styles\/feedback\.css/);
  assert.doesNotMatch(main, /@monoset\/react\/styles\.css/);

  for (const modulePath of new Set(Object.values(REACT_DOC_ROUTES))) {
    const source = read(`../pages/react-docs/${modulePath.slice(2)}`);
    const imports = source.slice(0, source.indexOf("function "));
    const families = [...imports.matchAll(/^import ['"]@monoset\/react\/styles\/([a-z-]+)\.css['"];?$/gm)].map((match) => match[1]);
    if (/^import\s+.+\s+from ['"]@monoset\/react['"];?$/m.test(imports)) {
      assert.ok(families.length > 0, `${modulePath} must declare its component styles`);
    }
    assert.equal(new Set(families).size, families.length, `${modulePath} must not duplicate CSS families`);
    assert.equal(families.includes("base"), false);
    assert.equal(families.includes("feedback"), false);
    for (const aggregator of ["controls", "navigation", "data", "overlays"]) {
      assert.equal(families.includes(aggregator), false, `${modulePath} must not import the ${aggregator} family aggregator`);
    }
  }
});

test("the Radio route owns the choice control styles it renders", () => {
  const radio = read(`../pages/react-docs/${REACT_DOC_ROUTES.radio.slice(2)}`);
  const imports = radio.slice(0, radio.indexOf("function "));

  assert.match(imports, /^import ['"]@monoset\/react\/styles\/choice-controls\.css['"];?$/m);
});

test("the Playground route owns its layout and focus styles", () => {
  const playground = read(`../pages/react-docs/${REACT_DOC_ROUTES.playground.slice(2)}`);
  const playgroundCss = read("../pages/react-docs/groups/playground.css");

  assert.match(playground, /^import ['"]\.\/playground\.css['"];?$/m);
  assert.doesNotMatch(main, /playground\.css/);
  for (const selector of [".ms-pg-w", ".ms-pg-p", ".ms-pg-c", ".ms-pg-a:focus-visible"]) {
    assert.match(playgroundCss, new RegExp(selector.replace(".", "\\.")));
  }
});

test("search generation follows the data route map and mapped group sources", () => {
  assert.match(searchBuilder, /from\s+['"]\.\.\/src\/pages\/react-docs\/routes\.js['"]/);
  assert.match(searchBuilder, /REACT_DOC_ROUTES/);
  assert.doesNotMatch(searchBuilder, /src\/pages\/docs\.jsx/);
  assert.match(searchBuilder, /new Set\(Object\.values\(REACT_DOC_ROUTES\)\)/);
});

test("configured demos are unique, connected to their owner, and user-triggered", () => {
  const modules = new Set();
  const groupSources = new Map();
  const launcher = read("../pages/react-docs/DemoLauncher.jsx");

  assert.doesNotMatch(launcher, /useEffect/);
  assert.match(launcher, /onClick=\{runDemo\}/);

  for (const [id, config] of Object.entries(REACT_DOC_DEMOS)) {
    assert.ok(REACT_DOC_ROUTES[config.route], `${id} must own a real route`);
    assert.match(config.module, /^\.\/demos\/[a-z0-9/-]+\.jsx$/);
    assert.equal(modules.has(config.module), false, `${config.module} must be measured once`);
    modules.add(config.module);
    assert.equal(
      existsSync(new URL(`../pages/react-docs/${config.module.slice(2)}`, import.meta.url)),
      true,
      `${config.module} must exist`,
    );

    const routeModule = REACT_DOC_ROUTES[config.route];
    const source = groupSources.get(routeModule)
      ?? read(`../pages/react-docs/${routeModule.slice(2)}`);
    groupSources.set(routeModule, source);
    assert.ok(source.includes(`import('${config.module.replace("./", "../")}')`), `${id} must be dynamically connected`);
  }

  const configuredImports = [...groupSources.values()].flatMap((source) =>
    [...source.matchAll(/import\(['"]\.\.\/demos\/([^'"]+\.jsx)['"]\)/g)].map((match) => `./demos/${match[1]}`),
  );
  assert.deepEqual([...configuredImports].sort(), [...modules].sort());
});

test("heavy previews and Playground stay out of their initial route modules", () => {
  for (const slug of ["calendar", "combobox", "datepicker", "multicombobox", "numberinput", "playground"]) {
    const source = read(`../pages/react-docs/${REACT_DOC_ROUTES[slug].slice(2)}`);
    const imports = source.slice(0, source.indexOf("function "));
    assert.doesNotMatch(imports, /^import\s+.+\s+from ['"]@monoset\/react['"];?$/m);
    assert.doesNotMatch(imports, /^import ['"]@monoset\/react\/styles\//m);
    assert.doesNotMatch(source, /\blazy\s*\(/);
  }
  for (const component of ["Button", "Badge", "Alert", "Avatar", "Card", "Input", "Textarea", "Switch", "Checkbox", "Spinner"]) {
    assert.ok(REACT_DOC_DEMOS[`playground-${component.toLowerCase()}`]);
  }
});

test("the route budget CLI measures every configured demo", () => {
  assert.match(budgetCli, /REACT_DOC_DEMOS/);
  assert.match(budgetCli, /demoMap:\s*REACT_DOC_DEMOS/);
});

test("the production build emits a Vite manifest", () => {
  const viteConfig = read("../../vite.config.js");
  assert.match(viteConfig, /build:\s*\{[\s\S]*?manifest:\s*true[,\n]/);
});

test("the website exposes the manifest route budget verifier", () => {
  const packageJson = readJson("../../package.json");
  assert.equal(
    packageJson.scripts["check:route-budgets"],
    "node scripts/check-route-budgets.mjs",
  );
  assert.equal(
    packageJson.scripts["size-limit"],
    "node scripts/check-route-budgets.mjs && size-limit",
  );
  assert.match(packageJson.scripts.test, /scripts\/\*\.test\.mjs/);
  assert.match(packageJson.scripts.test, /src\/__tests__\/\*\.test\.js/);
});
