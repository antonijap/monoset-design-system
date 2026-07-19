import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Layout.tsx
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var DEFAULT_GRID_MIN_WIDTH = "240px";
var CSS_LENGTH = /^(?:0|(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em|ch|ex|cap|ic|lh|rlh|vw|vh|vi|vb|vmin|vmax|svw|svh|lvw|lvh|dvw|dvh|cm|mm|q|in|pc|pt|%))$/i;
var CSS_SIZE_KEYWORD = /^(?:auto|min-content|max-content)$/i;
var CSS_SIZE_FUNCTION = /^(?:var|calc|min|max|clamp|fit-content)\(.+\)$/i;
function normalizeColumns(columns) {
  if (columns === void 0 || !Number.isFinite(columns)) return void 0;
  return Math.max(1, Math.trunc(columns));
}
function hasBalancedParentheses(value) {
  let depth = 0;
  for (const character of value) {
    if (character === "(") depth += 1;
    if (character === ")") depth -= 1;
    if (depth < 0) return false;
  }
  return depth === 0;
}
function normalizeMinWidth(minWidth) {
  if (typeof minWidth === "number") {
    return Number.isFinite(minWidth) && minWidth >= 0 ? `${minWidth}px` : DEFAULT_GRID_MIN_WIDTH;
  }
  const value = minWidth.trim();
  if (value.length === 0 || /[;{}]/.test(value) || !hasBalancedParentheses(value) || !CSS_LENGTH.test(value) && !CSS_SIZE_KEYWORD.test(value) && !CSS_SIZE_FUNCTION.test(value)) {
    return DEFAULT_GRID_MIN_WIDTH;
  }
  return value;
}
var Stack = forwardRef(function Stack2({ gap = 4, align, style, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx("ms-stack", className),
      style: {
        gap: `var(--space-${gap})`,
        alignItems: align,
        ...style
      },
      ...rest
    }
  );
});
var Inline = forwardRef(function Inline2({ gap = 4, align, wrap = true, style, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx("ms-inline", wrap && "ms-inline--wrap", className),
      style: {
        gap: `var(--space-${gap})`,
        alignItems: align,
        ...style
      },
      ...rest
    }
  );
});
var Grid = forwardRef(function Grid2({ columns, minWidth = 240, gap = 4, style, className, ...rest }, ref) {
  const normalizedColumns = normalizeColumns(columns);
  const min = normalizeMinWidth(minWidth);
  const template = normalizedColumns === void 0 ? `repeat(auto-fit, minmax(${min}, 1fr))` : `repeat(${normalizedColumns}, 1fr)`;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx("ms-grid", className),
      style: {
        gridTemplateColumns: template,
        gap: `var(--space-${gap})`,
        ...style
      },
      ...rest
    }
  );
});
var Container = forwardRef(function Container2({ size = "lg", padding = true, style, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx("ms-container", padding && "ms-container--padded", className),
      style: {
        maxWidth: `var(--container-${size})`,
        ...style
      },
      ...rest
    }
  );
});

export {
  Stack,
  Inline,
  Grid,
  Container
};
//# sourceMappingURL=chunk-S6DB5H56.js.map