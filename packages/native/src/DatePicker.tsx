import { forwardRef, useState } from "react";
import {
  Modal, Pressable, Text, View, type StyleProp, type ViewStyle,
} from "react-native";
import { colors, fontSize, fontWeight, space, radius } from "./tokens";

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
  min?: Date;
  max?: Date;
  /** Locale for month/weekday labels. Default: device locale. */
  locale?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Format function for the trigger label. Default: locale-aware short date. */
  format?: (date: Date) => string;
  style?: StyleProp<ViewStyle>;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startOfDay(d: Date) { const c = new Date(d); c.setHours(0,0,0,0); return c; }
function sameDay(a: Date, b: Date) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function addMonths(d: Date, n: number) { const c = new Date(d); c.setMonth(c.getMonth() + n); return c; }
function defaultFormat(d: Date, locale?: string) {
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

export const DatePicker = forwardRef<View, DatePickerProps>(function DatePicker(
  { value, defaultValue, onValueChange, min, max, locale, placeholder = "Pick a date", disabled, format = (d) => defaultFormat(d, locale), style },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<Date | null>(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internal;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<Date>(() => selected || new Date());

  const set = (d: Date | null) => {
    if (!isControlled) setInternal(d);
    onValueChange?.(d);
  };

  const isDisabled = (d: Date) => {
    if (min && startOfDay(d) < startOfDay(min)) return true;
    if (max && startOfDay(d) > startOfDay(max)) return true;
    return false;
  };

  // Build month grid (Mon-first), 6 rows
  const firstOfMonth = new Date(view.getFullYear(), view.getMonth(), 1);
  const startWeekday = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - startWeekday);
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  const monthLabel = view.toLocaleDateString(locale, { month: "long", year: "numeric" });
  const today = startOfDay(new Date());

  return (
    <View ref={ref} style={style}>
      <Pressable
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        style={({ pressed }) => ({
          flexDirection: "row", alignItems: "center", justifyContent: "space-between",
          paddingHorizontal: 14, paddingVertical: 12, minHeight: 44,
          borderWidth: 1, borderColor: pressed ? colors.fg3 : colors.border,
          borderRadius: 12, backgroundColor: disabled ? colors.bgMuted : colors.bg,
          opacity: disabled ? 0.6 : 1, gap: 8,
        })}
      >
        <Text style={{ fontSize: fontSize.base, color: selected ? colors.fg1 : colors.fg4, flex: 1 }}>
          {selected ? format(selected) : placeholder}
        </Text>
        <Text style={{ fontSize: 14, color: colors.fg3 }}>📅</Text>
      </Pressable>

      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)} statusBarTranslucent>
        <Pressable style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }} onPress={() => setOpen(false)}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              marginTop: "auto",
              backgroundColor: colors.bg,
              borderTopLeftRadius: 16, borderTopRightRadius: 16,
              paddingTop: 12, paddingHorizontal: space[5], paddingBottom: space[7],
            }}
          >
            <View style={{ width: 36, height: 5, borderRadius: 999, backgroundColor: colors.border, alignSelf: "center", marginBottom: space[4] }}/>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: space[3] }}>
              <NavBtn label="‹" onPress={() => setView((v) => addMonths(v, -1))}/>
              <Text style={{ fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 }}>{monthLabel}</Text>
              <NavBtn label="›" onPress={() => setView((v) => addMonths(v, 1))}/>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
              {WEEKDAYS.map((w) => (
                <Text key={w} style={{ flex: 1, textAlign: "center", fontSize: 10, color: colors.fg3, textTransform: "uppercase", letterSpacing: 0.5 }}>{w}</Text>
              ))}
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {days.map((d) => {
                const inMonth = d.getMonth() === view.getMonth();
                const isSelected = selected && sameDay(d, selected);
                const isToday = sameDay(d, today);
                const off = isDisabled(d);
                return (
                  <Pressable
                    key={d.toISOString()}
                    disabled={off}
                    onPress={() => { set(d); setOpen(false); }}
                    style={({ pressed }) => ({
                      width: `${100/7}%`, height: 40,
                      alignItems: "center", justifyContent: "center",
                      backgroundColor: isSelected ? colors.accent : pressed && !off ? colors.bgMuted : "transparent",
                      borderRadius: 8,
                    })}
                    accessibilityRole="button"
                    accessibilityState={{ selected: !!isSelected, disabled: off }}
                  >
                    <Text style={{
                      fontSize: fontSize.sm,
                      color: off ? colors.fg4 : isSelected ? colors.accentFg : !inMonth ? colors.fg4 : colors.fg1,
                      fontWeight: isToday && !isSelected ? fontWeight.semibold : fontWeight.regular,
                      textDecorationLine: isToday && !isSelected ? "underline" : "none",
                    }}>{d.getDate()}</Text>
                  </Pressable>
                );
              })}
            </View>
            {selected && (
              <Pressable
                onPress={() => { set(null); setOpen(false); }}
                style={({ pressed }) => ({
                  marginTop: space[3], paddingVertical: space[3], alignItems: "center", borderRadius: 8,
                  backgroundColor: pressed ? colors.bgMuted : "transparent",
                })}
              >
                <Text style={{ fontSize: fontSize.sm, color: colors.fg3 }}>Clear</Text>
              </Pressable>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
});

function NavBtn({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => ({
        width: 36, height: 36, borderRadius: 999,
        alignItems: "center", justifyContent: "center",
        backgroundColor: pressed ? colors.bgMuted : "transparent",
      })}
    >
      <Text style={{ fontSize: 18, color: colors.fg1, lineHeight: 18 }}>{label}</Text>
    </Pressable>
  );
}
