import { forwardRef, useCallback, useState } from "react";
import { Pressable, TextInput, View, type StyleProp, type ViewStyle } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { Input } from "./Input";
import { colors, radius } from "./tokens";

export interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export const NumberInput = forwardRef<TextInput, NumberInputProps>(function NumberInput(
  { value, defaultValue, onValueChange, min = -Infinity, max = Infinity, step = 1, disabled, placeholder, style },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<number | undefined>(defaultValue);
  const current = isControlled ? value : internal;
  // While the text field is focused, hold the raw string so partial input
  // ("", "-", "1.") and over-max values can be typed; commit/clamp on blur.
  const [draft, setDraft] = useState<string | null>(null);
  const clamp = useCallback((n: number) => Math.max(min, Math.min(max, n)), [min, max]);

  // Clamp and commit (stepper buttons, blur).
  const commit = (next: number) => {
    if (disabled) return;
    const c = clamp(next);
    setDraft(null);
    if (!isControlled) setInternal(c);
    onValueChange?.(c);
  };

  return (
    <View
      style={[
        {
          flexDirection: "row", alignItems: "stretch", alignSelf: "flex-start",
          borderWidth: 1, borderColor: colors.border, borderRadius: radius.xl,
          backgroundColor: colors.bg, overflow: "hidden",
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      <StepperButton
        kind="decrement"
        onPress={() => commit((current ?? 0) - step)}
        disabled={disabled || (current !== undefined && current <= min)}
      />
      <Input
        ref={ref}
        keyboardType="numeric"
        value={draft !== null ? draft : current === undefined ? "" : String(current)}
        onChangeText={(t) => {
          setDraft(t);
          if (t === "" || t === "-") return;
          const n = Number(t);
          // Emit the raw number while typing; don't clamp mid-entry.
          if (Number.isFinite(n)) {
            if (!isControlled) setInternal(n);
            onValueChange?.(n);
          }
        }}
        onBlur={() => {
          if (draft !== null) {
            const n = Number(draft);
            if (Number.isFinite(n) && draft !== "" && draft !== "-") commit(n);
            setDraft(null);
          }
        }}
        editable={!disabled}
        placeholder={placeholder}
        style={{
          width: 44, textAlign: "center",
          borderWidth: 0, borderRadius: 0,
        }}
      />
      <StepperButton
        kind="increment"
        onPress={() => commit((current ?? 0) + step)}
        disabled={disabled || (current !== undefined && current >= max)}
      />
    </View>
  );
});

function StepperButton({ kind, onPress, disabled }: { kind: "increment" | "decrement"; onPress: () => void; disabled?: boolean }) {
  const Icon = kind === "increment" ? Plus : Minus;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.bgMuted : colors.bgSubtle,
        paddingHorizontal: 16, justifyContent: "center", alignItems: "center", minWidth: 44,
        opacity: disabled ? 0.4 : 1,
      })}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      accessibilityLabel={kind === "increment" ? "Increase" : "Decrease"}
    >
      <Icon size={18} strokeWidth={2} color={colors.fg1} />
    </Pressable>
  );
}
