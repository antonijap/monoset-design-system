import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Spinner.tsx
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var Spinner = forwardRef(function Spinner2({ size = 16, label = "Loading", className, style, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      role: "status",
      "aria-label": label,
      className: cx("ms-spinner", className),
      style: { width: size, height: size, ...style },
      ...rest
    }
  );
});

export {
  Spinner
};
//# sourceMappingURL=chunk-VVDCK5O6.js.map