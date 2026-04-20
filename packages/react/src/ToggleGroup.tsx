import * as RToggleGroup from "@radix-ui/react-toggle-group";
import * as RToggle from "@radix-ui/react-toggle";
import { forwardRef } from "react";
import { cx } from "./cx";

export const Toggle = forwardRef<
  React.ElementRef<typeof RToggle.Root>,
  React.ComponentPropsWithoutRef<typeof RToggle.Root>
>(function Toggle({ className, ...rest }, ref) {
  return <RToggle.Root ref={ref} className={cx("ms-toggle", className)} {...rest} />;
});

export const ToggleGroup = forwardRef<
  React.ElementRef<typeof RToggleGroup.Root>,
  React.ComponentPropsWithoutRef<typeof RToggleGroup.Root>
>(function ToggleGroup({ className, ...rest }, ref) {
  return <RToggleGroup.Root ref={ref} className={cx("ms-toggle-group", className)} {...rest} />;
});

export const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof RToggleGroup.Item>,
  React.ComponentPropsWithoutRef<typeof RToggleGroup.Item>
>(function ToggleGroupItem({ className, ...rest }, ref) {
  return <RToggleGroup.Item ref={ref} className={cx("ms-toggle", className)} {...rest} />;
});
