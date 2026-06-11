import { forwardRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "./cx";

export interface CalendarProps {
  /** Selected date. Controlled. */
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date) => void;
  /** Visible month. Controlled. */
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  /** Earliest selectable date (inclusive). */
  min?: Date;
  /** Latest selectable date (inclusive). */
  max?: Date;
  /** Locale for month + weekday labels. Defaults to the browser's locale. */
  locale?: string;
  /** 0 = Sunday, 1 = Monday. Default: 1. */
  weekStartsOn?: 0 | 1;
  className?: string;
  "aria-label"?: string;
}

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function addMonths(d: Date, n: number) {
  const c = new Date(d);
  c.setMonth(c.getMonth() + n);
  return c;
}
function weekdayLabels(locale: string | undefined, weekStartsOn: 0 | 1) {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const base = new Date(2021, 0, 4); // a Monday
  const labels: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    labels.push(fmt.format(d));
  }
  if (weekStartsOn === 0) labels.unshift(labels.pop() as string); // Sunday first
  return labels;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  { value, defaultValue, onValueChange, month, defaultMonth, onMonthChange, min, max, locale, weekStartsOn = 1, className, "aria-label": ariaLabel },
  ref,
) {
  const isControlled = value !== undefined;
  const [internalSel, setInternalSel] = useState<Date | null>(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internalSel;

  const monthControlled = month !== undefined;
  const [internalMonth, setInternalMonth] = useState<Date>(() => month ?? defaultMonth ?? selected ?? new Date());
  const view = monthControlled ? month : internalMonth;

  const setView = (d: Date) => {
    if (!monthControlled) setInternalMonth(d);
    onMonthChange?.(d);
  };
  const select = (d: Date) => {
    if (!isControlled) setInternalSel(d);
    onValueChange?.(d);
  };

  const isDisabled = (d: Date) => {
    if (min && startOfDay(d) < startOfDay(min)) return true;
    if (max && startOfDay(d) > startOfDay(max)) return true;
    return false;
  };

  // 6 rows × 7 columns, starting on weekStartsOn.
  const firstOfMonth = new Date(view.getFullYear(), view.getMonth(), 1);
  const startWeekday = (firstOfMonth.getDay() - weekStartsOn + 7) % 7;
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - startWeekday);

  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const row: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + w * 7 + i);
      row.push(d);
    }
    weeks.push(row);
  }

  const monthLabel = view.toLocaleDateString(locale, { month: "long", year: "numeric" });
  const today = startOfDay(new Date());

  return (
    <div ref={ref} className={cx("ms-calendar", className)} aria-label={ariaLabel}>
      <div className="ms-calendar__header">
        <button type="button" aria-label="Previous month" onClick={() => setView(addMonths(view, -1))} className="ms-calendar__nav">
          <ChevronLeft size={16} strokeWidth={2} aria-hidden />
        </button>
        <span className="ms-calendar__month">{monthLabel}</span>
        <button type="button" aria-label="Next month" onClick={() => setView(addMonths(view, 1))} className="ms-calendar__nav">
          <ChevronRight size={16} strokeWidth={2} aria-hidden />
        </button>
      </div>
      <div className="ms-calendar__weekdays" aria-hidden>
        {weekdayLabels(locale, weekStartsOn).map((w, i) => <span key={i}>{w}</span>)}
      </div>
      <div role="grid" aria-label={monthLabel} className="ms-calendar__grid">
        {weeks.map((week, wi) => (
          <div role="row" key={wi} className="ms-calendar__row">
            {week.map((d) => {
              const inMonth = d.getMonth() === view.getMonth();
              const isSelected = selected && sameDay(d, selected);
              const isToday = sameDay(d, today);
              const off = isDisabled(d);
              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  role="gridcell"
                  aria-selected={!!isSelected}
                  aria-current={isToday ? "date" : undefined}
                  aria-label={d.toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  disabled={off}
                  onClick={() => select(d)}
                  className={cx(
                    "ms-calendar__cell",
                    !inMonth && "ms-calendar__cell--outside",
                    isSelected && "ms-calendar__cell--selected",
                    isToday && "ms-calendar__cell--today",
                  )}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});
