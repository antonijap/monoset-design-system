import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode, HTMLAttributes, ReactElement, InputHTMLAttributes, TextareaHTMLAttributes, TableHTMLAttributes, ThHTMLAttributes, ComponentPropsWithoutRef, AriaAttributes, FocusEventHandler, Key, ComponentProps } from 'react';
import * as RCheckbox from '@radix-ui/react-checkbox';
import * as RSwitch from '@radix-ui/react-switch';
import * as RRadio from '@radix-ui/react-radio-group';
import * as RTabs from '@radix-ui/react-tabs';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as RToast from '@radix-ui/react-toast';
import * as RDialog from '@radix-ui/react-dialog';
import * as RHoverCard from '@radix-ui/react-hover-card';
import * as RNav from '@radix-ui/react-navigation-menu';
import * as RCtx from '@radix-ui/react-context-menu';
import { CalendarDate } from '@internationalized/date';
export { CalendarDate } from '@internationalized/date';
import * as RTooltip from '@radix-ui/react-tooltip';
import * as RPopover from '@radix-ui/react-popover';
import * as RDropdown from '@radix-ui/react-dropdown-menu';
import * as RSelect from '@radix-ui/react-select';
import * as RSeparator from '@radix-ui/react-separator';
import * as RAccordion from '@radix-ui/react-accordion';
import * as RSlider from '@radix-ui/react-slider';
import * as RToggleGroup from '@radix-ui/react-toggle-group';
import * as RToggle from '@radix-ui/react-toggle';
import * as RCollapsible from '@radix-ui/react-collapsible';
import * as RAspectRatio from '@radix-ui/react-aspect-ratio';
import { MotionConfig } from 'framer-motion';

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
interface AvatarSharedProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    size?: AvatarSize;
    /** Optional fallback override. */
    initials?: string;
    /** Optional image URL. */
    src?: string;
    /** Alt text for the image. */
    alt?: string;
}
interface NamedAvatarProps extends AvatarSharedProps {
    /** Name used for the accessible label and fallback initials. */
    name: string;
    decorative?: false;
}
interface DecorativeAvatarProps extends AvatarSharedProps {
    /** Hides the avatar from accessibility APIs. */
    decorative: true;
    name?: string;
}
type AvatarProps = NamedAvatarProps | DecorativeAvatarProps;
declare const Avatar: react.ForwardRefExoticComponent<AvatarProps & react.RefAttributes<HTMLSpanElement>>;

type CardVariant = "outline" | "elevated" | "inset";
interface CardSharedProps {
    variant?: CardVariant;
}
type CardProps = CardSharedProps & ((Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    /** Uses the default div wrapper. */
    asChild?: false;
    children?: ReactNode;
}) | (Omit<HTMLAttributes<HTMLElement>, "children"> & {
    /** Applies the card props to exactly one child element. */
    asChild: true;
    children: ReactElement<HTMLAttributes<HTMLElement>, keyof HTMLElementTagNameMap>;
}));
declare const Card: react.ForwardRefExoticComponent<CardProps & react.RefAttributes<HTMLElement>>;

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
interface FieldControlRenderProps {
    id: string;
    "aria-labelledby": string;
    "aria-describedby"?: string;
    "aria-invalid"?: true;
    required?: true;
}
interface FieldControlProps {
    children: (props: FieldControlRenderProps) => ReactNode;
}
declare function FieldControl({ children }: FieldControlProps): ReactNode;
interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "id"> {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    label: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
    children: ReactNode;
    /** The associated control id. */
    id?: string;
    /** The wrapper element id. */
    rootId?: string;
    required?: boolean;
    invalid?: boolean;
}
declare const Field: react.ForwardRefExoticComponent<FieldProps & react.RefAttributes<HTMLDivElement>> & {
    Control: typeof FieldControl;
};

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
type SortDirection = "asc" | "desc" | null;
interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
    /** Enable sort on this column. */
    sortable?: boolean;
    /** Current sort direction for this column. */
    sortDirection?: SortDirection;
    /** Callback when the user clicks to toggle sort. */
    onSort?: () => void;
}
declare const TableHeader: react.ForwardRefExoticComponent<TableHeaderProps & react.RefAttributes<HTMLTableCellElement>>;
interface TableSelectAllProps {
    checked: boolean;
    indeterminate?: boolean;
    onChange: (checked: boolean) => void;
    /** Screen-reader label. Defaults to "Select all rows". */
    label?: string;
}
declare function TableSelectAll({ checked, indeterminate, onChange, label, }: TableSelectAllProps): react_jsx_runtime.JSX.Element;
interface TableSelectRowProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    /** Screen-reader label. Defaults to "Select row". */
    label?: string;
}
declare function TableSelectRow({ checked, onChange, label, }: TableSelectRowProps): react_jsx_runtime.JSX.Element;

type ToastKind = "success" | "error" | "info";
type ToastActionProps = {
    action: ReactNode;
    actionAltText: string;
    onAction?: () => void;
} | {
    action?: undefined;
    actionAltText?: never;
    onAction?: never;
};
interface ToastBaseProps extends Omit<ComponentPropsWithoutRef<typeof RToast.Root>, "title"> {
    title?: ReactNode;
    kind?: ToastKind;
    closeLabel?: string;
}
type ToastProps = ToastBaseProps & ToastActionProps;
type ToastInput = Omit<ToastBaseProps, "open" | "defaultOpen" | "children" | "id"> & ToastActionProps & {
    description?: ReactNode;
};
type ToastItem = ToastInput & {
    id: number;
};
interface ToastApi {
    /** Queue a toast and return its id. */
    toast: (item: ToastInput) => number;
    /** Dismiss a queued toast by id. */
    dismiss: (id: number) => void;
}
declare function useToast(): ToastApi;
interface ToastProviderProps extends ComponentPropsWithoutRef<typeof RToast.Provider> {
}
/** Wrap your app in ToastProvider to enable declarative and queued toasts. */
declare function ToastProvider({ children, duration, swipeDirection, ...props }: ToastProviderProps): react_jsx_runtime.JSX.Element;
declare const Toast: react.ForwardRefExoticComponent<ToastProps & react.RefAttributes<HTMLLIElement>>;

declare const Dialog: react.FC<RDialog.DialogProps>;
declare const DialogTrigger: react.ForwardRefExoticComponent<RDialog.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: react.ForwardRefExoticComponent<RDialog.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
interface DialogContentProps extends Omit<React.ComponentPropsWithoutRef<typeof RDialog.Content>, "title"> {
    title: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    overlayClassName?: string;
}
declare const DialogContent: react.ForwardRefExoticComponent<DialogContentProps & react.RefAttributes<HTMLDivElement>>;

declare const Sheet: react.FC<RDialog.DialogProps>;
declare const SheetTrigger: react.ForwardRefExoticComponent<RDialog.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const SheetClose: react.ForwardRefExoticComponent<RDialog.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
type SheetSide = "left" | "right" | "top" | "bottom";
interface SheetContentProps extends Omit<React.ComponentPropsWithoutRef<typeof RDialog.Content>, "title"> {
    title: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    overlayClassName?: string;
    /** Which edge the panel slides in from. Default: "right". */
    side?: SheetSide;
    /** Panel width (left/right) or height (top/bottom). Default: 380px. */
    size?: string | number;
    /** Show the built-in close button in the top corner. Default: true. */
    showClose?: boolean;
}
declare const SheetContent: react.ForwardRefExoticComponent<SheetContentProps & react.RefAttributes<HTMLDivElement>>;

interface CommandItem {
    id: string;
    label: string;
    description?: string;
    icon?: ReactNode;
    /** Called when the action is selected. */
    onSelect?: () => void;
    /** Extra search terms that are not rendered. */
    keywords?: string[];
    disabled?: boolean;
}
interface CommandGroup {
    heading?: string;
    items: CommandItem[];
}
interface CommandPaletteProps {
    /** CommandPalette is explicitly controlled. */
    open: boolean;
    /** Called when an action or dialog interaction requests dismissal. */
    onOpenChange: (open: boolean) => void;
    items?: CommandItem[] | CommandGroup[];
    placeholder?: string;
    emptyMessage?: string;
    filter?: (query: string, item: CommandItem) => boolean;
    footer?: ReactNode;
    className?: string;
}
declare const CommandPalette: react.ForwardRefExoticComponent<CommandPaletteProps & react.RefAttributes<HTMLDivElement>>;

interface AppShellProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    children: ReactNode;
    sidebarWidth?: number;
    className?: string;
    /** Controlled mobile drawer state. */
    mobileOpen?: boolean;
    /** Initial mobile drawer state when uncontrolled. */
    defaultMobileOpen?: boolean;
    onMobileOpenChange?: (open: boolean) => void;
    /** Changing this value closes an open drawer after client-side navigation. */
    navigationSignal?: string | number;
}
declare const AppShellRoot: react.ForwardRefExoticComponent<AppShellProps & react.RefAttributes<HTMLDivElement>>;
interface AppShellSidebarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "id" | "role"> {
    children: ReactNode;
    brand?: ReactNode;
    footer?: ReactNode;
    className?: string;
}
declare const AppShellSidebar: react.ForwardRefExoticComponent<AppShellSidebarProps & react.RefAttributes<HTMLDivElement>>;
interface AppShellSidebarGroupProps {
    label?: ReactNode;
    children: ReactNode;
    className?: string;
}
declare function AppShellSidebarGroup({ label, children, className, }: AppShellSidebarGroupProps): react_jsx_runtime.JSX.Element;
interface AppShellSidebarItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    icon?: ReactNode;
    active?: boolean;
    children: ReactNode;
}
declare const AppShellSidebarItem: react.ForwardRefExoticComponent<AppShellSidebarItemProps & react.RefAttributes<HTMLButtonElement>>;
interface AppShellMainProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
declare const AppShellMain: react.ForwardRefExoticComponent<AppShellMainProps & react.RefAttributes<HTMLDivElement>>;
interface AppShellHeaderProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
}
declare const AppShellHeader: react.ForwardRefExoticComponent<AppShellHeaderProps & react.RefAttributes<HTMLElement>>;
interface AppShellMobileTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}
declare const AppShellMobileTrigger: react.ForwardRefExoticComponent<AppShellMobileTriggerProps & react.RefAttributes<HTMLButtonElement>>;
interface AppShellContentProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
}
declare const AppShellContent: react.ForwardRefExoticComponent<AppShellContentProps & react.RefAttributes<HTMLElement>>;
declare function useAppShellMobile(): {
    open: boolean;
    setOpen: (open: boolean) => void;
};
type AppShellComponent = typeof AppShellRoot & {
    Sidebar: typeof AppShellSidebar;
    SidebarGroup: typeof AppShellSidebarGroup;
    SidebarItem: typeof AppShellSidebarItem;
    Main: typeof AppShellMain;
    Header: typeof AppShellHeader;
    MobileTrigger: typeof AppShellMobileTrigger;
    Content: typeof AppShellContent;
};
declare const AppShell: AppShellComponent;

interface ComboboxOption {
    value: string;
    label: string;
    /**
     * Unique text used for filtering, announcements, and the selected input value.
     * Required when two options share the same visible label.
     */
    textValue?: string;
    description?: string;
    disabled?: boolean;
    /** Extra terms used by search but not displayed. */
    keywords?: string[];
}
interface ComboboxProps {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    options: ComboboxOption[];
    value?: string | null;
    defaultValue?: string | null;
    onValueChange?: (value: string | null) => void;
    inputValue?: string;
    defaultInputValue?: string;
    onInputValueChange?: (value: string) => void;
    placeholder?: string;
    emptyMessage?: string;
    filter?: (query: string, option: ComboboxOption) => boolean;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    name?: string;
    form?: string;
    autoComplete?: string;
    id?: string;
    title?: string;
    className?: string;
    inputClassName?: string;
    popoverClassName?: string;
    "aria-label"?: AriaAttributes["aria-label"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-errormessage"?: AriaAttributes["aria-errormessage"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-required"?: AriaAttributes["aria-required"];
}
declare const Combobox: react.ForwardRefExoticComponent<ComboboxProps & react.RefAttributes<HTMLDivElement>>;

interface MultiComboboxOption {
    value: string;
    label: string;
    /** Text announced by the combobox and used to disambiguate duplicate labels. */
    textValue?: string;
    description?: string;
    disabled?: boolean;
    /** Extra terms used by search but not displayed. */
    keywords?: string[];
}
interface MultiComboboxProps {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    options: MultiComboboxOption[];
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    inputValue?: string;
    defaultInputValue?: string;
    onInputValueChange?: (value: string) => void;
    placeholder?: string;
    emptyMessage?: string;
    filter?: (query: string, option: MultiComboboxOption) => boolean;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    name?: string;
    form?: string;
    autoComplete?: string;
    id?: string;
    title?: string;
    className?: string;
    inputClassName?: string;
    popoverClassName?: string;
    "aria-label"?: AriaAttributes["aria-label"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-errormessage"?: AriaAttributes["aria-errormessage"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-required"?: AriaAttributes["aria-required"];
}
declare const MultiCombobox: react.ForwardRefExoticComponent<MultiComboboxProps & react.RefAttributes<HTMLDivElement>>;

declare const HoverCard: react.FC<RHoverCard.HoverCardProps>;
declare const HoverCardTrigger: react.ForwardRefExoticComponent<RHoverCard.HoverCardTriggerProps & react.RefAttributes<HTMLAnchorElement>>;
interface HoverCardContentProps extends ComponentPropsWithoutRef<typeof RHoverCard.Content> {
    children?: ReactNode;
}
declare const HoverCardContent: react.ForwardRefExoticComponent<HoverCardContentProps & react.RefAttributes<HTMLDivElement>>;

interface PasswordInputProps extends Omit<InputProps, "type"> {
    /** Show the toggle button. Default: true. */
    showToggle?: boolean;
    /** Override the visible-state text on the toggle button. */
    showLabel?: string;
    hideLabel?: string;
    /** Class name applied to the wrapper when the toggle is visible. */
    wrapperClassName?: string;
}
declare const PasswordInput: react.ForwardRefExoticComponent<PasswordInputProps & react.RefAttributes<HTMLInputElement>>;

interface NumberInputProps {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    value?: number | null;
    defaultValue?: number | null;
    onValueChange?: (value: number | null) => void;
    min?: number;
    max?: number;
    step?: number;
    formatOptions?: Intl.NumberFormatOptions;
    /** Hide the increment and decrement buttons. Default: false. */
    hideStepper?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    /** Locale used to parse and format the editable value. */
    locale?: string;
    /** Class applied to the NumberInput wrapper. */
    className?: string;
    /** Class applied to the editable input. */
    inputClassName?: string;
    name?: string;
    form?: string;
    autoComplete?: string;
    id?: string;
    title?: string;
    "aria-label"?: AriaAttributes["aria-label"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-errormessage"?: AriaAttributes["aria-errormessage"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-required"?: AriaAttributes["aria-required"];
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
}
declare const NumberInput: react.ForwardRefExoticComponent<NumberInputProps & react.RefAttributes<HTMLInputElement>>;

interface PinInputProps {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    /** Number of cells. Default: 6. */
    length?: number;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** Fired once when an edit changes an incomplete code into a complete one. */
    onComplete?: (value: string) => void;
    /** Mask all cells like a password. */
    mask?: boolean;
    /** Restrict each character to a regex. Default: digits only. */
    pattern?: RegExp;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    autoFocus?: boolean;
    name?: string;
    form?: string;
    id?: string;
    title?: string;
    className?: string;
    "aria-label"?: AriaAttributes["aria-label"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-errormessage"?: AriaAttributes["aria-errormessage"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-required"?: AriaAttributes["aria-required"];
}
declare const PinInput: react.ForwardRefExoticComponent<PinInputProps & react.RefAttributes<HTMLDivElement>>;

interface FileUploadProps {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    /** Files selected by a controlled state owner. */
    files?: File[];
    /** Initial files when the component owns its state. */
    defaultFiles?: File[];
    /** Fires when a picked, dropped, or removed file changes the selection. */
    onFilesChange?: (files: File[]) => void;
    /** Fires with files that do not match `accept`. */
    onFilesRejected?: (files: File[]) => void;
    /** Native file input accept string, such as `image/*,.pdf`. */
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    required?: boolean;
    invalid?: boolean;
    name?: string;
    form?: string;
    id?: string;
    title?: string;
    /** Replaces the default prompt inside the dropzone. */
    children?: ReactNode;
    className?: string;
    "aria-label"?: AriaAttributes["aria-label"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-errormessage"?: AriaAttributes["aria-errormessage"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-required"?: AriaAttributes["aria-required"];
}
declare const FileUpload: react.ForwardRefExoticComponent<FileUploadProps & react.RefAttributes<HTMLDivElement>>;

interface StepperStep {
    label: ReactNode;
    /** Optional sublabel below the main label. */
    description?: ReactNode;
}
interface StepperProps extends Omit<ComponentPropsWithoutRef<"ol">, "children"> {
    steps: StepperStep[];
    /** Current step (0-indexed). */
    current: number;
}
/**
 * A horizontal multi-step indicator (1 of N). Use it at the top of a wizard
 * to show progress. The component is presentational; you drive the step state.
 */
declare const Stepper: react.ForwardRefExoticComponent<StepperProps & react.RefAttributes<HTMLOListElement>>;

declare const NavigationMenu: react.ForwardRefExoticComponent<Omit<RNav.NavigationMenuProps & react.RefAttributes<HTMLElement>, "ref"> & react.RefAttributes<HTMLElement>>;
declare const NavigationMenuList: react.ForwardRefExoticComponent<Omit<RNav.NavigationMenuListProps & react.RefAttributes<HTMLUListElement>, "ref"> & react.RefAttributes<HTMLUListElement>>;
interface NavigationMenuItemProps extends React.ComponentPropsWithoutRef<typeof RNav.Item> {
    children?: ReactNode;
}
declare const NavigationMenuItem: react.ForwardRefExoticComponent<NavigationMenuItemProps & react.RefAttributes<HTMLLIElement>>;
interface NavigationMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof RNav.Trigger> {
    children?: ReactNode;
}
declare const NavigationMenuTrigger: react.ForwardRefExoticComponent<NavigationMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
interface NavigationMenuContentProps extends React.ComponentPropsWithoutRef<typeof RNav.Content> {
    children?: ReactNode;
}
declare const NavigationMenuContent: react.ForwardRefExoticComponent<NavigationMenuContentProps & react.RefAttributes<HTMLDivElement>>;
interface NavigationMenuLinkProps extends React.ComponentPropsWithoutRef<typeof RNav.Link> {
    children?: ReactNode;
}
declare const NavigationMenuLink: react.ForwardRefExoticComponent<NavigationMenuLinkProps & react.RefAttributes<HTMLAnchorElement>>;
interface NavigationMenuIndicatorProps extends React.ComponentPropsWithoutRef<typeof RNav.Indicator> {
    children?: ReactNode;
}
declare const NavigationMenuIndicator: react.ForwardRefExoticComponent<NavigationMenuIndicatorProps & react.RefAttributes<HTMLDivElement>>;
interface NavigationMenuViewportProps extends React.ComponentPropsWithoutRef<typeof RNav.Viewport> {
    children?: ReactNode;
}
declare const NavigationMenuViewport: react.ForwardRefExoticComponent<NavigationMenuViewportProps & react.RefAttributes<HTMLDivElement>>;

declare const ContextMenu: react.FC<RCtx.ContextMenuProps>;
declare const ContextMenuTrigger: react.ForwardRefExoticComponent<RCtx.ContextMenuTriggerProps & react.RefAttributes<HTMLSpanElement>>;
declare const ContextMenuSub: react.FC<RCtx.ContextMenuSubProps>;
interface ContextMenuContentProps extends React.ComponentPropsWithoutRef<typeof RCtx.Content> {
    children?: ReactNode;
}
declare const ContextMenuContent: react.ForwardRefExoticComponent<ContextMenuContentProps & react.RefAttributes<HTMLDivElement>>;
interface ContextMenuItemProps extends React.ComponentPropsWithoutRef<typeof RCtx.Item> {
    children?: ReactNode;
}
declare const ContextMenuItem: react.ForwardRefExoticComponent<ContextMenuItemProps & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuLabel: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuLabelProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSeparator: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuSeparatorProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuGroup: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuGroupProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuCheckboxItem: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuCheckboxItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuItemIndicator: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuItemIndicatorProps & react.RefAttributes<HTMLSpanElement>, "ref"> & react.RefAttributes<HTMLSpanElement>>;
declare const ContextMenuRadioGroup: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuRadioGroupProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuRadioItem: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuRadioItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSubTrigger: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuSubTriggerProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSubContent: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuSubContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    children: ReactNode;
    /** Currently visible index (0-based). Controlled. */
    index?: number;
    defaultIndex?: number;
    onIndexChange?: (index: number) => void;
    /** Show prev/next buttons. Default: true. */
    showArrows?: boolean;
    /** Show pagination dots. Default: true. */
    showDots?: boolean;
    /** Auto-advance interval in ms. Omit to disable. */
    autoplay?: number;
}
/**
 * A simple horizontal carousel. Slides snap to each child via CSS scroll-snap;
 * arrows scroll programmatically; dots reflect/control the current index.
 */
declare const Carousel: react.ForwardRefExoticComponent<CarouselProps & react.RefAttributes<HTMLDivElement>>;

type FirstDayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
interface CalendarProps {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    value?: CalendarDate | null;
    defaultValue?: CalendarDate | null;
    onValueChange?: (date: CalendarDate) => void;
    focusedValue?: CalendarDate | null;
    defaultFocusedValue?: CalendarDate | null;
    onFocusChange?: (date: CalendarDate) => void;
    min?: CalendarDate | null;
    max?: CalendarDate | null;
    isDateUnavailable?: (date: CalendarDate) => boolean;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    autoFocus?: boolean;
    locale?: string;
    firstDayOfWeek?: FirstDayOfWeek;
    weeksInMonth?: number;
    id?: string;
    "aria-label"?: AriaAttributes["aria-label"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    className?: string;
}
declare function calendarDateFromNativeDate(date: Date): CalendarDate;
declare function calendarDateToNativeDate(date: CalendarDate, timeZone?: string): Date;
declare const Calendar: react.ForwardRefExoticComponent<CalendarProps & react.RefAttributes<HTMLDivElement>>;

interface DatePickerProps {
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    value?: CalendarDate | null;
    defaultValue?: CalendarDate | null;
    onValueChange?: (value: CalendarDate | null) => void;
    min?: CalendarDate | null;
    max?: CalendarDate | null;
    isDateUnavailable?: (date: CalendarDate) => boolean;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    id?: string;
    "aria-label"?: AriaAttributes["aria-label"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-live"?: AriaAttributes["aria-live"];
    "aria-required"?: AriaAttributes["aria-required"];
    title?: string;
    name?: string;
    form?: string;
    autoComplete?: string;
    locale?: string;
    firstDayOfWeek?: FirstDayOfWeek;
    weeksInMonth?: number;
    clearable?: boolean;
    clearLabel?: string;
    className?: string;
    triggerClassName?: string;
}
declare const DatePicker: react.ForwardRefExoticComponent<DatePickerProps & react.RefAttributes<HTMLDivElement>>;

interface TooltipProviderProps extends ComponentPropsWithoutRef<typeof RTooltip.Provider> {
}
declare function TooltipProvider({ children, delayDuration, ...props }: TooltipProviderProps): react_jsx_runtime.JSX.Element;
type TooltipRootProps = ComponentPropsWithoutRef<typeof RTooltip.Root>;
type TooltipContentProps = ComponentPropsWithoutRef<typeof RTooltip.Content>;
interface TooltipProps extends Omit<TooltipRootProps, "children"> {
    content: ReactNode;
    children: ReactElement;
    side?: TooltipContentProps["side"];
    sideOffset?: TooltipContentProps["sideOffset"];
    align?: TooltipContentProps["align"];
    className?: string;
    contentProps?: Omit<TooltipContentProps, "children" | "side" | "sideOffset" | "align" | "className">;
}
declare function Tooltip({ content, children, side, sideOffset, align, className, contentProps, ...rootProps }: TooltipProps): react_jsx_runtime.JSX.Element;

declare const Popover: react.FC<RPopover.PopoverProps>;
declare const PopoverTrigger: react.ForwardRefExoticComponent<RPopover.PopoverTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const PopoverClose: react.ForwardRefExoticComponent<RPopover.PopoverCloseProps & react.RefAttributes<HTMLButtonElement>>;
interface PopoverContentProps extends ComponentPropsWithoutRef<typeof RPopover.Content> {
    children?: ReactNode;
}
declare const PopoverContent: react.ForwardRefExoticComponent<PopoverContentProps & react.RefAttributes<HTMLDivElement>>;

declare const DropdownMenu: react.FC<RDropdown.DropdownMenuProps>;
declare const DropdownMenuTrigger: react.ForwardRefExoticComponent<RDropdown.DropdownMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuSub: react.FC<RDropdown.DropdownMenuSubProps>;
declare const DropdownMenuContent: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuLabelProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuSeparatorProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuGroup: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuGroupProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuCheckboxItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItemIndicator: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuItemIndicatorProps & react.RefAttributes<HTMLSpanElement>, "ref"> & react.RefAttributes<HTMLSpanElement>>;
declare const DropdownMenuRadioGroup: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuRadioGroupProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuRadioItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubTrigger: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuSubTriggerProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuSubContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

declare const Select: react.FC<RSelect.SelectProps>;
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof RSelect.Trigger> {
    placeholder?: string;
}
declare const SelectTrigger: react.ForwardRefExoticComponent<SelectTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const SelectContent: react.ForwardRefExoticComponent<Omit<RSelect.SelectContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
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

interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    icon?: ReactNode;
    title: ReactNode;
    body?: ReactNode;
    action?: ReactNode;
    headingLevel?: 2 | 3 | 4 | 5 | 6;
}
declare const EmptyState: react.ForwardRefExoticComponent<EmptyStateProps & react.RefAttributes<HTMLDivElement>>;

interface PaginationProps extends Omit<ComponentPropsWithoutRef<"nav">, "children"> {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    /** Max numbered buttons shown — defaults to 7. Ellipsis fills gaps. */
    siblings?: number;
    prevLabel?: ReactNode;
    nextLabel?: ReactNode;
}
declare const Pagination: react.ForwardRefExoticComponent<PaginationProps & react.RefAttributes<HTMLElement>>;

interface BreadcrumbItem {
    id?: Key;
    label: ReactNode;
    href?: string;
    /** The final crumb — marked aria-current */
    current?: boolean;
}
interface BreadcrumbProps extends Omit<ComponentPropsWithoutRef<"nav">, "children"> {
    items: BreadcrumbItem[];
    separator?: ReactNode;
}
declare const Breadcrumb: react.ForwardRefExoticComponent<BreadcrumbProps & react.RefAttributes<HTMLElement>>;

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
declare const Separator: react.ForwardRefExoticComponent<SeparatorProps & react.RefAttributes<HTMLDivElement>>;

type SpaceScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
interface StackProps extends HTMLAttributes<HTMLDivElement> {
    gap?: SpaceScale;
    align?: "start" | "center" | "end" | "stretch";
}
declare const Stack: react.ForwardRefExoticComponent<StackProps & react.RefAttributes<HTMLDivElement>>;
interface InlineProps extends HTMLAttributes<HTMLDivElement> {
    gap?: SpaceScale;
    align?: "start" | "center" | "end" | "baseline";
    wrap?: boolean;
}
declare const Inline: react.ForwardRefExoticComponent<InlineProps & react.RefAttributes<HTMLDivElement>>;
interface GridProps extends HTMLAttributes<HTMLDivElement> {
    columns?: number;
    minWidth?: number | string;
    gap?: SpaceScale;
}
declare const Grid: react.ForwardRefExoticComponent<GridProps & react.RefAttributes<HTMLDivElement>>;
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
    padding?: boolean;
}
declare const Container: react.ForwardRefExoticComponent<ContainerProps & react.RefAttributes<HTMLDivElement>>;

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
    /** Accessible labels applied to thumbs by index. */
    thumbLabels?: readonly (string | undefined)[];
    /** IDs of elements that label thumbs, applied by index. */
    thumbLabelledBy?: readonly (string | undefined)[];
}
declare const Slider: react.ForwardRefExoticComponent<SliderProps & react.RefAttributes<HTMLSpanElement>>;

interface ToggleProps extends React.ComponentPropsWithoutRef<typeof RToggle.Root> {
}
declare const Toggle: react.ForwardRefExoticComponent<ToggleProps & react.RefAttributes<HTMLButtonElement>>;
type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof RToggleGroup.Root>;
declare const ToggleGroup: react.ForwardRefExoticComponent<ToggleGroupProps & react.RefAttributes<HTMLDivElement>>;
interface ToggleGroupItemProps extends React.ComponentPropsWithoutRef<typeof RToggleGroup.Item> {
}
declare const ToggleGroupItem: react.ForwardRefExoticComponent<ToggleGroupItemProps & react.RefAttributes<HTMLButtonElement>>;

declare const Collapsible: react.ForwardRefExoticComponent<RCollapsible.CollapsibleProps & react.RefAttributes<HTMLDivElement>>;
interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<typeof RCollapsible.Trigger> {
    children?: ReactNode;
    /** Hide the built-in chevron. Default: false. */
    hideChevron?: boolean;
}
declare const CollapsibleTrigger: react.ForwardRefExoticComponent<CollapsibleTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const CollapsibleContent: react.ForwardRefExoticComponent<Omit<RCollapsible.CollapsibleContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof RAspectRatio.Root> {
}
/** Holds a consistent width-to-height ratio for media. The default ratio is square. */
declare const AspectRatio: react.ForwardRefExoticComponent<AspectRatioProps & react.RefAttributes<HTMLDivElement>>;

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";
interface ThemeStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}
interface ThemeProviderProps {
    children: ReactNode;
    /** Theme used for server rendering and the first client render. */
    initialTheme?: Theme;
    /** Persistence key. Defaults to "monoset-theme". */
    storageKey?: string;
    /** Custom persistence. Pass null to disable it. */
    storage?: ThemeStorage | null;
    /**
     * Apply the theme to the document or to a provider-owned wrapper. Document
     * providers own data-monoset-theme and monoset-dark while mounted.
     */
    target?: "document" | "scope";
    /** Native props for the wrapper rendered when target is "scope". */
    scopeProps?: Omit<ComponentPropsWithoutRef<"div">, "children">;
}
interface ThemeContextValue {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
}
declare function ThemeProvider({ children, initialTheme, storageKey, storage, target, scopeProps, }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
declare function useTheme(): ThemeContextValue;
interface ThemeToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
}
declare const ThemeToggle: react.ForwardRefExoticComponent<ThemeToggleProps & react.RefAttributes<HTMLButtonElement>>;

type MonosetThemeOptions = Omit<ThemeProviderProps, "children">;
type MonosetTooltipOptions = Omit<TooltipProviderProps, "children">;
type MonosetToastOptions = Omit<ToastProviderProps, "children">;
type MonosetMotionOptions = Omit<ComponentProps<typeof MotionConfig>, "children">;
interface MonosetPortalOptions {
    container: HTMLElement | null;
}
interface MonosetProviderProps {
    children: ReactNode;
    /** Theme management is opt-in. */
    theme?: false | MonosetThemeOptions;
    /**
     * Shared tooltips, enabled by default. The first enabled ancestor owns the
     * configuration. Nested values are ignored while infrastructure is inherited.
     * False skips creation here, but cannot disable an active ancestor.
     */
    tooltip?: false | MonosetTooltipOptions;
    /**
     * Shared toasts, enabled by default. The first enabled ancestor owns the
     * configuration. Nested values are ignored while infrastructure is inherited.
     * False skips creation here, but cannot disable an active ancestor.
     */
    toast?: false | MonosetToastOptions;
    /** Motion configuration. Defaults to the user's reduced-motion preference. */
    motion?: false | MonosetMotionOptions;
    /** Portal target inherited by Monoset overlay components. */
    portal?: false | MonosetPortalOptions;
}
declare function MonosetProvider({ children, theme, tooltip, toast, motion, portal, }: MonosetProviderProps): react_jsx_runtime.JSX.Element;

/** Tiny className helper — no external deps. */
declare function cx(...parts: Array<string | false | null | undefined>): string;

export { Accordion, AccordionContent, AccordionItem, type AccordionItemProps, AccordionTrigger, type AccordionTriggerProps, Alert, type AlertProps, AppShell, type AppShellContentProps, type AppShellHeaderProps, type AppShellMainProps, type AppShellMobileTriggerProps, type AppShellProps, type AppShellSidebarGroupProps, type AppShellSidebarItemProps, type AppShellSidebarProps, AspectRatio, type AspectRatioProps, Avatar, type AvatarProps, type AvatarSize, Badge, type BadgeProps, type BadgeVariant, Breadcrumb, type BreadcrumbItem, type BreadcrumbProps, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Calendar, type CalendarProps, Card, type CardProps, type CardVariant, Carousel, type CarouselProps, Checkbox, type CheckboxProps, Collapsible, CollapsibleContent, CollapsibleTrigger, type CollapsibleTriggerProps, Combobox, type ComboboxOption, type ComboboxProps, type CommandGroup, type CommandItem, CommandPalette, type CommandPaletteProps, Container, type ContainerProps, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, type ContextMenuContentProps, ContextMenuGroup, ContextMenuItem, ContextMenuItemIndicator, type ContextMenuItemProps, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, DatePicker, type DatePickerProps, Dialog, DialogClose, DialogContent, type DialogContentProps, DialogTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuItemIndicator, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EmptyState, type EmptyStateProps, Field, type FieldControlProps, type FieldControlRenderProps, type FieldProps, FileUpload, type FileUploadProps, type FirstDayOfWeek, Grid, type GridProps, HoverCard, HoverCardContent, type HoverCardContentProps, HoverCardTrigger, Inline, type InlineProps, Input, type InputProps, Kbd, type KbdProps, type MonosetMotionOptions, type MonosetPortalOptions, MonosetProvider, type MonosetProviderProps, type MonosetThemeOptions, type MonosetToastOptions, type MonosetTooltipOptions, MultiCombobox, type MultiComboboxOption, type MultiComboboxProps, NavigationMenu, NavigationMenuContent, type NavigationMenuContentProps, NavigationMenuIndicator, type NavigationMenuIndicatorProps, NavigationMenuItem, type NavigationMenuItemProps, NavigationMenuLink, type NavigationMenuLinkProps, NavigationMenuList, NavigationMenuTrigger, type NavigationMenuTriggerProps, NavigationMenuViewport, type NavigationMenuViewportProps, NumberInput, type NumberInputProps, Pagination, type PaginationProps, PasswordInput, type PasswordInputProps, PinInput, type PinInputProps, Popover, PopoverClose, PopoverContent, type PopoverContentProps, PopoverTrigger, Progress, type ProgressProps, Radio, RadioGroup, type RadioProps, type ResolvedTheme, Select, SelectContent, SelectItem, type SelectItemProps, SelectTrigger, type SelectTriggerProps, Separator, type SeparatorProps, Sheet, SheetClose, SheetContent, type SheetContentProps, type SheetSide, SheetTrigger, Skeleton, type SkeletonProps, Slider, type SliderProps, type SortDirection, Spinner, type SpinnerProps, Stack, type StackProps, Stepper, type StepperProps, type StepperStep, Switch, type SwitchProps, Table, TableHeader, type TableHeaderProps, type TableProps, TableSelectAll, type TableSelectAllProps, TableSelectRow, type TableSelectRowProps, Tabs, TabsContent, TabsList, TabsTrigger, type TabsTriggerProps, Textarea, type TextareaProps, type Theme, ThemeProvider, type ThemeProviderProps, type ThemeStorage, ThemeToggle, type ThemeToggleProps, Toast, type ToastApi, type ToastInput, type ToastItem, type ToastKind, type ToastProps, ToastProvider, type ToastProviderProps, Toggle, ToggleGroup, ToggleGroupItem, type ToggleGroupItemProps, type ToggleGroupProps, type ToggleProps, Tooltip, type TooltipProps, TooltipProvider, type TooltipProviderProps, calendarDateFromNativeDate, calendarDateToNativeDate, cx, useAppShellMobile, useTheme, useToast };
