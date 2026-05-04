import { createContext, forwardRef, useContext, useState, type ReactNode } from "react";
import { Pressable, Text, View, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
type RadioStyleProp = StyleProp<ViewStyle>;
import { styles } from "./styles";

interface RadioGroupCtx {
  value: string | undefined;
  setValue: (v: string) => void;
  disabled?: boolean;
}

const Ctx = createContext<RadioGroupCtx | null>(null);

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  "aria-label"?: string;
}

export function RadioGroup({ value, defaultValue, onValueChange, disabled, children, style, ...rest }: RadioGroupProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string | undefined>(defaultValue);
  const current = isControlled ? value : internal;

  const setValue = (v: string) => {
    if (disabled) return;
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };

  return (
    <Ctx.Provider value={{ value: current, setValue, disabled }}>
      <View style={style} accessibilityRole="radiogroup" {...rest}>{children}</View>
    </Ctx.Provider>
  );
}

export interface RadioProps extends Omit<PressableProps, "children" | "style"> {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
  style?: RadioStyleProp;
}

export const Radio = forwardRef<any, RadioProps>(function Radio(
  { value, label, disabled: itemDisabled, style, ...rest },
  ref,
) {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Radio must be used inside <RadioGroup>.");
  const checked = ctx.value === value;
  const disabled = itemDisabled || ctx.disabled;

  return (
    <Pressable
      ref={ref}
      role="radio"
      accessibilityState={{ checked, disabled }}
      onPress={() => ctx.setValue(value)}
      disabled={disabled}
      style={({ pressed }) => [
        styles.msRadioRow,
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style,
      ]}
      {...rest}
    >
      <View style={[styles.msRadio, checked && styles.msRadioChecked]}>
        {checked && <View style={styles.msRadioDot} />}
      </View>
      {label && (typeof label === "string"
        ? <Text style={styles.msRadioLabel}>{label}</Text>
        : label)}
    </Pressable>
  );
});
