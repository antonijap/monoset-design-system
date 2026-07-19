import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Toast.tsx
import * as RToast from "@radix-ui/react-toast";
import { useReducedMotionConfig } from "framer-motion";
import { AlertCircle, Check, Info, X } from "lucide-react";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var ToastContext = createContext(null);
var nextToastId = 1;
function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be called inside <ToastProvider>.");
  }
  return context;
}
function ToastProvider({
  children,
  duration = 4e3,
  swipeDirection = "right",
  ...props
}) {
  const [items, setItems] = useState([]);
  const dismiss = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);
  const toast = useCallback((input) => {
    const id = nextToastId++;
    setItems((current) => [...current, { ...input, id }]);
    return id;
  }, []);
  const context = useMemo(
    () => ({ toast, dismiss }),
    [dismiss, toast]
  );
  return /* @__PURE__ */ jsxs(
    RToast.Provider,
    {
      ...props,
      duration,
      swipeDirection,
      children: [
        /* @__PURE__ */ jsxs(ToastContext.Provider, { value: context, children: [
          children,
          items.map(({ id, description, onOpenChange, ...item }) => /* @__PURE__ */ jsx(
            Toast,
            {
              ...item,
              open: true,
              onOpenChange: (open) => {
                onOpenChange?.(open);
                if (!open) dismiss(id);
              },
              children: description
            },
            id
          ))
        ] }),
        /* @__PURE__ */ jsx(RToast.Viewport, { className: "ms-toast-viewport" })
      ]
    }
  );
}
var Toast = forwardRef(function Toast2({
  title,
  kind = "info",
  action,
  actionAltText,
  onAction,
  closeLabel = "Dismiss notification",
  children,
  className,
  style,
  type,
  ...rest
}, ref) {
  const reducedMotion = useReducedMotionConfig();
  const announcementType = type ?? (kind === "error" ? "foreground" : "background");
  const Icon = kind === "error" ? AlertCircle : kind === "success" ? Check : Info;
  return /* @__PURE__ */ jsxs(
    RToast.Root,
    {
      ...rest,
      ref,
      type: announcementType,
      className: cx("ms-toast", className),
      "data-kind": kind,
      "data-reduced-motion": reducedMotion ? "true" : void 0,
      style: reducedMotion ? { ...style, animation: "none" } : style,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "ms-toast__icon",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx(Icon, { size: 12, strokeWidth: 2 })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "ms-toast__content", children: [
          title != null && /* @__PURE__ */ jsx(RToast.Title, { className: "ms-toast__title", children: title }),
          children != null && /* @__PURE__ */ jsx(RToast.Description, { className: "ms-toast__description", children })
        ] }),
        action != null && actionAltText != null && /* @__PURE__ */ jsx(
          RToast.Action,
          {
            altText: actionAltText,
            className: "ms-toast__action",
            onClick: onAction,
            children: action
          }
        ),
        /* @__PURE__ */ jsx(RToast.Close, { className: "ms-toast__close", "aria-label": closeLabel, children: /* @__PURE__ */ jsx(X, { "aria-hidden": "true", size: 14, strokeWidth: 2 }) })
      ]
    }
  );
});

export {
  useToast,
  ToastProvider,
  Toast
};
//# sourceMappingURL=chunk-25PCQU2E.js.map