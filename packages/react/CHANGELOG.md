# @monoset/react

## 0.7.0

### Minor Changes

- New components: Calendar (a standalone month grid that DatePicker now builds on), Collapsible, and AspectRatio.

  Icons are now consistent across the kit. Every unicode glyph and hand-inlined svg was replaced with lucide-react, which was already a peer dependency.

  Fixes: the Tabs underline now follows the active tab (it never rendered before), the indeterminate Progress animation works again, the Radio checked dot paints, Sheet slides in and ships a built-in close button, MultiCombobox tag removal works from the keyboard, and NumberInput supports uncontrolled use and free typing with clamp on blur.

  Polish: overlays animate in and out and respect reduced motion, focus rings are readable in dark mode, shadows are layered and softer, and a sizing pass tightened buttons, avatars, tables, menus, and the calendar grid.

  New peer dependencies: @radix-ui/react-collapsible and @radix-ui/react-aspect-ratio.

### Patch Changes

- Updated dependencies
  - @monoset/tokens@0.2.0

## 0.5.1

### Patch Changes

- Fix CommandPalette accessibility: add a visually-hidden DialogTitle so Radix doesn't warn about a missing title and screen readers announce the dialog correctly.

## 0.5.0

### Minor Changes

- Add AppShell, Combobox, and HoverCard.

  AppShell is a composable application layout: `AppShell.Sidebar` (with brand and footer slots), `AppShell.SidebarGroup`, `AppShell.SidebarItem`, `AppShell.Main`, `AppShell.Header`, `AppShell.MobileTrigger`, and `AppShell.Content`. The mobile drawer behavior is built in -- below 768px the sidebar collapses and a hamburger trigger opens the same nav as a Radix Dialog drawer.

  Combobox is a searchable single-select. Built on Radix Popover with a custom keyboard-navigable list and pluggable filter function. Same zero-runtime-dep pattern as CommandPalette.

  HoverCard is a thin wrapper around `@radix-ui/react-hover-card` for rich tooltips: user mentions, link previews, ticket summaries.

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
