import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { useReducedMotion } from "./useReducedMotion";

export interface ToastItem {
  id: number;
  title: string;
  /** Optional action label. Tapping calls `onActionPress`. */
  action?: string;
  onActionPress?: () => void;
  duration?: number;
}

interface ToastCtx {
  /** Push a new toast. Returns its id so you can dismiss it later. */
  toast: (item: Omit<ToastItem, "id">) => number;
  /** Dismiss a toast by id. */
  dismiss: (id: number) => void;
}

const Ctx = createContext<ToastCtx | null>(null);

export interface ToastProviderProps {
  children: ReactNode;
  /** Default auto-dismiss in ms. Default 3500. */
  defaultDuration?: number;
}

let nextId = 1;

export function ToastProvider({ children, defaultDuration = 3500 }: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((item: Omit<ToastItem, "id">) => {
    const id = nextId++;
    setItems((prev) => [...prev, { id, ...item }]);
    timers.current.set(id, setTimeout(() => dismiss(id), item.duration ?? defaultDuration));
    return id;
  }, [defaultDuration, dismiss]);

  // Clear any pending timers if the provider unmounts.
  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <View style={styles.msToastWrap} pointerEvents="box-none">
        {items.map((t) => (
          <ToastView key={t.id} item={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </View>
    </Ctx.Provider>
  );
}

function ToastView({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(20)).current;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: reduceMotion ? 0 : 180, easing: Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
      Animated.timing(ty,      { toValue: 0, duration: reduceMotion ? 0 : 220, easing: Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
    ]).start();
  }, [opacity, ty, reduceMotion]);

  return (
    <Animated.View style={[styles.msToast, { opacity, transform: [{ translateY: ty }], marginBottom: 8 }]}>
      <Text style={styles.msToastTitle}>{item.title}</Text>
      {item.action && (
        <Pressable
          accessibilityRole="button"
          hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
          onPress={() => { item.onActionPress?.(); onDismiss(); }}
        >
          <Text style={styles.msToastAction}>{item.action}</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

export function useToast(): ToastCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be called inside <ToastProvider>.");
  return ctx;
}
