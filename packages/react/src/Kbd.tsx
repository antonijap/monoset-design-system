import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "./cx";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: "sm" | "md";
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { size = "md", className, ...rest }, ref
) {
  return <kbd ref={ref} className={cx("ms-kbd", `ms-kbd--${size}`, className)} {...rest} />;
});
