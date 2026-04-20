import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    "react", "react-dom", "react/jsx-runtime",
    "framer-motion",
    /^@radix-ui/,
    "lucide-react",
    "@monoset/tokens", "@monoset/motion",
  ],
  target: "es2020",
  loader: { ".css": "copy" },
});
