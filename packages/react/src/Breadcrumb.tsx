import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type Key,
  type ReactNode,
} from "react";
import { cx } from "./cx";

export interface BreadcrumbItem {
  id?: Key;
  label: ReactNode;
  href?: string;
  /** The final crumb — marked aria-current */
  current?: boolean;
}

export interface BreadcrumbProps extends Omit<ComponentPropsWithoutRef<"nav">, "children"> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

export const Breadcrumb = forwardRef<ElementRef<"nav">, BreadcrumbProps>(
  function Breadcrumb(
    { items, separator = "/", className, "aria-label": ariaLabel = "Breadcrumb", ...rest },
    ref,
  ) {
    const hasExplicitCurrent = items.some((item) => item.current === true);

    return (
      <nav
        {...rest}
        ref={ref}
        aria-label={ariaLabel}
        className={cx("ms-breadcrumb", className)}
      >
        <ol className="ms-breadcrumb__list">
          {items.map((item, index) => {
            const current = item.current ?? (!hasExplicitCurrent && index === items.length - 1);
            const fallbackKey = item.href ?? (typeof item.label === "string" ? item.label : "item");
            const key = item.id ?? `${fallbackKey}-${index}`;

            return (
              <li key={key} className="ms-breadcrumb__entry">
                {index > 0 && (
                  <span className="ms-breadcrumb__sep" aria-hidden>
                    {separator}
                  </span>
                )}
                {item.href && !current ? (
                  <a href={item.href} className="ms-breadcrumb__item">{item.label}</a>
                ) : (
                  <span className="ms-breadcrumb__item" aria-current={current ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);
