import * as RTabs from "@radix-ui/react-tabs";
import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE_EMPHASIS } from "@monoset/motion";
import { cx } from "./cx";

export const Tabs = RTabs.Root;

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T | null>).current = value;
}

export const TabsList = forwardRef<
  React.ElementRef<typeof RTabs.List>,
  React.ComponentPropsWithoutRef<typeof RTabs.List>
>(function TabsList({ className, children, ...rest }, ref) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = useState<{ left: number; width: number } | null>(null);
  // left/width are layout values that MotionConfig reducedMotion does not suppress,
  // so honor the preference explicitly: jump the indicator instead of sliding it.
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => {
      const active = list.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
      if (active) setRect({ left: active.offsetLeft, width: active.offsetWidth });
    };
    update();
    const mo = new MutationObserver(update);
    mo.observe(list, { attributes: true, subtree: true, attributeFilter: ["data-state"] });
    // Observe every trigger, not just the list: when the web font swaps in, a
    // trigger's width changes even if the list's total width does not, and the
    // indicator must re-measure to stay aligned with the label.
    const ro = new ResizeObserver(update);
    ro.observe(list);
    list.querySelectorAll('[role="tab"]').forEach((t) => ro.observe(t));
    // Re-measure once fonts finish loading (initial measure uses the fallback font).
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(update).catch(() => {});
    }
    return () => {
      mo.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <RTabs.List
      ref={(node) => {
        listRef.current = node;
        setRef(ref, node);
      }}
      className={cx("ms-tabs__list", className)}
      {...rest}
    >
      {children}
      {rect && (
        <motion.span
          aria-hidden
          className="ms-tabs__indicator"
          initial={false}
          animate={{ left: rect.left, width: rect.width }}
          transition={reduceMotion ? { duration: 0 } : { duration: DUR.base, ease: EASE_EMPHASIS }}
        />
      )}
    </RTabs.List>
  );
});

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RTabs.Trigger> {
  children?: ReactNode;
}

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof RTabs.Trigger>,
  TabsTriggerProps
>(function TabsTrigger({ className, children, ...rest }, ref) {
  return (
    <RTabs.Trigger ref={ref} className={cx("ms-tabs__trigger", className)} {...rest}>
      {children}
    </RTabs.Trigger>
  );
});

export const TabsContent = RTabs.Content;
