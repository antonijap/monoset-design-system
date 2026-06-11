import { forwardRef, useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { styles } from "./styles";
import { colors } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";

export interface SpinnerProps {
  /** Diameter in pixels. Default: 16. */
  size?: number;
  /** Stroke color. Defaults to fg1. */
  color?: string;
  /** Visually hidden accessible label. Default: "Loading". */
  label?: string;
}

export const Spinner = forwardRef<View, SpinnerProps>(function Spinner(
  { size = 16, color = colors.fg1, label = "Loading" },
  ref,
) {
  const angle = useRef(new Animated.Value(0)).current;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const anim = Animated.loop(
      Animated.timing(angle, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [angle, reduceMotion]);

  const rotate = angle.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      ref={ref}
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
