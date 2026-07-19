import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/DropdownMenu.tsx
import * as RDropdown from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var DropdownMenu = RDropdown.Root;
var DropdownMenuTrigger = RDropdown.Trigger;
var DropdownMenuSub = RDropdown.Sub;
var DropdownMenuContent = forwardRef(function DropdownMenuContent2({ children, className, sideOffset = 6, ...rest }, ref) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ jsx(RDropdown.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ jsx(
    RDropdown.Content,
    {
      ref,
      sideOffset,
      className: cx("ms-menu", className),
      ...rest,
      children
    }
  ) });
});
var DropdownMenuItem = forwardRef(function DropdownMenuItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RDropdown.Item,
    {
      ref,
      className: cx("ms-menu__item", className),
      ...rest
    }
  );
});
var DropdownMenuLabel = forwardRef(function DropdownMenuLabel2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RDropdown.Label,
    {
      ref,
      className: cx("ms-menu__label", className),
      ...rest
    }
  );
});
var DropdownMenuSeparator = forwardRef(function DropdownMenuSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RDropdown.Separator,
    {
      ref,
      className: cx("ms-menu__separator", className),
      ...rest
    }
  );
});
var DropdownMenuGroup = forwardRef(function DropdownMenuGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RDropdown.Group,
    {
      ref,
      className: cx("ms-menu__group", className),
      ...rest
    }
  );
});
var DropdownMenuCheckboxItem = forwardRef(function DropdownMenuCheckboxItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RDropdown.CheckboxItem,
    {
      ref,
      className: cx(
        "ms-menu__item",
        "ms-menu__item--checkbox",
        className
      ),
      ...rest
    }
  );
});
var DropdownMenuItemIndicator = forwardRef(function DropdownMenuItemIndicator2({ "aria-hidden": ariaHidden = true, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RDropdown.ItemIndicator,
    {
      ref,
      "aria-hidden": ariaHidden,
      className: cx("ms-menu__indicator", className),
      ...rest
    }
  );
});
var DropdownMenuRadioGroup = forwardRef(function DropdownMenuRadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RDropdown.RadioGroup,
    {
      ref,
      className: cx(
        "ms-menu__group",
        "ms-menu__radio-group",
        className
      ),
      ...rest
    }
  );
});
var DropdownMenuRadioItem = forwardRef(function DropdownMenuRadioItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RDropdown.RadioItem,
    {
      ref,
      className: cx("ms-menu__item", "ms-menu__item--radio", className),
      ...rest
    }
  );
});
var DropdownMenuSubTrigger = forwardRef(function DropdownMenuSubTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RDropdown.SubTrigger,
    {
      ref,
      className: cx("ms-menu__item", "ms-menu__sub-trigger", className),
      ...rest
    }
  );
});
var DropdownMenuSubContent = forwardRef(function DropdownMenuSubContent2({ className, sideOffset = 4, ...rest }, ref) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ jsx(RDropdown.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ jsx(
    RDropdown.SubContent,
    {
      ref,
      sideOffset,
      className: cx("ms-menu", "ms-menu__sub-content", className),
      ...rest
    }
  ) });
});

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuItemIndicator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
};
//# sourceMappingURL=chunk-AMCNET3K.js.map