import { forwardRef, type ReactNode } from "react";
import { Pressable, Text, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { styles } from "./styles";

export interface ChipProps extends Omit<PressableProps, "children" | "style"> {
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  leading?: ReactNode;
  trailing?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Chip = forwardRef<any, ChipProps>(function Chip(
  { selected, onSelectedChange, leading, trailing, children, onPress, style, ...rest },
  ref,
) {
  const handlePress = (e: any) => {
    onPress?.(e);
    onSelectedChange?.(!selected);
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.msChip,
        pressed && !selected && styles.msChipPressed,
        selected && styles.msChipSelected,
        style,
      ]}
      {...rest}
    >
      {leading}
      <Text style={[styles.msChipText, selected && styles.msChipTextSelected]}>{children}</Text>
      {trailing}
    </Pressable>
  );
});
