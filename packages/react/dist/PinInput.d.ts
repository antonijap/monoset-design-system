import * as react from 'react';
import { AriaAttributes } from 'react';

interface PinInputProps {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    /** Number of cells. Default: 6. */
    length?: number;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** Fired once when an edit changes an incomplete code into a complete one. */
    onComplete?: (value: string) => void;
    /** Mask all cells like a password. */
    mask?: boolean;
    /** Restrict each character to a regex. Default: digits only. */
    pattern?: RegExp;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    autoFocus?: boolean;
    name?: string;
    form?: string;
    id?: string;
    title?: string;
    className?: string;
    "aria-label"?: AriaAttributes["aria-label"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-errormessage"?: AriaAttributes["aria-errormessage"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-required"?: AriaAttributes["aria-required"];
}
declare const PinInput: react.ForwardRefExoticComponent<PinInputProps & react.RefAttributes<HTMLDivElement>>;

export { PinInput, type PinInputProps };
