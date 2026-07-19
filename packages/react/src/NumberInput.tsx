import {
  forwardRef,
  type AriaAttributes,
  type FocusEventHandler,
} from "react";
import { Minus, Plus } from "lucide-react";
import {
  Button as AriaButton,
  I18nProvider,
  Input as AriaInput,
  NumberField,
} from "react-aria-components";
import { cx } from "./cx";

export interface NumberInputProps {
  [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  formatOptions?: Intl.NumberFormatOptions;
  /** Hide the increment and decrement buttons. Default: false. */
  hideStepper?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  /** Locale used to parse and format the editable value. */
  locale?: string;
  /** Class applied to the NumberInput wrapper. */
  className?: string;
  /** Class applied to the editable input. */
  inputClassName?: string;
  name?: string;
  form?: string;
  autoComplete?: string;
  id?: string;
  title?: string;
  "aria-label"?: AriaAttributes["aria-label"];
  "aria-labelledby"?: AriaAttributes["aria-labelledby"];
  "aria-describedby"?: AriaAttributes["aria-describedby"];
  "aria-errormessage"?: AriaAttributes["aria-errormessage"];
  "aria-invalid"?: AriaAttributes["aria-invalid"];
  "aria-required"?: AriaAttributes["aria-required"];
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
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
    },
    ref,
  ) {
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
    const isRequired = required || ariaRequired === true || ariaRequired === "true";
    const effectiveAriaInvalid = isInvalid ? true : ariaInvalid;
    const effectiveAriaRequired = isRequired ? true : ariaRequired;
    const numberField = (
      <NumberField
        {...dataAttributes}
        id={id}
        name={name}
        form={form}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-errormessage={ariaErrorMessage}
        aria-invalid={effectiveAriaInvalid}
        aria-required={effectiveAriaRequired}
        value={value === null ? Number.NaN : value}
        defaultValue={defaultValue === null ? Number.NaN : defaultValue}
        onChange={(nextValue) => {
          onValueChange?.(Number.isNaN(nextValue) ? null : nextValue);
        }}
        minValue={min}
        maxValue={max}
        step={step}
        formatOptions={formatOptions}
        isDisabled={disabled}
        isReadOnly={readOnly}
        isRequired={isRequired}
        isInvalid={isInvalid}
        className={({ isDisabled }) =>
          cx(
            "ms-numberinput",
            isDisabled && "ms-numberinput--disabled",
            className,
          )
        }
        render={(rootProps) => <div {...rootProps} title={title} />}
      >
        {!hideStepper && (
          <AriaButton slot="decrement" className="ms-numberinput__btn">
            <Minus size={16} strokeWidth={2} aria-hidden />
          </AriaButton>
        )}
        <AriaInput
          ref={ref}
          autoComplete={autoComplete}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-errormessage={ariaErrorMessage}
          aria-invalid={effectiveAriaInvalid}
          aria-required={effectiveAriaRequired}
          onFocus={onFocus}
          onBlur={onBlur}
          className={cx("ms-numberinput__input", inputClassName)}
        />
        {!hideStepper && (
          <AriaButton slot="increment" className="ms-numberinput__btn">
            <Plus size={16} strokeWidth={2} aria-hidden />
          </AriaButton>
        )}
      </NumberField>
    );

    return locale
      ? <I18nProvider locale={locale}>{numberField}</I18nProvider>
      : numberField;
  },
);
