import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "./cx";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 16, label = "Loading", className, style, ...rest }, ref
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cx("ms-spinner", className)}
      style={{ width: size, height: size, ...style }}
      {...rest}
    />
  );
});
