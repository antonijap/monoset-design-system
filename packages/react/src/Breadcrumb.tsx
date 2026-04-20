import { Fragment, type ReactNode } from "react";
import { cx } from "./cx";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  /** The final crumb — marked aria-current */
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

export function Breadcrumb({ items, separator = "/", className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cx("ms-breadcrumb", className)}>
      {items.map((it, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="ms-breadcrumb__sep" aria-hidden>{separator}</span>}
          {it.href && !it.current ? (
            <a href={it.href} className="ms-breadcrumb__item">{it.label}</a>
          ) : (
            <span className="ms-breadcrumb__item" aria-current={it.current ? "page" : undefined}>{it.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
