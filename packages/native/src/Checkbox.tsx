import { forwardRef, useState, type ReactNode } from "react";
import { Pressable, Text, View, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { Check } from "lucide-react-native";
import { styles } from "./styles";
import { colors } from "./tokens";

export interface CheckboxProps extends Omit<PressableProps, "children" | "style"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Checkbox = forwardRef<View, CheckboxProps>(function Checkbox(
  { checked, defaultChecked, onCheckedChange, label, disabled, style, ...rest },
  ref,
) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(!!defaultChecked);
  const value = isControlled ? !!checked : internal;

  const onPress = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <Pressable
      ref={ref}
      role="checkbox"
      accessibilityState={{ checked: value, disabled }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.msCheckRow,
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style,
      ]}
      {...rest}
    >
      <View style={[styles.msCheck, value && styles.msCheckChecked]}>
        {value && <Check size={14} color={colors.accentFg} strokeWidth={3} />}
      </View>
      {label && (typeof label === "string"
        ? <Text style={styles.msCheckLabel}>{label}</Text>
        : label)}
    </Pressable>
  );
});
