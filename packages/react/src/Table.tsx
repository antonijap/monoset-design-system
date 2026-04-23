import {
  forwardRef,
  useEffect,
  useRef,
  type CSSProperties,
  type TableHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import { cx } from "./cx";

/* ---------------------------------------------------------------------------
   Table (base — unchanged)
   --------------------------------------------------------------------------- */

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * Cap the visible height of the table. When the rows overflow, the
   * wrapper scrolls and the thead stays pinned. Accepts any CSS length.
   */
  maxHeight?: number | string;
  /** Apply a className to the outer scrolling wrapper. */
  wrapperClassName?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  function Table({ className, children, maxHeight, wrapperClassName, ...rest }, ref) {
    const style: CSSProperties | undefined = maxHeight !== undefined
      ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }
      : undefined;

    return (
      <div
        className={cx(
          "ms-table-wrapper",
          maxHeight !== undefined && "ms-table-wrapper--scroll",
          wrapperClassName,
        )}
        style={style}
      >
        <table ref={ref} className={cx("ms-table", className)} {...rest}>
          {children}
        </table>
      </div>
    );
  }
);

/* ---------------------------------------------------------------------------
   Sort helpers
   --------------------------------------------------------------------------- */

export type SortDirection = "asc" | "desc" | null;

function SortIcon({ direction }: { direction?: SortDirection }) {
  if (direction === "asc") {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M5 2L8.5 7H1.5L5 2Z" fill="currentColor" />
      </svg>
    );
  }
  if (direction === "desc") {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M5 8L1.5 3H8.5L5 8Z" fill="currentColor" />
      </svg>
    );
  }
  // Neutral: both arrows, dimmed
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M5 1L7.5 4.5H2.5L5 1Z" fill="currentColor" opacity="0.4" />
      <path d="M5 9L2.5 5.5H7.5L5 9Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   TableHeader — sortable <th>
   --------------------------------------------------------------------------- */

export interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Enable sort on this column. */
  sortable?: boolean;
  /** Current sort direction for this column. */
  sortDirection?: SortDirection;
  /** Callback when the user clicks to toggle sort. */
  onSort?: () => void;
}

export const TableHeader = forwardRef<HTMLTableCellElement, TableHeaderProps>(
  function TableHeader(
    { sortable, sortDirection, onSort, className, children, ...rest },
    ref,
  ) {
    const handleClick = sortable && onSort ? onSort : undefined;
    const ariaSort =
      sortDirection === "asc"
        ? ("ascending" as const)
        : sortDirection === "desc"
          ? ("descending" as const)
          : undefined;

    return (
      <th
        ref={ref}
        className={cx(
          "ms-table-header",
          sortable && "ms-table-header--sortable",
          className,
        )}
        onClick={handleClick}
        aria-sort={ariaSort}
        {...rest}
      >
        {children}
        {sortable && (
          <span
            className={cx(
              "ms-table-header__sort",
              sortDirection != null && "ms-table-header__sort--active",
            )}
          >
            <SortIcon direction={sortDirection} />
          </span>
        )}
      </th>
    );
  },
);

/* ---------------------------------------------------------------------------
   TableSelectAll — select-all checkbox in <thead>
   --------------------------------------------------------------------------- */

export interface TableSelectAllProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  /** Screen-reader label. Defaults to "Select all rows". */
  label?: string;
}

export function TableSelectAll({
  checked,
  indeterminate,
  onChange,
  label = "Select all rows",
}: TableSelectAllProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <th className="ms-table-select">
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
      />
    </th>
  );
}

/* ---------------------------------------------------------------------------
   TableSelectRow — row checkbox in <tbody>
   --------------------------------------------------------------------------- */

export interface TableSelectRowProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Screen-reader label. Defaults to "Select row". */
  label?: string;
}

export function TableSelectRow({
  checked,
  onChange,
  label = "Select row",
}: TableSelectRowProps) {
  return (
    <td className="ms-table-select">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
      />
    </td>
  );
}
