import { forwardRef, type HTMLAttributes, type CSSProperties } from "react";
import { cx } from "./cx";

type SpaceScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

/* ---------------------------------------------------------------------------
 * Stack
 * -------------------------------------------------------------------------*/

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: SpaceScale;
  align?: "start" | "center" | "end" | "stretch";
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { gap = 4, align, style, className, ...rest }, ref
) {
  return (
    <div
      ref={ref}
      className={cx("ms-stack", className)}
      style={{
        gap: `var(--space-${gap})`,
        alignItems: align,
        ...style,
      } as CSSProperties}
      {...rest}
    />
  );
});

/* ---------------------------------------------------------------------------
 * Inline
 * -------------------------------------------------------------------------*/

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  gap?: SpaceScale;
  align?: "start" | "center" | "end" | "baseline";
  wrap?: boolean;
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(function Inline(
  { gap = 4, align, wrap = true, style, className, ...rest }, ref
) {
  return (
    <div
      ref={ref}
      className={cx("ms-inline", wrap && "ms-inline--wrap", className)}
      style={{
        gap: `var(--space-${gap})`,
        alignItems: align,
        ...style,
      } as CSSProperties}
      {...rest}
    />
  );
});

/* ---------------------------------------------------------------------------
 * Grid
 * -------------------------------------------------------------------------*/

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  minWidth?: number | string;
  gap?: SpaceScale;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns, minWidth = 240, gap = 4, style, className, ...rest }, ref
) {
  const min = typeof minWidth === "number" ? `${minWidth}px` : minWidth;
  const template = columns
    ? `repeat(${columns}, 1fr)`
    : `repeat(auto-fit, minmax(${min}, 1fr))`;

  return (
    <div
      ref={ref}
      className={cx("ms-grid", className)}
      style={{
        gridTemplateColumns: template,
        gap: `var(--space-${gap})`,
        ...style,
      } as CSSProperties}
      {...rest}
    />
  );
});

/* ---------------------------------------------------------------------------
 * Container
 * -------------------------------------------------------------------------*/

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  padding?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = "lg", padding = true, style, className, ...rest }, ref
) {
  return (
    <div
      ref={ref}
      className={cx("ms-container", padding && "ms-container--padded", className)}
      style={{
        maxWidth: `var(--container-${size})`,
        ...style,
      } as CSSProperties}
      {...rest}
    />
  );
});
