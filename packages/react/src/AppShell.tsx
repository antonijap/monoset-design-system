import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Menu } from "lucide-react";
import { useMonosetPortalContainer } from "./PortalContext";
import { cx } from "./cx";

interface AppShellContextValue {
  mobileOpen: boolean;
  sidebarId: string;
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
  setMobileOpen: (open: boolean, returnFocusTo?: HTMLElement | null) => void;
}

const Ctx = createContext<AppShellContextValue | null>(null);

const focusableSelector = [
  "a[href]:not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "input:not([disabled]):not([type='hidden']):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "[contenteditable]:not([contenteditable='false']):not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

function isHiddenFromFocus(element: HTMLElement, boundary: HTMLElement) {
  let current: HTMLElement | null = element;

  while (current && boundary.contains(current)) {
    if (
      current.hidden ||
      current.inert ||
      current.getAttribute("aria-hidden") === "true"
    ) {
      return true;
    }
    const style = window.getComputedStyle(current);
    if (style.display === "none" || style.visibility === "hidden") return true;
    if (current === boundary) break;
    current = current.parentElement;
  }

  return false;
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector),
  ).filter(
    (element) =>
      !element.matches(":disabled, input[type='hidden']") &&
      !(
        element.hasAttribute("tabindex") &&
        Number(element.getAttribute("tabindex")) < 0
      ) &&
      !isHiddenFromFocus(element, container),
  );
}

let pageScrollLockCount = 0;
let previousBodyOverflow = "";
let previousDocumentOverflow = "";

function lockPageScroll(): () => void {
  if (typeof document === "undefined") return () => {};

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

function useAppShell(): AppShellContextValue {
  const value = useContext(Ctx);
  if (!value) {
    throw new Error("AppShell sub-components must be used inside <AppShell>.");
  }
  return value;
}

export interface AppShellProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;
  sidebarWidth?: number;
  className?: string;
  /** Controlled mobile drawer state. */
  mobileOpen?: boolean;
  /** Initial mobile drawer state when uncontrolled. */
  defaultMobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  /** Changing this value closes an open drawer after client-side navigation. */
  navigationSignal?: string | number;
}

const AppShellRoot = forwardRef<HTMLDivElement, AppShellProps>(function AppShellRoot(
  {
    children,
    sidebarWidth = 240,
    className,
    mobileOpen: controlledOpen,
    defaultMobileOpen = false,
    onMobileOpenChange,
    navigationSignal,
    style,
    ...rootProps
  },
  ref,
) {
  const portalContainer = useMonosetPortalContainer();
  const sidebarId = `${useId()}-sidebar`;
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const previousOpen = useRef(false);
  const previousNavigationSignal = useRef(navigationSignal);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultMobileOpen);
  const isControlled = controlledOpen !== undefined;
  const mobileOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setMobileOpen = useCallback(
    (nextOpen: boolean, returnFocusTo?: HTMLElement | null) => {
      if (nextOpen === mobileOpen) return;
      if (nextOpen && !mobileOpen) {
        returnFocusRef.current =
          returnFocusTo ??
          (document.activeElement instanceof HTMLElement ? document.activeElement : null);
      }
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onMobileOpenChange?.(nextOpen);
    },
    [isControlled, mobileOpen, onMobileOpenChange],
  );

  useEffect(() => {
    let frame = 0;
    if (mobileOpen && !previousOpen.current) {
      if (!returnFocusRef.current?.isConnected) {
        const activeElement = document.activeElement;
        returnFocusRef.current =
          activeElement instanceof HTMLElement &&
          !sidebarRef.current?.contains(activeElement)
            ? activeElement
            : null;
      }
      frame = requestAnimationFrame(() => {
        const sidebar = sidebarRef.current;
        const target = sidebar ? getFocusableElements(sidebar)[0] : undefined;
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

  const normalizedWidth =
    Number.isFinite(sidebarWidth) && sidebarWidth > 0 ? sidebarWidth : 240;
  const contextValue: AppShellContextValue = {
    mobileOpen,
    sidebarId,
    sidebarRef,
    setMobileOpen,
  };
  const portalTarget =
    portalContainer ?? (typeof document !== "undefined" ? document.body : null);

  return (
    <Ctx.Provider value={contextValue}>
      <div
        {...rootProps}
        ref={ref}
        className={cx("ms-app-shell", className)}
        style={{
          ...style,
          ["--ms-sidebar-w" as string]: `${normalizedWidth}px`,
        }}
      >
        {children}
      </div>
      {mobileOpen && portalTarget
        ? createPortal(
            <div
              className="ms-app-shell__drawer-scrim"
              data-state="open"
              aria-hidden="true"
              onPointerDown={() => setMobileOpen(false)}
            />,
            portalTarget,
          )
        : null}
    </Ctx.Provider>
  );
});

export interface AppShellSidebarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "id" | "role"> {
  children: ReactNode;
  brand?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const AppShellSidebar = forwardRef<HTMLDivElement, AppShellSidebarProps>(
  function AppShellSidebar(
    {
      children,
      brand,
      footer,
      className,
      onKeyDown,
      tabIndex,
      "aria-label": ariaLabel,
      ...rest
    },
    forwardedRef,
  ) {
    const { mobileOpen, setMobileOpen, sidebarId, sidebarRef } = useAppShell();

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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

    return (
      <div
        {...rest}
        ref={(node) => {
          sidebarRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        id={sidebarId}
        className={cx(
          "ms-app-shell__sidebar",
          mobileOpen && "ms-app-shell__drawer",
          className,
        )}
        data-ms="app-shell-sidebar"
        data-state={mobileOpen ? "open" : "closed"}
        role={mobileOpen ? "dialog" : "complementary"}
        aria-modal={mobileOpen ? true : undefined}
        aria-label={mobileOpen ? (ariaLabel ?? "Navigation") : ariaLabel}
        tabIndex={mobileOpen ? -1 : tabIndex}
        onKeyDown={handleKeyDown}
      >
        <div className="ms-app-shell__sidebar-inner">
          {brand && <div className="ms-app-shell__brand">{brand}</div>}
          <nav className="ms-app-shell__nav">{children}</nav>
          {footer && <div className="ms-app-shell__sidebar-footer">{footer}</div>}
        </div>
      </div>
    );
  },
);

export interface AppShellSidebarGroupProps {
  label?: ReactNode;
  children: ReactNode;
  className?: string;
}

function AppShellSidebarGroup({
  label,
  children,
  className,
}: AppShellSidebarGroupProps) {
  return (
    <div className={cx("ms-app-shell__group", className)}>
      {label && <div className="ms-app-shell__group-label">{label}</div>}
      <div className="ms-app-shell__group-items">{children}</div>
    </div>
  );
}

export interface AppShellSidebarItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon?: ReactNode;
  active?: boolean;
  children: ReactNode;
}

const AppShellSidebarItem = forwardRef<HTMLButtonElement, AppShellSidebarItemProps>(
  function AppShellSidebarItem(
    { icon, active, children, className, onClick, ...rest },
    ref,
  ) {
    const { setMobileOpen } = useAppShell();
    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        aria-current={active ? "page" : undefined}
        className={cx(
          "ms-app-shell__item",
          active && "ms-app-shell__item--active",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setMobileOpen(false);
        }}
      >
        {icon && <span className="ms-app-shell__item-icon">{icon}</span>}
        <span className="ms-app-shell__item-label">{children}</span>
      </button>
    );
  },
);

export interface AppShellMainProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const AppShellMain = forwardRef<HTMLDivElement, AppShellMainProps>(function AppShellMain(
  {
    children,
    className,
    "aria-hidden": ariaHidden,
    ...rest
  },
  ref,
) {
  const { mobileOpen } = useAppShell();
  return (
    <div
      {...rest}
      {...(mobileOpen ? { inert: "" } : {})}
      ref={ref}
      aria-hidden={mobileOpen ? true : ariaHidden}
      className={cx("ms-app-shell__main", className)}
    >
      {children}
    </div>
  );
});

export interface AppShellHeaderProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const AppShellHeader = forwardRef<HTMLElement, AppShellHeaderProps>(function AppShellHeader(
  { children, className, ...rest },
  ref,
) {
  return (
    <header {...rest} ref={ref} className={cx("ms-app-shell__header", className)}>
      {children}
    </header>
  );
});

export interface AppShellMobileTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const AppShellMobileTrigger = forwardRef<
  HTMLButtonElement,
  AppShellMobileTriggerProps
>(function AppShellMobileTrigger(
  { label = "Open navigation", className, onClick, ...rest },
  ref,
) {
  const { mobileOpen, setMobileOpen, sidebarId } = useAppShell();
  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      aria-label={label}
      aria-expanded={mobileOpen}
      aria-controls={sidebarId}
      className={cx("ms-app-shell__mobile-trigger", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setMobileOpen(true, event.currentTarget);
      }}
    >
      <Menu size={20} strokeWidth={2} aria-hidden />
    </button>
  );
});

export interface AppShellContentProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const AppShellContent = forwardRef<HTMLElement, AppShellContentProps>(
  function AppShellContent({ children, className, ...rest }, ref) {
    return (
      <main {...rest} ref={ref} className={cx("ms-app-shell__content", className)}>
        {children}
      </main>
    );
  },
);

export function useAppShellMobile(): {
  open: boolean;
  setOpen: (open: boolean) => void;
} {
  const { mobileOpen, setMobileOpen } = useAppShell();
  return { open: mobileOpen, setOpen: setMobileOpen };
}

type AppShellComponent = typeof AppShellRoot & {
  Sidebar: typeof AppShellSidebar;
  SidebarGroup: typeof AppShellSidebarGroup;
  SidebarItem: typeof AppShellSidebarItem;
  Main: typeof AppShellMain;
  Header: typeof AppShellHeader;
  MobileTrigger: typeof AppShellMobileTrigger;
  Content: typeof AppShellContent;
};

export const AppShell = AppShellRoot as AppShellComponent;
AppShell.Sidebar = AppShellSidebar;
AppShell.SidebarGroup = AppShellSidebarGroup;
AppShell.SidebarItem = AppShellSidebarItem;
AppShell.Main = AppShellMain;
AppShell.Header = AppShellHeader;
AppShell.MobileTrigger = AppShellMobileTrigger;
AppShell.Content = AppShellContent;
