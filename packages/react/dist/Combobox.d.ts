import * as react from 'react';
import { AriaAttributes } from 'react';

interface ComboboxOption {
    value: string;
    label: string;
    /**
     * Unique text used for filtering, announcements, and the selected input value.
     * Required when two options share the same visible label.
     */
    textValue?: string;
    description?: string;
    disabled?: boolean;
    /** Extra terms used by search but not displayed. */
    keywords?: string[];
}
interface ComboboxProps {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    options: ComboboxOption[];
    value?: string | null;
    defaultValue?: string | null;
    onValueChange?: (value: string | null) => void;
    inputValue?: string;
    defaultInputValue?: string;
    onInputValueChange?: (value: string) => void;
    placeholder?: string;
    emptyMessage?: string;
    filter?: (query: string, option: ComboboxOption) => boolean;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    name?: string;
    form?: string;
    autoComplete?: string;
    id?: string;
    title?: string;
    className?: string;
    inputClassName?: string;
    popoverClassName?: string;
    "aria-label"?: AriaAttributes["aria-label"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-errormessage"?: AriaAttributes["aria-errormessage"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-required"?: AriaAttributes["aria-required"];
}
declare const Combobox: react.ForwardRefExoticComponent<ComboboxProps & react.RefAttributes<HTMLDivElement>>;

export { Combobox, type ComboboxOption, type ComboboxProps };
