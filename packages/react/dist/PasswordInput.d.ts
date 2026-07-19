import * as react from 'react';
import { InputProps } from './Input.js';

interface PasswordInputProps extends Omit<InputProps, "type"> {
    /** Show the toggle button. Default: true. */
    showToggle?: boolean;
    /** Override the visible-state text on the toggle button. */
    showLabel?: string;
    hideLabel?: string;
    /** Class name applied to the wrapper when the toggle is visible. */
    wrapperClassName?: string;
}
declare const PasswordInput: react.ForwardRefExoticComponent<PasswordInputProps & react.RefAttributes<HTMLInputElement>>;

export { PasswordInput, type PasswordInputProps };
