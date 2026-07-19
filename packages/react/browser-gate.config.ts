import path from "node:path";
import { fileURLToPath } from "node:url";

const packageDirectory = path.dirname(fileURLToPath(import.meta.url));

/**
 * Shared browser-gate settings. The local runner uses the repository's existing
 * Puppeteer installation because Playwright is not present in the offline store.
 * The test contract stays isolated here so runner changes do not affect the
 * fixture or assertions.
 */
export default {
  packageDirectory,
  baseURL: "http://127.0.0.1:4180",
  previewCommand: [
    "--dir",
    "../../website",
    "exec",
    "vite",
    "preview",
    "--config",
    "../packages/react/fixtures/consumer/vite.config.ts",
    "--host",
    "127.0.0.1",
    "--port",
    "4180",
    "--strictPort",
  ],
  navigationTimeout: 15_000,
};
