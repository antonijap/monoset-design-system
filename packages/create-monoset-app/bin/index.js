#!/usr/bin/env node
// Scaffold a new Monoset-powered app.
//
// Usage:
//   npm create monoset-app@latest my-app
//   npm create monoset-app@latest .          (scaffold into current dir)
//
// Deliberately minimal: Node's readline for prompts, fs for copying.
// No runtime deps so `npm create` is fast.

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout, argv, exit, cwd } from "node:process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const templateDir = resolve(here, "..", "template");

// -- styling ------------------------------------------------------------
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const color = (s, code) => `\x1b[${code}m${s}\x1b[0m`;
const hint = (s) => color(s, 90);

// -- target path --------------------------------------------------------
let target = argv[2];

async function promptName(rl) {
  const suggested = "my-monoset-app";
  const answer = (await rl.question(`${bold("?")} Project name ${hint("(" + suggested + ")")} `)).trim();
  return answer || suggested;
}

async function confirmOverwrite(rl, dir) {
  const entries = readdirSync(dir);
  if (entries.length === 0) return true;
  const ans = (await rl.question(`${color("!", 33)} ${dir} is not empty. Overwrite? ${hint("(y/N)")} `)).trim().toLowerCase();
  return ans === "y" || ans === "yes";
}

// -- main ---------------------------------------------------------------
const rl = createInterface({ input: stdin, output: stdout });

console.log(`\n${bold("Monoset")} ${dim("— scaffolding a new project")}\n`);

if (!target) target = await promptName(rl);

const targetPath = target === "." ? cwd() : resolve(cwd(), target);
const projectName = target === "." ? targetPath.split("/").pop() : target;

if (existsSync(targetPath) && readdirSync(targetPath).length > 0) {
  const ok = await confirmOverwrite(rl, targetPath);
  if (!ok) {
    console.log(dim("Aborted."));
    rl.close();
    exit(1);
  }
} else {
  mkdirSync(targetPath, { recursive: true });
}

rl.close();

// Copy template
cpSync(templateDir, targetPath, { recursive: true });

// Rewrite package.json with the chosen name
const pkgPath = join(targetPath, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
pkg.name = projectName;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

// Rename gitignore (npm strips .gitignore on publish; ship as _gitignore)
const gi = join(targetPath, "_gitignore");
if (existsSync(gi)) {
  cpSync(gi, join(targetPath, ".gitignore"));
  // best-effort cleanup
  try { readdirSync(targetPath); } catch {}
}

console.log(`\n  ${color("✓", 32)} Scaffolded ${bold(projectName)} in ${dim(targetPath)}\n`);
console.log(`  ${bold("Next steps:")}\n`);
if (target !== ".") console.log(`    cd ${target}`);
console.log(`    npm install`);
console.log(`    npm run dev\n`);
console.log(dim(`  Docs: https://monoset.design\n`));
