import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Card.tsx
import { Slot } from "@radix-ui/react-slot";
import {
  forwardRef,
  isValidElement
} from "react";
import { jsx } from "react/jsx-runtime";
var htmlElementTags = new Set(
  "a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p picture pre progress q rp rt ruby s samp script search section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr".split(" ")
);
var Card = forwardRef(function Card2({ variant = "outline", asChild = false, className, children, ...rest }, ref) {
  const classes = cx(
    "ms-card",
    variant === "elevated" && "ms-card--elevated",
    variant === "inset" && "ms-card--inset",
    className
  );
  if (asChild) {
    if (!isValidElement(children) || typeof children.type !== "string" || !htmlElementTags.has(children.type)) {
      throw new Error("Card asChild requires exactly one intrinsic HTML element.");
    }
    return /* @__PURE__ */ jsx(Slot, { ref, className: classes, ...rest, children });
  }
  return /* @__PURE__ */ jsx(Slot, { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx("div", { children }) });
});

export {
  Card
};
//# sourceMappingURL=chunk-E56OWRGC.js.map