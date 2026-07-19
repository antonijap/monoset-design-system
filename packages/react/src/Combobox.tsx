import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type AriaAttributes,
  type MutableRefObject,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Button,
  ComboBox as AriaComboBox,
  ComboBoxStateContext,
  Group,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";
import { useMonosetPortalContainer } from "./PortalContext";
import { cx } from "./cx";

export interface ComboboxOption {
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

export interface ComboboxProps {
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

function defaultComboboxFilter(query: string, option: ComboboxOption): boolean {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return true;

  return [option.textValue, option.label, option.description, ...(option.keywords ?? [])]
    .filter((term): term is string => Boolean(term))
    .some((term) => term.toLocaleLowerCase().includes(normalizedQuery));
}

const useIsomorphicLayoutEffect = typeof document === "undefined" ? useEffect : useLayoutEffect;

function OpenStateSync({
  open,
  defaultOpen,
  syncingRef,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  syncingRef: MutableRefObject<boolean>;
}) {
  const state = useContext(ComboBoxStateContext);
  const appliedDefault = useRef(false);

  // RAC 1.19 exposes open-change events but no controlled open props, so the
  // wrapper keeps its compact public open contract synchronized with RAC state.
  useIsomorphicLayoutEffect(() => {
    if (!state) return;

    const requestedOpen = open ?? (!appliedDefault.current && defaultOpen ? true : undefined);
    appliedDefault.current = true;
    if (requestedOpen === undefined || state.isOpen === requestedOpen) return;

    syncingRef.current = true;
    state.setOpen(requestedOpen);
    syncingRef.current = false;
  }, [defaultOpen, open, state, state?.isOpen, syncingRef]);

  return null;
}

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(function Combobox(
  {
    options,
    value,
    defaultValue,
    onValueChange,
    inputValue,
    defaultInputValue,
    onInputValueChange,
    placeholder = "Select…",
    emptyMessage = "No results.",
    filter = defaultComboboxFilter,
    open,
    defaultOpen,
    onOpenChange,
    disabled,
    readOnly,
    required,
    invalid,
    name,
    form,
    autoComplete,
    id,
    title,
    className,
    inputClassName,
    popoverClassName,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-errormessage": ariaErrorMessage,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
    ...dataProps
  },
  ref,
) {
  const portalContainer = useMonosetPortalContainer();
  const syncingOpenRef = useRef(false);
  const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
  const isRequired = required || ariaRequired === true || ariaRequired === "true";
  const optionsByTextValue = new Map<string, ComboboxOption>();
  const normalizedTextValues = new Set<string>();
  const values = new Set<string>();

  for (const option of options) {
    if (values.has(option.value)) {
      throw new Error(
        `Combobox options must have a unique value. Duplicate value: "${option.value}".`,
      );
    }
    values.add(option.value);
    const textValue = option.textValue ?? option.label;
    const normalizedTextValue = textValue.toLocaleLowerCase();
    if (normalizedTextValues.has(normalizedTextValue)) {
      throw new Error(
        `Combobox options must have a unique textValue. Duplicate effective text value: "${textValue}".`,
      );
    }
    normalizedTextValues.add(normalizedTextValue);
    optionsByTextValue.set(textValue, option);
  }

  const setRootRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      if (id) element.id = id;
      else element.removeAttribute("id");
      if (title) element.title = title;
      else element.removeAttribute("title");
    }

    if (typeof ref === "function") ref(element);
    else if (ref) ref.current = element;
  }, [id, ref, title]);
  const setInputRef = useCallback((element: HTMLInputElement | null) => {
    // React Aria deliberately defaults comboboxes to `off`; an explicit public
    // value is restored here after its context props are applied.
    if (element) element.setAttribute("autocomplete", autoComplete ?? "off");
  }, [autoComplete]);

  return (
    <AriaComboBox<ComboboxOption>
      {...dataProps}
      ref={setRootRef}
      defaultItems={options}
      value={value}
      defaultValue={defaultValue}
      onChange={(nextValue) => onValueChange?.(nextValue == null ? null : String(nextValue))}
      inputValue={inputValue}
      defaultInputValue={defaultInputValue}
      onInputChange={onInputValueChange}
      onOpenChange={(nextOpen) => {
        if (!syncingOpenRef.current) onOpenChange?.(nextOpen);
      }}
      isDisabled={disabled}
      isReadOnly={readOnly}
      isRequired={isRequired}
      isInvalid={isInvalid}
      name={disabled ? undefined : name}
      form={form}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-errormessage={ariaErrorMessage}
      allowsCustomValue={false}
      allowsEmptyCollection
      formValue="key"
      menuTrigger="input"
      defaultFilter={(textValue, query) => {
        const option = optionsByTextValue.get(textValue);
        return option ? filter(query, option) : false;
      }}
      className={cx("ms-combobox", className)}
    >
      <OpenStateSync open={open} defaultOpen={defaultOpen} syncingRef={syncingOpenRef} />
      <Group className="ms-combobox__group">
        <Input
          ref={setInputRef}
          className={cx("ms-combobox__input", inputClassName)}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <Button className="ms-combobox__button">
          <ChevronDown size={14} strokeWidth={2} aria-hidden />
        </Button>
      </Group>
      <Popover
        UNSTABLE_portalContainer={portalContainer ?? undefined}
        placement="bottom start"
        offset={6}
        className={cx("ms-combobox__panel", popoverClassName)}
      >
        <ListBox<ComboboxOption>
          className="ms-combobox__list"
          renderEmptyState={() => <div className="ms-combobox__empty">{emptyMessage}</div>}
        >
          {(option) => (
            <ListBoxItem
              id={option.value}
              textValue={option.textValue ?? option.label}
              isDisabled={option.disabled}
              className={({ isFocused, isSelected }) =>
                cx(
                  "ms-combobox__option",
                  isFocused && "ms-combobox__option--active",
                  isSelected && "ms-combobox__option--selected",
                )
              }
            >
              {({ isSelected }) => (
                <>
                  <span className="ms-combobox__option-text">
                    <span className="ms-combobox__option-label">{option.label}</span>
                    {option.description && (
                      <span className="ms-combobox__option-desc">{option.description}</span>
                    )}
                  </span>
                  {isSelected && (
                    <Check className="ms-combobox__check" size={14} strokeWidth={2} aria-hidden />
                  )}
                </>
              )}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </AriaComboBox>
  );
});
