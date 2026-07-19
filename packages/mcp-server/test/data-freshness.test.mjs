import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { PAGE_META } from "../../../website/src/pages/docs-meta.js";
import {
  generateComponentCatalog,
  parseLiveDocsRoutes,
  parseLocalRuntimeExports,
} from "../scripts/component-catalog.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(here, "..");
const repoRoot = resolve(packageRoot, "..", "..");

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

const removedToastSubprimitives = [
  "ToastAction",
  "ToastClose",
  "ToastDescription",
  "ToastTitle",
];

const forbiddenClaims = /hallucinat|correct code|accuracy|guarantee|\bprops\b/i;

test("runtime metadata reads the package version", async () => {
  const manifest = await readJson(resolve(packageRoot, "package.json"));
  const server = await readFile(resolve(packageRoot, "src", "server.js"), "utf8");

  assert.ok(manifest.version);
  assert.match(server, /package\.json/);
  assert.match(server, /version:\s*serverVersion/);
  assert.doesNotMatch(server, /version:\s*["']\d+\.\d+\.\d+["']/);
});

test("package metadata and README describe only the bundled lookup data", async () => {
  const manifest = await readJson(resolve(packageRoot, "package.json"));
  const readme = await readFile(resolve(packageRoot, "README.md"), "utf8");

  assert.match(manifest.description, /component catalog, tokens, and docs search/i);
  assert.doesNotMatch(manifest.description, forbiddenClaims);
  assert.match(readme, /component catalog, tokens, and docs search/i);
  assert.doesNotMatch(readme, forbiddenClaims);
});

test("build-data generates search data from current docs source", async () => {
  const buildData = await readFile(resolve(packageRoot, "scripts", "build-data.mjs"), "utf8");

  assert.match(buildData, /build-search-index\.mjs/);
  assert.doesNotMatch(buildData, /website[\/]public[\/]search-index\.json/);
});

test("root export parsing keeps only capitalized local runtime exports", () => {
  const source = `
    export { Button, Button as PrimaryButton, type ButtonProps } from "./Button";
    export type { CardProps } from "./Card";
    export { EASE_STANDARD, MotionValue } from "@monoset/motion";
    export { useTheme, ThemeProvider, cx } from "./Theme";
  `;

  assert.deepEqual(parseLocalRuntimeExports(source), [
    { exportedName: "Button", sourceModule: "./Button" },
    { exportedName: "PrimaryButton", sourceModule: "./Button" },
    { exportedName: "ThemeProvider", sourceModule: "./Theme" },
  ]);
});

test("live docs parsing reads the split route registry", () => {
  const source = `
    export const REACT_DOC_ROUTES = {
      buttons: "./groups/buttons.jsx",
      alerts: "./groups/alerts.jsx",
    };
  `;

  assert.deepEqual([...parseLiveDocsRoutes(source)].sort(), ["alerts", "buttons"]);
});

test("bundled component data exactly matches the generated root export catalog", async () => {
  const indexSource = await readFile(
    resolve(repoRoot, "packages", "react", "src", "index.ts"),
    "utf8",
  );
  const docsSource = await readFile(
    resolve(repoRoot, "website", "src", "pages", "react-docs", "routes.js"),
    "utf8",
  );
  const bundled = await readJson(resolve(packageRoot, "data", "components.json"));
  const generated = generateComponentCatalog({
    indexSource,
    pageMeta: PAGE_META,
    liveRoutes: parseLiveDocsRoutes(docsSource),
  });
  const expectedNames = parseLocalRuntimeExports(indexSource)
    .map(({ exportedName }) => exportedName)
    .sort();

  assert.deepEqual(bundled, generated);
  assert.deepEqual(bundled.map(({ name }) => name).sort(), expectedNames);
  assert.equal(new Set(expectedNames).size, expectedNames.length);
  assert.equal(expectedNames.includes("Form"), false);
  assert.equal(expectedNames.includes("Reveal"), false);
  assert.equal(expectedNames.includes("StaggerList"), false);

  for (const component of bundled) {
    assert.match(component.name, /^[A-Z]/);
    assert.ok(component.description.trim(), `${component.name} needs a description`);
    assert.match(component.docUrl, /^https:\/\/monoset\.design\/[a-z0-9-]+$/);
  }
});

test("bundled component data omits unsupported Toast subprimitives", async () => {
  const bundled = await readJson(resolve(packageRoot, "data", "components.json"));
  const names = new Set(bundled.map(({ name }) => name));

  for (const removedName of removedToastSubprimitives) {
    assert.equal(names.has(removedName), false, `${removedName} must not be published`);
  }
});

test("catalog generation rejects component modules without live docs", () => {
  assert.throws(
    () => generateComponentCatalog({
      indexSource: 'export { Mystery } from "./Mystery";',
      pageMeta: PAGE_META,
      liveRoutes: new Set(),
    }),
    /Mystery.*docs route/i,
  );
});

test("bundled search data uses the current honest guide copy", async () => {
  const bundled = await readJson(resolve(packageRoot, "data", "search-index.json"));
  const mcp = bundled.find(({ slug, hash }) => slug === "mcp" && hash === "");
  const nextjs = bundled.find(({ slug, hash }) => slug === "nextjs" && hash === "");

  assert.ok(mcp);
  assert.ok(nextjs);
  assert.equal(bundled.some(({ slug }) => slug === ""), false);
  assert.doesNotMatch(JSON.stringify(bundled), /unopinionated|one typeface/i);
  assert.match(mcp.body, /bundled component catalog, tokens, and docs index/i);
  assert.doesNotMatch(mcp.body, forbiddenClaims);
  assert.match(nextjs.body, /Keep the root layout as a Server Component/);
  assert.match(nextjs.body, /small client provider/);
  assert.doesNotMatch(nextjs.body, /two minutes|keeps it inline/i);
});
