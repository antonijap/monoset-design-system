import { forwardRef, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { Sheet, type SheetProps } from "./Sheet";
import { colors, fontSize, fontWeight, space } from "./tokens";

export interface ActionSheetAction {
  label: string;
  onPress?: () => void;
  /** Visual destructive styling. */
  destructive?: boolean;
  disabled?: boolean;
}

export interface ActionSheetProps extends Omit<SheetProps, "children" | "title" | "description"> {
  title?: string;
  description?: string;
  actions: ActionSheetAction[];
  cancelLabel?: string;
}

/**
 * iOS-style list of mutually exclusive actions plus a Cancel. Each action
 * dismisses the sheet on press by default. Destructive actions render in red.
 */
export const ActionSheet = forwardRef<View, ActionSheetProps>(function ActionSheet(
  { title, description, actions, cancelLabel = "Cancel", onClose, ...rest },
  ref,
) {
  return (
    <Sheet
      ref={ref as any}
      onClose={onClose}
      grabber={false}
      {...rest}
    >
      {(title || description) && (
        <View style={{ paddingBottom: space[3], borderBottomWidth: 1, borderBottomColor: colors.borderSubtle, marginBottom: space[2] }}>
          {title && <Text style={{ fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 }}>{title}</Text>}
          {description && <Text style={{ fontSize: fontSize.sm, color: colors.fg3, marginTop: 2 }}>{description}</Text>}
        </View>
      )}
      <View>
        {actions.map((a, i) => (
          <Pressable
            key={i}
            disabled={a.disabled}
            onPress={() => { a.onPress?.(); onClose(); }}
            style={({ pressed }) => ({
              paddingVertical: space[4], paddingHorizontal: space[4],
              backgroundColor: pressed ? colors.bgMuted : "transparent",
              borderRadius: 8, alignItems: "center",
              opacity: a.disabled ? 0.5 : 1,
            })}
            accessibilityRole="button"
          >
            <Text style={{
              fontSize: fontSize.base,
              fontWeight: fontWeight.medium,
              color: a.destructive ? colors.statusDanger : colors.fg1,
            }}>{a.label}</Text>
          </Pressable>
        ))}
      </View>
      <View style={{ marginTop: space[3], borderTopWidth: 1, borderTopColor: colors.borderSubtle, paddingTop: space[3] }}>
        <Pressable
          onPress={onClose}
          style={({ pressed }) => ({
            paddingVertical: space[4], alignItems: "center", borderRadius: 8,
            backgroundColor: pressed ? colors.bgMuted : "transparent",
          })}
          accessibilityRole="button"
        >
          <Text style={{ fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.fg2 }}>{cancelLabel}</Text>
        </Pressable>
      </View>
    </Sheet>
  );
});
