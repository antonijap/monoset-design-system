import { forwardRef, useState, Fragment, type ReactNode } from "react";
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
  const activeIndex = items.findIndex((i) => i.value === current);

  return (
    <View ref={ref} style={[styles.msSegmented, style]} role="tablist" {...rest}>
      {items.map((item, i) => {
        const active = i === activeIndex;
        // iOS hides the hairline separators that touch the selected segment.
        const showSeparator = i > 0 && i !== activeIndex && i - 1 !== activeIndex;
        return (
          <Fragment key={item.value}>
            {i > 0 && <View style={[styles.msSegmentedSeparator, !showSeparator && { opacity: 0 }]} aria-hidden />}
            <Pressable
              role="tab"
              accessibilityState={{ selected: active, disabled: item.disabled }}
              disabled={item.disabled}
              onPress={() => {
                if (!isControlled) setInternal(item.value);
                onValueChange?.(item.value);
              }}
              style={[
                styles.msSegmentedItem,
                active && styles.msSegmentedItemActive,
                item.disabled && { opacity: 0.4 },
              ]}
            >
              {typeof item.label === "string"
                ? <Text style={[styles.msSegmentedText, active && styles.msSegmentedTextActive]}>{item.label}</Text>
                : item.label}
            </Pressable>
          </Fragment>
        );
      })}
    </View>
  );
});
