import * as react_native_reanimated from 'react-native-reanimated';
import { FadeIn, FadeInDown, ZoomIn, SlideInDown, SlideInLeft, SlideInRight, SlideInUp } from 'react-native-reanimated';

/** cubic-bezier(0.2, 0, 0, 1) -- hover, color, border transitions */
declare const EASE_STANDARD: react_native_reanimated.EasingFunctionFactory;
/** cubic-bezier(0.3, 0, 0, 1) -- opening overlays, menus */
declare const EASE_EMPHASIS: react_native_reanimated.EasingFunctionFactory;
/** cubic-bezier(0.4, 0, 1, 1) -- closing, dismissing */
declare const EASE_EXIT: react_native_reanimated.EasingFunctionFactory;
declare const DUR: {
    /** 120 ms -- press, hover-equivalent transitions */
    readonly fast: 120;
    /** 180 ms -- menus, popovers, tooltips entering */
    readonly base: 180;
    /** 280 ms -- modals, sheets, page transitions */
    readonly slow: 280;
};
/** Fade + 8px rise. Use for first-paint reveals. */
declare const fadeUp: FadeInDown;
/** Plain fade. */
declare const fadeIn: FadeIn;
/** Slide in from the left. Drawer / panel enters. */
declare const slideInLeft: SlideInLeft;
/** Slide in from the right. */
declare const slideInRight: SlideInRight;
/** Slide in from the top. */
declare const slideInTop: SlideInUp;
/** Slide in from the bottom. */
declare const slideInBottom: SlideInDown;
/** Scale up from 95%. Cards, hero reveals. */
declare const scaleIn: ZoomIn;
/**
 * withMonosetTiming -- a `withTiming` config helper. Returns the {duration,easing}
 * object that Reanimated's `withTiming` expects, using Monoset's standard values.
 *
 * Example:
 *   const opacity = useSharedValue(0);
 *   opacity.value = withTiming(1, withMonosetTiming("base"));
 */
declare function withMonosetTiming(speed?: keyof typeof DUR, curve?: "standard" | "emphasis" | "exit"): {
    duration: 120 | 180 | 280;
    easing: react_native_reanimated.EasingFunctionFactory;
};

export { DUR, EASE_EMPHASIS, EASE_EXIT, EASE_STANDARD, fadeIn, fadeUp, scaleIn, slideInBottom, slideInLeft, slideInRight, slideInTop, withMonosetTiming };
