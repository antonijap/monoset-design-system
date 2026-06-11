import { forwardRef, type ReactNode } from "react";
import { View, Text, type ViewProps } from "react-native";
import { Info, Check, AlertCircle } from "lucide-react-native";
import { styles } from "./styles";
import { colors } from "./tokens";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps extends Omit<ViewProps, "children"> {
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
  /** Custom icon element. Defaults to a glyph derived from the variant. */
  icon?: ReactNode;
}

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
  const iconColor = colors.fg1;
  const DefaultIcon =
    variant === "success" ? Check :
    variant === "info"    ? Info :
                            AlertCircle;
  const accessibilityRole =
    variant === "danger" || variant === "warning" ? "alert" : "text";

  return (
    <View
      ref={ref}
      accessibilityRole={accessibilityRole}
      style={[styles.msAlert, variantStyle, style]}
      {...rest}
    >
      <View style={[styles.msAlertIconWrap, iconWrapStyle]}>
        {icon ?? <DefaultIcon size={16} color={iconColor} strokeWidth={2} />}
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
