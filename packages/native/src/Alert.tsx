import { forwardRef, type ReactNode } from "react";
import { View, Text, type ViewProps } from "react-native";
import { styles } from "./styles";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps extends Omit<ViewProps, "children"> {
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
  /** Custom icon element. Defaults to a glyph derived from the variant. */
  icon?: ReactNode;
}

const DEFAULT_GLYPH: Record<AlertVariant, string> = {
  info:    "i",
  success: "✓",
  warning: "!",
  danger:  "!",
};

export const Alert = forwardRef<View, AlertProps>(function Alert(
  { variant = "info", title, children, icon, style, ...rest },
  ref,
) {
  const variantStyle =
    variant === "success" ? styles.msAlertSuccess :
    variant === "warning" ? styles.msAlertWarning :
    variant === "danger"  ? styles.msAlertDanger :
                            styles.msAlertInfo;
  const iconWrapStyle =
    variant === "success" ? styles.msAlertIconWrapSuccess :
    variant === "warning" ? styles.msAlertIconWrapWarning :
    variant === "danger"  ? styles.msAlertIconWrapDanger :
                            styles.msAlertIconWrapInfo;
  const iconColorStyle =
    variant === "success" ? styles.msAlertIconSuccess :
    variant === "warning" ? styles.msAlertIconWarning :
    variant === "danger"  ? styles.msAlertIconDanger :
                            null;

  return (
    <View ref={ref} style={[styles.msAlert, variantStyle, style]} {...rest}>
      <View style={[styles.msAlertIconWrap, iconWrapStyle]}>
        {icon ?? <Text style={[styles.msAlertIcon, iconColorStyle]}>{DEFAULT_GLYPH[variant]}</Text>}
      </View>
      <View style={styles.msAlertBody}>
        {title && <Text style={styles.msAlertTitle}>{title}</Text>}
        {typeof children === "string"
          ? <Text style={styles.msAlertMessage}>{children}</Text>
          : children}
      </View>
    </View>
  );
});
