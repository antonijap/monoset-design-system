import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Select.tsx
import * as RSelect from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Select = RSelect.Root;
var SelectTrigger = forwardRef(function SelectTrigger2({ className, placeholder, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(RSelect.Trigger, { ref, className: cx("ms-select", className), ...rest, children: [
    children ?? /* @__PURE__ */ jsx(RSelect.Value, { placeholder }),
    /* @__PURE__ */ jsx(RSelect.Icon, { className: "ms-select__chevron", "aria-hidden": true, children: /* @__PURE__ */ jsx(ChevronDown, { size: 12, strokeWidth: 2, "aria-hidden": true }) })
  ] });
});
var SelectContent = forwardRef(function SelectContent2({
  children,
  className,
  position = "popper",
  sideOffset = 6,
  ...rest
}, ref) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ jsx(RSelect.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ jsxs(
    RSelect.Content,
    {
      ref,
      className: cx("ms-menu", "ms-select__content", className),
      position,
      sideOffset,
      ...rest,
      children: [
        /* @__PURE__ */ jsx(RSelect.ScrollUpButton, { className: "ms-select__scroll-up", "aria-hidden": true, children: /* @__PURE__ */ jsx(ChevronUp, { size: 14, strokeWidth: 2, "aria-hidden": true }) }),
        /* @__PURE__ */ jsx(RSelect.Viewport, { children }),
        /* @__PURE__ */ jsx(RSelect.ScrollDownButton, { className: "ms-select__scroll-down", "aria-hidden": true, children: /* @__PURE__ */ jsx(ChevronDown, { size: 14, strokeWidth: 2, "aria-hidden": true }) })
      ]
    }
  ) });
});
var SelectItem = forwardRef(
  function SelectItem2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxs(
      RSelect.Item,
      {
        ref,
        className: cx("ms-menu__item", "ms-select__item", className),
        ...rest,
        children: [
          /* @__PURE__ */ jsx(RSelect.ItemIndicator, { className: "ms-select__indicator", children: /* @__PURE__ */ jsx(Check, { size: 14, strokeWidth: 2, "aria-hidden": true }) }),
          /* @__PURE__ */ jsx(RSelect.ItemText, { children })
        ]
      }
    );
  }
);

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
};
//# sourceMappingURL=chunk-D6P6TGOF.js.map