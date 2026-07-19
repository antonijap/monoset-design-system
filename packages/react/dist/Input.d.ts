import * as react from 'react';
import { HTMLAttributes, ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    invalid?: boolean;
}
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    invalid?: boolean;
}
declare const Textarea: react.ForwardRefExoticComponent<TextareaProps & react.RefAttributes<HTMLTextAreaElement>>;
interface FieldControlRenderProps {
    id: string;
    "aria-labelledby": string;
    "aria-describedby"?: string;
    "aria-invalid"?: true;
    required?: true;
}
interface FieldControlProps {
    children: (props: FieldControlRenderProps) => ReactNode;
}
declare function FieldControl({ children }: FieldControlProps): ReactNode;
interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "id"> {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    label: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
    children: ReactNode;
    /** The associated control id. */
    id?: string;
    /** The wrapper element id. */
    rootId?: string;
    required?: boolean;
    invalid?: boolean;
}
declare const Field: react.ForwardRefExoticComponent<FieldProps & react.RefAttributes<HTMLDivElement>> & {
    Control: typeof FieldControl;
};

export { Field, type FieldControlProps, type FieldControlRenderProps, type FieldProps, Input, type InputProps, Textarea, type TextareaProps };
