import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Alert.tsx
import { forwardRef } from "react";
import { Info } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Alert = forwardRef(function Alert2({ title, icon, urgent, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...rest,
      ref,
      role: urgent ? "alert" : "status",
      "aria-live": urgent ? "assertive" : "polite",
      className: cx("ms-alert", className),
      children: [
        /* @__PURE__ */ jsx("span", { className: "ms-alert__icon", "aria-hidden": true, children: icon ?? /* @__PURE__ */ jsx(Info, { size: 16, strokeWidth: 2 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          title && /* @__PURE__ */ jsx("div", { className: "ms-alert__title", children: title }),
          children && /* @__PURE__ */ jsx("div", { className: "ms-alert__msg", children })
        ] })
      ]
    }
  );
});

export {
  Alert
};
//# sourceMappingURL=chunk-KLK3IXKK.js.map