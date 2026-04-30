import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  forwardRef,
} from "react";
import * as RDialog from "@radix-ui/react-dialog";
import { cx } from "./cx";

/* ─── Context ───────────────────────────────────────────────────── */

interface AppShellContext {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const Ctx = createContext<AppShellContext | null>(null);

function useAppShell(): AppShellContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("AppShell sub-components must be used inside <AppShell>.");
  return ctx;
}

/* ─── Root ──────────────────────────────────────────────────────── */

export interface AppShellProps {
  children: ReactNode;
  /** Sidebar width in px. Default: 240. */
  sidebarWidth?: number;
  className?: string;
}

const AppShellRoot = forwardRef<HTMLDivElement, AppShellProps>(
  function AppShellRoot({ children, sidebarWidth = 240, className }, ref) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const value: AppShellContext = { mobileOpen, setMobileOpen };
    return (
      <Ctx.Provider value={value}>
        <div
          ref={ref}
          className={cx("ms-app-shell", className)}
          style={{ ["--ms-sidebar-w" as string]: `${sidebarWidth}px` }}
        >
          {children}
        </div>
      </Ctx.Provider>
    );
  },
);

/* ─── Sidebar ───────────────────────────────────────────────────── */

export interface AppShellSidebarProps {
  children: ReactNode;
  /** Optional brand block rendered at the top. */
  brand?: ReactNode;
  /** Optional footer block rendered at the bottom. */
  footer?: ReactNode;
  className?: string;
}

function AppShellSidebar({ children, brand, footer, className }: AppShellSidebarProps) {
  const { mobileOpen, setMobileOpen } = useAppShell();

  const inner = (
    <div className={cx("ms-app-shell__sidebar-inner", className)}>
      {brand && <div className="ms-app-shell__brand">{brand}</div>}
      <nav className="ms-app-shell__nav">{children}</nav>
      {footer && <div className="ms-app-shell__sidebar-footer">{footer}</div>}
    </div>
  );

  return (
    <>
      <aside className="ms-app-shell__sidebar" data-ms="app-shell-sidebar">
        {inner}
      </aside>
      <RDialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <RDialog.Portal>
          <RDialog.Overlay className="ms-app-shell__drawer-scrim" />
          <RDialog.Content className="ms-app-shell__drawer">
            <RDialog.Title className="ms-sr-only">Navigation</RDialog.Title>
            {inner}
          </RDialog.Content>
        </RDialog.Portal>
      </RDialog.Root>
    </>
  );
}

/* ─── Sidebar group ─────────────────────────────────────────────── */

export interface AppShellSidebarGroupProps {
  label?: ReactNode;
  children: ReactNode;
  className?: string;
}

function AppShellSidebarGroup({ label, children, className }: AppShellSidebarGroupProps) {
  return (
    <div className={cx("ms-app-shell__group", className)}>
      {label && <div className="ms-app-shell__group-label">{label}</div>}
      <div className="ms-app-shell__group-items">{children}</div>
    </div>
  );
}

/* ─── Sidebar item ──────────────────────────────────────────────── */

export interface AppShellSidebarItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon?: ReactNode;
  active?: boolean;
  children: ReactNode;
}

const AppShellSidebarItem = forwardRef<HTMLButtonElement, AppShellSidebarItemProps>(
  function AppShellSidebarItem({ icon, active, children, className, onClick, ...rest }, ref) {
    const { setMobileOpen } = useAppShell();
    return (
      <button
        ref={ref}
        type="button"
        aria-current={active ? "page" : undefined}
        className={cx("ms-app-shell__item", active && "ms-app-shell__item--active", className)}
        onClick={(e) => {
          onClick?.(e);
          setMobileOpen(false);
        }}
        {...rest}
      >
        {icon && <span className="ms-app-shell__item-icon">{icon}</span>}
        <span className="ms-app-shell__item-label">{children}</span>
      </button>
    );
  },
);

/* ─── Main column ───────────────────────────────────────────────── */

export interface AppShellMainProps {
  children?: ReactNode;
  className?: string;
}

function AppShellMain({ children, className }: AppShellMainProps) {
  return <div className={cx("ms-app-shell__main", className)}>{children}</div>;
}

/* ─── Header ────────────────────────────────────────────────────── */

export interface AppShellHeaderProps {
  children?: ReactNode;
  className?: string;
}

function AppShellHeader({ children, className }: AppShellHeaderProps) {
  return <header className={cx("ms-app-shell__header", className)}>{children}</header>;
}

/* ─── Mobile trigger ────────────────────────────────────────────── */

export interface AppShellMobileTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visually hidden label for the button. Default: "Open navigation". */
  label?: string;
}

const AppShellMobileTrigger = forwardRef<HTMLButtonElement, AppShellMobileTriggerProps>(
  function AppShellMobileTrigger({ label = "Open navigation", className, ...rest }, ref) {
    const { setMobileOpen } = useAppShell();
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cx("ms-app-shell__mobile-trigger", className)}
        onClick={() => setMobileOpen(true)}
        {...rest}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
    );
  },
);

/* ─── Content ───────────────────────────────────────────────────── */

export interface AppShellContentProps {
  children?: ReactNode;
  className?: string;
}

function AppShellContent({ children, className }: AppShellContentProps) {
  return (
    <main className={cx("ms-app-shell__content", className)}>{children}</main>
  );
}

/* ─── Hook ──────────────────────────────────────────────────────── */

/** Read or update the AppShell's mobile drawer state from anywhere inside. */
export function useAppShellMobile(): { open: boolean; setOpen: (open: boolean) => void } {
  const { mobileOpen, setMobileOpen } = useAppShell();
  return { open: mobileOpen, setOpen: setMobileOpen };
}

/* ─── Compound export ───────────────────────────────────────────── */

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
