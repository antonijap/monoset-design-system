import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Left-slot icon (rendered before children). */
    leadingIcon?: ReactNode;
    /** Right-slot icon. */
    trailingIcon?: ReactNode;
    /** Renders a spinner and sets `aria-busy`. */
    loading?: boolean;
}
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

export { Button, type ButtonProps, type ButtonSize, type ButtonVariant };
