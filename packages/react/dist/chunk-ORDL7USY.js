import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/MultiCombobox.tsx
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
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
  Popover
} from "react-aria-components";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function optionTextValue(option) {
  return option.textValue ?? option.label;
}
function defaultMultiComboboxFilter(query, option) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return true;
  return [optionTextValue(option), option.label, option.description, ...option.keywords ?? []].filter((term) => Boolean(term)).some((term) => term.toLocaleLowerCase().includes(normalizedQuery));
}
function normalizedValues(values, options) {
  if (values === void 0) return void 0;
  const available = new Set(options.map((option) => option.value));
  return values.filter((value, index) => available.has(value) && values.indexOf(value) === index);
}
function createOptionsByTextValue(options) {
  const normalizedTextValues = /* @__PURE__ */ new Set();
  const values = /* @__PURE__ */ new Set();
  const optionsByTextValue = /* @__PURE__ */ new Map();
  for (const option of options) {
    if (values.has(option.value)) {
      throw new Error(
        `MultiCombobox options must have a unique value. Duplicate value: "${option.value}".`
      );
    }
    values.add(option.value);
    const textValue = optionTextValue(option);
    const normalizedTextValue = textValue.toLocaleLowerCase();
    if (normalizedTextValues.has(normalizedTextValue)) {
      throw new Error(
        `MultiCombobox options must have a unique textValue. Duplicate effective text value: "${textValue}".`
      );
    }
    normalizedTextValues.add(normalizedTextValue);
    optionsByTextValue.set(textValue, option);
  }
  return optionsByTextValue;
}
var useIsomorphicLayoutEffect = typeof document === "undefined" ? useEffect : useLayoutEffect;
function OpenStateSync({
  open,
  defaultOpen,
  syncingRef
}) {
  const state = useContext(ComboBoxStateContext);
  const appliedDefault = useRef(false);
  useIsomorphicLayoutEffect(() => {
    if (!state) return;
    const requestedOpen = open ?? (!appliedDefault.current && defaultOpen ? true : void 0);
    appliedDefault.current = true;
    if (requestedOpen === void 0 || state.isOpen === requestedOpen) return;
    syncingRef.current = true;
    state.setOpen(requestedOpen);
    syncingRef.current = false;
  }, [defaultOpen, open, state, state?.isOpen, syncingRef]);
  return null;
}
function selectedStringValues(value) {
  return Array.isArray(value) ? value.map(String) : [];
}
function SelectionFormInputs({
  name,
  form,
  disabled
}) {
  const state = useContext(ComboBoxStateContext);
  if (!state || !name || disabled) return null;
  return selectedStringValues(state.value).map((value) => /* @__PURE__ */ jsx("input", { type: "hidden", name, form, value }, value));
}
function SelectedTags({
  options,
  disabled,
  readOnly
}) {
  const state = useContext(ComboBoxStateContext);
  const selectedValues = selectedStringValues(state?.value);
  const optionsByValue = new Map(options.map((option) => [option.value, option]));
  const selected = selectedValues.map((value) => optionsByValue.get(value)).filter((option) => Boolean(option));
  if (selected.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: "ms-multicombobox__tags", children: selected.map((option) => {
    const removable = !disabled && !readOnly && !option.disabled;
    return /* @__PURE__ */ jsxs("span", { className: "ms-multicombobox__tag", children: [
      /* @__PURE__ */ jsx("span", { className: "ms-multicombobox__tag-label", children: option.label }),
      removable && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": `Remove ${optionTextValue(option)}`,
          disabled: state?.isOpen,
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => {
            state?.setValue(selectedValues.filter((value) => value !== option.value));
          },
          className: "ms-multicombobox__tag-remove",
          children: /* @__PURE__ */ jsx(X, { size: 12, strokeWidth: 2, "aria-hidden": true })
        }
      )
    ] }, option.value);
  }) });
}
function MultiComboboxInput({
  options,
  placeholder,
  autoComplete,
  className,
  disabled,
  readOnly
}) {
  const state = useContext(ComboBoxStateContext);
  const setInputRef = useCallback((element) => {
    if (element) element.setAttribute("autocomplete", autoComplete ?? "off");
  }, [autoComplete]);
  const removeLastTag = (event) => {
    if (event.key !== "Backspace" || disabled || readOnly || !state || state.inputValue !== "") return;
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
  const pasteOptions = (event) => {
    if (disabled || readOnly || !state) return;
    const pastedText = event.clipboardData.getData("text");
    const tokens = pastedText.split(/[,\r\n]+/).map((token) => token.trim()).filter(Boolean);
    if (tokens.length === 0) return;
    event.preventDefault();
    const selected = selectedStringValues(state.value);
    const next = [...selected];
    const unmatched = [];
    for (const token of tokens) {
      const normalizedToken = token.toLocaleLowerCase();
      const valueMatch = options.find(
        (option) => !option.disabled && option.value.toLocaleLowerCase() === normalizedToken
      );
      const textValueMatch = options.find(
        (option) => !option.disabled && optionTextValue(option).toLocaleLowerCase() === normalizedToken
      );
      const labelMatches = options.filter(
        (option) => !option.disabled && option.label.toLocaleLowerCase() === normalizedToken
      );
      const match = valueMatch ?? textValueMatch ?? (labelMatches.length === 1 ? labelMatches[0] : void 0);
      if (!match) {
        unmatched.push(token);
      } else if (!next.includes(match.value)) {
        next.push(match.value);
      }
    }
    if (next.length !== selected.length) state.setValue(next);
    state.setInputValue(unmatched.join(", "));
  };
  return /* @__PURE__ */ jsx(
    Input,
    {
      ref: setInputRef,
      className: cx("ms-combobox__input", "ms-multicombobox__input", className),
      placeholder,
      autoComplete,
      onKeyDown: removeLastTag,
      onPaste: pasteOptions
    }
  );
}
var MultiCombobox = forwardRef(
  function MultiCombobox2({
    options,
    value,
    defaultValue,
    onValueChange,
    inputValue,
    defaultInputValue,
    onInputValueChange,
    placeholder = "Select\u2026",
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
  }, ref) {
    const portalContainer = useMonosetPortalContainer();
    const syncingOpenRef = useRef(false);
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
    const isRequired = required || ariaRequired === true || ariaRequired === "true";
    const optionsByTextValue = createOptionsByTextValue(options);
    const [uncontrolledValue, setUncontrolledValue] = useState(
      () => normalizedValues(defaultValue, options) ?? []
    );
    const [uncontrolledInputValue, setUncontrolledInputValue] = useState(defaultInputValue ?? "");
    const initialValueRef = useRef(uncontrolledValue);
    const initialInputValueRef = useRef(uncontrolledInputValue);
    const controlledValue = useMemo(
      () => normalizedValues(value ?? uncontrolledValue, options) ?? [],
      [options, uncontrolledValue, value]
    );
    const currentInputValue = inputValue ?? uncontrolledInputValue;
    const rootRef = useRef(null);
    const setRootRef = useCallback((element) => {
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
      const owner = form ? document.getElementById(form) : rootRef.current?.closest("form");
      if (!(owner instanceof HTMLFormElement)) return;
      const reset = () => {
        if (value === void 0) setUncontrolledValue(initialValueRef.current);
        if (inputValue === void 0) setUncontrolledInputValue(initialInputValueRef.current);
      };
      owner.addEventListener("reset", reset);
      return () => owner.removeEventListener("reset", reset);
    }, [form, inputValue, value]);
    const changeValue = (nextValue) => {
      const next = normalizedValues(nextValue, options) ?? [];
      if (next.length === controlledValue.length && next.every((nextValue2, index) => nextValue2 === controlledValue[index])) return;
      if (value === void 0) setUncontrolledValue(next);
      onValueChange?.(next);
    };
    const changeInputValue = (nextInputValue) => {
      if (inputValue === void 0) setUncontrolledInputValue(nextInputValue);
      onInputValueChange?.(nextInputValue);
    };
    return /* @__PURE__ */ jsxs(
      AriaComboBox,
      {
        ...dataProps,
        ref: setRootRef,
        defaultItems: options,
        selectionMode: "multiple",
        value: controlledValue,
        onChange: (nextValue) => {
          const next = nextValue.map(String);
          const addedOption = next.some((nextValue2) => !controlledValue.includes(nextValue2));
          changeValue(next);
          if (addedOption) changeInputValue("");
        },
        inputValue: currentInputValue,
        onInputChange: changeInputValue,
        onOpenChange: (nextOpen) => {
          if (!syncingOpenRef.current) onOpenChange?.(nextOpen);
        },
        isDisabled: disabled,
        isReadOnly: readOnly,
        isRequired,
        isInvalid,
        name: void 0,
        form,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        "aria-errormessage": ariaErrorMessage,
        allowsCustomValue: false,
        allowsEmptyCollection: true,
        formValue: "key",
        menuTrigger: "input",
        defaultFilter: (textValue, query) => {
          const option = optionsByTextValue.get(textValue);
          return option ? filter(query, option) : false;
        },
        className: cx("ms-combobox", "ms-multicombobox", className),
        children: [
          /* @__PURE__ */ jsx(SelectionFormInputs, { name, form, disabled }),
          /* @__PURE__ */ jsx(
            OpenStateSync,
            {
              open,
              defaultOpen,
              syncingRef: syncingOpenRef
            }
          ),
          /* @__PURE__ */ jsxs(Group, { className: cx("ms-combobox__group", "ms-multicombobox__group"), children: [
            /* @__PURE__ */ jsx(
              SelectedTags,
              {
                options,
                disabled,
                readOnly
              }
            ),
            /* @__PURE__ */ jsx(
              MultiComboboxInput,
              {
                options,
                placeholder,
                autoComplete,
                className: inputClassName,
                disabled,
                readOnly
              }
            ),
            /* @__PURE__ */ jsx(Button, { className: cx("ms-combobox__button", "ms-multicombobox__button"), children: /* @__PURE__ */ jsx(ChevronDown, { size: 14, strokeWidth: 2, "aria-hidden": true }) })
          ] }),
          /* @__PURE__ */ jsx(
            Popover,
            {
              UNSTABLE_portalContainer: portalContainer ?? void 0,
              placement: "bottom start",
              offset: 6,
              className: cx("ms-combobox__panel", "ms-multicombobox__panel", popoverClassName),
              children: /* @__PURE__ */ jsx(
                ListBox,
                {
                  className: "ms-combobox__list",
                  selectionBehavior: "toggle",
                  renderEmptyState: () => /* @__PURE__ */ jsx("div", { className: "ms-combobox__empty", children: emptyMessage }),
                  children: (option) => /* @__PURE__ */ jsx(
                    ListBoxItem,
                    {
                      id: option.value,
                      textValue: optionTextValue(option),
                      isDisabled: option.disabled,
                      className: ({ isFocused, isSelected }) => cx(
                        "ms-combobox__option",
                        isFocused && "ms-combobox__option--active",
                        isSelected && "ms-combobox__option--selected"
                      ),
                      children: ({ isSelected }) => /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: cx(
                              "ms-multicombobox__check",
                              isSelected && "ms-multicombobox__check--on"
                            ),
                            children: isSelected && /* @__PURE__ */ jsx(Check, { size: 14, strokeWidth: 2, "aria-hidden": true })
                          }
                        ),
                        /* @__PURE__ */ jsxs("span", { className: "ms-combobox__option-text", children: [
                          /* @__PURE__ */ jsx("span", { className: "ms-combobox__option-label", children: option.label }),
                          option.description && /* @__PURE__ */ jsx("span", { className: "ms-combobox__option-desc", children: option.description })
                        ] })
                      ] })
                    }
                  )
                }
              )
            }
          )
        ]
      }
    );
  }
);

export {
  MultiCombobox
};
//# sourceMappingURL=chunk-ORDL7USY.js.map