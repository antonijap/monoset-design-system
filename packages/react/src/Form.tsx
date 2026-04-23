import {
  useState,
  useCallback,
  useRef,
  type FormEvent,
  type ReactNode,
  type FormHTMLAttributes,
  type ChangeEvent,
} from "react";
import { cx } from "./cx";

export type ValidationRule<T = string> = (value: T) => string | undefined;

export interface FieldState {
  value: string;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

export interface UseFormOptions {
  initialValues: Record<string, string>;
  validate?: Record<string, ValidationRule>;
  onSubmit: (values: Record<string, string>) => void | Promise<void>;
}

export interface UseFormReturn {
  field: (name: string) => {
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: () => void;
  };
  fieldState: (name: string) => FieldState;
  error: (name: string) => string | undefined;
  handleSubmit: (e?: FormEvent) => void;
  reset: () => void;
  isDirty: boolean;
  isSubmitting: boolean;
  setValue: (name: string, value: string) => void;
  setError: (name: string, error: string) => void;
}

export function useMonosetForm(options: UseFormOptions): UseFormReturn {
  const { initialValues, validate, onSubmit } = options;
  const [values, setValues] = useState<Record<string, string>>({ ...initialValues });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const touched = useRef<Set<string>>(new Set());
  const dirty = useRef<Set<string>>(new Set());

  const validateField = useCallback(
    (name: string, value: string): string | undefined => {
      const rule = validate?.[name];
      return rule ? rule(value) : undefined;
    },
    [validate],
  );

  const field = useCallback(
    (name: string) => ({
      name,
      value: values[name] ?? "",
      onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const next = e.target.value;
        dirty.current.add(name);
        setValues((prev) => ({ ...prev, [name]: next }));
        if (touched.current.has(name)) {
          setErrors((prev) => ({ ...prev, [name]: validateField(name, next) }));
        }
      },
      onBlur() {
        touched.current.add(name);
        setErrors((prev) => ({ ...prev, [name]: validateField(name, values[name] ?? "") }));
      },
    }),
    [values, validateField],
  );

  const fieldState = useCallback(
    (name: string): FieldState => ({
      value: values[name] ?? "",
      error: errors[name],
      touched: touched.current.has(name),
      dirty: dirty.current.has(name),
    }),
    [values, errors],
  );

  const error = useCallback(
    (name: string) => (touched.current.has(name) ? errors[name] : undefined),
    [errors],
  );

  const handleSubmit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault();
      const nextErrors: Record<string, string | undefined> = {};
      let hasError = false;
      for (const name of Object.keys(values)) {
        touched.current.add(name);
        const msg = validateField(name, values[name] ?? "");
        nextErrors[name] = msg;
        if (msg) hasError = true;
      }
      setErrors(nextErrors);
      if (hasError) return;

      setIsSubmitting(true);
      const result = onSubmit(values);
      if (result && typeof result.then === "function") {
        result.finally(() => setIsSubmitting(false));
      } else {
        setIsSubmitting(false);
      }
    },
    [values, validateField, onSubmit],
  );

  const reset = useCallback(() => {
    setValues({ ...initialValues });
    setErrors({});
    touched.current.clear();
    dirty.current.clear();
  }, [initialValues]);

  const setValue = useCallback((name: string, value: string) => {
    dirty.current.add(name);
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setErrorManual = useCallback((name: string, msg: string) => {
    setErrors((prev) => ({ ...prev, [name]: msg }));
  }, []);

  return {
    field,
    fieldState,
    error,
    handleSubmit,
    reset,
    isDirty: dirty.current.size > 0,
    isSubmitting,
    setValue,
    setError: setErrorManual,
  };
}

/* ── Form wrapper ─────────────────────────────────────── */

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit: (e: FormEvent) => void;
}

export function Form({ children, onSubmit, className, ...rest }: FormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className={cx("ms-form", className)}
      noValidate
      {...rest}
    >
      {children}
    </form>
  );
}
