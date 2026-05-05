import { forwardRef, useCallback } from "react";
import { Pressable, Text, TextInput, View, type StyleProp, type ViewStyle } from "react-native";
import { Input } from "./Input";
import { colors, fontSize, fontWeight, radius } from "./tokens";

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
  const current = isControlled ? value : defaultValue;
  const clamp = useCallback((n: number) => Math.max(min, Math.min(max, n)), [min, max]);

  const change = (next: number) => {
    if (disabled) return;
    onValueChange?.(clamp(next));
  };

  return (
    <View
      style={[
        {
          flexDirection: "row", alignItems: "stretch", alignSelf: "flex-start",
          borderWidth: 1, borderColor: colors.border, borderRadius: 12,
          backgroundColor: colors.bg, overflow: "hidden",
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      <StepperButton
        label="−"
        onPress={() => change((current ?? 0) - step)}
        disabled={disabled || (current !== undefined && current <= min)}
      />
      <Input
        ref={ref}
        keyboardType="numeric"
        value={current === undefined ? "" : String(current)}
        onChangeText={(t) => {
          if (t === "" || t === "-") return;
          const n = Number(t);
          if (Number.isFinite(n)) change(n);
        }}
        editable={!disabled}
        placeholder={placeholder}
        style={{
          minWidth: 60, textAlign: "center",
          borderWidth: 0, borderRadius: 0,
        }}
      />
      <StepperButton
        label="+"
        onPress={() => change((current ?? 0) + step)}
        disabled={disabled || (current !== undefined && current >= max)}
      />
    </View>
  );
});

function StepperButton({ label, onPress, disabled }: { label: string; onPress: () => void; disabled?: boolean }) {
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
      accessibilityLabel={label === "+" ? "Increment" : "Decrement"}
    >
      <Text style={{ fontSize: fontSize.lg, fontWeight: fontWeight.medium, color: colors.fg1 }}>{label}</Text>
    </Pressable>
  );
}
