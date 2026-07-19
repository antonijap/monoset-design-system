import * as react_jsx_runtime from 'react/jsx-runtime';

interface ProgressProps {
    value?: number;
    max?: number;
    /** If no value is given, renders indeterminate animation. */
    indeterminate?: boolean;
    className?: string;
    "aria-label"?: string;
}
declare function Progress({ value, max, indeterminate, className, "aria-label": ariaLabel, }: ProgressProps): react_jsx_runtime.JSX.Element;

export { Progress, type ProgressProps };
