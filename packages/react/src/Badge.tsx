import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "./cx";

export type BadgeVariant = "neutral" | "solid" | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "neutral", className, ...rest }, ref
) {
  return (
    <span ref={ref} className={cx("ms-badge", `ms-badge--${variant}`, className)} {...rest} />
  );
});
