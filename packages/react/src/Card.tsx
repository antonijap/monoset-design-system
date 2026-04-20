import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "./cx";

export type CardVariant = "outline" | "elevated" | "inset";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Render as a different element (useful for article, section). */
  as?: "div" | "article" | "section";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "outline", as: Tag = "div", className, ...rest }, ref
) {
  const classes = cx(
    "ms-card",
    variant === "elevated" && "ms-card--elevated",
    variant === "inset" && "ms-card--inset",
    className,
  );
  // forwardRef typing for polymorphic-lite
  return <Tag ref={ref as any} className={classes} {...rest} />;
});
