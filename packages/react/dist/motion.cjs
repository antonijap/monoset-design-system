"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/motion-entry.ts
var motion_entry_exports = {};
__export(motion_entry_exports, {
  DUR: () => import_motion2.DUR,
  EASE_EMPHASIS: () => import_motion2.EASE_EMPHASIS,
  EASE_EXIT: () => import_motion2.EASE_EXIT,
  EASE_STANDARD: () => import_motion2.EASE_STANDARD,
  Reveal: () => Reveal,
  fadeUp: () => import_motion2.fadeUp,
  hoverLift: () => import_motion2.hoverLift,
  listStagger: () => import_motion2.listStagger,
  modalPanel: () => import_motion2.modalPanel,
  modalScrim: () => import_motion2.modalScrim,
  popoverIn: () => import_motion2.popoverIn,
  pressDown: () => import_motion2.pressDown,
  scaleIn: () => import_motion2.scaleIn,
  slideInBottom: () => import_motion2.slideInBottom,
  slideInLeft: () => import_motion2.slideInLeft,
  slideInRight: () => import_motion2.slideInRight,
  slideInTop: () => import_motion2.slideInTop
});
module.exports = __toCommonJS(motion_entry_exports);
var import_motion2 = require("@monoset/motion");

// src/Motion.tsx
var import_react = require("react");
var import_framer_motion = require("framer-motion");
var import_motion = require("@monoset/motion");
var import_jsx_runtime = require("react/jsx-runtime");
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
var Reveal = (0, import_react.forwardRef)(function Reveal2({
  children,
  variant = import_motion.fadeUp,
  once = true,
  margin = "-80px",
  delay = 0,
  ...rest
}, forwardedRef) {
  const localRef = (0, import_react.useRef)(null);
  const ref = (0, import_framer_motion.useComposedRefs)(localRef, forwardedRef);
  const inView = (0, import_framer_motion.useInView)(localRef, { once, margin });
  const reducedMotion = (0, import_framer_motion.useReducedMotionConfig)();
  const resolvedVariant = addDelay(variant, delay);
  if (reducedMotion) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...rest, ref, "data-reduced-motion": "true", children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_framer_motion.motion.div,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DUR,
  EASE_EMPHASIS,
  EASE_EXIT,
  EASE_STANDARD,
  Reveal,
  fadeUp,
  hoverLift,
  listStagger,
  modalPanel,
  modalScrim,
  popoverIn,
  pressDown,
  scaleIn,
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideInTop
});
//# sourceMappingURL=motion.cjs.map