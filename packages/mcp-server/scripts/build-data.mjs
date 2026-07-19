#!/usr/bin/env node
// Assemble the three JSON data files the MCP server reads at startup:
//   - data/components.json  (root exports + docs descriptions)
//   - data/tokens.json      (copy of @monoset/tokens tokens.json)
//   - data/search-index.json (generated from current website docs source)

import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PAGE_META } from "../../../website/src/pages/docs-meta.js";
import {
  generateComponentCatalog,
  parseLiveDocsRoutes,
} from "./component-catalog.mjs";

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

// 2) search index: run the website's existing builder in a temporary mirror.
// This reads current docs source without changing website/public in the worktree.
const tempRoot = mkdtempSync(join(tmpdir(), "monoset-mcp-search-"));
try {
  const websiteRoot = resolve(repoRoot, "website");
  const tempWebsite = resolve(tempRoot, "website");
  const tempScript = resolve(tempWebsite, "scripts/build-search-index.mjs");

  cpSync(resolve(websiteRoot, "src"), resolve(tempWebsite, "src"), {
    recursive: true,
  });
  mkdirSync(dirname(tempScript), { recursive: true });
  cpSync(resolve(websiteRoot, "scripts/build-search-index.mjs"), tempScript);
  execFileSync(process.execPath, [tempScript], { stdio: "ignore" });

  const generated = JSON.parse(
    readFileSync(resolve(tempWebsite, "public/search-index.json"), "utf8"),
  );
  const docsOnly = generated.filter(({ slug }) => slug);
  writeFileSync(
    resolve(dataDir, "search-index.json"),
    JSON.stringify(docsOnly),
  );
  console.log(`  ✓ search-index.json (${docsOnly.length})`);
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}

// 3) components: derive the catalog from the package's real root exports.
const indexSource = readFileSync(resolve(repoRoot, "packages/react/src/index.ts"), "utf8");
const docsSource = readFileSync(
  resolve(repoRoot, "website/src/pages/react-docs/routes.js"),
  "utf8",
);
const components = generateComponentCatalog({
  indexSource,
  pageMeta: PAGE_META,
  liveRoutes: parseLiveDocsRoutes(docsSource),
});
writeFileSync(resolve(dataDir, "components.json"), JSON.stringify(components, null, 2));
console.log(`  ✓ components.json (${components.length})`);
