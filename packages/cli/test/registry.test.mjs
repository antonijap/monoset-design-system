import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, extname, isAbsolute, relative, resolve } from "node:path";
import test from "node:test";
import ts from "typescript";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(here, "..");
const reactSource = resolve(packageRoot, "..", "react", "src");
const registry = JSON.parse(
  await readFile(resolve(packageRoot, "registry", "components.json"), "utf8"),
);

test("every registry source file exists", async () => {
  for (const [key, entry] of Object.entries(registry)) {
    for (const file of entry.files) {
      const sourcePath = resolve(reactSource, file);
      const relativePath = relative(reactSource, sourcePath);
      assert.equal(
        isAbsolute(relativePath) || relativePath.startsWith(".."),
        false,
        `${key} points outside the React source directory: ${file}`,
      );
      await assert.doesNotReject(
        readFile(sourcePath),
        `${key} points to missing React source: ${file}`,
      );
    }
  }
});

test("every internal dependency is registered", () => {
  for (const [key, entry] of Object.entries(registry)) {
    for (const dependency of entry.internalDeps) {
      assert.ok(registry[dependency], `${key} points to unknown internal dependency: ${dependency}`);
    }
  }
});

function collectTransitiveFiles(key, visited = new Set()) {
  if (visited.has(key)) return new Set();
  visited.add(key);
  const entry = registry[key];
  const files = new Set(entry.files);
  for (const dependency of entry.internalDeps) {
    for (const file of collectTransitiveFiles(dependency, visited)) files.add(file);
  }
  return files;
}

function findStaticRelativeImports(file, source) {
  const imports = new Set();
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    false,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  for (const statement of sourceFile.statements) {
    if (
      (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) &&
      statement.moduleSpecifier &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.moduleSpecifier.text.startsWith("./")
    ) {
      imports.add(statement.moduleSpecifier.text);
    }
  }
  return imports;
}

async function resolveLocalSource(importer, specifier) {
  const base = resolve(dirname(importer), specifier);
  const candidates = extname(base)
    ? [base]
    : [
        base,
        `${base}.ts`,
        `${base}.tsx`,
        `${base}.js`,
        `${base}.jsx`,
        resolve(base, "index.ts"),
        resolve(base, "index.tsx"),
      ];
  for (const candidate of candidates) {
    try {
      await readFile(candidate);
      return candidate;
    } catch {
      // Try the next source extension.
    }
  }
  return null;
}

test("every registry entry includes the closure of its local static imports", async () => {
  for (const key of Object.keys(registry)) {
    const copiedFiles = collectTransitiveFiles(key);
    for (const file of copiedFiles) {
      const importer = resolve(reactSource, file);
      const source = await readFile(importer, "utf8");
      for (const specifier of findStaticRelativeImports(file, source)) {
        const importedSource = await resolveLocalSource(importer, specifier);
        assert.ok(
          importedSource,
          `${key} has an unresolved local import from ${file}: ${specifier}`,
        );
        const importedFile = relative(reactSource, importedSource);
        assert.equal(
          isAbsolute(importedFile) || importedFile.startsWith(".."),
          false,
          `${key} imports outside the React source directory from ${file}: ${specifier}`,
        );
        assert.ok(
          copiedFiles.has(importedFile),
          `${key} copies ${file}, but omits its local import ${importedFile}`,
        );
      }
    }
  }
});
