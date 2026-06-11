import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { colors, fontSize, fontWeight } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";

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
  const reduceMotion = useReducedMotion();
  const rotate = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotate, {
      toValue: isOpen ? 1 : 0, duration: reduceMotion ? 0 : 180, easing: Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true,
    }).start();
  }, [isOpen, rotate, reduceMotion]);

  const angle = rotate.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });

  return (
    <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderSubtle }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={typeof title === "string" ? title : undefined}
        accessibilityState={{ expanded: isOpen, disabled }}
        disabled={disabled}
        onPress={() => ctx.toggle(value)}
        style={({ pressed }) => ({
          flexDirection: "row", alignItems: "center", justifyContent: "space-between",
          paddingVertical: 14, paddingHorizontal: 0,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        })}
      >
        {typeof title === "string"
          ? <Text style={{ fontSize: fontSize.base, fontWeight: fontWeight.medium, color: colors.fg1, flex: 1 }}>{title}</Text>
          : <View style={{ flex: 1 }}>{title}</View>}
        <Animated.View style={{ transform: [{ rotate: angle }] }}>
          <ChevronDown size={18} color={colors.fg3} strokeWidth={2} />
        </Animated.View>
      </Pressable>
      {isOpen && (
        <View style={{ paddingBottom: 14, paddingHorizontal: 0 }}>
          {typeof children === "string"
            ? <Text style={{ fontSize: fontSize.sm, color: colors.fg2, lineHeight: fontSize.sm * 1.55 }}>{children}</Text>
            : children}
        </View>
      )}
    </View>
  );
}
