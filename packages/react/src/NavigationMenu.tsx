import * as RNav from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import {
  Children,
  cloneElement,
  forwardRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { cx } from "./cx";

export const NavigationMenu = forwardRef<
  React.ElementRef<typeof RNav.Root>,
  React.ComponentPropsWithoutRef<typeof RNav.Root>
>(function NavigationMenu({ className, ...rest }, ref) {
  return <RNav.Root ref={ref} className={cx("ms-nav", className)} {...rest} />;
});

export const NavigationMenuList = forwardRef<
  React.ElementRef<typeof RNav.List>,
  React.ComponentPropsWithoutRef<typeof RNav.List>
>(function NavigationMenuList({ className, ...rest }, ref) {
  return (
    <RNav.List ref={ref} className={cx("ms-nav-list", className)} {...rest} />
  );
});

export interface NavigationMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof RNav.Item> {
  children?: ReactNode;
}

export const NavigationMenuItem = forwardRef<
  React.ElementRef<typeof RNav.Item>,
  NavigationMenuItemProps
>(
  function NavigationMenuItem({ className, ...rest }, ref) {
    return (
      <RNav.Item
        ref={ref}
        className={cx("ms-nav-item", className)}
        {...rest}
      />
    );
  },
);

export interface NavigationMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RNav.Trigger> {
  children?: ReactNode;
}

export const NavigationMenuTrigger = forwardRef<
  React.ElementRef<typeof RNav.Trigger>,
  NavigationMenuTriggerProps
>(
  function NavigationMenuTrigger(
    { asChild, className, children, ...rest },
    ref,
  ) {
    let triggerChildren = (
      <>
        {children}
        <NavigationMenuCaret />
      </>
    );

    if (asChild) {
      const child = Children.only(children) as ReactElement<{
        children?: ReactNode;
      }>;
      triggerChildren = cloneElement(
        child,
        undefined,
        child.props.children,
        <NavigationMenuCaret />,
      );
    }

    return (
      <RNav.Trigger
        ref={ref}
        asChild={asChild}
        className={cx("ms-nav-trigger", className)}
        {...rest}
      >
        {triggerChildren}
      </RNav.Trigger>
    );
  },
);

function NavigationMenuCaret() {
  return (
    <span className="ms-nav-caret" aria-hidden>
      <ChevronDown size={16} strokeWidth={2} />
    </span>
  );
}

export interface NavigationMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof RNav.Content> {
  children?: ReactNode;
}

export const NavigationMenuContent = forwardRef<
  React.ElementRef<typeof RNav.Content>,
  NavigationMenuContentProps
>(
  function NavigationMenuContent({ className, children, ...rest }, ref) {
    return (
      <RNav.Content
        ref={ref}
        className={cx("ms-nav-content", className)}
        {...rest}
      >
        {children}
      </RNav.Content>
    );
  },
);

export interface NavigationMenuLinkProps
  extends React.ComponentPropsWithoutRef<typeof RNav.Link> {
  children?: ReactNode;
}

export const NavigationMenuLink = forwardRef<
  React.ElementRef<typeof RNav.Link>,
  NavigationMenuLinkProps
>(
  function NavigationMenuLink({ className, children, ...rest }, ref) {
    return (
      <RNav.Link ref={ref} className={cx("ms-nav-link", className)} {...rest}>
        {children}
      </RNav.Link>
    );
  },
);

export interface NavigationMenuIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof RNav.Indicator> {
  children?: ReactNode;
}

export const NavigationMenuIndicator = forwardRef<
  React.ElementRef<typeof RNav.Indicator>,
  NavigationMenuIndicatorProps
>(function NavigationMenuIndicator({ className, ...rest }, ref) {
  return (
    <RNav.Indicator
      ref={ref}
      className={cx("ms-nav-indicator", className)}
      {...rest}
    />
  );
});

export interface NavigationMenuViewportProps
  extends React.ComponentPropsWithoutRef<typeof RNav.Viewport> {
  children?: ReactNode;
}

export const NavigationMenuViewport = forwardRef<
  React.ElementRef<typeof RNav.Viewport>,
  NavigationMenuViewportProps
>(function NavigationMenuViewport({ className, ...rest }, ref) {
  return (
    <RNav.Viewport
      ref={ref}
      className={cx("ms-nav-viewport", className)}
      {...rest}
    />
  );
});
