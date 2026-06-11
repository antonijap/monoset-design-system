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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Accordion: () => Accordion,
  AccordionItem: () => AccordionItem,
  ActionSheet: () => ActionSheet,
  Alert: () => Alert,
  AppShell: () => AppShell,
  Avatar: () => Avatar,
  Badge: () => Badge,
  BottomSheet: () => BottomSheet,
  Button: () => Button,
  Calendar: () => Calendar,
  Card: () => Card,
  Checkbox: () => Checkbox,
  Chip: () => Chip,
  Combobox: () => Combobox,
  DatePicker: () => DatePicker,
  Dialog: () => Dialog,
  Divider: () => Divider,
  EmptyState: () => EmptyState,
  Field: () => Field,
  Inline: () => Inline,
  Input: () => Input,
  ListItem: () => ListItem,
  NavigationBack: () => NavigationBack,
  NavigationHeader: () => NavigationHeader,
  NumberInput: () => NumberInput,
  PasswordInput: () => PasswordInput,
  PinInput: () => PinInput,
  Popover: () => Popover,
  Progress: () => Progress,
  Radio: () => Radio,
  RadioGroup: () => RadioGroup,
  SegmentedControl: () => SegmentedControl,
  Sheet: () => Sheet,
  Skeleton: () => Skeleton,
  Slider: () => Slider,
  Spinner: () => Spinner,
  Stack: () => Stack,
  Switch: () => Switch,
  TabBar: () => TabBar,
  Tabs: () => Tabs,
  ToastProvider: () => ToastProvider,
  Tooltip: () => Tooltip,
  colors: () => colors,
  fontSize: () => fontSize,
  fontWeight: () => fontWeight,
  lineHeight: () => lineHeight,
  mono: () => mono,
  radius: () => radius,
  shadow: () => shadow,
  space: () => space,
  styles: () => styles,
  tokens: () => tokens,
  useReducedMotion: () => useReducedMotion,
  useToast: () => useToast
});
module.exports = __toCommonJS(index_exports);

// src/Button.tsx
var import_react = require("react");
var import_react_native2 = require("react-native");

// src/styles.ts
var import_react_native = require("react-native");

// src/tokens.ts
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
  statusDanger: "#a83232",
  scrim: "rgba(0,0,0,0.4)"
  // modal / sheet backdrop
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
  "2xl": 14,
  full: 9999
};
var fontSize = {
  xs: 11,
  // iOS Caption 2
  sm: 13,
  // iOS Footnote
  md: 15,
  // iOS Subheadline — secondary rows, tab labels
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
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  md: {
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  lg: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8
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

// src/styles.ts
var styles = import_react_native.StyleSheet.create({
  /* ─── Button ──────────────────────────────────────────────────── */
  msBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent"
  },
  // Corner radii follow iOS button conventions: ~half the height for a
  // soft modern look (medium = 14, large = 16, small = 10).
  msBtnSm: { paddingHorizontal: 14, paddingVertical: 8, minHeight: 36, borderRadius: 10 },
  msBtnMd: { paddingHorizontal: 18, paddingVertical: 12, minHeight: 44, borderRadius: 14 },
  // Apple's minimum tap target
  msBtnLg: { paddingHorizontal: 22, paddingVertical: 14, minHeight: 50, borderRadius: 16 },
  msBtnPrimary: { backgroundColor: colors.accent, borderColor: colors.accent },
  msBtnSecondary: { backgroundColor: colors.bg, borderColor: colors.border },
  msBtnGhost: { backgroundColor: "transparent" },
  msBtnDanger: { backgroundColor: colors.statusDanger, borderColor: colors.statusDanger },
  msBtnDisabled: { backgroundColor: colors.bgMuted, borderColor: "transparent", opacity: 0.85 },
  msBtnLabel: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, lineHeight: fontSize.base * 1.2 },
  msBtnLabelSm: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, lineHeight: fontSize.sm * 1.2 },
  msBtnLabelLg: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, lineHeight: fontSize.lg * 1.2 },
  msBtnLabelPrimary: { color: colors.accentFg },
  msBtnLabelSecondary: { color: colors.fg1 },
  msBtnLabelGhost: { color: colors.fg1 },
  msBtnLabelDanger: { color: "#fff" },
  msBtnLabelDisabled: { color: colors.fg4 },
  /* ─── Card ────────────────────────────────────────────────────── */
  msCard: {
    backgroundColor: colors.bg,
    borderColor: colors.borderSubtle,
    borderWidth: 1,
    borderRadius: radius["2xl"],
    padding: space[6]
  },
  msCardElevated: {
    borderWidth: 0,
    ...shadow.sm
  },
  msCardInset: {
    backgroundColor: colors.bgSubtle,
    borderWidth: 0
  },
  /* ─── Input ───────────────────────────────────────────────────── */
  msInput: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.bg,
    color: colors.fg1
  },
  msInputFocused: { borderColor: colors.fg1 },
  msInputError: { borderColor: colors.statusDanger },
  msInputDisabled: { backgroundColor: colors.bgMuted, color: colors.fg4 },
  /* ─── Field ───────────────────────────────────────────────────── */
  msField: { gap: 8 },
  msFieldLabel: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.fg1 },
  msFieldHelp: { fontSize: fontSize.sm, color: colors.fg3 },
  msFieldError: { fontSize: fontSize.sm, color: colors.statusDanger },
  /* ─── Stack / Inline ──────────────────────────────────────────── */
  msStack: { flexDirection: "column" },
  msInline: { flexDirection: "row", alignItems: "center" },
  /* ─── Switch (iOS-standard 51x31, thumb 27x27) ────────────────── */
  msSwitchTrack: {
    width: 51,
    height: 31,
    borderRadius: 999,
    padding: 2,
    backgroundColor: colors.border
  },
  msSwitchTrackOn: { backgroundColor: colors.accent },
  msSwitchThumb: {
    width: 27,
    height: 27,
    borderRadius: 999,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  /* ─── Spinner ─────────────────────────────────────────────────── */
  msSpinner: {
    width: 16,
    height: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.border,
    borderTopColor: colors.fg1
  },
  /* ─── Skeleton ────────────────────────────────────────────────── */
  msSkeleton: {
    backgroundColor: colors.bgMuted,
    borderRadius: radius.sm,
    overflow: "hidden"
  },
  /* ─── Avatar ──────────────────────────────────────────────────── */
  msAvatar: {
    backgroundColor: mono[800],
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 999
  },
  msAvatarSm: { width: 28, height: 28 },
  msAvatarMd: { width: 40, height: 40 },
  msAvatarLg: { width: 56, height: 56 },
  msAvatarText: { color: "#fff", fontWeight: fontWeight.semibold },
  msAvatarTextSm: { fontSize: fontSize.xs },
  msAvatarTextMd: { fontSize: fontSize.sm },
  msAvatarTextLg: { fontSize: fontSize.base },
  /* ─── Badge ───────────────────────────────────────────────────── */
  msBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 999,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  msBadgeNeutral: { backgroundColor: colors.bgMuted },
  msBadgeSolid: { backgroundColor: colors.accent },
  msBadgeOutline: { backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border },
  msBadgeSuccess: { backgroundColor: colors.bgMuted },
  msBadgeDanger: { backgroundColor: colors.bgMuted },
  msBadgeText: { fontSize: fontSize.xs, fontWeight: fontWeight.semibold },
  msBadgeTextNeutral: { color: colors.fg2 },
  msBadgeTextSolid: { color: colors.accentFg },
  msBadgeTextOutline: { color: colors.fg2 },
  msBadgeTextSuccess: { color: colors.fg1 },
  msBadgeTextDanger: { color: colors.fg1 },
  /* ─── Alert ───────────────────────────────────────────────────── */
  msAlert: {
    flexDirection: "row",
    gap: space[4],
    padding: space[5],
    borderRadius: radius.lg,
    borderWidth: 1
  },
  msAlertInfo: { backgroundColor: colors.bgSubtle, borderColor: colors.borderSubtle },
  msAlertSuccess: { backgroundColor: colors.bgSubtle, borderColor: colors.borderSubtle },
  msAlertWarning: { backgroundColor: colors.bgSubtle, borderColor: colors.borderSubtle },
  msAlertDanger: { backgroundColor: colors.bgSubtle, borderColor: colors.borderSubtle },
  msAlertIconWrap: {
    width: 22,
    height: 22,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: space[1],
    borderWidth: 1,
    borderColor: colors.fg1
  },
  msAlertIconWrapInfo: { borderColor: colors.fg1 },
  msAlertIconWrapSuccess: { borderColor: colors.fg1, backgroundColor: "transparent" },
  msAlertIconWrapWarning: { borderColor: colors.fg1 },
  msAlertIconWrapDanger: { borderColor: colors.fg1 },
  msAlertIcon: { fontSize: 12, fontWeight: fontWeight.bold, color: colors.fg1, lineHeight: 14 },
  msAlertIconSuccess: { color: colors.fg1 },
  msAlertIconWarning: { color: colors.fg1 },
  msAlertIconDanger: { color: colors.fg1 },
  msAlertBody: { flex: 1 },
  msAlertTitle: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, color: colors.fg1 },
  msAlertMessage: { fontSize: fontSize.sm, color: colors.fg2, marginTop: space[2], lineHeight: fontSize.sm * 1.5 },
  /* ─── Divider ─────────────────────────────────────────────────── */
  msDivider: { backgroundColor: colors.borderSubtle },
  msDividerHorizontal: { height: import_react_native.StyleSheet.hairlineWidth, alignSelf: "stretch" },
  msDividerVertical: { width: import_react_native.StyleSheet.hairlineWidth, alignSelf: "stretch" },
  /* ─── EmptyState ──────────────────────────────────────────────── */
  msEmpty: { alignItems: "center", paddingVertical: space[8], paddingHorizontal: space[5], gap: space[3] },
  msEmptyIcon: { width: 44, height: 44, borderRadius: 999, alignItems: "center", justifyContent: "center", backgroundColor: colors.bgMuted, marginBottom: space[2] },
  msEmptyTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1, textAlign: "center" },
  msEmptyBody: { fontSize: fontSize.sm, color: colors.fg3, textAlign: "center", maxWidth: 280, lineHeight: fontSize.sm * 1.5 },
  /* ─── ListItem ────────────────────────────────────────────────── */
  msList: { backgroundColor: colors.bg },
  msListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: space[5],
    paddingVertical: space[4],
    minHeight: 56,
    backgroundColor: colors.bg,
    gap: 12
  },
  msListItemPressed: { backgroundColor: colors.bgMuted },
  msListItemBody: { flex: 1, minWidth: 0 },
  msListItemTitle: { fontSize: fontSize.base, color: colors.fg1 },
  msListItemSubtitle: { fontSize: fontSize.sm, color: colors.fg3, marginTop: 1 },
  msListItemChevron: { fontSize: fontSize.lg, color: colors.fg4 },
  /* ─── Checkbox ────────────────────────────────────────────────── */
  msCheckRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingVertical: 12 },
  msCheck: {
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg
  },
  msCheckChecked: { backgroundColor: colors.accent, borderColor: colors.accent },
  msCheckLabel: { fontSize: fontSize.base, color: colors.fg1, flex: 1, lineHeight: 22 },
  msCheckCheckmark: { color: "#fff", fontSize: 14, fontWeight: fontWeight.bold, lineHeight: 14 },
  /* ─── Radio ───────────────────────────────────────────────────── */
  msRadioRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingVertical: 12 },
  msRadio: {
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg
  },
  msRadioChecked: { borderColor: colors.accent },
  msRadioDot: { width: 10, height: 10, borderRadius: 999, backgroundColor: colors.accent },
  msRadioLabel: { fontSize: fontSize.base, color: colors.fg1, flex: 1, lineHeight: 22 },
  /* ─── Chip ────────────────────────────────────────────────────── */
  msChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    minHeight: 36,
    borderRadius: 999,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg
  },
  msChipPressed: { backgroundColor: colors.bgSubtle },
  msChipSelected: { backgroundColor: colors.accent, borderColor: colors.accent },
  msChipText: { fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: colors.fg1 },
  msChipTextSelected: { color: colors.accentFg },
  /* ─── Progress ────────────────────────────────────────────────── */
  msProgressTrack: {
    width: "100%",
    height: 6,
    borderRadius: 999,
    backgroundColor: mono[200],
    overflow: "hidden"
  },
  msProgressFill: { height: "100%", backgroundColor: colors.accent, borderRadius: 999 },
  /* ─── Sheet (BottomSheet via Modal) ───────────────────────────── */
  msSheetScrim: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  msSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingTop: 12,
    paddingHorizontal: space[5],
    paddingBottom: space[7],
    maxHeight: "85%"
  },
  msSheetGrabber: { width: 36, height: 5, borderRadius: 999, backgroundColor: colors.border, alignSelf: "center", marginBottom: space[4] },
  msSheetTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 },
  msSheetDesc: { fontSize: fontSize.sm, color: colors.fg3, marginTop: 2, lineHeight: fontSize.sm * 1.5 },
  /* ─── Dialog (centered modal) ─────────────────────────────────── */
  msDialogScrim: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center", paddingHorizontal: space[5] },
  msDialog: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.bg,
    borderRadius: radius.lg,
    padding: space[6],
    ...shadow.lg
  },
  msDialogTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 },
  msDialogDesc: { fontSize: fontSize.sm, color: colors.fg2, marginTop: space[2], lineHeight: fontSize.sm * 1.5 },
  /* ─── Toast ───────────────────────────────────────────────────── */
  msToastWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: space[5],
    paddingBottom: space[6],
    alignItems: "center",
    pointerEvents: "box-none"
  },
  msToast: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: colors.fg1,
    borderRadius: radius.lg,
    paddingHorizontal: space[5],
    paddingVertical: space[4],
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    ...shadow.lg
  },
  msToastTitle: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: "#fff", flex: 1 },
  msToastAction: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: "#fff", opacity: 0.7 },
  /* ─── Slider ──────────────────────────────────────────────────── */
  msSliderTrack: { width: "100%", height: 4, borderRadius: 999, backgroundColor: colors.bgMuted },
  msSliderFill: { height: "100%", backgroundColor: colors.accent, borderRadius: 999 },
  msSliderThumb: { position: "absolute", top: "50%", marginTop: -12, width: 24, height: 24, borderRadius: 999, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, ...shadow.sm },
  /* ─── SegmentedControl ────────────────────────────────────────── */
  /* iOS UISegmentedControl proportions: 32pt control, 2pt inset, concentric
     thumb (9 - 2 = 7), equal-width segments, weight change only on the label. */
  msSegmented: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgMuted,
    borderRadius: 9,
    padding: 2
  },
  msSegmentedItem: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7
  },
  msSegmentedItemActive: {
    backgroundColor: colors.bg,
    ...shadow.sm
  },
  msSegmentedText: { fontSize: fontSize.sm, fontWeight: fontWeight.regular, color: colors.fg1 },
  msSegmentedTextActive: { fontWeight: fontWeight.semibold, color: colors.fg1 },
  msSegmentedSeparator: { width: 1, height: 14, borderRadius: 1, backgroundColor: colors.border },
  /* ─── TabBar (bottom navigation) ──────────────────────────────── */
  msTabBar: {
    flexDirection: "row",
    backgroundColor: colors.bg,
    borderTopWidth: import_react_native.StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSubtle,
    paddingTop: 2,
    paddingBottom: 2
  },
  msTabBarItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 4, paddingVertical: 6, minHeight: 48 },
  msTabBarLabel: { fontSize: 11, fontWeight: fontWeight.medium, color: colors.fg3 },
  msTabBarLabelActive: { color: colors.fg1 }
});

// src/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = (0, import_react.forwardRef)(function Button2({ variant = "secondary", size = "md", disabled, loading, leading, trailing, children, style, ...rest }, ref) {
  const sizeStyle = size === "sm" ? styles.msBtnSm : size === "lg" ? styles.msBtnLg : styles.msBtnMd;
  const variantStyle = disabled && !loading ? styles.msBtnDisabled : variant === "primary" ? styles.msBtnPrimary : variant === "ghost" ? styles.msBtnGhost : variant === "danger" ? styles.msBtnDanger : styles.msBtnSecondary;
  const labelVariantStyle = disabled && !loading ? styles.msBtnLabelDisabled : variant === "primary" ? styles.msBtnLabelPrimary : variant === "ghost" ? styles.msBtnLabelGhost : variant === "danger" ? styles.msBtnLabelDanger : styles.msBtnLabelSecondary;
  const spinnerColor = variant === "primary" ? colors.accentFg : colors.fg1;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react_native2.Pressable,
    {
      ref,
      disabled: disabled || loading,
      accessibilityState: loading ? { busy: true, disabled: true } : void 0,
      android_ripple: { color: variant === "primary" || variant === "danger" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)" },
      style: ({ pressed }) => [
        styles.msBtn,
        sizeStyle,
        variantStyle,
        pressed && !disabled && !loading && { opacity: 0.85 },
        style
      ],
      ...rest,
      children: [
        loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.ActivityIndicator, { size: "small", color: spinnerColor }) : leading,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: [
          styles.msBtnLabel,
          size === "sm" && styles.msBtnLabelSm,
          size === "lg" && styles.msBtnLabelLg,
          labelVariantStyle,
          loading || leading ? { marginLeft: 6 } : null,
          trailing ? { marginRight: 6 } : null
        ], children }),
        trailing
      ]
    }
  );
});

// src/Card.tsx
var import_react2 = require("react");
var import_react_native3 = require("react-native");
var import_jsx_runtime2 = require("react/jsx-runtime");
var Card = (0, import_react2.forwardRef)(function Card2({ variant = "default", children, style, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_react_native3.View,
    {
      ref,
      style: [
        styles.msCard,
        variant === "elevated" && styles.msCardElevated,
        variant === "inset" && styles.msCardInset,
        style
      ],
      ...rest,
      children
    }
  );
});

// src/Input.tsx
var import_react3 = require("react");
var import_react_native4 = require("react-native");
var import_jsx_runtime3 = require("react/jsx-runtime");
var Input = (0, import_react3.forwardRef)(function Input2({ invalid, editable = true, onFocus, onBlur, style, ...rest }, ref) {
  const [focused, setFocused] = (0, import_react3.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_react_native4.TextInput,
    {
      ref,
      editable,
      placeholderTextColor: colors.fg4,
      onFocus: (e) => {
        setFocused(true);
        onFocus?.(e);
      },
      onBlur: (e) => {
        setFocused(false);
        onBlur?.(e);
      },
      style: [
        styles.msInput,
        focused && styles.msInputFocused,
        invalid && styles.msInputError,
        !editable && styles.msInputDisabled,
        style
      ],
      ...rest
    }
  );
});
function Field({ label, help, error, children, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react_native4.View, { style: [styles.msField, style], children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native4.Text, { style: styles.msFieldLabel, children: label }),
    children,
    error ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native4.Text, { style: styles.msFieldError, children: error }) : help ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native4.Text, { style: styles.msFieldHelp, children: help }) : null
  ] });
}

// src/Layout.tsx
var import_react4 = require("react");
var import_react_native5 = require("react-native");
var import_jsx_runtime4 = require("react/jsx-runtime");
var alignMap = {
  stretch: "stretch",
  start: "flex-start",
  center: "center",
  end: "flex-end"
};
var Stack = (0, import_react4.forwardRef)(function Stack2({ gap = 4, align = "stretch", children, style, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_react_native5.View,
    {
      ref,
      style: [styles.msStack, { gap: space[gap], alignItems: alignMap[align] }, style],
      ...rest,
      children
    }
  );
});
var justifyMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around"
};
var Inline = (0, import_react4.forwardRef)(function Inline2({ gap = 3, align = "center", justify = "start", wrap, children, style, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_react_native5.View,
    {
      ref,
      style: [
        styles.msInline,
        {
          gap: space[gap],
          alignItems: alignMap[align],
          justifyContent: justifyMap[justify],
          flexWrap: wrap ? "wrap" : "nowrap"
        },
        style
      ],
      ...rest,
      children
    }
  );
});

// src/Switch.tsx
var import_react5 = require("react");
var import_react_native6 = require("react-native");
var import_jsx_runtime5 = require("react/jsx-runtime");
var TRACK_COLOR_OFF = colors.border;
var TRACK_COLOR_ON = colors.accent;
var THUMB_TRAVEL = 20;
var Switch = (0, import_react5.forwardRef)(function Switch2({ checked, defaultChecked, onCheckedChange, disabled, label, ...rest }, ref) {
  const isControlled = checked !== void 0;
  const [internal, setInternal] = (0, import_react5.useState)(!!defaultChecked);
  const value = isControlled ? !!checked : internal;
  const progress = (0, import_react5.useRef)(new import_react_native6.Animated.Value(value ? 1 : 0)).current;
  (0, import_react5.useEffect)(() => {
    import_react_native6.Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: 180,
      easing: import_react_native6.Easing.bezier(0.3, 0, 0, 1),
      useNativeDriver: false
      // backgroundColor needs the JS driver
    }).start();
  }, [value, progress]);
  const trackBg = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [TRACK_COLOR_OFF, TRACK_COLOR_ON]
  });
  const thumbX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, THUMB_TRAVEL]
  });
  const onPress = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    import_react_native6.Pressable,
    {
      ref,
      role: "switch",
      accessibilityState: { checked: value, disabled },
      accessibilityLabel: label,
      onPress,
      disabled,
      hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
      style: ({ pressed }) => [
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }
      ],
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_native6.Animated.View, { style: [styles.msSwitchTrack, { backgroundColor: trackBg }], children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_native6.Animated.View, { style: [styles.msSwitchThumb, { transform: [{ translateX: thumbX }] }] }) })
    }
  );
});

// src/Spinner.tsx
var import_react7 = require("react");
var import_react_native8 = require("react-native");

// src/useReducedMotion.ts
var import_react6 = require("react");
var import_react_native7 = require("react-native");
function useReducedMotion() {
  const [reduced, setReduced] = (0, import_react6.useState)(false);
  (0, import_react6.useEffect)(() => {
    let mounted = true;
    import_react_native7.AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (mounted) setReduced(value);
    });
    const sub = import_react_native7.AccessibilityInfo.addEventListener("reduceMotionChanged", setReduced);
    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);
  return reduced;
}

// src/Spinner.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var Spinner = (0, import_react7.forwardRef)(function Spinner2({ size = 16, color = colors.fg1, label = "Loading" }, ref) {
  const angle = (0, import_react7.useRef)(new import_react_native8.Animated.Value(0)).current;
  const reduceMotion = useReducedMotion();
  (0, import_react7.useEffect)(() => {
    if (reduceMotion) return;
    const anim = import_react_native8.Animated.loop(
      import_react_native8.Animated.timing(angle, {
        toValue: 1,
        duration: 800,
        easing: import_react_native8.Easing.linear,
        useNativeDriver: true
      })
    );
    anim.start();
    return () => anim.stop();
  }, [angle, reduceMotion]);
  const rotate = angle.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    import_react_native8.Animated.View,
    {
      ref,
      accessibilityRole: "progressbar",
      accessibilityLabel: label,
      style: [
        styles.msSpinner,
        { width: size, height: size, borderColor: colors.border, borderTopColor: color },
        { transform: [{ rotate }] }
      ]
    }
  );
});

// src/Skeleton.tsx
var import_react8 = require("react");
var import_react_native9 = require("react-native");
var import_jsx_runtime7 = require("react/jsx-runtime");
function Skeleton({ width = "100%", height = 17, radius: radius2 = 4 }) {
  const opacity = (0, import_react8.useRef)(new import_react_native9.Animated.Value(0.6)).current;
  const reduceMotion = useReducedMotion();
  (0, import_react8.useEffect)(() => {
    if (reduceMotion) {
      opacity.setValue(0.8);
      return;
    }
    const anim = import_react_native9.Animated.loop(
      import_react_native9.Animated.sequence([
        import_react_native9.Animated.timing(opacity, {
          toValue: 1,
          duration: 900,
          easing: import_react_native9.Easing.inOut(import_react_native9.Easing.ease),
          useNativeDriver: true
        }),
        import_react_native9.Animated.timing(opacity, {
          toValue: 0.6,
          duration: 900,
          easing: import_react_native9.Easing.inOut(import_react_native9.Easing.ease),
          useNativeDriver: true
        })
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [opacity, reduceMotion]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    import_react_native9.Animated.View,
    {
      accessibilityRole: "progressbar",
      accessibilityLabel: "Loading",
      style: [styles.msSkeleton, { width, height, borderRadius: radius2, opacity }]
    }
  );
}

// src/Avatar.tsx
var import_react9 = require("react");
var import_react_native10 = require("react-native");
var import_jsx_runtime8 = require("react/jsx-runtime");
function initials(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "").join("");
}
var Avatar = (0, import_react9.forwardRef)(function Avatar2({ name, source, size = "md", style, ...rest }, ref) {
  const sizeStyle = size === "sm" ? styles.msAvatarSm : size === "lg" ? styles.msAvatarLg : styles.msAvatarMd;
  const textStyle = size === "sm" ? styles.msAvatarTextSm : size === "lg" ? styles.msAvatarTextLg : styles.msAvatarTextMd;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_native10.View, { ref, style: [styles.msAvatar, sizeStyle, style], ...rest, children: source ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_native10.Image, { source, style: { width: "100%", height: "100%" } }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_native10.Text, { style: [styles.msAvatarText, textStyle], children: initials(name) }) });
});

// src/Badge.tsx
var import_react10 = require("react");
var import_react_native11 = require("react-native");
var import_jsx_runtime9 = require("react/jsx-runtime");
var Badge = (0, import_react10.forwardRef)(function Badge2({ variant = "neutral", children, leading, style, ...rest }, ref) {
  const variantStyle = variant === "solid" ? styles.msBadgeSolid : variant === "outline" ? styles.msBadgeOutline : variant === "success" ? styles.msBadgeSuccess : variant === "danger" ? styles.msBadgeDanger : styles.msBadgeNeutral;
  const textVariantStyle = variant === "solid" ? styles.msBadgeTextSolid : variant === "outline" ? styles.msBadgeTextOutline : variant === "success" ? styles.msBadgeTextSuccess : variant === "danger" ? styles.msBadgeTextDanger : styles.msBadgeTextNeutral;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_react_native11.View, { ref, style: [styles.msBadge, variantStyle, style], ...rest, children: [
    leading,
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react_native11.Text, { style: [styles.msBadgeText, textVariantStyle], children })
  ] });
});

// src/Alert.tsx
var import_react11 = require("react");
var import_react_native12 = require("react-native");
var import_lucide_react_native = require("lucide-react-native");
var import_jsx_runtime10 = require("react/jsx-runtime");
var Alert = (0, import_react11.forwardRef)(function Alert2({ variant = "info", title, children, icon, style, ...rest }, ref) {
  const variantStyle = variant === "success" ? styles.msAlertSuccess : variant === "warning" ? styles.msAlertWarning : variant === "danger" ? styles.msAlertDanger : styles.msAlertInfo;
  const iconWrapStyle = variant === "success" ? styles.msAlertIconWrapSuccess : variant === "warning" ? styles.msAlertIconWrapWarning : variant === "danger" ? styles.msAlertIconWrapDanger : styles.msAlertIconWrapInfo;
  const iconColor = colors.fg1;
  const DefaultIcon = variant === "success" ? import_lucide_react_native.Check : variant === "info" ? import_lucide_react_native.Info : import_lucide_react_native.AlertCircle;
  const accessibilityRole = variant === "danger" || variant === "warning" ? "alert" : "text";
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    import_react_native12.View,
    {
      ref,
      accessibilityRole,
      style: [styles.msAlert, variantStyle, style],
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react_native12.View, { style: [styles.msAlertIconWrap, iconWrapStyle], children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(DefaultIcon, { size: 16, color: iconColor, strokeWidth: 2 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_react_native12.View, { style: styles.msAlertBody, children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react_native12.Text, { style: styles.msAlertTitle, children: title }),
          typeof children === "string" ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react_native12.Text, { style: styles.msAlertMessage, children }) : children
        ] })
      ]
    }
  );
});

// src/Divider.tsx
var import_react12 = require("react");
var import_react_native13 = require("react-native");
var import_jsx_runtime11 = require("react/jsx-runtime");
var Divider = (0, import_react12.forwardRef)(function Divider2({ orientation = "horizontal", style, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    import_react_native13.View,
    {
      ref,
      role: "separator",
      style: [
        styles.msDivider,
        orientation === "vertical" ? styles.msDividerVertical : styles.msDividerHorizontal,
        style
      ],
      ...rest
    }
  );
});

// src/EmptyState.tsx
var import_react13 = require("react");
var import_react_native14 = require("react-native");
var import_jsx_runtime12 = require("react/jsx-runtime");
var EmptyState = (0, import_react13.forwardRef)(function EmptyState2({ title, body, icon, action, style, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_react_native14.View, { ref, style: [styles.msEmpty, style], ...rest, children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native14.View, { style: styles.msEmptyIcon, children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native14.Text, { style: styles.msEmptyTitle, children: title }),
    body && (typeof body === "string" ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native14.Text, { style: styles.msEmptyBody, children: body }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native14.View, { children: body })),
    action && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native14.View, { style: { marginTop: space[3] }, children: action })
  ] });
});

// src/ListItem.tsx
var import_react14 = require("react");
var import_react_native15 = require("react-native");
var import_lucide_react_native2 = require("lucide-react-native");
var import_jsx_runtime13 = require("react/jsx-runtime");
var ListItem = (0, import_react14.forwardRef)(function ListItem2({ title, subtitle, leading, trailing, chevron, onPress, style, ...rest }, ref) {
  const tappable = !!onPress;
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
    import_react_native15.Pressable,
    {
      ref,
      onPress,
      disabled: !tappable,
      style: ({ pressed }) => [
        styles.msListItem,
        pressed && tappable && styles.msListItemPressed,
        style
      ],
      ...rest,
      children: [
        leading,
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_react_native15.View, { style: styles.msListItemBody, children: [
          typeof title === "string" ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_native15.Text, { style: styles.msListItemTitle, numberOfLines: 1, children: title }) : title,
          subtitle && (typeof subtitle === "string" ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_native15.Text, { style: styles.msListItemSubtitle, numberOfLines: 1, children: subtitle }) : subtitle)
        ] }),
        trailing ?? (chevron && tappable ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react_native2.ChevronRight, { size: 16, color: colors.fg4, strokeWidth: 2 }) : null)
      ]
    }
  );
});

// src/Checkbox.tsx
var import_react15 = require("react");
var import_react_native16 = require("react-native");
var import_lucide_react_native3 = require("lucide-react-native");
var import_jsx_runtime14 = require("react/jsx-runtime");
var Checkbox = (0, import_react15.forwardRef)(function Checkbox2({ checked, defaultChecked, onCheckedChange, label, disabled, style, ...rest }, ref) {
  const isControlled = checked !== void 0;
  const [internal, setInternal] = (0, import_react15.useState)(!!defaultChecked);
  const value = isControlled ? !!checked : internal;
  const onPress = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    import_react_native16.Pressable,
    {
      ref,
      role: "checkbox",
      accessibilityState: { checked: value, disabled },
      onPress,
      disabled,
      style: ({ pressed }) => [
        styles.msCheckRow,
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style
      ],
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react_native16.View, { style: [styles.msCheck, value && styles.msCheckChecked], children: value && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react_native3.Check, { size: 14, color: colors.accentFg, strokeWidth: 3 }) }),
        label && (typeof label === "string" ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react_native16.Text, { style: styles.msCheckLabel, children: label }) : label)
      ]
    }
  );
});

// src/RadioGroup.tsx
var import_react16 = require("react");
var import_react_native17 = require("react-native");
var import_jsx_runtime15 = require("react/jsx-runtime");
var Ctx = (0, import_react16.createContext)(null);
function RadioGroup({ value, defaultValue, onValueChange, disabled, children, style, ...rest }) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = (0, import_react16.useState)(defaultValue);
  const current = isControlled ? value : internal;
  const setValue = (v) => {
    if (disabled) return;
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Ctx.Provider, { value: { value: current, setValue, disabled }, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native17.View, { style, accessibilityRole: "radiogroup", ...rest, children }) });
}
var Radio = (0, import_react16.forwardRef)(function Radio2({ value, label, disabled: itemDisabled, style, ...rest }, ref) {
  const ctx = (0, import_react16.useContext)(Ctx);
  if (!ctx) throw new Error("Radio must be used inside <RadioGroup>.");
  const checked = ctx.value === value;
  const disabled = itemDisabled || ctx.disabled;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
    import_react_native17.Pressable,
    {
      ref,
      role: "radio",
      accessibilityState: { checked, disabled },
      onPress: () => ctx.setValue(value),
      disabled,
      style: ({ pressed }) => [
        styles.msRadioRow,
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style
      ],
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native17.View, { style: [styles.msRadio, checked && styles.msRadioChecked], children: checked && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native17.View, { style: styles.msRadioDot }) }),
        label && (typeof label === "string" ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native17.Text, { style: styles.msRadioLabel, children: label }) : label)
      ]
    }
  );
});

// src/Chip.tsx
var import_react17 = require("react");
var import_react_native18 = require("react-native");
var import_jsx_runtime16 = require("react/jsx-runtime");
var Chip = (0, import_react17.forwardRef)(function Chip2({ selected, onSelectedChange, leading, trailing, children, onPress, style, ...rest }, ref) {
  const handlePress = (e) => {
    onPress?.(e);
    onSelectedChange?.(!selected);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
    import_react_native18.Pressable,
    {
      ref,
      onPress: handlePress,
      accessibilityState: { selected },
      style: ({ pressed }) => [
        styles.msChip,
        pressed && !selected && styles.msChipPressed,
        selected && styles.msChipSelected,
        style
      ],
      ...rest,
      children: [
        leading,
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_react_native18.Text, { style: [styles.msChipText, selected && styles.msChipTextSelected], children }),
        trailing
      ]
    }
  );
});

// src/Progress.tsx
var import_react18 = require("react");
var import_react_native19 = require("react-native");
var import_jsx_runtime17 = require("react/jsx-runtime");
var Progress = (0, import_react18.forwardRef)(function Progress2({ value, max = 100, style, ...rest }, ref) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const width = (0, import_react18.useRef)(new import_react_native19.Animated.Value(pct)).current;
  (0, import_react18.useEffect)(() => {
    import_react_native19.Animated.timing(width, {
      toValue: pct,
      duration: 280,
      useNativeDriver: false
    }).start();
  }, [pct, width]);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    import_react_native19.View,
    {
      ref,
      accessibilityRole: "progressbar",
      accessibilityValue: { min: 0, max: 100, now: pct },
      style: [styles.msProgressTrack, style],
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        import_react_native19.Animated.View,
        {
          style: [
            styles.msProgressFill,
            { width: width.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }) }
          ]
        }
      )
    }
  );
});

// src/Sheet.tsx
var import_react19 = require("react");
var import_react_native20 = require("react-native");
var import_jsx_runtime18 = require("react/jsx-runtime");
var Sheet = (0, import_react19.forwardRef)(function Sheet2({ open, onClose, title, description, grabber = true, children, ...rest }, ref) {
  const reduceMotion = useReducedMotion();
  const translateY = (0, import_react19.useRef)(new import_react_native20.Animated.Value(40)).current;
  const opacity = (0, import_react19.useRef)(new import_react_native20.Animated.Value(0)).current;
  (0, import_react19.useEffect)(() => {
    import_react_native20.Animated.parallel([
      import_react_native20.Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: reduceMotion ? 0 : open ? 180 : 120,
        easing: import_react_native20.Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      }),
      import_react_native20.Animated.timing(translateY, {
        toValue: open ? 0 : 40,
        duration: reduceMotion ? 0 : open ? 280 : 180,
        easing: import_react_native20.Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      })
    ]).start();
  }, [open, opacity, translateY, reduceMotion]);
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    import_react_native20.Modal,
    {
      visible: open,
      transparent: true,
      animationType: "none",
      onRequestClose: onClose,
      statusBarTranslucent: true,
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_react_native20.Animated.View, { style: { flex: 1, opacity }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native20.Pressable, { style: styles.msSheetScrim, onPress: onClose }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
          import_react_native20.Animated.View,
          {
            ref,
            style: [styles.msSheet, { transform: [{ translateY }] }],
            accessibilityViewIsModal: true,
            children: [
              grabber && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native20.View, { style: styles.msSheetGrabber }),
              title && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native20.Text, { style: styles.msSheetTitle, children: title }),
              description && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native20.Text, { style: styles.msSheetDesc, children: description }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native20.View, { style: { marginTop: title || description ? 16 : 0 }, children })
            ]
          }
        )
      ] })
    }
  );
});

// src/Dialog.tsx
var import_react20 = require("react");
var import_react_native21 = require("react-native");
var import_jsx_runtime19 = require("react/jsx-runtime");
var Dialog = (0, import_react20.forwardRef)(function Dialog2({ open, onClose, title, description, dismissible = true, children, ...rest }, ref) {
  const reduceMotion = useReducedMotion();
  const opacity = (0, import_react20.useRef)(new import_react_native21.Animated.Value(0)).current;
  const scale = (0, import_react20.useRef)(new import_react_native21.Animated.Value(0.96)).current;
  (0, import_react20.useEffect)(() => {
    import_react_native21.Animated.parallel([
      import_react_native21.Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: reduceMotion ? 0 : open ? 180 : 120,
        easing: import_react_native21.Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      }),
      import_react_native21.Animated.timing(scale, {
        toValue: open ? 1 : 0.96,
        duration: reduceMotion ? 0 : open ? 220 : 140,
        easing: import_react_native21.Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      })
    ]).start();
  }, [open, opacity, scale, reduceMotion]);
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    import_react_native21.Modal,
    {
      visible: open,
      transparent: true,
      animationType: "none",
      onRequestClose: onClose,
      statusBarTranslucent: true,
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_react_native21.Animated.View, { style: [styles.msDialogScrim, { opacity }], children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
          import_react_native21.Pressable,
          {
            style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
            onPress: dismissible ? onClose : void 0
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
          import_react_native21.Animated.View,
          {
            ref,
            style: [styles.msDialog, { transform: [{ scale }] }],
            accessibilityViewIsModal: true,
            children: [
              title && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native21.Text, { style: styles.msDialogTitle, children: title }),
              description && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native21.Text, { style: styles.msDialogDesc, children: description }),
              /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native21.View, { style: { marginTop: title || description ? 16 : 0 }, children })
            ]
          }
        )
      ] })
    }
  );
});

// src/Toast.tsx
var import_react21 = require("react");
var import_react_native22 = require("react-native");
var import_jsx_runtime20 = require("react/jsx-runtime");
var Ctx2 = (0, import_react21.createContext)(null);
var nextId = 1;
function ToastProvider({ children, defaultDuration = 3500 }) {
  const [items, setItems] = (0, import_react21.useState)([]);
  const timers = (0, import_react21.useRef)(/* @__PURE__ */ new Map());
  const dismiss = (0, import_react21.useCallback)((id) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const toast = (0, import_react21.useCallback)((item) => {
    const id = nextId++;
    setItems((prev) => [...prev, { id, ...item }]);
    timers.current.set(id, setTimeout(() => dismiss(id), item.duration ?? defaultDuration));
    return id;
  }, [defaultDuration, dismiss]);
  (0, import_react21.useEffect)(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);
  const value = (0, import_react21.useMemo)(() => ({ toast, dismiss }), [toast, dismiss]);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(Ctx2.Provider, { value, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_react_native22.View, { style: styles.msToastWrap, pointerEvents: "box-none", children: items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(ToastView, { item: t, onDismiss: () => dismiss(t.id) }, t.id)) })
  ] });
}
function ToastView({ item, onDismiss }) {
  const opacity = (0, import_react21.useRef)(new import_react_native22.Animated.Value(0)).current;
  const ty = (0, import_react21.useRef)(new import_react_native22.Animated.Value(20)).current;
  const reduceMotion = useReducedMotion();
  (0, import_react21.useEffect)(() => {
    import_react_native22.Animated.parallel([
      import_react_native22.Animated.timing(opacity, { toValue: 1, duration: reduceMotion ? 0 : 180, easing: import_react_native22.Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
      import_react_native22.Animated.timing(ty, { toValue: 0, duration: reduceMotion ? 0 : 220, easing: import_react_native22.Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true })
    ]).start();
  }, [opacity, ty, reduceMotion]);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_react_native22.Animated.View, { style: [styles.msToast, { opacity, transform: [{ translateY: ty }], marginBottom: 8 }], children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_react_native22.Text, { style: styles.msToastTitle, children: item.title }),
    item.action && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      import_react_native22.Pressable,
      {
        accessibilityRole: "button",
        hitSlop: { top: 12, bottom: 12, left: 8, right: 8 },
        onPress: () => {
          item.onActionPress?.();
          onDismiss();
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_react_native22.Text, { style: styles.msToastAction, children: item.action })
      }
    )
  ] });
}
function useToast() {
  const ctx = (0, import_react21.useContext)(Ctx2);
  if (!ctx) throw new Error("useToast must be called inside <ToastProvider>.");
  return ctx;
}

// src/Slider.tsx
var import_react22 = require("react");
var import_react_native23 = require("react-native");
var import_jsx_runtime21 = require("react/jsx-runtime");
var Slider = (0, import_react22.forwardRef)(function Slider2({ value, onValueChange, min = 0, max = 100, step = 1, disabled, style, ...rest }, ref) {
  const [trackWidth, setTrackWidth] = (0, import_react22.useState)(0);
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const updateFromX = (x) => {
    if (disabled || trackWidth === 0) return;
    const ratio = Math.max(0, Math.min(1, x / trackWidth));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.max(min, Math.min(max, stepped));
    if (clamped !== value) onValueChange(clamped);
  };
  const stepValue = (delta) => {
    if (disabled) return;
    const clamped = Math.max(min, Math.min(max, value + delta));
    if (clamped !== value) onValueChange(clamped);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
    import_react_native23.View,
    {
      ref,
      accessibilityRole: "adjustable",
      accessibilityValue: { min, max, now: value },
      accessibilityActions: [{ name: "increment" }, { name: "decrement" }],
      onAccessibilityAction: (e) => {
        if (e.nativeEvent.actionName === "increment") stepValue(step);
        else if (e.nativeEvent.actionName === "decrement") stepValue(-step);
      },
      onLayout: (e) => setTrackWidth(e.nativeEvent.layout.width),
      onStartShouldSetResponder: () => !disabled,
      onMoveShouldSetResponder: () => !disabled,
      onResponderGrant: (e) => updateFromX(e.nativeEvent.locationX),
      onResponderMove: (e) => updateFromX(e.nativeEvent.locationX),
      style: [
        { paddingVertical: 20, justifyContent: "center", opacity: disabled ? 0.5 : 1 },
        style
      ],
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_native23.View, { style: styles.msSliderTrack, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_native23.View, { style: [styles.msSliderFill, { width: `${pct * 100}%` }] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          import_react_native23.View,
          {
            style: [
              styles.msSliderThumb,
              { left: `${pct * 100}%`, marginLeft: -12 }
            ]
          }
        )
      ]
    }
  );
});

// src/SegmentedControl.tsx
var import_react23 = require("react");
var import_react_native24 = require("react-native");
var import_jsx_runtime22 = require("react/jsx-runtime");
var SegmentedControl = (0, import_react23.forwardRef)(function SegmentedControl2({ items, value, defaultValue, onValueChange, style, ...rest }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = (0, import_react23.useState)(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;
  const activeIndex = items.findIndex((i) => i.value === current);
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_react_native24.View, { ref, style: [styles.msSegmented, style], role: "tablist", ...rest, children: items.map((item, i) => {
    const active = i === activeIndex;
    const showSeparator = i > 0 && i !== activeIndex && i - 1 !== activeIndex;
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_react23.Fragment, { children: [
      i > 0 && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_react_native24.View, { style: [styles.msSegmentedSeparator, !showSeparator && { opacity: 0 }], "aria-hidden": true }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        import_react_native24.Pressable,
        {
          role: "tab",
          accessibilityState: { selected: active, disabled: item.disabled },
          disabled: item.disabled,
          onPress: () => {
            if (!isControlled) setInternal(item.value);
            onValueChange?.(item.value);
          },
          style: [
            styles.msSegmentedItem,
            active && styles.msSegmentedItemActive,
            item.disabled && { opacity: 0.4 }
          ],
          children: typeof item.label === "string" ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_react_native24.Text, { style: [styles.msSegmentedText, active && styles.msSegmentedTextActive], children: item.label }) : item.label
        }
      )
    ] }, item.value);
  }) });
});

// src/TabBar.tsx
var import_react24 = require("react");
var import_react_native25 = require("react-native");
var import_jsx_runtime23 = require("react/jsx-runtime");
var TabBar = (0, import_react24.forwardRef)(function TabBar2({ items, value, defaultValue, onValueChange, style, ...rest }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = (0, import_react24.useState)(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_react_native25.View, { ref, role: "tablist", style: [styles.msTabBar, style], ...rest, children: items.map((item) => {
    const active = item.value === current;
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
      import_react_native25.Pressable,
      {
        role: "tab",
        accessibilityState: { selected: active },
        onPress: () => {
          if (!isControlled) setInternal(item.value);
          onValueChange?.(item.value);
        },
        style: styles.msTabBarItem,
        children: [
          item.icon?.({ active }),
          typeof item.label === "string" ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_react_native25.Text, { style: [styles.msTabBarLabel, active && styles.msTabBarLabelActive], children: item.label }) : item.label
        ]
      },
      item.value
    );
  }) });
});

// src/PasswordInput.tsx
var import_react25 = require("react");
var import_react_native26 = require("react-native");
var import_jsx_runtime24 = require("react/jsx-runtime");
var PasswordInput = (0, import_react25.forwardRef)(
  function PasswordInput2({ hideToggle, style, ...rest }, ref) {
    const [visible, setVisible] = (0, import_react25.useState)(false);
    if (hideToggle) {
      return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Input, { ref, secureTextEntry: true, style, ...rest });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_react_native26.View, { style: { position: "relative", justifyContent: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        Input,
        {
          ref,
          secureTextEntry: !visible,
          style: [{ paddingRight: 70 }, style],
          ...rest
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        import_react_native26.Pressable,
        {
          onPress: () => setVisible((v) => !v),
          style: ({ pressed }) => ({
            position: "absolute",
            right: 6,
            height: 32,
            paddingHorizontal: 10,
            justifyContent: "center",
            borderRadius: 6,
            backgroundColor: pressed ? colors.bgMuted : "transparent"
          }),
          hitSlop: 8,
          accessibilityLabel: visible ? "Hide password" : "Show password",
          children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_react_native26.Text, { style: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.fg2 }, children: visible ? "Hide" : "Show" })
        }
      )
    ] });
  }
);

// src/NumberInput.tsx
var import_react26 = require("react");
var import_react_native27 = require("react-native");
var import_lucide_react_native4 = require("lucide-react-native");
var import_jsx_runtime25 = require("react/jsx-runtime");
var NumberInput = (0, import_react26.forwardRef)(function NumberInput2({ value, defaultValue, onValueChange, min = -Infinity, max = Infinity, step = 1, disabled, placeholder, style }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = (0, import_react26.useState)(defaultValue);
  const current = isControlled ? value : internal;
  const [draft, setDraft] = (0, import_react26.useState)(null);
  const clamp = (0, import_react26.useCallback)((n) => Math.max(min, Math.min(max, n)), [min, max]);
  const commit = (next) => {
    if (disabled) return;
    const c = clamp(next);
    setDraft(null);
    if (!isControlled) setInternal(c);
    onValueChange?.(c);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
    import_react_native27.View,
    {
      style: [
        {
          flexDirection: "row",
          alignItems: "stretch",
          alignSelf: "flex-start",
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.xl,
          backgroundColor: colors.bg,
          overflow: "hidden",
          opacity: disabled ? 0.6 : 1
        },
        style
      ],
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          StepperButton,
          {
            kind: "decrement",
            onPress: () => commit((current ?? 0) - step),
            disabled: disabled || current !== void 0 && current <= min
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          Input,
          {
            ref,
            keyboardType: "numeric",
            value: draft !== null ? draft : current === void 0 ? "" : String(current),
            onChangeText: (t) => {
              setDraft(t);
              if (t === "" || t === "-") return;
              const n = Number(t);
              if (Number.isFinite(n)) {
                if (!isControlled) setInternal(n);
                onValueChange?.(n);
              }
            },
            onBlur: () => {
              if (draft !== null) {
                const n = Number(draft);
                if (Number.isFinite(n) && draft !== "" && draft !== "-") commit(n);
                setDraft(null);
              }
            },
            editable: !disabled,
            placeholder,
            style: {
              width: 44,
              textAlign: "center",
              borderWidth: 0,
              borderRadius: 0
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          StepperButton,
          {
            kind: "increment",
            onPress: () => commit((current ?? 0) + step),
            disabled: disabled || current !== void 0 && current >= max
          }
        )
      ]
    }
  );
});
function StepperButton({ kind, onPress, disabled }) {
  const Icon = kind === "increment" ? import_lucide_react_native4.Plus : import_lucide_react_native4.Minus;
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    import_react_native27.Pressable,
    {
      onPress,
      disabled,
      style: ({ pressed }) => ({
        backgroundColor: pressed ? colors.bgMuted : colors.bgSubtle,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        minWidth: 44,
        opacity: disabled ? 0.4 : 1
      }),
      accessibilityRole: "button",
      accessibilityState: { disabled: !!disabled },
      accessibilityLabel: kind === "increment" ? "Increase" : "Decrease",
      children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Icon, { size: 18, strokeWidth: 2, color: colors.fg1 })
    }
  );
}

// src/PinInput.tsx
var import_react27 = require("react");
var import_react_native28 = require("react-native");
var import_jsx_runtime26 = require("react/jsx-runtime");
var DIGIT_RE = /^[0-9]$/;
var PinInput = (0, import_react27.forwardRef)(function PinInput2({ length = 6, value, defaultValue = "", onValueChange, onComplete, mask, disabled, autoFocus, style, "aria-label": ariaLabel = "One-time code" }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = (0, import_react27.useState)(defaultValue.slice(0, length));
  const current = (isControlled ? value : internal).padEnd(length, "").slice(0, length);
  const inputs = (0, import_react27.useRef)([]);
  const [focused, setFocused] = (0, import_react27.useState)(-1);
  (0, import_react27.useEffect)(() => {
    if (autoFocus) inputs.current[0]?.focus();
  }, [autoFocus]);
  const set = (next) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
    if (next.length === length) onComplete?.(next);
  };
  const onChange = (i, raw) => {
    if (disabled) return;
    if (raw.length > 1) {
      const cleaned = raw.replace(/\s+/g, "").slice(0, length);
      if ([...cleaned].every((c) => DIGIT_RE.test(c))) {
        set(cleaned);
        const focusIdx = Math.min(cleaned.length, length - 1);
        inputs.current[focusIdx]?.focus();
      }
      return;
    }
    const ch = raw.slice(-1);
    if (ch && !DIGIT_RE.test(ch)) return;
    const arr = Array.from({ length }, (_, k) => current[k] ?? "");
    arr[i] = ch;
    set(arr.join(""));
    if (ch && i < length - 1) inputs.current[i + 1]?.focus();
  };
  const onKey = (i, e) => {
    if (e.nativeEvent.key === "Backspace" && !current[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react_native28.View, { ref, accessibilityRole: "text", accessibilityLabel: ariaLabel, style: [{ flexDirection: "row", gap: 6 }, style], children: Array.from({ length }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    import_react_native28.TextInput,
    {
      ref: (el) => {
        inputs.current[i] = el;
      },
      value: current[i] || "",
      onChangeText: (t) => onChange(i, t),
      onKeyPress: (e) => onKey(i, e),
      onFocus: () => setFocused(i),
      onBlur: () => setFocused(-1),
      editable: !disabled,
      keyboardType: "number-pad",
      maxLength: 1,
      secureTextEntry: mask,
      textContentType: i === 0 ? "oneTimeCode" : "none",
      autoComplete: i === 0 ? "one-time-code" : "off",
      style: {
        width: 44,
        height: 52,
        textAlign: "center",
        fontSize: fontSize.lg,
        fontWeight: fontWeight.medium,
        color: colors.fg1,
        backgroundColor: disabled ? colors.bgMuted : colors.bg,
        borderWidth: 1,
        borderColor: focused === i ? colors.fg1 : colors.border,
        borderRadius: radius.xl
      },
      accessibilityLabel: `Digit ${i + 1} of ${length}`
    },
    i
  )) });
});

// src/Tabs.tsx
var import_react28 = require("react");
var import_react_native29 = require("react-native");
var import_jsx_runtime27 = require("react/jsx-runtime");
var Tabs = (0, import_react28.forwardRef)(function Tabs2({ items, value, defaultValue, onValueChange, scrollable = true, style }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = (0, import_react28.useState)(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;
  const Container = scrollable ? import_react_native29.ScrollView : import_react_native29.View;
  const containerProps = scrollable ? { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { paddingHorizontal: space[2] } } : { style: { flexDirection: "row" } };
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    import_react_native29.View,
    {
      ref,
      accessibilityRole: "tablist",
      style: [
        { borderBottomWidth: import_react_native29.StyleSheet.hairlineWidth, borderBottomColor: colors.borderSubtle, backgroundColor: colors.bg },
        style
      ],
      children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Container, { ...containerProps, children: items.map((item) => {
        const active = item.value === current;
        return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          import_react_native29.Pressable,
          {
            accessibilityRole: "tab",
            accessibilityState: { selected: active, disabled: item.disabled },
            disabled: item.disabled,
            onPress: () => {
              if (!isControlled) setInternal(item.value);
              onValueChange?.(item.value);
            },
            style: ({ pressed }) => ({
              paddingHorizontal: space[4],
              paddingVertical: space[4],
              opacity: item.disabled ? 0.4 : pressed ? 0.7 : 1,
              borderBottomWidth: 2,
              borderBottomColor: active ? colors.fg1 : "transparent",
              marginBottom: -1
            }),
            children: typeof item.label === "string" ? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react_native29.Text, { style: { fontSize: fontSize.md, fontWeight: active ? fontWeight.semibold : fontWeight.medium, color: active ? colors.fg1 : colors.fg3 }, children: item.label }) : item.label
          },
          item.value
        );
      }) })
    }
  );
});

// src/Popover.tsx
var import_react29 = require("react");
var import_react_native30 = require("react-native");
var import_jsx_runtime28 = require("react/jsx-runtime");
var Popover = (0, import_react29.forwardRef)(function Popover2({ open, onClose, anchorRef, side = "bottom", sideOffset = 6, width, children, contentStyle }, ref) {
  const reduceMotion = useReducedMotion();
  const { width: windowWidth } = (0, import_react_native30.useWindowDimensions)();
  const [anchor, setAnchor] = (0, import_react29.useState)(null);
  const [size, setSize] = (0, import_react29.useState)({ w: 0, h: 0 });
  const [origin, setOrigin] = (0, import_react29.useState)({ x: 0, y: 0 });
  const [host, setHost] = (0, import_react29.useState)(null);
  const backdropRef = (0, import_react29.useRef)(null);
  const opacity = (0, import_react29.useRef)(new import_react_native30.Animated.Value(0)).current;
  const ty = (0, import_react29.useRef)(new import_react_native30.Animated.Value(side === "top" ? 4 : -4)).current;
  (0, import_react29.useEffect)(() => {
    if (open && anchorRef.current) {
      anchorRef.current.measureInWindow((x, y, w2, h) => setAnchor({ x, y, w: w2, h }));
    } else {
      setAnchor(null);
    }
  }, [open, anchorRef]);
  (0, import_react29.useEffect)(() => {
    if (open) {
      import_react_native30.Animated.parallel([
        import_react_native30.Animated.timing(opacity, { toValue: 1, duration: reduceMotion ? 0 : 140, easing: import_react_native30.Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
        import_react_native30.Animated.timing(ty, { toValue: 0, duration: reduceMotion ? 0 : 180, easing: import_react_native30.Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true })
      ]).start();
    } else {
      import_react_native30.Animated.parallel([
        import_react_native30.Animated.timing(opacity, { toValue: 0, duration: reduceMotion ? 0 : 140, easing: import_react_native30.Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
        import_react_native30.Animated.timing(ty, { toValue: side === "top" ? 4 : -4, duration: reduceMotion ? 0 : 180, easing: import_react_native30.Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true })
      ]).start();
    }
  }, [open, opacity, ty, side, reduceMotion]);
  if (!open || !anchor) return null;
  const EDGE = 12;
  const hostW = host?.w ?? windowWidth;
  const isAuto = width === "auto";
  const maxW = hostW - EDGE * 2;
  const w = isAuto ? void 0 : Math.min(width ?? anchor.w, maxW);
  const panelW = w ?? size.w;
  const anchorLeft = anchor.x - origin.x;
  const anchorRight = anchor.x + anchor.w - origin.x;
  let left = anchorLeft;
  if (panelW > 0) {
    if (anchorLeft + panelW > hostW - EDGE) left = anchorRight - panelW;
    left = Math.max(EDGE, Math.min(left, hostW - panelW - EDGE));
  }
  let top = (side === "bottom" ? anchor.y + anchor.h + sideOffset : anchor.y - size.h - sideOffset) - origin.y;
  if (host && size.h > 0) {
    top = Math.max(EDGE, Math.min(top, host.h - size.h - EDGE));
  }
  const onContentLayout = (e) => {
    setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_native30.Modal, { visible: true, transparent: true, animationType: "none", onRequestClose: onClose, statusBarTranslucent: true, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    import_react_native30.Pressable,
    {
      ref: backdropRef,
      style: { flex: 1 },
      onPress: onClose,
      onLayout: (e) => {
        const { width: lw, height: lh } = e.nativeEvent.layout;
        setHost({ w: lw, h: lh });
        backdropRef.current?.measureInWindow((x, y) => setOrigin({ x, y }));
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
        import_react_native30.Animated.View,
        {
          ref,
          onStartShouldSetResponder: () => true,
          onLayout: onContentLayout,
          style: [
            {
              position: "absolute",
              top,
              left,
              ...w !== void 0 ? { width: w } : null,
              backgroundColor: colors.bg,
              borderColor: colors.borderSubtle,
              borderWidth: 1,
              borderRadius: radius.xl,
              padding: 8,
              opacity,
              transform: [{ translateY: ty }]
            },
            shadow.lg,
            contentStyle
          ],
          children
        }
      )
    }
  ) });
});

// src/Combobox.tsx
var import_react30 = require("react");
var import_react_native31 = require("react-native");
var import_lucide_react_native5 = require("lucide-react-native");
var import_jsx_runtime29 = require("react/jsx-runtime");
function defaultFilter(q, o) {
  const query = q.toLowerCase();
  return o.label.toLowerCase().includes(query) || !!o.description?.toLowerCase().includes(query) || !!o.keywords?.some((k) => k.toLowerCase().includes(query));
}
var Combobox = (0, import_react30.forwardRef)(function Combobox2({ options, value, onValueChange, placeholder = "Select\u2026", searchPlaceholder = "Search\u2026", emptyMessage = "No results.", filter = defaultFilter, disabled, style }, ref) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = (0, import_react30.useState)(false);
  const [query, setQuery] = (0, import_react30.useState)("");
  const selected = options.find((o) => o.value === value) || null;
  const filtered = (0, import_react30.useMemo)(
    () => query.trim() ? options.filter((o) => filter(query, o)) : options,
    [query, options, filter]
  );
  const close = () => {
    setOpen(false);
    setQuery("");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_react_native31.View, { ref, style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
      import_react_native31.Pressable,
      {
        onPress: () => !disabled && setOpen(true),
        accessibilityRole: "combobox",
        accessibilityState: { expanded: open, disabled },
        disabled,
        style: ({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 14,
          paddingVertical: 12,
          minHeight: 44,
          borderWidth: 1,
          borderColor: pressed ? colors.fg3 : colors.border,
          borderRadius: radius.xl,
          backgroundColor: disabled ? colors.bgMuted : colors.bg,
          opacity: disabled ? 0.6 : 1
        }),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native31.Text, { style: { fontSize: fontSize.base, color: selected ? colors.fg1 : colors.fg4 }, children: selected ? selected.label : placeholder }),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_lucide_react_native5.ChevronDown, { size: 18, color: colors.fg3, strokeWidth: 2 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native31.Modal, { visible: open, animationType: reduceMotion ? "none" : "slide", transparent: true, onRequestClose: close, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native31.Pressable, { style: { flex: 1, backgroundColor: colors.scrim }, onPress: close, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
      import_react_native31.Pressable,
      {
        onPress: (e) => e.stopPropagation(),
        style: {
          marginTop: "auto",
          maxHeight: "80%",
          backgroundColor: colors.bg,
          borderTopLeftRadius: radius.xl,
          borderTopRightRadius: radius.xl,
          paddingTop: 12,
          paddingBottom: space[7]
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native31.View, { style: { width: 36, height: 5, borderRadius: 999, backgroundColor: colors.border, alignSelf: "center", marginBottom: space[3] } }),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native31.View, { style: { paddingHorizontal: space[5], paddingBottom: space[3], borderBottomWidth: 1, borderBottomColor: colors.borderSubtle }, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
            import_react_native31.TextInput,
            {
              value: query,
              onChangeText: setQuery,
              placeholder: searchPlaceholder,
              placeholderTextColor: colors.fg4,
              autoFocus: true,
              style: {
                fontSize: fontSize.base,
                color: colors.fg1,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                backgroundColor: colors.bgSubtle
              }
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native31.ScrollView, { keyboardShouldPersistTaps: "handled", style: { maxHeight: 360 }, children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native31.View, { style: { paddingVertical: space[7], alignItems: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native31.Text, { style: { fontSize: fontSize.sm, color: colors.fg3 }, children: emptyMessage }) }) : filtered.map((opt) => {
            const isSel = opt.value === value;
            return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
              import_react_native31.Pressable,
              {
                disabled: opt.disabled,
                onPress: () => {
                  onValueChange?.(opt.value);
                  close();
                },
                style: ({ pressed }) => ({
                  paddingHorizontal: space[5],
                  paddingVertical: space[4],
                  backgroundColor: pressed ? colors.bgMuted : "transparent",
                  opacity: opt.disabled ? 0.5 : 1
                }),
                children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_react_native31.View, { style: { flexDirection: "row", alignItems: "center", gap: 10 }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_react_native31.View, { style: { flex: 1 }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native31.Text, { style: { fontSize: fontSize.base, fontWeight: isSel ? fontWeight.semibold : fontWeight.regular, color: colors.fg1 }, children: opt.label }),
                    opt.description && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_native31.Text, { style: { fontSize: fontSize.sm, color: colors.fg3, marginTop: 2 }, children: opt.description })
                  ] }),
                  isSel && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_lucide_react_native5.Check, { size: 16, color: colors.fg1, strokeWidth: 2 })
                ] })
              },
              opt.value
            );
          }) })
        ]
      }
    ) }) })
  ] });
});

// src/Accordion.tsx
var import_react31 = require("react");
var import_react_native32 = require("react-native");
var import_lucide_react_native6 = require("lucide-react-native");
var import_jsx_runtime30 = require("react/jsx-runtime");
var Ctx3 = (0, import_react31.createContext)(null);
function Accordion({ type = "single", defaultValue, value, onValueChange, children, style }) {
  const isControlled = value !== void 0;
  const initialSet = (() => {
    const v = isControlled ? value : defaultValue;
    if (v === void 0) return /* @__PURE__ */ new Set();
    return new Set(Array.isArray(v) ? v : [v]);
  })();
  const [internal, setInternal] = (0, import_react31.useState)(initialSet);
  const open = isControlled ? new Set(Array.isArray(value) ? value : value === void 0 ? [] : [value]) : internal;
  const setOpen = (next) => {
    if (!isControlled) setInternal(next);
    if (type === "single") onValueChange?.([...next][0] ?? "");
    else onValueChange?.([...next]);
  };
  const toggle = (id) => {
    const next = new Set(open);
    if (next.has(id)) next.delete(id);
    else {
      if (type === "single") next.clear();
      next.add(id);
    }
    setOpen(next);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Ctx3.Provider, { value: { open, toggle }, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native32.View, { style, children }) });
}
function AccordionItem({ value, title, children, disabled }) {
  const ctx = (0, import_react31.useContext)(Ctx3);
  if (!ctx) throw new Error("AccordionItem must be used inside <Accordion>.");
  const isOpen = ctx.open.has(value);
  const reduceMotion = useReducedMotion();
  const rotate = (0, import_react31.useRef)(new import_react_native32.Animated.Value(isOpen ? 1 : 0)).current;
  (0, import_react31.useEffect)(() => {
    import_react_native32.Animated.timing(rotate, {
      toValue: isOpen ? 1 : 0,
      duration: reduceMotion ? 0 : 180,
      easing: import_react_native32.Easing.bezier(0.3, 0, 0, 1),
      useNativeDriver: true
    }).start();
  }, [isOpen, rotate, reduceMotion]);
  const angle = rotate.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_react_native32.View, { style: { borderBottomWidth: import_react_native32.StyleSheet.hairlineWidth, borderBottomColor: colors.borderSubtle }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
      import_react_native32.Pressable,
      {
        accessibilityRole: "button",
        accessibilityLabel: typeof title === "string" ? title : void 0,
        accessibilityState: { expanded: isOpen, disabled },
        disabled,
        onPress: () => ctx.toggle(value),
        style: ({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 14,
          paddingHorizontal: 0,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1
        }),
        children: [
          typeof title === "string" ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native32.Text, { style: { fontSize: fontSize.base, fontWeight: fontWeight.medium, color: colors.fg1, flex: 1 }, children: title }) : /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native32.View, { style: { flex: 1 }, children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native32.Animated.View, { style: { transform: [{ rotate: angle }] }, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_lucide_react_native6.ChevronDown, { size: 18, color: colors.fg3, strokeWidth: 2 }) })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native32.View, { style: { paddingBottom: 14, paddingHorizontal: 0 }, children: typeof children === "string" ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native32.Text, { style: { fontSize: fontSize.sm, color: colors.fg2, lineHeight: fontSize.sm * 1.55 }, children }) : children })
  ] });
}

// src/NavigationHeader.tsx
var import_react32 = require("react");
var import_react_native33 = require("react-native");
var import_lucide_react_native7 = require("lucide-react-native");
var import_jsx_runtime31 = require("react/jsx-runtime");
var NavigationHeader = (0, import_react32.forwardRef)(function NavigationHeader2({ title, leading, trailing, border = true, style }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
    import_react_native33.View,
    {
      ref,
      accessibilityRole: "header",
      style: [
        {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
          height: 56,
          backgroundColor: colors.bg,
          gap: 8,
          borderBottomWidth: border ? import_react_native33.StyleSheet.hairlineWidth : 0,
          borderBottomColor: colors.borderSubtle
        },
        style
      ],
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_native33.View, { style: { minWidth: 44, alignItems: "flex-start" }, children: leading }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_native33.View, { style: { flex: 1, alignItems: "center" }, children: typeof title === "string" ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_native33.Text, { style: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.fg1, textAlign: "center" }, numberOfLines: 1, children: title }) : title }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react_native33.View, { style: { minWidth: 44, alignItems: "flex-end" }, children: trailing })
      ]
    }
  );
});
function NavigationBack({ onPress, label = "Back" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    import_react_native33.Pressable,
    {
      onPress,
      accessibilityRole: "button",
      accessibilityLabel: label,
      hitSlop: 8,
      style: ({ pressed }) => ({
        width: 40,
        height: 40,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pressed ? colors.bgMuted : "transparent"
      }),
      children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react_native7.ChevronLeft, { size: 26, color: colors.fg1, strokeWidth: 2 })
    }
  );
}

// src/ActionSheet.tsx
var import_react33 = require("react");
var import_react_native34 = require("react-native");
var import_jsx_runtime32 = require("react/jsx-runtime");
var ActionSheet = (0, import_react33.forwardRef)(function ActionSheet2({ title, description, actions, cancelLabel = "Cancel", onClose, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
    Sheet,
    {
      ref,
      onClose,
      grabber: false,
      ...rest,
      children: [
        (title || description) && /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_react_native34.View, { style: {
          alignItems: "center",
          paddingBottom: space[4],
          marginBottom: space[2],
          borderBottomWidth: import_react_native34.StyleSheet.hairlineWidth,
          borderBottomColor: colors.borderSubtle
        }, children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_native34.Text, { style: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, color: colors.fg1, textAlign: "center" }, children: title }),
          description && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_native34.Text, { style: { fontSize: fontSize.sm, color: colors.fg3, marginTop: space[1], textAlign: "center" }, children: description })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_native34.View, { children: actions.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_react33.Fragment, { children: [
          i > 0 && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_native34.View, { style: { height: import_react_native34.StyleSheet.hairlineWidth, backgroundColor: colors.borderSubtle }, "aria-hidden": true }),
          /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
            import_react_native34.Pressable,
            {
              disabled: a.disabled,
              onPress: () => {
                a.onPress?.();
                onClose();
              },
              style: ({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: space[4],
                minHeight: 52,
                paddingVertical: space[4],
                paddingHorizontal: space[2],
                backgroundColor: pressed ? colors.bgMuted : "transparent",
                borderRadius: 8,
                opacity: a.disabled ? 0.4 : 1
              }),
              accessibilityRole: "button",
              accessibilityState: { disabled: a.disabled },
              accessibilityHint: a.destructive ? "This action cannot be undone" : void 0,
              children: [
                a.icon,
                /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_native34.Text, { style: {
                  fontSize: fontSize.base,
                  color: a.destructive ? colors.statusDanger : colors.fg1
                }, children: a.label })
              ]
            }
          )
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          import_react_native34.Pressable,
          {
            onPress: onClose,
            style: ({ pressed }) => ({
              marginTop: space[4],
              minHeight: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? colors.border : colors.bgMuted,
              borderRadius: 12
            }),
            accessibilityRole: "button",
            children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react_native34.Text, { style: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.fg1 }, children: cancelLabel })
          }
        )
      ]
    }
  );
});

// src/AppShell.tsx
var import_react34 = require("react");
var import_react_native35 = require("react-native");
var import_jsx_runtime33 = require("react/jsx-runtime");
var AppShell = (0, import_react34.forwardRef)(function AppShell2({ header, tabBar, children, backgroundColor = colors.bg, style }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_react_native35.SafeAreaView, { style: [{ flex: 1, backgroundColor }, style], children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_react_native35.View, { ref, style: { flex: 1 }, children: [
    header,
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_react_native35.View, { style: { flex: 1, minHeight: 0 }, children }),
    tabBar
  ] }) });
});

// src/Tooltip.tsx
var import_react35 = require("react");
var import_react_native36 = require("react-native");
var import_jsx_runtime34 = require("react/jsx-runtime");
function Tooltip({ content, children, side = "top", width, longPressDelay = 400 }) {
  const triggerRef = (0, import_react35.useRef)(null);
  const [open, setOpen] = (0, import_react35.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_jsx_runtime34.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
      import_react_native36.Pressable,
      {
        ref: triggerRef,
        accessibilityRole: "button",
        accessibilityLabel: typeof content === "string" ? content : void 0,
        accessibilityHint: "Long press to show the label",
        onLongPress: () => setOpen(true),
        delayLongPress: longPressDelay,
        children
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
      Popover,
      {
        open,
        onClose: () => setOpen(false),
        anchorRef: triggerRef,
        side,
        width: width ?? "auto",
        contentStyle: {
          backgroundColor: colors.fg1,
          borderWidth: 0,
          borderRadius: 8,
          paddingVertical: 6,
          paddingHorizontal: 10,
          maxWidth: 240
        },
        children: typeof content === "string" ? /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_react_native36.Text, { style: { fontSize: fontSize.sm, color: mono[0] }, children: content }) : content
      }
    )
  ] });
}

// src/DatePicker.tsx
var import_react37 = require("react");
var import_react_native38 = require("react-native");
var import_lucide_react_native9 = require("lucide-react-native");

// src/Calendar.tsx
var import_react36 = require("react");
var import_react_native37 = require("react-native");
var import_lucide_react_native8 = require("lucide-react-native");
var import_jsx_runtime35 = require("react/jsx-runtime");
function startOfDay(d) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function addMonths(d, n) {
  const c = new Date(d);
  c.setMonth(c.getMonth() + n);
  return c;
}
function weekdayLabels(locale, weekStartsOn) {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const base = new Date(2021, 0, 4);
  const labels = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    labels.push(fmt.format(d));
  }
  if (weekStartsOn === 0) labels.unshift(labels.pop());
  return labels;
}
var Calendar = (0, import_react36.forwardRef)(function Calendar2({ value, defaultValue, onValueChange, month, defaultMonth, onMonthChange, min, max, locale, weekStartsOn = 1, style }, ref) {
  const isControlled = value !== void 0;
  const [internalSel, setInternalSel] = (0, import_react36.useState)(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internalSel;
  const monthControlled = month !== void 0;
  const [internalMonth, setInternalMonth] = (0, import_react36.useState)(() => month ?? defaultMonth ?? selected ?? /* @__PURE__ */ new Date());
  const view = monthControlled ? month : internalMonth;
  const setView = (d) => {
    if (!monthControlled) setInternalMonth(d);
    onMonthChange?.(d);
  };
  const select = (d) => {
    if (!isControlled) setInternalSel(d);
    onValueChange?.(d);
  };
  const isDisabled = (d) => {
    if (min && startOfDay(d) < startOfDay(min)) return true;
    if (max && startOfDay(d) > startOfDay(max)) return true;
    return false;
  };
  const firstOfMonth = new Date(view.getFullYear(), view.getMonth(), 1);
  const startWeekday = (firstOfMonth.getDay() - weekStartsOn + 7) % 7;
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - startWeekday);
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  const monthLabel = view.toLocaleDateString(locale, { month: "long", year: "numeric" });
  const today = startOfDay(/* @__PURE__ */ new Date());
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(import_react_native37.View, { ref, style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(import_react_native37.View, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: space[4] }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(NavBtn, { accessibilityLabel: "Previous month", onPress: () => setView(addMonths(view, -1)), children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_lucide_react_native8.ChevronLeft, { size: 20, color: colors.fg1, strokeWidth: 2 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native37.Text, { style: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 }, children: monthLabel }),
      /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(NavBtn, { accessibilityLabel: "Next month", onPress: () => setView(addMonths(view, 1)), children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_lucide_react_native8.ChevronRight, { size: 20, color: colors.fg1, strokeWidth: 2 }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native37.View, { style: { flexDirection: "row", marginBottom: space[3] }, children: weekdayLabels(locale, weekStartsOn).map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native37.Text, { style: { flex: 1, textAlign: "center", fontSize: fontSize.xs, color: colors.fg3, textTransform: "uppercase", letterSpacing: 0.5 }, children: w }, i)) }),
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native37.View, { style: { flexDirection: "row", flexWrap: "wrap" }, children: days.map((d) => {
      const inMonth = d.getMonth() === view.getMonth();
      const isSelected = selected && sameDay(d, selected);
      const isToday = sameDay(d, today);
      const off = isDisabled(d);
      return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
        import_react_native37.Pressable,
        {
          disabled: off,
          onPress: () => select(d),
          accessibilityRole: "button",
          accessibilityState: { selected: !!isSelected, disabled: off },
          accessibilityLabel: d.toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
          style: { width: `${100 / 7}%`, height: 44, alignItems: "center", justifyContent: "center" },
          children: ({ pressed }) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native37.View, { style: {
            width: 38,
            height: 38,
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isSelected ? colors.accent : pressed && !off ? colors.bgMuted : "transparent",
            borderWidth: isToday && !isSelected ? 1 : 0,
            borderColor: colors.border
          }, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react_native37.Text, { style: {
            fontSize: fontSize.base,
            color: off ? colors.fg4 : isSelected ? colors.accentFg : !inMonth ? colors.fg4 : colors.fg1,
            fontWeight: isToday && !isSelected ? fontWeight.semibold : fontWeight.regular
          }, children: d.getDate() }) })
        },
        d.toISOString()
      );
    }) })
  ] });
});
function NavBtn({ accessibilityLabel, onPress, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    import_react_native37.Pressable,
    {
      onPress,
      hitSlop: 8,
      accessibilityRole: "button",
      accessibilityLabel,
      style: ({ pressed }) => ({
        width: 36,
        height: 36,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pressed ? colors.bgMuted : "transparent"
      }),
      children
    }
  );
}

// src/DatePicker.tsx
var import_jsx_runtime36 = require("react/jsx-runtime");
function defaultFormat(d, locale) {
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}
var DatePicker = (0, import_react37.forwardRef)(function DatePicker2({ value, defaultValue, onValueChange, min, max, locale, placeholder = "Pick a date", disabled, format = (d) => defaultFormat(d, locale), style }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = (0, import_react37.useState)(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internal;
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = (0, import_react37.useState)(false);
  const [view, setView] = (0, import_react37.useState)(() => selected || /* @__PURE__ */ new Date());
  const set = (d) => {
    if (!isControlled) setInternal(d);
    onValueChange?.(d);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(import_react_native38.View, { ref, style, children: [
    /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
      import_react_native38.Pressable,
      {
        onPress: () => !disabled && setOpen(true),
        disabled,
        accessibilityRole: "button",
        accessibilityState: { disabled },
        style: ({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 14,
          paddingVertical: 12,
          minHeight: 44,
          borderWidth: 1,
          borderColor: pressed ? colors.fg3 : colors.border,
          borderRadius: radius.xl,
          backgroundColor: disabled ? colors.bgMuted : colors.bg,
          opacity: disabled ? 0.6 : 1,
          gap: 8
        }),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native38.Text, { style: { fontSize: fontSize.base, color: selected ? colors.fg1 : colors.fg4, flex: 1 }, children: selected ? format(selected) : placeholder }),
          /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_lucide_react_native9.Calendar, { size: 18, color: colors.fg3, strokeWidth: 2 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native38.Modal, { visible: open, animationType: reduceMotion ? "none" : "slide", transparent: true, onRequestClose: () => setOpen(false), statusBarTranslucent: true, children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native38.Pressable, { style: { flex: 1, backgroundColor: colors.scrim }, onPress: () => setOpen(false), children: /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
      import_react_native38.Pressable,
      {
        onPress: (e) => e.stopPropagation(),
        style: {
          marginTop: "auto",
          backgroundColor: colors.bg,
          borderTopLeftRadius: radius.xl,
          borderTopRightRadius: radius.xl,
          paddingTop: 12,
          paddingHorizontal: space[5],
          paddingBottom: space[7]
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native38.View, { style: { width: 36, height: 5, borderRadius: 999, backgroundColor: colors.border, alignSelf: "center", marginBottom: space[4] } }),
          /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
            Calendar,
            {
              value: selected,
              month: view,
              onMonthChange: setView,
              onValueChange: (d) => {
                set(d);
                setOpen(false);
              },
              min,
              max,
              locale
            }
          ),
          selected && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
            import_react_native38.Pressable,
            {
              onPress: () => {
                set(null);
                setOpen(false);
              },
              style: ({ pressed }) => ({
                marginTop: space[3],
                paddingVertical: space[3],
                alignItems: "center",
                borderRadius: radius.lg,
                backgroundColor: pressed ? colors.bgMuted : "transparent"
              }),
              children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_react_native38.Text, { style: { fontSize: fontSize.sm, color: colors.fg3 }, children: "Clear" })
            }
          )
        ]
      }
    ) }) })
  ] });
});

// src/BottomSheet.tsx
var import_react38 = require("react");
var import_react_native39 = require("react-native");
var import_jsx_runtime37 = require("react/jsx-runtime");
var HIDDEN = 1e3;
var DISMISS_DISTANCE = 120;
var DISMISS_VELOCITY = 0.8;
var BottomSheet = (0, import_react38.forwardRef)(function BottomSheet2({ open, onClose, title, description, grabber = true, dragToDismiss = true, children, ...rest }, ref) {
  const reduceMotion = useReducedMotion();
  const translateY = (0, import_react38.useRef)(new import_react_native39.Animated.Value(HIDDEN)).current;
  const opacity = (0, import_react38.useRef)(new import_react_native39.Animated.Value(0)).current;
  const onCloseRef = (0, import_react38.useRef)(onClose);
  onCloseRef.current = onClose;
  const dragRef = (0, import_react38.useRef)(dragToDismiss);
  dragRef.current = dragToDismiss;
  const reduceRef = (0, import_react38.useRef)(reduceMotion);
  reduceRef.current = reduceMotion;
  (0, import_react38.useEffect)(() => {
    import_react_native39.Animated.parallel([
      import_react_native39.Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: reduceMotion ? 0 : open ? 180 : 120,
        easing: import_react_native39.Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      }),
      import_react_native39.Animated.timing(translateY, {
        toValue: open ? 0 : HIDDEN,
        duration: reduceMotion ? 0 : open ? 280 : 180,
        easing: import_react_native39.Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      })
    ]).start();
  }, [open, opacity, translateY, reduceMotion]);
  const pan = (0, import_react38.useRef)(
    import_react_native39.PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => dragRef.current && g.dy > 4 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > DISMISS_DISTANCE || g.vy > DISMISS_VELOCITY) {
          import_react_native39.Animated.timing(translateY, {
            toValue: HIDDEN,
            duration: reduceRef.current ? 0 : 200,
            easing: import_react_native39.Easing.bezier(0.3, 0, 0, 1),
            useNativeDriver: true
          }).start(() => onCloseRef.current());
        } else {
          import_react_native39.Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start();
        }
      }
    })
  ).current;
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    import_react_native39.Modal,
    {
      visible: open,
      transparent: true,
      animationType: "none",
      onRequestClose: onClose,
      statusBarTranslucent: true,
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_react_native39.Animated.View, { style: { flex: 1, opacity }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_native39.Pressable, { style: styles.msSheetScrim, onPress: onClose, accessibilityLabel: "Close" }),
        /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
          import_react_native39.Animated.View,
          {
            ref,
            style: [styles.msSheet, { transform: [{ translateY }] }],
            accessibilityViewIsModal: true,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_react_native39.View, { ...pan.panHandlers, children: [
                grabber && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_native39.View, { style: styles.msSheetGrabber }),
                title && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_native39.Text, { style: styles.msSheetTitle, children: title }),
                description && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_native39.Text, { style: styles.msSheetDesc, children: description })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_react_native39.View, { style: { marginTop: title || description ? 16 : 0 }, children })
            ]
          }
        )
      ] })
    }
  );
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionItem,
  ActionSheet,
  Alert,
  AppShell,
  Avatar,
  Badge,
  BottomSheet,
  Button,
  Calendar,
  Card,
  Checkbox,
  Chip,
  Combobox,
  DatePicker,
  Dialog,
  Divider,
  EmptyState,
  Field,
  Inline,
  Input,
  ListItem,
  NavigationBack,
  NavigationHeader,
  NumberInput,
  PasswordInput,
  PinInput,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  SegmentedControl,
  Sheet,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  Switch,
  TabBar,
  Tabs,
  ToastProvider,
  Tooltip,
  colors,
  fontSize,
  fontWeight,
  lineHeight,
  mono,
  radius,
  shadow,
  space,
  styles,
  tokens,
  useReducedMotion,
  useToast
});
//# sourceMappingURL=index.cjs.map