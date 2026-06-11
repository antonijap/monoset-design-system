import { forwardRef, useState } from "react";
import {
  Modal, Pressable, Text, View, type StyleProp, type ViewStyle,
} from "react-native";
import { Calendar as CalendarIcon } from "lucide-react-native";
import { Calendar } from "./Calendar";
import { colors, fontSize, space, radius } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";

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

  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<Date>(() => selected || new Date());

  const set = (d: Date | null) => {
    if (!isControlled) setInternal(d);
    onValueChange?.(d);
  };

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
          borderRadius: radius.xl, backgroundColor: disabled ? colors.bgMuted : colors.bg,
          opacity: disabled ? 0.6 : 1, gap: 8,
        })}
      >
        <Text style={{ fontSize: fontSize.base, color: selected ? colors.fg1 : colors.fg4, flex: 1 }}>
          {selected ? format(selected) : placeholder}
        </Text>
        <CalendarIcon size={18} color={colors.fg3} strokeWidth={2} />
      </Pressable>

      <Modal visible={open} animationType={reduceMotion ? "none" : "slide"} transparent onRequestClose={() => setOpen(false)} statusBarTranslucent>
        <Pressable style={{ flex: 1, backgroundColor: colors.scrim }} onPress={() => setOpen(false)}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              marginTop: "auto",
              backgroundColor: colors.bg,
              borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl,
              paddingTop: 12, paddingHorizontal: space[5], paddingBottom: space[7],
            }}
          >
            <View style={{ width: 36, height: 5, borderRadius: 999, backgroundColor: colors.border, alignSelf: "center", marginBottom: space[4] }}/>
            <Calendar
              value={selected}
              month={view}
              onMonthChange={setView}
              onValueChange={(d) => { set(d); setOpen(false); }}
              min={min}
              max={max}
              locale={locale}
            />
            {selected && (
              <Pressable
                onPress={() => { set(null); setOpen(false); }}
                style={({ pressed }) => ({
                  marginTop: space[3], paddingVertical: space[3], alignItems: "center", borderRadius: radius.lg,
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
