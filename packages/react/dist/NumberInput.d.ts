import * as react from 'react';
import { AriaAttributes, FocusEventHandler } from 'react';

interface NumberInputProps {
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
declare const NumberInput: react.ForwardRefExoticComponent<NumberInputProps & react.RefAttributes<HTMLInputElement>>;

export { NumberInput, type NumberInputProps };
