// src/index.ts
import {
  Easing,
  FadeIn,
  FadeInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideInDown,
  ZoomIn
} from "react-native-reanimated";
var EASE_STANDARD = Easing.bezier(0.2, 0, 0, 1);
var EASE_EMPHASIS = Easing.bezier(0.3, 0, 0, 1);
var EASE_EXIT = Easing.bezier(0.4, 0, 1, 1);
var DUR = {
  /** 120 ms -- press, hover-equivalent transitions */
  fast: 120,
  /** 180 ms -- menus, popovers, tooltips entering */
  base: 180,
  /** 280 ms -- modals, sheets, page transitions */
  slow: 280
};
var fadeUp = FadeInDown.duration(DUR.slow).easing(EASE_EMPHASIS);
var fadeIn = FadeIn.duration(DUR.slow).easing(EASE_EMPHASIS);
var slideInLeft = SlideInLeft.duration(DUR.slow).easing(EASE_EMPHASIS);
var slideInRight = SlideInRight.duration(DUR.slow).easing(EASE_EMPHASIS);
var slideInTop = SlideInUp.duration(DUR.slow).easing(EASE_EMPHASIS);
var slideInBottom = SlideInDown.duration(DUR.slow).easing(EASE_EMPHASIS);
var scaleIn = ZoomIn.duration(DUR.slow).easing(EASE_EMPHASIS);
function withMonosetTiming(speed = "base", curve = "emphasis") {
  const easing = curve === "standard" ? EASE_STANDARD : curve === "exit" ? EASE_EXIT : EASE_EMPHASIS;
  return { duration: DUR[speed], easing };
}
export {
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
};
//# sourceMappingURL=index.js.map