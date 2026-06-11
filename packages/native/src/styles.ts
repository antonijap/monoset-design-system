/**
 * Named style recipes that mirror the web kit's CSS sections.
 * Components consume these internally; consumers can also import them
 * for style spreading when they need a deeper override.
 *
 * Names follow the web's BEM-like prefix: msBtn, msBtnPrimary, msCard, ...
 */

import { StyleSheet } from "react-native";
import { colors, mono, space, radius, fontSize, fontWeight, shadow } from "./tokens";

export const styles = StyleSheet.create({
  /* ─── Button ──────────────────────────────────────────────────── */
  msBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  // Corner radii follow iOS button conventions: ~half the height for a
  // soft modern look (medium = 14, large = 16, small = 10).
  msBtnSm:  { paddingHorizontal: 14, paddingVertical: 8,  minHeight: 36, borderRadius: 10 },
  msBtnMd:  { paddingHorizontal: 18, paddingVertical: 12, minHeight: 44, borderRadius: 14 }, // Apple's minimum tap target
  msBtnLg:  { paddingHorizontal: 22, paddingVertical: 14, minHeight: 50, borderRadius: 16 },

  msBtnPrimary:   { backgroundColor: colors.accent,  borderColor: colors.accent },
  msBtnSecondary: { backgroundColor: colors.bg,      borderColor: colors.border },
  msBtnGhost:     { backgroundColor: "transparent" },
  msBtnDanger:    { backgroundColor: colors.statusDanger, borderColor: colors.statusDanger },
  msBtnDisabled:  { backgroundColor: colors.bgMuted, borderColor: "transparent", opacity: 0.85 },

  msBtnLabel:           { fontSize: fontSize.base, fontWeight: fontWeight.semibold, lineHeight: fontSize.base * 1.2 },
  msBtnLabelSm:         { fontSize: fontSize.sm,   fontWeight: fontWeight.semibold, lineHeight: fontSize.sm * 1.2 },
  msBtnLabelLg:         { fontSize: fontSize.lg,   fontWeight: fontWeight.semibold, lineHeight: fontSize.lg * 1.2 },
  msBtnLabelPrimary:    { color: colors.accentFg },
  msBtnLabelSecondary:  { color: colors.fg1 },
  msBtnLabelGhost:      { color: colors.fg1 },
  msBtnLabelDanger:     { color: "#fff" },
  msBtnLabelDisabled:   { color: colors.fg4 },

  /* ─── Card ────────────────────────────────────────────────────── */
  msCard: {
    backgroundColor: colors.bg,
    borderColor: colors.borderSubtle,
    borderWidth: 1,
    borderRadius: radius["2xl"],
    padding: space[6],
  },
  msCardElevated: {
    borderWidth: 0,
    ...shadow.sm,
  },
  msCardInset: {
    backgroundColor: colors.bgSubtle,
    borderWidth: 0,
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
    color: colors.fg1,
  },
  msInputFocused: { borderColor: colors.fg1 },
  msInputError:   { borderColor: colors.statusDanger },
  msInputDisabled: { backgroundColor: colors.bgMuted, color: colors.fg4 },

  /* ─── Field ───────────────────────────────────────────────────── */
  msField: { gap: 8 },
  msFieldLabel: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.fg1 },
  msFieldHelp:  { fontSize: fontSize.sm, color: colors.fg3 },
  msFieldError: { fontSize: fontSize.sm, color: colors.statusDanger },

  /* ─── Stack / Inline ──────────────────────────────────────────── */
  msStack:  { flexDirection: "column" },
  msInline: { flexDirection: "row", alignItems: "center" },

  /* ─── Switch (iOS-standard 51x31, thumb 27x27) ────────────────── */
  msSwitchTrack: {
    width: 51,
    height: 31,
    borderRadius: 999,
    padding: 2,
    backgroundColor: colors.border,
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
    elevation: 2,
  },

  /* ─── Spinner ─────────────────────────────────────────────────── */
  msSpinner: {
    width: 16,
    height: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.border,
    borderTopColor: colors.fg1,
  },

  /* ─── Skeleton ────────────────────────────────────────────────── */
  msSkeleton: {
    backgroundColor: colors.bgMuted,
    borderRadius: radius.sm,
    overflow: "hidden",
  },

  /* ─── Avatar ──────────────────────────────────────────────────── */
  msAvatar: {
    backgroundColor: mono[800],
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 999,
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
    gap: 4,
  },
  msBadgeNeutral: { backgroundColor: colors.bgMuted },
  msBadgeSolid:   { backgroundColor: colors.accent },
  msBadgeOutline: { backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border },
  msBadgeSuccess: { backgroundColor: colors.bgMuted },
  msBadgeDanger:  { backgroundColor: colors.bgMuted },
  msBadgeText:        { fontSize: fontSize.xs, fontWeight: fontWeight.semibold },
  msBadgeTextNeutral: { color: colors.fg2 },
  msBadgeTextSolid:   { color: colors.accentFg },
  msBadgeTextOutline: { color: colors.fg2 },
  msBadgeTextSuccess: { color: colors.fg1 },
  msBadgeTextDanger:  { color: colors.fg1 },

  /* ─── Alert ───────────────────────────────────────────────────── */
  msAlert: {
    flexDirection: "row",
    gap: space[4],
    padding: space[5],
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  msAlertInfo:    { backgroundColor: colors.bgSubtle, borderColor: colors.borderSubtle },
  msAlertSuccess: { backgroundColor: colors.bgSubtle, borderColor: colors.borderSubtle },
  msAlertWarning: { backgroundColor: colors.bgSubtle, borderColor: colors.borderSubtle },
  msAlertDanger:  { backgroundColor: colors.bgSubtle, borderColor: colors.borderSubtle },
  msAlertIconWrap: {
    width: 22, height: 22, borderRadius: 999,
    alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: space[1],
    borderWidth: 1, borderColor: colors.fg1,
  },
  msAlertIconWrapInfo:    { borderColor: colors.fg1 },
  msAlertIconWrapSuccess: { borderColor: colors.fg1, backgroundColor: "transparent" },
  msAlertIconWrapWarning: { borderColor: colors.fg1 },
  msAlertIconWrapDanger:  { borderColor: colors.fg1 },
  msAlertIcon:       { fontSize: 12, fontWeight: fontWeight.bold, color: colors.fg1, lineHeight: 14 },
  msAlertIconSuccess:{ color: colors.fg1 },
  msAlertIconWarning:{ color: colors.fg1 },
  msAlertIconDanger: { color: colors.fg1 },
  msAlertBody:    { flex: 1 },
  msAlertTitle:   { fontSize: fontSize.md, fontWeight: fontWeight.semibold, color: colors.fg1 },
  msAlertMessage: { fontSize: fontSize.sm,   color: colors.fg2, marginTop: space[2], lineHeight: fontSize.sm * 1.5 },

  /* ─── Divider ─────────────────────────────────────────────────── */
  msDivider:           { backgroundColor: colors.borderSubtle },
  msDividerHorizontal: { height: StyleSheet.hairlineWidth, alignSelf: "stretch" },
  msDividerVertical:   { width:  StyleSheet.hairlineWidth, alignSelf: "stretch" },

  /* ─── EmptyState ──────────────────────────────────────────────── */
  msEmpty: { alignItems: "center", paddingVertical: space[8], paddingHorizontal: space[5], gap: space[3] },
  msEmptyIcon:  { width: 44, height: 44, borderRadius: 999, alignItems: "center", justifyContent: "center", backgroundColor: colors.bgMuted, marginBottom: space[2] },
  msEmptyTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1, textAlign: "center" },
  msEmptyBody:  { fontSize: fontSize.sm, color: colors.fg3, textAlign: "center", maxWidth: 280, lineHeight: fontSize.sm * 1.5 },

  /* ─── ListItem ────────────────────────────────────────────────── */
  msList: { backgroundColor: colors.bg },
  msListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: space[5],
    paddingVertical: space[4],
    minHeight: 56,
    backgroundColor: colors.bg,
    gap: 12,
  },
  msListItemPressed: { backgroundColor: colors.bgMuted },
  msListItemBody:    { flex: 1, minWidth: 0 },
  msListItemTitle:   { fontSize: fontSize.base, color: colors.fg1 },
  msListItemSubtitle:{ fontSize: fontSize.sm,   color: colors.fg3, marginTop: 1 },
  msListItemChevron: { fontSize: fontSize.lg, color: colors.fg4 },

  /* ─── Checkbox ────────────────────────────────────────────────── */
  msCheckRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingVertical: 12 },
  msCheck: {
    width: 22, height: 22, borderRadius: radius.sm,
    borderWidth: 1.5, borderColor: colors.border,
    alignItems: "center", justifyContent: "center",
    backgroundColor: colors.bg,
  },
  msCheckChecked: { backgroundColor: colors.accent, borderColor: colors.accent },
  msCheckLabel:   { fontSize: fontSize.base, color: colors.fg1, flex: 1, lineHeight: 22 },
  msCheckCheckmark: { color: "#fff", fontSize: 14, fontWeight: fontWeight.bold, lineHeight: 14 },

  /* ─── Radio ───────────────────────────────────────────────────── */
  msRadioRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingVertical: 12 },
  msRadio: {
    width: 22, height: 22, borderRadius: 999,
    borderWidth: 1.5, borderColor: colors.border,
    alignItems: "center", justifyContent: "center",
    backgroundColor: colors.bg,
  },
  msRadioChecked: { borderColor: colors.accent },
  msRadioDot:     { width: 10, height: 10, borderRadius: 999, backgroundColor: colors.accent },
  msRadioLabel:   { fontSize: fontSize.base, color: colors.fg1, flex: 1, lineHeight: 22 },

  /* ─── Chip ────────────────────────────────────────────────────── */
  msChip: {
    paddingHorizontal: 14, paddingVertical: 8, minHeight: 36,
    borderRadius: 999, alignSelf: "flex-start",
    flexDirection: "row", alignItems: "center", gap: 6,
    borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  msChipPressed:  { backgroundColor: colors.bgSubtle },
  msChipSelected: { backgroundColor: colors.accent, borderColor: colors.accent },
  msChipText:         { fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: colors.fg1 },
  msChipTextSelected: { color: colors.accentFg },

  /* ─── Progress ────────────────────────────────────────────────── */
  msProgressTrack: {
    width: "100%", height: 6,
    borderRadius: 999,
    backgroundColor: mono[200],
    overflow: "hidden",
  },
  msProgressFill: { height: "100%", backgroundColor: colors.accent, borderRadius: 999 },

  /* ─── Sheet (BottomSheet via Modal) ───────────────────────────── */
  msSheetScrim: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  msSheet: {
    position: "absolute", left: 0, right: 0, bottom: 0,
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl,
    paddingTop: 12, paddingHorizontal: space[5], paddingBottom: space[7],
    maxHeight: "85%",
  },
  msSheetGrabber: { width: 36, height: 5, borderRadius: 999, backgroundColor: colors.border, alignSelf: "center", marginBottom: space[4] },
  msSheetTitle:   { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 },
  msSheetDesc:    { fontSize: fontSize.sm, color: colors.fg3, marginTop: 2, lineHeight: fontSize.sm * 1.5 },

  /* ─── Dialog (centered modal) ─────────────────────────────────── */
  msDialogScrim: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center", paddingHorizontal: space[5] },
  msDialog: {
    width: "100%", maxWidth: 360,
    backgroundColor: colors.bg,
    borderRadius: radius.lg,
    padding: space[6],
    ...shadow.lg,
  },
  msDialogTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.fg1 },
  msDialogDesc:  { fontSize: fontSize.sm, color: colors.fg2, marginTop: space[2], lineHeight: fontSize.sm * 1.5 },

  /* ─── Toast ───────────────────────────────────────────────────── */
  msToastWrap: {
    position: "absolute", left: 0, right: 0, bottom: 0,
    paddingHorizontal: space[5], paddingBottom: space[6],
    alignItems: "center",
    pointerEvents: "box-none",
  },
  msToast: {
    width: "100%", maxWidth: 380,
    backgroundColor: colors.fg1,
    borderRadius: radius.lg,
    paddingHorizontal: space[5], paddingVertical: space[4],
    flexDirection: "row", alignItems: "center", gap: 12,
    ...shadow.lg,
  },
  msToastTitle:  { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: "#fff", flex: 1 },
  msToastAction: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: "#fff", opacity: 0.7 },

  /* ─── Slider ──────────────────────────────────────────────────── */
  msSliderTrack: { width: "100%", height: 4, borderRadius: 999, backgroundColor: colors.bgMuted },
  msSliderFill:  { height: "100%", backgroundColor: colors.accent, borderRadius: 999 },
  msSliderThumb: { position: "absolute", top: "50%", marginTop: -12, width: 24, height: 24, borderRadius: 999, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, ...shadow.sm },

  /* ─── SegmentedControl ────────────────────────────────────────── */
  /* iOS UISegmentedControl proportions: 32pt control, 2pt inset, concentric
     thumb (9 - 2 = 7), equal-width segments, weight change only on the label. */
  msSegmented: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgMuted,
    borderRadius: 9,
    padding: 2,
  },
  msSegmentedItem: {
    flex: 1,
    paddingHorizontal: 10, paddingVertical: 5, minHeight: 28,
    alignItems: "center", justifyContent: "center",
    borderRadius: 7,
  },
  msSegmentedItemActive: {
    backgroundColor: colors.bg,
    ...shadow.sm,
  },
  msSegmentedText:        { fontSize: fontSize.sm, fontWeight: fontWeight.regular,  color: colors.fg1 },
  msSegmentedTextActive:  { fontWeight: fontWeight.semibold, color: colors.fg1 },
  msSegmentedSeparator:   { width: 1, height: 14, borderRadius: 1, backgroundColor: colors.border },

  /* ─── TabBar (bottom navigation) ──────────────────────────────── */
  msTabBar: {
    flexDirection: "row",
    backgroundColor: colors.bg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSubtle,
    paddingTop: 2, paddingBottom: 2,
  },
  msTabBarItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 4, paddingVertical: 6, minHeight: 48 },
  msTabBarLabel:        { fontSize: 11, fontWeight: fontWeight.medium, color: colors.fg3 },
  msTabBarLabelActive:  { color: colors.fg1 },
});

export default styles;
