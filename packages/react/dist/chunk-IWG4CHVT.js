// src/Motion.tsx
import {
  forwardRef,
  useRef
} from "react";
import {
  motion,
  useComposedRefs,
  useInView,
  useReducedMotionConfig
} from "framer-motion";
import { fadeUp } from "@monoset/motion";
import { jsx } from "react/jsx-runtime";
function addDelay(variants, delay) {
  const visible = variants.visible;
  if (!delay || !visible || typeof visible === "function") return variants;
  return {
    ...variants,
    visible: {
      ...visible,
      transition: {
        ...visible.transition,
        delay
      }
    }
  };
}
var Reveal = forwardRef(function Reveal2({
  children,
  variant = fadeUp,
  once = true,
  margin = "-80px",
  delay = 0,
  ...rest
}, forwardedRef) {
  const localRef = useRef(null);
  const ref = useComposedRefs(localRef, forwardedRef);
  const inView = useInView(localRef, { once, margin });
  const reducedMotion = useReducedMotionConfig();
  const resolvedVariant = addDelay(variant, delay);
  if (reducedMotion) {
    return /* @__PURE__ */ jsx("div", { ...rest, ref, "data-reduced-motion": "true", children });
  }
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ...rest,
      ref,
      initial: "hidden",
      animate: inView ? "visible" : "hidden",
      variants: resolvedVariant,
      children
    }
  );
});
Reveal.displayName = "Reveal";

export {
  Reveal
};
//# sourceMappingURL=chunk-IWG4CHVT.js.map