import { forwardRef, Fragment, type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Sheet, type SheetProps } from "./Sheet";
import { colors, fontSize, fontWeight, space } from "./tokens";

export interface ActionSheetAction {
  label: string;
  onPress?: () => void;
  /** Optional leading icon (pass a lucide-react-native element). */
  icon?: ReactNode;
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
 * dismisses the sheet on press. Destructive actions render in red; pass an
 * `icon` per action for the modern sheet-menu look.
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
        <View style={{
          alignItems: "center", paddingBottom: space[4], marginBottom: space[2],
          borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderSubtle,
        }}>
          {title && <Text style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, color: colors.fg1, textAlign: "center" }}>{title}</Text>}
          {description && <Text style={{ fontSize: fontSize.sm, color: colors.fg3, marginTop: space[1], textAlign: "center" }}>{description}</Text>}
        </View>
      )}
      <View>
        {actions.map((a, i) => (
          <Fragment key={i}>
            {i > 0 && <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: colors.borderSubtle }} aria-hidden />}
            <Pressable
              disabled={a.disabled}
              onPress={() => { a.onPress?.(); onClose(); }}
              style={({ pressed }) => ({
                flexDirection: "row", alignItems: "center", gap: space[4],
                minHeight: 52, paddingVertical: space[4], paddingHorizontal: space[2],
                backgroundColor: pressed ? colors.bgMuted : "transparent",
                borderRadius: 8,
                opacity: a.disabled ? 0.4 : 1,
              })}
              accessibilityRole="button"
              accessibilityState={{ disabled: a.disabled }}
              accessibilityHint={a.destructive ? "This action cannot be undone" : undefined}
            >
              {a.icon}
              <Text style={{
                fontSize: fontSize.base,
                color: a.destructive ? colors.statusDanger : colors.fg1,
              }}>{a.label}</Text>
            </Pressable>
          </Fragment>
        ))}
      </View>
      <Pressable
        onPress={onClose}
        style={({ pressed }) => ({
          marginTop: space[4], minHeight: 50,
          alignItems: "center", justifyContent: "center",
          backgroundColor: pressed ? colors.border : colors.bgMuted,
          borderRadius: 12,
        })}
        accessibilityRole="button"
      >
        <Text style={{ fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.fg1 }}>{cancelLabel}</Text>
      </Pressable>
    </Sheet>
  );
});
