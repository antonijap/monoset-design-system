import { forwardRef, useCallback, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Input, type InputProps } from "./Input";
import { cx } from "./cx";

export interface NumberInputProps extends Omit<InputProps, "type" | "value" | "onChange" | "defaultValue"> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Hide the +/- buttons. Default: false. */
  hideStepper?: boolean;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput({ value, defaultValue, onValueChange, min = -Infinity, max = Infinity, step = 1, hideStepper, className, disabled, onBlur: onBlurProp, ...rest }, ref) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<number | undefined>(defaultValue);
    const current = isControlled ? value : internal;

    const clamp = useCallback((n: number) => Math.max(min, Math.min(max, n)), [min, max]);

    // Commit a clamped value (used by the stepper buttons and on blur).
    const commit = (next: number) => {
      const c = clamp(next);
      if (!isControlled) setInternal(c);
      onValueChange?.(c);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      // Allow an empty field or a lone "-" while the user is mid-typing a
      // negative number; don't discard it.
      if (raw === "" || raw === "-") return;
      const n = Number(raw);
      // Don't clamp mid-type so values like "150" can be entered when max is
      // lower; clamping happens on blur. Emit the raw finite number as the user types.
      if (Number.isFinite(n)) {
        if (!isControlled) setInternal(n);
        onValueChange?.(n);
      }
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (current !== undefined) commit(current);
      onBlurProp?.(e);
    };

    return (
      <div className={cx("ms-numberinput", disabled && "ms-numberinput--disabled", className)}>
        {!hideStepper && (
          <button
            type="button"
            aria-label="Decrease"
            disabled={disabled || (current !== undefined && current <= min)}
            onClick={() => commit((current ?? 0) - step)}
            className="ms-numberinput__btn"
          >
            <Minus size={16} strokeWidth={2} aria-hidden />
          </button>
        )}
        <Input
          ref={ref}
          type="number"
          inputMode="numeric"
          value={current === undefined ? "" : String(current)}
          onChange={onChange}
          onBlur={onBlur}
          min={Number.isFinite(min) ? min : undefined}
          max={Number.isFinite(max) ? max : undefined}
          step={step}
          disabled={disabled}
          className="ms-numberinput__input"
          {...rest}
        />
        {!hideStepper && (
          <button
            type="button"
            aria-label="Increase"
            disabled={disabled || (current !== undefined && current >= max)}
            onClick={() => commit((current ?? 0) + step)}
            className="ms-numberinput__btn"
          >
            <Plus size={16} strokeWidth={2} aria-hidden />
          </button>
        )}
      </div>
    );
  },
);
