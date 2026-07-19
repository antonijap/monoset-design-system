import * as RPopover from "@radix-ui/react-popover";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cx } from "./cx";
import { useMonosetPortalContainer } from "./PortalContext";

export const Popover = RPopover.Root;
export const PopoverTrigger = RPopover.Trigger;
export const PopoverClose = RPopover.Close;

export interface PopoverContentProps
  extends ComponentPropsWithoutRef<typeof RPopover.Content> {
  children?: ReactNode;
}

export const PopoverContent = forwardRef<
  ElementRef<typeof RPopover.Content>,
  PopoverContentProps
>(function PopoverContent(
  { className, children, sideOffset = 6, ...rest },
  ref,
) {
  const portalContainer = useMonosetPortalContainer();

  return (
    <RPopover.Portal container={portalContainer ?? undefined}>
      <RPopover.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cx("ms-popover", className)}
        {...rest}
      >
        {children}
      </RPopover.Content>
    </RPopover.Portal>
  );
});
