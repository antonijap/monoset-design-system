import { forwardRef, type ReactNode } from "react";
import { View, type ViewProps, type StyleProp, type ViewStyle } from "react-native";
import { styles } from "./styles";

export type CardVariant = "default" | "elevated" | "inset";

export interface CardProps extends Omit<ViewProps, "children"> {
  variant?: CardVariant;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card = forwardRef<View, CardProps>(function Card(
  { variant = "default", children, style, ...rest },
  ref,
) {
  return (
    <View
      ref={ref}
      style={[
        styles.msCard,
        variant === "elevated" && styles.msCardElevated,
        variant === "inset" && styles.msCardInset,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
});
