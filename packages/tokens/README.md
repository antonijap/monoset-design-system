# @monoset/tokens

CSS variables and raw token values for Monoset.

## Install

```bash
npm install @monoset/tokens
```

## CSS entries

Import only the layers your app needs:

```css
@import "@monoset/tokens/variables.css";
@import "@monoset/tokens/base.css";
@import "@monoset/tokens/typography.css";
```

- `variables.css` contains token declarations and dark-theme values.
- `base.css` adds optional page colors, smoothing, selection, and divider defaults.
- `typography.css` adds optional type and text-element defaults.
- `css` is the compatibility entry. It imports all three layers in that order.

The package does not bundle fonts or download them at runtime. The font-family variables include `Inter` and `JetBrains Mono` in their fallback stacks. Load those fonts in your app, or override `--font-sans` and `--font-mono`.

```css
@import "@monoset/tokens/variables.css";

.my-button {
  background: var(--mono-1000);
  color: var(--mono-0);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  transition: background var(--duration-fast) var(--ease-standard);
}
```

## JavaScript

```js
import { mono, space, radius, shadow } from "@monoset/tokens";

const styles = {
  background: mono[1000],
  padding: `${space[3]} ${space[5]}`,
  borderRadius: radius.md,
  boxShadow: shadow.md,
};
```

## JSON

```js
import tokens from "@monoset/tokens/json";
```

## What's included

| Category | Tokens |
| --- | --- |
| Color | `--mono-0` to `--mono-1000` plus semantic surface, text, border, and accent values |
| Type | `--text-xs` to `--text-5xl`, weights, leading, tracking, and font families |
| Space | `--space-0` to `--space-14` |
| Radius | `--radius-none` to `--radius-xl` plus `--radius-full` |
| Shadow | `--shadow-xs` to `--shadow-xl` plus `--shadow-inset` |
| Motion | durations and easing curves |
| Layout | container widths and z-index values |

## Dark theme

Add either selector to the subtree that needs dark values:

```html
<div class="monoset-dark"></div>
<div data-monoset-theme="dark"></div>
```
