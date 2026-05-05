import { forwardRef, useEffect, useRef, useState } from "react";
import {
  TextInput, View, type NativeSyntheticEvent, type TextInputKeyPressEventData, type StyleProp, type ViewStyle,
} from "react-native";
import { colors, fontSize, fontWeight, radius } from "./tokens";

export interface PinInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  mask?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  style?: StyleProp<ViewStyle>;
  "aria-label"?: string;
}

const DIGIT_RE = /^[0-9]$/;

export const PinInput = forwardRef<View, PinInputProps>(function PinInput(
  { length = 6, value, defaultValue = "", onValueChange, onComplete, mask, disabled, autoFocus, style, "aria-label": ariaLabel = "One-time code" },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue.slice(0, length));
  const current = (isControlled ? value : internal).padEnd(length, "").slice(0, length);
  const inputs = useRef<(TextInput | null)[]>([]);
  const [focused, setFocused] = useState(-1);

  useEffect(() => { if (autoFocus) inputs.current[0]?.focus(); }, [autoFocus]);

  const set = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
    if (next.length === length) onComplete?.(next);
  };

  const onChange = (i: number, raw: string) => {
    if (disabled) return;
    // Pasted multi-character payload
    if (raw.length > 1) {
      const cleaned = raw.replace(/\s+/g, "").slice(0, length);
      if ([...cleaned].every((c) => DIGIT_RE.test(c))) {
        set(cleaned);
        const focusIdx = Math.min(cleaned.length, length - 1);
        inputs.current[focusIdx]?.focus();
      }
      return;
    }
    const ch = raw.slice(-1);
    if (ch && !DIGIT_RE.test(ch)) return;
    const arr = current.split("");
    arr[i] = ch;
    set(arr.join("").trimEnd());
    if (ch && i < length - 1) inputs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === "Backspace" && !current[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  return (
    <View ref={ref} accessibilityRole="none" accessibilityLabel={ariaLabel} style={[{ flexDirection: "row", gap: 8 }, style]}>
      {Array.from({ length }, (_, i) => (
        <TextInput
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          value={current[i] || ""}
          onChangeText={(t) => onChange(i, t)}
          onKeyPress={(e) => onKey(i, e)}
          onFocus={() => setFocused(i)}
          onBlur={() => setFocused(-1)}
          editable={!disabled}
          keyboardType="number-pad"
          maxLength={1}
          secureTextEntry={mask}
          textContentType={i === 0 ? "oneTimeCode" : "none" as any}
          autoComplete={i === 0 ? "one-time-code" as any : "off" as any}
          style={{
            width: 44, height: 52, textAlign: "center",
            fontSize: 20, fontWeight: fontWeight.medium as any, color: colors.fg1,
            backgroundColor: disabled ? colors.bgMuted : colors.bg,
            borderWidth: 1,
            borderColor: focused === i ? colors.fg1 : colors.border,
            borderRadius: 12,
          }}
          accessibilityLabel={`Digit ${i + 1} of ${length}`}
        />
      ))}
    </View>
  );
});
