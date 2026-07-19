import { spawnSync } from "node:child_process";
import {
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import tsupConfig from "../../tsup.config";
import { STYLE_FAMILIES } from "./style-source";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(testDirectory, "../..");
const repositoryRoot = resolve(packageRoot, "../..");
const repositoryPackageJson = JSON.parse(
  readFileSync(resolve(repositoryRoot, "package.json"), "utf8"),
);
const packageJson = JSON.parse(
  readFileSync(resolve(packageRoot, "package.json"), "utf8"),
);
const packageReadme = readFileSync(resolve(packageRoot, "README.md"), "utf8");
const motionPackageJson = JSON.parse(
  readFileSync(resolve(repositoryRoot, "packages/motion/package.json"), "utf8"),
);
const publishGuard = resolve(repositoryRoot, "scripts/require-pnpm-publish.mjs");
const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const buildConfigurations = tsupConfig as Array<{
  name?: string;
  external?: Array<string | RegExp>;
  dts?: boolean;
}>;

function readPackedArchive(tarballPath: string) {
  const archive = gunzipSync(readFileSync(tarballPath));
  const entries = new Map<string, Buffer>();
  let offset = 0;

  while (offset + 512 <= archive.length) {
    const name = archive
      .subarray(offset, offset + 100)
      .toString("utf8")
      .replace(/\0.*$/, "");
    const sizeText = archive
      .subarray(offset + 124, offset + 136)
      .toString("utf8")
      .replace(/\0.*$/, "")
      .trim();
    const size = Number.parseInt(sizeText || "0", 8);
    const contentStart = offset + 512;

    entries.set(name, archive.subarray(contentStart, contentStart + size));

    offset = contentStart + Math.ceil(size / 512) * 512;
  }

  return entries;
}

function readPackedManifest(tarballPath: string) {
  const manifest = readPackedArchive(tarballPath).get("package/package.json");
  if (!manifest) throw new Error("Packed manifest was not found in the tarball");

  return JSON.parse(manifest.toString("utf8"));
}

const componentStyleEntries = [
  "button.css",
  "badge.css",
  "avatar.css",
  "card.css",
  "alert.css",
  "field.css",
  "input.css",
  "choice-controls.css",
  "select.css",
  "slider.css",
  "toggle.css",
  "tabs.css",
  "pagination.css",
  "breadcrumb.css",
  "accordion.css",
  "stepper.css",
  "navigation-menu.css",
  "collapsible.css",
  "table.css",
  "skeleton.css",
  "empty.css",
  "progress.css",
  "separator.css",
  "kbd.css",
  "spinner.css",
  "carousel.css",
  "aspect-ratio.css",
  "dialog.css",
  "menu.css",
  "sheet.css",
  "command.css",
  "hover-card.css",
  "combobox.css",
  "password-input.css",
  "number-input.css",
  "pin-input.css",
  "file-upload.css",
  "multi-combobox.css",
  "date-picker.css",
  "calendar.css",
];

const selectiveCssMap = {
  "button.css": { components: "Button, ThemeToggle", alsoLoad: "None" },
  "badge.css": { components: "Badge", alsoLoad: "None" },
  "avatar.css": { components: "Avatar", alsoLoad: "None" },
  "card.css": { components: "Card", alsoLoad: "None" },
  "alert.css": { components: "Alert", alsoLoad: "None" },
  "field.css": { components: "Field", alsoLoad: "None" },
  "input.css": { components: "Input, Textarea", alsoLoad: "None" },
  "choice-controls.css": { components: "Checkbox, Switch, RadioGroup, Radio", alsoLoad: "None" },
  "select.css": { components: "Select, SelectTrigger, SelectContent, SelectItem", alsoLoad: "menu.css; field.css when wrapped in Field" },
  "slider.css": { components: "Slider", alsoLoad: "None" },
  "toggle.css": { components: "Toggle, ToggleGroup, ToggleGroupItem", alsoLoad: "None" },
  "tabs.css": { components: "Tabs, TabsList, TabsTrigger, TabsContent", alsoLoad: "None" },
  "pagination.css": { components: "Pagination", alsoLoad: "None" },
  "breadcrumb.css": { components: "Breadcrumb", alsoLoad: "None" },
  "accordion.css": { components: "Accordion, AccordionItem, AccordionTrigger, AccordionContent", alsoLoad: "None" },
  "stepper.css": { components: "Stepper", alsoLoad: "None" },
  "navigation-menu.css": { components: "NavigationMenu family", alsoLoad: "None" },
  "collapsible.css": { components: "Collapsible, CollapsibleTrigger, CollapsibleContent", alsoLoad: "None" },
  "table.css": { components: "Table, TableHeader, TableSelectAll, TableSelectRow", alsoLoad: "None" },
  "skeleton.css": { components: "Skeleton", alsoLoad: "None" },
  "empty.css": { components: "EmptyState", alsoLoad: "None" },
  "progress.css": { components: "Progress", alsoLoad: "None" },
  "separator.css": { components: "Separator", alsoLoad: "None" },
  "kbd.css": { components: "Kbd", alsoLoad: "None" },
  "spinner.css": { components: "Spinner", alsoLoad: "None" },
  "carousel.css": { components: "Carousel", alsoLoad: "None" },
  "aspect-ratio.css": { components: "AspectRatio", alsoLoad: "None" },
  "dialog.css": { components: "Dialog, DialogTrigger, DialogContent, DialogClose", alsoLoad: "None" },
  "menu.css": { components: "Popover family, Tooltip, DropdownMenu family, ContextMenu family", alsoLoad: "None" },
  "sheet.css": { components: "Sheet, SheetTrigger, SheetContent, SheetClose", alsoLoad: "None" },
  "command.css": { components: "CommandPalette", alsoLoad: "None" },
  "hover-card.css": { components: "HoverCard, HoverCardTrigger, HoverCardContent", alsoLoad: "None" },
  "combobox.css": { components: "Combobox", alsoLoad: "None" },
  "password-input.css": { components: "PasswordInput", alsoLoad: "input.css" },
  "number-input.css": { components: "NumberInput", alsoLoad: "None" },
  "pin-input.css": { components: "PinInput", alsoLoad: "None" },
  "file-upload.css": { components: "FileUpload", alsoLoad: "None" },
  "multi-combobox.css": { components: "MultiCombobox", alsoLoad: "combobox.css" },
  "date-picker.css": { components: "DatePicker", alsoLoad: "calendar.css" },
  "calendar.css": { components: "Calendar", alsoLoad: "None" },
  "layout.css": { components: "Stack, Inline, Grid, Container, AppShell", alsoLoad: "None" },
  "feedback.css": { components: "Toast, ToastProvider", alsoLoad: "None" },
} as const;

const implementationDependencies = [
  "@radix-ui/react-accordion",
  "@radix-ui/react-aspect-ratio",
  "@radix-ui/react-avatar",
  "@radix-ui/react-checkbox",
  "@radix-ui/react-collapsible",
  "@radix-ui/react-context-menu",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-hover-card",
  "@radix-ui/react-navigation-menu",
  "@radix-ui/react-popover",
  "@radix-ui/react-progress",
  "@radix-ui/react-radio-group",
  "@radix-ui/react-select",
  "@radix-ui/react-separator",
  "@radix-ui/react-slot",
  "@radix-ui/react-slider",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-toast",
  "@radix-ui/react-toggle",
  "@radix-ui/react-toggle-group",
  "@radix-ui/react-tooltip",
  "framer-motion",
  "lucide-react",
  "react-aria-components",
  "@internationalized/date",
];

describe("React package installation policy", () => {
  it("retains React runtimes as the only peers", () => {
    expect(packageJson.peerDependencies).toEqual({
      react: ">=18",
      "react-dom": ">=18",
    });
    expect(packageJson.devDependencies).toMatchObject({
      react: expect.any(String),
      "react-dom": expect.any(String),
    });
  });

  it("installs implementation libraries as regular dependencies only", () => {
    for (const dependency of implementationDependencies) {
      expect(packageJson.dependencies[dependency], dependency).toEqual(
        expect.any(String),
      );
      expect(packageJson.peerDependencies[dependency], dependency).toBeUndefined();
      expect(packageJson.devDependencies[dependency], dependency).toBeUndefined();
    }
  });

  it("retains workspace ranges and CSS side effects", () => {
    expect(packageJson.dependencies["@monoset/motion"]).toBe("workspace:^1.0.0");
    expect(packageJson.dependencies["@monoset/tokens"]).toBe("workspace:^1.0.0");
    expect(packageJson.sideEffects).toEqual(["**/*.css"]);
  });

  it("keeps every implementation dependency external to each build", () => {
    for (const config of buildConfigurations) {
      for (const dependency of implementationDependencies) {
        expect(config.external, `${config.name}: ${dependency}`).toContain(dependency);
      }
    }
  });

  it("emits declarations for the CommonJS entry points", () => {
    expect(buildConfigurations.find((config) => config.name === "cjs")?.dts).toBe(true);
  });

  it("routes ESM and CommonJS runtimes to matching declarations", () => {
    expect(packageJson.exports["."]).toEqual({
      import: {
        types: "./dist/index.d.ts",
        default: "./dist/index.js",
      },
      require: {
        types: "./dist/index.d.cts",
        default: "./dist/index.cjs",
      },
    });
    expect(packageJson.exports["./motion"]).toEqual({
      import: {
        types: "./dist/motion.d.ts",
        default: "./dist/motion.js",
      },
      require: {
        types: "./dist/motion.d.cts",
        default: "./dist/motion.cjs",
      },
    });
    expect(motionPackageJson.exports["."]).toEqual({
      import: {
        types: "./dist/index.d.ts",
        default: "./dist/index.js",
      },
      require: {
        types: "./dist/index.d.cts",
        default: "./dist/index.cjs",
      },
    });
  });
});

describe("React package publish policy", () => {
  const runGuard = (userAgent: string) =>
    spawnSync(process.execPath, [publishGuard], {
      encoding: "utf8",
      env: { ...process.env, npm_config_user_agent: userAgent },
    });

  it("rejects npm and accepts pnpm", () => {
    const npmResult = runGuard("npm/11.0.0 node/v22.0.0");
    expect(npmResult.status).toBe(1);
    expect(npmResult.stderr).toContain(
      "Publish with pnpm or the Changesets release command.",
    );

    const pnpmResult = runGuard("pnpm/11.5.2 npm/? node/v22.0.0");
    expect(pnpmResult.status).toBe(0);
  });

  it("runs the pnpm guard before direct publication", () => {
    expect(packageJson.scripts.prepublishOnly).toBe(
      "node ../../scripts/require-pnpm-publish.mjs",
    );
    expect(repositoryPackageJson.scripts.release).toBe(
      "pnpm build && pnpm exec changeset publish",
    );
  });

  it("publishes aggregate and selective component styles", () => {
    expect(packageJson.files).toEqual(expect.arrayContaining(["src/styles.css", "src/styles"]));
    expect(packageJson.exports["./styles.css"]).toBe("./src/styles.css");
    expect(packageJson.exports["./styles/*.css"]).toBe("./src/styles/*.css");
    expect(packageJson.sideEffects).toEqual(["**/*.css"]);

    const aggregate = readFileSync(resolve(packageRoot, "src/styles.css"), "utf8");
    const imports = [...aggregate.matchAll(
      /^@import\s+["']\.\/styles\/([^"']+\.css)["'];$/gm,
    )].map(([, fileName]) => fileName);
    expect(imports).toEqual(STYLE_FAMILIES.map((family) => `${family}.css`));
  });

  it("documents the composition required by selective style entries", () => {
    expect(packageReadme).toContain("## Selective CSS");
    expect(packageReadme).toContain("Base owns shared utilities.");
    expect(packageReadme).toContain(
      "Feedback owns shared motion and accessibility fallbacks.",
    );

    const selectRecipe = [
      '@monoset/tokens/css',
      '@monoset/react/styles/base.css',
      '@monoset/react/styles/field.css',
      '@monoset/react/styles/menu.css',
      '@monoset/react/styles/select.css',
      '@monoset/react/styles/feedback.css',
    ];
    const selectSection = packageReadme.match(
      /This Select-with-Field example needs[^\n]*:\n\n```tsx\n([\s\S]*?)\n```/,
    );
    expect(selectSection).not.toBeNull();
    expect(
      [...selectSection![1].matchAll(/^import "([^"]+)";$/gm)].map(([, path]) => path),
    ).toEqual(selectRecipe);
    expect(packageReadme).toContain("Family entries are convenience bundles.");
    expect(packageReadme).toContain("Component entries minimize CSS.");
    expect(packageReadme).toContain(
      "Use `Toast` props or `useToast`; the unstyled subprimitive exports are gone.",
    );

    const tableRows = [...packageReadme.matchAll(
      /^\| `([^`]+\.css)` \| ([^|]+?) \| ([^|]+?) \|$/gm,
    )].map(([, entry, components, alsoLoad]) => [
      entry,
      { components: components.trim(), alsoLoad: alsoLoad.trim() },
    ]);
    expect(Object.fromEntries(tableRows)).toEqual(selectiveCssMap);
    expect(Object.keys(selectiveCssMap)).toEqual([
      ...componentStyleEntries,
      "layout.css",
      "feedback.css",
    ]);
  });

  it(
    "rewrites workspace dependencies in the packed manifest",
    () => {
      const packDirectory = mkdtempSync(join(tmpdir(), "monoset-react-pack-"));

      try {
        const packResult = spawnSync(
          pnpmCommand,
          ["pack", "--pack-destination", packDirectory],
          { cwd: packageRoot, encoding: "utf8" },
        );
        expect(packResult.status, packResult.stderr || packResult.stdout).toBe(0);

        const tarball = readdirSync(packDirectory).find((file) =>
          file.endsWith(".tgz"),
        );
        expect(tarball).toBeDefined();

        const tarballPath = resolve(packDirectory, tarball!);
        const packedManifest = readPackedManifest(tarballPath);
        expect(packedManifest.dependencies["@monoset/motion"]).toBe("^1.0.0");
        expect(packedManifest.dependencies["@monoset/tokens"]).toBe("^1.0.0");

        const packedEntries = readPackedArchive(tarballPath);
        for (const fileName of [
          ...STYLE_FAMILIES.map((family) => `${family}.css`),
          ...componentStyleEntries,
        ]) {
          expect(packedEntries.has(`package/src/styles/${fileName}`), fileName).toBe(true);
        }
      } finally {
        rmSync(packDirectory, { recursive: true, force: true });
      }
    },
    30_000,
  );
});
