// src/Button.tsx
import { forwardRef } from "react";

// src/cx.ts
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

// src/Button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Button = forwardRef(function Button2({
  variant = "secondary",
  size = "md",
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      type,
      disabled: disabled || loading,
      "aria-busy": loading || void 0,
      className: cx("ms-btn", `ms-btn--${variant}`, `ms-btn--${size}`, className),
      ...rest,
      children: [
        loading ? /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": true, children: [
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "9", opacity: "0.25" }),
          /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 0 1-9 9", children: /* @__PURE__ */ jsx("animateTransform", { attributeName: "transform", type: "rotate", from: "0 12 12", to: "360 12 12", dur: "0.9s", repeatCount: "indefinite" }) })
        ] }) : leadingIcon,
        children,
        !loading && trailingIcon
      ]
    }
  );
});

// src/Badge.tsx
import { forwardRef as forwardRef2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var Badge = forwardRef2(function Badge2({ variant = "neutral", className, ...rest }, ref) {
  return /* @__PURE__ */ jsx2("span", { ref, className: cx("ms-badge", `ms-badge--${variant}`, className), ...rest });
});

// src/Avatar.tsx
import * as RAvatar from "@radix-ui/react-avatar";
import { forwardRef as forwardRef3 } from "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var Avatar = forwardRef3(function Avatar2({ size = "md", initials, src, alt = "", className, ...rest }, ref) {
  return /* @__PURE__ */ jsxs2(RAvatar.Root, { ref, className: cx("ms-avatar", `ms-avatar--${size}`, className), ...rest, children: [
    src && /* @__PURE__ */ jsx3(RAvatar.Image, { src, alt, className: "ms-avatar__img" }),
    /* @__PURE__ */ jsx3(RAvatar.Fallback, { delayMs: 200, children: initials?.slice(0, 2).toUpperCase() })
  ] });
});

// src/Card.tsx
import { forwardRef as forwardRef4 } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var Card = forwardRef4(function Card2({ variant = "outline", as: Tag = "div", className, ...rest }, ref) {
  const classes = cx(
    "ms-card",
    variant === "elevated" && "ms-card--elevated",
    variant === "inset" && "ms-card--inset",
    className
  );
  return /* @__PURE__ */ jsx4(Tag, { ref, className: classes, ...rest });
});

// src/Alert.tsx
import { forwardRef as forwardRef5 } from "react";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var Alert = forwardRef5(function Alert2({ title, icon = "i", urgent, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      ref,
      role: urgent ? "alert" : "status",
      "aria-live": urgent ? "assertive" : "polite",
      className: cx("ms-alert", className),
      ...rest,
      children: [
        /* @__PURE__ */ jsx5("span", { className: "ms-alert__icon", "aria-hidden": true, children: icon }),
        /* @__PURE__ */ jsxs3("div", { children: [
          title && /* @__PURE__ */ jsx5("div", { className: "ms-alert__title", children: title }),
          children && /* @__PURE__ */ jsx5("div", { className: "ms-alert__msg", children })
        ] })
      ]
    }
  );
});

// src/Input.tsx
import { forwardRef as forwardRef6, useId } from "react";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var Input = forwardRef6(function Input2({ invalid, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx6(
    "input",
    {
      ref,
      "aria-invalid": invalid || void 0,
      className: cx("ms-input", className),
      ...rest
    }
  );
});
var Textarea = forwardRef6(function Textarea2({ invalid, className, rows = 4, ...rest }, ref) {
  return /* @__PURE__ */ jsx6(
    "textarea",
    {
      ref,
      rows,
      "aria-invalid": invalid || void 0,
      className: cx("ms-input", className),
      ...rest
    }
  );
});
function Field({ label, help, error, children, id: idProp, className }) {
  const reactId = useId();
  const id = idProp ?? `ms-field-${reactId}`;
  const helpId = help ? `${id}-help` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || void 0;
  const invalid = Boolean(error);
  return /* @__PURE__ */ jsxs4("div", { className: cx("ms-field", className), children: [
    /* @__PURE__ */ jsx6("label", { className: "ms-field__label", htmlFor: id, children: label }),
    children({ id, describedBy, invalid }),
    help && !error && /* @__PURE__ */ jsx6("span", { id: helpId, className: "ms-field__help", children: help }),
    error && /* @__PURE__ */ jsx6("span", { id: errorId, role: "alert", className: "ms-field__error", children: error })
  ] });
}

// src/Form.tsx
import {
  useState,
  useCallback,
  useRef
} from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
function useMonosetForm(options) {
  const { initialValues, validate, onSubmit } = options;
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const touched = useRef(/* @__PURE__ */ new Set());
  const dirty = useRef(/* @__PURE__ */ new Set());
  const validateField = useCallback(
    (name, value) => {
      const rule = validate?.[name];
      return rule ? rule(value) : void 0;
    },
    [validate]
  );
  const field = useCallback(
    (name) => ({
      name,
      value: values[name] ?? "",
      onChange(e) {
        const next = e.target.value;
        dirty.current.add(name);
        setValues((prev) => ({ ...prev, [name]: next }));
        if (touched.current.has(name)) {
          setErrors((prev) => ({ ...prev, [name]: validateField(name, next) }));
        }
      },
      onBlur() {
        touched.current.add(name);
        setErrors((prev) => ({ ...prev, [name]: validateField(name, values[name] ?? "") }));
      }
    }),
    [values, validateField]
  );
  const fieldState = useCallback(
    (name) => ({
      value: values[name] ?? "",
      error: errors[name],
      touched: touched.current.has(name),
      dirty: dirty.current.has(name)
    }),
    [values, errors]
  );
  const error = useCallback(
    (name) => touched.current.has(name) ? errors[name] : void 0,
    [errors]
  );
  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      const nextErrors = {};
      let hasError = false;
      for (const name of Object.keys(values)) {
        touched.current.add(name);
        const msg = validateField(name, values[name] ?? "");
        nextErrors[name] = msg;
        if (msg) hasError = true;
      }
      setErrors(nextErrors);
      if (hasError) return;
      setIsSubmitting(true);
      const result = onSubmit(values);
      if (result && typeof result.then === "function") {
        result.finally(() => setIsSubmitting(false));
      } else {
        setIsSubmitting(false);
      }
    },
    [values, validateField, onSubmit]
  );
  const reset = useCallback(() => {
    setValues({ ...initialValues });
    setErrors({});
    touched.current.clear();
    dirty.current.clear();
  }, [initialValues]);
  const setValue = useCallback((name, value) => {
    dirty.current.add(name);
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);
  const setErrorManual = useCallback((name, msg) => {
    setErrors((prev) => ({ ...prev, [name]: msg }));
  }, []);
  return {
    field,
    fieldState,
    error,
    handleSubmit,
    reset,
    isDirty: dirty.current.size > 0,
    isSubmitting,
    setValue,
    setError: setErrorManual
  };
}
function Form({ children, onSubmit, className, ...rest }) {
  return /* @__PURE__ */ jsx7(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        onSubmit(e);
      },
      className: cx("ms-form", className),
      noValidate: true,
      ...rest,
      children
    }
  );
}

// src/Checkbox.tsx
import * as RCheckbox from "@radix-ui/react-checkbox";
import { forwardRef as forwardRef7 } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DUR, EASE_EMPHASIS, EASE_EXIT } from "@monoset/motion";
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var Checkbox = forwardRef7(function Checkbox2({ label, className, checked, defaultChecked, ...rest }, ref) {
  const isChecked = checked ?? defaultChecked ?? false;
  return /* @__PURE__ */ jsxs5("label", { className: cx("ms-check", className), "data-state": isChecked ? "checked" : "unchecked", children: [
    /* @__PURE__ */ jsx8(
      RCheckbox.Root,
      {
        ref,
        checked,
        defaultChecked,
        className: "ms-check__box",
        ...rest,
        children: /* @__PURE__ */ jsx8(RCheckbox.Indicator, { asChild: true, children: /* @__PURE__ */ jsx8(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsx8(
          motion.span,
          {
            initial: { opacity: 0, scale: 0.6 },
            animate: { opacity: 1, scale: 1, transition: { duration: DUR.fast, ease: EASE_EMPHASIS } },
            exit: { opacity: 0, scale: 0.6, transition: { duration: DUR.fast, ease: EASE_EXIT } },
            style: { display: "inline-flex" },
            children: /* @__PURE__ */ jsx8("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx8("path", { d: "M5 12l5 5L20 7" }) })
          },
          "check"
        ) }) })
      }
    ),
    label && /* @__PURE__ */ jsx8("span", { children: label })
  ] });
});

// src/Switch.tsx
import * as RSwitch from "@radix-ui/react-switch";
import { forwardRef as forwardRef8 } from "react";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var Switch = forwardRef8(function Switch2({ label, className, checked, defaultChecked, ...rest }, ref) {
  const isChecked = checked ?? defaultChecked ?? false;
  return /* @__PURE__ */ jsxs6("label", { className: cx("ms-switch", className), "data-state": isChecked ? "checked" : "unchecked", children: [
    /* @__PURE__ */ jsx9(
      RSwitch.Root,
      {
        ref,
        checked,
        defaultChecked,
        className: "ms-switch__track",
        ...rest,
        children: /* @__PURE__ */ jsx9(RSwitch.Thumb, { className: "ms-switch__thumb" })
      }
    ),
    label && /* @__PURE__ */ jsx9("span", { children: label })
  ] });
});

// src/RadioGroup.tsx
import * as RRadio from "@radix-ui/react-radio-group";
import { forwardRef as forwardRef9 } from "react";
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
var RadioGroup = forwardRef9(function RadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx10(RRadio.Root, { ref, className: cx("ms-radio-group", className), ...rest });
});
var Radio = forwardRef9(function Radio2({ label, className, value, ...rest }, ref) {
  return /* @__PURE__ */ jsxs7("label", { className: cx("ms-radio", className), children: [
    /* @__PURE__ */ jsx10(RRadio.Item, { ref, value, className: "ms-radio__dot", ...rest, children: /* @__PURE__ */ jsx10(RRadio.Indicator, {}) }),
    label && /* @__PURE__ */ jsx10("span", { children: label })
  ] });
});

// src/Tabs.tsx
import * as RTabs from "@radix-ui/react-tabs";
import { forwardRef as forwardRef10 } from "react";
import { motion as motion2 } from "framer-motion";
import { DUR as DUR2, EASE_EMPHASIS as EASE_EMPHASIS2 } from "@monoset/motion";
import { jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
var Tabs = RTabs.Root;
var TabsList = forwardRef10(function TabsList2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx11(RTabs.List, { ref, className: cx("ms-tabs__list", className), ...rest });
});
var TabsTrigger = forwardRef10(function TabsTrigger2({ className, children, isActive, layoutId = "ms-tabs-indicator", ...rest }, ref) {
  return /* @__PURE__ */ jsxs8(
    RTabs.Trigger,
    {
      ref,
      className: cx("ms-tabs__trigger", className),
      "data-state": isActive ? "active" : "inactive",
      ...rest,
      children: [
        children,
        isActive && /* @__PURE__ */ jsx11(
          motion2.span,
          {
            layoutId,
            className: "ms-tabs__indicator",
            transition: { duration: DUR2.base, ease: EASE_EMPHASIS2 }
          }
        )
      ]
    }
  );
});
var TabsContent = RTabs.Content;

// src/Table.tsx
import {
  forwardRef as forwardRef11,
  useEffect,
  useRef as useRef2
} from "react";
import { jsx as jsx12, jsxs as jsxs9 } from "react/jsx-runtime";
var Table = forwardRef11(
  function Table2({ className, children, maxHeight, wrapperClassName, ...rest }, ref) {
    const style = maxHeight !== void 0 ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight } : void 0;
    return /* @__PURE__ */ jsx12(
      "div",
      {
        className: cx(
          "ms-table-wrapper",
          maxHeight !== void 0 && "ms-table-wrapper--scroll",
          wrapperClassName
        ),
        style,
        children: /* @__PURE__ */ jsx12("table", { ref, className: cx("ms-table", className), ...rest, children })
      }
    );
  }
);
function SortIcon({ direction }) {
  if (direction === "asc") {
    return /* @__PURE__ */ jsx12("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx12("path", { d: "M5 2L8.5 7H1.5L5 2Z", fill: "currentColor" }) });
  }
  if (direction === "desc") {
    return /* @__PURE__ */ jsx12("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx12("path", { d: "M5 8L1.5 3H8.5L5 8Z", fill: "currentColor" }) });
  }
  return /* @__PURE__ */ jsxs9("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx12("path", { d: "M5 1L7.5 4.5H2.5L5 1Z", fill: "currentColor", opacity: "0.4" }),
    /* @__PURE__ */ jsx12("path", { d: "M5 9L2.5 5.5H7.5L5 9Z", fill: "currentColor", opacity: "0.4" })
  ] });
}
var TableHeader = forwardRef11(
  function TableHeader2({ sortable, sortDirection, onSort, className, children, ...rest }, ref) {
    const handleClick = sortable && onSort ? onSort : void 0;
    const ariaSort = sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : void 0;
    return /* @__PURE__ */ jsxs9(
      "th",
      {
        ref,
        className: cx(
          "ms-table-header",
          sortable && "ms-table-header--sortable",
          className
        ),
        onClick: handleClick,
        "aria-sort": ariaSort,
        ...rest,
        children: [
          children,
          sortable && /* @__PURE__ */ jsx12(
            "span",
            {
              className: cx(
                "ms-table-header__sort",
                sortDirection != null && "ms-table-header__sort--active"
              ),
              children: /* @__PURE__ */ jsx12(SortIcon, { direction: sortDirection })
            }
          )
        ]
      }
    );
  }
);
function TableSelectAll({
  checked,
  indeterminate,
  onChange,
  label = "Select all rows"
}) {
  const inputRef = useRef2(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);
  return /* @__PURE__ */ jsx12("th", { className: "ms-table-select", children: /* @__PURE__ */ jsx12(
    "input",
    {
      ref: inputRef,
      type: "checkbox",
      checked,
      onChange: (e) => onChange(e.target.checked),
      "aria-label": label
    }
  ) });
}
function TableSelectRow({
  checked,
  onChange,
  label = "Select row"
}) {
  return /* @__PURE__ */ jsx12("td", { className: "ms-table-select", children: /* @__PURE__ */ jsx12(
    "input",
    {
      type: "checkbox",
      checked,
      onChange: (e) => onChange(e.target.checked),
      "aria-label": label
    }
  ) });
}

// src/Toast.tsx
import * as RToast from "@radix-ui/react-toast";
import { jsx as jsx13, jsxs as jsxs10 } from "react/jsx-runtime";
function ToastProvider({ children }) {
  return /* @__PURE__ */ jsxs10(RToast.Provider, { swipeDirection: "right", duration: 4e3, children: [
    children,
    /* @__PURE__ */ jsx13(RToast.Viewport, { className: "ms-toast-viewport" })
  ] });
}
function Toast({ title, kind = "info", action, children, className, ...rest }) {
  return /* @__PURE__ */ jsxs10(RToast.Root, { className: cx("ms-toast", className), "data-kind": kind, ...rest, children: [
    /* @__PURE__ */ jsx13("span", { "aria-hidden": true, style: {
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: "#fff",
      color: kind === "error" ? "var(--status-danger)" : "var(--mono-1000)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10,
      fontWeight: 700,
      flexShrink: 0
    }, children: kind === "error" ? "!" : "\u2713" }),
    /* @__PURE__ */ jsxs10("div", { style: { flex: 1, minWidth: 0 }, children: [
      title && /* @__PURE__ */ jsx13(RToast.Title, { style: { fontWeight: 600 }, children: title }),
      children && /* @__PURE__ */ jsx13(RToast.Description, { children })
    ] }),
    action && /* @__PURE__ */ jsx13(RToast.Action, { altText: "Action", asChild: true, children: /* @__PURE__ */ jsx13("span", { className: "ms-toast__action", children: action }) })
  ] });
}

// src/Dialog.tsx
import * as RDialog from "@radix-ui/react-dialog";
import { jsx as jsx14, jsxs as jsxs11 } from "react/jsx-runtime";
var Dialog = RDialog.Root;
var DialogTrigger = RDialog.Trigger;
var DialogClose = RDialog.Close;
function DialogContent({ title, description, children, className, ...rest }) {
  return /* @__PURE__ */ jsxs11(RDialog.Portal, { children: [
    /* @__PURE__ */ jsx14(RDialog.Overlay, { className: "ms-dialog-scrim" }),
    /* @__PURE__ */ jsxs11(RDialog.Content, { className: cx("ms-dialog", className), ...rest, children: [
      title && /* @__PURE__ */ jsx14(RDialog.Title, { className: "ms-dialog__title", children: title }),
      description && /* @__PURE__ */ jsx14(RDialog.Description, { className: "ms-dialog__desc", children: description }),
      children
    ] })
  ] });
}

// src/Tooltip.tsx
import * as RTooltip from "@radix-ui/react-tooltip";
import { jsx as jsx15, jsxs as jsxs12 } from "react/jsx-runtime";
function TooltipProvider({ children, delayDuration = 300 }) {
  return /* @__PURE__ */ jsx15(RTooltip.Provider, { delayDuration, children });
}
function Tooltip({ content, side = "top", children }) {
  return /* @__PURE__ */ jsxs12(RTooltip.Root, { children: [
    /* @__PURE__ */ jsx15(RTooltip.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx15(RTooltip.Portal, { children: /* @__PURE__ */ jsx15(RTooltip.Content, { side, sideOffset: 6, className: cx("ms-tooltip"), children: content }) })
  ] });
}

// src/Popover.tsx
import * as RPopover from "@radix-ui/react-popover";
import { jsx as jsx16 } from "react/jsx-runtime";
var Popover = RPopover.Root;
var PopoverTrigger = RPopover.Trigger;
var PopoverClose = RPopover.Close;
function PopoverContent({ className, children, sideOffset = 6, ...rest }) {
  return /* @__PURE__ */ jsx16(RPopover.Portal, { children: /* @__PURE__ */ jsx16(RPopover.Content, { sideOffset, className: cx("ms-popover", className), ...rest, children }) });
}

// src/DropdownMenu.tsx
import * as RDropdown from "@radix-ui/react-dropdown-menu";
import { jsx as jsx17 } from "react/jsx-runtime";
var DropdownMenu = RDropdown.Root;
var DropdownMenuTrigger = RDropdown.Trigger;
function DropdownMenuContent({ children, className, sideOffset = 6, ...rest }) {
  return /* @__PURE__ */ jsx17(RDropdown.Portal, { children: /* @__PURE__ */ jsx17(RDropdown.Content, { sideOffset, className: cx("ms-menu", className), ...rest, children }) });
}
function DropdownMenuItem({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx17(RDropdown.Item, { className: cx("ms-menu__item", className), ...rest, children });
}
function DropdownMenuLabel({ className, children }) {
  return /* @__PURE__ */ jsx17(RDropdown.Label, { className: cx("ms-menu__label", className), children });
}
function DropdownMenuSeparator() {
  return /* @__PURE__ */ jsx17(RDropdown.Separator, { className: "ms-menu__separator" });
}

// src/Select.tsx
import * as RSelect from "@radix-ui/react-select";
import { forwardRef as forwardRef12 } from "react";
import { jsx as jsx18, jsxs as jsxs13 } from "react/jsx-runtime";
var Select = RSelect.Root;
var SelectTrigger = forwardRef12(function SelectTrigger2({ className, placeholder, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs13(RSelect.Trigger, { ref, className: cx("ms-select", className), ...rest, children: [
    children ?? /* @__PURE__ */ jsx18(RSelect.Value, { placeholder }),
    /* @__PURE__ */ jsx18(RSelect.Icon, { "aria-hidden": true, children: /* @__PURE__ */ jsx18("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx18("path", { d: "m6 9 6 6 6-6" }) }) })
  ] });
});
function SelectContent({ children, className, ...rest }) {
  return /* @__PURE__ */ jsx18(RSelect.Portal, { children: /* @__PURE__ */ jsx18(RSelect.Content, { className: cx("ms-menu", className), position: "popper", sideOffset: 6, ...rest, children: /* @__PURE__ */ jsx18(RSelect.Viewport, { children }) }) });
}
var SelectItem = forwardRef12(
  function SelectItem2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsx18(RSelect.Item, { ref, className: cx("ms-menu__item", className), ...rest, children: /* @__PURE__ */ jsx18(RSelect.ItemText, { children }) });
  }
);

// src/Skeleton.tsx
import { forwardRef as forwardRef13 } from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var Skeleton = forwardRef13(function Skeleton2({ width = "100%", height = 12, circle, style, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx19(
    "div",
    {
      ref,
      "aria-hidden": true,
      className: cx("ms-skeleton", className),
      style: {
        width,
        height: circle ? width : height,
        borderRadius: circle ? "50%" : void 0,
        ...style
      },
      ...rest
    }
  );
});

// src/EmptyState.tsx
import { jsx as jsx20, jsxs as jsxs14 } from "react/jsx-runtime";
function EmptyState({ icon, title, body, action, className }) {
  return /* @__PURE__ */ jsxs14("div", { className: cx("ms-empty", className), children: [
    icon && /* @__PURE__ */ jsx20("div", { className: "ms-empty__icon", "aria-hidden": true, children: icon }),
    /* @__PURE__ */ jsx20("div", { className: "ms-empty__title", children: title }),
    body && /* @__PURE__ */ jsx20("div", { className: "ms-empty__body", children: body }),
    action
  ] });
}

// src/Pagination.tsx
import { jsx as jsx21, jsxs as jsxs15 } from "react/jsx-runtime";
function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}
function Pagination({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  prevLabel = "\u2039",
  nextLabel = "\u203A",
  className
}) {
  if (pageCount <= 1) return null;
  const first = 1;
  const last = pageCount;
  const start = Math.max(page - siblings, first + 1);
  const end = Math.min(page + siblings, last - 1);
  const pages = [first];
  if (start > first + 1) pages.push("\u2026");
  pages.push(...range(start, end));
  if (end < last - 1) pages.push("\u2026");
  if (last > first) pages.push(last);
  return /* @__PURE__ */ jsxs15("nav", { "aria-label": "Pagination", className: cx("ms-pagination", className), children: [
    /* @__PURE__ */ jsx21(
      "button",
      {
        type: "button",
        className: "ms-pagination__btn",
        "aria-label": "Previous page",
        disabled: page <= 1,
        onClick: () => onPageChange(page - 1),
        children: prevLabel
      }
    ),
    pages.map(
      (p, i) => p === "\u2026" ? /* @__PURE__ */ jsx21("span", { className: "ms-pagination__btn", "aria-hidden": true, children: "\u2026" }, `e-${i}`) : /* @__PURE__ */ jsx21(
        "button",
        {
          type: "button",
          className: "ms-pagination__btn",
          "aria-current": p === page ? "page" : void 0,
          "aria-label": `Page ${p}`,
          onClick: () => onPageChange(p),
          children: p
        },
        p
      )
    ),
    /* @__PURE__ */ jsx21(
      "button",
      {
        type: "button",
        className: "ms-pagination__btn",
        "aria-label": "Next page",
        disabled: page >= pageCount,
        onClick: () => onPageChange(page + 1),
        children: nextLabel
      }
    )
  ] });
}

// src/Breadcrumb.tsx
import { Fragment } from "react";
import { jsx as jsx22, jsxs as jsxs16 } from "react/jsx-runtime";
function Breadcrumb({ items, separator = "/", className }) {
  return /* @__PURE__ */ jsx22("nav", { "aria-label": "Breadcrumb", className: cx("ms-breadcrumb", className), children: items.map((it, i) => /* @__PURE__ */ jsxs16(Fragment, { children: [
    i > 0 && /* @__PURE__ */ jsx22("span", { className: "ms-breadcrumb__sep", "aria-hidden": true, children: separator }),
    it.href && !it.current ? /* @__PURE__ */ jsx22("a", { href: it.href, className: "ms-breadcrumb__item", children: it.label }) : /* @__PURE__ */ jsx22("span", { className: "ms-breadcrumb__item", "aria-current": it.current ? "page" : void 0, children: it.label })
  ] }, i)) });
}

// src/Progress.tsx
import * as RProgress from "@radix-ui/react-progress";
import { jsx as jsx23 } from "react/jsx-runtime";
function Progress({
  value,
  max = 100,
  indeterminate,
  className,
  "aria-label": ariaLabel = "Progress"
}) {
  const pct = indeterminate ? void 0 : Math.min(100, Math.max(0, (value ?? 0) / max * 100));
  return /* @__PURE__ */ jsx23(RProgress.Root, { value: indeterminate ? null : value ?? 0, max, "aria-label": ariaLabel, className: cx("ms-progress", className), children: /* @__PURE__ */ jsx23(
    RProgress.Indicator,
    {
      className: "ms-progress__indicator",
      style: indeterminate ? { width: "40%", animation: "ms-indeterminate 1.4s infinite" } : { width: `${pct}%` }
    }
  ) });
}

// src/Separator.tsx
import * as RSeparator from "@radix-ui/react-separator";
import { jsx as jsx24 } from "react/jsx-runtime";
function Separator2({ className, ...rest }) {
  return /* @__PURE__ */ jsx24(RSeparator.Root, { className: cx("ms-separator", className), ...rest });
}

// src/Layout.tsx
import { forwardRef as forwardRef14 } from "react";
import { jsx as jsx25 } from "react/jsx-runtime";
var Stack = forwardRef14(function Stack2({ gap = 4, align, style, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx25(
    "div",
    {
      ref,
      className: cx("ms-stack", className),
      style: {
        gap: `var(--space-${gap})`,
        alignItems: align,
        ...style
      },
      ...rest
    }
  );
});
var Inline = forwardRef14(function Inline2({ gap = 4, align, wrap = true, style, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx25(
    "div",
    {
      ref,
      className: cx("ms-inline", wrap && "ms-inline--wrap", className),
      style: {
        gap: `var(--space-${gap})`,
        alignItems: align,
        ...style
      },
      ...rest
    }
  );
});
var Grid = forwardRef14(function Grid2({ columns, minWidth = 240, gap = 4, style, className, ...rest }, ref) {
  const min = typeof minWidth === "number" ? `${minWidth}px` : minWidth;
  const template = columns ? `repeat(${columns}, 1fr)` : `repeat(auto-fit, minmax(${min}, 1fr))`;
  return /* @__PURE__ */ jsx25(
    "div",
    {
      ref,
      className: cx("ms-grid", className),
      style: {
        gridTemplateColumns: template,
        gap: `var(--space-${gap})`,
        ...style
      },
      ...rest
    }
  );
});
var Container = forwardRef14(function Container2({ size = "lg", padding = true, style, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx25(
    "div",
    {
      ref,
      className: cx("ms-container", padding && "ms-container--padded", className),
      style: {
        maxWidth: `var(--container-${size})`,
        ...style
      },
      ...rest
    }
  );
});

// src/Kbd.tsx
import { forwardRef as forwardRef15 } from "react";
import { jsx as jsx26 } from "react/jsx-runtime";
var Kbd = forwardRef15(function Kbd2({ size = "md", className, ...rest }, ref) {
  return /* @__PURE__ */ jsx26("kbd", { ref, className: cx("ms-kbd", `ms-kbd--${size}`, className), ...rest });
});

// src/Spinner.tsx
import { forwardRef as forwardRef16 } from "react";
import { jsx as jsx27 } from "react/jsx-runtime";
var Spinner = forwardRef16(function Spinner2({ size = 16, label = "Loading", className, style, ...rest }, ref) {
  return /* @__PURE__ */ jsx27(
    "span",
    {
      ref,
      role: "status",
      "aria-label": label,
      className: cx("ms-spinner", className),
      style: { width: size, height: size, ...style },
      ...rest
    }
  );
});

// src/Accordion.tsx
import * as RAccordion from "@radix-ui/react-accordion";
import { forwardRef as forwardRef17 } from "react";
import { jsx as jsx28, jsxs as jsxs17 } from "react/jsx-runtime";
var Accordion = RAccordion.Root;
var AccordionItem = forwardRef17(function AccordionItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx28(RAccordion.Item, { ref, className: cx("ms-accordion__item", className), ...rest });
});
var AccordionTrigger = forwardRef17(function AccordionTrigger2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx28(RAccordion.Header, { className: "ms-accordion__header", children: /* @__PURE__ */ jsxs17(RAccordion.Trigger, { ref, className: cx("ms-accordion__trigger", className), ...rest, children: [
    /* @__PURE__ */ jsx28("span", { children }),
    /* @__PURE__ */ jsx28(
      "svg",
      {
        className: "ms-accordion__chevron",
        width: 14,
        height: 14,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
        children: /* @__PURE__ */ jsx28("polyline", { points: "6 9 12 15 18 9" })
      }
    )
  ] }) });
});
var AccordionContent = forwardRef17(function AccordionContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx28(RAccordion.Content, { ref, className: cx("ms-accordion__content", className), ...rest, children: /* @__PURE__ */ jsx28("div", { className: "ms-accordion__content-inner", children }) });
});

// src/Slider.tsx
import * as RSlider from "@radix-ui/react-slider";
import { forwardRef as forwardRef18 } from "react";
import { jsx as jsx29, jsxs as jsxs18 } from "react/jsx-runtime";
var Slider = forwardRef18(function Slider2({ className, defaultValue = [50], value, ...rest }, ref) {
  const thumbs = value ?? defaultValue;
  return /* @__PURE__ */ jsxs18(
    RSlider.Root,
    {
      ref,
      className: cx("ms-slider", className),
      defaultValue,
      value,
      ...rest,
      children: [
        /* @__PURE__ */ jsx29(RSlider.Track, { className: "ms-slider__track", children: /* @__PURE__ */ jsx29(RSlider.Range, { className: "ms-slider__range" }) }),
        thumbs.map((_, i) => /* @__PURE__ */ jsx29(RSlider.Thumb, { className: "ms-slider__thumb", "aria-label": `Value ${i + 1}` }, i))
      ]
    }
  );
});

// src/ToggleGroup.tsx
import * as RToggleGroup from "@radix-ui/react-toggle-group";
import * as RToggle from "@radix-ui/react-toggle";
import { forwardRef as forwardRef19 } from "react";
import { jsx as jsx30 } from "react/jsx-runtime";
var Toggle = forwardRef19(function Toggle2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx30(RToggle.Root, { ref, className: cx("ms-toggle", className), ...rest });
});
var ToggleGroup = forwardRef19(function ToggleGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx30(RToggleGroup.Root, { ref, className: cx("ms-toggle-group", className), ...rest });
});
var ToggleGroupItem = forwardRef19(function ToggleGroupItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx30(RToggleGroup.Item, { ref, className: cx("ms-toggle", className), ...rest });
});

// src/MonosetProvider.tsx
import { MotionConfig } from "framer-motion";

// src/Theme.tsx
import {
  createContext,
  forwardRef as forwardRef20,
  useCallback as useCallback2,
  useContext,
  useEffect as useEffect2,
  useMemo,
  useState as useState2
} from "react";
import { jsx as jsx31, jsxs as jsxs19 } from "react/jsx-runtime";
var ThemeCtx = createContext(null);
function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "monoset-theme"
}) {
  const [theme, setThemeState] = useState2(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
    return defaultTheme;
  });
  const [systemTheme, setSystemTheme] = useState2(getSystemTheme);
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const setTheme = useCallback2(
    (next) => {
      setThemeState(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
      }
    },
    [storageKey]
  );
  useEffect2(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  useEffect2(() => {
    const root = document.documentElement;
    root.setAttribute("data-monoset-theme", resolvedTheme);
    root.classList.toggle("monoset-dark", resolvedTheme === "dark");
  }, [resolvedTheme]);
  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );
  return /* @__PURE__ */ jsx31(ThemeCtx.Provider, { value, children });
}
function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return ctx;
}
var NEXT = {
  light: "dark",
  dark: "system",
  system: "light"
};
var LABEL = {
  light: "Switch to dark mode",
  dark: "Switch to system mode",
  system: "Switch to light mode"
};
function SunIcon() {
  return /* @__PURE__ */ jsxs19("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx31("circle", { cx: "8", cy: "8", r: "3", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx31(
      "path",
      {
        d: "M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }
    )
  ] });
}
function MoonIcon() {
  return /* @__PURE__ */ jsx31("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx31(
    "path",
    {
      d: "M13.5 9.2A5.5 5.5 0 0 1 6.8 2.5 5.5 5.5 0 1 0 13.5 9.2Z",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinejoin: "round"
    }
  ) });
}
function MonitorIcon() {
  return /* @__PURE__ */ jsxs19("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx31("rect", { x: "2", y: "2.5", width: "12", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx31("path", { d: "M5.5 13.5h5M8 10.5v3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
var ICON = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon
};
var ThemeToggle = forwardRef20(
  function ThemeToggle2({ className, ...rest }, ref) {
    const { theme, setTheme } = useTheme();
    const Icon2 = ICON[theme];
    return /* @__PURE__ */ jsx31(
      "button",
      {
        ref,
        type: "button",
        "aria-label": LABEL[theme],
        className: cx("ms-btn", "ms-btn--ghost", "ms-btn--sm", className),
        onClick: () => setTheme(NEXT[theme]),
        ...rest,
        children: /* @__PURE__ */ jsx31(Icon2, {})
      }
    );
  }
);

// src/MonosetProvider.tsx
import { jsx as jsx32 } from "react/jsx-runtime";
function MonosetProvider({
  children,
  reducedMotion = "user",
  tooltipDelay = 300,
  defaultTheme
}) {
  const inner = /* @__PURE__ */ jsx32(MotionConfig, { reducedMotion, children: /* @__PURE__ */ jsx32(TooltipProvider, { delayDuration: tooltipDelay, children: /* @__PURE__ */ jsx32(ToastProvider, { children }) }) });
  if (defaultTheme) {
    return /* @__PURE__ */ jsx32(ThemeProvider, { defaultTheme, children: inner });
  }
  return inner;
}

// src/index.ts
import { EASE_STANDARD, EASE_EMPHASIS as EASE_EMPHASIS3, EASE_EXIT as EASE_EXIT2, DUR as DUR3, fadeUp as fadeUp2, hoverLift, pressDown, popoverIn, modalPanel, modalScrim, listStagger, slideInLeft, slideInRight, slideInTop, slideInBottom, scaleIn } from "@monoset/motion";

// src/Motion.tsx
import {
  forwardRef as forwardRef21,
  useRef as useRef3,
  Children
} from "react";
import { motion as motion3, useInView } from "framer-motion";
import { fadeUp } from "@monoset/motion";
import { jsx as jsx33 } from "react/jsx-runtime";
var Reveal = forwardRef21(
  ({
    children,
    variant = fadeUp,
    once = true,
    margin = "-80px",
    delay = 0,
    className,
    style
  }, forwardedRef) => {
    const localRef = useRef3(null);
    const ref = forwardedRef ?? localRef;
    const inView = useInView(ref, { once, margin });
    const resolvedVariant = delay ? {
      ...variant,
      visible: {
        ...variant.visible,
        transition: {
          ...variant.visible?.transition,
          delay
        }
      }
    } : variant;
    return /* @__PURE__ */ jsx33(
      motion3.div,
      {
        ref,
        initial: "hidden",
        animate: inView ? "visible" : "hidden",
        variants: resolvedVariant,
        className,
        style,
        children
      }
    );
  }
);
Reveal.displayName = "Reveal";
var childVariants = {
  hidden: fadeUp.hidden,
  visible: fadeUp.visible
};
var StaggerList = forwardRef21(
  ({
    children,
    stagger = 0.04,
    once = true,
    margin = "-80px",
    className,
    style
  }, forwardedRef) => {
    const localRef = useRef3(null);
    const ref = forwardedRef ?? localRef;
    const inView = useInView(ref, { once, margin });
    const containerVariants = {
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger }
      }
    };
    return /* @__PURE__ */ jsx33(
      motion3.div,
      {
        ref,
        initial: "hidden",
        animate: inView ? "visible" : "hidden",
        variants: containerVariants,
        className,
        style,
        children: Children.map(children, (child) => /* @__PURE__ */ jsx33(motion3.div, { variants: childVariants, children: child }))
      }
    );
  }
);
StaggerList.displayName = "StaggerList";
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Container,
  DUR3 as DUR,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EASE_EMPHASIS3 as EASE_EMPHASIS,
  EASE_EXIT2 as EASE_EXIT,
  EASE_STANDARD,
  EmptyState,
  Field,
  Form,
  Grid,
  Inline,
  Input,
  Kbd,
  MonosetProvider,
  Pagination,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Radio,
  RadioGroup,
  Reveal,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Separator2 as Separator,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  StaggerList,
  Switch,
  Table,
  TableHeader,
  TableSelectAll,
  TableSelectRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ThemeProvider,
  ThemeToggle,
  Toast,
  ToastProvider,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipProvider,
  cx,
  fadeUp2 as fadeUp,
  hoverLift,
  listStagger,
  modalPanel,
  modalScrim,
  popoverIn,
  pressDown,
  scaleIn,
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideInTop,
  useMonosetForm,
  useTheme
};
//# sourceMappingURL=index.js.map