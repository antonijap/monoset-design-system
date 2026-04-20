// src/index.ts
var EASE_STANDARD = [0.2, 0, 0, 1];
var EASE_EMPHASIS = [0.3, 0, 0, 1];
var EASE_EXIT = [0.4, 0, 1, 1];
var DUR = {
  /** 120 ms — hover colour shifts, border transitions */
  fast: 0.12,
  /** 180 ms — menu / popover enter */
  base: 0.18,
  /** 280 ms — modal enter */
  slow: 0.28
};
var fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE_EMPHASIS }
  }
};
var hoverLift = {
  y: -2,
  transition: { duration: DUR.fast, ease: EASE_STANDARD }
};
var pressDown = {
  filter: "brightness(0.88)",
  transition: { duration: DUR.fast, ease: EASE_STANDARD }
};
var popoverIn = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_EMPHASIS } },
  exit: { opacity: 0, y: -4, transition: { duration: DUR.fast, ease: EASE_EXIT } }
};
var modalPanel = {
  initial: { opacity: 0, y: 8, scale: 0.985 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DUR.slow, ease: EASE_EMPHASIS }
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.99,
    transition: { duration: DUR.base, ease: EASE_EXIT }
  }
};
var modalScrim = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit: { opacity: 0, transition: { duration: DUR.base, ease: EASE_EXIT } }
};
var listStagger = {
  animate: {
    transition: { staggerChildren: 0.04 }
  }
};
export {
  DUR,
  EASE_EMPHASIS,
  EASE_EXIT,
  EASE_STANDARD,
  fadeUp,
  hoverLift,
  listStagger,
  modalPanel,
  modalScrim,
  popoverIn,
  pressDown
};
//# sourceMappingURL=index.js.map