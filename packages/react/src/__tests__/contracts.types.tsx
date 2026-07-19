import {
  AppShell,
  Avatar,
  Breadcrumb,
  Calendar,
  CalendarDate,
  Card,
  Carousel,
  Combobox,
  DatePicker,
  DialogContent,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItemIndicator,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  EmptyState,
  Field,
  FileUpload,
  Grid,
  Input,
  Pagination,
  PasswordInput,
  PinInput,
  PopoverContent,
  HoverCardContent,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItemIndicator,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  SelectContent,
  SelectItem,
  SheetContent,
  Slider,
  Stepper,
  TableHeader,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  Toast,
  useAppShellMobile,
  useToast,
  MonosetProvider,
  MultiCombobox,
  NumberInput,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  ThemeProvider,
  calendarDateFromNativeDate,
  calendarDateToNativeDate,
  type AppShellProps,
  type CalendarProps,
  type CardProps,
  type ComboboxOption,
  type ComboboxProps,
  type MultiComboboxOption,
  type MultiComboboxProps,
  type NumberInputProps,
  type CommandPaletteProps,
  type DatePickerProps,
  type FieldControlProps,
  type FieldControlRenderProps,
  type FieldProps,
  type FileUploadProps,
  type PasswordInputProps,
  type PinInputProps,
  type SliderProps,
  type ToggleGroupItemProps,
  type ToggleGroupProps,
  type ToggleProps,
  type ToastApi,
  type ToastProps,
} from "../index";
import {
  createRef,
  Fragment,
  type ReactElement,
  type SVGAttributes,
} from "react";
import { Reveal, type RevealProps } from "../motion-entry";

// @ts-expect-error React v1 removes form state management from the root API.
import { Form as _Form } from "../index";
// @ts-expect-error React v1 removes form state management from the root API.
import { useMonosetForm as _useMonosetForm } from "../index";
// @ts-expect-error React v1 removes the legacy FormProps type.
import type { FormProps as _FormProps } from "../index";
// @ts-expect-error React v1 removes the legacy FieldState type.
import type { FieldState as _FieldState } from "../index";
// @ts-expect-error React v1 removes the legacy UseFormOptions type.
import type { UseFormOptions as _UseFormOptions } from "../index";
// @ts-expect-error React v1 removes the legacy UseFormReturn type.
import type { UseFormReturn as _UseFormReturn } from "../index";
// @ts-expect-error React v1 removes the legacy ValidationRule type.
import type { ValidationRule as _ValidationRule } from "../index";
// @ts-expect-error React v1 moves Reveal out of the root API.
import { Reveal as _RootReveal } from "../index";
// @ts-expect-error React v1 removes StaggerList from the root API.
import { StaggerList as _StaggerList } from "../index";
// @ts-expect-error React v1 removes the legacy StaggerListProps root type.
import type { StaggerListProps as _StaggerListProps } from "../index";
// @ts-expect-error React v1 does not include StaggerList in the motion subpath.
import { StaggerList as _MotionStaggerList } from "../motion-entry";
// @ts-expect-error React v1 does not include StaggerListProps in the motion subpath.
import type { StaggerListProps as _MotionStaggerListProps } from "../motion-entry";
// @ts-expect-error Portal targeting is an internal overlay hook, not root API.
import { useMonosetPortalContainer as _RootPortalHook } from "../index";

const avatar = <Avatar name="Ada Turing" />;
const decorativeAvatar = <Avatar decorative />;
// @ts-expect-error Accessible avatars require a name.
const unnamedAvatar = <Avatar />;
const card = <Card asChild><article>Release notes</article></Card>;
const cardDivRef = createRef<HTMLDivElement>();
const cardElementRef = createRef<HTMLElement>();
const defaultCard = <Card ref={cardDivRef}>Default card</Card>;
const articleCard = (
  <Card asChild ref={cardElementRef}>
    <article>Article card</article>
  </Card>
);
// @ts-expect-error React v1 replaces the legacy Card `as` prop with `asChild`.
const legacyCard = <Card as="article" />;
// @ts-expect-error Card asChild requires an element that can receive its props.
const textCard = <Card asChild>Text only</Card>;
// @ts-expect-error Card asChild accepts exactly one React element.
const multipleChildCard = <Card asChild><span>One</span><span>Two</span></Card>;
function ContractCardChild() {
  return <article>Custom child</article>;
}
const fragmentElement: ReactElement<{}, typeof Fragment> = <></>;
const customElement: ReactElement<{}, typeof ContractCardChild> = <ContractCardChild />;
const svgElement: ReactElement<SVGAttributes<SVGSVGElement>, "svg"> = <svg />;
// @ts-expect-error Card asChild does not accept Fragments.
const fragmentCardProps: CardProps = { asChild: true, children: fragmentElement };
// @ts-expect-error Card asChild does not accept custom React components.
const customCardProps: CardProps = { asChild: true, children: customElement };
// @ts-expect-error Card asChild does not accept SVG elements.
const svgCardProps: CardProps = { asChild: true, children: svgElement };
// @ts-expect-error EmptyState owns its content slots and does not render children.
const emptyStateWithChildren = <EmptyState title="Empty">Ignored</EmptyState>;
const field = (
  <Field label="Email" description="Help" error="Invalid">
    <Input />
  </Field>
);
const textareaField = <Field label="Notes"><Textarea /></Field>;
const fieldControlProps: FieldControlProps = {
  children: (controlProps: FieldControlRenderProps) => (
    <button type="button" {...controlProps}>Choose</button>
  ),
};
const customField = <Field label="Role"><Field.Control {...fieldControlProps} /></Field>;
const passwordInputProps: PasswordInputProps = {
  wrapperClassName: "password-shell",
  className: "password-control",
  autoComplete: "new-password",
};
const passwordInput = <PasswordInput {...passwordInputProps} />;
const sliderProps: SliderProps = {
  defaultValue: [25, 75],
  thumbLabels: ["Start", undefined],
  thumbLabelledBy: [undefined, "end-label"],
};
const slider = <Slider {...sliderProps} />;
const calendarProps: CalendarProps = {
  value: new CalendarDate(2026, 6, 10),
  focusedValue: calendarDateFromNativeDate(new Date(2026, 5, 10)),
  onValueChange: (date) => calendarDateToNativeDate(date),
  firstDayOfWeek: "mon",
  weeksInMonth: 6,
};
const calendar = <Calendar {...calendarProps} />;
// @ts-expect-error Calendar does not promise filtered generic DOM props.
const calendarWithNativeGlobals = <Calendar role="application" tabIndex={0} />;
// @ts-expect-error React v1 Calendar uses CalendarDate rather than native Date.
const calendarWithNativeDate = <Calendar value={new Date()} />;
// @ts-expect-error React v1 removes controlled visible-month props.
const calendarWithMonth = <Calendar month={new CalendarDate(2026, 6, 1)} />;
// @ts-expect-error React v1 replaces weekStartsOn with firstDayOfWeek.
const calendarWithWeekStartsOn = <Calendar weekStartsOn={1} />;
const datePickerProps: DatePickerProps = {
  value: new CalendarDate(2026, 6, 10),
  defaultValue: new CalendarDate(2026, 6, 1),
  min: new CalendarDate(2026, 1, 1),
  max: new CalendarDate(2026, 12, 31),
  onValueChange: (date) => date?.toString(),
};
const datePicker = <DatePicker {...datePickerProps} />;
// @ts-expect-error DatePicker does not promise filtered generic DOM handlers or globals.
const datePickerWithNativeGlobals = <DatePicker onClick={() => {}} lang="de" />;
// @ts-expect-error React v1 DatePicker uses CalendarDate rather than native Date.
const datePickerWithNativeDate = <DatePicker value={new Date()} />;
// @ts-expect-error React v1 DatePicker removes the string placeholder API.
const datePickerWithPlaceholder = <DatePicker placeholder="Pick a date" />;
// @ts-expect-error React v1 DatePicker uses locale-aware segments rather than a formatter.
const datePickerWithFormat = <DatePicker format={(date: Date) => date.toISOString()} />;
// @ts-expect-error React v1 DatePicker is date-only and does not expose time granularity.
const datePickerWithTimeGranularity = <DatePicker granularity="hour" />;
// @ts-expect-error React v1 DatePicker keeps calendar paging internal.
const datePickerWithPageBehavior = <DatePicker pageBehavior="single" />;
// @ts-expect-error React v1 DatePicker does not expose React Aria validation callbacks.
const datePickerWithValidate = <DatePicker validate={() => "Invalid"} />;
const comboboxOptions: ComboboxOption[] = [
  { value: "fi", label: "Finland", description: "Nordic", keywords: ["suomi"] },
];
const comboboxProps: ComboboxProps = {
  options: comboboxOptions,
  value: null,
  defaultValue: "fi",
  onValueChange: (value) => value?.toUpperCase(),
  inputValue: "Fin",
  onInputValueChange: (value) => value.toUpperCase(),
  open: true,
  onOpenChange: (open) => !open,
  name: "country",
  form: "profile",
  autoComplete: "country-name",
  "data-owner": "profile",
};
const comboboxRef = createRef<HTMLDivElement>();
const combobox = <Combobox ref={comboboxRef} {...comboboxProps} />;
// @ts-expect-error React v1 Combobox uses a single editable input, not a second search field.
const comboboxWithSearchPlaceholder = <Combobox options={comboboxOptions} searchPlaceholder="Search" />;
// @ts-expect-error React v1 Combobox values are string keys or null.
const comboboxWithNumericValue = <Combobox options={comboboxOptions} value={1} />;
// @ts-expect-error React v1 Combobox exposes filtered global attributes, not arbitrary handlers.
const comboboxWithNativeHandler = <Combobox options={comboboxOptions} onClick={() => {}} />;
const multiComboboxOptions: MultiComboboxOption[] = [
  { value: "fi", label: "Nordic", textValue: "Finland", keywords: ["suomi"] },
];
const multiComboboxProps: MultiComboboxProps = {
  options: multiComboboxOptions,
  value: ["fi"],
  defaultValue: ["fi"],
  onValueChange: (value) => value.map((item) => item.toUpperCase()),
  inputValue: "Fin",
  defaultInputValue: "",
  onInputValueChange: (value) => value.toUpperCase(),
  open: true,
  defaultOpen: false,
  onOpenChange: (open) => !open,
  name: "countries",
  form: "profile",
  autoComplete: "country-name",
  "data-owner": "profile",
};
const multiComboboxRef = createRef<HTMLDivElement>();
const multiCombobox = <MultiCombobox ref={multiComboboxRef} {...multiComboboxProps} />;
// @ts-expect-error React v1 MultiCombobox uses its one editable input for search.
const multiComboboxWithSearchPlaceholder = <MultiCombobox options={multiComboboxOptions} searchPlaceholder="Search" />;
// @ts-expect-error React v1 MultiCombobox values are string arrays.
const multiComboboxWithScalarValue = <MultiCombobox options={multiComboboxOptions} value="fi" />;
// @ts-expect-error React v1 MultiCombobox exposes filtered global attributes, not arbitrary handlers.
const multiComboboxWithNativeHandler = <MultiCombobox options={multiComboboxOptions} onClick={() => {}} />;
const numberInputProps: NumberInputProps = {
  value: null,
  defaultValue: 1.5,
  onValueChange: (value) => value?.toFixed(1),
  locale: "de-DE",
  formatOptions: { maximumFractionDigits: 2 },
  "data-owner": "invoice",
};
type NumberInputChangeValue = Parameters<NonNullable<NumberInputProps["onValueChange"]>>[0];
const numberInputChangeValue: NumberInputChangeValue = null;
const numberInputRef = createRef<HTMLInputElement>();
const numberInput = <NumberInput ref={numberInputRef} {...numberInputProps} />;
const numberInputDivRef = createRef<HTMLDivElement>();
// @ts-expect-error NumberInput forwards its ref to the editable HTML input.
const numberInputWithDivRef = <NumberInput ref={numberInputDivRef} />;
// @ts-expect-error React v1 NumberInput values are numbers or null, not strings.
const numberInputWithStringValue = <NumberInput value="1" />;
// @ts-expect-error React v1 NumberInput exposes explicit metadata, not broad native handlers.
const numberInputWithNativeHandler = <NumberInput onClick={() => {}} />;
const pinInputProps: PinInputProps = {
  length: 6,
  value: "123",
  onValueChange: (value) => value.toUpperCase(),
  pattern: /^[A-Z0-9]$/,
  name: "verification-code",
  form: "verification",
  required: true,
  "data-owner": "verification",
};
const pinInputRef = createRef<HTMLDivElement>();
const pinInput = <PinInput ref={pinInputRef} {...pinInputProps} />;
// @ts-expect-error PinInput patterns are regular expressions.
const pinInputWithStringPattern = <PinInput pattern="[0-9]" />;
// @ts-expect-error React v1 PinInput exposes explicit metadata, not broad native handlers.
const pinInputWithNativeHandler = <PinInput onClick={() => {}} />;
const fileUploadProps: FileUploadProps = {
  files: [new File(["notes"], "notes.txt", { type: "text/plain" })],
  defaultFiles: [],
  onFilesChange: (files) => files.map((file) => file.name),
  onFilesRejected: (files) => files.map((file) => file.type),
  accept: "image/*,.pdf",
  multiple: true,
  name: "attachments",
  form: "message",
  required: true,
  "data-owner": "message",
};
const fileUploadRef = createRef<HTMLDivElement>();
const fileUpload = <FileUpload ref={fileUploadRef} {...fileUploadProps} />;
// @ts-expect-error React v1 FileUpload values are File arrays.
const fileUploadWithStringFiles = <FileUpload files={["notes.txt"]} />;
// @ts-expect-error React v1 FileUpload exposes explicit metadata, not broad native handlers.
const fileUploadWithNativeHandler = <FileUpload onClick={() => {}} />;
const dialogContentRef = createRef<HTMLDivElement>();
const dialogContent = (
  <DialogContent ref={dialogContentRef} title="Account settings">
    Dialog body
  </DialogContent>
);
// @ts-expect-error React v1 dialogs require an accessible title.
const unnamedDialogContent = <DialogContent>Dialog body</DialogContent>;
const sheetContentRef = createRef<HTMLDivElement>();
const sheetContent = (
  <SheetContent ref={sheetContentRef} title="Filters" side="right" size={420}>
    Sheet body
  </SheetContent>
);
// @ts-expect-error React v1 sheets require an accessible title.
const unnamedSheetContent = <SheetContent>Sheet body</SheetContent>;
const popoverContentRef = createRef<HTMLDivElement>();
const popoverContent = <PopoverContent ref={popoverContentRef}>Filters</PopoverContent>;
const hoverCardContentRef = createRef<HTMLDivElement>();
const hoverCardContent = <HoverCardContent ref={hoverCardContentRef}>Profile</HoverCardContent>;
const selectContentRef = createRef<HTMLDivElement>();
const selectContent = <SelectContent ref={selectContentRef}><SelectItem value="admin">Admin</SelectItem></SelectContent>;
const dropdownContentRef = createRef<HTMLDivElement>();
const dropdownItemRef = createRef<HTMLDivElement>();
const dropdownContent = (
  <DropdownMenuContent ref={dropdownContentRef}>
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuItem ref={dropdownItemRef}>Profile</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked>
      <DropdownMenuItemIndicator>✓</DropdownMenuItemIndicator>
      Grid
    </DropdownMenuCheckboxItem>
    <DropdownMenuRadioGroup value="comfortable">
      <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>Email</DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
);
const contextContentRef = createRef<HTMLDivElement>();
const contextItemRef = createRef<HTMLDivElement>();
const contextContent = (
  <ContextMenuContent ref={contextContentRef}>
    <ContextMenuLabel>Actions</ContextMenuLabel>
    <ContextMenuItem ref={contextItemRef}>Edit</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked>
      <ContextMenuItemIndicator>✓</ContextMenuItemIndicator>
      Grid
    </ContextMenuCheckboxItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
      <ContextMenuSubContent>Email</ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
);
const navigationViewportRef = createRef<HTMLDivElement>();
const navigationIndicatorRef = createRef<HTMLDivElement>();
const _navigationMenu = (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>Product links</NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuIndicator ref={navigationIndicatorRef} />
    </NavigationMenuList>
    <NavigationMenuViewport ref={navigationViewportRef} />
  </NavigationMenu>
);
const _commandPaletteProps: CommandPaletteProps = {
  open: false,
  onOpenChange: () => {},
};
// @ts-expect-error CommandPalette has an explicit controlled-open contract.
const _uncontrolledCommandPaletteProps: CommandPaletteProps = {};
const appShellRef = createRef<HTMLDivElement>();
const appShellSidebarRef = createRef<HTMLDivElement>();
const appShellMainRef = createRef<HTMLDivElement>();
const appShellHeaderRef = createRef<HTMLElement>();
const appShellContentRef = createRef<HTMLElement>();
const _appShellProps: AppShellProps = {
  children: null,
  mobileOpen: true,
  onMobileOpenChange: () => {},
  navigationSignal: "/settings",
  id: "account-shell",
};
const _appShell = (
  <AppShell ref={appShellRef} {..._appShellProps}>
    <AppShell.Sidebar ref={appShellSidebarRef} aria-label="Account navigation">
      <AppShell.SidebarItem>Dashboard</AppShell.SidebarItem>
    </AppShell.Sidebar>
    <AppShell.Main ref={appShellMainRef}>
      <AppShell.Header ref={appShellHeaderRef}>Account</AppShell.Header>
      <AppShell.Content ref={appShellContentRef}>Settings</AppShell.Content>
    </AppShell.Main>
  </AppShell>
);
const _appShellHook = useAppShellMobile;
const breadcrumbRef = createRef<HTMLElement>();
const _breadcrumb = (
  <Breadcrumb
    ref={breadcrumbRef}
    items={[{ label: "Home", href: "/" }, { label: "Settings" }]}
    data-owner="account"
  />
);
const paginationRef = createRef<HTMLElement>();
const _pagination = (
  <Pagination
    ref={paginationRef}
    page={2}
    pageCount={5}
    onPageChange={() => {}}
    data-owner="results"
  />
);
const stepperRef = createRef<HTMLOListElement>();
const _stepper = (
  <Stepper
    ref={stepperRef}
    current={1}
    steps={[{ label: "Account" }, { label: "Profile" }]}
    data-owner="setup"
  />
);
const carouselRef = createRef<HTMLDivElement>();
const _carousel = (
  <Carousel ref={carouselRef} defaultIndex={0} data-owner="featured">
    <article>Only slide</article>
  </Carousel>
);
const tableHeaderRef = createRef<HTMLTableCellElement>();
const _tableHeader = (
  <TableHeader
    ref={tableHeaderRef}
    sortable
    sortDirection="asc"
    onSort={() => {}}
    data-column="name"
  >
    Name
  </TableHeader>
);
const _guardedGrid = <Grid columns={Number.NaN} minWidth="clamp(12rem, 30vw, 24rem)" />;
const tooltip = (
  <Tooltip content="Save changes" side="bottom" sideOffset={8} align="center">
    <button type="button">Save</button>
  </Tooltip>
);
const toastRef = createRef<HTMLLIElement>();
const toastProps: ToastProps = {
  title: "Archived",
  action: "Undo",
  actionAltText: "Undo archiving the item",
};
const _toast = <Toast ref={toastRef} {...toastProps}>The item moved to the archive.</Toast>;
const _toastHook: () => ToastApi = useToast;
const _queueToast = (api: ToastApi) =>
  api.toast({ title: "Saved", description: "Your changes are live." });
// @ts-expect-error Toast actions require useful announcement text.
const _inaccessibleToastAction = <Toast action="Undo" />;
// @ts-expect-error Tooltip asChild requires one React element.
const tooltipWithTextChild = <Tooltip content="Help">Help</Tooltip>;
const toggleProps: ToggleProps = { "aria-label": "Bold" };
const toggle = <Toggle {...toggleProps}>B</Toggle>;
const toggleGroupProps: ToggleGroupProps = {
  type: "single",
  defaultValue: "left",
};
const toggleGroupItemProps: ToggleGroupItemProps = { value: "left" };
const toggleGroup = (
  <ToggleGroup {...toggleGroupProps}>
    <ToggleGroupItem {...toggleGroupItemProps}>Left</ToggleGroupItem>
  </ToggleGroup>
);
const provider = (
  <MonosetProvider
    theme={{ initialTheme: "dark", target: "scope", storage: null }}
    tooltip={{ delayDuration: 100 }}
    toast={{ duration: 2000 }}
    motion={{ reducedMotion: "user" }}
    portal={{ container: null }}
  >
    App
  </MonosetProvider>
);
// @ts-expect-error React v1 replaces reducedMotion with the motion option.
const legacyReducedMotionProvider = <MonosetProvider reducedMotion="always">App</MonosetProvider>;
// @ts-expect-error React v1 replaces tooltipDelay with the tooltip option.
const legacyTooltipProvider = <MonosetProvider tooltipDelay={0}>App</MonosetProvider>;
// @ts-expect-error React v1 replaces defaultTheme with the theme option.
const legacyThemeProvider = <MonosetProvider defaultTheme="dark">App</MonosetProvider>;
// @ts-expect-error React v1 renames ThemeProvider defaultTheme to initialTheme.
const legacyThemeProviderDefault = <ThemeProvider defaultTheme="dark">App</ThemeProvider>;
const nativeFieldProps: FieldProps = {
  label: "Email",
  rootId: "email-field",
  id: "email",
  "data-state": "ready",
  children: <Input />,
};
// @ts-expect-error React v1 removes Field render props.
const legacyRenderField = <Field label="Email">{({ id }) => <Input id={id} />}</Field>;
// @ts-expect-error React v1 renames help to description.
const legacyHelpField = <Field label="Email" help="Help"><Input /></Field>;
// @ts-expect-error React v1 removes the undocumented horizontal layout prop.
const legacyHorizontalField = <Field label="Email" horizontal><Input /></Field>;
const revealProps: RevealProps = { children: field };
const reveal = <Reveal {...revealProps} />;

export type ReactV1TypeContract =
  | typeof _appShell
  | typeof articleCard
  | typeof avatar
  | typeof card
  | typeof calendar
  | typeof _carousel
  | typeof defaultCard
  | typeof datePicker
  | typeof dialogContent
  | typeof dropdownContent
  | typeof fileUpload
  | typeof field
  | typeof _guardedGrid
  | typeof multiCombobox
  | typeof numberInput
  | typeof _navigationMenu
  | typeof _breadcrumb
  | typeof _pagination
  | typeof pinInput
  | typeof popoverContent
  | typeof hoverCardContent
  | typeof contextContent
  | typeof selectContent
  | typeof sheetContent
  | typeof _toast
  | typeof customField
  | typeof passwordInput
  | typeof provider
  | typeof slider
  | typeof _stepper
  | typeof _tableHeader
  | typeof toggle
  | typeof toggleGroup
  | typeof tooltip
  | typeof textareaField
  | typeof reveal;
export {
  articleCard,
  avatar,
  card,
  calendar,
  combobox,
  comboboxWithNativeHandler,
  comboboxWithNumericValue,
  comboboxWithSearchPlaceholder,
  calendarProps,
  calendarWithMonth,
  calendarWithNativeGlobals,
  calendarWithNativeDate,
  calendarWithWeekStartsOn,
  customCardProps,
  decorativeAvatar,
  datePicker,
  datePickerProps,
  datePickerWithFormat,
  datePickerWithNativeGlobals,
  datePickerWithNativeDate,
  datePickerWithPlaceholder,
  datePickerWithPageBehavior,
  datePickerWithTimeGranularity,
  datePickerWithValidate,
  defaultCard,
  dialogContent,
  dropdownContent,
  emptyStateWithChildren,
  fileUpload,
  fileUploadWithNativeHandler,
  fileUploadWithStringFiles,
  hoverCardContent,
  customField,
  field,
  fragmentCardProps,
  legacyCard,
  legacyHelpField,
  legacyHorizontalField,
  legacyRenderField,
  multipleChildCard,
  multiCombobox,
  multiComboboxWithNativeHandler,
  multiComboboxWithScalarValue,
  multiComboboxWithSearchPlaceholder,
  numberInput,
  numberInputChangeValue,
  numberInputWithDivRef,
  numberInputWithNativeHandler,
  numberInputWithStringValue,
  pinInput,
  pinInputWithNativeHandler,
  pinInputWithStringPattern,
  popoverContent,
  contextContent,
  selectContent,
  sheetContent,
  reveal,
  textareaField,
  textCard,
  nativeFieldProps,
  passwordInput,
  provider,
  legacyReducedMotionProvider,
  legacyThemeProvider,
  legacyThemeProviderDefault,
  legacyTooltipProvider,
  passwordInputProps,
  slider,
  sliderProps,
  toggle,
  toggleGroup,
  toggleGroupItemProps,
  toggleGroupProps,
  toggleProps,
  tooltip,
  tooltipWithTextChild,
  unnamedAvatar,
  unnamedDialogContent,
  unnamedSheetContent,
  svgCardProps,
};
