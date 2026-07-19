import * as react from 'react';
import { AriaAttributes } from 'react';
import { CalendarDate } from '@internationalized/date';

type FirstDayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
interface CalendarProps {
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
declare function calendarDateFromNativeDate(date: Date): CalendarDate;
declare function calendarDateToNativeDate(date: CalendarDate, timeZone?: string): Date;
declare const Calendar: react.ForwardRefExoticComponent<CalendarProps & react.RefAttributes<HTMLDivElement>>;

export { Calendar, type CalendarProps, type FirstDayOfWeek, calendarDateFromNativeDate, calendarDateToNativeDate };
