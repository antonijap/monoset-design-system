import { forwardRef, type TableHTMLAttributes } from "react";
import { cx } from "./cx";

export const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
  function Table({ className, children, ...rest }, ref) {
    return (
      <div className="ms-table-wrapper">
        <table ref={ref} className={cx("ms-table", className)} {...rest}>
          {children}
        </table>
      </div>
    );
  }
);

export { }; // ensure module
