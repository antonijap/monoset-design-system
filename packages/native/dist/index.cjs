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
  Alert: () => Alert,
  Avatar: () => Avatar,
  Badge: () => Badge,
  Button: () => Button,
  Card: () => Card,
  Checkbox: () => Checkbox,
  Chip: () => Chip,
  Dialog: () => Dialog,
  Divider: () => Divider,
  EmptyState: () => EmptyState,
  Field: () => Field,
  Inline: () => Inline,
  Input: () => Input,
  ListItem: () => ListItem,
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
  ToastProvider: () => ToastProvider,
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
    borderRadius: 14,
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
    backgroundColor: "#fff"
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
  msBadgeTextSuccess: { color: colors.statusSuccess },
  msBadgeTextDanger: { color: colors.statusDanger },
  /* ─── Alert ───────────────────────────────────────────────────── */
  msAlert: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    borderRadius: radius.md,
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
    marginTop: 1,
    borderWidth: 1,
    borderColor: colors.fg1
  },
  msAlertIconWrapInfo: { borderColor: colors.fg1 },
  msAlertIconWrapSuccess: { borderColor: colors.statusSuccess, backgroundColor: "transparent" },
  msAlertIconWrapWarning: { borderColor: colors.statusWarning },
  msAlertIconWrapDanger: { borderColor: colors.statusDanger },
  msAlertIcon: { fontSize: 12, fontWeight: fontWeight.bold, color: colors.fg1, lineHeight: 14 },
  msAlertIconSuccess: { color: colors.statusSuccess },
  msAlertIconWarning: { color: colors.statusWarning },
  msAlertIconDanger: { color: colors.statusDanger },
  msAlertBody: { flex: 1 },
  msAlertTitle: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.fg1 },
  msAlertMessage: { fontSize: fontSize.sm, color: colors.fg2, marginTop: 2, lineHeight: fontSize.sm * 1.5 },
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
  msCheckRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 4 },
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
  msCheckLabel: { fontSize: fontSize.base, color: colors.fg1, flex: 1 },
  msCheckCheckmark: { color: "#fff", fontSize: 14, fontWeight: fontWeight.bold, lineHeight: 14 },
  /* ─── Radio ───────────────────────────────────────────────────── */
  msRadioRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 4 },
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
  msRadioLabel: { fontSize: fontSize.base, color: colors.fg1, flex: 1 },
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
    backgroundColor: colors.bgMuted,
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
    borderRadius: radius.md,
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
  msSliderThumb: { position: "absolute", top: -10, width: 24, height: 24, borderRadius: 999, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, ...shadow.sm },
  /* ─── SegmentedControl ────────────────────────────────────────── */
  msSegmented: {
    flexDirection: "row",
    backgroundColor: colors.bgMuted,
    borderRadius: radius.md,
    padding: 2,
    alignSelf: "flex-start"
  },
  msSegmentedItem: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm
  },
  msSegmentedItemActive: {
    backgroundColor: colors.bg,
    ...shadow.sm
  },
  msSegmentedText: { fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: colors.fg3 },
  msSegmentedTextActive: { color: colors.fg1 },
  /* ─── TabBar (bottom navigation) ──────────────────────────────── */
  msTabBar: {
    flexDirection: "row",
    backgroundColor: colors.bg,
    borderTopWidth: import_react_native.StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSubtle,
    paddingTop: 8,
    paddingBottom: 8
  },
  msTabBarItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 4, paddingVertical: 4 },
  msTabBarLabel: { fontSize: 11, fontWeight: fontWeight.medium, color: colors.fg3 },
  msTabBarLabelActive: { color: colors.fg1 }
});

// src/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = (0, import_react.forwardRef)(function Button2({ variant = "secondary", size = "md", disabled, leading, trailing, children, style, ...rest }, ref) {
  const sizeStyle = size === "sm" ? styles.msBtnSm : size === "lg" ? styles.msBtnLg : styles.msBtnMd;
  const variantStyle = disabled ? styles.msBtnDisabled : variant === "primary" ? styles.msBtnPrimary : variant === "ghost" ? styles.msBtnGhost : variant === "danger" ? styles.msBtnDanger : styles.msBtnSecondary;
  const labelVariantStyle = disabled ? styles.msBtnLabelDisabled : variant === "primary" ? styles.msBtnLabelPrimary : variant === "ghost" ? styles.msBtnLabelGhost : variant === "danger" ? styles.msBtnLabelDanger : styles.msBtnLabelSecondary;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react_native2.Pressable,
    {
      ref,
      disabled,
      android_ripple: { color: variant === "primary" || variant === "danger" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)" },
      style: ({ pressed }) => [
        styles.msBtn,
        sizeStyle,
        variantStyle,
        pressed && !disabled && { opacity: 0.85 },
        style
      ],
      ...rest,
      children: [
        leading,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: [
          styles.msBtnLabel,
          size === "sm" && styles.msBtnLabelSm,
          size === "lg" && styles.msBtnLabelLg,
          labelVariantStyle,
          leading ? { marginLeft: 6 } : null,
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
      style: ({ pressed }) => [
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }
      ],
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_native6.Animated.View, { style: [styles.msSwitchTrack, { backgroundColor: trackBg }], children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_native6.Animated.View, { style: [styles.msSwitchThumb, { transform: [{ translateX: thumbX }] }] }) })
    }
  );
});

// src/Spinner.tsx
var import_react6 = require("react");
var import_react_native7 = require("react-native");
var import_jsx_runtime6 = require("react/jsx-runtime");
var Spinner = (0, import_react6.forwardRef)(function Spinner2({ size = 16, color = colors.fg1, label = "Loading" }, _ref) {
  const angle = (0, import_react6.useRef)(new import_react_native7.Animated.Value(0)).current;
  (0, import_react6.useEffect)(() => {
    import_react_native7.Animated.loop(
      import_react_native7.Animated.timing(angle, {
        toValue: 1,
        duration: 800,
        easing: import_react_native7.Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, [angle]);
  const rotate = angle.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    import_react_native7.Animated.View,
    {
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
var import_react7 = require("react");
var import_react_native8 = require("react-native");
var import_jsx_runtime7 = require("react/jsx-runtime");
function Skeleton({ width = "100%", height = 17, radius: radius2 = 4 }) {
  const opacity = (0, import_react7.useRef)(new import_react_native8.Animated.Value(0.6)).current;
  (0, import_react7.useEffect)(() => {
    import_react_native8.Animated.loop(
      import_react_native8.Animated.sequence([
        import_react_native8.Animated.timing(opacity, {
          toValue: 1,
          duration: 900,
          easing: import_react_native8.Easing.inOut(import_react_native8.Easing.ease),
          useNativeDriver: true
        }),
        import_react_native8.Animated.timing(opacity, {
          toValue: 0.6,
          duration: 900,
          easing: import_react_native8.Easing.inOut(import_react_native8.Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();
  }, [opacity]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    import_react_native8.Animated.View,
    {
      accessibilityRole: "progressbar",
      accessibilityLabel: "Loading",
      style: [styles.msSkeleton, { width, height, borderRadius: radius2, opacity }]
    }
  );
}

// src/Avatar.tsx
var import_react8 = require("react");
var import_react_native9 = require("react-native");
var import_jsx_runtime8 = require("react/jsx-runtime");
function initials(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "").join("");
}
var Avatar = (0, import_react8.forwardRef)(function Avatar2({ name, source, size = "md", style, ...rest }, ref) {
  const sizeStyle = size === "sm" ? styles.msAvatarSm : size === "lg" ? styles.msAvatarLg : styles.msAvatarMd;
  const textStyle = size === "sm" ? styles.msAvatarTextSm : size === "lg" ? styles.msAvatarTextLg : styles.msAvatarTextMd;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_native9.View, { ref, style: [styles.msAvatar, sizeStyle, style], ...rest, children: source ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_native9.Image, { source, style: { width: "100%", height: "100%" } }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react_native9.Text, { style: [styles.msAvatarText, textStyle], children: initials(name) }) });
});

// src/Badge.tsx
var import_react9 = require("react");
var import_react_native10 = require("react-native");
var import_jsx_runtime9 = require("react/jsx-runtime");
var Badge = (0, import_react9.forwardRef)(function Badge2({ variant = "neutral", children, leading, style, ...rest }, ref) {
  const variantStyle = variant === "solid" ? styles.msBadgeSolid : variant === "outline" ? styles.msBadgeOutline : variant === "success" ? styles.msBadgeSuccess : variant === "danger" ? styles.msBadgeDanger : styles.msBadgeNeutral;
  const textVariantStyle = variant === "solid" ? styles.msBadgeTextSolid : variant === "outline" ? styles.msBadgeTextOutline : variant === "success" ? styles.msBadgeTextSuccess : variant === "danger" ? styles.msBadgeTextDanger : styles.msBadgeTextNeutral;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_react_native10.View, { ref, style: [styles.msBadge, variantStyle, style], ...rest, children: [
    leading,
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react_native10.Text, { style: [styles.msBadgeText, textVariantStyle], children })
  ] });
});

// src/Alert.tsx
var import_react10 = require("react");
var import_react_native11 = require("react-native");
var import_jsx_runtime10 = require("react/jsx-runtime");
var DEFAULT_GLYPH = {
  info: "i",
  success: "\u2713",
  warning: "!",
  danger: "!"
};
var Alert = (0, import_react10.forwardRef)(function Alert2({ variant = "info", title, children, icon, style, ...rest }, ref) {
  const variantStyle = variant === "success" ? styles.msAlertSuccess : variant === "warning" ? styles.msAlertWarning : variant === "danger" ? styles.msAlertDanger : styles.msAlertInfo;
  const iconWrapStyle = variant === "success" ? styles.msAlertIconWrapSuccess : variant === "warning" ? styles.msAlertIconWrapWarning : variant === "danger" ? styles.msAlertIconWrapDanger : styles.msAlertIconWrapInfo;
  const iconColorStyle = variant === "success" ? styles.msAlertIconSuccess : variant === "warning" ? styles.msAlertIconWarning : variant === "danger" ? styles.msAlertIconDanger : null;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_react_native11.View, { ref, style: [styles.msAlert, variantStyle, style], ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react_native11.View, { style: [styles.msAlertIconWrap, iconWrapStyle], children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react_native11.Text, { style: [styles.msAlertIcon, iconColorStyle], children: DEFAULT_GLYPH[variant] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_react_native11.View, { style: styles.msAlertBody, children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react_native11.Text, { style: styles.msAlertTitle, children: title }),
      typeof children === "string" ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react_native11.Text, { style: styles.msAlertMessage, children }) : children
    ] })
  ] });
});

// src/Divider.tsx
var import_react11 = require("react");
var import_react_native12 = require("react-native");
var import_jsx_runtime11 = require("react/jsx-runtime");
var Divider = (0, import_react11.forwardRef)(function Divider2({ orientation = "horizontal", style, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    import_react_native12.View,
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
var import_react12 = require("react");
var import_react_native13 = require("react-native");
var import_jsx_runtime12 = require("react/jsx-runtime");
var EmptyState = (0, import_react12.forwardRef)(function EmptyState2({ title, body, icon, action, style, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_react_native13.View, { ref, style: [styles.msEmpty, style], ...rest, children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native13.View, { style: styles.msEmptyIcon, children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native13.Text, { style: styles.msEmptyTitle, children: title }),
    body && (typeof body === "string" ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native13.Text, { style: styles.msEmptyBody, children: body }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_native13.View, { children: body })),
    action
  ] });
});

// src/ListItem.tsx
var import_react13 = require("react");
var import_react_native14 = require("react-native");
var import_jsx_runtime13 = require("react/jsx-runtime");
var ListItem = (0, import_react13.forwardRef)(function ListItem2({ title, subtitle, leading, trailing, chevron, onPress, style, ...rest }, ref) {
  const tappable = !!onPress;
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
    import_react_native14.Pressable,
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
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_react_native14.View, { style: styles.msListItemBody, children: [
          typeof title === "string" ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_native14.Text, { style: styles.msListItemTitle, numberOfLines: 1, children: title }) : title,
          subtitle && (typeof subtitle === "string" ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_native14.Text, { style: styles.msListItemSubtitle, numberOfLines: 1, children: subtitle }) : subtitle)
        ] }),
        trailing ?? (chevron && tappable ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react_native14.Text, { style: styles.msListItemChevron, children: "\u203A" }) : null)
      ]
    }
  );
});

// src/Checkbox.tsx
var import_react14 = require("react");
var import_react_native15 = require("react-native");
var import_jsx_runtime14 = require("react/jsx-runtime");
var Checkbox = (0, import_react14.forwardRef)(function Checkbox2({ checked, defaultChecked, onCheckedChange, label, disabled, style, ...rest }, ref) {
  const isControlled = checked !== void 0;
  const [internal, setInternal] = (0, import_react14.useState)(!!defaultChecked);
  const value = isControlled ? !!checked : internal;
  const onPress = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    import_react_native15.Pressable,
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
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react_native15.View, { style: [styles.msCheck, value && styles.msCheckChecked], children: value && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react_native15.Text, { style: styles.msCheckCheckmark, children: "\u2713" }) }),
        label && (typeof label === "string" ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react_native15.Text, { style: styles.msCheckLabel, children: label }) : label)
      ]
    }
  );
});

// src/RadioGroup.tsx
var import_react15 = require("react");
var import_react_native16 = require("react-native");
var import_jsx_runtime15 = require("react/jsx-runtime");
var Ctx = (0, import_react15.createContext)(null);
function RadioGroup({ value, defaultValue, onValueChange, disabled, children, style, ...rest }) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = (0, import_react15.useState)(defaultValue);
  const current = isControlled ? value : internal;
  const setValue = (v) => {
    if (disabled) return;
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Ctx.Provider, { value: { value: current, setValue, disabled }, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native16.View, { style, accessibilityRole: "radiogroup", ...rest, children }) });
}
var Radio = (0, import_react15.forwardRef)(function Radio2({ value, label, disabled: itemDisabled, style, ...rest }, ref) {
  const ctx = (0, import_react15.useContext)(Ctx);
  if (!ctx) throw new Error("Radio must be used inside <RadioGroup>.");
  const checked = ctx.value === value;
  const disabled = itemDisabled || ctx.disabled;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
    import_react_native16.Pressable,
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
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native16.View, { style: [styles.msRadio, checked && styles.msRadioChecked], children: checked && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native16.View, { style: styles.msRadioDot }) }),
        label && (typeof label === "string" ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_react_native16.Text, { style: styles.msRadioLabel, children: label }) : label)
      ]
    }
  );
});

// src/Chip.tsx
var import_react16 = require("react");
var import_react_native17 = require("react-native");
var import_jsx_runtime16 = require("react/jsx-runtime");
var Chip = (0, import_react16.forwardRef)(function Chip2({ selected, onSelectedChange, leading, trailing, children, onPress, style, ...rest }, ref) {
  const handlePress = (e) => {
    onPress?.(e);
    onSelectedChange?.(!selected);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
    import_react_native17.Pressable,
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
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_react_native17.Text, { style: [styles.msChipText, selected && styles.msChipTextSelected], children }),
        trailing
      ]
    }
  );
});

// src/Progress.tsx
var import_react17 = require("react");
var import_react_native18 = require("react-native");
var import_jsx_runtime17 = require("react/jsx-runtime");
var Progress = (0, import_react17.forwardRef)(function Progress2({ value, max = 100, style, ...rest }, ref) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const width = (0, import_react17.useRef)(new import_react_native18.Animated.Value(pct)).current;
  (0, import_react17.useEffect)(() => {
    import_react_native18.Animated.timing(width, {
      toValue: pct,
      duration: 280,
      useNativeDriver: false
    }).start();
  }, [pct, width]);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    import_react_native18.View,
    {
      ref,
      accessibilityRole: "progressbar",
      accessibilityValue: { min: 0, max: 100, now: pct },
      style: [styles.msProgressTrack, style],
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        import_react_native18.Animated.View,
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
var import_react18 = require("react");
var import_react_native19 = require("react-native");
var import_jsx_runtime18 = require("react/jsx-runtime");
var Sheet = (0, import_react18.forwardRef)(function Sheet2({ open, onClose, title, description, grabber = true, children, ...rest }, ref) {
  const translateY = (0, import_react18.useRef)(new import_react_native19.Animated.Value(40)).current;
  const opacity = (0, import_react18.useRef)(new import_react_native19.Animated.Value(0)).current;
  (0, import_react18.useEffect)(() => {
    import_react_native19.Animated.parallel([
      import_react_native19.Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: open ? 180 : 120,
        easing: import_react_native19.Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      }),
      import_react_native19.Animated.timing(translateY, {
        toValue: open ? 0 : 40,
        duration: open ? 280 : 180,
        easing: import_react_native19.Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      })
    ]).start();
  }, [open, opacity, translateY]);
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    import_react_native19.Modal,
    {
      visible: open,
      transparent: true,
      animationType: "none",
      onRequestClose: onClose,
      statusBarTranslucent: true,
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_react_native19.Animated.View, { style: { flex: 1, opacity }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native19.Pressable, { style: styles.msSheetScrim, onPress: onClose }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
          import_react_native19.Animated.View,
          {
            ref,
            style: [styles.msSheet, { transform: [{ translateY }] }],
            accessibilityViewIsModal: true,
            children: [
              grabber && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native19.View, { style: styles.msSheetGrabber }),
              title && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native19.Text, { style: styles.msSheetTitle, children: title }),
              description && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native19.Text, { style: styles.msSheetDesc, children: description }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_native19.View, { style: { marginTop: title || description ? 16 : 0 }, children })
            ]
          }
        )
      ] })
    }
  );
});

// src/Dialog.tsx
var import_react19 = require("react");
var import_react_native20 = require("react-native");
var import_jsx_runtime19 = require("react/jsx-runtime");
var Dialog = (0, import_react19.forwardRef)(function Dialog2({ open, onClose, title, description, dismissible = true, children, ...rest }, ref) {
  const opacity = (0, import_react19.useRef)(new import_react_native20.Animated.Value(0)).current;
  const scale = (0, import_react19.useRef)(new import_react_native20.Animated.Value(0.96)).current;
  (0, import_react19.useEffect)(() => {
    import_react_native20.Animated.parallel([
      import_react_native20.Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: open ? 180 : 120,
        easing: import_react_native20.Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      }),
      import_react_native20.Animated.timing(scale, {
        toValue: open ? 1 : 0.96,
        duration: open ? 220 : 140,
        easing: import_react_native20.Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true
      })
    ]).start();
  }, [open, opacity, scale]);
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    import_react_native20.Modal,
    {
      visible: open,
      transparent: true,
      animationType: "none",
      onRequestClose: onClose,
      statusBarTranslucent: true,
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_react_native20.Animated.View, { style: [styles.msDialogScrim, { opacity }], children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
          import_react_native20.Pressable,
          {
            style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
            onPress: dismissible ? onClose : void 0
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
          import_react_native20.Animated.View,
          {
            ref,
            style: [styles.msDialog, { transform: [{ scale }] }],
            accessibilityViewIsModal: true,
            children: [
              title && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native20.Text, { style: styles.msDialogTitle, children: title }),
              description && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native20.Text, { style: styles.msDialogDesc, children: description }),
              /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native20.View, { style: { marginTop: title || description ? 16 : 0 }, children })
            ]
          }
        )
      ] })
    }
  );
});

// src/Toast.tsx
var import_react20 = require("react");
var import_react_native21 = require("react-native");
var import_jsx_runtime20 = require("react/jsx-runtime");
var Ctx2 = (0, import_react20.createContext)(null);
var nextId = 1;
function ToastProvider({ children, defaultDuration = 3500 }) {
  const [items, setItems] = (0, import_react20.useState)([]);
  const dismiss = (0, import_react20.useCallback)((id) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const toast = (0, import_react20.useCallback)((item) => {
    const id = nextId++;
    setItems((prev) => [...prev, { id, ...item }]);
    setTimeout(() => dismiss(id), item.duration ?? defaultDuration);
    return id;
  }, [defaultDuration, dismiss]);
  const value = (0, import_react20.useMemo)(() => ({ toast, dismiss }), [toast, dismiss]);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(Ctx2.Provider, { value, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_react_native21.View, { style: styles.msToastWrap, pointerEvents: "box-none", children: items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(ToastView, { item: t, onDismiss: () => dismiss(t.id) }, t.id)) })
  ] });
}
function ToastView({ item, onDismiss }) {
  const opacity = (0, import_react20.useRef)(new import_react_native21.Animated.Value(0)).current;
  const ty = (0, import_react20.useRef)(new import_react_native21.Animated.Value(20)).current;
  (0, import_react20.useEffect)(() => {
    import_react_native21.Animated.parallel([
      import_react_native21.Animated.timing(opacity, { toValue: 1, duration: 180, easing: import_react_native21.Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
      import_react_native21.Animated.timing(ty, { toValue: 0, duration: 220, easing: import_react_native21.Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true })
    ]).start();
  }, [opacity, ty]);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_react_native21.Animated.View, { style: [styles.msToast, { opacity, transform: [{ translateY: ty }], marginBottom: 8 }], children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_react_native21.Text, { style: styles.msToastTitle, children: item.title }),
    item.action && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_react_native21.Pressable, { onPress: () => {
      item.onActionPress?.();
      onDismiss();
    }, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_react_native21.Text, { style: styles.msToastAction, children: item.action }) })
  ] });
}
function useToast() {
  const ctx = (0, import_react20.useContext)(Ctx2);
  if (!ctx) throw new Error("useToast must be called inside <ToastProvider>.");
  return ctx;
}

// src/Slider.tsx
var import_react21 = require("react");
var import_react_native22 = require("react-native");
var import_jsx_runtime21 = require("react/jsx-runtime");
var Slider = (0, import_react21.forwardRef)(function Slider2({ value, onValueChange, min = 0, max = 100, step = 1, disabled, style, ...rest }, ref) {
  const [trackWidth, setTrackWidth] = (0, import_react21.useState)(0);
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const updateFromX = (x) => {
    if (disabled || trackWidth === 0) return;
    const ratio = Math.max(0, Math.min(1, x / trackWidth));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.max(min, Math.min(max, stepped));
    if (clamped !== value) onValueChange(clamped);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
    import_react_native22.View,
    {
      ref,
      accessibilityRole: "adjustable",
      accessibilityValue: { min, max, now: value },
      onLayout: (e) => setTrackWidth(e.nativeEvent.layout.width),
      onStartShouldSetResponder: () => !disabled,
      onMoveShouldSetResponder: () => !disabled,
      onResponderGrant: (e) => updateFromX(e.nativeEvent.locationX),
      onResponderMove: (e) => updateFromX(e.nativeEvent.locationX),
      style: [
        { paddingVertical: 16, justifyContent: "center", opacity: disabled ? 0.5 : 1 },
        style
      ],
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_native22.View, { style: styles.msSliderTrack, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_native22.View, { style: [styles.msSliderFill, { width: `${pct * 100}%` }] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          import_react_native22.View,
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
var import_react22 = require("react");
var import_react_native23 = require("react-native");
var import_jsx_runtime22 = require("react/jsx-runtime");
var SegmentedControl = (0, import_react22.forwardRef)(function SegmentedControl2({ items, value, defaultValue, onValueChange, style, ...rest }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = (0, import_react22.useState)(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_react_native23.View, { ref, style: [styles.msSegmented, style], role: "tablist", ...rest, children: items.map((item) => {
    const active = item.value === current;
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      import_react_native23.Pressable,
      {
        role: "tab",
        accessibilityState: { selected: active },
        disabled: item.disabled,
        onPress: () => {
          if (!isControlled) setInternal(item.value);
          onValueChange?.(item.value);
        },
        style: [styles.msSegmentedItem, active && styles.msSegmentedItemActive],
        children: typeof item.label === "string" ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_react_native23.Text, { style: [styles.msSegmentedText, active && styles.msSegmentedTextActive], children: item.label }) : item.label
      },
      item.value
    );
  }) });
});

// src/TabBar.tsx
var import_react23 = require("react");
var import_react_native24 = require("react-native");
var import_jsx_runtime23 = require("react/jsx-runtime");
var TabBar = (0, import_react23.forwardRef)(function TabBar2({ items, value, defaultValue, onValueChange, style, ...rest }, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = (0, import_react23.useState)(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : internal;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_react_native24.View, { ref, role: "tablist", style: [styles.msTabBar, style], ...rest, children: items.map((item) => {
    const active = item.value === current;
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
      import_react_native24.Pressable,
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
          typeof item.label === "string" ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_react_native24.Text, { style: [styles.msTabBarLabel, active && styles.msTabBarLabelActive], children: item.label }) : item.label
        ]
      },
      item.value
    );
  }) });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Dialog,
  Divider,
  EmptyState,
  Field,
  Inline,
  Input,
  ListItem,
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
  ToastProvider,
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
  useToast
});
//# sourceMappingURL=index.cjs.map