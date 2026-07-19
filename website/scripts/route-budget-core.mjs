import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { posix } from "node:path";
import { brotliCompressSync } from "node:zlib";

export const DEFAULT_JS_LIMIT = 25 * 1024;
export const DEFAULT_CSS_LIMIT = 7 * 1024;
// Interactive demos are opt-in and may include one substantial component graph.
export const DEFAULT_ON_DEMAND_DEMO_JS_LIMIT = 85 * 1024;

const BASELINE_BUDGETS = [
  { label: "application entry", path: "dist/assets/index-*.js" },
  { label: "react-vendor JavaScript", path: "dist/assets/react-vendor-*.js" },
  { label: "motion JavaScript", path: "dist/assets/motion-*.js" },
  { label: "browser JavaScript", path: "dist/assets/browser-*.js" },
];
const APPLICATION_ENTRY = /^assets\/index-[^/]+\.js$/;
const NAMED_BASELINE = /^assets\/(?:react-vendor|motion|browser)-[^/]+\.js$/;

const fail = (message) => {
  throw new Error(message);
};

const formatKiB = (bytes) => `${(bytes / 1024).toFixed(2)} KiB`;

const parseByteLimit = (limit, label) => {
  if (typeof limit === "number" && Number.isFinite(limit) && limit >= 0) return limit;
  if (typeof limit !== "string") fail(`Invalid size-limit baseline for ${label}.`);

  const match = limit.trim().match(/^(\d+(?:\.\d+)?)\s*(B|KB|KIB|MB|MIB)?$/i);
  if (!match) fail(`Invalid size-limit baseline for ${label}: ${limit}.`);

  const multipliers = {
    B: 1,
    KB: 1000,
    KIB: 1024,
    MB: 1000 * 1000,
    MIB: 1024 * 1024,
  };
  return Number(match[1]) * multipliers[(match[2] ?? "B").toUpperCase()];
};

const readBaselineBudgets = (sizeLimitConfig) => {
  if (!Array.isArray(sizeLimitConfig)) fail("Missing size-limit configuration.");

  const budgets = new Map();
  for (const baseline of BASELINE_BUDGETS) {
    const budget = sizeLimitConfig.find(({ path }) => path === baseline.path);
    if (!budget || budget.limit == null) fail(`Missing size-limit baseline for ${baseline.label}.`);
    budgets.set(baseline.path, parseByteLimit(budget.limit, baseline.label));
  }

  return budgets;
};

const collectStaticGraph = (manifest, rootKeys) => {
  const seen = new Set();
  const pending = [...rootKeys];

  while (pending.length > 0) {
    const key = pending.pop();
    if (seen.has(key)) continue;

    const entry = manifest[key];
    if (!entry) fail(`Manifest entry "${key}" is referenced but missing.`);
    if (!entry.file) fail(`Manifest entry "${key}" has no output file.`);
    seen.add(key);

    for (const importedKey of entry.imports ?? []) pending.push(importedKey);
  }

  return seen;
};

const manifestKeyForModule = (manifest, routeMapDirectory, modulePath) => {
  const sourcePath = posix.normalize(posix.join(routeMapDirectory, modulePath));
  if (manifest[sourcePath]) return sourcePath;

  return Object.keys(manifest).find((key) => manifest[key].src === sourcePath);
};

const measureAssets = (assetPaths, readAsset) => {
  const assets = [...assetPaths].sort().map((assetPath) => {
    const bytes = brotliCompressSync(readAsset(assetPath)).byteLength;
    return { path: assetPath, bytes };
  });

  return {
    assets,
    bytes: assets.reduce((total, asset) => total + asset.bytes, 0),
  };
};

const formatAssets = (label, assets) => {
  if (assets.length === 0) return `  ${label} assets: none`;
  return `  ${label} assets: ${assets.map(({ path, bytes }) => `${path} (${formatKiB(bytes)})`).join(", ")}`;
};

export const createDistAssetReader = (distRoot) => (assetPath) => {
  const absolutePath = resolve(distRoot, assetPath);
  const relativePath = relative(distRoot, absolutePath);
  const pointsOutside = relativePath === ""
    || relativePath === ".."
    || relativePath.startsWith(`..${sep}`)
    || isAbsolute(relativePath);

  if (pointsOutside) fail(`Manifest asset points outside dist: ${assetPath}.`);
  if (!existsSync(absolutePath)) fail(`Manifest asset is missing: ${assetPath}.`);
  return readFileSync(absolutePath);
};

export const verifyRouteBudgets = ({
  manifest,
  routeMap,
  expectedSlugs,
  navSlugs,
  sizeLimitConfig,
  readAsset,
  routeMapDirectory = "src/pages/react-docs",
  demoMap = {},
  demoMapDirectory = "src/pages/react-docs",
  jsLimit = DEFAULT_JS_LIMIT,
  cssLimit = DEFAULT_CSS_LIMIT,
  demoJsLimit = DEFAULT_ON_DEMAND_DEMO_JS_LIMIT,
  verbose = false,
}) => {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    fail("Missing Vite manifest. Run pnpm build first.");
  }
  if (typeof readAsset !== "function") fail("Route budget verification requires an asset reader.");
  const baselineBudgets = readBaselineBudgets(sizeLimitConfig);

  const configuredSlugs = Object.keys(routeMap).sort();
  const sortedExpectedSlugs = [...expectedSlugs].sort();
  if (JSON.stringify(configuredSlugs) !== JSON.stringify(sortedExpectedSlugs)) {
    const missing = sortedExpectedSlugs.filter((slug) => !routeMap[slug]);
    const extra = configuredSlugs.filter((slug) => !expectedSlugs.includes(slug));
    fail(`React route coverage mismatch. Missing: ${missing.join(", ") || "none"}. Extra: ${extra.join(", ") || "none"}.`);
  }

  const duplicateNavSlugs = navSlugs.filter((slug, index) => navSlugs.indexOf(slug) !== index);
  if (duplicateNavSlugs.length > 0) {
    fail(`Duplicate React navigation slugs: ${[...new Set(duplicateNavSlugs)].join(", ")}.`);
  }
  for (const slug of navSlugs) {
    if (!routeMap[slug]) fail(`React navigation slug "${slug}" has no route module.`);
  }

  const manifestKeysByModule = new Map();
  for (const modulePath of new Set(Object.values(routeMap))) {
    const manifestKey = manifestKeyForModule(manifest, routeMapDirectory, modulePath);
    if (!manifestKey) fail(`No Vite manifest entry found for React route module ${modulePath}.`);
    manifestKeysByModule.set(modulePath, manifestKey);
  }

  const entryKeys = Object.keys(manifest).filter((key) => manifest[key].isEntry);
  if (entryKeys.length === 0) fail("The Vite manifest has no application entry.");
  const entryGraph = collectStaticGraph(manifest, entryKeys);
  const alreadyLoadedJavaScript = new Set();
  const applicationEntryPaths = new Set();

  for (const key of entryGraph) {
    const entry = manifest[key];
    const isApplicationEntry = entryKeys.includes(key);
    if (isApplicationEntry && !APPLICATION_ENTRY.test(entry.file)) {
      fail(`Application entry JavaScript is not covered by size-limit: ${entry.file}.`);
    }
    if (!NAMED_BASELINE.test(entry.file)) applicationEntryPaths.add(entry.file);
    alreadyLoadedJavaScript.add(entry.file);
  }

  for (const entry of Object.values(manifest)) {
    if (NAMED_BASELINE.test(entry.file ?? "")) alreadyLoadedJavaScript.add(entry.file);
  }

  const applicationEntry = measureAssets(applicationEntryPaths, readAsset);
  applicationEntry.limit = baselineBudgets.get(BASELINE_BUDGETS[0].path);
  applicationEntry.passes = applicationEntry.bytes <= applicationEntry.limit;

  const lines = [
    `${applicationEntry.passes ? "PASS" : "FAIL"} application entry: JS ${formatKiB(applicationEntry.bytes)} / ${formatKiB(applicationEntry.limit)}`,
    formatAssets("application entry JS", applicationEntry.assets),
  ];

  const routes = [];
  const routeGraphs = new Map();
  const routeCssPaths = new Map();
  for (const slug of configuredSlugs) {
    const modulePath = routeMap[slug];
    const routeGraph = collectStaticGraph(manifest, [manifestKeysByModule.get(modulePath)]);
    const javascriptPaths = new Set();
    const cssPaths = new Set();

    for (const key of routeGraph) {
      const entry = manifest[key];
      if (!alreadyLoadedJavaScript.has(entry.file)) javascriptPaths.add(entry.file);
      for (const cssFile of entry.css ?? []) cssPaths.add(cssFile);
    }
    for (const key of entryGraph) {
      for (const cssFile of manifest[key].css ?? []) cssPaths.add(cssFile);
    }

    const javascript = measureAssets(javascriptPaths, readAsset);
    const css = measureAssets(cssPaths, readAsset);
    javascript.limit = jsLimit;
    javascript.passes = javascript.bytes <= jsLimit;
    css.limit = cssLimit;
    css.passes = css.bytes <= cssLimit;
    const passes = javascript.passes && css.passes;
    routeGraphs.set(slug, routeGraph);
    routeCssPaths.set(slug, cssPaths);

    routes.push({ slug, passes, javascript, css });
    lines.push(
      `${passes ? "PASS" : "FAIL"} /${slug}: JS ${formatKiB(javascript.bytes)} / ${formatKiB(jsLimit)}, CSS ${formatKiB(css.bytes)} / ${formatKiB(cssLimit)}`,
    );
    if (verbose || !passes) {
      lines.push(formatAssets("JS", javascript.assets));
      lines.push(formatAssets("CSS", css.assets));
    }
  }

  if (!demoMap || typeof demoMap !== "object" || Array.isArray(demoMap)) {
    fail("React demo map must be a data object.");
  }

  const demoModuleOwners = new Map();
  const demoManifestKeys = new Map();
  const demoConfigsByManifestKey = new Map();
  for (const [id, config] of Object.entries(demoMap)) {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      fail(`React demo "${id}" must declare a route and module.`);
    }
    if (!routeMap[config.route]) fail(`React demo "${id}" has unknown React route "${config.route}".`);
    if (typeof config.module !== "string") fail(`React demo "${id}" has no module path.`);
    if (demoModuleOwners.has(config.module)) {
      fail(`Duplicate React demo module ${config.module}: ${demoModuleOwners.get(config.module)} and ${id}.`);
    }
    demoModuleOwners.set(config.module, id);

    const manifestKey = manifestKeyForModule(manifest, demoMapDirectory, config.module);
    if (!manifestKey) fail(`No Vite manifest entry found for React demo module ${config.module}.`);
    demoManifestKeys.set(id, manifestKey);
    demoConfigsByManifestKey.set(manifestKey, { id, ...config });
  }

  for (const [slug, routeGraph] of routeGraphs) {
    for (const key of routeGraph) {
      if (entryGraph.has(key)) continue;
      for (const dynamicImport of manifest[key].dynamicImports ?? []) {
        const demoConfig = demoConfigsByManifestKey.get(dynamicImport);
        if (!demoConfig) {
          fail(`Unconfigured dynamic import ${dynamicImport} is reachable from React route /${slug} static graph.`);
        }
        if (demoConfig.route !== slug) {
          fail(`React demo "${demoConfig.id}" is dynamically imported by non-owner route /${slug}.`);
        }
      }
    }
  }

  const demos = [];
  for (const [id, config] of Object.entries(demoMap)) {
    const demoManifestKey = demoManifestKeys.get(id);
    if (entryGraph.has(demoManifestKey)) {
      fail(`React demo "${id}" is loaded by the application entry.`);
    }

    let ownerReferencesDemo = false;
    for (const [slug, routeGraph] of routeGraphs) {
      if (routeGraph.has(demoManifestKey)) {
        const ownerLabel = slug === config.route ? "owning initial route" : "initial route";
        fail(`React demo "${id}" is loaded by the ${ownerLabel} /${slug}.`);
      }

      const dynamicallyReferencesDemo = [...routeGraph].some((key) =>
        (manifest[key].dynamicImports ?? []).includes(demoManifestKey)
      );
      if (!dynamicallyReferencesDemo) continue;
      if (slug !== config.route) {
        fail(`React demo "${id}" is dynamically imported by non-owner route /${slug}.`);
      }
      ownerReferencesDemo = true;
    }
    if (!ownerReferencesDemo) {
      fail(`React demo "${id}" is not dynamically imported by owning route /${config.route}.`);
    }

    const owningRouteGraph = routeGraphs.get(config.route);
    const demoGraph = collectStaticGraph(manifest, [demoManifestKey]);
    for (const key of demoGraph) {
      if (entryGraph.has(key) || owningRouteGraph.has(key)) continue;
      for (const dynamicImport of manifest[key].dynamicImports ?? []) {
        if (!demoConfigsByManifestKey.has(dynamicImport)) {
          fail(`Unconfigured nested dynamic import ${dynamicImport} is reachable from React demo "${id}" static graph.`);
        }
      }
    }
    const alreadyLoadedForDemo = new Set(alreadyLoadedJavaScript);
    for (const key of owningRouteGraph) alreadyLoadedForDemo.add(manifest[key].file);

    const javascriptPaths = new Set();
    const cssPaths = new Set(routeCssPaths.get(config.route));
    for (const key of demoGraph) {
      const entry = manifest[key];
      if (!alreadyLoadedForDemo.has(entry.file)) javascriptPaths.add(entry.file);
      for (const cssFile of entry.css ?? []) cssPaths.add(cssFile);
    }

    const javascript = measureAssets(javascriptPaths, readAsset);
    const css = measureAssets(cssPaths, readAsset);
    javascript.limit = demoJsLimit;
    javascript.passes = javascript.bytes <= demoJsLimit;
    css.limit = cssLimit;
    css.passes = css.bytes <= cssLimit;
    const passes = javascript.passes && css.passes;

    demos.push({ id, route: config.route, passes, javascript, css });
    lines.push(
      `${passes ? "PASS" : "FAIL"} demo ${id} (/${config.route}): JS ${formatKiB(javascript.bytes)} / ${formatKiB(demoJsLimit)}, CSS ${formatKiB(css.bytes)} / ${formatKiB(cssLimit)}`,
    );
    lines.push(formatAssets("demo JS", javascript.assets));
    lines.push(formatAssets("demo CSS", css.assets));
  }

  return {
    passed: applicationEntry.passes
      && routes.every(({ passes }) => passes)
      && demos.every(({ passes }) => passes),
    lines,
    routes,
    demos,
    applicationEntry,
  };
};
