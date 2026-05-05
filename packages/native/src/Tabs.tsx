import { forwardRef, useState, type ReactNode } from "react";
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { colors, fontSize, fontWeight, space } from "./tokens";

export interface TabItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Allow horizontal scroll when tabs overflow. Default: true. */
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Top-tab navigation. Underline indicator on the active tab. Scrolls
 * horizontally when there are more tabs than fit. The component renders
 * just the tab bar; you handle which screen mounts based on the value.
 */
export const Tabs = forwardRef<View, TabsProps>(function Tabs(
  { items, value, defaultValue, onValueChange, scrollable = true, style },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string | undefined>(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;

  const Container: any = scrollable ? ScrollView : View;
  const containerProps = scrollable
    ? { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { paddingHorizontal: space[2] } }
    : { style: { flexDirection: "row" as const } };

  return (
    <View
      ref={ref}
      accessibilityRole="tablist"
      style={[
        { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle, backgroundColor: colors.bg },
        style,
      ]}
    >
      <Container {...containerProps}>
        {items.map((item) => {
          const active = item.value === current;
          return (
            <Pressable
              key={item.value}
              accessibilityRole="tab"
              accessibilityState={{ selected: active, disabled: item.disabled }}
              disabled={item.disabled}
              onPress={() => {
                if (!isControlled) setInternal(item.value);
                onValueChange?.(item.value);
              }}
              style={({ pressed }) => ({
                paddingHorizontal: space[4],
                paddingVertical: space[4],
                opacity: item.disabled ? 0.4 : pressed ? 0.7 : 1,
                borderBottomWidth: 2,
                borderBottomColor: active ? colors.fg1 : "transparent",
                marginBottom: -1,
              })}
            >
              {typeof item.label === "string"
                ? <Text style={{ fontSize: fontSize.base, fontWeight: active ? fontWeight.semibold : fontWeight.medium, color: active ? colors.fg1 : colors.fg3 }}>{item.label}</Text>
                : item.label}
            </Pressable>
          );
        })}
      </Container>
    </View>
  );
});
