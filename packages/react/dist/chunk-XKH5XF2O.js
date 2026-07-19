import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/NavigationMenu.tsx
import * as RNav from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import {
  Children,
  cloneElement,
  forwardRef
} from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var NavigationMenu = forwardRef(function NavigationMenu2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(RNav.Root, { ref, className: cx("ms-nav", className), ...rest });
});
var NavigationMenuList = forwardRef(function NavigationMenuList2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(RNav.List, { ref, className: cx("ms-nav-list", className), ...rest });
});
var NavigationMenuItem = forwardRef(
  function NavigationMenuItem2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      RNav.Item,
      {
        ref,
        className: cx("ms-nav-item", className),
        ...rest
      }
    );
  }
);
var NavigationMenuTrigger = forwardRef(
  function NavigationMenuTrigger2({ asChild, className, children, ...rest }, ref) {
    let triggerChildren = /* @__PURE__ */ jsxs(Fragment, { children: [
      children,
      /* @__PURE__ */ jsx(NavigationMenuCaret, {})
    ] });
    if (asChild) {
      const child = Children.only(children);
      triggerChildren = cloneElement(
        child,
        void 0,
        child.props.children,
        /* @__PURE__ */ jsx(NavigationMenuCaret, {})
      );
    }
    return /* @__PURE__ */ jsx(
      RNav.Trigger,
      {
        ref,
        asChild,
        className: cx("ms-nav-trigger", className),
        ...rest,
        children: triggerChildren
      }
    );
  }
);
function NavigationMenuCaret() {
  return /* @__PURE__ */ jsx("span", { className: "ms-nav-caret", "aria-hidden": true, children: /* @__PURE__ */ jsx(ChevronDown, { size: 16, strokeWidth: 2 }) });
}
var NavigationMenuContent = forwardRef(
  function NavigationMenuContent2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      RNav.Content,
      {
        ref,
        className: cx("ms-nav-content", className),
        ...rest,
        children
      }
    );
  }
);
var NavigationMenuLink = forwardRef(
  function NavigationMenuLink2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsx(RNav.Link, { ref, className: cx("ms-nav-link", className), ...rest, children });
  }
);
var NavigationMenuIndicator = forwardRef(function NavigationMenuIndicator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RNav.Indicator,
    {
      ref,
      className: cx("ms-nav-indicator", className),
      ...rest
    }
  );
});
var NavigationMenuViewport = forwardRef(function NavigationMenuViewport2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    RNav.Viewport,
    {
      ref,
      className: cx("ms-nav-viewport", className),
      ...rest
    }
  );
});

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport
};
//# sourceMappingURL=chunk-XKH5XF2O.js.map