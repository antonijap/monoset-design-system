# @monoset/native

## 0.4.0

### Minor Changes

- New components: Calendar (standalone month grid) and BottomSheet with drag-to-dismiss. Button gains a loading prop. ActionSheet was redesigned with icon rows, hairline separators, and a distinct Cancel. SegmentedControl was rebuilt to iOS proportions with equal-width segments and native separators. The useReducedMotion hook is now exported.

  Icons moved to lucide-react-native. New peer dependencies: lucide-react-native and react-native-svg.

  Fixes: NumberInput uncontrolled mode works, Spinner and Skeleton no longer leak their animation loops, Toast clears its timers, Combobox resets its search on every dismissal, Popover positions edge-aware and stays anchored in any modal host, and PinInput keeps digits in their slots when editing.

  Every animation now respects the OS Reduce Motion setting, and hit targets plus accessibility labels were brought up to standard.

## 0.3.0

### Minor Changes

- Add DatePicker, Tabs, Popover, Combobox, NumberInput, PinInput, PasswordInput, Accordion, NavigationHeader, ActionSheet, AppShell, and Tooltip.

## 0.2.0

### Minor Changes

- Initial release of the React Native component package with layout primitives, surfaces, form controls, display components, overlays, and navigation.
- Use React Native `StyleSheet` and built-in `Animated`, with separate token and style exports.
