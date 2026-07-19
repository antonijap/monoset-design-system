import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Accordion.tsx
import * as RAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Accordion = RAccordion.Root;
var AccordionItem = forwardRef(function AccordionItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(RAccordion.Item, { ref, className: cx("ms-accordion__item", className), ...rest });
});
var AccordionTrigger = forwardRef(function AccordionTrigger2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(RAccordion.Header, { className: "ms-accordion__header", children: /* @__PURE__ */ jsxs(RAccordion.Trigger, { ref, className: cx("ms-accordion__trigger", className), ...rest, children: [
    /* @__PURE__ */ jsx("span", { children }),
    /* @__PURE__ */ jsx(
      ChevronDown,
      {
        className: "ms-accordion__chevron",
        size: 14,
        strokeWidth: 2,
        "aria-hidden": true
      }
    )
  ] }) });
});
var AccordionContent = forwardRef(function AccordionContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(RAccordion.Content, { ref, className: cx("ms-accordion__content", className), ...rest, children: /* @__PURE__ */ jsx("div", { className: "ms-accordion__content-inner", children }) });
});

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
};
//# sourceMappingURL=chunk-TKKGDI2O.js.map