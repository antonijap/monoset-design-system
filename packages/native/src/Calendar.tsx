import { forwardRef, useState, type ReactNode } from "react";
import { Pressable, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { colors, fontSize, fontWeight, space } from "./tokens";

export interface CalendarProps {
  /** Selected date. Controlled. */
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date) => void;
  /** Visible month. Controlled. */
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  min?: Date;
  max?: Date;
  /** Locale for month + weekday labels. Default: device locale. */
  locale?: string;
  /** 0 = Sunday, 1 = Monday. Default: 1. */
  weekStartsOn?: 0 | 1;
  style?: StyleProp<ViewStyle>;
}

function startOfDay(d: Date) { const c = new Date(d); c.setHours(0, 0, 0, 0); return c; }
function sameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function addMonths(d: Date, n: number) { const c = new Date(d); c.setMonth(c.getMonth() + n); return c; }
function weekdayLabels(locale: string | undefined, weekStartsOn: 0 | 1) {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const base = new Date(2021, 0, 4); // a Monday
  const labels: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    labels.push(fmt.format(d));
  }
  if (weekStartsOn === 0) labels.unshift(labels.pop() as string);
  return labels;
}

export const Calendar = forwardRef<View, CalendarProps>(function Calendar(
  { value, defaultValue, onValueChange, month, defaultMonth, onMonthChange, min, max, locale, weekStartsOn = 1, style },
  ref,
) {
  const isControlled = value !== undefined;
  const [internalSel, setInternalSel] = useState<Date | null>(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internalSel;

  const monthControlled = month !== undefined;
  const [internalMonth, setInternalMonth] = useState<Date>(() => month ?? defaultMonth ?? selected ?? new Date());
  const view = monthControlled ? month : internalMonth;

  const setView = (d: Date) => {
    if (!monthControlled) setInternalMonth(d);
    onMonthChange?.(d);
  };
  const select = (d: Date) => {
    if (!isControlled) setInternalSel(d);
    onValueChange?.(d);
  };
  const isDisabled = (d: Date) => {
    if (min && startOfDay(d) < startOfDay(min)) return true;
    if (max && startOfDay(d) > startOfDay(max)) return true;
    return false;
  };

  const firstOfMonth = new Date(view.getFullYear(), view.getMonth(), 1);
  const startWeekday = (firstOfMonth.getDay() - weekStartsOn + 7) % 7;
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
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: space[4] }}>
        <NavBtn accessibilityLabel="Previous month" onPress={() => setView(addMonths(view, -1))}>
          <ChevronLeft size={20} color={colors.fg1} strokeWidth={2} />
        </NavBtn>
        <Text style={{ fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 }}>{monthLabel}</Text>
        <NavBtn accessibilityLabel="Next month" onPress={() => setView(addMonths(view, 1))}>
          <ChevronRight size={20} color={colors.fg1} strokeWidth={2} />
        </NavBtn>
      </View>
      <View style={{ flexDirection: "row", marginBottom: space[3] }}>
        {weekdayLabels(locale, weekStartsOn).map((w, i) => (
          <Text key={i} style={{ flex: 1, textAlign: "center", fontSize: fontSize.xs, color: colors.fg3, textTransform: "uppercase", letterSpacing: 0.5 }}>{w}</Text>
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
              onPress={() => select(d)}
              accessibilityRole="button"
              accessibilityState={{ selected: !!isSelected, disabled: off }}
              accessibilityLabel={d.toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              style={{ width: `${100 / 7}%`, height: 44, alignItems: "center", justifyContent: "center" }}
            >
              {({ pressed }) => (
                <View style={{
                  width: 38, height: 38, borderRadius: 999, alignItems: "center", justifyContent: "center",
                  backgroundColor: isSelected ? colors.accent : pressed && !off ? colors.bgMuted : "transparent",
                  borderWidth: isToday && !isSelected ? 1 : 0,
                  borderColor: colors.border,
                }}>
                  <Text style={{
                    fontSize: fontSize.base,
                    color: off ? colors.fg4 : isSelected ? colors.accentFg : !inMonth ? colors.fg4 : colors.fg1,
                    fontWeight: isToday && !isSelected ? fontWeight.semibold : fontWeight.regular,
                  }}>{d.getDate()}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
});

function NavBtn({ accessibilityLabel, onPress, children }: { accessibilityLabel: string; onPress: () => void; children: ReactNode }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => ({
        width: 36, height: 36, borderRadius: 999,
        alignItems: "center", justifyContent: "center",
        backgroundColor: pressed ? colors.bgMuted : "transparent",
      })}
    >
      {children}
    </Pressable>
  );
}
