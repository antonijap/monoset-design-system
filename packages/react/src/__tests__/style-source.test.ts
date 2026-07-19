import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { readStyleSourceAt } from "./style-source";

const temporaryDirectories: string[] = [];

function createFixture(files: Record<string, string>) {
  const directory = mkdtempSync(join(tmpdir(), "monoset-style-source-"));
  temporaryDirectories.push(directory);

  for (const [relativePath, source] of Object.entries(files)) {
    const filePath = resolve(directory, relativePath);
    mkdirSync(resolve(filePath, ".."), { recursive: true });
    writeFileSync(filePath, source);
  }

  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("recursive component style reader", () => {
  it("preserves import order and concatenates each leaf once", () => {
    const directory = createFixture({
      "styles.css": [
        '@import "./families/a.css";',
        '@import "./families/b.css";',
        '@import "./families/a.css";',
      ].join("\n"),
      "families/a.css": [
        '@import "../shared.css";',
        '@import "./a-leaf.css";',
      ].join("\n"),
      "families/b.css": [
        '@import "../shared.css";',
        '@import "./b-leaf.css";',
      ].join("\n"),
      "families/a-leaf.css": ".a { color: red; }\n",
      "families/b-leaf.css": ".b { color: blue; }\n",
      "shared.css": ".shared { color: currentColor; }\n",
    });

    expect(readStyleSourceAt(resolve(directory, "styles.css"))).toBe(
      ".shared { color: currentColor; }\n.a { color: red; }\n.b { color: blue; }\n",
    );
  });

  it("rejects circular imports", () => {
    const directory = createFixture({
      "styles.css": '@import "./a.css";\n',
      "a.css": '@import "./b.css";\n',
      "b.css": '@import "./a.css";\n',
    });

    expect(() => readStyleSourceAt(resolve(directory, "styles.css"))).toThrow(
      /Circular stylesheet import/,
    );
  });

  it("rejects missing imports with the unresolved path", () => {
    const directory = createFixture({
      "styles.css": '@import "./missing.css";\n',
    });

    expect(() => readStyleSourceAt(resolve(directory, "styles.css"))).toThrow(
      /Missing stylesheet import: .*missing\.css/,
    );
  });
});
