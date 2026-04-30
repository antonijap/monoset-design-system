import * as RHoverCard from "@radix-ui/react-hover-card";
import { type ReactNode } from "react";
import { cx } from "./cx";

export const HoverCard = RHoverCard.Root;
export const HoverCardTrigger = RHoverCard.Trigger;

export interface HoverCardContentProps extends React.ComponentPropsWithoutRef<typeof RHoverCard.Content> {
  children?: ReactNode;
}

export function HoverCardContent({ className, children, sideOffset = 6, ...rest }: HoverCardContentProps) {
  return (
    <RHoverCard.Portal>
      <RHoverCard.Content
        sideOffset={sideOffset}
        className={cx("ms-hovercard", className)}
        {...rest}
      >
        {children}
      </RHoverCard.Content>
    </RHoverCard.Portal>
  );
}
