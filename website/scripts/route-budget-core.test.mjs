import assert from "node:assert/strict";
import { brotliCompressSync } from "node:zlib";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import {
  createDistAssetReader,
  verifyRouteBudgets,
} from "./route-budget-core.mjs";

const BASELINE_BUDGETS = [
  { path: "dist/assets/index-*.js", limit: "60 KB" },
  { path: "dist/assets/react-vendor-*.js", limit: "85 KB" },
  { path: "dist/assets/motion-*.js", limit: "50 KB" },
  { path: "dist/assets/browser-*.js", limit: "30 KB" },
];

const ROUTE_KEY = "src/pages/react-docs/groups/example.jsx";
const OTHER_ROUTE_KEY = "src/pages/react-docs/groups/other.jsx";
const ROUTE_MAP = { introduction: "./groups/example.jsx" };
const DEMO_KEY = "src/pages/react-docs/demos/example-demo.jsx";
const UNCONFIGURED_DYNAMIC_KEY = "src/pages/react-docs/demos/unconfigured.jsx";
const DEMO_MAP = {
  "introduction-example": {
    route: "introduction",
    module: "./demos/example-demo.jsx",
  },
};

const makeManifest = () => ({
  "index.html": {
    file: "assets/index-app.js",
    isEntry: true,
    imports: ["_react-vendor.js", "_motion.js"],
    css: ["assets/global.css"],
  },
  "_react-vendor.js": { file: "assets/react-vendor-vendor.js" },
  "_motion.js": { file: "assets/motion-motion.js" },
  "_browser.js": { file: "assets/browser-search.js" },
  [ROUTE_KEY]: {
    file: "assets/route-example.js",
    imports: ["_shared-a.js", "_shared-a.js", "_react-vendor.js", "_motion.js", "_browser.js"],
    css: ["assets/route.css", "assets/shared.css"],
    dynamicImports: [DEMO_KEY],
  },
  [OTHER_ROUTE_KEY]: {
    file: "assets/route-other.js",
    dynamicImports: [],
  },
  [DEMO_KEY]: {
    file: "assets/demo-example.js",
    imports: ["_shared-b.js", "_demo-shared.js", "_react-vendor.js"],
    css: ["assets/demo.css"],
  },
  [UNCONFIGURED_DYNAMIC_KEY]: {
    file: "assets/unconfigured.js",
  },
  "_demo-shared.js": { file: "assets/demo-shared.js" },
  "_shared-a.js": {
    file: "assets/shared-a.js",
    imports: ["_shared-b.js"],
    css: ["assets/shared.css"],
  },
  "_shared-b.js": {
    file: "assets/shared-b.js",
    imports: ["_shared-a.js"],
    css: ["assets/nested.css"],
  },
});

const ASSETS = {
  "assets/index-app.js": "entry payload",
  "assets/react-vendor-vendor.js": "react vendor payload",
  "assets/motion-motion.js": "motion payload",
  "assets/browser-search.js": "browser payload",
  "assets/route-example.js": "route payload",
  "assets/route-other.js": "other route payload",
  "assets/shared-a.js": "shared a payload",
  "assets/shared-b.js": "shared b payload",
  "assets/global.css": "html{color:black}",
  "assets/route.css": ".route{display:block}",
  "assets/shared.css": ".shared{display:grid}",
  "assets/nested.css": ".nested{display:flex}",
  "assets/demo-example.js": "demo payload",
  "assets/demo-shared.js": "demo shared payload",
  "assets/demo.css": ".demo{display:flex}",
  "assets/unconfigured.js": "unconfigured payload",
};

const makeFixture = (t) => {
  const distRoot = mkdtempSync(join(tmpdir(), "monoset-route-budgets-"));
  t.after(() => rmSync(distRoot, { recursive: true, force: true }));

  for (const [assetPath, contents] of Object.entries(ASSETS)) {
    const absolutePath = join(distRoot, assetPath);
    mkdirSync(dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, contents);
  }

  return {
    distRoot,
    readAsset: createDistAssetReader(distRoot),
  };
};

const verify = (options = {}) => verifyRouteBudgets({
  manifest: Object.hasOwn(options, "manifest") ? options.manifest : makeManifest(),
  routeMap: ROUTE_MAP,
  expectedSlugs: ["introduction"],
  navSlugs: ["introduction"],
  sizeLimitConfig: BASELINE_BUDGETS,
  demoMap: DEMO_MAP,
  ...options,
});

const compressedSize = (assetPaths) => assetPaths.reduce(
  (total, assetPath) => total + brotliCompressSync(Buffer.from(ASSETS[assetPath])).byteLength,
  0,
);

test("traverses cycles and transitive imports while counting unique incremental assets", (t) => {
  const { readAsset } = makeFixture(t);
  const result = verify({ readAsset, verbose: true });
  const route = result.routes[0];

  assert.equal(result.passed, true);
  assert.deepEqual(
    route.javascript.assets.map(({ path }) => path),
    ["assets/route-example.js", "assets/shared-a.js", "assets/shared-b.js"],
  );
  assert.equal(
    route.javascript.bytes,
    compressedSize(["assets/route-example.js", "assets/shared-a.js", "assets/shared-b.js"]),
  );
  assert.deepEqual(
    route.css.assets.map(({ path }) => path),
    ["assets/global.css", "assets/nested.css", "assets/route.css", "assets/shared.css"],
  );
  assert.equal(
    route.css.bytes,
    compressedSize(["assets/global.css", "assets/nested.css", "assets/route.css", "assets/shared.css"]),
  );
  assert.match(result.lines.join("\n"), /route-example\.js/);
  assert.match(result.lines.join("\n"), /global\.css/);
  assert.match(result.lines.join("\n"), /PASS application entry: JS \d+\.\d{2} KiB \/ \d+\.\d{2} KiB/);
  assert.match(result.lines.join("\n"), /PASS \/introduction: JS \d+\.\d{2} KiB \/ \d+\.\d{2} KiB, CSS \d+\.\d{2} KiB \/ \d+\.\d{2} KiB/);
  assert.doesNotMatch(result.lines.join("\n"), /\bkB\b/);
  assert.doesNotMatch(result.lines.join("\n"), /react-vendor-vendor\.js|motion-motion\.js|browser-search\.js/);
});

test("rejects a missing manifest", () => {
  assert.throws(
    () => verify({ manifest: undefined, readAsset: () => Buffer.alloc(0) }),
    /Missing Vite manifest/,
  );
});

test("rejects a route module missing from the manifest", (t) => {
  const { readAsset } = makeFixture(t);
  const manifest = makeManifest();
  delete manifest[ROUTE_KEY];

  assert.throws(
    () => verify({ manifest, readAsset }),
    /No Vite manifest entry found.*\.\/groups\/example\.jsx/,
  );
});

test("rejects missing and outside-dist assets", async (t) => {
  const { distRoot, readAsset } = makeFixture(t);
  rmSync(join(distRoot, "assets/shared-a.js"));

  assert.throws(
    () => verify({ readAsset }),
    /Manifest asset is missing: assets\/shared-a\.js/,
  );

  const manifest = makeManifest();
  manifest[ROUTE_KEY].file = "../outside.js";
  assert.throws(
    () => verify({ manifest, readAsset: createDistAssetReader(distRoot) }),
    /Manifest asset points outside dist: \.\.\/outside\.js/,
  );
});

test("fails JavaScript overages with an actionable asset breakdown", (t) => {
  const { readAsset } = makeFixture(t);
  const result = verify({ readAsset, jsLimit: 0 });

  assert.equal(result.passed, false);
  assert.match(result.lines.join("\n"), /FAIL \/introduction: JS/);
  assert.match(result.lines.join("\n"), /JS assets:.*route-example\.js.*shared-a\.js.*shared-b\.js/);
});

test("fails CSS overages with an actionable asset breakdown", (t) => {
  const { readAsset } = makeFixture(t);
  const result = verify({ readAsset, cssLimit: 0 });

  assert.equal(result.passed, false);
  assert.match(result.lines.join("\n"), /FAIL \/introduction: JS/);
  assert.match(result.lines.join("\n"), /CSS assets:.*global\.css.*nested\.css.*route\.css.*shared\.css/);
});

test("counts hidden entry-graph JavaScript once under the configured application budget", (t) => {
  const { distRoot, readAsset } = makeFixture(t);
  const manifest = makeManifest();
  manifest["index.html"].imports.push("_hidden.js");
  manifest[ROUTE_KEY].imports.push("_hidden.js");
  manifest["_hidden.js"] = { file: "assets/hidden-shared.js" };
  writeFileSync(join(distRoot, "assets/hidden-shared.js"), "hidden baseline payload");

  const result = verify({ manifest, readAsset });

  assert.equal(result.applicationEntry.limit, 60_000);
  assert.deepEqual(
    result.applicationEntry.assets.map(({ path }) => path),
    ["assets/hidden-shared.js", "assets/index-app.js"],
  );
  assert.doesNotMatch(
    result.applicationEntry.assets.map(({ path }) => path).join("\n"),
    /react-vendor|motion/,
  );
  assert.doesNotMatch(
    result.routes[0].javascript.assets.map(({ path }) => path).join("\n"),
    /hidden-shared/,
  );
  assert.match(result.lines.join("\n"), /application entry JS assets:.*hidden-shared\.js.*index-app\.js/);
});

test("parses metric and IEC size-limit units case-insensitively", (t) => {
  const { readAsset } = makeFixture(t);
  const limits = new Map([
    ["1.5 MB", 1_500_000],
    ["2 kb", 2_000],
    ["1.5 MiB", 1_572_864],
    ["2 kIb", 2_048],
  ]);

  for (const [limit, expectedBytes] of limits) {
    const sizeLimitConfig = BASELINE_BUDGETS.map((budget) => (
      budget.path === "dist/assets/index-*.js" ? { ...budget, limit } : budget
    ));
    const result = verify({ readAsset, sizeLimitConfig });

    assert.equal(result.applicationEntry.limit, expectedBytes, limit);
  }
});

test("accepts a numeric zero-byte application budget", (t) => {
  const { readAsset } = makeFixture(t);
  const sizeLimitConfig = BASELINE_BUDGETS.map((budget) => (
    budget.path === "dist/assets/index-*.js" ? { ...budget, limit: 0 } : budget
  ));

  const result = verify({ readAsset, sizeLimitConfig });

  assert.equal(result.applicationEntry.limit, 0);
  assert.equal(result.applicationEntry.passes, false);
});

test("fails when the full application entry graph exceeds its configured budget", (t) => {
  const { distRoot, readAsset } = makeFixture(t);
  const manifest = makeManifest();
  manifest["index.html"].imports.push("_hidden.js");
  manifest["_hidden.js"] = { file: "assets/hidden-shared.js" };
  writeFileSync(join(distRoot, "assets/hidden-shared.js"), "hidden baseline payload");
  const sizeLimitConfig = BASELINE_BUDGETS.map((budget) => (
    budget.path === "dist/assets/index-*.js" ? { ...budget, limit: "1 B" } : budget
  ));

  const result = verify({ manifest, readAsset, sizeLimitConfig });

  assert.equal(result.passed, false);
  assert.equal(result.applicationEntry.passes, false);
  assert.equal(result.applicationEntry.limit, 1);
  assert.match(result.lines.join("\n"), /FAIL application entry: JS/);
  assert.match(result.lines.join("\n"), /application entry JS assets:.*hidden-shared\.js.*index-app\.js/);
});

test("rejects separately budgeted exclusions when their size-limit baseline drifts", (t) => {
  const { readAsset } = makeFixture(t);
  const sizeLimitConfig = BASELINE_BUDGETS.filter(({ path }) => !path.includes("browser-"));

  assert.throws(
    () => verify({ readAsset, sizeLimitConfig }),
    /Missing size-limit baseline for browser JavaScript/,
  );
});

test("measures configured on-demand demos after the app and owning route", (t) => {
  const { readAsset } = makeFixture(t);
  const result = verify({ readAsset, demoMap: DEMO_MAP, verbose: true });
  const demo = result.demos[0];

  assert.equal(result.passed, true);
  assert.equal(demo.id, "introduction-example");
  assert.equal(demo.route, "introduction");
  assert.equal(demo.javascript.limit, 85 * 1024);
  assert.deepEqual(
    demo.javascript.assets.map(({ path }) => path),
    ["assets/demo-example.js", "assets/demo-shared.js"],
  );
  assert.deepEqual(
    demo.css.assets.map(({ path }) => path),
    ["assets/demo.css", "assets/global.css", "assets/nested.css", "assets/route.css", "assets/shared.css"],
  );
  assert.match(result.lines.join("\n"), /PASS demo introduction-example \(\/introduction\): JS/);
  assert.match(result.lines.join("\n"), /demo JS assets:.*demo-example\.js.*demo-shared\.js/);
  assert.match(result.lines.join("\n"), /demo CSS assets:.*demo\.css.*global\.css.*route\.css/);
});

test("enforces the named on-demand demo JavaScript cap", (t) => {
  const { readAsset } = makeFixture(t);
  const result = verify({ readAsset, demoMap: DEMO_MAP, demoJsLimit: 0 });

  assert.equal(result.passed, false);
  assert.equal(result.demos[0].javascript.passes, false);
  assert.match(result.lines.join("\n"), /FAIL demo introduction-example/);
});

test("includes global, owning route, and demo CSS in the demo cap", (t) => {
  const { readAsset } = makeFixture(t);
  const result = verify({ readAsset, demoMap: DEMO_MAP, cssLimit: 0 });

  assert.equal(result.passed, false);
  assert.equal(result.demos[0].css.passes, false);
  assert.match(result.lines.join("\n"), /demo CSS assets:.*demo\.css.*global\.css.*nested\.css.*route\.css.*shared\.css/);
});

test("rejects missing, duplicate, and disconnected demo modules", (t) => {
  const { readAsset } = makeFixture(t);

  assert.throws(
    () => verify({ readAsset, demoMap: { missing: { route: "introduction", module: "./demos/missing.jsx" } } }),
    /No Vite manifest entry found for React demo module/,
  );
  assert.throws(
    () => verify({
      readAsset,
      demoMap: {
        first: DEMO_MAP["introduction-example"],
        second: DEMO_MAP["introduction-example"],
      },
    }),
    /Duplicate React demo module/,
  );

  const manifest = makeManifest();
  manifest[ROUTE_KEY].dynamicImports = [];
  assert.throws(
    () => verify({ manifest, readAsset, demoMap: DEMO_MAP }),
    /is not dynamically imported by owning route/,
  );
});

test("rejects demos owned by unknown routes or loaded in the initial route graph", (t) => {
  const { readAsset } = makeFixture(t);
  assert.throws(
    () => verify({
      readAsset,
      demoMap: { unknown: { route: "missing", module: "./demos/example-demo.jsx" } },
    }),
    /unknown React route/,
  );

  const manifest = makeManifest();
  manifest[ROUTE_KEY].imports.push(DEMO_KEY);
  assert.throws(
    () => verify({ manifest, readAsset, demoMap: DEMO_MAP }),
    /loaded by the owning initial route/,
  );
});

test("rejects demos loaded by the app or referenced by non-owner routes", (t) => {
  const { readAsset } = makeFixture(t);

  const appLoadedManifest = makeManifest();
  appLoadedManifest["index.html"].imports.push(DEMO_KEY);
  assert.throws(
    () => verify({ manifest: appLoadedManifest, readAsset, demoMap: DEMO_MAP }),
    /loaded by the application entry/,
  );

  const routeMap = {
    ...ROUTE_MAP,
    other: "./groups/other.jsx",
  };
  const nonOwnerLoadedManifest = makeManifest();
  nonOwnerLoadedManifest[OTHER_ROUTE_KEY].imports = [DEMO_KEY];
  assert.throws(
    () => verify({
      manifest: nonOwnerLoadedManifest,
      routeMap,
      expectedSlugs: ["introduction", "other"],
      navSlugs: ["introduction", "other"],
      readAsset,
      demoMap: DEMO_MAP,
    }),
    /loaded by the initial route \/other/,
  );

  const nonOwnerDynamicManifest = makeManifest();
  nonOwnerDynamicManifest[OTHER_ROUTE_KEY].dynamicImports = [DEMO_KEY];
  assert.throws(
    () => verify({
      manifest: nonOwnerDynamicManifest,
      routeMap,
      expectedSlugs: ["introduction", "other"],
      navSlugs: ["introduction", "other"],
      readAsset,
      demoMap: DEMO_MAP,
    }),
    /dynamically imported by non-owner route \/other/,
  );
});

test("rejects unconfigured dynamic imports reachable from routes and demos", (t) => {
  const { readAsset } = makeFixture(t);

  const routeManifest = makeManifest();
  routeManifest[ROUTE_KEY].dynamicImports.push(UNCONFIGURED_DYNAMIC_KEY);
  assert.throws(
    () => verify({ manifest: routeManifest, readAsset, demoMap: DEMO_MAP }),
    /[Uu]nconfigured dynamic import.*unconfigured\.jsx.*route \/introduction/,
  );

  const demoManifest = makeManifest();
  demoManifest[DEMO_KEY].dynamicImports = [UNCONFIGURED_DYNAMIC_KEY];
  assert.throws(
    () => verify({ manifest: demoManifest, readAsset, demoMap: DEMO_MAP }),
    /[Uu]nconfigured nested dynamic import.*unconfigured\.jsx.*demo "introduction-example"/,
  );
});
