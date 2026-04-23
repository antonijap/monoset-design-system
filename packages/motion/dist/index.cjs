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
  fadeUp: () => fadeUp,
  hoverLift: () => hoverLift,
  listStagger: () => listStagger,
  modalPanel: () => modalPanel,
  modalScrim: () => modalScrim,
  popoverIn: () => popoverIn,
  pressDown: () => pressDown,
  scaleIn: () => scaleIn,
  slideInBottom: () => slideInBottom,
  slideInLeft: () => slideInLeft,
  slideInRight: () => slideInRight,
  slideInTop: () => slideInTop
});
module.exports = __toCommonJS(index_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.cjs.map