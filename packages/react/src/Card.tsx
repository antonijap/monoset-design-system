import { Slot } from "@radix-ui/react-slot";
import {
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cx } from "./cx";

const htmlElementTags = new Set(
  "a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p picture pre progress q rp rt ruby s samp script search section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr".split(" "),
);

export type CardVariant = "outline" | "elevated" | "inset";

interface CardSharedProps {
  variant?: CardVariant;
}

export type CardProps = CardSharedProps & (
  | (Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
      /** Uses the default div wrapper. */
      asChild?: false;
      children?: ReactNode;
    })
  | (Omit<HTMLAttributes<HTMLElement>, "children"> & {
      /** Applies the card props to exactly one child element. */
      asChild: true;
      children: ReactElement<HTMLAttributes<HTMLElement>, keyof HTMLElementTagNameMap>;
    })
);

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { variant = "outline", asChild = false, className, children, ...rest }, ref
) {
  const classes = cx(
    "ms-card",
    variant === "elevated" && "ms-card--elevated",
    variant === "inset" && "ms-card--inset",
    className,
  );

  if (asChild) {
    if (
      !isValidElement(children) ||
      typeof children.type !== "string" ||
      !htmlElementTags.has(children.type)
    ) {
      throw new Error("Card asChild requires exactly one intrinsic HTML element.");
    }

    return (
      <Slot ref={ref} className={classes} {...rest}>
        {children}
      </Slot>
    );
  }

  return (
    <Slot ref={ref} className={classes} {...rest}>
      <div>{children}</div>
    </Slot>
  );
});
