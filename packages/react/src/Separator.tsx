import * as RSeparator from "@radix-ui/react-separator";
import { forwardRef } from "react";
import { cx } from "./cx";

export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof RSeparator.Root> {}

export const Separator = forwardRef<
  React.ElementRef<typeof RSeparator.Root>,
  SeparatorProps
>(function Separator({ className, ...rest }, ref) {
  return <RSeparator.Root ref={ref} className={cx("ms-separator", className)} {...rest} />;
});
