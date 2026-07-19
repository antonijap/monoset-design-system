import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type AriaAttributes,
  type ClipboardEvent,
  type KeyboardEvent,
  type MutableRefObject,
} from "react";
import { Check, ChevronDown, X } from "lucide-react";
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

export interface MultiComboboxOption {
  value: string;
  label: string;
  /** Text announced by the combobox and used to disambiguate duplicate labels. */
  textValue?: string;
  description?: string;
  disabled?: boolean;
  /** Extra terms used by search but not displayed. */
  keywords?: string[];
}

export interface MultiComboboxProps {
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

function optionTextValue(option: MultiComboboxOption): string {
  return option.textValue ?? option.label;
}

function defaultMultiComboboxFilter(
  query: string,
  option: MultiComboboxOption,
): boolean {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return true;

  return [optionTextValue(option), option.label, option.description, ...(option.keywords ?? [])]
    .filter((term): term is string => Boolean(term))
    .some((term) => term.toLocaleLowerCase().includes(normalizedQuery));
}

function normalizedValues(values: string[] | undefined, options: MultiComboboxOption[]) {
  if (values === undefined) return undefined;

  const available = new Set(options.map((option) => option.value));
  return values.filter((value, index) => available.has(value) && values.indexOf(value) === index);
}

function createOptionsByTextValue(options: MultiComboboxOption[]) {
  const normalizedTextValues = new Set<string>();
  const values = new Set<string>();
  const optionsByTextValue = new Map<string, MultiComboboxOption>();

  for (const option of options) {
    if (values.has(option.value)) {
      throw new Error(
        `MultiCombobox options must have a unique value. Duplicate value: "${option.value}".`,
      );
    }
    values.add(option.value);
    const textValue = optionTextValue(option);
    const normalizedTextValue = textValue.toLocaleLowerCase();
    if (normalizedTextValues.has(normalizedTextValue)) {
      throw new Error(
        `MultiCombobox options must have a unique textValue. Duplicate effective text value: "${textValue}".`,
      );
    }
    normalizedTextValues.add(normalizedTextValue);
    optionsByTextValue.set(textValue, option);
  }

  return optionsByTextValue;
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

function selectedStringValues(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

function SelectionFormInputs({
  name,
  form,
  disabled,
}: {
  name?: string;
  form?: string;
  disabled?: boolean;
}) {
  const state = useContext(ComboBoxStateContext);
  if (!state || !name || disabled) return null;

  return selectedStringValues(state.value).map((value) => (
    <input key={value} type="hidden" name={name} form={form} value={value} />
  ));
}

function SelectedTags({
  options,
  disabled,
  readOnly,
}: {
  options: MultiComboboxOption[];
  disabled?: boolean;
  readOnly?: boolean;
}) {
  const state = useContext(ComboBoxStateContext);
  const selectedValues = selectedStringValues(state?.value);
  const optionsByValue = new Map(options.map((option) => [option.value, option]));
  const selected = selectedValues
    .map((value) => optionsByValue.get(value))
    .filter((option): option is MultiComboboxOption => Boolean(option));
  if (selected.length === 0) return null;

  return (
    <div className="ms-multicombobox__tags">
      {selected.map((option) => {
        const removable = !disabled && !readOnly && !option.disabled;
        return (
          <span key={option.value} className="ms-multicombobox__tag">
            <span className="ms-multicombobox__tag-label">{option.label}</span>
            {removable && (
              <button
                type="button"
                aria-label={`Remove ${optionTextValue(option)}`}
                disabled={state?.isOpen}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  state?.setValue(selectedValues.filter((value) => value !== option.value));
                }}
                className="ms-multicombobox__tag-remove"
              >
                <X size={12} strokeWidth={2} aria-hidden />
              </button>
            )}
          </span>
        );
      })}
    </div>
  );
}

function MultiComboboxInput({
  options,
  placeholder,
  autoComplete,
  className,
  disabled,
  readOnly,
}: {
  options: MultiComboboxOption[];
  placeholder: string;
  autoComplete?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
}) {
  const state = useContext(ComboBoxStateContext);
  const setInputRef = useCallback((element: HTMLInputElement | null) => {
    // React Aria deliberately defaults comboboxes to `off`; an explicit public
    // value is restored here after its context props are applied.
    if (element) element.setAttribute("autocomplete", autoComplete ?? "off");
  }, [autoComplete]);

  const removeLastTag = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key !== "Backspace" ||
      disabled ||
      readOnly ||
      !state ||
      state.inputValue !== ""
    ) return;

    const optionsByValue = new Map(options.map((option) => [option.value, option]));
    const selected = selectedStringValues(state.value);
    let removableIndex = -1;
    for (let index = selected.length - 1; index >= 0; index -= 1) {
      const value = selected[index];
      const option = optionsByValue.get(value);
      if (option != null && !option.disabled) {
        removableIndex = index;
        break;
      }
    }
    if (removableIndex < 0) return;

    event.preventDefault();
    state.setValue(selected.filter((_, index) => index !== removableIndex));
  };

  const pasteOptions = (event: ClipboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly || !state) return;

    const pastedText = event.clipboardData.getData("text");
    const tokens = pastedText
      .split(/[,\r\n]+/)
      .map((token) => token.trim())
      .filter(Boolean);
    if (tokens.length === 0) return;

    event.preventDefault();
    const selected = selectedStringValues(state.value);
    const next = [...selected];
    const unmatched: string[] = [];

    for (const token of tokens) {
      const normalizedToken = token.toLocaleLowerCase();
      const valueMatch = options.find(
        (option) => !option.disabled && option.value.toLocaleLowerCase() === normalizedToken,
      );
      const textValueMatch = options.find(
        (option) => !option.disabled && optionTextValue(option).toLocaleLowerCase() === normalizedToken,
      );
      const labelMatches = options.filter(
        (option) => !option.disabled && option.label.toLocaleLowerCase() === normalizedToken,
      );
      const match = valueMatch ?? textValueMatch ?? (labelMatches.length === 1 ? labelMatches[0] : undefined);

      if (!match) {
        unmatched.push(token);
      } else if (!next.includes(match.value)) {
        next.push(match.value);
      }
    }

    if (next.length !== selected.length) state.setValue(next);
    state.setInputValue(unmatched.join(", "));
  };

  return (
    <Input
      ref={setInputRef}
      className={cx("ms-combobox__input", "ms-multicombobox__input", className)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onKeyDown={removeLastTag}
      onPaste={pasteOptions}
    />
  );
}

export const MultiCombobox = forwardRef<HTMLDivElement, MultiComboboxProps>(
  function MultiCombobox(
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
      filter = defaultMultiComboboxFilter,
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
    const optionsByTextValue = createOptionsByTextValue(options);
    const [uncontrolledValue, setUncontrolledValue] = useState(
      () => normalizedValues(defaultValue, options) ?? [],
    );
    const [uncontrolledInputValue, setUncontrolledInputValue] = useState(defaultInputValue ?? "");
    const initialValueRef = useRef(uncontrolledValue);
    const initialInputValueRef = useRef(uncontrolledInputValue);
    const controlledValue = useMemo(
      () => normalizedValues(value ?? uncontrolledValue, options) ?? [],
      [options, uncontrolledValue, value],
    );
    const currentInputValue = inputValue ?? uncontrolledInputValue;
    const rootRef = useRef<HTMLDivElement | null>(null);

    const setRootRef = useCallback((element: HTMLDivElement | null) => {
      rootRef.current = element;
      if (element) {
        if (id) element.id = id;
        else element.removeAttribute("id");
        if (title) element.title = title;
        else element.removeAttribute("title");
      }

      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    }, [id, ref, title]);

    useEffect(() => {
      const owner = form
        ? document.getElementById(form)
        : rootRef.current?.closest("form");
      if (!(owner instanceof HTMLFormElement)) return;

      const reset = () => {
        if (value === undefined) setUncontrolledValue(initialValueRef.current);
        if (inputValue === undefined) setUncontrolledInputValue(initialInputValueRef.current);
      };
      owner.addEventListener("reset", reset);
      return () => owner.removeEventListener("reset", reset);
    }, [form, inputValue, value]);

    const changeValue = (nextValue: string[]) => {
      const next = normalizedValues(nextValue, options) ?? [];
      if (
        next.length === controlledValue.length &&
        next.every((nextValue, index) => nextValue === controlledValue[index])
      ) return;
      if (value === undefined) setUncontrolledValue(next);
      onValueChange?.(next);
    };

    const changeInputValue = (nextInputValue: string) => {
      if (inputValue === undefined) setUncontrolledInputValue(nextInputValue);
      onInputValueChange?.(nextInputValue);
    };

    return (
      <AriaComboBox<MultiComboboxOption, "multiple">
        {...dataProps}
        ref={setRootRef}
        defaultItems={options}
        selectionMode="multiple"
        value={controlledValue}
        onChange={(nextValue) => {
          const next = nextValue.map(String);
          const addedOption = next.some((nextValue) => !controlledValue.includes(nextValue));
          changeValue(next);
          if (addedOption) changeInputValue("");
        }}
        inputValue={currentInputValue}
        onInputChange={changeInputValue}
        onOpenChange={(nextOpen) => {
          if (!syncingOpenRef.current) onOpenChange?.(nextOpen);
        }}
        isDisabled={disabled}
        isReadOnly={readOnly}
        isRequired={isRequired}
        isInvalid={isInvalid}
        name={undefined}
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
        className={cx("ms-combobox", "ms-multicombobox", className)}
      >
        <SelectionFormInputs name={name} form={form} disabled={disabled} />
        <OpenStateSync
          open={open}
          defaultOpen={defaultOpen}
          syncingRef={syncingOpenRef}
        />
        <Group className={cx("ms-combobox__group", "ms-multicombobox__group")}>
          <SelectedTags
            options={options}
            disabled={disabled}
            readOnly={readOnly}
          />
          <MultiComboboxInput
            options={options}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={inputClassName}
            disabled={disabled}
            readOnly={readOnly}
          />
          <Button className={cx("ms-combobox__button", "ms-multicombobox__button")}>
            <ChevronDown size={14} strokeWidth={2} aria-hidden />
          </Button>
        </Group>
        <Popover
          UNSTABLE_portalContainer={portalContainer ?? undefined}
          placement="bottom start"
          offset={6}
          className={cx("ms-combobox__panel", "ms-multicombobox__panel", popoverClassName)}
        >
          <ListBox<MultiComboboxOption>
            className="ms-combobox__list"
            selectionBehavior="toggle"
            renderEmptyState={() => <div className="ms-combobox__empty">{emptyMessage}</div>}
          >
            {(option) => (
              <ListBoxItem
                id={option.value}
                textValue={optionTextValue(option)}
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
                    <span
                      className={cx(
                        "ms-multicombobox__check",
                        isSelected && "ms-multicombobox__check--on",
                      )}
                    >
                      {isSelected && <Check size={14} strokeWidth={2} aria-hidden />}
                    </span>
                    <span className="ms-combobox__option-text">
                      <span className="ms-combobox__option-label">{option.label}</span>
                      {option.description && (
                        <span className="ms-combobox__option-desc">{option.description}</span>
                      )}
                    </span>
                  </>
                )}
              </ListBoxItem>
            )}
          </ListBox>
        </Popover>
      </AriaComboBox>
    );
  },
);
