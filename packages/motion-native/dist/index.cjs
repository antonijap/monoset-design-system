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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DUR: () => DUR,
  EASE_EMPHASIS: () => EASE_EMPHASIS,
  EASE_EXIT: () => EASE_EXIT,
  EASE_STANDARD: () => EASE_STANDARD,
  fadeIn: () => fadeIn,
  fadeUp: () => fadeUp,
  scaleIn: () => scaleIn,
  slideInBottom: () => slideInBottom,
  slideInLeft: () => slideInLeft,
  slideInRight: () => slideInRight,
  slideInTop: () => slideInTop,
  withMonosetTiming: () => withMonosetTiming
});
module.exports = __toCommonJS(index_exports);
var import_react_native_reanimated = require("react-native-reanimated");
var EASE_STANDARD = import_react_native_reanimated.Easing.bezier(0.2, 0, 0, 1);
var EASE_EMPHASIS = import_react_native_reanimated.Easing.bezier(0.3, 0, 0, 1);
var EASE_EXIT = import_react_native_reanimated.Easing.bezier(0.4, 0, 1, 1);
var DUR = {
  /** 120 ms -- press, hover-equivalent transitions */
  fast: 120,
  /** 180 ms -- menus, popovers, tooltips entering */
  base: 180,
  /** 280 ms -- modals, sheets, page transitions */
  slow: 280
};
var fadeUp = import_react_native_reanimated.FadeInDown.duration(DUR.slow).easing(EASE_EMPHASIS);
var fadeIn = import_react_native_reanimated.FadeIn.duration(DUR.slow).easing(EASE_EMPHASIS);
var slideInLeft = import_react_native_reanimated.SlideInLeft.duration(DUR.slow).easing(EASE_EMPHASIS);
var slideInRight = import_react_native_reanimated.SlideInRight.duration(DUR.slow).easing(EASE_EMPHASIS);
var slideInTop = import_react_native_reanimated.SlideInUp.duration(DUR.slow).easing(EASE_EMPHASIS);
var slideInBottom = import_react_native_reanimated.SlideInDown.duration(DUR.slow).easing(EASE_EMPHASIS);
var scaleIn = import_react_native_reanimated.ZoomIn.duration(DUR.slow).easing(EASE_EMPHASIS);
function withMonosetTiming(speed = "base", curve = "emphasis") {
  const easing = curve === "standard" ? EASE_STANDARD : curve === "exit" ? EASE_EXIT : EASE_EMPHASIS;
  return { duration: DUR[speed], easing };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DUR,
  EASE_EMPHASIS,
  EASE_EXIT,
  EASE_STANDARD,
  fadeIn,
  fadeUp,
  scaleIn,
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideInTop,
  withMonosetTiming
});
//# sourceMappingURL=index.cjs.map