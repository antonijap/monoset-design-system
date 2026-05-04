import { useEffect, useRef } from "react";
import { Animated, Easing, type DimensionValue } from "react-native";
import { styles } from "./styles";

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  /** Custom border radius (defaults to 4). */
  radius?: number;
}

export function Skeleton({ width = "100%", height = 17, radius = 4 }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={[styles.msSkeleton, { width, height, borderRadius: radius, opacity }]}
    />
  );
}
