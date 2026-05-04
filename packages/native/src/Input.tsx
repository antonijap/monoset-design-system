import { forwardRef, useState, type ReactNode } from "react";
import {
  TextInput,
  View,
  Text,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { styles } from "./styles";
import { colors } from "./tokens";

export interface InputProps extends Omit<TextInputProps, "style"> {
  invalid?: boolean;
  style?: StyleProp<TextStyle>;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { invalid, editable = true, onFocus, onBlur, style, ...rest },
  ref,
) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      ref={ref}
      editable={editable}
      placeholderTextColor={colors.fg4}
      onFocus={(e) => { setFocused(true); onFocus?.(e); }}
      onBlur={(e)  => { setFocused(false); onBlur?.(e); }}
      style={[
        styles.msInput,
        focused && styles.msInputFocused,
        invalid && styles.msInputError,
        !editable && styles.msInputDisabled,
        style,
      ]}
      {...rest}
    />
  );
});

/* ─── Field wrapper ─────────────────────────────────────────────── */

export interface FieldProps {
  label?: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Field({ label, help, error, children, style }: FieldProps) {
  return (
    <View style={[styles.msField, style]}>
      {label && <Text style={styles.msFieldLabel}>{label}</Text>}
      {children}
      {error
        ? <Text style={styles.msFieldError}>{error}</Text>
        : help ? <Text style={styles.msFieldHelp}>{help}</Text> : null}
    </View>
  );
}
