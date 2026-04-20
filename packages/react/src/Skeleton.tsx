import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "./cx";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Pixel or percent width (default 100%). */
  width?: number | string;
  /** Pixel height — default 12px. */
  height?: number | string;
  /** Fully rounded, circle. */
  circle?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { width = "100%", height = 12, circle, style, className, ...rest }, ref
) {
  return (
    <div
      ref={ref}
      aria-hidden
      className={cx("ms-skeleton", className)}
      style={{
        width,
        height: circle ? width : height,
        borderRadius: circle ? "50%" : undefined,
        ...style,
      }}
      {...rest}
    />
  );
});
