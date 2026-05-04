import { forwardRef, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { styles } from "./styles";
import { colors } from "./tokens";

export interface SpinnerProps {
  /** Diameter in pixels. Default: 16. */
  size?: number;
  /** Stroke color. Defaults to fg1. */
  color?: string;
  /** Visually hidden accessible label. Default: "Loading". */
  label?: string;
}

export const Spinner = forwardRef<any, SpinnerProps>(function Spinner(
  { size = 16, color = colors.fg1, label = "Loading" },
  _ref,
) {
  const angle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(angle, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [angle]);

  const rotate = angle.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      style={[
        styles.msSpinner,
        { width: size, height: size, borderColor: colors.border, borderTopColor: color },
        { transform: [{ rotate }] },
      ]}
    />
  );
});
