import { forwardRef, type ReactNode } from "react";
import { View, Text, type ViewProps } from "react-native";
import { styles } from "./styles";

export type BadgeVariant = "neutral" | "solid" | "outline" | "success" | "danger";

export interface BadgeProps extends Omit<ViewProps, "children"> {
  variant?: BadgeVariant;
  children?: ReactNode;
  /** Optional leading dot or icon. */
  leading?: ReactNode;
}

export const Badge = forwardRef<View, BadgeProps>(function Badge(
  { variant = "neutral", children, leading, style, ...rest },
  ref,
) {
  const variantStyle =
    variant === "solid"   ? styles.msBadgeSolid :
    variant === "outline" ? styles.msBadgeOutline :
    variant === "success" ? styles.msBadgeSuccess :
    variant === "danger"  ? styles.msBadgeDanger :
                            styles.msBadgeNeutral;
  const textVariantStyle =
    variant === "solid"   ? styles.msBadgeTextSolid :
    variant === "outline" ? styles.msBadgeTextOutline :
    variant === "success" ? styles.msBadgeTextSuccess :
    variant === "danger"  ? styles.msBadgeTextDanger :
                            styles.msBadgeTextNeutral;

  return (
    <View ref={ref} style={[styles.msBadge, variantStyle, style]} {...rest}>
      {leading}
      <Text style={[styles.msBadgeText, textVariantStyle]}>{children}</Text>
    </View>
  );
});
