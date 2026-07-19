import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/NumberInput.tsx
import {
  forwardRef
} from "react";
import { Minus, Plus } from "lucide-react";
import {
  Button as AriaButton,
  I18nProvider,
  Input as AriaInput,
  NumberField
} from "react-aria-components";
import { jsx, jsxs } from "react/jsx-runtime";
var NumberInput = forwardRef(
  function NumberInput2({
    value,
    defaultValue,
    onValueChange,
    min,
    max,
    step,
    formatOptions,
    hideStepper = false,
    disabled = false,
    readOnly = false,
    required = false,
    invalid = false,
    locale,
    className,
    inputClassName,
    name,
    form,
    id,
    title,
    autoComplete,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-errormessage": ariaErrorMessage,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
    onFocus,
    onBlur,
    ...dataAttributes
  }, ref) {
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
    const isRequired = required || ariaRequired === true || ariaRequired === "true";
    const effectiveAriaInvalid = isInvalid ? true : ariaInvalid;
    const effectiveAriaRequired = isRequired ? true : ariaRequired;
    const numberField = /* @__PURE__ */ jsxs(
      NumberField,
      {
        ...dataAttributes,
        id,
        name,
        form,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        "aria-errormessage": ariaErrorMessage,
        "aria-invalid": effectiveAriaInvalid,
        "aria-required": effectiveAriaRequired,
        value: value === null ? Number.NaN : value,
        defaultValue: defaultValue === null ? Number.NaN : defaultValue,
        onChange: (nextValue) => {
          onValueChange?.(Number.isNaN(nextValue) ? null : nextValue);
        },
        minValue: min,
        maxValue: max,
        step,
        formatOptions,
        isDisabled: disabled,
        isReadOnly: readOnly,
        isRequired,
        isInvalid,
        className: ({ isDisabled }) => cx(
          "ms-numberinput",
          isDisabled && "ms-numberinput--disabled",
          className
        ),
        render: (rootProps) => /* @__PURE__ */ jsx("div", { ...rootProps, title }),
        children: [
          !hideStepper && /* @__PURE__ */ jsx(AriaButton, { slot: "decrement", className: "ms-numberinput__btn", children: /* @__PURE__ */ jsx(Minus, { size: 16, strokeWidth: 2, "aria-hidden": true }) }),
          /* @__PURE__ */ jsx(
            AriaInput,
            {
              ref,
              autoComplete,
              "aria-label": ariaLabel,
              "aria-labelledby": ariaLabelledBy,
              "aria-describedby": ariaDescribedBy,
              "aria-errormessage": ariaErrorMessage,
              "aria-invalid": effectiveAriaInvalid,
              "aria-required": effectiveAriaRequired,
              onFocus,
              onBlur,
              className: cx("ms-numberinput__input", inputClassName)
            }
          ),
          !hideStepper && /* @__PURE__ */ jsx(AriaButton, { slot: "increment", className: "ms-numberinput__btn", children: /* @__PURE__ */ jsx(Plus, { size: 16, strokeWidth: 2, "aria-hidden": true }) })
        ]
      }
    );
    return locale ? /* @__PURE__ */ jsx(I18nProvider, { locale, children: numberField }) : numberField;
  }
);

export {
  NumberInput
};
//# sourceMappingURL=chunk-JIKQOSBI.js.map