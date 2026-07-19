import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Calendar.tsx
import { forwardRef } from "react";
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
  I18nProvider
} from "react-aria-components";
import { jsx, jsxs } from "react/jsx-runtime";
function calendarDateFromNativeDate(date) {
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}
function calendarDateToNativeDate(date, timeZone = getLocalTimeZone()) {
  return date.toDate(timeZone);
}
function CalendarLocale({ locale, children }) {
  return locale ? /* @__PURE__ */ jsx(I18nProvider, { locale, children }) : children;
}
var Calendar = forwardRef(function Calendar2({
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
}, ref) {
  return /* @__PURE__ */ jsx(CalendarLocale, { locale, children: /* @__PURE__ */ jsxs(
    AriaCalendar,
    {
      ...dataProps,
      ref,
      id,
      value,
      defaultValue,
      onChange: onValueChange,
      focusedValue,
      defaultFocusedValue,
      onFocusChange,
      minValue: min,
      maxValue: max,
      isDateUnavailable: isDateUnavailable ? (date) => isDateUnavailable(date) : void 0,
      isDisabled: disabled,
      isReadOnly: readOnly,
      "data-readonly": readOnly || void 0,
      isInvalid: invalid,
      autoFocus,
      firstDayOfWeek,
      weeksInMonth,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      className: cx("ms-calendar", className),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "ms-calendar__header", children: [
          /* @__PURE__ */ jsx(Button, { slot: "previous", className: "ms-calendar__nav", children: /* @__PURE__ */ jsx(ChevronLeft, { size: 16, strokeWidth: 2, "aria-hidden": true }) }),
          /* @__PURE__ */ jsx(Heading, { className: "ms-calendar__month" }),
          /* @__PURE__ */ jsx(Button, { slot: "next", className: "ms-calendar__nav", children: /* @__PURE__ */ jsx(ChevronRight, { size: 16, strokeWidth: 2, "aria-hidden": true }) })
        ] }),
        /* @__PURE__ */ jsxs(Grid, { className: "ms-calendar__grid", weekdayStyle: "short", children: [
          /* @__PURE__ */ jsx(Header, { className: "ms-calendar__weekdays", children: (day) => /* @__PURE__ */ jsx(HeaderCell, { className: "ms-calendar__weekday", children: day }) }),
          /* @__PURE__ */ jsx(Body, { className: "ms-calendar__body", children: (date) => /* @__PURE__ */ jsx(Cell, { date, className: "ms-calendar__cell" }) })
        ] })
      ]
    }
  ) });
});

export {
  calendarDateFromNativeDate,
  calendarDateToNativeDate,
  Calendar
};
//# sourceMappingURL=chunk-4UZB6WGH.js.map