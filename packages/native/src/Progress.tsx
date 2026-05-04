import { forwardRef, useEffect, useRef } from "react";
import { Animated, View, type ViewProps } from "react-native";
import { styles } from "./styles";

export interface ProgressProps extends ViewProps {
  /** Current value, 0-100 (or 0-max). */
  value: number;
  /** Maximum value. Default 100. */
  max?: number;
}

export const Progress = forwardRef<View, ProgressProps>(function Progress(
  { value, max = 100, style, ...rest },
  ref,
) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const width = useRef(new Animated.Value(pct)).current;

  useEffect(() => {
    Animated.timing(width, {
      toValue: pct,
      duration: 280,
      useNativeDriver: false,
    }).start();
  }, [pct, width]);

  return (
    <View
      ref={ref}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: pct }}
      style={[styles.msProgressTrack, style]}
      {...rest}
    >
      <Animated.View
        style={[
          styles.msProgressFill,
          { width: width.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }) as any },
        ]}
      />
    </View>
  );
});
