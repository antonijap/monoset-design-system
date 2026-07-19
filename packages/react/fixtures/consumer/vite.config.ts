import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const fixtureDirectory = path.dirname(fileURLToPath(import.meta.url));
const reactPackageDirectory = path.resolve(fixtureDirectory, "../..");

export default {
  root: fixtureDirectory,
  resolve: {
    alias: [
      {
        find: "@monoset/react/styles.css",
        replacement: path.join(reactPackageDirectory, "src/styles.css"),
      },
      {
        find: "@monoset/react/motion",
        replacement: path.join(reactPackageDirectory, "src/motion-entry.ts"),
      },
      {
        find: "@monoset/react",
        replacement: path.join(reactPackageDirectory, "src/index.ts"),
      },
    ],
  },
  build: {
    outDir: path.join(os.tmpdir(), "monoset-react-e2e-dist"),
    emptyOutDir: true,
  },
};
