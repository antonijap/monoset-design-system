import * as RCtx from "@radix-ui/react-context-menu";
import { forwardRef, type ReactNode } from "react";
import { cx } from "./cx";

export const ContextMenu = RCtx.Root;
export const ContextMenuTrigger = RCtx.Trigger;

export interface ContextMenuContentProps extends React.ComponentPropsWithoutRef<typeof RCtx.Content> {
  children?: ReactNode;
}

export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  function ContextMenuContent({ className, children, ...rest }, ref) {
    return (
      <RCtx.Portal>
        <RCtx.Content ref={ref} className={cx("ms-menu", className)} {...rest}>
          {children}
        </RCtx.Content>
      </RCtx.Portal>
    );
  },
);

export interface ContextMenuItemProps extends React.ComponentPropsWithoutRef<typeof RCtx.Item> {
  children?: ReactNode;
}

export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  function ContextMenuItem({ className, ...rest }, ref) {
    return <RCtx.Item ref={ref} className={cx("ms-menu__item", className)} {...rest} />;
  },
);

export const ContextMenuLabel = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof RCtx.Label>>(
  function ContextMenuLabel({ className, ...rest }, ref) {
    return <RCtx.Label ref={ref} className={cx("ms-menu__label", className)} {...rest} />;
  },
);

export const ContextMenuSeparator = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof RCtx.Separator>>(
  function ContextMenuSeparator({ className, ...rest }, ref) {
    return <RCtx.Separator ref={ref} className={cx("ms-menu__separator", className)} {...rest} />;
  },
);
