import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "tsup";

const packageJson = JSON.parse(
  readFileSync("package.json", "utf8"),
) as { dependencies?: Record<string, string> };

const external = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
  ...Object.keys(packageJson.dependencies ?? {}),
];

const esmEntries = Object.fromEntries(
  readdirSync("src")
    .filter((file) => /\.(?:ts|tsx)$/.test(file) && !file.endsWith(".d.ts"))
    .map((file) => {
      const basename = path.basename(file, path.extname(file));
      const entryName =
        file === "motion-entry.ts"
          ? "motion"
          : file === "Motion.tsx"
            ? "_Motion"
            : basename;
      return [entryName, `src/${file}`];
    }),
);

const shared = {
  sourcemap: true,
  external,
  target: "es2020" as const,
  loader: { ".css": "copy" as const },
};

export default defineConfig([
  {
    ...shared,
    name: "esm",
    entry: esmEntries,
    format: ["esm"],
    dts: true,
    splitting: true,
    clean: true,
  },
  {
    ...shared,
    name: "cjs",
    entry: {
      index: "src/index.ts",
      motion: "src/motion-entry.ts",
    },
    format: ["cjs"],
    dts: true,
    splitting: false,
    clean: false,
  },
]);
