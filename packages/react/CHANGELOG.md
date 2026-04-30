# @monoset/react

## 0.4.0

### Minor Changes

- Add Sheet and CommandPalette components.

  Sheet is a slide-over panel built on Radix Dialog. Four sides (left, right, top, bottom), configurable size, optional title and description header.

  CommandPalette is a searchable command menu with keyboard navigation. Flat or grouped items, built-in fuzzy search across labels, descriptions, and keywords. Arrow keys to navigate, Enter to select, Esc to close. Built on Radix Dialog with no extra dependencies.

## 0.3.0

### Minor Changes

- Add ThemeProvider, useTheme hook, and ThemeToggle component for dark mode control. Add Layout primitives (Stack, Inline, Grid, Container). Add Form component and useMonosetForm hook with field validation. Add Reveal and StaggerList motion components. Enhance Table with sortable headers, row selection, and sticky columns. Fix menu item hover contrast. Fix Switch track rendering.

### Patch Changes

- Updated dependencies
  - @monoset/motion@0.2.0

## 0.2.0

### Minor Changes

- Table: add `maxHeight` and `wrapperClassName` props. Set `maxHeight` (number in px, or any CSS length) and the wrapper scrolls vertically with the thead pinned. Horizontal overflow still scrolls on narrow viewports.

## 0.1.0

### Minor Changes

- Initial public release. Monoset is a minimal, monotone, unopinionated design system: tokens, Framer Motion presets, and a React component kit wrapping Radix primitives. See [monoset.design](https://monoset.design) for docs.
