import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/PinInput.tsx
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var DIGIT_RE = /^[0-9]$/;
var useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
function acceptsCharacter(pattern, character) {
  pattern.lastIndex = 0;
  return pattern.test(character);
}
function slotsFromValue(value, length, pattern) {
  const accepted = Array.from(value).filter(
    (character) => acceptsCharacter(pattern, character)
  );
  return Array.from({ length }, (_, index) => accepted[index] ?? "");
}
function flattenSlots(slots) {
  return slots.join("");
}
function isComplete(slots) {
  return slots.every(Boolean);
}
var PinInput = forwardRef(function PinInput2({
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
}, forwardedRef) {
  if (!Number.isFinite(length) || !Number.isInteger(length) || length <= 0) {
    throw new Error("PinInput length must be a positive finite integer.");
  }
  const isControlled = value !== void 0;
  const ariaLabel = ariaLabelProp ?? (ariaLabelledBy ? void 0 : "One-time code");
  const patternKey = `${pattern.source}/${pattern.flags}`;
  const initialValue = isControlled ? value : defaultValue;
  const [slots, setSlots] = useState(
    () => slotsFromValue(initialValue, length, pattern)
  );
  const cells = useRef([]);
  const root = useRef(null);
  const lastControlledValue = useRef(value);
  const lastLength = useRef(length);
  const lastPatternKey = useRef(patternKey);
  const pendingControlledEcho = useRef(null);
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
      const nextSlots = controlledValueChanged && !patternChanged && pendingEcho?.value === sanitizedValue && pendingEcho.slots.length === length ? pendingEcho.slots : slotsFromValue(value ?? flattenedValue, length, pattern);
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
    const owner = form ? document.getElementById(form) : root.current?.closest("form");
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
  const commit = (nextSlots) => {
    const nextValue = flattenSlots(nextSlots);
    const complete = isComplete(nextSlots);
    pendingControlledEcho.current = isControlled ? { value: nextValue, slots: nextSlots } : null;
    setSlots(nextSlots);
    onValueChange?.(nextValue);
    if (complete && !wasComplete.current) onComplete?.(nextValue);
    wasComplete.current = complete;
  };
  const handleChange = (index, rawValue) => {
    if (disabled || readOnly) return;
    if (rawValue === "") {
      const nextSlots2 = [...slots];
      nextSlots2[index] = "";
      commit(nextSlots2);
      return;
    }
    const accepted = Array.from(rawValue).filter(
      (character) => acceptsCharacter(pattern, character)
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
  const handleKeyDown = (index, event) => {
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
  const handlePaste = (index, event) => {
    if (disabled || readOnly) return;
    const clipboardValue = event.clipboardData.getData("text");
    if (!clipboardValue) return;
    event.preventDefault();
    const accepted = Array.from(clipboardValue).filter((character) => acceptsCharacter(pattern, character)).slice(0, length - index);
    if (accepted.length === 0) return;
    const nextSlots = [...slots];
    accepted.forEach((character, offset) => {
      nextSlots[index + offset] = character;
    });
    commit(nextSlots);
    const firstEmptyAfterPaste = nextSlots.findIndex(
      (slot, slotIndex) => slotIndex >= index + accepted.length && !slot
    );
    const nextFocus = firstEmptyAfterPaste === -1 ? length - 1 : firstEmptyAfterPaste;
    cells.current[nextFocus]?.focus();
  };
  const setRootRef = (element) => {
    root.current = element;
    if (typeof forwardedRef === "function") forwardedRef(element);
    else if (forwardedRef) forwardedRef.current = element;
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...dataAttributes,
      ref: setRootRef,
      id,
      title,
      role: "group",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-errormessage": ariaErrorMessage,
      "aria-invalid": effectiveInvalid || void 0,
      "aria-required": effectiveRequired || void 0,
      "data-disabled": disabled || void 0,
      "data-readonly": readOnly || void 0,
      "data-invalid": effectiveInvalid || void 0,
      className: cx(
        "ms-pininput",
        disabled && "ms-pininput--disabled",
        readOnly && "ms-pininput--readonly",
        effectiveInvalid && "ms-pininput--invalid",
        className
      ),
      children: [
        Array.from({ length }, (_, index) => /* @__PURE__ */ jsx(
          "input",
          {
            ref: (element) => {
              cells.current[index] = element;
            },
            type: mask ? "password" : "text",
            inputMode: pattern === DIGIT_RE ? "numeric" : "text",
            autoComplete: index === 0 ? "one-time-code" : "off",
            maxLength: 1,
            value: slots[index] ?? "",
            onChange: (event) => handleChange(index, event.target.value),
            onKeyDown: (event) => handleKeyDown(index, event),
            onPaste: (event) => handlePaste(index, event),
            disabled,
            readOnly,
            required: effectiveRequired,
            form,
            "aria-label": `Character ${index + 1} of ${length}`,
            "aria-describedby": ariaDescribedBy,
            "aria-errormessage": ariaErrorMessage,
            "aria-invalid": effectiveInvalid || void 0,
            className: "ms-pininput__cell"
          },
          index
        )),
        name && /* @__PURE__ */ jsx(
          "input",
          {
            type: "hidden",
            name,
            form,
            value: flattenedValue,
            disabled
          }
        )
      ]
    }
  );
});

export {
  PinInput
};
//# sourceMappingURL=chunk-UFADWUXF.js.map