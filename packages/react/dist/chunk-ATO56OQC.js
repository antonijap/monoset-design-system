import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Breadcrumb.tsx
import {
  forwardRef
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Breadcrumb = forwardRef(
  function Breadcrumb2({ items, separator = "/", className, "aria-label": ariaLabel = "Breadcrumb", ...rest }, ref) {
    const hasExplicitCurrent = items.some((item) => item.current === true);
    return /* @__PURE__ */ jsx(
      "nav",
      {
        ...rest,
        ref,
        "aria-label": ariaLabel,
        className: cx("ms-breadcrumb", className),
        children: /* @__PURE__ */ jsx("ol", { className: "ms-breadcrumb__list", children: items.map((item, index) => {
          const current = item.current ?? (!hasExplicitCurrent && index === items.length - 1);
          const fallbackKey = item.href ?? (typeof item.label === "string" ? item.label : "item");
          const key = item.id ?? `${fallbackKey}-${index}`;
          return /* @__PURE__ */ jsxs("li", { className: "ms-breadcrumb__entry", children: [
            index > 0 && /* @__PURE__ */ jsx("span", { className: "ms-breadcrumb__sep", "aria-hidden": true, children: separator }),
            item.href && !current ? /* @__PURE__ */ jsx("a", { href: item.href, className: "ms-breadcrumb__item", children: item.label }) : /* @__PURE__ */ jsx("span", { className: "ms-breadcrumb__item", "aria-current": current ? "page" : void 0, children: item.label })
          ] }, key);
        }) })
      }
    );
  }
);

export {
  Breadcrumb
};
//# sourceMappingURL=chunk-ATO56OQC.js.map