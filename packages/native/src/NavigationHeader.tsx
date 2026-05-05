import { forwardRef, type ReactNode } from "react";
import { Pressable, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { colors, fontSize, fontWeight } from "./tokens";

export interface NavigationHeaderProps {
  /** Page title. */
  title?: ReactNode;
  /** Element on the left (back arrow, menu icon). */
  leading?: ReactNode;
  /** Element on the right (action button, avatar). */
  trailing?: ReactNode;
  /** Show a thin bottom border. Default: true. */
  border?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Top app bar. Renders a 56pt-tall header with leading/trailing slots and a
 * centered or left-aligned title. Use `<Stack>` it above your screen content
 * or use `<AppShell.Header>` for full layout.
 */
export const NavigationHeader = forwardRef<View, NavigationHeaderProps>(function NavigationHeader(
  { title, leading, trailing, border = true, style },
  ref,
) {
  return (
    <View
      ref={ref}
      accessibilityRole="header"
      style={[
        {
          flexDirection: "row", alignItems: "center", paddingHorizontal: 12,
          height: 56, backgroundColor: colors.bg, gap: 8,
          borderBottomWidth: border ? 1 : 0, borderBottomColor: colors.borderSubtle,
        },
        style,
      ]}
    >
      <View style={{ minWidth: 44, alignItems: "flex-start" }}>{leading}</View>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        {typeof title === "string"
          ? <Text style={{ fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 }} numberOfLines={1}>{title}</Text>
          : title}
      </View>
      <View style={{ minWidth: 44, alignItems: "flex-end" }}>{trailing}</View>
    </View>
  );
});

/** Quick back-arrow trigger. Renders a chevron-left glyph. */
export function NavigationBack({ onPress, label = "Back" }: { onPress?: () => void; label?: string }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      style={({ pressed }) => ({
        width: 40, height: 40, borderRadius: 999,
        alignItems: "center", justifyContent: "center",
        backgroundColor: pressed ? colors.bgMuted : "transparent",
      })}
    >
      <Text style={{ fontSize: 22, color: colors.fg1, lineHeight: 22 }}>‹</Text>
    </Pressable>
  );
}
