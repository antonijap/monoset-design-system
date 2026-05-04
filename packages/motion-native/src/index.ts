/**
 * Monoset motion presets for React Native via Reanimated 3.
 *
 * Mirrors @monoset/motion's web presets: same easing curves, same durations,
 * same names. The shape differs because Reanimated's API is different --
 * use these via Animated.View `entering` and `exiting` props.
 *
 * Usage:
 *   import Animated from "react-native-reanimated";
 *   import { fadeUp, slideInRight } from "@monoset/motion-native";
 *
 *   <Animated.View entering={fadeUp}>...</Animated.View>
 *   <Animated.View entering={slideInRight}>...</Animated.View>
 */

import {
  Easing,
  FadeIn,
  FadeInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideInDown,
  ZoomIn,
} from "react-native-reanimated";

/* ─── Easing curves ─────────────────────────────────────────────── */

/** cubic-bezier(0.2, 0, 0, 1) -- hover, color, border transitions */
export const EASE_STANDARD = Easing.bezier(0.2, 0, 0, 1);
/** cubic-bezier(0.3, 0, 0, 1) -- opening overlays, menus */
export const EASE_EMPHASIS = Easing.bezier(0.3, 0, 0, 1);
/** cubic-bezier(0.4, 0, 1, 1) -- closing, dismissing */
export const EASE_EXIT = Easing.bezier(0.4, 0, 1, 1);

/* ─── Durations (milliseconds) ──────────────────────────────────── */

export const DUR = {
  /** 120 ms -- press, hover-equivalent transitions */
  fast: 120,
  /** 180 ms -- menus, popovers, tooltips entering */
  base: 180,
  /** 280 ms -- modals, sheets, page transitions */
  slow: 280,
} as const;

/* ─── Entering presets ──────────────────────────────────────────── */

/** Fade + 8px rise. Use for first-paint reveals. */
export const fadeUp = FadeInDown.duration(DUR.slow).easing(EASE_EMPHASIS);

/** Plain fade. */
export const fadeIn = FadeIn.duration(DUR.slow).easing(EASE_EMPHASIS);

/** Slide in from the left. Drawer / panel enters. */
export const slideInLeft = SlideInLeft.duration(DUR.slow).easing(EASE_EMPHASIS);

/** Slide in from the right. */
export const slideInRight = SlideInRight.duration(DUR.slow).easing(EASE_EMPHASIS);

/** Slide in from the top. */
export const slideInTop = SlideInUp.duration(DUR.slow).easing(EASE_EMPHASIS);

/** Slide in from the bottom. */
export const slideInBottom = SlideInDown.duration(DUR.slow).easing(EASE_EMPHASIS);

/** Scale up from 95%. Cards, hero reveals. */
export const scaleIn = ZoomIn.duration(DUR.slow).easing(EASE_EMPHASIS);

/* ─── Helpers ───────────────────────────────────────────────────── */

/**
 * withMonosetTiming -- a `withTiming` config helper. Returns the {duration,easing}
 * object that Reanimated's `withTiming` expects, using Monoset's standard values.
 *
 * Example:
 *   const opacity = useSharedValue(0);
 *   opacity.value = withTiming(1, withMonosetTiming("base"));
 */
export function withMonosetTiming(speed: keyof typeof DUR = "base", curve: "standard" | "emphasis" | "exit" = "emphasis") {
  const easing = curve === "standard" ? EASE_STANDARD : curve === "exit" ? EASE_EXIT : EASE_EMPHASIS;
  return { duration: DUR[speed], easing };
}
