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
var slideInLeft = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit: { opacity: 0, x: -16, transition: { duration: DUR.base, ease: EASE_EXIT } }
};
var slideInRight = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit: { opacity: 0, x: 16, transition: { duration: DUR.base, ease: EASE_EXIT } }
};
var slideInTop = {
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit: { opacity: 0, y: -16, transition: { duration: DUR.base, ease: EASE_EXIT } }
};
var slideInBottom = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit: { opacity: 0, y: 16, transition: { duration: DUR.base, ease: EASE_EXIT } }
};
var scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: DUR.slow, ease: EASE_EMPHASIS } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: DUR.base, ease: EASE_EXIT } }
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
  pressDown,
  scaleIn,
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideInTop
};
//# sourceMappingURL=index.js.map