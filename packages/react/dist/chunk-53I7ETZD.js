import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Tooltip.tsx
import * as RTooltip from "@radix-ui/react-tooltip";
import { jsx, jsxs } from "react/jsx-runtime";
function TooltipProvider({
  children,
  delayDuration = 300,
  ...props
}) {
  return /* @__PURE__ */ jsx(RTooltip.Provider, { ...props, delayDuration, children });
}
function Tooltip({
  content,
  children,
  side = "top",
  sideOffset = 6,
  align,
  className,
  contentProps,
  ...rootProps
}) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ jsxs(RTooltip.Root, { ...rootProps, children: [
    /* @__PURE__ */ jsx(RTooltip.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(RTooltip.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ jsx(
      RTooltip.Content,
      {
        ...contentProps,
        side,
        sideOffset,
        align,
        className: cx("ms-tooltip", className),
        children: content
      }
    ) })
  ] });
}

export {
  TooltipProvider,
  Tooltip
};
//# sourceMappingURL=chunk-53I7ETZD.js.map