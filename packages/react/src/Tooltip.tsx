import * as RTooltip from "@radix-ui/react-tooltip";
import { type ReactNode } from "react";
import { cx } from "./cx";

export function TooltipProvider({ children, delayDuration = 300 }: { children: ReactNode; delayDuration?: number }) {
  return <RTooltip.Provider delayDuration={delayDuration}>{children}</RTooltip.Provider>;
}

export interface TooltipProps {
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
}

export function Tooltip({ content, side = "top", children }: TooltipProps) {
  return (
    <RTooltip.Root>
      <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
      <RTooltip.Portal>
        <RTooltip.Content side={side} sideOffset={6} className={cx("ms-tooltip")}>
          {content}
        </RTooltip.Content>
      </RTooltip.Portal>
    </RTooltip.Root>
  );
}
