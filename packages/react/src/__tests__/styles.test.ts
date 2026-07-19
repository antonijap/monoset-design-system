import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  readComponentStyles,
  readStyleImports,
  readStyleSourceAt,
  REQUIRED_STYLE_FAMILIES,
  sourceDirectory,
  STYLE_FAMILIES,
} from "./style-source";

const styles = readComponentStyles();
const datePickerSource = readFileSync(resolve(sourceDirectory, "DatePicker.tsx"), "utf8");
const overlayStyles = readStyleSourceAt(resolve(sourceDirectory, "styles/overlays.css"));
const feedbackStyles = readFileSync(resolve(sourceDirectory, "styles/feedback.css"), "utf8");

const COMPONENT_STYLE_ENTRIES = {
  primitives: [
    "button.css",
    "badge.css",
    "avatar.css",
    "card.css",
    "alert.css",
    "field.css",
    "input.css",
  ],
  controls: ["choice-controls.css", "select.css", "slider.css", "toggle.css"],
  navigation: [
    "tabs.css",
    "pagination.css",
    "breadcrumb.css",
    "accordion.css",
    "stepper.css",
    "navigation-menu.css",
    "collapsible.css",
  ],
  data: [
    "table.css",
    "skeleton.css",
    "empty.css",
    "progress.css",
    "separator.css",
    "kbd.css",
    "spinner.css",
    "carousel.css",
    "aspect-ratio.css",
  ],
  overlays: ["dialog.css", "menu.css", "sheet.css", "command.css", "hover-card.css"],
  inputs: [
    "combobox.css",
    "password-input.css",
    "number-input.css",
    "pin-input.css",
    "file-upload.css",
    "multi-combobox.css",
    "date-picker.css",
    "calendar.css",
  ],
} as const;

const importPattern = /^@import\s+["']\.\/([^"']+\.css)["'];$/gm;

function count(pattern: RegExp, value = styles) {
  return value.match(pattern)?.length ?? 0;
}

function mediaBlocks(query: string) {
  const blocks: string[] = [];
  let cursor = 0;

  while (cursor < styles.length) {
    const start = styles.indexOf(`@media ${query}`, cursor);
    if (start === -1) break;

    const openingBrace = styles.indexOf("{", start);
    let depth = 1;
    let end = openingBrace + 1;
    while (depth > 0 && end < styles.length) {
      if (styles[end] === "{") depth += 1;
      if (styles[end] === "}") depth -= 1;
      end += 1;
    }
    blocks.push(styles.slice(openingBrace + 1, end - 1));
    cursor = end;
  }

  return blocks.join("\n");
}

function withoutMediaBlocks(query: string) {
  let result = styles;
  let cursor = 0;

  while (cursor < result.length) {
    const start = result.indexOf(`@media ${query}`, cursor);
    if (start === -1) break;

    const openingBrace = result.indexOf("{", start);
    let depth = 1;
    let end = openingBrace + 1;
    while (depth > 0 && end < result.length) {
      if (result[end] === "{") depth += 1;
      if (result[end] === "}") depth -= 1;
      end += 1;
    }
    result = `${result.slice(0, start)}${result.slice(end)}`;
    cursor = start;
  }

  return result;
}

function classNames(value: string, prefix: string) {
  return [...new Set(value.match(new RegExp(`\\.${prefix}[a-z0-9_-]*`, "gi")) ?? [])].sort();
}

describe("React component CSS contracts", () => {
  it("keeps component entries in exact family cascade order", () => {
    for (const [family, expectedEntries] of Object.entries(COMPONENT_STYLE_ENTRIES)) {
      const familyPath = resolve(sourceDirectory, "styles", `${family}.css`);
      const familySource = readFileSync(familyPath, "utf8");
      const imports = [...familySource.matchAll(importPattern)].map(([, fileName]) => fileName);

      expect(imports, family).toEqual(expectedEntries);
      expect(familySource.replace(importPattern, "").trim(), family).toBe("");
      for (const entry of expectedEntries) {
        const entryPath = resolve(sourceDirectory, "styles", entry);
        expect(existsSync(entryPath), entry).toBe(true);
        const entrySource = readFileSync(entryPath, "utf8");
        expect(entrySource, entry).not.toMatch(/^\n/);
        expect(entrySource, entry).toMatch(/\n$/);
        expect(entrySource, entry).not.toMatch(/\n\n$/);
      }
    }
  });

  it("assigns every component style entry to one family", () => {
    const entries = Object.values(COMPONENT_STYLE_ENTRIES).flat();

    expect(new Set(entries).size).toBe(entries.length);
  });

  it("loads each style family once in stable cascade order", () => {
    const imports = readStyleImports();

    expect(imports).toEqual(STYLE_FAMILIES.map((family) => `${family}.css`));
    for (const family of REQUIRED_STYLE_FAMILIES) {
      expect(imports).toContain(`${family}.css`);
    }
  });

  it("keeps Select indicator spacing independent of family order", () => {
    expect(overlayStyles).toMatch(
      /\.ms-menu__item\s*\{[^}]*padding:\s*7px var\(--_ms-menu-item-padding-right, 10px\) 7px 10px;/,
    );
    expect(styles).toMatch(
      /\.ms-select__item\s*\{[^}]*--_ms-menu-item-padding-right:\s*32px;[^}]*position:\s*relative;/,
    );
    expect(styles).not.toContain(".ms-menu__item.ms-select__item");
  });

  it("keeps Sheet close-button styling in the overlay family", () => {
    expect(overlayStyles).toContain(".ms-sheet__close {");
    expect(overlayStyles).toContain(".ms-sheet__close:hover");
    expect(overlayStyles).toContain(".ms-sheet__close:focus-visible");
    expect(feedbackStyles).not.toContain(".ms-sheet__close");
    expect(count(/\.ms-sheet__close\s*\{/g)).toBe(1);
  });

  it("keeps menu primitives in one canonical component block", () => {
    expect(count(/Popover \/ Tooltip \/ DropdownMenu shared/g)).toBe(1);
    expect(count(/\.ms-menu\s*\{/g)).toBe(1);

    for (const selector of [
      ".ms-menu__item",
      ".ms-menu__shortcut",
      ".ms-menu__label",
      ".ms-menu__separator",
      ".ms-menu__indicator",
      ".ms-menu__sub-trigger",
      ".ms-menu__sub-content",
    ]) {
      expect(count(new RegExp(`\\${selector.replaceAll("-", "\\-")}\\s*\\{`, "g"))).toBe(1);
    }
  });

  it("does not retain DatePicker classes that the component never renders", () => {
    const styledClasses = classNames(styles, "ms-datepicker");
    const renderedClasses = [
      ...new Set(datePickerSource.match(/ms-datepicker[a-z0-9_-]*/gi) ?? []),
    ].map((className) => `.${className}`).sort();

    expect(styledClasses).toEqual(renderedClasses);
  });

  it("uses tokens instead of raw color literals in component rules", () => {
    expect(styles).not.toMatch(/#[0-9a-f]{3,8}\b|rgba?\(/i);
  });

  it("disables every CSS animation when reduced motion is requested", () => {
    const animatedCss = withoutMediaBlocks("(prefers-reduced-motion: reduce)");
    const animationOwners = [...animatedCss.matchAll(/([^{}]+)\{[^{}]*\banimation\s*:/g)]
      .flatMap((match) => classNames(match[1], "ms-"));
    const expectedOwners = [...new Set([...animationOwners, ".ms-progress__indicator"])].sort();
    const reducedMotion = mediaBlocks("(prefers-reduced-motion: reduce)");

    expect(reducedMotion).toContain("animation: none !important");
    for (const selector of expectedOwners) {
      const baseSelector = selector.split("--")[0];
      expect(
        reducedMotion.includes(selector) || reducedMotion.includes(baseSelector),
        `${selector} needs a reduced-motion override`,
      ).toBe(true);
    }
  });

  it("keeps custom controls visible in Windows forced-colors mode", () => {
    const forcedColors = mediaBlocks("(forced-colors: active)");

    expect(forcedColors).toMatch(/\b(?:Canvas|CanvasText|ButtonText|GrayText|Highlight|HighlightText)\b/);
    for (const selector of [
      ".ms-check__box",
      ".ms-switch__track",
      ".ms-radio__dot",
      ".ms-slider__thumb",
      ".ms-toggle",
      ".ms-carousel__dot",
      ".ms-progress__indicator",
      ".ms-datepicker__trigger",
    ]) {
      expect(forcedColors, `${selector} needs a forced-colors rule`).toContain(selector);
    }
  });

  it("keeps forced-colors overrides independent of component stylesheet order", () => {
    const forcedColors = mediaBlocks("(forced-colors: active)");
    const declarations = [...forcedColors.matchAll(
      /^\s*(background|border-color|color|forced-color-adjust|outline|outline-color|outline-offset):\s*([^;]+);$/gm,
    )];

    expect(declarations).toHaveLength(17);
    for (const [, property, value] of declarations) {
      expect(value, property).toMatch(/ !important$/);
    }
    expect(feedbackStyles.match(/!important/g)).toHaveLength(declarations.length + 2);
  });

  it("restores real outlines for box-shadow focus rings in forced-colors mode", () => {
    const forcedColors = mediaBlocks("(forced-colors: active)");
    const outlineOwners = [...forcedColors.matchAll(/([^{}]+)\{[^{}]*outline:\s*2px solid Highlight/g)]
      .flatMap((match) => classNames(match[1], "ms-"));

    for (const selector of [
      ".ms-input",
      ".ms-select",
      ".ms-numberinput",
      ".ms-pininput__cell",
      ".ms-fileupload__dropzone",
      ".ms-combobox__group",
      ".ms-cmd__input-wrap",
      ".ms-datepicker__trigger",
    ]) {
      expect(outlineOwners, `${selector} needs a forced-colors focus outline`).toContain(selector);
    }
  });

  it("uses system highlight colors for keyboard-driven active options", () => {
    const forcedColors = mediaBlocks("(forced-colors: active)");
    const highlightOwners = [...forcedColors.matchAll(
      /([^{}]+)\{[^{}]*background:\s*Highlight !important;[^{}]*color:\s*HighlightText !important;[^{}]*forced-color-adjust:\s*none !important;[^{}]*outline:\s*2px solid Highlight !important/g,
    )].flatMap((match) => classNames(match[1], "ms-"));

    for (const selector of [
      ".ms-menu__item",
      ".ms-cmd__item--active",
      ".ms-combobox__option--active",
    ]) {
      expect(highlightOwners, `${selector} needs a forced-colors active state`).toContain(selector);
    }
  });

  it("uses theme-aware semantic colors outside intentional inverse surfaces", () => {
    expect(styles).toMatch(
      /\.ms-radio__dot\s*\{[^}]*border:\s*1px solid var\(--border-strong\)/,
    );
    expect(styles).toMatch(
      /\.ms-radio__dot\[data-state="checked"\]\s*\{[^}]*border-color:\s*var\(--accent\)/,
    );
    expect(styles).toMatch(
      /\.ms-radio__dot\[data-state="checked"\]::after\s*\{[^}]*background:\s*var\(--accent\)/,
    );
    expect(styles).toMatch(
      /\.ms-table-select input\[type="checkbox"\]\s*\{[^}]*accent-color:\s*var\(--accent\)/,
    );
    expect(styles).toMatch(/\.ms-skeleton\s*\{[^}]*background:\s*var\(--bg-muted\)/);
    expect(styles).toMatch(
      /\.ms-progress__indicator\s*\{[^}]*background:\s*var\(--accent\)/,
    );
    expect(styles).toMatch(
      /\.ms-accordion__trigger:hover\s*\{[^}]*color:\s*var\(--fg1\)/,
    );
    expect(styles).toMatch(
      /\.ms-multicombobox__tag-remove:hover\s*\{[^}]*background:\s*var\(--bg-subtle\)/,
    );

    const componentRamps = styles
      .replaceAll(
        "background: color-mix(in srgb, var(--mono-1000) 40%, transparent);",
        "background: transparent;",
      )
      .replace(
        "background: var(--mono-1000); color: var(--mono-0);",
        "background: var(--bg-inverse); color: var(--fg-inverse);",
      );
    expect(componentRamps).not.toMatch(/var\(--mono-\d+\)/);
  });

  it("adapts narrow navigation and data-entry components", () => {
    const narrowStyles = mediaBlocks("(max-width: 480px)");

    for (const selector of [
      ".ms-tabs__list",
      ".ms-pagination",
      ".ms-breadcrumb__list",
      ".ms-stepper",
      ".ms-nav-list",
      ".ms-datepicker__trigger",
      ".ms-calendar",
      ".ms-container--padded",
    ]) {
      expect(narrowStyles, `${selector} needs a narrow-width rule`).toContain(selector);
    }
  });
});
