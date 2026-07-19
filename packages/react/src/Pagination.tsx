import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "./cx";

export interface PaginationProps extends Omit<ComponentPropsWithoutRef<"nav">, "children"> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Max numbered buttons shown — defaults to 7. Ellipsis fills gaps. */
  siblings?: number;
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;
}

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

function normalizePageCount(pageCount: number) {
  return Number.isFinite(pageCount) ? Math.max(0, Math.floor(pageCount)) : 0;
}

function normalizePage(page: number, pageCount: number) {
  const integerPage = Number.isFinite(page) ? Math.floor(page) : 1;
  return Math.min(Math.max(integerPage, 1), pageCount);
}

function normalizeSiblings(siblings: number) {
  return Number.isFinite(siblings) ? Math.max(0, Math.floor(siblings)) : 1;
}

export const Pagination = forwardRef<ElementRef<"nav">, PaginationProps>(function Pagination(
  {
    page,
    pageCount,
    onPageChange,
    siblings = 1,
    prevLabel = <ChevronLeft size={16} strokeWidth={2} aria-hidden />,
    nextLabel = <ChevronRight size={16} strokeWidth={2} aria-hidden />,
    className,
    "aria-label": ariaLabel = "Pagination",
    ...rest
  },
  ref,
) {
  const normalizedPageCount = normalizePageCount(pageCount);
  if (normalizedPageCount <= 1) return null;

  const normalizedPage = normalizePage(page, normalizedPageCount);
  const normalizedSiblings = normalizeSiblings(siblings);

  const first = 1;
  const last = normalizedPageCount;
  const start = Math.max(normalizedPage - normalizedSiblings, first + 1);
  const end = Math.min(normalizedPage + normalizedSiblings, last - 1);

  const pages: Array<number | "…"> = [first];
  if (start > first + 1) pages.push("…");
  pages.push(...range(start, end));
  if (end < last - 1) pages.push("…");
  if (last > first) pages.push(last);

  return (
    <nav
      {...rest}
      ref={ref}
      aria-label={ariaLabel}
      className={cx("ms-pagination", className)}
    >
      <button
        type="button"
        className="ms-pagination__btn"
        aria-label="Previous page"
        disabled={normalizedPage <= 1}
        onClick={() => onPageChange(normalizedPage - 1)}
      >{prevLabel}</button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e-${i}`} className="ms-pagination__btn" aria-hidden>…</span>
        ) : (
          <button
            key={p}
            type="button"
            className="ms-pagination__btn"
            aria-current={p === normalizedPage ? "page" : undefined}
            aria-label={`Page ${p}`}
            onClick={() => onPageChange(p)}
          >{p}</button>
        )
      )}
      <button
        type="button"
        className="ms-pagination__btn"
        aria-label="Next page"
        disabled={normalizedPage >= normalizedPageCount}
        onClick={() => onPageChange(normalizedPage + 1)}
      >{nextLabel}</button>
    </nav>
  );
});
