import * as react from 'react';
import { ReactNode, ReactElement } from 'react';
import { PressableProps, StyleProp, ViewStyle, ViewProps, View, TextInputProps, TextStyle, TextInput, AccessibilityProps, DimensionValue, ImageSourcePropType, ModalProps } from 'react-native';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { space } from './tokens.cjs';
export { colors, fontSize, fontWeight, lineHeight, mono, radius, shadow, default as tokens } from './tokens.cjs';
export { default as styles } from './styles.cjs';

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends Omit<PressableProps, "children" | "style"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    /** Optional leading element (icon, etc.) */
    leading?: ReactNode;
    /** Optional trailing element */
    trailing?: ReactNode;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
}
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<any>>;

type CardVariant = "default" | "elevated" | "inset";
interface CardProps extends Omit<ViewProps, "children"> {
    variant?: CardVariant;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
}
declare const Card: react.ForwardRefExoticComponent<CardProps & react.RefAttributes<View>>;

interface InputProps extends Omit<TextInputProps, "style"> {
    invalid?: boolean;
    style?: StyleProp<TextStyle>;
}
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<TextInput>>;
interface FieldProps {
    label?: ReactNode;
    help?: ReactNode;
    error?: ReactNode;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
}
declare function Field({ label, help, error, children, style }: FieldProps): react_jsx_runtime.JSX.Element;

type SpaceKey = keyof typeof space;
interface BaseLayoutProps extends Omit<ViewProps, "children"> {
    /** Gap token. 0-14, mapped to the spacing scale. */
    gap?: SpaceKey;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
}
interface StackProps extends BaseLayoutProps {
    /** Cross-axis alignment. Default: "stretch". */
    align?: "stretch" | "start" | "center" | "end";
}
declare const Stack: react.ForwardRefExoticComponent<StackProps & react.RefAttributes<View>>;
interface InlineProps extends BaseLayoutProps {
    /** Cross-axis alignment. Default: "center". */
    align?: "start" | "center" | "end" | "stretch";
    /** Main-axis alignment. Default: "start". */
    justify?: "start" | "center" | "end" | "between" | "around";
    /** Wrap items onto multiple lines. */
    wrap?: boolean;
}
declare const Inline: react.ForwardRefExoticComponent<InlineProps & react.RefAttributes<View>>;

interface SwitchProps extends AccessibilityProps {
    /** Controlled state. */
    checked?: boolean;
    /** Uncontrolled default state. */
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    /** Visually hidden accessible label. */
    label?: string;
}
declare const Switch: react.ForwardRefExoticComponent<SwitchProps & react.RefAttributes<any>>;

interface SpinnerProps {
    /** Diameter in pixels. Default: 16. */
    size?: number;
    /** Stroke color. Defaults to fg1. */
    color?: string;
    /** Visually hidden accessible label. Default: "Loading". */
    label?: string;
}
declare const Spinner: react.ForwardRefExoticComponent<SpinnerProps & react.RefAttributes<any>>;

interface SkeletonProps {
    width?: DimensionValue;
    height?: DimensionValue;
    /** Custom border radius (defaults to 4). */
    radius?: number;
}
declare function Skeleton({ width, height, radius }: SkeletonProps): react_jsx_runtime.JSX.Element;

type AvatarSize = "sm" | "md" | "lg";
interface AvatarProps extends Omit<ViewProps, "children"> {
    /** Person name. Initials are derived from the first two words. */
    name?: string;
    /** Image source. If provided, replaces the initials. */
    source?: ImageSourcePropType;
    size?: AvatarSize;
}
declare const Avatar: react.ForwardRefExoticComponent<AvatarProps & react.RefAttributes<View>>;

type BadgeVariant = "neutral" | "solid" | "outline" | "success" | "danger";
interface BadgeProps extends Omit<ViewProps, "children"> {
    variant?: BadgeVariant;
    children?: ReactNode;
    /** Optional leading dot or icon. */
    leading?: ReactNode;
}
declare const Badge: react.ForwardRefExoticComponent<BadgeProps & react.RefAttributes<View>>;

type AlertVariant = "info" | "success" | "warning" | "danger";
interface AlertProps extends Omit<ViewProps, "children"> {
    variant?: AlertVariant;
    title?: ReactNode;
    children?: ReactNode;
    /** Custom icon element. Defaults to a glyph derived from the variant. */
    icon?: ReactNode;
}
declare const Alert: react.ForwardRefExoticComponent<AlertProps & react.RefAttributes<View>>;

interface DividerProps extends ViewProps {
    orientation?: "horizontal" | "vertical";
}
declare const Divider: react.ForwardRefExoticComponent<DividerProps & react.RefAttributes<View>>;

interface EmptyStateProps extends Omit<ViewProps, "children"> {
    title: ReactNode;
    body?: ReactNode;
    icon?: ReactNode;
    action?: ReactNode;
}
declare const EmptyState: react.ForwardRefExoticComponent<EmptyStateProps & react.RefAttributes<View>>;

interface ListItemProps extends Omit<PressableProps, "children" | "style"> {
    /** Primary text. */
    title: ReactNode;
    /** Secondary text rendered under the title. */
    subtitle?: ReactNode;
    /** Element rendered before the title (avatar, icon). */
    leading?: ReactNode;
    /** Element rendered after the body (badge, switch, chevron). */
    trailing?: ReactNode;
    /** Show a chevron when the row is tappable and `trailing` is omitted. */
    chevron?: boolean;
    style?: StyleProp<ViewStyle>;
}
declare const ListItem: react.ForwardRefExoticComponent<ListItemProps & react.RefAttributes<any>>;

interface CheckboxProps extends Omit<PressableProps, "children" | "style"> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: ReactNode;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
declare const Checkbox: react.ForwardRefExoticComponent<CheckboxProps & react.RefAttributes<any>>;

type RadioStyleProp = StyleProp<ViewStyle>;
interface RadioGroupProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    "aria-label"?: string;
}
declare function RadioGroup({ value, defaultValue, onValueChange, disabled, children, style, ...rest }: RadioGroupProps): react_jsx_runtime.JSX.Element;
interface RadioProps extends Omit<PressableProps, "children" | "style"> {
    value: string;
    label?: ReactNode;
    disabled?: boolean;
    style?: RadioStyleProp;
}
declare const Radio: react.ForwardRefExoticComponent<RadioProps & react.RefAttributes<any>>;

interface ChipProps extends Omit<PressableProps, "children" | "style"> {
    selected?: boolean;
    onSelectedChange?: (selected: boolean) => void;
    leading?: ReactNode;
    trailing?: ReactNode;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
}
declare const Chip: react.ForwardRefExoticComponent<ChipProps & react.RefAttributes<any>>;

interface ProgressProps extends ViewProps {
    /** Current value, 0-100 (or 0-max). */
    value: number;
    /** Maximum value. Default 100. */
    max?: number;
}
declare const Progress: react.ForwardRefExoticComponent<ProgressProps & react.RefAttributes<View>>;

interface SheetProps extends Omit<ModalProps, "children"> {
    /** Whether the sheet is visible. */
    open: boolean;
    /** Called when the user taps the scrim or otherwise dismisses. */
    onClose: () => void;
    /** Optional title shown at the top. */
    title?: ReactNode;
    /** Optional description below the title. */
    description?: ReactNode;
    /** Show the iOS-style grabber at the top. Default true. */
    grabber?: boolean;
    children?: ReactNode;
}
/**
 * BottomSheet built on RN Modal. Slides up from the bottom over a scrim.
 * Tap the scrim or call `onClose` to dismiss.
 */
declare const Sheet: react.ForwardRefExoticComponent<SheetProps & react.RefAttributes<View>>;

interface DialogProps extends Omit<ModalProps, "children"> {
    open: boolean;
    onClose: () => void;
    title?: ReactNode;
    description?: ReactNode;
    /** When true (default), tapping the scrim dismisses. */
    dismissible?: boolean;
    children?: ReactNode;
}
/**
 * Centered modal for confirmations and short flows. Use Sheet for anything
 * with multiple inputs or that benefits from feeling rooted to the bottom.
 */
declare const Dialog: react.ForwardRefExoticComponent<DialogProps & react.RefAttributes<View>>;

interface ToastItem {
    id: number;
    title: string;
    /** Optional action label. Tapping calls `onActionPress`. */
    action?: string;
    onActionPress?: () => void;
    duration?: number;
}
interface ToastCtx {
    /** Push a new toast. Returns its id so you can dismiss it later. */
    toast: (item: Omit<ToastItem, "id">) => number;
    /** Dismiss a toast by id. */
    dismiss: (id: number) => void;
}
interface ToastProviderProps {
    children: ReactNode;
    /** Default auto-dismiss in ms. Default 3500. */
    defaultDuration?: number;
}
declare function ToastProvider({ children, defaultDuration }: ToastProviderProps): react_jsx_runtime.JSX.Element;
declare function useToast(): ToastCtx;

interface SliderProps extends Omit<ViewProps, "children"> {
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
}
/**
 * A simple horizontal slider. Drag the thumb to change the value.
 * Built on raw touch events so it works on web (via react-native-web)
 * and native without extra dependencies.
 */
declare const Slider: react.ForwardRefExoticComponent<SliderProps & react.RefAttributes<View>>;

interface SegmentedItem {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}
interface SegmentedControlProps extends Omit<ViewProps, "children"> {
    items: SegmentedItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}
declare const SegmentedControl: react.ForwardRefExoticComponent<SegmentedControlProps & react.RefAttributes<View>>;

interface TabBarItem {
    value: string;
    label: ReactNode;
    /** Optional icon. Receives `{ active }` so you can swap glyphs. */
    icon?: (state: {
        active: boolean;
    }) => ReactNode;
}
interface TabBarProps extends Omit<ViewProps, "children"> {
    items: TabBarItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}
/**
 * Bottom navigation bar for the app's primary destinations. Pair with a
 * route-aware container (React Navigation, Expo Router) — TabBar is
 * presentational, you wire the actual navigation.
 */
declare const TabBar: react.ForwardRefExoticComponent<TabBarProps & react.RefAttributes<View>>;

interface PasswordInputProps extends Omit<InputProps, "secureTextEntry"> {
    /** Hide the show/hide toggle. */
    hideToggle?: boolean;
}
declare const PasswordInput: react.ForwardRefExoticComponent<PasswordInputProps & react.RefAttributes<TextInput>>;

interface NumberInputProps {
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
}
declare const NumberInput: react.ForwardRefExoticComponent<NumberInputProps & react.RefAttributes<TextInput>>;

interface PinInputProps {
    length?: number;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    mask?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    style?: StyleProp<ViewStyle>;
    "aria-label"?: string;
}
declare const PinInput: react.ForwardRefExoticComponent<PinInputProps & react.RefAttributes<View>>;

interface TabItem {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}
interface TabsProps {
    items: TabItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** Allow horizontal scroll when tabs overflow. Default: true. */
    scrollable?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Top-tab navigation. Underline indicator on the active tab. Scrolls
 * horizontally when there are more tabs than fit. The component renders
 * just the tab bar; you handle which screen mounts based on the value.
 */
declare const Tabs: react.ForwardRefExoticComponent<TabsProps & react.RefAttributes<View>>;

interface PopoverProps {
    open: boolean;
    onClose: () => void;
    /** Anchor element. Required for positioning. */
    anchorRef: React.RefObject<View | null>;
    /** Side of the anchor. Default: "bottom". */
    side?: "top" | "bottom";
    /** Distance from the anchor in pixels. Default: 6. */
    sideOffset?: number;
    /** Custom width. Default: matches the anchor. */
    width?: number;
    children?: ReactNode;
    contentStyle?: StyleProp<ViewStyle>;
}
/**
 * A floating panel anchored to a trigger. The anchor's screen coordinates
 * are measured when the popover opens; reposition by closing/reopening.
 *
 * Usage:
 *   const triggerRef = useRef<View>(null);
 *   <Pressable ref={triggerRef} onPress={() => setOpen(true)}>...</Pressable>
 *   <Popover open={open} onClose={() => setOpen(false)} anchorRef={triggerRef}>
 *     ...
 *   </Popover>
 */
declare const Popover: react.ForwardRefExoticComponent<PopoverProps & react.RefAttributes<View>>;

interface ComboboxOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
    keywords?: string[];
}
interface ComboboxProps {
    options: ComboboxOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    filter?: (query: string, option: ComboboxOption) => boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Searchable single-select. Opens a full-screen sheet on tap, with a
 * search field at the top and a scrollable list of matches.
 */
declare const Combobox: react.ForwardRefExoticComponent<ComboboxProps & react.RefAttributes<View>>;

type Mode = "single" | "multiple";
interface AccordionProps {
    type?: Mode;
    defaultValue?: string | string[];
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
}
declare function Accordion({ type, defaultValue, value, onValueChange, children, style }: AccordionProps): react_jsx_runtime.JSX.Element;
interface AccordionItemProps {
    value: string;
    title: ReactNode;
    children: ReactNode;
    disabled?: boolean;
}
declare function AccordionItem({ value, title, children, disabled }: AccordionItemProps): react_jsx_runtime.JSX.Element;

interface NavigationHeaderProps {
    /** Page title. */
    title?: ReactNode;
    /** Element on the left (back arrow, menu icon). */
    leading?: ReactNode;
    /** Element on the right (action button, avatar). */
    trailing?: ReactNode;
    /** Show a thin bottom border. Default: true. */
    border?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Top app bar. Renders a 56pt-tall header with leading/trailing slots and a
 * centered or left-aligned title. Use `<Stack>` it above your screen content
 * or use `<AppShell.Header>` for full layout.
 */
declare const NavigationHeader: react.ForwardRefExoticComponent<NavigationHeaderProps & react.RefAttributes<View>>;
/** Quick back-arrow trigger. Renders a chevron-left glyph. */
declare function NavigationBack({ onPress, label }: {
    onPress?: () => void;
    label?: string;
}): react_jsx_runtime.JSX.Element;

interface ActionSheetAction {
    label: string;
    onPress?: () => void;
    /** Visual destructive styling. */
    destructive?: boolean;
    disabled?: boolean;
}
interface ActionSheetProps extends Omit<SheetProps, "children" | "title" | "description"> {
    title?: string;
    description?: string;
    actions: ActionSheetAction[];
    cancelLabel?: string;
}
/**
 * iOS-style list of mutually exclusive actions plus a Cancel. Each action
 * dismisses the sheet on press by default. Destructive actions render in red.
 */
declare const ActionSheet: react.ForwardRefExoticComponent<ActionSheetProps & react.RefAttributes<View>>;

interface AppShellProps {
    /** Top app bar element. Usually a `<NavigationHeader/>`. */
    header?: ReactNode;
    /** Bottom navigation. Usually a `<TabBar/>`. */
    tabBar?: ReactNode;
    children?: ReactNode;
    /** Background color of the safe area. Defaults to colors.bg. */
    backgroundColor?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * The root layout for an app screen. Wraps content in a SafeAreaView,
 * stacks `header` (optional), the children, and `tabBar` (optional).
 * The middle section flexes; pass a ScrollView/FlatList as the child
 * to make content scrollable.
 *
 * Compose it with `NavigationHeader` and `TabBar`:
 *
 *   <AppShell
 *     header={<NavigationHeader title="Home"/>}
 *     tabBar={<TabBar items={...} value={...} onValueChange={...}/>}
 *   >
 *     <ScrollView>...</ScrollView>
 *   </AppShell>
 */
declare const AppShell: react.ForwardRefExoticComponent<AppShellProps & react.RefAttributes<View>>;

interface TooltipProps {
    /** Tooltip body. String renders styled; ReactNode renders raw. */
    content: ReactNode;
    /** The element that triggers the tooltip. Wrapped to capture press. */
    children: ReactElement;
    /** Side relative to the trigger. Default: "top". */
    side?: "top" | "bottom";
    /** Width of the bubble. Default: undefined (auto-fit, max 240). */
    width?: number;
    /** Long-press duration in ms before showing. Default: 400. */
    longPressDelay?: number;
}
/**
 * A short label shown on long-press. Less critical on touch devices
 * than on web, but still useful for icon-only buttons or accessibility.
 */
declare function Tooltip({ content, children, side, width, longPressDelay }: TooltipProps): react_jsx_runtime.JSX.Element;

interface DatePickerProps {
    value?: Date | null;
    defaultValue?: Date | null;
    onValueChange?: (value: Date | null) => void;
    min?: Date;
    max?: Date;
    /** Locale for month/weekday labels. Default: device locale. */
    locale?: string;
    placeholder?: string;
    disabled?: boolean;
    /** Format function for the trigger label. Default: locale-aware short date. */
    format?: (date: Date) => string;
    style?: StyleProp<ViewStyle>;
}
declare const DatePicker: react.ForwardRefExoticComponent<DatePickerProps & react.RefAttributes<View>>;

export { Accordion, AccordionItem, type AccordionItemProps, type AccordionProps, ActionSheet, type ActionSheetAction, type ActionSheetProps, Alert, type AlertProps, type AlertVariant, AppShell, type AppShellProps, Avatar, type AvatarProps, type AvatarSize, Badge, type BadgeProps, type BadgeVariant, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Card, type CardProps, type CardVariant, Checkbox, type CheckboxProps, Chip, type ChipProps, Combobox, type ComboboxOption, type ComboboxProps, DatePicker, type DatePickerProps, Dialog, type DialogProps, Divider, type DividerProps, EmptyState, type EmptyStateProps, Field, type FieldProps, Inline, type InlineProps, Input, type InputProps, ListItem, type ListItemProps, NavigationBack, NavigationHeader, type NavigationHeaderProps, NumberInput, type NumberInputProps, PasswordInput, type PasswordInputProps, PinInput, type PinInputProps, Popover, type PopoverProps, Progress, type ProgressProps, Radio, RadioGroup, type RadioGroupProps, type RadioProps, SegmentedControl, type SegmentedControlProps, type SegmentedItem, Sheet, type SheetProps, Skeleton, type SkeletonProps, Slider, type SliderProps, Spinner, type SpinnerProps, Stack, type StackProps, Switch, type SwitchProps, TabBar, type TabBarItem, type TabBarProps, type TabItem, Tabs, type TabsProps, type ToastItem, ToastProvider, type ToastProviderProps, Tooltip, type TooltipProps, space, useToast };
