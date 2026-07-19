import * as RTooltip from "@radix-ui/react-tooltip";
import {
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { cx } from "./cx";
import { useMonosetPortalContainer } from "./PortalContext";

export interface TooltipProviderProps
  extends ComponentPropsWithoutRef<typeof RTooltip.Provider> {}

export function TooltipProvider({
  children,
  delayDuration = 300,
  ...props
}: TooltipProviderProps) {
  return (
    <RTooltip.Provider {...props} delayDuration={delayDuration}>
      {children}
    </RTooltip.Provider>
  );
}

type TooltipRootProps = ComponentPropsWithoutRef<typeof RTooltip.Root>;
type TooltipContentProps = ComponentPropsWithoutRef<typeof RTooltip.Content>;

export interface TooltipProps extends Omit<TooltipRootProps, "children"> {
  content: ReactNode;
  children: ReactElement;
  side?: TooltipContentProps["side"];
  sideOffset?: TooltipContentProps["sideOffset"];
  align?: TooltipContentProps["align"];
  className?: string;
  contentProps?: Omit<
    TooltipContentProps,
    "children" | "side" | "sideOffset" | "align" | "className"
  >;
}

export function Tooltip({
  content,
  children,
  side = "top",
  sideOffset = 6,
  align,
  className,
  contentProps,
  ...rootProps
}: TooltipProps) {
  const portalContainer = useMonosetPortalContainer();
  return (
    <RTooltip.Root {...rootProps}>
      <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
      <RTooltip.Portal container={portalContainer ?? undefined}>
        <RTooltip.Content
          {...contentProps}
          side={side}
          sideOffset={sideOffset}
          align={align}
          className={cx("ms-tooltip", className)}
        >
          {content}
        </RTooltip.Content>
      </RTooltip.Portal>
    </RTooltip.Root>
  );
}
