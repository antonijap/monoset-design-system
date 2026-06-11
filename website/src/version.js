import pkg from "../../packages/react/package.json";

// "0.7.0" -> "v0.7". Single source of truth so the site badge
// can't drift from the published @monoset/react version again.
export const VERSION = `v${pkg.version.split(".").slice(0, 2).join(".")}`;
