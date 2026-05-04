import { forwardRef } from "react";
import { View, type ViewProps } from "react-native";
import { styles } from "./styles";

export interface DividerProps extends ViewProps {
  orientation?: "horizontal" | "vertical";
}

export const Divider = forwardRef<View, DividerProps>(function Divider(
  { orientation = "horizontal", style, ...rest },
  ref,
) {
  return (
    <View
      ref={ref}
      role="separator"
      style={[
        styles.msDivider,
        orientation === "vertical" ? styles.msDividerVertical : styles.msDividerHorizontal,
        style,
      ]}
      {...rest}
    />
  );
});
