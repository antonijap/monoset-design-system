import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(testDirectory, "..");
const templateRoot = resolve(packageRoot, "template");
const templatePackage = JSON.parse(
  readFileSync(resolve(templateRoot, "package.json"), "utf8"),
);

function listSourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? listSourceFiles(path) : [path];
  });
}

test("template targets the React v1 component and current token packages", () => {
  assert.equal(templatePackage.dependencies["@monoset/react"], "^1.0.1");
  assert.equal(templatePackage.dependencies["@monoset/tokens"], "^1.0.0");
});

test("template avatars are named or explicitly decorative", () => {
  const sourceFiles = listSourceFiles(resolve(templateRoot, "src")).filter(
    (path) => [".js", ".jsx", ".ts", ".tsx"].includes(extname(path)),
  );

  for (const path of sourceFiles) {
    const source = readFileSync(path, "utf8");
    for (const match of source.matchAll(/<Avatar\b([^>]*)>/gs)) {
      assert.match(
        match[1],
        /\b(?:name\s*=|decorative\b)/,
        `Avatar is missing name or decorative in ${path}`,
      );
    }
  }
});
