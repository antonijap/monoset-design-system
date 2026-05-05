import * as RPopover from "@radix-ui/react-popover";
import { forwardRef, useState, useId } from "react";
import { cx } from "./cx";

export interface DatePickerProps {
  /** Currently selected date. Controlled. */
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
  /** Earliest selectable date (inclusive). */
  min?: Date;
  /** Latest selectable date (inclusive). */
  max?: Date;
  /** Locale for month/weekday labels. Defaults to the browser's locale. */
  locale?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Format function for the trigger label. Default: locale-aware short date. */
  format?: (date: Date) => string;
}

const WEEKDAYS_FALLBACK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startOfDay(d: Date) {
  const c = new Date(d); c.setHours(0, 0, 0, 0); return c;
}
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function addMonths(d: Date, n: number) {
  const c = new Date(d); c.setMonth(c.getMonth() + n); return c;
}
function defaultFormat(d: Date, locale?: string) {
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker({ value, defaultValue, onValueChange, min, max, locale, placeholder = "Pick a date", disabled, id, className, format = (d) => defaultFormat(d, locale), ...ariaProps }, ref) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<Date | null>(defaultValue ?? null);
    const selected = isControlled ? value ?? null : internal;

    const [open, setOpen] = useState(false);
    const [view, setView] = useState<Date>(() => selected || new Date());
    const popId = useId();

    const set = (d: Date | null) => {
      if (!isControlled) setInternal(d);
      onValueChange?.(d);
    };

    const isDisabled = (d: Date) => {
      if (min && startOfDay(d) < startOfDay(min)) return true;
      if (max && startOfDay(d) > startOfDay(max)) return true;
      return false;
    };

    // Build month grid: 6 rows × 7 columns, Monday-first
    const firstOfMonth = new Date(view.getFullYear(), view.getMonth(), 1);
    const startWeekday = (firstOfMonth.getDay() + 6) % 7; // Mon=0
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(firstOfMonth.getDate() - startWeekday);

    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      days.push(d);
    }

    const monthLabel = view.toLocaleDateString(locale, { month: "long", year: "numeric" });
    const today = startOfDay(new Date());

    return (
      <RPopover.Root open={open} onOpenChange={setOpen}>
        <RPopover.Trigger asChild disabled={disabled}>
          <button
            ref={ref}
            id={id}
            type="button"
            disabled={disabled}
            className={cx("ms-combobox__trigger", "ms-datepicker__trigger", className)}
            {...ariaProps}
          >
            <span className={cx("ms-combobox__value", !selected && "ms-combobox__value--placeholder")}>
              {selected ? format(selected) : placeholder}
            </span>
            <CalendarIcon/>
          </button>
        </RPopover.Trigger>
        <RPopover.Portal>
          <RPopover.Content
            id={popId}
            sideOffset={6}
            align="start"
            className="ms-datepicker__panel"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="ms-datepicker__header">
              <button type="button" aria-label="Previous month" onClick={() => setView((v) => addMonths(v, -1))} className="ms-datepicker__nav">‹</button>
              <span className="ms-datepicker__month">{monthLabel}</span>
              <button type="button" aria-label="Next month" onClick={() => setView((v) => addMonths(v, 1))} className="ms-datepicker__nav">›</button>
            </div>
            <div className="ms-datepicker__weekdays" aria-hidden>
              {WEEKDAYS_FALLBACK.map((w) => <span key={w}>{w}</span>)}
            </div>
            <div role="grid" aria-label={monthLabel} className="ms-datepicker__grid">
              {days.map((d) => {
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
                    disabled={off}
                    onClick={() => { set(d); setOpen(false); }}
                    className={cx(
                      "ms-datepicker__cell",
                      !inMonth && "ms-datepicker__cell--outside",
                      isSelected && "ms-datepicker__cell--selected",
                      isToday && "ms-datepicker__cell--today",
                    )}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
            {selected && (
              <div className="ms-datepicker__footer">
                <button type="button" onClick={() => { set(null); setOpen(false); }} className="ms-datepicker__clear">Clear</button>
              </div>
            )}
          </RPopover.Content>
        </RPopover.Portal>
      </RPopover.Root>
    );
  },
);

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  );
}
