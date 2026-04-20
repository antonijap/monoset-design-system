import { type ReactNode } from "react";
import { cx } from "./cx";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Max numbered buttons shown — defaults to 7. Ellipsis fills gaps. */
  siblings?: number;
  className?: string;
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;
}

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

export function Pagination({
  page, pageCount, onPageChange, siblings = 1,
  prevLabel = "‹", nextLabel = "›", className,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const first = 1;
  const last = pageCount;
  const start = Math.max(page - siblings, first + 1);
  const end = Math.min(page + siblings, last - 1);

  const pages: Array<number | "…"> = [first];
  if (start > first + 1) pages.push("…");
  pages.push(...range(start, end));
  if (end < last - 1) pages.push("…");
  if (last > first) pages.push(last);

  return (
    <nav aria-label="Pagination" className={cx("ms-pagination", className)}>
      <button
        type="button"
        className="ms-pagination__btn"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >{prevLabel}</button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e-${i}`} className="ms-pagination__btn" aria-hidden>…</span>
        ) : (
          <button
            key={p}
            type="button"
            className="ms-pagination__btn"
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
            onClick={() => onPageChange(p)}
          >{p}</button>
        )
      )}
      <button
        type="button"
        className="ms-pagination__btn"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >{nextLabel}</button>
    </nav>
  );
}
