import * as react from 'react';
import { AriaAttributes } from 'react';
import { CalendarDate } from '@internationalized/date';
import { FirstDayOfWeek } from './Calendar.js';

interface DatePickerProps {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    value?: CalendarDate | null;
    defaultValue?: CalendarDate | null;
    onValueChange?: (value: CalendarDate | null) => void;
    min?: CalendarDate | null;
    max?: CalendarDate | null;
    isDateUnavailable?: (date: CalendarDate) => boolean;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    id?: string;
    "aria-label"?: AriaAttributes["aria-label"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-live"?: AriaAttributes["aria-live"];
    "aria-required"?: AriaAttributes["aria-required"];
    title?: string;
    name?: string;
    form?: string;
    autoComplete?: string;
    locale?: string;
    firstDayOfWeek?: FirstDayOfWeek;
    weeksInMonth?: number;
    clearable?: boolean;
    clearLabel?: string;
    className?: string;
    triggerClassName?: string;
}
declare const DatePicker: react.ForwardRefExoticComponent<DatePickerProps & react.RefAttributes<HTMLDivElement>>;

export { DatePicker, type DatePickerProps };
