import { forwardRef, useState, type ReactNode } from "react";
import { Pressable, Text, View, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { styles } from "./styles";

export interface CheckboxProps extends Omit<PressableProps, "children" | "style"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Checkbox = forwardRef<any, CheckboxProps>(function Checkbox(
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
        {value && <Text style={styles.msCheckCheckmark}>✓</Text>}
      </View>
      {label && (typeof label === "string"
        ? <Text style={styles.msCheckLabel}>{label}</Text>
        : label)}
    </Pressable>
  );
});
