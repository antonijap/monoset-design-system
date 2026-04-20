#!/usr/bin/env node
// Assemble the three JSON data files the MCP server reads at startup:
//   - data/components.json  (names + first-line descriptions)
//   - data/tokens.json      (copy of @monoset/tokens tokens.json)
//   - data/search-index.json (copy of website/public/search-index.json)

import { readFileSync, writeFileSync, readdirSync, existsSync, cpSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(here, "..");
const repoRoot = resolve(pkgRoot, "..", "..");
const dataDir = resolve(pkgRoot, "data");
mkdirSync(dataDir, { recursive: true });

// 1) tokens
const tokensSrc = resolve(repoRoot, "packages/tokens/src/tokens.json");
if (existsSync(tokensSrc)) {
  cpSync(tokensSrc, resolve(dataDir, "tokens.json"));
  console.log("  ✓ tokens.json");
} else {
  console.warn("  ⚠ tokens.json not found, skipped");
}

// 2) search index (may not exist yet if website wasn't built)
const searchSrc = resolve(repoRoot, "website/public/search-index.json");
if (existsSync(searchSrc)) {
  cpSync(searchSrc, resolve(dataDir, "search-index.json"));
  console.log("  ✓ search-index.json");
} else {
  writeFileSync(resolve(dataDir, "search-index.json"), "[]");
  console.warn("  ⚠ search-index.json not found, wrote empty []");
}

// 3) components — scan @monoset/react src for exported component files
const reactSrc = resolve(repoRoot, "packages/react/src");
const components = [];
if (existsSync(reactSrc)) {
  for (const f of readdirSync(reactSrc)) {
    if (!/\.tsx$/.test(f)) continue;
    if (f === "index.ts" || f === "cx.ts" || f === "MonosetProvider.tsx") continue;
    const name = f.replace(/\.tsx$/, "");
    const src = readFileSync(resolve(reactSrc, f), "utf8");
    // pull the first multi-line /** block, or the first // comment block, as description
    const jsdoc = src.match(/\/\*\*\s*([\s\S]+?)\s*\*\//);
    let description = "";
    if (jsdoc) {
      description = jsdoc[1]
        .replace(/^\s*\*\s?/gm, "")
        .split(/\n\n/)[0]
        .trim();
    } else {
      const firstLine = src.split("\n").find((l) => /^\/\/\s*\S/.test(l));
      if (firstLine) description = firstLine.replace(/^\/\/\s*/, "").trim();
    }
    components.push({
      name,
      description,
      docUrl: `https://monoset.design/${slugForComponent(name)}`,
    });
  }
}
components.sort((a, b) => a.name.localeCompare(b.name));
writeFileSync(resolve(dataDir, "components.json"), JSON.stringify(components, null, 2));
console.log(`  ✓ components.json (${components.length})`);

function slugForComponent(name) {
  // Map component name to the docs route. Fallback is lower-case name.
  const map = {
    Button: "buttons", Input: "inputs", Badge: "badges", Card: "cards",
    Alert: "alerts", Avatar: "avatars", Table: "table", Tabs: "tabs",
    Checkbox: "toggles", Switch: "toggles", RadioGroup: "toggles",
    Dialog: "alerts", Toast: "alerts", Tooltip: "alerts",
    Popover: "alerts", DropdownMenu: "alerts", Select: "inputs",
    Slider: "slider", Accordion: "accordion", Kbd: "kbd", Spinner: "spinner",
    ToggleGroup: "toggle", Skeleton: "cards", Separator: "cards",
    Breadcrumb: "tabs", Pagination: "tabs", Progress: "cards",
    EmptyState: "cards",
  };
  return map[name] || name.toLowerCase();
}
