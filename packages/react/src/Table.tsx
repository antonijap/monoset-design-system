import { forwardRef, type CSSProperties, type TableHTMLAttributes } from "react";
import { cx } from "./cx";

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

