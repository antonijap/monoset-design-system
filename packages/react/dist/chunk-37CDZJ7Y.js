import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/ContextMenu.tsx
import * as RCtx from "@radix-ui/react-context-menu";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var ContextMenu = RCtx.Root;
var ContextMenuTrigger = RCtx.Trigger;
var ContextMenuSub = RCtx.Sub;
var ContextMenuContent = forwardRef(
  function ContextMenuContent2({ className, children, ...rest }, ref) {
    const portalContainer = useMonosetPortalContainer();
    return /* @__PURE__ */ jsx(RCtx.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ jsx(RCtx.Content, { ref, className: cx("ms-menu", className), ...rest, children }) });
  }
);
var ContextMenuItem = forwardRef(
  function ContextMenuItem2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      RCtx.Item,
      {
        ref,
        className: cx("ms-menu__item", className),
        ...rest
      }
    );
  }
);
var ContextMenuLabel = forwardRef(
  function ContextMenuLabel2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      RCtx.Label,
      {
        ref,
        className: cx("ms-menu__label", className),
        ...rest
      }
    );
  }
);
var ContextMenuSeparator = forwardRef(
  function ContextMenuSeparator2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      RCtx.Separator,
      {
        ref,
        className: cx("ms-menu__separator", className),
        ...rest
      }
    );
  }
);
var ContextMenuGroup = forwardRef(function ContextMenuGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RCtx.Group,
    {
      ref,
      className: cx("ms-menu__group", className),
      ...rest
    }
  );
});
var ContextMenuCheckboxItem = forwardRef(function ContextMenuCheckboxItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RCtx.CheckboxItem,
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
var ContextMenuItemIndicator = forwardRef(function ContextMenuItemIndicator2({ "aria-hidden": ariaHidden = true, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RCtx.ItemIndicator,
    {
      ref,
      "aria-hidden": ariaHidden,
      className: cx("ms-menu__indicator", className),
      ...rest
    }
  );
});
var ContextMenuRadioGroup = forwardRef(function ContextMenuRadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RCtx.RadioGroup,
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
var ContextMenuRadioItem = forwardRef(function ContextMenuRadioItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RCtx.RadioItem,
    {
      ref,
      className: cx("ms-menu__item", "ms-menu__item--radio", className),
      ...rest
    }
  );
});
var ContextMenuSubTrigger = forwardRef(function ContextMenuSubTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RCtx.SubTrigger,
    {
      ref,
      className: cx("ms-menu__item", "ms-menu__sub-trigger", className),
      ...rest
    }
  );
});
var ContextMenuSubContent = forwardRef(function ContextMenuSubContent2({ className, sideOffset = 4, ...rest }, ref) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ jsx(RCtx.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ jsx(
    RCtx.SubContent,
    {
      ref,
      sideOffset,
      className: cx("ms-menu", "ms-menu__sub-content", className),
      ...rest
    }
  ) });
});

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuCheckboxItem,
  ContextMenuItemIndicator,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSubTrigger,
  ContextMenuSubContent
};
//# sourceMappingURL=chunk-37CDZJ7Y.js.map