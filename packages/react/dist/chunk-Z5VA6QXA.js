import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Collapsible.tsx
import * as RCollapsible from "@radix-ui/react-collapsible";
import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Collapsible = RCollapsible.Root;
var CollapsibleTrigger = forwardRef(function CollapsibleTrigger2({ className, children, hideChevron, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(RCollapsible.Trigger, { ref, className: cx("ms-collapsible__trigger", className), ...rest, children: [
    /* @__PURE__ */ jsx("span", { className: "ms-collapsible__label", children }),
    !hideChevron && /* @__PURE__ */ jsx(ChevronDown, { className: "ms-collapsible__chevron", size: 16, strokeWidth: 2, "aria-hidden": true })
  ] });
});
var CollapsibleContent = forwardRef(function CollapsibleContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(RCollapsible.Content, { ref, className: cx("ms-collapsible__content", className), ...rest, children: /* @__PURE__ */ jsx("div", { className: "ms-collapsible__inner", children }) });
});

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
};
//# sourceMappingURL=chunk-Z5VA6QXA.js.map