# @monoset/react

React components for the Monoset design system. monotone, minimal, built on Radix primitives.

## Install

```bash
npm install @monoset/react @monoset/tokens framer-motion \
  @radix-ui/react-dialog @radix-ui/react-tooltip @radix-ui/react-popover \
  @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-radio-group \
  @radix-ui/react-tabs @radix-ui/react-checkbox @radix-ui/react-switch \
  @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-toast \
  @radix-ui/react-separator lucide-react
```

Or let npm resolve all peers automatically with `npm install @monoset/react --save-peer-if-missing` (npm ≥ 7).

## Setup

```tsx
import "@monoset/tokens/css";
import "@monoset/react/styles.css";
import { MonosetProvider, Button } from "@monoset/react";

export default function App() {
  return (
    <MonosetProvider>
      <Button variant="primary">Save changes</Button>
    </MonosetProvider>
  );
}
```

`MonosetProvider` wires up `MotionConfig` (for `prefers-reduced-motion`), `TooltipProvider`, and `ToastProvider` at once.

## What's included

| Category | Components |
|----------|------------|
| Action   | `Button`, `Badge`, `Avatar` |
| Surface  | `Card`, `Dialog`, `Popover`, `Tooltip`, `Separator` |
| Form     | `Input`, `Textarea`, `Field`, `Checkbox`, `Switch`, `RadioGroup`, `Select`, `DropdownMenu` |
| Feedback | `Alert`, `Toast`, `Skeleton`, `Progress`, `EmptyState` |
| Navigation | `Tabs`, `Pagination`, `Breadcrumb` |
| Data     | `Table` |
| Util     | `MonosetProvider`, `cx`, motion presets |

## Accessibility

Monoset components delegate accessibility to [Radix UI](https://radix-ui.com/primitives) primitives under the hood. focus management, keyboard navigation, ARIA attributes all handled. We add monoset's visual layer on top.

Every interactive component exposes a visible `:focus-visible` ring derived from `--focus-ring`. The `MonosetProvider` respects `prefers-reduced-motion: reduce` by default.

## Theming

Override token values on `:root` (or any scoped container) to restyle:

```css
:root {
  --mono-1000: #0a3d62; /* accent becomes brand blue */
}
[data-theme="dark"] {
  --mono-1000: #ffffff;
}
```

Or go fully scoped:

```html
<section data-theme="dark">
  <!-- tokens resolve to dark values inside -->
</section>
```
