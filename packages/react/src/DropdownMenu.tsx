import * as RDropdown from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";
import { cx } from "./cx";
import { useMonosetPortalContainer } from "./PortalContext";

export const DropdownMenu = RDropdown.Root;
export const DropdownMenuTrigger = RDropdown.Trigger;
export const DropdownMenuSub = RDropdown.Sub;

export const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof RDropdown.Content>,
  React.ComponentPropsWithoutRef<typeof RDropdown.Content>
>(function DropdownMenuContent(
  { children, className, sideOffset = 6, ...rest },
  ref,
) {
  const portalContainer = useMonosetPortalContainer();

  return (
    <RDropdown.Portal container={portalContainer ?? undefined}>
      <RDropdown.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cx("ms-menu", className)}
        {...rest}
      >
        {children}
      </RDropdown.Content>
    </RDropdown.Portal>
  );
});

export const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof RDropdown.Item>,
  React.ComponentPropsWithoutRef<typeof RDropdown.Item>
>(function DropdownMenuItem({ className, ...rest }, ref) {
  return (
    <RDropdown.Item
      ref={ref}
      className={cx("ms-menu__item", className)}
      {...rest}
    />
  );
});

export const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof RDropdown.Label>,
  React.ComponentPropsWithoutRef<typeof RDropdown.Label>
>(function DropdownMenuLabel({ className, ...rest }, ref) {
  return (
    <RDropdown.Label
      ref={ref}
      className={cx("ms-menu__label", className)}
      {...rest}
    />
  );
});

export const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof RDropdown.Separator>,
  React.ComponentPropsWithoutRef<typeof RDropdown.Separator>
>(function DropdownMenuSeparator({ className, ...rest }, ref) {
  return (
    <RDropdown.Separator
      ref={ref}
      className={cx("ms-menu__separator", className)}
      {...rest}
    />
  );
});

export const DropdownMenuGroup = forwardRef<
  React.ElementRef<typeof RDropdown.Group>,
  React.ComponentPropsWithoutRef<typeof RDropdown.Group>
>(function DropdownMenuGroup({ className, ...rest }, ref) {
  return (
    <RDropdown.Group
      ref={ref}
      className={cx("ms-menu__group", className)}
      {...rest}
    />
  );
});

export const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof RDropdown.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof RDropdown.CheckboxItem>
>(function DropdownMenuCheckboxItem({ className, ...rest }, ref) {
  return (
    <RDropdown.CheckboxItem
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

export const DropdownMenuItemIndicator = forwardRef<
  React.ElementRef<typeof RDropdown.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof RDropdown.ItemIndicator>
>(function DropdownMenuItemIndicator(
  { "aria-hidden": ariaHidden = true, className, ...rest },
  ref,
) {
  return (
    <RDropdown.ItemIndicator
      ref={ref}
      aria-hidden={ariaHidden}
      className={cx("ms-menu__indicator", className)}
      {...rest}
    />
  );
});

export const DropdownMenuRadioGroup = forwardRef<
  React.ElementRef<typeof RDropdown.RadioGroup>,
  React.ComponentPropsWithoutRef<typeof RDropdown.RadioGroup>
>(function DropdownMenuRadioGroup({ className, ...rest }, ref) {
  return (
    <RDropdown.RadioGroup
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

export const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof RDropdown.RadioItem>,
  React.ComponentPropsWithoutRef<typeof RDropdown.RadioItem>
>(function DropdownMenuRadioItem({ className, ...rest }, ref) {
  return (
    <RDropdown.RadioItem
      ref={ref}
      className={cx("ms-menu__item", "ms-menu__item--radio", className)}
      {...rest}
    />
  );
});

export const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof RDropdown.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof RDropdown.SubTrigger>
>(function DropdownMenuSubTrigger({ className, ...rest }, ref) {
  return (
    <RDropdown.SubTrigger
      ref={ref}
      className={cx("ms-menu__item", "ms-menu__sub-trigger", className)}
      {...rest}
    />
  );
});

export const DropdownMenuSubContent = forwardRef<
  React.ElementRef<typeof RDropdown.SubContent>,
  React.ComponentPropsWithoutRef<typeof RDropdown.SubContent>
>(function DropdownMenuSubContent(
  { className, sideOffset = 4, ...rest },
  ref,
) {
  const portalContainer = useMonosetPortalContainer();

  return (
    <RDropdown.Portal container={portalContainer ?? undefined}>
      <RDropdown.SubContent
        ref={ref}
        sideOffset={sideOffset}
        className={cx("ms-menu", "ms-menu__sub-content", className)}
        {...rest}
      />
    </RDropdown.Portal>
  );
});
