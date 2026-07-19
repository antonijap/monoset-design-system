import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/AppShell.tsx
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { Menu } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Ctx = createContext(null);
var focusableSelector = [
  "a[href]:not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "input:not([disabled]):not([type='hidden']):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "[contenteditable]:not([contenteditable='false']):not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])"
].join(", ");
function isHiddenFromFocus(element, boundary) {
  let current = element;
  while (current && boundary.contains(current)) {
    if (current.hidden || current.inert || current.getAttribute("aria-hidden") === "true") {
      return true;
    }
    const style = window.getComputedStyle(current);
    if (style.display === "none" || style.visibility === "hidden") return true;
    if (current === boundary) break;
    current = current.parentElement;
  }
  return false;
}
function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(focusableSelector)
  ).filter(
    (element) => !element.matches(":disabled, input[type='hidden']") && !(element.hasAttribute("tabindex") && Number(element.getAttribute("tabindex")) < 0) && !isHiddenFromFocus(element, container)
  );
}
var pageScrollLockCount = 0;
var previousBodyOverflow = "";
var previousDocumentOverflow = "";
function lockPageScroll() {
  if (typeof document === "undefined") return () => {
  };
  if (pageScrollLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }
  pageScrollLockCount += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    pageScrollLockCount = Math.max(0, pageScrollLockCount - 1);
    if (pageScrollLockCount === 0) {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      previousBodyOverflow = "";
      previousDocumentOverflow = "";
    }
  };
}
function useAppShell() {
  const value = useContext(Ctx);
  if (!value) {
    throw new Error("AppShell sub-components must be used inside <AppShell>.");
  }
  return value;
}
var AppShellRoot = forwardRef(function AppShellRoot2({
  children,
  sidebarWidth = 240,
  className,
  mobileOpen: controlledOpen,
  defaultMobileOpen = false,
  onMobileOpenChange,
  navigationSignal,
  style,
  ...rootProps
}, ref) {
  const portalContainer = useMonosetPortalContainer();
  const sidebarId = `${useId()}-sidebar`;
  const sidebarRef = useRef(null);
  const returnFocusRef = useRef(null);
  const previousOpen = useRef(false);
  const previousNavigationSignal = useRef(navigationSignal);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultMobileOpen);
  const isControlled = controlledOpen !== void 0;
  const mobileOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const setMobileOpen = useCallback(
    (nextOpen, returnFocusTo) => {
      if (nextOpen === mobileOpen) return;
      if (nextOpen && !mobileOpen) {
        returnFocusRef.current = returnFocusTo ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
      }
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onMobileOpenChange?.(nextOpen);
    },
    [isControlled, mobileOpen, onMobileOpenChange]
  );
  useEffect(() => {
    let frame = 0;
    if (mobileOpen && !previousOpen.current) {
      if (!returnFocusRef.current?.isConnected) {
        const activeElement = document.activeElement;
        returnFocusRef.current = activeElement instanceof HTMLElement && !sidebarRef.current?.contains(activeElement) ? activeElement : null;
      }
      frame = requestAnimationFrame(() => {
        const sidebar = sidebarRef.current;
        const target = sidebar ? getFocusableElements(sidebar)[0] : void 0;
        (target ?? sidebar)?.focus();
      });
    } else if (!mobileOpen && previousOpen.current) {
      const returnFocusTo = returnFocusRef.current;
      frame = requestAnimationFrame(() => {
        returnFocusTo?.focus();
        returnFocusRef.current = null;
      });
    }
    previousOpen.current = mobileOpen;
    return () => cancelAnimationFrame(frame);
  }, [mobileOpen]);
  useEffect(() => {
    if (!mobileOpen) return;
    return lockPageScroll();
  }, [mobileOpen]);
  useEffect(() => {
    let frame = 0;
    if (previousNavigationSignal.current !== navigationSignal) {
      previousNavigationSignal.current = navigationSignal;
      if (mobileOpen) {
        frame = requestAnimationFrame(() => setMobileOpen(false));
      }
    }
    return () => cancelAnimationFrame(frame);
  }, [mobileOpen, navigationSignal, setMobileOpen]);
  const normalizedWidth = Number.isFinite(sidebarWidth) && sidebarWidth > 0 ? sidebarWidth : 240;
  const contextValue = {
    mobileOpen,
    sidebarId,
    sidebarRef,
    setMobileOpen
  };
  const portalTarget = portalContainer ?? (typeof document !== "undefined" ? document.body : null);
  return /* @__PURE__ */ jsxs(Ctx.Provider, { value: contextValue, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ...rootProps,
        ref,
        className: cx("ms-app-shell", className),
        style: {
          ...style,
          ["--ms-sidebar-w"]: `${normalizedWidth}px`
        },
        children
      }
    ),
    mobileOpen && portalTarget ? createPortal(
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "ms-app-shell__drawer-scrim",
          "data-state": "open",
          "aria-hidden": "true",
          onPointerDown: () => setMobileOpen(false)
        }
      ),
      portalTarget
    ) : null
  ] });
});
var AppShellSidebar = forwardRef(
  function AppShellSidebar2({
    children,
    brand,
    footer,
    className,
    onKeyDown,
    tabIndex,
    "aria-label": ariaLabel,
    ...rest
  }, forwardedRef) {
    const { mobileOpen, setMobileOpen, sidebarId, sidebarRef } = useAppShell();
    const handleKeyDown = (event) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (!mobileOpen) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusableElements(event.currentTarget);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...rest,
        ref: (node) => {
          sidebarRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        },
        id: sidebarId,
        className: cx(
          "ms-app-shell__sidebar",
          mobileOpen && "ms-app-shell__drawer",
          className
        ),
        "data-ms": "app-shell-sidebar",
        "data-state": mobileOpen ? "open" : "closed",
        role: mobileOpen ? "dialog" : "complementary",
        "aria-modal": mobileOpen ? true : void 0,
        "aria-label": mobileOpen ? ariaLabel ?? "Navigation" : ariaLabel,
        tabIndex: mobileOpen ? -1 : tabIndex,
        onKeyDown: handleKeyDown,
        children: /* @__PURE__ */ jsxs("div", { className: "ms-app-shell__sidebar-inner", children: [
          brand && /* @__PURE__ */ jsx("div", { className: "ms-app-shell__brand", children: brand }),
          /* @__PURE__ */ jsx("nav", { className: "ms-app-shell__nav", children }),
          footer && /* @__PURE__ */ jsx("div", { className: "ms-app-shell__sidebar-footer", children: footer })
        ] })
      }
    );
  }
);
function AppShellSidebarGroup({
  label,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cx("ms-app-shell__group", className), children: [
    label && /* @__PURE__ */ jsx("div", { className: "ms-app-shell__group-label", children: label }),
    /* @__PURE__ */ jsx("div", { className: "ms-app-shell__group-items", children })
  ] });
}
var AppShellSidebarItem = forwardRef(
  function AppShellSidebarItem2({ icon, active, children, className, onClick, ...rest }, ref) {
    const { setMobileOpen } = useAppShell();
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ...rest,
        ref,
        type: "button",
        "aria-current": active ? "page" : void 0,
        className: cx(
          "ms-app-shell__item",
          active && "ms-app-shell__item--active",
          className
        ),
        onClick: (event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setMobileOpen(false);
        },
        children: [
          icon && /* @__PURE__ */ jsx("span", { className: "ms-app-shell__item-icon", children: icon }),
          /* @__PURE__ */ jsx("span", { className: "ms-app-shell__item-label", children })
        ]
      }
    );
  }
);
var AppShellMain = forwardRef(function AppShellMain2({
  children,
  className,
  "aria-hidden": ariaHidden,
  ...rest
}, ref) {
  const { mobileOpen } = useAppShell();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      ...mobileOpen ? { inert: "" } : {},
      ref,
      "aria-hidden": mobileOpen ? true : ariaHidden,
      className: cx("ms-app-shell__main", className),
      children
    }
  );
});
var AppShellHeader = forwardRef(function AppShellHeader2({ children, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx("header", { ...rest, ref, className: cx("ms-app-shell__header", className), children });
});
var AppShellMobileTrigger = forwardRef(function AppShellMobileTrigger2({ label = "Open navigation", className, onClick, ...rest }, ref) {
  const { mobileOpen, setMobileOpen, sidebarId } = useAppShell();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...rest,
      ref,
      type: "button",
      "aria-label": label,
      "aria-expanded": mobileOpen,
      "aria-controls": sidebarId,
      className: cx("ms-app-shell__mobile-trigger", className),
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setMobileOpen(true, event.currentTarget);
      },
      children: /* @__PURE__ */ jsx(Menu, { size: 20, strokeWidth: 2, "aria-hidden": true })
    }
  );
});
var AppShellContent = forwardRef(
  function AppShellContent2({ children, className, ...rest }, ref) {
    return /* @__PURE__ */ jsx("main", { ...rest, ref, className: cx("ms-app-shell__content", className), children });
  }
);
function useAppShellMobile() {
  const { mobileOpen, setMobileOpen } = useAppShell();
  return { open: mobileOpen, setOpen: setMobileOpen };
}
var AppShell = AppShellRoot;
AppShell.Sidebar = AppShellSidebar;
AppShell.SidebarGroup = AppShellSidebarGroup;
AppShell.SidebarItem = AppShellSidebarItem;
AppShell.Main = AppShellMain;
AppShell.Header = AppShellHeader;
AppShell.MobileTrigger = AppShellMobileTrigger;
AppShell.Content = AppShellContent;

export {
  useAppShellMobile,
  AppShell
};
//# sourceMappingURL=chunk-PZU324NI.js.map