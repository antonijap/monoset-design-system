import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cx } from "./cx";

interface FieldContextValue {
  id: string;
  labelId: string;
  describedBy?: string;
  invalid: boolean;
  required: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

function mergeTokens(...values: Array<string | undefined>): string | undefined {
  const tokens = values.flatMap((value) => value?.split(/\s+/).filter(Boolean) ?? []);
  return tokens.length > 0 ? [...new Set(tokens)].join(" ") : undefined;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    invalid,
    className,
    id,
    required,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    ...rest
  },
  ref,
) {
  const field = useContext(FieldContext);
  return (
    <input
      {...rest}
      ref={ref}
      id={field?.id ?? id}
      required={field?.required || required}
      aria-describedby={mergeTokens(ariaDescribedBy, field?.describedBy)}
      aria-invalid={field?.invalid ? true : invalid ? true : ariaInvalid}
      className={cx("ms-input", className)}
    />
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    invalid,
    className,
    rows = 4,
    id,
    required,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    ...rest
  },
  ref,
) {
  const field = useContext(FieldContext);
  return (
    <textarea
      {...rest}
      ref={ref}
      rows={rows}
      id={field?.id ?? id}
      required={field?.required || required}
      aria-describedby={mergeTokens(ariaDescribedBy, field?.describedBy)}
      aria-invalid={field?.invalid ? true : invalid ? true : ariaInvalid}
      className={cx("ms-input", className)}
    />
  );
});

export interface FieldControlRenderProps {
  id: string;
  "aria-labelledby": string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  required?: true;
}

export interface FieldControlProps {
  children: (props: FieldControlRenderProps) => ReactNode;
}

function FieldControl({ children }: FieldControlProps) {
  const field = useContext(FieldContext);
  if (!field) {
    throw new Error("Field.Control must be used within Field");
  }

  return children({
    id: field.id,
    "aria-labelledby": field.labelId,
    "aria-describedby": field.describedBy,
    "aria-invalid": field.invalid ? true : undefined,
    required: field.required ? true : undefined,
  });
}

export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "id"> {
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

/**
 * Associates a label and supporting messages with one form control.
 */
const FieldRoot = forwardRef<HTMLDivElement, FieldProps>(function Field(
  {
    label,
    description,
    error,
    children,
    id: idProp,
    rootId,
    required = false,
    invalid: invalidProp = false,
    className,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? `ms-field-${generatedId}`;
  const labelId = `${id}-label`;
  const hasDescription = description !== undefined && description !== null && description !== false;
  const hasError = error !== undefined && error !== null && error !== false;
  const descriptionId = hasDescription ? `${id}-description` : undefined;
  const errorId = hasError ? `${id}-error` : undefined;
  const describedBy = mergeTokens(descriptionId, errorId);
  const invalid = invalidProp || hasError;

  return (
    <div {...rest} ref={ref} id={rootId} className={cx("ms-field", className)}>
      <label
        id={labelId}
        className="ms-field__label"
        htmlFor={id}
        onClick={(event) => {
          const control = document.getElementById(id);
          if (control instanceof HTMLElement && !control.matches("input, textarea, select, button")) {
            event.preventDefault();
            control.querySelector<HTMLElement>("[tabindex]:not([tabindex='-1'])")?.focus();
          }
        }}
      >
        {label}
      </label>
      <FieldContext.Provider value={{ id, labelId, describedBy, invalid, required }}>
        {children}
      </FieldContext.Provider>
      {hasDescription && (
        <span id={descriptionId} className="ms-field__description">{description}</span>
      )}
      {hasError && <span id={errorId} role="alert" className="ms-field__error">{error}</span>}
    </div>
  );
});

export const Field = Object.assign(FieldRoot, { Control: FieldControl });
