import {
  Calendar
} from "./chunk-4UZB6WGH.js";
import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/DatePicker.tsx
import {
  forwardRef
} from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Button,
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  Dialog,
  Group,
  I18nProvider,
  Popover
} from "react-aria-components";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function DatePickerLocale({ locale, children }) {
  return locale ? /* @__PURE__ */ jsx(I18nProvider, { locale, children }) : children;
}
var DatePicker = forwardRef(function DatePicker2({
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
}, ref) {
  const portalContainer = useMonosetPortalContainer();
  const label = ariaLabel ?? (ariaLabelledBy ? void 0 : "Date");
  const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
  const isRequired = required || ariaRequired === true || ariaRequired === "true";
  return /* @__PURE__ */ jsx(DatePickerLocale, { locale, children: /* @__PURE__ */ jsx(
    AriaDatePicker,
    {
      ...dataProps,
      ref,
      value,
      defaultValue,
      onChange: onValueChange,
      minValue: min,
      maxValue: max,
      isDateUnavailable: isDateUnavailable ? (date) => isDateUnavailable(date) : void 0,
      isOpen: open,
      defaultOpen,
      onOpenChange,
      isDisabled: disabled,
      isReadOnly: readOnly,
      isRequired,
      isInvalid,
      granularity: "day",
      name,
      form,
      autoComplete,
      "aria-label": label,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      className: cx("ms-datepicker", className),
      children: ({ state }) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          Group,
          {
            id,
            title,
            "aria-live": ariaLive,
            "aria-describedby": ariaDescribedBy,
            "aria-invalid": isInvalid || void 0,
            "aria-required": isRequired || void 0,
            className: cx("ms-datepicker__trigger", triggerClassName),
            children: [
              /* @__PURE__ */ jsx(DateInput, { className: "ms-datepicker__input", "aria-label": label, children: (segment) => /* @__PURE__ */ jsx(DateSegment, { segment, className: "ms-datepicker__segment" }) }),
              /* @__PURE__ */ jsx(Button, { className: "ms-datepicker__button", children: /* @__PURE__ */ jsx(CalendarIcon, { size: 15, strokeWidth: 2, "aria-hidden": true }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Popover,
          {
            UNSTABLE_portalContainer: portalContainer ?? void 0,
            placement: "bottom start",
            offset: 6,
            className: "ms-datepicker__panel",
            children: /* @__PURE__ */ jsxs(Dialog, { className: "ms-datepicker__dialog", children: [
              /* @__PURE__ */ jsx(
                Calendar,
                {
                  locale,
                  firstDayOfWeek,
                  weeksInMonth
                }
              ),
              clearable && state.value && /* @__PURE__ */ jsx("div", { className: "ms-datepicker__footer", children: /* @__PURE__ */ jsx(
                Button,
                {
                  className: "ms-datepicker__clear",
                  onPress: () => {
                    state.setValue(null);
                    state.setOpen(false);
                  },
                  children: clearLabel
                }
              ) })
            ] })
          }
        )
      ] })
    }
  ) });
});

export {
  DatePicker
};
//# sourceMappingURL=chunk-ZTL2Y5CJ.js.map