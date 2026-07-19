import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const tokenSource = resolve(testDirectory, "..");
const tokensPackage = JSON.parse(
  readFileSync(resolve(tokenSource, "../package.json"), "utf8"),
);

const readCss = (file: string) =>
  readFileSync(resolve(tokenSource, file), "utf8");

describe("token CSS entries", () => {
  it("keeps the variables entry limited to custom-property scopes", () => {
    const css = readCss("variables.css");

    expect(css).toContain(":root");
    expect(css).toMatch(/--[a-z0-9-]+\s*:/i);
    expect(css).not.toMatch(/@import\s+url|@font-face/i);
    expect(css).not.toMatch(
      /(^|[},]\s*)(html|body|h[1-6]|p|a|code|kbd|hr|::selection)(?=\s|,|\{)/im,
    );
  });

  it("keeps reset concerns in the opt-in base entry", () => {
    const css = readCss("base.css");

    expect(css).toMatch(/html\s*,\s*body/);
    expect(css).toMatch(/background\s*:\s*var\(--bg\)/);
    expect(css).toMatch(/color\s*:\s*var\(--fg1\)/);
    expect(css).not.toMatch(/font-family\s*:/);
    expect(css).not.toMatch(/@import\s+url|@font-face/i);
  });

  it("keeps type defaults in the opt-in typography entry", () => {
    const css = readCss("typography.css");

    expect(css).toMatch(/font-family\s*:\s*var\(--font-sans\)/);
    expect(css).toMatch(/h1\s*,\s*\.h1/);
    expect(css).toMatch(/code\s*,\s*\.code/);
    expect(css).not.toMatch(/@import\s+url|@font-face/i);
  });

  it("composes only the local CSS layers in the compatibility entry", () => {
    const css = readCss("index.css");

    expect(css).toMatch(/@import\s+["']\.\/variables\.css["']/);
    expect(css).toMatch(/@import\s+["']\.\/base\.css["']/);
    expect(css).toMatch(/@import\s+["']\.\/typography\.css["']/);
    expect(css).not.toMatch(/https?:\/\/|@import\s+url/i);
  });

  it("exports each opt-in layer and retains the compatibility entry", () => {
    expect(tokensPackage.exports).toMatchObject({
      "./variables.css": "./src/variables.css",
      "./base.css": "./src/base.css",
      "./typography.css": "./src/typography.css",
      "./css": "./src/index.css",
    });
  });

  it("publishes only runtime token sources", () => {
    expect(tokensPackage.files).toEqual([
      "src/tokens.js",
      "src/tokens.d.ts",
      "src/tokens.json",
      "src/index.css",
      "src/variables.css",
      "src/base.css",
      "src/typography.css",
      "dist",
    ]);
  });

  it("does not retain the legacy monolithic stylesheet", () => {
    expect(existsSync(resolve(tokenSource, "colors_and_type.css"))).toBe(false);
  });
});
