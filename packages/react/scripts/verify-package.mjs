import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { gzipSync } from "node:zlib";
import {
  cp,
  access,
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execute = promisify(execFile);
const packageDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryDirectory = path.resolve(packageDirectory, "../..");
const fixtureDirectory = path.join(packageDirectory, "fixtures/consumer");
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const packageManifest = JSON.parse(
  await readFile(path.join(packageDirectory, "package.json"), "utf8"),
);

async function run(command, args, cwd, options = {}) {
  const { stdout, stderr } = await execute(command, args, {
    cwd,
    env: { ...process.env, CI: "1" },
    maxBuffer: 20 * 1024 * 1024,
    ...options,
  });
  if (stdout.trim()) process.stdout.write(stdout);
  if (stderr.trim()) process.stderr.write(stderr);
}

async function pack(packagePath, packDirectory) {
  await run(pnpm, ["pack", "--pack-destination", packDirectory], packagePath);
  const files = await readdir(packDirectory);
  const manifest = JSON.parse(await readFile(path.join(packagePath, "package.json"), "utf8"));
  const expected = `${manifest.name.replace(/^@/, "").replace("/", "-")}-${manifest.version}.tgz`;
  const archive = files.find((file) => file === expected);
  assert.ok(archive, `pnpm pack did not create ${expected}`);
  return path.join(packDirectory, archive);
}

async function sourceStoreDirectory() {
  const modules = await readFile(path.join(repositoryDirectory, "node_modules/.modules.yaml"), "utf8");
  const match = modules.match(/^[ ]*"?storeDir"?:[ ]*"([^"]+)"/m);
  return match?.[1];
}

async function verifyExternalBuildBoundary() {
  const distDirectory = path.join(packageDirectory, "dist");
  const distFiles = await readdir(distDirectory);
  const moduleFiles = distFiles.filter((file) => /\.(?:js|cjs)$/.test(file));
  const moduleText = (
    await Promise.all(
      moduleFiles.map((file) => readFile(path.join(distDirectory, file), "utf8")),
    )
  ).join("\n");

  for (const dependency of ["react-aria-components", "@internationalized/date"]) {
    assert.ok(
      moduleText.includes(`"${dependency}"`) || moduleText.includes(`'${dependency}'`),
      `The built package does not preserve an external import for ${dependency}.`,
    );
  }

  const sourceMapFiles = distFiles.filter((file) => /\.(?:js|cjs)\.map$/.test(file));
  const sourceMapSources = (
    await Promise.all(
      sourceMapFiles.map(async (file) => {
        const sourceMap = JSON.parse(await readFile(path.join(distDirectory, file), "utf8"));
        return sourceMap.sources ?? [];
      }),
    )
  ).flat();

  for (const dependency of ["react-aria-components", "@internationalized/date"]) {
    assert.equal(
      sourceMapSources.some((source) =>
        source.replaceAll("\\", "/").includes(`/node_modules/${dependency}/`),
      ),
      false,
      `The built package inlined ${dependency} implementation sources.`,
    );
  }
}

async function verifyCommonJsDeclarations() {
  await Promise.all([
    access(path.join(repositoryDirectory, "packages/motion/dist/index.d.cts")),
    access(path.join(packageDirectory, "dist/index.d.cts")),
    access(path.join(packageDirectory, "dist/motion.d.cts")),
  ]);
}

async function verify() {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "monoset-react-package-"));
  const packDirectory = path.join(temporaryDirectory, "packs");
  const consumerDirectory = path.join(temporaryDirectory, "consumer");
  const generatedDirectories = [
    path.join(repositoryDirectory, "packages/motion/dist"),
    path.join(packageDirectory, "dist"),
  ];
  const generatedBackups = [];

  try {
    for (const generatedDirectory of generatedDirectories) {
      try {
        await access(generatedDirectory);
        const backup = path.join(
          temporaryDirectory,
          `backup-${generatedBackups.length}`,
        );
        await cp(generatedDirectory, backup, { recursive: true });
        generatedBackups.push({ generatedDirectory, backup, existed: true });
      } catch {
        generatedBackups.push({ generatedDirectory, backup: null, existed: false });
      }
    }

    await mkdir(packDirectory, { recursive: true });
    await run(pnpm, ["--filter", "@monoset/tokens", "build"], repositoryDirectory);
    await run(pnpm, ["--filter", "@monoset/motion", "build"], repositoryDirectory);
    await run(pnpm, ["--filter", "@monoset/react", "build"], repositoryDirectory);
    await verifyExternalBuildBoundary();
    await verifyCommonJsDeclarations();

    const tokensArchive = await pack(path.join(repositoryDirectory, "packages/tokens"), packDirectory);
    const motionArchive = await pack(path.join(repositoryDirectory, "packages/motion"), packDirectory);
    const reactArchive = await pack(packageDirectory, packDirectory);

    await mkdir(path.join(consumerDirectory, "src"), { recursive: true });
    await cp(path.join(fixtureDirectory, "index.html"), path.join(consumerDirectory, "index.html"));
    await cp(
      path.join(fixtureDirectory, "src/main.tsx"),
      path.join(consumerDirectory, "src/main.tsx"),
    );

    await writeFile(
      path.join(consumerDirectory, "package.json"),
      `${JSON.stringify({
        name: "monoset-packed-consumer",
        private: true,
        version: "0.0.0",
        type: "module",
        dependencies: {
          "@monoset/motion": `file:${motionArchive}`,
          "@monoset/react": `file:${reactArchive}`,
          "@monoset/tokens": `file:${tokensArchive}`,
          "@internationalized/date": packageManifest.dependencies["@internationalized/date"],
          react: "18.3.1",
          "react-aria-components": packageManifest.dependencies["react-aria-components"],
          "react-dom": "18.3.1",
        },
        devDependencies: {
          "@types/react": "18.3.28",
          "@types/react-dom": "18.3.7",
          typescript: "5.9.3",
          vite: "8.0.16",
        },
      }, null, 2)}\n`,
    );
    await writeFile(
      path.join(consumerDirectory, "pnpm-workspace.yaml"),
      `overrides:\n  "@monoset/motion": "file:${motionArchive}"\n  "@monoset/tokens": "file:${tokensArchive}"\n`,
    );

    const storeDirectory = await sourceStoreDirectory();
    const installArgs = [
      "install",
      "--prefer-offline",
      "--ignore-scripts",
      "--no-frozen-lockfile",
    ];
    if (storeDirectory) installArgs.push("--store-dir", storeDirectory);
    await run(pnpm, installArgs, consumerDirectory);

    await writeFile(
      path.join(consumerDirectory, "typecheck.tsx"),
      `import { Button, CalendarDate, MonosetProvider, NumberInput } from "@monoset/react";
import { Reveal } from "@monoset/react/motion";
import { I18nProvider } from "react-aria-components";

const releaseDate: CalendarDate = new CalendarDate(2026, 7, 18);
const view = (
  <I18nProvider locale="de-DE">
    <MonosetProvider tooltip={false} toast={false}>
      <Reveal><Button>Release {releaseDate.toString()}</Button></Reveal>
      <NumberInput aria-label="Price" defaultValue={1234.5} hideStepper />
    </MonosetProvider>
  </I18nProvider>
);

void view;
`,
    );
    await writeFile(
      path.join(consumerDirectory, "tsconfig.json"),
      `${JSON.stringify({
        compilerOptions: {
          target: "ES2020",
          lib: ["ES2020", "DOM"],
          module: "ESNext",
          moduleResolution: "Bundler",
          jsx: "react-jsx",
          strict: true,
          noEmit: true,
          skipLibCheck: false,
        },
        include: ["typecheck.tsx"],
      }, null, 2)}\n`,
    );
    await run(pnpm, ["exec", "tsc", "--project", "tsconfig.json"], consumerDirectory);

    await writeFile(
      path.join(consumerDirectory, "typecheck.cts"),
      `import ReactPackage = require("@monoset/react");
import MotionPackage = require("@monoset/react/motion");

const releaseDate: ReactPackage.CalendarDate = new ReactPackage.CalendarDate(2026, 7, 18);
const button = ReactPackage.Button;
const reveal = MotionPackage.Reveal;

void releaseDate;
void button;
void reveal;
`,
    );
    await writeFile(
      path.join(consumerDirectory, "tsconfig.cjs.json"),
      `${JSON.stringify({
        compilerOptions: {
          target: "ES2020",
          lib: ["ES2020", "DOM"],
          module: "Node16",
          moduleResolution: "Node16",
          strict: true,
          noEmit: true,
          skipLibCheck: false,
        },
        include: ["typecheck.cts"],
      }, null, 2)}\n`,
    );
    await run(pnpm, ["exec", "tsc", "--project", "tsconfig.cjs.json"], consumerDirectory);

    await run(pnpm, ["exec", "vite", "build"], consumerDirectory);
    const builtFiles = await readdir(path.join(consumerDirectory, "dist/assets"));
    assert.ok(builtFiles.some((file) => file.endsWith(".js")), "The ESM consumer emitted no JavaScript.");
    assert.ok(builtFiles.some((file) => file.endsWith(".css")), "The styles.css export emitted no CSS.");

    await run(
      process.execPath,
      [
        "-e",
        "const ui=require('@monoset/react');const motion=require('@monoset/react/motion');if(typeof ui.Button!=='object'||typeof ui.NumberInput!=='object'||typeof ui.CalendarDate!=='function'||typeof motion.Reveal!=='object')process.exit(1);require.resolve('@monoset/react/styles.css')",
      ],
      consumerDirectory,
    );

    await writeFile(
      path.join(consumerDirectory, "ssr.mjs"),
      "import React from 'react';import{renderToString}from'react-dom/server';import{Button,MonosetProvider,NumberInput}from'@monoset/react';import{Reveal}from'@monoset/react/motion';import{I18nProvider}from'react-aria-components';const tree=React.createElement(MonosetProvider,{tooltip:false,toast:false},React.createElement(Reveal,null,React.createElement(Button,null,'Server')));const html=renderToString(tree);if(!html.includes('Server')||!html.includes('ms-btn'))process.exit(1);const localizedTree=React.createElement(I18nProvider,{locale:'de-DE'},React.createElement(NumberInput,{'aria-label':'Price',defaultValue:1234.5,hideStepper:true}));const localizedHtml=renderToString(localizedTree);if(!localizedHtml.includes('value=\"1.234,5\"')){console.error(localizedHtml);process.exit(1)}\n",
    );
    await run(process.execPath, ["ssr.mjs"], consumerDirectory);

    await writeFile(
      path.join(consumerDirectory, "src/unused-check.ts"),
      "export { Button } from '@monoset/react';\n",
    );
    await writeFile(
      path.join(consumerDirectory, "vite.unused.config.mjs"),
      `import path from "node:path";
export default {
  build: {
    lib: { entry: path.resolve("src/unused-check.ts"), formats: ["es"], fileName: "button-only" },
    outDir: "dist-unused",
    emptyOutDir: true,
    rollupOptions: { external: (id) => !id.startsWith(".") && !path.isAbsolute(id) && id !== "@monoset/react" },
    minify: "oxc",
  },
};
`,
    );
    await run(pnpm, ["exec", "vite", "build", "--config", "vite.unused.config.mjs"], consumerDirectory);
    const buttonBundle = await readFile(path.join(consumerDirectory, "dist-unused/button-only.js"));
    const compressedBytes = gzipSync(buttonBundle).byteLength;
    assert.ok(
      compressedBytes <= 6_000,
      `A Button-only consumer is ${compressedBytes} B gzip; expected no more than 6000 B.`,
    );
    const bundleText = buttonBundle.toString("utf8");
    for (const unusedMarker of ["ms-calendar", "ms-combobox", "ms-dialog", "ms-carousel"]) {
      assert.equal(
        bundleText.includes(unusedMarker),
        false,
        `The Button-only consumer retained unused component marker ${unusedMarker}.`,
      );
    }

    process.stdout.write(`Packed package verified. Button-only bundle: ${compressedBytes} B gzip.\n`);
  } finally {
    for (const { generatedDirectory, backup, existed } of generatedBackups) {
      await rm(generatedDirectory, { recursive: true, force: true });
      if (existed && backup) await cp(backup, generatedDirectory, { recursive: true });
    }
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

await verify();
