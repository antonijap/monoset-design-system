import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode, HTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, TableHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as RCheckbox from '@radix-ui/react-checkbox';
import * as RSwitch from '@radix-ui/react-switch';
import * as RRadio from '@radix-ui/react-radio-group';
import * as RTabs from '@radix-ui/react-tabs';
import * as RToast from '@radix-ui/react-toast';
import * as RDialog from '@radix-ui/react-dialog';
import * as RPopover from '@radix-ui/react-popover';
import * as RDropdown from '@radix-ui/react-dropdown-menu';
import * as RSelect from '@radix-ui/react-select';
import * as RSeparator from '@radix-ui/react-separator';
import * as RAccordion from '@radix-ui/react-accordion';
import * as RSlider from '@radix-ui/react-slider';
import * as RToggleGroup from '@radix-ui/react-toggle-group';
import * as RToggle from '@radix-ui/react-toggle';
export { DUR, EASE_EMPHASIS, EASE_EXIT, EASE_STANDARD, fadeUp, hoverLift, listStagger, modalPanel, modalScrim, popoverIn, pressDown } from '@monoset/motion';

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Left-slot icon (rendered before children). */
    leadingIcon?: ReactNode;
    /** Right-slot icon. */
    trailingIcon?: ReactNode;
    /** Renders a spinner and sets `aria-busy`. */
    loading?: boolean;
}
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

type BadgeVariant = "neutral" | "solid" | "outline";
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}
declare const Badge: react.ForwardRefExoticComponent<BadgeProps & react.RefAttributes<HTMLSpanElement>>;

type AvatarSize = "sm" | "md" | "lg";
interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
    size?: AvatarSize;
    /** Initials shown when no image, or if image fails. */
    initials?: string;
    /** Optional image URL. */
    src?: string;
    /** Alt text for the image. */
    alt?: string;
}
declare const Avatar: react.ForwardRefExoticComponent<AvatarProps & react.RefAttributes<HTMLSpanElement>>;

type CardVariant = "outline" | "elevated" | "inset";
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    /** Render as a different element (useful for article, section). */
    as?: "div" | "article" | "section";
}
declare const Card: react.ForwardRefExoticComponent<CardProps & react.RefAttributes<HTMLDivElement>>;

interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title?: ReactNode;
    icon?: ReactNode;
    /** If true, applies `role="alert"` instead of `role="status"`. */
    urgent?: boolean;
}
declare const Alert: react.ForwardRefExoticComponent<AlertProps & react.RefAttributes<HTMLDivElement>>;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    invalid?: boolean;
}
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    invalid?: boolean;
}
declare const Textarea: react.ForwardRefExoticComponent<TextareaProps & react.RefAttributes<HTMLTextAreaElement>>;
interface FieldProps {
    label: ReactNode;
    help?: ReactNode;
    error?: ReactNode;
    /** The control — Input, Textarea, or any element that accepts `id`. */
    children: (bag: {
        id: string;
        describedBy?: string;
        invalid: boolean;
    }) => ReactNode;
    /** Override the generated id. */
    id?: string;
    className?: string;
}
/**
 * Field is a render-prop wrapper that associates a label, an optional
 * help/error message, and a form control — wiring `htmlFor`, `id`, and
 * `aria-describedby` automatically.
 */
declare function Field({ label, help, error, children, id: idProp, className }: FieldProps): react_jsx_runtime.JSX.Element;

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof RCheckbox.Root> {
    label?: ReactNode;
}
declare const Checkbox: react.ForwardRefExoticComponent<CheckboxProps & react.RefAttributes<HTMLButtonElement>>;

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RSwitch.Root> {
    label?: ReactNode;
}
declare const Switch: react.ForwardRefExoticComponent<SwitchProps & react.RefAttributes<HTMLButtonElement>>;

declare const RadioGroup: react.ForwardRefExoticComponent<Omit<RRadio.RadioGroupProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
interface RadioProps extends React.ComponentPropsWithoutRef<typeof RRadio.Item> {
    label?: ReactNode;
}
declare const Radio: react.ForwardRefExoticComponent<RadioProps & react.RefAttributes<HTMLButtonElement>>;

declare const Tabs: react.ForwardRefExoticComponent<RTabs.TabsProps & react.RefAttributes<HTMLDivElement>>;
declare const TabsList: react.ForwardRefExoticComponent<Omit<RTabs.TabsListProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof RTabs.Trigger> {
    children?: ReactNode;
    /** Shared layoutId for the sliding underline. */
    layoutId?: string;
    isActive?: boolean;
}
declare const TabsTrigger: react.ForwardRefExoticComponent<TabsTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: react.ForwardRefExoticComponent<RTabs.TabsContentProps & react.RefAttributes<HTMLDivElement>>;

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    /**
     * Cap the visible height of the table. When the rows overflow, the
     * wrapper scrolls and the thead stays pinned. Accepts any CSS length.
     */
    maxHeight?: number | string;
    /** Apply a className to the outer scrolling wrapper. */
    wrapperClassName?: string;
}
declare const Table: react.ForwardRefExoticComponent<TableProps & react.RefAttributes<HTMLTableElement>>;

/** Wrap your app in <ToastProvider>…</ToastProvider> to enable toasts. */
declare function ToastProvider({ children }: {
    children: ReactNode;
}): react_jsx_runtime.JSX.Element;
interface ToastProps extends Omit<React.ComponentPropsWithoutRef<typeof RToast.Root>, "title"> {
    title?: ReactNode;
    kind?: "success" | "error" | "info";
    action?: ReactNode;
}
declare function Toast({ title, kind, action, children, className, ...rest }: ToastProps): react_jsx_runtime.JSX.Element;

declare const Dialog: react.FC<RDialog.DialogProps>;
declare const DialogTrigger: react.ForwardRefExoticComponent<RDialog.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: react.ForwardRefExoticComponent<RDialog.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
interface DialogContentProps extends Omit<React.ComponentPropsWithoutRef<typeof RDialog.Content>, "title"> {
    title?: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
}
declare function DialogContent({ title, description, children, className, ...rest }: DialogContentProps): react_jsx_runtime.JSX.Element;

declare function TooltipProvider({ children, delayDuration }: {
    children: ReactNode;
    delayDuration?: number;
}): react_jsx_runtime.JSX.Element;
interface TooltipProps {
    content: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    children: ReactNode;
}
declare function Tooltip({ content, side, children }: TooltipProps): react_jsx_runtime.JSX.Element;

declare const Popover: react.FC<RPopover.PopoverProps>;
declare const PopoverTrigger: react.ForwardRefExoticComponent<RPopover.PopoverTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const PopoverClose: react.ForwardRefExoticComponent<RPopover.PopoverCloseProps & react.RefAttributes<HTMLButtonElement>>;
interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof RPopover.Content> {
    children?: ReactNode;
}
declare function PopoverContent({ className, children, sideOffset, ...rest }: PopoverContentProps): react_jsx_runtime.JSX.Element;

declare const DropdownMenu: react.FC<RDropdown.DropdownMenuProps>;
declare const DropdownMenuTrigger: react.ForwardRefExoticComponent<RDropdown.DropdownMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare function DropdownMenuContent({ children, className, sideOffset, ...rest }: React.ComponentPropsWithoutRef<typeof RDropdown.Content>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuItem({ className, children, ...rest }: React.ComponentPropsWithoutRef<typeof RDropdown.Item>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuLabel({ className, children }: {
    className?: string;
    children: ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSeparator(): react_jsx_runtime.JSX.Element;

declare const Select: react.FC<RSelect.SelectProps>;
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof RSelect.Trigger> {
    placeholder?: string;
}
declare const SelectTrigger: react.ForwardRefExoticComponent<SelectTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare function SelectContent({ children, className, ...rest }: React.ComponentPropsWithoutRef<typeof RSelect.Content>): react_jsx_runtime.JSX.Element;
interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof RSelect.Item> {
    children: ReactNode;
}
declare const SelectItem: react.ForwardRefExoticComponent<SelectItemProps & react.RefAttributes<HTMLDivElement>>;

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    /** Pixel or percent width (default 100%). */
    width?: number | string;
    /** Pixel height — default 12px. */
    height?: number | string;
    /** Fully rounded, circle. */
    circle?: boolean;
}
declare const Skeleton: react.ForwardRefExoticComponent<SkeletonProps & react.RefAttributes<HTMLDivElement>>;

interface EmptyStateProps {
    icon?: ReactNode;
    title: ReactNode;
    body?: ReactNode;
    action?: ReactNode;
    className?: string;
}
declare function EmptyState({ icon, title, body, action, className }: EmptyStateProps): react_jsx_runtime.JSX.Element;

interface PaginationProps {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    /** Max numbered buttons shown — defaults to 7. Ellipsis fills gaps. */
    siblings?: number;
    className?: string;
    prevLabel?: ReactNode;
    nextLabel?: ReactNode;
}
declare function Pagination({ page, pageCount, onPageChange, siblings, prevLabel, nextLabel, className, }: PaginationProps): react_jsx_runtime.JSX.Element | null;

interface BreadcrumbItem {
    label: ReactNode;
    href?: string;
    /** The final crumb — marked aria-current */
    current?: boolean;
}
interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: ReactNode;
    className?: string;
}
declare function Breadcrumb({ items, separator, className }: BreadcrumbProps): react_jsx_runtime.JSX.Element;

interface ProgressProps {
    value?: number;
    max?: number;
    /** If no value is given, renders indeterminate animation. */
    indeterminate?: boolean;
    className?: string;
    "aria-label"?: string;
}
declare function Progress({ value, max, indeterminate, className, "aria-label": ariaLabel, }: ProgressProps): react_jsx_runtime.JSX.Element;

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof RSeparator.Root> {
}
declare function Separator({ className, ...rest }: SeparatorProps): react_jsx_runtime.JSX.Element;

interface KbdProps extends HTMLAttributes<HTMLElement> {
    size?: "sm" | "md";
}
declare const Kbd: react.ForwardRefExoticComponent<KbdProps & react.RefAttributes<HTMLElement>>;

interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    size?: number;
    label?: string;
}
declare const Spinner: react.ForwardRefExoticComponent<SpinnerProps & react.RefAttributes<HTMLSpanElement>>;

declare const Accordion: react.ForwardRefExoticComponent<(RAccordion.AccordionSingleProps | RAccordion.AccordionMultipleProps) & react.RefAttributes<HTMLDivElement>>;
interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof RAccordion.Item> {
}
declare const AccordionItem: react.ForwardRefExoticComponent<AccordionItemProps & react.RefAttributes<HTMLDivElement>>;
interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof RAccordion.Trigger> {
    children: ReactNode;
}
declare const AccordionTrigger: react.ForwardRefExoticComponent<AccordionTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: react.ForwardRefExoticComponent<Omit<RAccordion.AccordionContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

interface SliderProps extends React.ComponentPropsWithoutRef<typeof RSlider.Root> {
}
declare const Slider: react.ForwardRefExoticComponent<SliderProps & react.RefAttributes<HTMLSpanElement>>;

declare const Toggle: react.ForwardRefExoticComponent<Omit<RToggle.ToggleProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;
declare const ToggleGroup: react.ForwardRefExoticComponent<(Omit<RToggleGroup.ToggleGroupSingleProps & react.RefAttributes<HTMLDivElement>, "ref"> | Omit<RToggleGroup.ToggleGroupMultipleProps & react.RefAttributes<HTMLDivElement>, "ref">) & react.RefAttributes<HTMLDivElement>>;
declare const ToggleGroupItem: react.ForwardRefExoticComponent<Omit<RToggleGroup.ToggleGroupItemProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;

/**
 * Wrap your app in <MonosetProvider> to enable:
 *   - prefers-reduced-motion handling (via framer-motion MotionConfig)
 *   - Radix TooltipProvider for delay sharing
 *   - Toast viewport for <Toast> components
 */
interface MonosetProviderProps {
    children: ReactNode;
    /** Inherit system preference. Set to "always" for testing, "never" to disable entirely. */
    reducedMotion?: "user" | "always" | "never";
    /** Default tooltip delay. */
    tooltipDelay?: number;
}
declare function MonosetProvider({ children, reducedMotion, tooltipDelay, }: MonosetProviderProps): react_jsx_runtime.JSX.Element;

/** Tiny className helper — no external deps. */
declare function cx(...parts: Array<string | false | null | undefined>): string;

export { Accordion, AccordionContent, AccordionItem, type AccordionItemProps, AccordionTrigger, type AccordionTriggerProps, Alert, type AlertProps, Avatar, type AvatarProps, type AvatarSize, Badge, type BadgeProps, type BadgeVariant, Breadcrumb, type BreadcrumbItem, type BreadcrumbProps, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Card, type CardProps, type CardVariant, Checkbox, type CheckboxProps, Dialog, DialogClose, DialogContent, type DialogContentProps, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, EmptyState, type EmptyStateProps, Field, type FieldProps, Input, type InputProps, Kbd, type KbdProps, MonosetProvider, type MonosetProviderProps, Pagination, type PaginationProps, Popover, PopoverClose, PopoverContent, type PopoverContentProps, PopoverTrigger, Progress, type ProgressProps, Radio, RadioGroup, type RadioProps, Select, SelectContent, SelectItem, type SelectItemProps, SelectTrigger, type SelectTriggerProps, Separator, type SeparatorProps, Skeleton, type SkeletonProps, Slider, type SliderProps, Spinner, type SpinnerProps, Switch, type SwitchProps, Table, Tabs, TabsContent, TabsList, TabsTrigger, type TabsTriggerProps, Textarea, type TextareaProps, Toast, type ToastProps, ToastProvider, Toggle, ToggleGroup, ToggleGroupItem, Tooltip, type TooltipProps, TooltipProvider, cx };
