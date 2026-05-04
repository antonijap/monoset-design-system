import { forwardRef, type ReactNode } from "react";
import { Pressable, Text, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { styles } from "./styles";
import { colors } from "./tokens";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<PressableProps, "children" | "style"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  /** Optional leading element (icon, etc.) */
  leading?: ReactNode;
  /** Optional trailing element */
  trailing?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Button = forwardRef<any, ButtonProps>(function Button(
  { variant = "secondary", size = "md", disabled, leading, trailing, children, style, ...rest },
  ref,
) {
  const sizeStyle =
    size === "sm" ? styles.msBtnSm :
    size === "lg" ? styles.msBtnLg :
                    styles.msBtnMd;

  const variantStyle =
    disabled                 ? styles.msBtnDisabled :
    variant === "primary"    ? styles.msBtnPrimary :
    variant === "ghost"      ? styles.msBtnGhost :
    variant === "danger"     ? styles.msBtnDanger :
                               styles.msBtnSecondary;

  const labelVariantStyle =
    disabled                 ? styles.msBtnLabelDisabled :
    variant === "primary"    ? styles.msBtnLabelPrimary :
    variant === "ghost"      ? styles.msBtnLabelGhost :
    variant === "danger"     ? styles.msBtnLabelDanger :
                               styles.msBtnLabelSecondary;

  return (
    <Pressable
      ref={ref}
      disabled={disabled}
      android_ripple={{ color: variant === "primary" || variant === "danger" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)" }}
      style={({ pressed }) => [
        styles.msBtn,
        sizeStyle,
        variantStyle,
        pressed && !disabled && { opacity: 0.85 },
        style,
      ]}
      {...rest}
    >
      {leading}
      <Text style={[
        styles.msBtnLabel,
        size === "sm" && styles.msBtnLabelSm,
        size === "lg" && styles.msBtnLabelLg,
        labelVariantStyle,
        leading ? { marginLeft: 6 } : null,
        trailing ? { marginRight: 6 } : null,
      ]}>
        {children}
      </Text>
      {trailing}
    </Pressable>
  );
});

// re-export for tree-shaking friendliness
export { colors as _colors };
