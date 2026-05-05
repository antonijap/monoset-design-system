import { forwardRef, useCallback } from "react";
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
  function NumberInput({ value, defaultValue, onValueChange, min = -Infinity, max = Infinity, step = 1, hideStepper, className, disabled, ...rest }, ref) {
    const isControlled = value !== undefined;
    const current = isControlled ? value : defaultValue;

    const clamp = useCallback((n: number) => Math.max(min, Math.min(max, n)), [min, max]);

    const change = (next: number) => {
      const c = clamp(next);
      onValueChange?.(c);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === "" || raw === "-") return;
      const n = Number(raw);
      if (Number.isFinite(n)) change(n);
    };

    return (
      <div className={cx("ms-numberinput", disabled && "ms-numberinput--disabled", className)}>
        {!hideStepper && (
          <button
            type="button"
            aria-label="Decrement"
            disabled={disabled || (current !== undefined && current <= min)}
            onClick={() => change((current ?? 0) - step)}
            className="ms-numberinput__btn"
          >
            −
          </button>
        )}
        <Input
          ref={ref}
          type="number"
          inputMode="numeric"
          value={current === undefined ? "" : String(current)}
          onChange={onChange}
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
            aria-label="Increment"
            disabled={disabled || (current !== undefined && current >= max)}
            onClick={() => change((current ?? 0) + step)}
            className="ms-numberinput__btn"
          >
            +
          </button>
        )}
      </div>
    );
  },
);
