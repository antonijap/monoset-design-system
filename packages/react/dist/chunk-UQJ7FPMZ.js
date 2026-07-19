import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/HoverCard.tsx
import * as RHoverCard from "@radix-ui/react-hover-card";
import {
  forwardRef
} from "react";
import { jsx } from "react/jsx-runtime";
var HoverCard = RHoverCard.Root;
var HoverCardTrigger = RHoverCard.Trigger;
var HoverCardContent = forwardRef(function HoverCardContent2({ className, children, sideOffset = 6, ...rest }, ref) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ jsx(RHoverCard.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ jsx(
    RHoverCard.Content,
    {
      ref,
      sideOffset,
      className: cx("ms-hovercard", className),
      ...rest,
      children
    }
  ) });
});

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
};
//# sourceMappingURL=chunk-UQJ7FPMZ.js.map