import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Switch.tsx
import * as RSwitch from "@radix-ui/react-switch";
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Switch = forwardRef(function Switch2({ label, className, ...rest }, ref) {
  return /* @__PURE__ */ jsxs("label", { className: cx("ms-switch", className), children: [
    /* @__PURE__ */ jsx(
      RSwitch.Root,
      {
        ref,
        className: "ms-switch__track",
        ...rest,
        children: /* @__PURE__ */ jsx(RSwitch.Thumb, { className: "ms-switch__thumb" })
      }
    ),
    label && /* @__PURE__ */ jsx("span", { children: label })
  ] });
});

export {
  Switch
};
//# sourceMappingURL=chunk-L5E7W2FC.js.map