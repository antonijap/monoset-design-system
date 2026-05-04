/**
 * Monoset design tokens for React Native.
 * Exported as plain JS so they're usable in StyleSheet, Animated, or any RN context.
 *
 * Mirror of the web kit's @monoset/tokens (--mono-*, --space-*, --radius-*, etc.)
 * with the same step values. Numbers in spacing/radius are in pixels.
 */

/* ─── Neutral ramp ──────────────────────────────────────────────── */

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
} as const;

/* ─── Semantic colors (light mode) ──────────────────────────────── */

export const colors = {
  bg:           mono[0],
  bgSubtle:     mono[50],
  bgMuted:      mono[100],

  fg1:          mono[1000],   // primary text
  fg2:          mono[700],    // body text
  fg3:          mono[500],    // secondary / meta
  fg4:          mono[400],    // placeholder

  borderSubtle: mono[200],
  border:       mono[300],

  accent:       mono[1000],
  accentFg:     mono[0],
  accentHover:  mono[800],

  statusSuccess: "#2e4a33",
  statusWarning: "#7a5a1a",
  statusDanger:  "#a83232",
} as const;

/* ─── Spacing (4px grid, matching web --space-*) ────────────────── */

export const space = {
  0:  0,
  1:  2,
  2:  4,
  3:  8,
  4:  12,
  5:  16,
  6:  20,
  7:  24,
  8:  32,
  9:  40,
  10: 48,
  11: 64,
  12: 80,
  13: 96,
  14: 128,
} as const;

/* ─── Border radius ─────────────────────────────────────────────── */

export const radius = {
  none: 0,
  xs:   2,
  sm:   4,
  md:   6,
  lg:   8,
  xl:   12,
  full: 9999,
} as const;

/* ─── Type scale (iOS HIG-aligned; native is set ~3pt above the web kit) ─ */

export const fontSize = {
  xs:   11,    // iOS Caption 2
  sm:   13,    // iOS Footnote
  base: 17,    // iOS Body — the default for almost every text element
  lg:   20,    // iOS Title 3
  xl:   22,    // iOS Title 2
  "2xl": 28,   // iOS Title 1
  "3xl": 34,   // iOS Large Title
  "4xl": 44,
  "5xl": 56,
} as const;

export const fontWeight = {
  regular:  "400",
  medium:   "500",
  semibold: "600",
  bold:     "700",
} as const;

export const lineHeight = {
  tight:  1.15,
  snug:   1.3,
  normal: 1.5,
  relaxed: 1.7,
} as const;

/* ─── Shadows (RN-shaped, both iOS + Android) ───────────────────── */

export const shadow = {
  sm: {
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
} as const;

/* ─── Theme bundle ──────────────────────────────────────────────── */

export const tokens = {
  mono,
  colors,
  space,
  radius,
  fontSize,
  fontWeight,
  lineHeight,
  shadow,
} as const;

export type Tokens = typeof tokens;

export default tokens;
