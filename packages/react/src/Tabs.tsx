import * as RTabs from "@radix-ui/react-tabs";
import { forwardRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { DUR, EASE_EMPHASIS } from "@monoset/motion";
import { cx } from "./cx";

export const Tabs = RTabs.Root;

export const TabsList = forwardRef<
  React.ElementRef<typeof RTabs.List>,
  React.ComponentPropsWithoutRef<typeof RTabs.List>
>(function TabsList({ className, ...rest }, ref) {
  return <RTabs.List ref={ref} className={cx("ms-tabs__list", className)} {...rest} />;
});

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RTabs.Trigger> {
  children?: ReactNode;
  /** Shared layoutId for the sliding underline. */
  layoutId?: string;
  isActive?: boolean;
}

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof RTabs.Trigger>,
  TabsTriggerProps
>(function TabsTrigger({ className, children, isActive, layoutId = "ms-tabs-indicator", ...rest }, ref) {
  return (
    <RTabs.Trigger
      ref={ref}
      className={cx("ms-tabs__trigger", className)}
      data-state={isActive ? "active" : "inactive"}
      {...rest}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId={layoutId}
          className="ms-tabs__indicator"
          transition={{ duration: DUR.base, ease: EASE_EMPHASIS }}
        />
      )}
    </RTabs.Trigger>
  );
});

export const TabsContent = RTabs.Content;
