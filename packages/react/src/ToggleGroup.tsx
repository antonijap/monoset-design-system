import * as RToggleGroup from "@radix-ui/react-toggle-group";
import * as RToggle from "@radix-ui/react-toggle";
import { forwardRef } from "react";
import { cx } from "./cx";

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof RToggle.Root> {}

export const Toggle = forwardRef<
  React.ElementRef<typeof RToggle.Root>,
  ToggleProps
>(function Toggle({ className, ...rest }, ref) {
  return <RToggle.Root ref={ref} className={cx("ms-toggle", className)} {...rest} />;
});

export type ToggleGroupProps = React.ComponentPropsWithoutRef<
  typeof RToggleGroup.Root
>;

export const ToggleGroup = forwardRef<
  React.ElementRef<typeof RToggleGroup.Root>,
  ToggleGroupProps
>(function ToggleGroup({ className, ...rest }, ref) {
  return <RToggleGroup.Root ref={ref} className={cx("ms-toggle-group", className)} {...rest} />;
});

export interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RToggleGroup.Item> {}

export const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof RToggleGroup.Item>,
  ToggleGroupItemProps
>(function ToggleGroupItem({ className, ...rest }, ref) {
  return <RToggleGroup.Item ref={ref} className={cx("ms-toggle", className)} {...rest} />;
});
