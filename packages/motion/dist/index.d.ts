/**
 * Monoset motion presets. Values mirror `--ease-*` and `--duration-*` tokens.
 * Usage:
 *   import { hoverLift, pressDown, fadeUp } from "@monoset/motion";
 *   <motion.button whileHover={hoverLift} whileTap={pressDown}>…</motion.button>
 */
declare const EASE_STANDARD: readonly [0.2, 0, 0, 1];
declare const EASE_EMPHASIS: readonly [0.3, 0, 0, 1];
declare const EASE_EXIT: readonly [0.4, 0, 1, 1];
declare const DUR: {
    /** 120 ms — hover colour shifts, border transitions */
    readonly fast: 0.12;
    /** 180 ms — menu / popover enter */
    readonly base: 0.18;
    /** 280 ms — modal enter */
    readonly slow: 0.28;
};
/** Fade + 8 px rise. Use for first-paint reveals. */
declare const fadeUp: {
    readonly hidden: {
        readonly opacity: 0;
        readonly y: 8;
    };
    readonly visible: {
        readonly opacity: 1;
        readonly y: 0;
        readonly transition: {
            readonly duration: 0.28;
            readonly ease: readonly [0.3, 0, 0, 1];
        };
    };
};
/** Soft 2 px lift — use on `whileHover`. */
declare const hoverLift: {
    readonly y: -2;
    readonly transition: {
        readonly duration: 0.12;
        readonly ease: readonly [0.2, 0, 0, 1];
    };
};
/** Monoset press: shade one step via brightness — no scale, no translate. */
declare const pressDown: {
    readonly filter: "brightness(0.88)";
    readonly transition: {
        readonly duration: 0.12;
        readonly ease: readonly [0.2, 0, 0, 1];
    };
};
/** Common enter / exit pair for popovers and menus. */
declare const popoverIn: {
    readonly initial: {
        readonly opacity: 0;
        readonly y: -4;
    };
    readonly animate: {
        readonly opacity: 1;
        readonly y: 0;
        readonly transition: {
            readonly duration: 0.18;
            readonly ease: readonly [0.3, 0, 0, 1];
        };
    };
    readonly exit: {
        readonly opacity: 0;
        readonly y: -4;
        readonly transition: {
            readonly duration: 0.12;
            readonly ease: readonly [0.4, 0, 1, 1];
        };
    };
};
/** Modal scrim + panel */
declare const modalPanel: {
    readonly initial: {
        readonly opacity: 0;
        readonly y: 8;
        readonly scale: 0.985;
    };
    readonly animate: {
        readonly opacity: 1;
        readonly y: 0;
        readonly scale: 1;
        readonly transition: {
            readonly duration: 0.28;
            readonly ease: readonly [0.3, 0, 0, 1];
        };
    };
    readonly exit: {
        readonly opacity: 0;
        readonly y: 4;
        readonly scale: 0.99;
        readonly transition: {
            readonly duration: 0.18;
            readonly ease: readonly [0.4, 0, 1, 1];
        };
    };
};
declare const modalScrim: {
    readonly initial: {
        readonly opacity: 0;
    };
    readonly animate: {
        readonly opacity: 1;
        readonly transition: {
            readonly duration: 0.28;
            readonly ease: readonly [0.3, 0, 0, 1];
        };
    };
    readonly exit: {
        readonly opacity: 0;
        readonly transition: {
            readonly duration: 0.18;
            readonly ease: readonly [0.4, 0, 1, 1];
        };
    };
};
/** Stagger children by 40 ms under an AnimatePresence parent. */
declare const listStagger: {
    readonly animate: {
        readonly transition: {
            readonly staggerChildren: 0.04;
        };
    };
};
/** Slide in from the left. Use for drawer/panel enters. */
declare const slideInLeft: {
    readonly initial: {
        readonly opacity: 0;
        readonly x: -16;
    };
    readonly animate: {
        readonly opacity: 1;
        readonly x: 0;
        readonly transition: {
            readonly duration: 0.28;
            readonly ease: readonly [0.3, 0, 0, 1];
        };
    };
    readonly exit: {
        readonly opacity: 0;
        readonly x: -16;
        readonly transition: {
            readonly duration: 0.18;
            readonly ease: readonly [0.4, 0, 1, 1];
        };
    };
};
/** Slide in from the right. */
declare const slideInRight: {
    readonly initial: {
        readonly opacity: 0;
        readonly x: 16;
    };
    readonly animate: {
        readonly opacity: 1;
        readonly x: 0;
        readonly transition: {
            readonly duration: 0.28;
            readonly ease: readonly [0.3, 0, 0, 1];
        };
    };
    readonly exit: {
        readonly opacity: 0;
        readonly x: 16;
        readonly transition: {
            readonly duration: 0.18;
            readonly ease: readonly [0.4, 0, 1, 1];
        };
    };
};
/** Slide in from the top. */
declare const slideInTop: {
    readonly initial: {
        readonly opacity: 0;
        readonly y: -16;
    };
    readonly animate: {
        readonly opacity: 1;
        readonly y: 0;
        readonly transition: {
            readonly duration: 0.28;
            readonly ease: readonly [0.3, 0, 0, 1];
        };
    };
    readonly exit: {
        readonly opacity: 0;
        readonly y: -16;
        readonly transition: {
            readonly duration: 0.18;
            readonly ease: readonly [0.4, 0, 1, 1];
        };
    };
};
/** Slide in from the bottom. */
declare const slideInBottom: {
    readonly initial: {
        readonly opacity: 0;
        readonly y: 16;
    };
    readonly animate: {
        readonly opacity: 1;
        readonly y: 0;
        readonly transition: {
            readonly duration: 0.28;
            readonly ease: readonly [0.3, 0, 0, 1];
        };
    };
    readonly exit: {
        readonly opacity: 0;
        readonly y: 16;
        readonly transition: {
            readonly duration: 0.18;
            readonly ease: readonly [0.4, 0, 1, 1];
        };
    };
};
/** Scale up from 95% -- use for cards, images, hero reveals. */
declare const scaleIn: {
    readonly initial: {
        readonly opacity: 0;
        readonly scale: 0.95;
    };
    readonly animate: {
        readonly opacity: 1;
        readonly scale: 1;
        readonly transition: {
            readonly duration: 0.28;
            readonly ease: readonly [0.3, 0, 0, 1];
        };
    };
    readonly exit: {
        readonly opacity: 0;
        readonly scale: 0.95;
        readonly transition: {
            readonly duration: 0.18;
            readonly ease: readonly [0.4, 0, 1, 1];
        };
    };
};

export { DUR, EASE_EMPHASIS, EASE_EXIT, EASE_STANDARD, fadeUp, hoverLift, listStagger, modalPanel, modalScrim, popoverIn, pressDown, scaleIn, slideInBottom, slideInLeft, slideInRight, slideInTop };
