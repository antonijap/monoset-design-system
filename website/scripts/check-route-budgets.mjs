import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PAGE_META } from "../src/pages/docs-meta.js";
import { NAV } from "../src/pages/docs-navigation.js";
import { REACT_DOC_DEMOS, REACT_DOC_ROUTES } from "../src/pages/react-docs/routes.js";
import {
  createDistAssetReader,
  verifyRouteBudgets,
} from "./route-budget-core.mjs";

const websiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(websiteRoot, "dist");
const manifestPath = resolve(distRoot, ".vite/manifest.json");
const sizeLimitPath = resolve(websiteRoot, ".size-limit.json");

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

try {
  const result = verifyRouteBudgets({
    manifest: existsSync(manifestPath) ? readJson(manifestPath) : undefined,
    routeMap: REACT_DOC_ROUTES,
    demoMap: REACT_DOC_DEMOS,
    expectedSlugs: Object.keys(PAGE_META),
    navSlugs: NAV.flatMap(({ items }) => items.map(({ id }) => id)),
    sizeLimitConfig: existsSync(sizeLimitPath) ? readJson(sizeLimitPath) : undefined,
    readAsset: createDistAssetReader(distRoot),
    verbose: process.env.ROUTE_BUDGET_VERBOSE === "1",
  });

  for (const line of result.lines) console.log(line);
  if (!result.passed) process.exitCode = 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
