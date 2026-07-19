import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Progress.tsx
import * as RProgress from "@radix-ui/react-progress";
import { jsx } from "react/jsx-runtime";
function Progress({
  value,
  max = 100,
  indeterminate,
  className,
  "aria-label": ariaLabel = "Progress"
}) {
  const isIndeterminate = indeterminate ?? value === void 0;
  const normalizedMax = Number.isFinite(max) && max > 0 ? max : 100;
  const normalizedValue = Number.isFinite(value) ? Math.min(normalizedMax, Math.max(0, value ?? 0)) : 0;
  const pct = isIndeterminate ? void 0 : normalizedValue / normalizedMax * 100;
  return /* @__PURE__ */ jsx(RProgress.Root, { value: isIndeterminate ? null : normalizedValue, max: normalizedMax, "aria-label": ariaLabel, className: cx("ms-progress", className), children: /* @__PURE__ */ jsx(
    RProgress.Indicator,
    {
      className: "ms-progress__indicator",
      style: isIndeterminate ? { width: "40%", animation: "ms-indeterminate 1.4s infinite" } : { width: `${pct}%` }
    }
  ) });
}

export {
  Progress
};
//# sourceMappingURL=chunk-HCUN55NO.js.map