import * as react from 'react';
import { ReactNode } from 'react';
import * as RNav from '@radix-ui/react-navigation-menu';

declare const NavigationMenu: react.ForwardRefExoticComponent<Omit<RNav.NavigationMenuProps & react.RefAttributes<HTMLElement>, "ref"> & react.RefAttributes<HTMLElement>>;
declare const NavigationMenuList: react.ForwardRefExoticComponent<Omit<RNav.NavigationMenuListProps & react.RefAttributes<HTMLUListElement>, "ref"> & react.RefAttributes<HTMLUListElement>>;
interface NavigationMenuItemProps extends React.ComponentPropsWithoutRef<typeof RNav.Item> {
    children?: ReactNode;
}
declare const NavigationMenuItem: react.ForwardRefExoticComponent<NavigationMenuItemProps & react.RefAttributes<HTMLLIElement>>;
interface NavigationMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof RNav.Trigger> {
    children?: ReactNode;
}
declare const NavigationMenuTrigger: react.ForwardRefExoticComponent<NavigationMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
interface NavigationMenuContentProps extends React.ComponentPropsWithoutRef<typeof RNav.Content> {
    children?: ReactNode;
}
declare const NavigationMenuContent: react.ForwardRefExoticComponent<NavigationMenuContentProps & react.RefAttributes<HTMLDivElement>>;
interface NavigationMenuLinkProps extends React.ComponentPropsWithoutRef<typeof RNav.Link> {
    children?: ReactNode;
}
declare const NavigationMenuLink: react.ForwardRefExoticComponent<NavigationMenuLinkProps & react.RefAttributes<HTMLAnchorElement>>;
interface NavigationMenuIndicatorProps extends React.ComponentPropsWithoutRef<typeof RNav.Indicator> {
    children?: ReactNode;
}
declare const NavigationMenuIndicator: react.ForwardRefExoticComponent<NavigationMenuIndicatorProps & react.RefAttributes<HTMLDivElement>>;
interface NavigationMenuViewportProps extends React.ComponentPropsWithoutRef<typeof RNav.Viewport> {
    children?: ReactNode;
}
declare const NavigationMenuViewport: react.ForwardRefExoticComponent<NavigationMenuViewportProps & react.RefAttributes<HTMLDivElement>>;

export { NavigationMenu, NavigationMenuContent, type NavigationMenuContentProps, NavigationMenuIndicator, type NavigationMenuIndicatorProps, NavigationMenuItem, type NavigationMenuItemProps, NavigationMenuLink, type NavigationMenuLinkProps, NavigationMenuList, NavigationMenuTrigger, type NavigationMenuTriggerProps, NavigationMenuViewport, type NavigationMenuViewportProps };
