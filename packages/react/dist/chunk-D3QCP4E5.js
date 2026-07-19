import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/RadioGroup.tsx
import * as RRadio from "@radix-ui/react-radio-group";
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var RadioGroup = forwardRef(function RadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(RRadio.Root, { ref, className: cx("ms-radio-group", className), ...rest });
});
var Radio = forwardRef(function Radio2({ label, className, value, ...rest }, ref) {
  return /* @__PURE__ */ jsxs("label", { className: cx("ms-radio", className), children: [
    /* @__PURE__ */ jsx(RRadio.Item, { ref, value, className: "ms-radio__dot", ...rest, children: /* @__PURE__ */ jsx(RRadio.Indicator, {}) }),
    label && /* @__PURE__ */ jsx("span", { children: label })
  ] });
});

export {
  RadioGroup,
  Radio
};
//# sourceMappingURL=chunk-D3QCP4E5.js.map