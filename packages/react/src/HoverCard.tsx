import * as RHoverCard from "@radix-ui/react-hover-card";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cx } from "./cx";
import { useMonosetPortalContainer } from "./PortalContext";

export const HoverCard = RHoverCard.Root;
export const HoverCardTrigger = RHoverCard.Trigger;

export interface HoverCardContentProps
  extends ComponentPropsWithoutRef<typeof RHoverCard.Content> {
  children?: ReactNode;
}

export const HoverCardContent = forwardRef<
  ElementRef<typeof RHoverCard.Content>,
  HoverCardContentProps
>(function HoverCardContent(
  { className, children, sideOffset = 6, ...rest },
  ref,
) {
  const portalContainer = useMonosetPortalContainer();

  return (
    <RHoverCard.Portal container={portalContainer ?? undefined}>
      <RHoverCard.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cx("ms-hovercard", className)}
        {...rest}
      >
        {children}
      </RHoverCard.Content>
    </RHoverCard.Portal>
  );
});
