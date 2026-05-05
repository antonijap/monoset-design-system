import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Animated, Easing, Pressable, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { colors, fontSize, fontWeight } from "./tokens";

type Mode = "single" | "multiple";

interface AccordionCtx {
  open: Set<string>;
  toggle: (id: string) => void;
}

const Ctx = createContext<AccordionCtx | null>(null);

export interface AccordionProps {
  type?: Mode;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Accordion({ type = "single", defaultValue, value, onValueChange, children, style }: AccordionProps) {
  const isControlled = value !== undefined;
  const initialSet = (() => {
    const v = isControlled ? value : defaultValue;
    if (v === undefined) return new Set<string>();
    return new Set(Array.isArray(v) ? v : [v]);
  })();
  const [internal, setInternal] = useState<Set<string>>(initialSet);
  const open = isControlled
    ? new Set(Array.isArray(value) ? value : value === undefined ? [] : [value])
    : internal;

  const setOpen = (next: Set<string>) => {
    if (!isControlled) setInternal(next);
    if (type === "single") onValueChange?.([...next][0] ?? "");
    else onValueChange?.([...next]);
  };

  const toggle = (id: string) => {
    const next = new Set(open);
    if (next.has(id)) next.delete(id);
    else {
      if (type === "single") next.clear();
      next.add(id);
    }
    setOpen(next);
  };

  return (
    <Ctx.Provider value={{ open, toggle }}>
      <View style={style}>{children}</View>
    </Ctx.Provider>
  );
}

export interface AccordionItemProps {
  value: string;
  title: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

export function AccordionItem({ value, title, children, disabled }: AccordionItemProps) {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("AccordionItem must be used inside <Accordion>.");
  const isOpen = ctx.open.has(value);
  const rotate = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotate, {
      toValue: isOpen ? 1 : 0, duration: 180, easing: Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true,
    }).start();
  }, [isOpen, rotate]);

  const angle = rotate.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: colors.borderSubtle }}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen, disabled }}
        disabled={disabled}
        onPress={() => ctx.toggle(value)}
        style={({ pressed }) => ({
          flexDirection: "row", alignItems: "center", justifyContent: "space-between",
          paddingVertical: 14, paddingHorizontal: 4,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        })}
      >
        {typeof title === "string"
          ? <Text style={{ fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.fg1, flex: 1 }}>{title}</Text>
          : <View style={{ flex: 1 }}>{title}</View>}
        <Animated.Text style={{ color: colors.fg3, fontSize: 14, transform: [{ rotate: angle }] }}>▾</Animated.Text>
      </Pressable>
      {isOpen && (
        <View style={{ paddingBottom: 14, paddingHorizontal: 4 }}>
          {typeof children === "string"
            ? <Text style={{ fontSize: fontSize.sm, color: colors.fg2, lineHeight: fontSize.sm * 1.55 }}>{children}</Text>
            : children}
        </View>
      )}
    </View>
  );
}
