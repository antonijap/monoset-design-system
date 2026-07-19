import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readJson(path) {
  return JSON.parse(readFileSync(resolve(repositoryRoot, path), "utf8"));
}

function changelogHeadings(path) {
  const changelogPath = resolve(repositoryRoot, path);
  if (!existsSync(changelogPath)) return null;

  return new Set(
    [...readFileSync(changelogPath, "utf8").matchAll(/^## (\d+\.\d+\.\d+)$/gm)]
      .map((match) => match[1]),
  );
}

const packages = {
  react: readJson("packages/react/package.json"),
  tokens: readJson("packages/tokens/package.json"),
  motion: readJson("packages/motion/package.json"),
  cli: readJson("packages/cli/package.json"),
  mcpServer: readJson("packages/mcp-server/package.json"),
  createApp: readJson("packages/create-monoset-app/package.json"),
};

test("the stable React stack uses the approved release versions", () => {
  assert.equal(packages.react.version, "1.0.2");
  assert.equal(packages.tokens.version, "1.0.0");
  assert.equal(packages.motion.version, "1.0.0");
  assert.equal(packages.cli.version, "1.0.0");
  assert.equal(packages.mcpServer.version, "1.0.0");
  assert.equal(packages.createApp.version, "1.0.0");
});

test("React and the website target the stable companion packages", () => {
  const website = readJson("website/package.json");

  assert.equal(packages.react.dependencies["@monoset/motion"], "workspace:^1.0.0");
  assert.equal(packages.react.dependencies["@monoset/tokens"], "workspace:^1.0.0");
  assert.equal(website.dependencies["@monoset/tokens"], "workspace:^1.0.0");
});

test("the starter installs the stable React stack", () => {
  const template = readJson("packages/create-monoset-app/template/package.json");

  assert.equal(template.dependencies["@monoset/react"], "^1.0.1");
  assert.equal(template.dependencies["@monoset/tokens"], "^1.0.0");
});

test("changelogs preserve known published release history", () => {
  const expectedHistory = {
    "packages/react/CHANGELOG.md": ["0.6.0"],
    "packages/cli/CHANGELOG.md": ["0.1.0"],
    "packages/mcp-server/CHANGELOG.md": ["0.1.0"],
    "packages/create-monoset-app/CHANGELOG.md": ["0.1.0"],
    "packages/native/CHANGELOG.md": ["0.3.0", "0.2.0"],
    "packages/motion-native/CHANGELOG.md": ["0.1.0"],
  };
  const missing = [];

  for (const [path, versions] of Object.entries(expectedHistory)) {
    const headings = changelogHeadings(path);
    if (!headings) {
      missing.push(`${path} is missing`);
      continue;
    }

    for (const version of versions) {
      if (!headings.has(version)) missing.push(`${path} is missing ## ${version}`);
    }
  }

  assert.deepEqual(missing, []);
});
