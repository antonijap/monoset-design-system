import * as RProgress from "@radix-ui/react-progress";
import { cx } from "./cx";

export interface ProgressProps {
  value?: number;
  max?: number;
  /** If no value is given, renders indeterminate animation. */
  indeterminate?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function Progress({
  value, max = 100, indeterminate, className, "aria-label": ariaLabel = "Progress",
}: ProgressProps) {
  const pct = indeterminate ? undefined : Math.min(100, Math.max(0, ((value ?? 0) / max) * 100));
  return (
    <RProgress.Root value={indeterminate ? null : (value ?? 0)} max={max} aria-label={ariaLabel} className={cx("ms-progress", className)}>
      <RProgress.Indicator
        className="ms-progress__indicator"
        style={indeterminate
          ? { width: "40%", animation: "ms-indeterminate 1.4s infinite" }
          : { width: `${pct}%` }}
      />
    </RProgress.Root>
  );
}
