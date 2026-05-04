import { forwardRef, useState, type ReactNode } from "react";
import { Pressable, Text, View, type ViewProps } from "react-native";
import { styles } from "./styles";

export interface SegmentedItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps extends Omit<ViewProps, "children"> {
  items: SegmentedItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const SegmentedControl = forwardRef<View, SegmentedControlProps>(function SegmentedControl(
  { items, value, defaultValue, onValueChange, style, ...rest },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string | undefined>(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;

  return (
    <View ref={ref} style={[styles.msSegmented, style]} role="tablist" {...rest}>
      {items.map((item) => {
        const active = item.value === current;
        return (
          <Pressable
            key={item.value}
            role="tab"
            accessibilityState={{ selected: active }}
            disabled={item.disabled}
            onPress={() => {
              if (!isControlled) setInternal(item.value);
              onValueChange?.(item.value);
            }}
            style={[styles.msSegmentedItem, active && styles.msSegmentedItemActive]}
          >
            {typeof item.label === "string"
              ? <Text style={[styles.msSegmentedText, active && styles.msSegmentedTextActive]}>{item.label}</Text>
              : item.label}
          </Pressable>
        );
      })}
    </View>
  );
});
