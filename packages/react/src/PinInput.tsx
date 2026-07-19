import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AriaAttributes,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { cx } from "./cx";

export interface PinInputProps {
  [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
  /** Number of cells. Default: 6. */
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Fired once when an edit changes an incomplete code into a complete one. */
  onComplete?: (value: string) => void;
  /** Mask all cells like a password. */
  mask?: boolean;
  /** Restrict each character to a regex. Default: digits only. */
  pattern?: RegExp;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  autoFocus?: boolean;
  name?: string;
  form?: string;
  id?: string;
  title?: string;
  className?: string;
  "aria-label"?: AriaAttributes["aria-label"];
  "aria-labelledby"?: AriaAttributes["aria-labelledby"];
  "aria-describedby"?: AriaAttributes["aria-describedby"];
  "aria-errormessage"?: AriaAttributes["aria-errormessage"];
  "aria-invalid"?: AriaAttributes["aria-invalid"];
  "aria-required"?: AriaAttributes["aria-required"];
}

const DIGIT_RE = /^[0-9]$/;
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function acceptsCharacter(pattern: RegExp, character: string) {
  pattern.lastIndex = 0;
  return pattern.test(character);
}

function slotsFromValue(value: string, length: number, pattern: RegExp) {
  const accepted = Array.from(value).filter((character) =>
    acceptsCharacter(pattern, character),
  );
  return Array.from({ length }, (_, index) => accepted[index] ?? "");
}

function flattenSlots(slots: string[]) {
  return slots.join("");
}

function isComplete(slots: string[]) {
  return slots.every(Boolean);
}

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(function PinInput(
  {
    length = 6,
    value,
    defaultValue = "",
    onValueChange,
    onComplete,
    mask = false,
    pattern = DIGIT_RE,
    disabled = false,
    readOnly = false,
    required = false,
    invalid = false,
    autoFocus = false,
    name,
    form,
    id,
    title,
    className,
    "aria-label": ariaLabelProp,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-errormessage": ariaErrorMessage,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
    ...dataAttributes
  },
  forwardedRef,
) {
  if (!Number.isFinite(length) || !Number.isInteger(length) || length <= 0) {
    throw new Error("PinInput length must be a positive finite integer.");
  }

  const isControlled = value !== undefined;
  const ariaLabel = ariaLabelProp ?? (ariaLabelledBy ? undefined : "One-time code");
  const patternKey = `${pattern.source}/${pattern.flags}`;
  const initialValue = isControlled ? value : defaultValue;
  const [slots, setSlots] = useState(() =>
    slotsFromValue(initialValue, length, pattern),
  );
  const cells = useRef<(HTMLInputElement | null)[]>([]);
  const root = useRef<HTMLDivElement | null>(null);
  const lastControlledValue = useRef(value);
  const lastLength = useRef(length);
  const lastPatternKey = useRef(patternKey);
  const pendingControlledEcho = useRef<{
    value: string;
    slots: string[];
  } | null>(null);
  const wasComplete = useRef(isComplete(slots));

  const effectiveInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
  const effectiveRequired = required || ariaRequired === true || ariaRequired === "true";
  const flattenedValue = flattenSlots(slots);

  useIsomorphicLayoutEffect(() => {
    const lengthChanged = lastLength.current !== length;
    const patternChanged = lastPatternKey.current !== patternKey;
    const controlledValueChanged = isControlled && lastControlledValue.current !== value;

    if (controlledValueChanged || lengthChanged || patternChanged) {
      const pendingEcho = pendingControlledEcho.current;
      const sanitizedValue = flattenSlots(slotsFromValue(value ?? flattenedValue, length, pattern));
      const nextSlots =
        controlledValueChanged &&
        !patternChanged &&
        pendingEcho?.value === sanitizedValue &&
        pendingEcho.slots.length === length
          ? pendingEcho.slots
          : slotsFromValue(value ?? flattenedValue, length, pattern);

      pendingControlledEcho.current = null;
      setSlots(nextSlots);
      wasComplete.current = isComplete(nextSlots);
    }

    lastControlledValue.current = value;
    lastLength.current = length;
    lastPatternKey.current = patternKey;
  }, [flattenedValue, isControlled, length, pattern, patternKey, value]);

  useEffect(() => {
    if (autoFocus && !disabled) cells.current[0]?.focus();
  }, [autoFocus, disabled]);

  useEffect(() => {
    if (isControlled) return;

    const owner = form
      ? document.getElementById(form)
      : root.current?.closest("form");
    if (!(owner instanceof HTMLFormElement)) return;

    const handleReset = () => {
      const resetSlots = slotsFromValue(defaultValue, length, pattern);
      pendingControlledEcho.current = null;
      setSlots(resetSlots);
      wasComplete.current = isComplete(resetSlots);
    };

    owner.addEventListener("reset", handleReset);
    return () => owner.removeEventListener("reset", handleReset);
  }, [defaultValue, form, isControlled, length, pattern]);

  const commit = (nextSlots: string[]) => {
    const nextValue = flattenSlots(nextSlots);
    const complete = isComplete(nextSlots);

    pendingControlledEcho.current = isControlled
      ? { value: nextValue, slots: nextSlots }
      : null;
    setSlots(nextSlots);
    onValueChange?.(nextValue);

    if (complete && !wasComplete.current) onComplete?.(nextValue);
    wasComplete.current = complete;
  };

  const handleChange = (index: number, rawValue: string) => {
    if (disabled || readOnly) return;

    if (rawValue === "") {
      const nextSlots = [...slots];
      nextSlots[index] = "";
      commit(nextSlots);
      return;
    }

    const accepted = Array.from(rawValue).filter((character) =>
      acceptsCharacter(pattern, character),
    );
    const nextSlots = [...slots];
    if (accepted.length > 1) {
      accepted.slice(0, length - index).forEach((character, offset) => {
        nextSlots[index + offset] = character;
      });
    } else {
      const character = accepted[0];
      if (!character) return;
      nextSlots[index] = character;
    }
    commit(nextSlots);
    const nextCell = Math.min(index + accepted.length, length - 1);
    cells.current[nextCell]?.focus();
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !slots[index] && index > 0) {
      event.preventDefault();
      cells.current[index - 1]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      cells.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      cells.current[index + 1]?.focus();
    }
  };

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;

    const clipboardValue = event.clipboardData.getData("text");
    if (!clipboardValue) return;
    event.preventDefault();

    const accepted = Array.from(clipboardValue)
      .filter((character) => acceptsCharacter(pattern, character))
      .slice(0, length - index);
    if (accepted.length === 0) return;

    const nextSlots = [...slots];
    accepted.forEach((character, offset) => {
      nextSlots[index + offset] = character;
    });
    commit(nextSlots);

    const firstEmptyAfterPaste = nextSlots.findIndex(
      (slot, slotIndex) => slotIndex >= index + accepted.length && !slot,
    );
    const nextFocus = firstEmptyAfterPaste === -1 ? length - 1 : firstEmptyAfterPaste;
    cells.current[nextFocus]?.focus();
  };

  const setRootRef = (element: HTMLDivElement | null) => {
    root.current = element;
    if (typeof forwardedRef === "function") forwardedRef(element);
    else if (forwardedRef) forwardedRef.current = element;
  };

  return (
    <div
      {...dataAttributes}
      ref={setRootRef}
      id={id}
      title={title}
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-errormessage={ariaErrorMessage}
      aria-invalid={effectiveInvalid || undefined}
      aria-required={effectiveRequired || undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-invalid={effectiveInvalid || undefined}
      className={cx(
        "ms-pininput",
        disabled && "ms-pininput--disabled",
        readOnly && "ms-pininput--readonly",
        effectiveInvalid && "ms-pininput--invalid",
        className,
      )}
    >
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(element) => {
            cells.current[index] = element;
          }}
          type={mask ? "password" : "text"}
          inputMode={pattern === DIGIT_RE ? "numeric" : "text"}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={slots[index] ?? ""}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          disabled={disabled}
          readOnly={readOnly}
          required={effectiveRequired}
          form={form}
          aria-label={`Character ${index + 1} of ${length}`}
          aria-describedby={ariaDescribedBy}
          aria-errormessage={ariaErrorMessage}
          aria-invalid={effectiveInvalid || undefined}
          className="ms-pininput__cell"
        />
      ))}
      {name && (
        <input
          type="hidden"
          name={name}
          form={form}
          value={flattenedValue}
          disabled={disabled}
        />
      )}
    </div>
  );
});
