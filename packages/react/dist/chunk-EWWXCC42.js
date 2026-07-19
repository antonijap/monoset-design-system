import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Stepper.tsx
import {
  forwardRef
} from "react";
import { Check } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Stepper = forwardRef(function Stepper2({ steps, current, className, "aria-label": ariaLabel = "Progress", ...rest }, ref) {
  const normalizedCurrent = steps.length === 0 ? -1 : Math.min(
    Math.max(Number.isNaN(current) ? 0 : Math.trunc(current), 0),
    steps.length - 1
  );
  return /* @__PURE__ */ jsx(
    "ol",
    {
      ...rest,
      ref,
      "aria-label": ariaLabel,
      className: cx("ms-stepper", className),
      children: steps.map((step, i) => {
        const state = i < normalizedCurrent ? "done" : i === normalizedCurrent ? "current" : "pending";
        return /* @__PURE__ */ jsxs(
          "li",
          {
            className: cx("ms-stepper__step", `ms-stepper__step--${state}`),
            "aria-current": state === "current" ? "step" : void 0,
            children: [
              /* @__PURE__ */ jsx("div", { className: "ms-stepper__dot", children: state === "done" ? /* @__PURE__ */ jsx(Check, { size: 16, strokeWidth: 2, "aria-hidden": true }) : i + 1 }),
              /* @__PURE__ */ jsxs("div", { className: "ms-stepper__body", children: [
                /* @__PURE__ */ jsx("div", { className: "ms-stepper__label", children: step.label }),
                step.description != null && /* @__PURE__ */ jsx("div", { className: "ms-stepper__desc", children: step.description })
              ] }),
              i < steps.length - 1 && /* @__PURE__ */ jsx("div", { className: "ms-stepper__connector", "aria-hidden": true })
            ]
          },
          i
        );
      })
    }
  );
});

export {
  Stepper
};
//# sourceMappingURL=chunk-EWWXCC42.js.map