import {
  ReducedMotionPreferenceContext
} from "./chunk-6R6U55G4.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Button.tsx
import {
  forwardRef,
  useContext,
  useSyncExternalStore
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var reducedMotionQuery = "(prefers-reduced-motion: reduce)";
var subscribeToHydration = () => () => {
};
var getHydratedSnapshot = () => true;
var getServerHydratedSnapshot = () => false;
function subscribeToReducedMotion(onStoreChange) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {
    };
  }
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}
function getReducedMotionSnapshot() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(reducedMotionQuery).matches : false;
}
function LoadingSpinner() {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerHydratedSnapshot
  );
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => true
  );
  const reducedMotion = useContext(ReducedMotionPreferenceContext);
  const reduceMotion = reducedMotion === "always" || reducedMotion !== "never" && prefersReducedMotion;
  const animate = hydrated && !reduceMotion;
  return /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": true, children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "9", opacity: "0.25" }),
    /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 0 1-9 9", children: animate && /* @__PURE__ */ jsx("animateTransform", { attributeName: "transform", type: "rotate", from: "0 12 12", to: "360 12 12", dur: "0.9s", repeatCount: "indefinite" }) })
  ] });
}
var Button = forwardRef(function Button2({
  variant = "secondary",
  size = "md",
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled,
  "aria-busy": ariaBusy,
  className,
  children,
  type = "button",
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ...rest,
      ref,
      type,
      disabled: disabled || loading,
      "aria-busy": loading ? true : ariaBusy,
      className: cx("ms-btn", `ms-btn--${variant}`, `ms-btn--${size}`, className),
      children: [
        loading ? /* @__PURE__ */ jsx(LoadingSpinner, {}) : leadingIcon,
        children,
        !loading && trailingIcon
      ]
    }
  );
});

export {
  Button
};
//# sourceMappingURL=chunk-ZMMN74MV.js.map