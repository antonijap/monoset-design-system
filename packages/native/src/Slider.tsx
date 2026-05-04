import { forwardRef, useState } from "react";
import { GestureResponderEvent, View, type ViewProps } from "react-native";
import { styles } from "./styles";

export interface SliderProps extends Omit<ViewProps, "children"> {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

/**
 * A simple horizontal slider. Drag the thumb to change the value.
 * Built on raw touch events so it works on web (via react-native-web)
 * and native without extra dependencies.
 */
export const Slider = forwardRef<View, SliderProps>(function Slider(
  { value, onValueChange, min = 0, max = 100, step = 1, disabled, style, ...rest },
  ref,
) {
  const [trackWidth, setTrackWidth] = useState(0);

  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));

  const updateFromX = (x: number) => {
    if (disabled || trackWidth === 0) return;
    const ratio = Math.max(0, Math.min(1, x / trackWidth));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.max(min, Math.min(max, stepped));
    if (clamped !== value) onValueChange(clamped);
  };

  return (
    <View
      ref={ref}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
      onStartShouldSetResponder={() => !disabled}
      onMoveShouldSetResponder={() => !disabled}
      onResponderGrant={(e: GestureResponderEvent) => updateFromX(e.nativeEvent.locationX)}
      onResponderMove={(e: GestureResponderEvent) => updateFromX(e.nativeEvent.locationX)}
      style={[
        { paddingVertical: 16, justifyContent: "center", opacity: disabled ? 0.5 : 1 },
        style,
      ]}
      {...rest}
    >
      <View style={styles.msSliderTrack}>
        <View style={[styles.msSliderFill, { width: `${pct * 100}%` }]} />
      </View>
      <View
        style={[
          styles.msSliderThumb,
          { left: `${pct * 100}%`, marginLeft: -12 },
        ]}
      />
    </View>
  );
});
