import * as RCtx from "@radix-ui/react-context-menu";
import { forwardRef, type ReactNode } from "react";
import { cx } from "./cx";
import { useMonosetPortalContainer } from "./PortalContext";

export const ContextMenu = RCtx.Root;
export const ContextMenuTrigger = RCtx.Trigger;
export const ContextMenuSub = RCtx.Sub;

export interface ContextMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof RCtx.Content> {
  children?: ReactNode;
}

export const ContextMenuContent = forwardRef<
  React.ElementRef<typeof RCtx.Content>,
  ContextMenuContentProps
>(
  function ContextMenuContent({ className, children, ...rest }, ref) {
    const portalContainer = useMonosetPortalContainer();

    return (
      <RCtx.Portal container={portalContainer ?? undefined}>
        <RCtx.Content ref={ref} className={cx("ms-menu", className)} {...rest}>
          {children}
        </RCtx.Content>
      </RCtx.Portal>
    );
  },
);

export interface ContextMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof RCtx.Item> {
  children?: ReactNode;
}

export const ContextMenuItem = forwardRef<
  React.ElementRef<typeof RCtx.Item>,
  ContextMenuItemProps
>(
  function ContextMenuItem({ className, ...rest }, ref) {
    return (
      <RCtx.Item
        ref={ref}
        className={cx("ms-menu__item", className)}
        {...rest}
      />
    );
  },
);

export const ContextMenuLabel = forwardRef<
  React.ElementRef<typeof RCtx.Label>,
  React.ComponentPropsWithoutRef<typeof RCtx.Label>
>(
  function ContextMenuLabel({ className, ...rest }, ref) {
    return (
      <RCtx.Label
        ref={ref}
        className={cx("ms-menu__label", className)}
        {...rest}
      />
    );
  },
);

export const ContextMenuSeparator = forwardRef<
  React.ElementRef<typeof RCtx.Separator>,
  React.ComponentPropsWithoutRef<typeof RCtx.Separator>
>(
  function ContextMenuSeparator({ className, ...rest }, ref) {
    return (
      <RCtx.Separator
        ref={ref}
        className={cx("ms-menu__separator", className)}
        {...rest}
      />
    );
  },
);

export const ContextMenuGroup = forwardRef<
  React.ElementRef<typeof RCtx.Group>,
  React.ComponentPropsWithoutRef<typeof RCtx.Group>
>(function ContextMenuGroup({ className, ...rest }, ref) {
  return (
    <RCtx.Group
      ref={ref}
      className={cx("ms-menu__group", className)}
      {...rest}
    />
  );
});

export const ContextMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof RCtx.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof RCtx.CheckboxItem>
>(function ContextMenuCheckboxItem({ className, ...rest }, ref) {
  return (
    <RCtx.CheckboxItem
      ref={ref}
      className={cx(
        "ms-menu__item",
        "ms-menu__item--checkbox",
        className,
      )}
      {...rest}
    />
  );
});

export const ContextMenuItemIndicator = forwardRef<
  React.ElementRef<typeof RCtx.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof RCtx.ItemIndicator>
>(function ContextMenuItemIndicator(
  { "aria-hidden": ariaHidden = true, className, ...rest },
  ref,
) {
  return (
    <RCtx.ItemIndicator
      ref={ref}
      aria-hidden={ariaHidden}
      className={cx("ms-menu__indicator", className)}
      {...rest}
    />
  );
});

export const ContextMenuRadioGroup = forwardRef<
  React.ElementRef<typeof RCtx.RadioGroup>,
  React.ComponentPropsWithoutRef<typeof RCtx.RadioGroup>
>(function ContextMenuRadioGroup({ className, ...rest }, ref) {
  return (
    <RCtx.RadioGroup
      ref={ref}
      className={cx(
        "ms-menu__group",
        "ms-menu__radio-group",
        className,
      )}
      {...rest}
    />
  );
});

export const ContextMenuRadioItem = forwardRef<
  React.ElementRef<typeof RCtx.RadioItem>,
  React.ComponentPropsWithoutRef<typeof RCtx.RadioItem>
>(function ContextMenuRadioItem({ className, ...rest }, ref) {
  return (
    <RCtx.RadioItem
      ref={ref}
      className={cx("ms-menu__item", "ms-menu__item--radio", className)}
      {...rest}
    />
  );
});

export const ContextMenuSubTrigger = forwardRef<
  React.ElementRef<typeof RCtx.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof RCtx.SubTrigger>
>(function ContextMenuSubTrigger({ className, ...rest }, ref) {
  return (
    <RCtx.SubTrigger
      ref={ref}
      className={cx("ms-menu__item", "ms-menu__sub-trigger", className)}
      {...rest}
    />
  );
});

export const ContextMenuSubContent = forwardRef<
  React.ElementRef<typeof RCtx.SubContent>,
  React.ComponentPropsWithoutRef<typeof RCtx.SubContent>
>(function ContextMenuSubContent(
  { className, sideOffset = 4, ...rest },
  ref,
) {
  const portalContainer = useMonosetPortalContainer();

  return (
    <RCtx.Portal container={portalContainer ?? undefined}>
      <RCtx.SubContent
        ref={ref}
        sideOffset={sideOffset}
        className={cx("ms-menu", "ms-menu__sub-content", className)}
        {...rest}
      />
    </RCtx.Portal>
  );
});
