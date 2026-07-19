import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const STYLE_FAMILIES = [
  "base",
  "primitives",
  "controls",
  "navigation",
  "data",
  "overlays",
  "inputs",
  "layout",
  "feedback",
] as const;

export const REQUIRED_STYLE_FAMILIES = ["base", "feedback"] as const;

const testDirectory = dirname(fileURLToPath(import.meta.url));
export const sourceDirectory = resolve(testDirectory, "..");

export function readStyleImports() {
  const aggregate = readFileSync(resolve(sourceDirectory, "styles.css"), "utf8");

  return [...aggregate.matchAll(/^@import\s+["']\.\/styles\/([^"']+\.css)["'];$/gm)].map(
    ([, fileName]) => fileName,
  );
}

const cssImportPattern = /^@import\s+["']([^"']+\.css)["'];$/gm;

export function readStyleSourceAt(entryPath: string) {
  const visited = new Set<string>();
  const active = new Set<string>();

  function readRecursively(filePath: string): string {
    const absolutePath = resolve(filePath);
    if (active.has(absolutePath)) {
      throw new Error(`Circular stylesheet import: ${absolutePath}`);
    }
    if (visited.has(absolutePath)) return "";
    if (!existsSync(absolutePath)) {
      throw new Error(`Missing stylesheet import: ${absolutePath}`);
    }

    const source = readFileSync(absolutePath, "utf8");
    const imports = [...source.matchAll(cssImportPattern)].map(([, importPath]) =>
      resolve(dirname(absolutePath), importPath),
    );

    if (imports.length === 0) {
      visited.add(absolutePath);
      return source;
    }

    active.add(absolutePath);
    const result = imports.map(readRecursively).join("");
    active.delete(absolutePath);
    visited.add(absolutePath);
    return result;
  }

  return readRecursively(entryPath);
}

export function readComponentStyles() {
  return readStyleSourceAt(resolve(sourceDirectory, "styles.css"));
}
