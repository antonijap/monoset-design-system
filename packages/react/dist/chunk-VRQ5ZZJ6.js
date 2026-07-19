import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Popover.tsx
import * as RPopover from "@radix-ui/react-popover";
import {
  forwardRef
} from "react";
import { jsx } from "react/jsx-runtime";
var Popover = RPopover.Root;
var PopoverTrigger = RPopover.Trigger;
var PopoverClose = RPopover.Close;
var PopoverContent = forwardRef(function PopoverContent2({ className, children, sideOffset = 6, ...rest }, ref) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ jsx(RPopover.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ jsx(
    RPopover.Content,
    {
      ref,
      sideOffset,
      className: cx("ms-popover", className),
      ...rest,
      children
    }
  ) });
});

export {
  Popover,
  PopoverTrigger,
  PopoverClose,
  PopoverContent
};
//# sourceMappingURL=chunk-VRQ5ZZJ6.js.map