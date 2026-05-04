import { forwardRef, useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, type AccessibilityProps } from "react-native";
import { styles } from "./styles";
import { colors } from "./tokens";

export interface SwitchProps extends AccessibilityProps {
  /** Controlled state. */
  checked?: boolean;
  /** Uncontrolled default state. */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Visually hidden accessible label. */
  label?: string;
}

const TRACK_COLOR_OFF = colors.border;
const TRACK_COLOR_ON  = colors.accent;
// Track 51, thumb 27, padding 2 -> travel = 51 - 27 - 2*2 = 20
const THUMB_TRAVEL    = 20;

export const Switch = forwardRef<any, SwitchProps>(function Switch(
  { checked, defaultChecked, onCheckedChange, disabled, label, ...rest },
  ref,
) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(!!defaultChecked);
  const value = isControlled ? !!checked : internal;

  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: 180,
      easing: Easing.bezier(0.3, 0, 0, 1),
      useNativeDriver: false, // backgroundColor needs the JS driver
    }).start();
  }, [value, progress]);

  const trackBg = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [TRACK_COLOR_OFF, TRACK_COLOR_ON],
  });
  const thumbX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, THUMB_TRAVEL],
  });

  const onPress = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <Pressable
      ref={ref}
      role="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={label}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
      ]}
      {...rest}
    >
      <Animated.View style={[styles.msSwitchTrack, { backgroundColor: trackBg }]}>
        <Animated.View style={[styles.msSwitchThumb, { transform: [{ translateX: thumbX }] }]} />
      </Animated.View>
    </Pressable>
  );
});
