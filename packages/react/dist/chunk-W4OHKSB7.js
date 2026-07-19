import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Checkbox.tsx
import * as RCheckbox from "@radix-ui/react-checkbox";
import { forwardRef } from "react";
import { Check, Minus } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Checkbox = forwardRef(function Checkbox2({ label, className, ...rest }, ref) {
  return /* @__PURE__ */ jsxs("label", { className: cx("ms-check", className), children: [
    /* @__PURE__ */ jsx(
      RCheckbox.Root,
      {
        ref,
        className: "ms-check__box",
        ...rest,
        children: /* @__PURE__ */ jsxs(RCheckbox.Indicator, { forceMount: true, "aria-hidden": true, className: "ms-check__indicator", children: [
          /* @__PURE__ */ jsx(
            Check,
            {
              size: 11,
              strokeWidth: 2,
              className: "ms-check__visual ms-check__visual--checked",
              "data-check-visual": "checked"
            }
          ),
          /* @__PURE__ */ jsx(
            Minus,
            {
              size: 11,
              strokeWidth: 2,
              className: "ms-check__visual ms-check__visual--indeterminate",
              "data-check-visual": "indeterminate"
            }
          )
        ] })
      }
    ),
    label && /* @__PURE__ */ jsx("span", { children: label })
  ] });
});

export {
  Checkbox
};
//# sourceMappingURL=chunk-W4OHKSB7.js.map