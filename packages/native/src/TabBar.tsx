import { forwardRef, useState, type ReactNode } from "react";
import { Pressable, Text, View, type ViewProps } from "react-native";
import { styles } from "./styles";

export interface TabBarItem {
  value: string;
  label: ReactNode;
  /** Optional icon. Receives `{ active }` so you can swap glyphs. */
  icon?: (state: { active: boolean }) => ReactNode;
}

export interface TabBarProps extends Omit<ViewProps, "children"> {
  items: TabBarItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/**
 * Bottom navigation bar for the app's primary destinations. Pair with a
 * route-aware container (React Navigation, Expo Router) — TabBar is
 * presentational, you wire the actual navigation.
 */
export const TabBar = forwardRef<View, TabBarProps>(function TabBar(
  { items, value, defaultValue, onValueChange, style, ...rest },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string | undefined>(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;

  return (
    <View ref={ref} role="tablist" style={[styles.msTabBar, style]} {...rest}>
      {items.map((item) => {
        const active = item.value === current;
        return (
          <Pressable
            key={item.value}
            role="tab"
            accessibilityState={{ selected: active }}
            onPress={() => {
              if (!isControlled) setInternal(item.value);
              onValueChange?.(item.value);
            }}
            style={styles.msTabBarItem}
          >
            {item.icon?.({ active })}
            {typeof item.label === "string"
              ? <Text style={[styles.msTabBarLabel, active && styles.msTabBarLabelActive]}>{item.label}</Text>
              : item.label}
          </Pressable>
        );
      })}
    </View>
  );
});
