import { forwardRef, useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { cx } from "./cx";

export interface PinInputProps {
  /** Number of cells. Default: 6. */
  length?: number;
  /** Controlled value (must equal `length` when provided in full). */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Fired when the user fills the last cell. */
  onComplete?: (value: string) => void;
  /** Mask all cells like a password. */
  mask?: boolean;
  /** Restrict to a regex. Default: digits only. */
  pattern?: RegExp;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  "aria-label"?: string;
}

const DIGIT_RE = /^[0-9]$/;

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(function PinInput(
  {
    length = 6,
    value,
    defaultValue = "",
    onValueChange,
    onComplete,
    mask,
    pattern = DIGIT_RE,
    disabled,
    autoFocus,
    className,
    "aria-label": ariaLabel = "One-time code",
  },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue.slice(0, length));
  const current = (isControlled ? value : internal).padEnd(length, "").slice(0, length);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus) inputs.current[0]?.focus();
  }, [autoFocus]);

  const set = (next: string) => {
    const trimmed = next.replace(/\s+/g, "");
    if (!isControlled) setInternal(trimmed);
    onValueChange?.(trimmed);
    if (trimmed.length === length) onComplete?.(trimmed);
  };

  const onChange = (i: number, raw: string) => {
    if (disabled) return;
    const ch = raw.slice(-1);
    if (ch && !pattern.test(ch)) return;
    const arr = current.split("");
    arr[i] = ch;
    const joined = arr.join("").trimEnd();
    set(joined);
    if (ch && i < length - 1) inputs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !current[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      inputs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      e.preventDefault();
      inputs.current[i + 1]?.focus();
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\s+/g, "").slice(0, length);
    if (!text) return;
    e.preventDefault();
    if ([...text].every((c) => pattern.test(c))) {
      set(text);
      const focusIdx = Math.min(text.length, length - 1);
      inputs.current[focusIdx]?.focus();
    }
  };

  return (
    <div ref={ref} role="group" aria-label={ariaLabel} className={cx("ms-pininput", className)}>
      {Array.from({ length }, (_, i) => {
        const v = current[i] || "";
        return (
          <input
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            type={mask ? "password" : "text"}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={v}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKey(i, e)}
            onPaste={onPaste}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${length}`}
            className="ms-pininput__cell"
          />
        );
      })}
    </div>
  );
});
