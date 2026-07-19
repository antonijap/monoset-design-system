import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { HTMLAttributes, ReactNode, ButtonHTMLAttributes } from 'react';

interface AppShellProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
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
declare const AppShellRoot: react.ForwardRefExoticComponent<AppShellProps & react.RefAttributes<HTMLDivElement>>;
interface AppShellSidebarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "id" | "role"> {
    children: ReactNode;
    brand?: ReactNode;
    footer?: ReactNode;
    className?: string;
}
declare const AppShellSidebar: react.ForwardRefExoticComponent<AppShellSidebarProps & react.RefAttributes<HTMLDivElement>>;
interface AppShellSidebarGroupProps {
    label?: ReactNode;
    children: ReactNode;
    className?: string;
}
declare function AppShellSidebarGroup({ label, children, className, }: AppShellSidebarGroupProps): react_jsx_runtime.JSX.Element;
interface AppShellSidebarItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    icon?: ReactNode;
    active?: boolean;
    children: ReactNode;
}
declare const AppShellSidebarItem: react.ForwardRefExoticComponent<AppShellSidebarItemProps & react.RefAttributes<HTMLButtonElement>>;
interface AppShellMainProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
declare const AppShellMain: react.ForwardRefExoticComponent<AppShellMainProps & react.RefAttributes<HTMLDivElement>>;
interface AppShellHeaderProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
}
declare const AppShellHeader: react.ForwardRefExoticComponent<AppShellHeaderProps & react.RefAttributes<HTMLElement>>;
interface AppShellMobileTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}
declare const AppShellMobileTrigger: react.ForwardRefExoticComponent<AppShellMobileTriggerProps & react.RefAttributes<HTMLButtonElement>>;
interface AppShellContentProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
}
declare const AppShellContent: react.ForwardRefExoticComponent<AppShellContentProps & react.RefAttributes<HTMLElement>>;
declare function useAppShellMobile(): {
    open: boolean;
    setOpen: (open: boolean) => void;
};
type AppShellComponent = typeof AppShellRoot & {
    Sidebar: typeof AppShellSidebar;
    SidebarGroup: typeof AppShellSidebarGroup;
    SidebarItem: typeof AppShellSidebarItem;
    Main: typeof AppShellMain;
    Header: typeof AppShellHeader;
    MobileTrigger: typeof AppShellMobileTrigger;
    Content: typeof AppShellContent;
};
declare const AppShell: AppShellComponent;

export { AppShell, type AppShellContentProps, type AppShellHeaderProps, type AppShellMainProps, type AppShellMobileTriggerProps, type AppShellProps, type AppShellSidebarGroupProps, type AppShellSidebarItemProps, type AppShellSidebarProps, useAppShellMobile };
