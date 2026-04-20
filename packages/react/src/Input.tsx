import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cx } from "./cx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, className, ...rest }, ref
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cx("ms-input", className)}
      {...rest}
    />
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, rows = 4, ...rest }, ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cx("ms-input", className)}
      {...rest}
    />
  );
});

export interface FieldProps {
  label: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  /** The control — Input, Textarea, or any element that accepts `id`. */
  children: (bag: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
  /** Override the generated id. */
  id?: string;
  className?: string;
}

/**
 * Field is a render-prop wrapper that associates a label, an optional
 * help/error message, and a form control — wiring `htmlFor`, `id`, and
 * `aria-describedby` automatically.
 */
export function Field({ label, help, error, children, id: idProp, className }: FieldProps) {
  const reactId = useId();
  const id = idProp ?? `ms-field-${reactId}`;
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  return (
    <div className={cx("ms-field", className)}>
      <label className="ms-field__label" htmlFor={id}>{label}</label>
      {children({ id, describedBy, invalid })}
      {help && !error && <span id={helpId} className="ms-field__help">{help}</span>}
      {error && <span id={errorId} role="alert" className="ms-field__error">{error}</span>}
    </div>
  );
}
