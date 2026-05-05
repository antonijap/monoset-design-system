import * as RNav from "@radix-ui/react-navigation-menu";
import { forwardRef, type ReactNode } from "react";
import { cx } from "./cx";

export const NavigationMenu = RNav.Root;
export const NavigationMenuList = RNav.List;

export interface NavigationMenuItemProps extends React.ComponentPropsWithoutRef<typeof RNav.Item> {
  children?: ReactNode;
}

export const NavigationMenuItem = forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  function NavigationMenuItem({ className, ...rest }, ref) {
    return <RNav.Item ref={ref} className={cx("ms-nav-item", className)} {...rest} />;
  },
);

export interface NavigationMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof RNav.Trigger> {
  children?: ReactNode;
}

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  function NavigationMenuTrigger({ className, children, ...rest }, ref) {
    return (
      <RNav.Trigger ref={ref} className={cx("ms-nav-trigger", className)} {...rest}>
        {children}
        <span className="ms-nav-caret" aria-hidden>▾</span>
      </RNav.Trigger>
    );
  },
);

export interface NavigationMenuContentProps extends React.ComponentPropsWithoutRef<typeof RNav.Content> {
  children?: ReactNode;
}

export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  function NavigationMenuContent({ className, children, ...rest }, ref) {
    return (
      <RNav.Content ref={ref} className={cx("ms-nav-content", className)} {...rest}>
        {children}
      </RNav.Content>
    );
  },
);

export interface NavigationMenuLinkProps extends React.ComponentPropsWithoutRef<typeof RNav.Link> {
  children?: ReactNode;
}

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  function NavigationMenuLink({ className, children, ...rest }, ref) {
    return (
      <RNav.Link ref={ref} className={cx("ms-nav-link", className)} {...rest}>
        {children}
      </RNav.Link>
    );
  },
);
