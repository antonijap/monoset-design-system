import * as RPopover from "@radix-ui/react-popover";
import { type ReactNode } from "react";
import { cx } from "./cx";

export const Popover = RPopover.Root;
export const PopoverTrigger = RPopover.Trigger;
export const PopoverClose = RPopover.Close;

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof RPopover.Content> {
  children?: ReactNode;
}

export function PopoverContent({ className, children, sideOffset = 6, ...rest }: PopoverContentProps) {
  return (
    <RPopover.Portal>
      <RPopover.Content sideOffset={sideOffset} className={cx("ms-popover", className)} {...rest}>
        {children}
      </RPopover.Content>
    </RPopover.Portal>
  );
}
