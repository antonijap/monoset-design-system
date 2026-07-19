import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Tabs.tsx
import * as RTabs from "@radix-ui/react-tabs";
import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, useReducedMotionConfig } from "framer-motion";
import { DUR, EASE_EMPHASIS } from "@monoset/motion";
import { jsx, jsxs } from "react/jsx-runtime";
var Tabs = RTabs.Root;
function setRef(ref, value) {
  if (typeof ref === "function") ref(value);
  else if (ref && typeof ref === "object") ref.current = value;
}
var TabsList = forwardRef(function TabsList2({ className, children, ...rest }, ref) {
  const listRef = useRef(null);
  const [rect, setRect] = useState(null);
  const reduceMotion = useReducedMotionConfig();
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof MutationObserver === "undefined" || typeof ResizeObserver === "undefined") {
      return;
    }
    let cancelled = false;
    const update = () => {
      if (cancelled) return;
      const active = list.querySelector('[role="tab"][data-state="active"]');
      if (!active) {
        setRect(null);
        return;
      }
      const next = { left: active.offsetLeft, width: active.offsetWidth };
      setRect(
        (previous) => previous?.left === next.left && previous.width === next.width ? previous : next
      );
    };
    const ro = new ResizeObserver(update);
    const observed = /* @__PURE__ */ new Set();
    const syncResizeObservers = () => {
      const next = /* @__PURE__ */ new Set([list, ...list.querySelectorAll('[role="tab"]')]);
      observed.forEach((element) => {
        if (!next.has(element)) {
          ro.unobserve(element);
          observed.delete(element);
        }
      });
      next.forEach((element) => {
        if (!observed.has(element)) {
          ro.observe(element);
          observed.add(element);
        }
      });
    };
    const mo = new MutationObserver(() => {
      syncResizeObservers();
      update();
    });
    mo.observe(list, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["data-state"]
    });
    syncResizeObservers();
    update();
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(update).catch(() => {
      });
    }
    return () => {
      cancelled = true;
      mo.disconnect();
      ro.disconnect();
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    RTabs.List,
    {
      ref: (node) => {
        listRef.current = node;
        setRef(ref, node);
      },
      className: cx("ms-tabs__list", className),
      ...rest,
      children: [
        children,
        rect && (reduceMotion ? /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": true,
            className: "ms-tabs__indicator",
            "data-reduced-motion": "true",
            style: { left: rect.left, width: rect.width }
          }
        ) : /* @__PURE__ */ jsx(
          motion.span,
          {
            "aria-hidden": true,
            className: "ms-tabs__indicator",
            initial: false,
            animate: { left: rect.left, width: rect.width },
            transition: { duration: DUR.base, ease: EASE_EMPHASIS }
          }
        ))
      ]
    }
  );
});
var TabsTrigger = forwardRef(function TabsTrigger2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(RTabs.Trigger, { ref, className: cx("ms-tabs__trigger", className), ...rest, children });
});
var TabsContent = RTabs.Content;

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
};
//# sourceMappingURL=chunk-3GTVMQCW.js.map