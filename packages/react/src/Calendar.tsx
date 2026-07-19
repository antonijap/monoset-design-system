import { forwardRef, type AriaAttributes, type ReactNode } from "react";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Button,
  Calendar as AriaCalendar,
  CalendarCell as Cell,
  CalendarGrid as Grid,
  CalendarGridBody as Body,
  CalendarGridHeader as Header,
  CalendarHeaderCell as HeaderCell,
  CalendarHeading as Heading,
  I18nProvider,
} from "react-aria-components";
import { cx } from "./cx";

export type FirstDayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export interface CalendarProps {
  [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
  value?: CalendarDate | null;
  defaultValue?: CalendarDate | null;
  onValueChange?: (date: CalendarDate) => void;
  focusedValue?: CalendarDate | null;
  defaultFocusedValue?: CalendarDate | null;
  onFocusChange?: (date: CalendarDate) => void;
  min?: CalendarDate | null;
  max?: CalendarDate | null;
  isDateUnavailable?: (date: CalendarDate) => boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  autoFocus?: boolean;
  locale?: string;
  firstDayOfWeek?: FirstDayOfWeek;
  weeksInMonth?: number;
  id?: string;
  "aria-label"?: AriaAttributes["aria-label"];
  "aria-labelledby"?: AriaAttributes["aria-labelledby"];
  className?: string;
}

export function calendarDateFromNativeDate(date: Date): CalendarDate {
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export function calendarDateToNativeDate(
  date: CalendarDate,
  timeZone = getLocalTimeZone(),
): Date {
  return date.toDate(timeZone);
}

function CalendarLocale({ locale, children }: { locale?: string; children: ReactNode }) {
  return locale ? <I18nProvider locale={locale}>{children}</I18nProvider> : children;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    value,
    defaultValue,
    onValueChange,
    focusedValue,
    defaultFocusedValue,
    onFocusChange,
    min,
    max,
    isDateUnavailable,
    disabled,
    readOnly,
    invalid,
    autoFocus,
    locale,
    firstDayOfWeek,
    weeksInMonth = 6,
    id,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...dataProps
  },
  ref,
) {
  return (
    <CalendarLocale locale={locale}>
      <AriaCalendar<CalendarDate>
        {...dataProps}
        ref={ref}
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={onValueChange}
        focusedValue={focusedValue}
        defaultFocusedValue={defaultFocusedValue}
        onFocusChange={onFocusChange}
        minValue={min}
        maxValue={max}
        isDateUnavailable={
          isDateUnavailable ? (date) => isDateUnavailable(date as CalendarDate) : undefined
        }
        isDisabled={disabled}
        isReadOnly={readOnly}
        data-readonly={readOnly || undefined}
        isInvalid={invalid}
        autoFocus={autoFocus}
        firstDayOfWeek={firstDayOfWeek}
        weeksInMonth={weeksInMonth}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cx("ms-calendar", className)}
      >
        <div className="ms-calendar__header">
          <Button slot="previous" className="ms-calendar__nav">
            <ChevronLeft size={16} strokeWidth={2} aria-hidden />
          </Button>
          <Heading className="ms-calendar__month" />
          <Button slot="next" className="ms-calendar__nav">
            <ChevronRight size={16} strokeWidth={2} aria-hidden />
          </Button>
        </div>
        <Grid className="ms-calendar__grid" weekdayStyle="short">
          <Header className="ms-calendar__weekdays">
            {(day) => <HeaderCell className="ms-calendar__weekday">{day}</HeaderCell>}
          </Header>
          <Body className="ms-calendar__body">
            {(date) => <Cell date={date} className="ms-calendar__cell" />}
          </Body>
        </Grid>
      </AriaCalendar>
    </CalendarLocale>
  );
});
