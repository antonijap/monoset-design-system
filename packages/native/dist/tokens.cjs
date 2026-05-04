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

// src/tokens.ts
var tokens_exports = {};
__export(tokens_exports, {
  colors: () => colors,
  default: () => tokens_default,
  fontSize: () => fontSize,
  fontWeight: () => fontWeight,
  lineHeight: () => lineHeight,
  mono: () => mono,
  radius: () => radius,
  shadow: () => shadow,
  space: () => space,
  tokens: () => tokens
});
module.exports = __toCommonJS(tokens_exports);
var mono = {
  0: "#ffffff",
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e8e8ea",
  300: "#d4d4d7",
  400: "#a1a1a6",
  500: "#71717a",
  600: "#52525a",
  700: "#3f3f45",
  800: "#27272b",
  900: "#18181b",
  1e3: "#09090b"
};
var colors = {
  bg: mono[0],
  bgSubtle: mono[50],
  bgMuted: mono[100],
  fg1: mono[1e3],
  // primary text
  fg2: mono[700],
  // body text
  fg3: mono[500],
  // secondary / meta
  fg4: mono[400],
  // placeholder
  borderSubtle: mono[200],
  border: mono[300],
  accent: mono[1e3],
  accentFg: mono[0],
  accentHover: mono[800],
  statusSuccess: "#2e4a33",
  statusWarning: "#7a5a1a",
  statusDanger: "#a83232"
};
var space = {
  0: 0,
  1: 2,
  2: 4,
  3: 8,
  4: 12,
  5: 16,
  6: 20,
  7: 24,
  8: 32,
  9: 40,
  10: 48,
  11: 64,
  12: 80,
  13: 96,
  14: 128
};
var radius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999
};
var fontSize = {
  xs: 11,
  // iOS Caption 2
  sm: 13,
  // iOS Footnote
  base: 17,
  // iOS Body — the default for almost every text element
  lg: 20,
  // iOS Title 3
  xl: 22,
  // iOS Title 2
  "2xl": 28,
  // iOS Title 1
  "3xl": 34,
  // iOS Large Title
  "4xl": 44,
  "5xl": 56
};
var fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700"
};
var lineHeight = {
  tight: 1.15,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.7
};
var shadow = {
  sm: {
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  md: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  lg: {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6
  }
};
var tokens = {
  mono,
  colors,
  space,
  radius,
  fontSize,
  fontWeight,
  lineHeight,
  shadow
};
var tokens_default = tokens;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  colors,
  fontSize,
  fontWeight,
  lineHeight,
  mono,
  radius,
  shadow,
  space,
  tokens
});
//# sourceMappingURL=tokens.cjs.map