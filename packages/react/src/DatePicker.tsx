import * as RPopover from "@radix-ui/react-popover";
import { forwardRef, useState, useId } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./Calendar";
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
            <CalendarIcon size={14} strokeWidth={2} aria-hidden />
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
            <Calendar
              value={selected}
              month={view}
              onMonthChange={setView}
              onValueChange={(d) => { set(d); setOpen(false); }}
              min={min}
              max={max}
              locale={locale}
            />
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
