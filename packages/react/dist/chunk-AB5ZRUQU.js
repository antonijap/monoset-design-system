import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/EmptyState.tsx
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var EmptyState = forwardRef(function EmptyState2({ icon, title, body, action, headingLevel = 2, className, ...rest }, ref) {
  const Heading = `h${headingLevel}`;
  return /* @__PURE__ */ jsxs("div", { ...rest, ref, className: cx("ms-empty", className), children: [
    icon && /* @__PURE__ */ jsx("div", { className: "ms-empty__icon", "aria-hidden": true, children: icon }),
    /* @__PURE__ */ jsx(Heading, { className: "ms-empty__title", children: title }),
    body && /* @__PURE__ */ jsx("div", { className: "ms-empty__body", children: body }),
    action && /* @__PURE__ */ jsx("div", { className: "ms-empty__action", children: action })
  ] });
});

export {
  EmptyState
};
//# sourceMappingURL=chunk-AB5ZRUQU.js.map