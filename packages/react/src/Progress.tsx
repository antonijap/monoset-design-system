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
  const isIndeterminate = indeterminate ?? value === undefined;
  const normalizedMax = Number.isFinite(max) && max > 0 ? max : 100;
  const normalizedValue = Number.isFinite(value)
    ? Math.min(normalizedMax, Math.max(0, value ?? 0))
    : 0;
  const pct = isIndeterminate ? undefined : (normalizedValue / normalizedMax) * 100;
  return (
    <RProgress.Root value={isIndeterminate ? null : normalizedValue} max={normalizedMax} aria-label={ariaLabel} className={cx("ms-progress", className)}>
      <RProgress.Indicator
        className="ms-progress__indicator"
        style={isIndeterminate
          ? { width: "40%", animation: "ms-indeterminate 1.4s infinite" }
          : { width: `${pct}%` }}
      />
    </RProgress.Root>
  );
}
