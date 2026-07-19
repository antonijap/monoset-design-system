import * as react from 'react';
import { AriaAttributes } from 'react';

interface MultiComboboxOption {
    value: string;
    label: string;
    /** Text announced by the combobox and used to disambiguate duplicate labels. */
    textValue?: string;
    description?: string;
    disabled?: boolean;
    /** Extra terms used by search but not displayed. */
    keywords?: string[];
}
interface MultiComboboxProps {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    options: MultiComboboxOption[];
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    inputValue?: string;
    defaultInputValue?: string;
    onInputValueChange?: (value: string) => void;
    placeholder?: string;
    emptyMessage?: string;
    filter?: (query: string, option: MultiComboboxOption) => boolean;
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
declare const MultiCombobox: react.ForwardRefExoticComponent<MultiComboboxProps & react.RefAttributes<HTMLDivElement>>;

export { MultiCombobox, type MultiComboboxOption, type MultiComboboxProps };
