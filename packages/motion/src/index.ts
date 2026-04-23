/**
 * Monoset motion presets. Values mirror `--ease-*` and `--duration-*` tokens.
 * Usage:
 *   import { hoverLift, pressDown, fadeUp } from "@monoset/motion";
 *   <motion.button whileHover={hoverLift} whileTap={pressDown}>…</motion.button>
 */

export const EASE_STANDARD = [0.2, 0, 0, 1] as const;
export const EASE_EMPHASIS = [0.3, 0, 0, 1] as const;
export const EASE_EXIT     = [0.4, 0, 1, 1] as const;

export const DUR = {
  /** 120 ms — hover colour shifts, border transitions */
  fast: 0.12,
  /** 180 ms — menu / popover enter */
  base: 0.18,
  /** 280 ms — modal enter */
  slow: 0.28,
} as const;

/** Fade + 8 px rise. Use for first-paint reveals. */
export const fadeUp = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE_EMPHASIS },
  },
} as const;

/** Soft 2 px lift — use on `whileHover`. */
export const hoverLift = {
  y: -2,
  transition: { duration: DUR.fast, ease: EASE_STANDARD },
} as const;

/** Monoset press: shade one step via brightness — no scale, no translate. */
export const pressDown = {
  filter: "brightness(0.88)",
  transition: { duration: DUR.fast, ease: EASE_STANDARD },
} as const;

/** Common enter / exit pair for popovers and menus. */
export const popoverIn = {
  initial:  { opacity: 0, y: -4 },
  animate:  { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_EMPHASIS } },
  exit:     { opacity: 0, y: -4, transition: { duration: DUR.fast, ease: EASE_EXIT } },
} as const;

/** Modal scrim + panel */
export const modalPanel = {
  initial:  { opacity: 0, y: 8, scale: 0.985 },
  animate:  { opacity: 1, y: 0, scale: 1,
              transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit:     { opacity: 0, y: 4, scale: 0.99,
              transition: { duration: DUR.base, ease: EASE_EXIT } },
} as const;

export const modalScrim = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit:    { opacity: 0, transition: { duration: DUR.base, ease: EASE_EXIT } },
} as const;

/** Stagger children by 40 ms under an AnimatePresence parent. */
export const listStagger = {
  animate: {
    transition: { staggerChildren: 0.04 },
  },
} as const;

/** Slide in from the left. Use for drawer/panel enters. */
export const slideInLeft = {
  initial:  { opacity: 0, x: -16 },
  animate:  { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit:     { opacity: 0, x: -16, transition: { duration: DUR.base, ease: EASE_EXIT } },
} as const;

/** Slide in from the right. */
export const slideInRight = {
  initial:  { opacity: 0, x: 16 },
  animate:  { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit:     { opacity: 0, x: 16, transition: { duration: DUR.base, ease: EASE_EXIT } },
} as const;

/** Slide in from the top. */
export const slideInTop = {
  initial:  { opacity: 0, y: -16 },
  animate:  { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit:     { opacity: 0, y: -16, transition: { duration: DUR.base, ease: EASE_EXIT } },
} as const;

/** Slide in from the bottom. */
export const slideInBottom = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit:     { opacity: 0, y: 16, transition: { duration: DUR.base, ease: EASE_EXIT } },
} as const;

/** Scale up from 95% -- use for cards, images, hero reveals. */
export const scaleIn = {
  initial:  { opacity: 0, scale: 0.95 },
  animate:  { opacity: 1, scale: 1, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit:     { opacity: 0, scale: 0.95, transition: { duration: DUR.base, ease: EASE_EXIT } },
} as const;
