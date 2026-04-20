# @monoset/tokens

Raw design tokens for Monoset: colors, type, spacing, radii, shadows, motion.

## Install

```bash
npm install @monoset/tokens
```

## Usage

### CSS (recommended)

```css
@import "@monoset/tokens/css";

.my-button {
  background: var(--mono-1000);
  color: var(--mono-0);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  transition: background var(--duration-fast) var(--ease-standard);
}
```

### JavaScript

```js
import { mono, space, radius, shadow } from "@monoset/tokens";

const styles = {
  background: mono[1000],
  padding: `${space[3]} ${space[5]}`,
  borderRadius: radius.md,
  boxShadow: shadow.md,
};
```

### JSON (for Figma Tokens Studio, Style Dictionary, etc.)

```js
import tokens from "@monoset/tokens/json";
```

## What's included

| Category | Tokens |
|----------|--------|
| Color    | `--mono-0` → `--mono-1000` (12 steps) + semantic (`--bg`, `--fg1-4`, `--border*`, `--accent`) |
| Type     | `--text-xs` → `--text-5xl`, weights, leading, tracking, two families |
| Space    | `--space-0` → `--space-14` (4px grid) |
| Radius   | `--radius-none` → `--radius-xl` + `--radius-full` |
| Shadow   | `--shadow-xs` → `--shadow-xl` + `--shadow-inset` |
| Motion   | `--duration-fast/base/slow` + `--ease-standard/emphasis/exit` |
| Layout   | `--container-sm` → `--container-2xl`, `--z-*` |

## Dark theme

Monoset ships a dark variant via `[data-theme="dark"]`. Flip the attribute on any subtree to invert the ramp.

```html
<div data-theme="dark">
  <!-- monoset tokens now resolve to dark values -->
</div>
```
