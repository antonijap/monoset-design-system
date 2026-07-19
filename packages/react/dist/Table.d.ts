import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { TableHTMLAttributes, ThHTMLAttributes } from 'react';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    /**
     * Cap the visible height of the table. When the rows overflow, the
     * wrapper scrolls and the thead stays pinned. Accepts any CSS length.
     */
    maxHeight?: number | string;
    /** Apply a className to the outer scrolling wrapper. */
    wrapperClassName?: string;
}
declare const Table: react.ForwardRefExoticComponent<TableProps & react.RefAttributes<HTMLTableElement>>;
type SortDirection = "asc" | "desc" | null;
interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
    /** Enable sort on this column. */
    sortable?: boolean;
    /** Current sort direction for this column. */
    sortDirection?: SortDirection;
    /** Callback when the user clicks to toggle sort. */
    onSort?: () => void;
}
declare const TableHeader: react.ForwardRefExoticComponent<TableHeaderProps & react.RefAttributes<HTMLTableCellElement>>;
interface TableSelectAllProps {
    checked: boolean;
    indeterminate?: boolean;
    onChange: (checked: boolean) => void;
    /** Screen-reader label. Defaults to "Select all rows". */
    label?: string;
}
declare function TableSelectAll({ checked, indeterminate, onChange, label, }: TableSelectAllProps): react_jsx_runtime.JSX.Element;
interface TableSelectRowProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    /** Screen-reader label. Defaults to "Select row". */
    label?: string;
}
declare function TableSelectRow({ checked, onChange, label, }: TableSelectRowProps): react_jsx_runtime.JSX.Element;

export { type SortDirection, Table, TableHeader, type TableHeaderProps, type TableProps, TableSelectAll, type TableSelectAllProps, TableSelectRow, type TableSelectRowProps };
