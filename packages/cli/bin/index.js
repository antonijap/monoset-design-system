#!/usr/bin/env node

/**
 * @monoset/cli -- add Monoset components to your project as source files.
 *
 * Usage:
 *   monoset add <component> [component...]   Copy component source into your project
 *   monoset list                              Show all available components
 *   monoset add --all                         Copy every component
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { argv, cwd, exit } from "node:process";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const registryDir = resolve(__dirname, "..", "registry");
const registryPath = join(registryDir, "components.json");
const registry = JSON.parse(readFileSync(registryPath, "utf8"));

// ---------------------------------------------------------------------------
// GitHub raw URL for source files (pinned to main)
// ---------------------------------------------------------------------------

const GITHUB_RAW =
  "https://raw.githubusercontent.com/antonijap/monoset-design-system/main/packages/react/src";

const STYLES_URL =
  "https://raw.githubusercontent.com/antonijap/monoset-design-system/main/packages/react/src/styles.css";

// ---------------------------------------------------------------------------
// Terminal helpers
// ---------------------------------------------------------------------------

const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;

// ---------------------------------------------------------------------------
// CSS section extraction
// ---------------------------------------------------------------------------

/**
 * Pull a named section out of the full styles.css.
 * Sections are delimited by the banner comments:
 *   /* ===...===
 *      Section Name
 *      ===...=== *​/
 */
function extractCssSection(fullCss, sectionName) {
  const lines = fullCss.split("\n");
  const banner = /^\/\* =+$/;
  let capturing = false;
  let buf = [];
  let i = 0;

  while (i < lines.length) {
    if (banner.test(lines[i].trim())) {
      // Next line is the section title
      const title = (lines[i + 1] || "").trim();
      if (capturing) {
        // We hit the next section -- stop
        break;
      }
      if (title === sectionName) {
        // Skip the 3-line banner header, start capturing after it
        i += 3; // skip banner top, title, banner bottom
        capturing = true;
        continue;
      }
    }
    if (capturing) {
      buf.push(lines[i]);
    }
    i++;
  }

  // Trim trailing blank lines
  while (buf.length && buf[buf.length - 1].trim() === "") buf.pop();
  return buf.join("\n");
}

// ---------------------------------------------------------------------------
// Shared CSS preamble (utilities + focus ring)
// ---------------------------------------------------------------------------

function extractPreamble(fullCss) {
  const lines = fullCss.split("\n");
  const banner = /^\/\* =+$/;
  let buf = [];
  let hitFirstBanner = false;
  let hitSecondBanner = false;

  for (let i = 0; i < lines.length; i++) {
    if (banner.test(lines[i].trim())) {
      if (!hitFirstBanner) {
        hitFirstBanner = true;
        continue;
      }
      hitSecondBanner = true;
      break;
    }
    if (hitFirstBanner) {
      buf.push(lines[i]);
    }
  }

  // The preamble includes everything between the file header and the first
  // component section. Grab utilities + focus ring.
  // Actually, let's grab everything from line 7 (after file header) to the
  // first component section.
  const result = [];
  let pastHeader = false;
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!pastHeader) {
      // Skip the file-level banner (first 5 lines)
      if (i >= 5) pastHeader = true;
      else continue;
    }
    if (banner.test(trimmed)) break;
    result.push(lines[i]);
  }
  while (result.length && result[result.length - 1].trim() === "") result.pop();
  return result.join("\n");
}

// ---------------------------------------------------------------------------
// Fetch helper
// ---------------------------------------------------------------------------

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ---------------------------------------------------------------------------
// Resolve the full set of files needed
// ---------------------------------------------------------------------------

function resolveComponents(names) {
  const files = new Set();
  const deps = new Set();
  const cssSections = new Set();
  const unknown = [];
  const resolved = new Set();

  function resolve(key) {
    if (resolved.has(key)) return;
    resolved.add(key);
    const comp = registry[key];
    if (!comp) { unknown.push(key); return; }
    for (const f of comp.files) files.add(f);
    for (const d of comp.deps) deps.add(d);
    if (comp.cssSection) cssSections.add(comp.cssSection);
    for (const id of comp.internalDeps) {
      if (registry[id]) {
        resolve(id);
      }
    }
  }

  for (const n of names) resolve(n.toLowerCase());
  return { files, deps, cssSections, unknown };
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

const [command, ...args] = argv.slice(2);

// --- list ------------------------------------------------------------------

if (command === "list") {
  console.log(`\n${bold("Available components:")}\n`);

  const entries = Object.entries(registry).filter(([k]) => k !== "cx");
  const maxLen = Math.max(...entries.map(([, v]) => v.name.length));

  for (const [, val] of entries) {
    const name = val.name.padEnd(maxLen + 2);
    const deps = val.deps.length ? dim(val.deps.join(", ")) : "";
    console.log(`  ${cyan(name)}${deps}`);
  }

  console.log(`\n  ${dim(`${entries.length} components`)}\n`);
  exit(0);
}

// --- init ------------------------------------------------------------------

if (command === "init") {
  const outFlag = args.indexOf("--out");
  const outValue = outFlag !== -1 ? args[outFlag + 1] : null;
  const outDir = outValue
    ? resolve(cwd(), outValue)
    : resolve(cwd(), "src");

  console.log(`\n${bold("monoset")} ${dim("initializing...")}\n`);

  // Check for package.json
  const pkgPath = join(cwd(), "package.json");
  if (!existsSync(pkgPath)) {
    console.log(yellow("  No package.json found. Run this from your project root.\n"));
  }

  // Create the CSS entry point
  const cssContent = `/* Monoset tokens + component styles */
@import "@monoset/tokens/css";
@import "@monoset/react/styles.css";
`;
  const cssDest = join(outDir, "monoset.css");

  if (existsSync(cssDest) && !args.includes("--overwrite")) {
    console.log(`  ${dim("skip")} monoset.css ${dim("(exists, use --overwrite)")}`);
  } else {
    mkdirSync(dirname(cssDest), { recursive: true });
    writeFileSync(cssDest, cssContent);
    console.log(`  ${green("+")} ${cssDest.replace(cwd() + "/", "")}`);
  }

  console.log(`
  ${bold("Next steps:")}

  1. Install the packages:
     ${cyan("npm install @monoset/tokens @monoset/react")}

  2. Import the CSS in your entry file:
     ${dim('import "./monoset.css";')}

  3. Wrap your app with MonosetProvider:
     ${dim('<MonosetProvider>...</MonosetProvider>')}

  4. Start using components:
     ${dim('import { Button, Card, Badge } from "@monoset/react";')}
`);
  exit(0);
}

// --- add -------------------------------------------------------------------

if (command === "add") {
  if (args.length === 0) {
    console.log(red("\nSpecify at least one component, or --all.\n"));
    console.log(`  monoset add button card input`);
    console.log(`  monoset add --all\n`);
    exit(1);
  }

  const addAll = args.includes("--all");
  const overwrite = args.includes("--overwrite");
  const outFlag = args.indexOf("--out");
  const outValue = outFlag !== -1 ? args[outFlag + 1] : null;
  const outDir = outValue
    ? resolve(cwd(), outValue)
    : resolve(cwd(), "src/components/monoset");

  // Strip flags and their values from the component name list
  const skipIndices = new Set();
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--all" || args[i] === "--overwrite") {
      skipIndices.add(i);
    } else if (args[i] === "--out") {
      skipIndices.add(i);
      skipIndices.add(i + 1);
    }
  }

  const names = addAll
    ? Object.keys(registry)
    : args.filter((_, i) => !skipIndices.has(i));

  const { files, deps, cssSections, unknown } = resolveComponents(names);

  if (unknown.length) {
    console.log(yellow(`\nUnknown: ${unknown.join(", ")}`));
    console.log(dim("Run 'monoset list' to see available components.\n"));
  }

  if (files.size === 0) {
    console.log(red("Nothing to add."));
    exit(1);
  }

  mkdirSync(outDir, { recursive: true });

  console.log(`\n${bold("monoset")} ${dim("adding components...")}\n`);

  // Download component source files
  let downloaded = 0;
  let skipped = 0;

  for (const file of files) {
    const dest = join(outDir, file);
    if (existsSync(dest) && !overwrite) {
      console.log(`  ${dim("skip")} ${file} ${dim("(exists, use --overwrite)")}`);
      skipped++;
      continue;
    }

    try {
      let content = await fetchText(`${GITHUB_RAW}/${file}`);
      writeFileSync(dest, content);
      console.log(`  ${green("+")} ${file}`);
      downloaded++;
    } catch (err) {
      console.log(`  ${red("x")} ${file} ${dim(err.message)}`);
    }
  }

  // Download and extract CSS
  if (cssSections.size > 0) {
    try {
      const fullCss = await fetchText(STYLES_URL);
      const preamble = extractPreamble(fullCss);
      const sections = [...cssSections]
        .map((name) => {
          const css = extractCssSection(fullCss, name);
          if (!css) return "";
          return `/* ${name} */\n${css}`;
        })
        .filter(Boolean);

      const output = [
        "/* Monoset component styles -- generated by @monoset/cli */",
        "/* Requires @monoset/tokens/css to be imported first.     */",
        "",
        preamble,
        "",
        ...sections.map((s) => `\n${s}`),
        "",
      ].join("\n");

      const cssDest = join(outDir, "monoset.css");
      if (existsSync(cssDest) && !overwrite) {
        console.log(`  ${dim("skip")} monoset.css ${dim("(exists, use --overwrite)")}`);
      } else {
        writeFileSync(cssDest, output);
        console.log(`  ${green("+")} monoset.css`);
      }
    } catch (err) {
      console.log(`  ${red("x")} monoset.css ${dim(err.message)}`);
    }
  }

  console.log();

  if (downloaded === 0 && skipped > 0) {
    console.log(dim("  All files already exist. Use --overwrite to replace.\n"));
  }

  // Peer dependency instructions
  if (deps.size > 0) {
    console.log(`  ${bold("Install peer dependencies:")}`);
    console.log(`  npm install ${[...deps].join(" ")}\n`);
  }

  console.log(`  ${dim("Files written to")} ${outDir}`);
  console.log(`  ${dim("Import CSS:")} import "./monoset.css"\n`);
  exit(0);
}

// --- help (default) --------------------------------------------------------

console.log(`
${bold("monoset")} -- add Monoset to your project

${bold("Usage:")}
  monoset init                    Set up Monoset in your project
  monoset add <component> [...]   Add components as source files
  monoset add --all               Add every component
  monoset list                    List available components

${bold("Options:")}
  --out <dir>      Output directory (default varies by command)
  --overwrite      Overwrite existing files

${bold("Examples:")}
  monoset init
  monoset add button card input
  monoset add dialog tabs --out lib/ui
  monoset add --all --overwrite
`);
