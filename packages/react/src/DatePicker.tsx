import {
  forwardRef,
  type AriaAttributes,
  type ReactNode,
} from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { CalendarDate } from "@internationalized/date";
import {
  Button,
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  Dialog,
  Group,
  I18nProvider,
  Popover,
} from "react-aria-components";
import { Calendar, type FirstDayOfWeek } from "./Calendar";
import { useMonosetPortalContainer } from "./PortalContext";
import { cx } from "./cx";

export interface DatePickerProps {
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

function DatePickerLocale({ locale, children }: { locale?: string; children: ReactNode }) {
  return locale ? <I18nProvider locale={locale}>{children}</I18nProvider> : children;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    value,
    defaultValue,
    onValueChange,
    min,
    max,
    isDateUnavailable,
    open,
    defaultOpen,
    onOpenChange,
    disabled,
    readOnly,
    required,
    invalid,
    name,
    form,
    autoComplete,
    locale,
    firstDayOfWeek,
    weeksInMonth = 6,
    clearable = true,
    clearLabel = "Clear date",
    className,
    triggerClassName,
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
    "aria-live": ariaLive,
    title,
    ...dataProps
  },
  ref,
) {
  const portalContainer = useMonosetPortalContainer();
  const label = ariaLabel ?? (ariaLabelledBy ? undefined : "Date");
  const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
  const isRequired = required || ariaRequired === true || ariaRequired === "true";
  return (
    <DatePickerLocale locale={locale}>
      <AriaDatePicker<CalendarDate>
        {...dataProps}
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onChange={onValueChange}
        minValue={min}
        maxValue={max}
        isDateUnavailable={
          isDateUnavailable ? (date) => isDateUnavailable(date as CalendarDate) : undefined
        }
        isOpen={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        isDisabled={disabled}
        isReadOnly={readOnly}
        isRequired={isRequired}
        isInvalid={isInvalid}
        granularity="day"
        name={name}
        form={form}
        autoComplete={autoComplete}
        aria-label={label}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        className={cx("ms-datepicker", className)}
      >
        {({ state }) => (
          <>
            <Group
              id={id}
              title={title}
              aria-live={ariaLive}
              aria-describedby={ariaDescribedBy}
              aria-invalid={isInvalid || undefined}
              aria-required={isRequired || undefined}
              className={cx("ms-datepicker__trigger", triggerClassName)}
            >
              <DateInput className="ms-datepicker__input" aria-label={label}>
                {(segment) => (
                  <DateSegment segment={segment} className="ms-datepicker__segment" />
                )}
              </DateInput>
              <Button className="ms-datepicker__button">
                <CalendarIcon size={15} strokeWidth={2} aria-hidden />
              </Button>
            </Group>
            <Popover
              UNSTABLE_portalContainer={portalContainer ?? undefined}
              placement="bottom start"
              offset={6}
              className="ms-datepicker__panel"
            >
              <Dialog className="ms-datepicker__dialog">
                <Calendar
                  locale={locale}
                  firstDayOfWeek={firstDayOfWeek}
                  weeksInMonth={weeksInMonth}
                />
                {clearable && state.value && (
                  <div className="ms-datepicker__footer">
                    <Button
                      className="ms-datepicker__clear"
                      onPress={() => {
                        state.setValue(null);
                        state.setOpen(false);
                      }}
                    >
                      {clearLabel}
                    </Button>
                  </div>
                )}
              </Dialog>
            </Popover>
          </>
        )}
      </AriaDatePicker>
    </DatePickerLocale>
  );
});
