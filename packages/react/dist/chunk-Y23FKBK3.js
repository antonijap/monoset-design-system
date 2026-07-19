import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Combobox.tsx
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef
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
  Popover
} from "react-aria-components";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function defaultComboboxFilter(query, option) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return true;
  return [option.textValue, option.label, option.description, ...option.keywords ?? []].filter((term) => Boolean(term)).some((term) => term.toLocaleLowerCase().includes(normalizedQuery));
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
var Combobox = forwardRef(function Combobox2({
  options,
  value,
  defaultValue,
  onValueChange,
  inputValue,
  defaultInputValue,
  onInputValueChange,
  placeholder = "Select\u2026",
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
}, ref) {
  const portalContainer = useMonosetPortalContainer();
  const syncingOpenRef = useRef(false);
  const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
  const isRequired = required || ariaRequired === true || ariaRequired === "true";
  const optionsByTextValue = /* @__PURE__ */ new Map();
  const normalizedTextValues = /* @__PURE__ */ new Set();
  const values = /* @__PURE__ */ new Set();
  for (const option of options) {
    if (values.has(option.value)) {
      throw new Error(
        `Combobox options must have a unique value. Duplicate value: "${option.value}".`
      );
    }
    values.add(option.value);
    const textValue = option.textValue ?? option.label;
    const normalizedTextValue = textValue.toLocaleLowerCase();
    if (normalizedTextValues.has(normalizedTextValue)) {
      throw new Error(
        `Combobox options must have a unique textValue. Duplicate effective text value: "${textValue}".`
      );
    }
    normalizedTextValues.add(normalizedTextValue);
    optionsByTextValue.set(textValue, option);
  }
  const setRootRef = useCallback((element) => {
    if (element) {
      if (id) element.id = id;
      else element.removeAttribute("id");
      if (title) element.title = title;
      else element.removeAttribute("title");
    }
    if (typeof ref === "function") ref(element);
    else if (ref) ref.current = element;
  }, [id, ref, title]);
  const setInputRef = useCallback((element) => {
    if (element) element.setAttribute("autocomplete", autoComplete ?? "off");
  }, [autoComplete]);
  return /* @__PURE__ */ jsxs(
    AriaComboBox,
    {
      ...dataProps,
      ref: setRootRef,
      defaultItems: options,
      value,
      defaultValue,
      onChange: (nextValue) => onValueChange?.(nextValue == null ? null : String(nextValue)),
      inputValue,
      defaultInputValue,
      onInputChange: onInputValueChange,
      onOpenChange: (nextOpen) => {
        if (!syncingOpenRef.current) onOpenChange?.(nextOpen);
      },
      isDisabled: disabled,
      isReadOnly: readOnly,
      isRequired,
      isInvalid,
      name: disabled ? void 0 : name,
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
      className: cx("ms-combobox", className),
      children: [
        /* @__PURE__ */ jsx(OpenStateSync, { open, defaultOpen, syncingRef: syncingOpenRef }),
        /* @__PURE__ */ jsxs(Group, { className: "ms-combobox__group", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              ref: setInputRef,
              className: cx("ms-combobox__input", inputClassName),
              placeholder,
              autoComplete
            }
          ),
          /* @__PURE__ */ jsx(Button, { className: "ms-combobox__button", children: /* @__PURE__ */ jsx(ChevronDown, { size: 14, strokeWidth: 2, "aria-hidden": true }) })
        ] }),
        /* @__PURE__ */ jsx(
          Popover,
          {
            UNSTABLE_portalContainer: portalContainer ?? void 0,
            placement: "bottom start",
            offset: 6,
            className: cx("ms-combobox__panel", popoverClassName),
            children: /* @__PURE__ */ jsx(
              ListBox,
              {
                className: "ms-combobox__list",
                renderEmptyState: () => /* @__PURE__ */ jsx("div", { className: "ms-combobox__empty", children: emptyMessage }),
                children: (option) => /* @__PURE__ */ jsx(
                  ListBoxItem,
                  {
                    id: option.value,
                    textValue: option.textValue ?? option.label,
                    isDisabled: option.disabled,
                    className: ({ isFocused, isSelected }) => cx(
                      "ms-combobox__option",
                      isFocused && "ms-combobox__option--active",
                      isSelected && "ms-combobox__option--selected"
                    ),
                    children: ({ isSelected }) => /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsxs("span", { className: "ms-combobox__option-text", children: [
                        /* @__PURE__ */ jsx("span", { className: "ms-combobox__option-label", children: option.label }),
                        option.description && /* @__PURE__ */ jsx("span", { className: "ms-combobox__option-desc", children: option.description })
                      ] }),
                      isSelected && /* @__PURE__ */ jsx(Check, { className: "ms-combobox__check", size: 14, strokeWidth: 2, "aria-hidden": true })
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
});

export {
  Combobox
};
//# sourceMappingURL=chunk-Y23FKBK3.js.map