// Monoset design tokens — generated, keep in sync with colors_and_type.css.
// These are the raw values. Consumer apps that want to use tokens in JS
// (inline styles, color picker previews, Canvas, etc.) can import from here.

export const mono = {
  0:    "#ffffff",
  50:   "#fafafa",
  100:  "#f4f4f5",
  200:  "#e8e8ea",
  300:  "#d4d4d7",
  400:  "#a1a1a6",
  500:  "#71717a",
  600:  "#52525a",
  700:  "#3f3f45",
  800:  "#27272b",
  900:  "#18181b",
  1000: "#09090b",
};

export const font = {
  sans: '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
};

export const text = {
  xs:  "11px", sm: "12px", base: "14px", md: "16px", lg: "18px",
  xl:  "22px", "2xl": "28px", "3xl": "36px", "4xl": "48px", "5xl": "64px",
};

export const weight = { regular: 400, medium: 500, semibold: 600, bold: 700 };

export const leading  = { tight: 1.15, snug: 1.3, normal: 1.5, relaxed: 1.65 };
export const tracking = { tight: "-0.02em", snug: "-0.01em", normal: 0, wide: "0.04em", widest: "0.12em" };

export const space = {
  0:  "0px",  1:  "2px",  2:  "4px",  3:  "8px",  4:  "12px", 5:  "16px", 6:  "20px",
  7:  "24px", 8:  "32px", 9:  "40px", 10: "48px", 11: "64px", 12: "80px", 13: "96px", 14: "128px",
};

export const radius = {
  none: "0px", xs: "2px", sm: "4px", md: "6px", lg: "10px", xl: "14px", full: "9999px",
};

export const shadow = {
  xs:    "0 1px 0 0 rgb(0 0 0 / 0.04)",
  sm:    "0 1px 2px 0 rgb(0 0 0 / 0.06)",
  md:    "0 2px 6px -1px rgb(0 0 0 / 0.08), 0 1px 2px 0 rgb(0 0 0 / 0.04)",
  lg:    "0 10px 24px -6px rgb(0 0 0 / 0.10), 0 2px 6px -2px rgb(0 0 0 / 0.06)",
  xl:    "0 24px 48px -12px rgb(0 0 0 / 0.18)",
  inset: "inset 0 0 0 1px rgb(0 0 0 / 0.04)",
};

export const easing = {
  standard: [0.2, 0, 0, 1],
  emphasis: [0.3, 0, 0, 1],
  exit:     [0.4, 0, 1, 1],
};

export const duration = { fast: 120, base: 180, slow: 280 };

export const container = { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" };

export const z = { base: 0, raised: 10, sticky: 100, overlay: 1000, modal: 1100, popover: 1200, toast: 1300 };

const tokens = { mono, font, text, weight, leading, tracking, space, radius, shadow, easing, duration, container, z };
export default tokens;
