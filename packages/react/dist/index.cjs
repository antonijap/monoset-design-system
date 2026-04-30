"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Accordion: () => Accordion,
  AccordionContent: () => AccordionContent,
  AccordionItem: () => AccordionItem,
  AccordionTrigger: () => AccordionTrigger,
  Alert: () => Alert,
  Avatar: () => Avatar,
  Badge: () => Badge,
  Breadcrumb: () => Breadcrumb,
  Button: () => Button,
  Card: () => Card,
  Checkbox: () => Checkbox,
  CommandPalette: () => CommandPalette,
  Container: () => Container,
  DUR: () => import_motion4.DUR,
  Dialog: () => Dialog,
  DialogClose: () => DialogClose,
  DialogContent: () => DialogContent,
  DialogTrigger: () => DialogTrigger,
  DropdownMenu: () => DropdownMenu,
  DropdownMenuContent: () => DropdownMenuContent,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuLabel: () => DropdownMenuLabel,
  DropdownMenuSeparator: () => DropdownMenuSeparator,
  DropdownMenuTrigger: () => DropdownMenuTrigger,
  EASE_EMPHASIS: () => import_motion4.EASE_EMPHASIS,
  EASE_EXIT: () => import_motion4.EASE_EXIT,
  EASE_STANDARD: () => import_motion4.EASE_STANDARD,
  EmptyState: () => EmptyState,
  Field: () => Field,
  Form: () => Form,
  Grid: () => Grid,
  Inline: () => Inline,
  Input: () => Input,
  Kbd: () => Kbd,
  MonosetProvider: () => MonosetProvider,
  Pagination: () => Pagination,
  Popover: () => Popover,
  PopoverClose: () => PopoverClose,
  PopoverContent: () => PopoverContent,
  PopoverTrigger: () => PopoverTrigger,
  Progress: () => Progress,
  Radio: () => Radio,
  RadioGroup: () => RadioGroup,
  Reveal: () => Reveal,
  Select: () => Select,
  SelectContent: () => SelectContent,
  SelectItem: () => SelectItem,
  SelectTrigger: () => SelectTrigger,
  Separator: () => Separator2,
  Sheet: () => Sheet,
  SheetClose: () => SheetClose,
  SheetContent: () => SheetContent,
  SheetTrigger: () => SheetTrigger,
  Skeleton: () => Skeleton,
  Slider: () => Slider,
  Spinner: () => Spinner,
  Stack: () => Stack,
  StaggerList: () => StaggerList,
  Switch: () => Switch,
  Table: () => Table,
  TableHeader: () => TableHeader,
  TableSelectAll: () => TableSelectAll,
  TableSelectRow: () => TableSelectRow,
  Tabs: () => Tabs,
  TabsContent: () => TabsContent,
  TabsList: () => TabsList,
  TabsTrigger: () => TabsTrigger,
  Textarea: () => Textarea,
  ThemeProvider: () => ThemeProvider,
  ThemeToggle: () => ThemeToggle,
  Toast: () => Toast,
  ToastProvider: () => ToastProvider,
  Toggle: () => Toggle,
  ToggleGroup: () => ToggleGroup,
  ToggleGroupItem: () => ToggleGroupItem,
  Tooltip: () => Tooltip,
  TooltipProvider: () => TooltipProvider,
  cx: () => cx,
  fadeUp: () => import_motion4.fadeUp,
  hoverLift: () => import_motion4.hoverLift,
  listStagger: () => import_motion4.listStagger,
  modalPanel: () => import_motion4.modalPanel,
  modalScrim: () => import_motion4.modalScrim,
  popoverIn: () => import_motion4.popoverIn,
  pressDown: () => import_motion4.pressDown,
  scaleIn: () => import_motion4.scaleIn,
  slideInBottom: () => import_motion4.slideInBottom,
  slideInLeft: () => import_motion4.slideInLeft,
  slideInRight: () => import_motion4.slideInRight,
  slideInTop: () => import_motion4.slideInTop,
  useMonosetForm: () => useMonosetForm,
  useTheme: () => useTheme
});
module.exports = __toCommonJS(index_exports);

// src/Button.tsx
var import_react = require("react");

// src/cx.ts
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

// src/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = (0, import_react.forwardRef)(function Button2({
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      ref,
      type,
      disabled: disabled || loading,
      "aria-busy": loading || void 0,
      className: cx("ms-btn", `ms-btn--${variant}`, `ms-btn--${size}`, className),
      ...rest,
      children: [
        loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": true, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "9", opacity: "0.25" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12a9 9 0 0 1-9 9", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateTransform", { attributeName: "transform", type: "rotate", from: "0 12 12", to: "360 12 12", dur: "0.9s", repeatCount: "indefinite" }) })
        ] }) : leadingIcon,
        children,
        !loading && trailingIcon
      ]
    }
  );
});

// src/Badge.tsx
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var Badge = (0, import_react2.forwardRef)(function Badge2({ variant = "neutral", className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { ref, className: cx("ms-badge", `ms-badge--${variant}`, className), ...rest });
});

// src/Avatar.tsx
var RAvatar = __toESM(require("@radix-ui/react-avatar"), 1);
var import_react3 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var Avatar = (0, import_react3.forwardRef)(function Avatar2({ size = "md", initials, src, alt = "", className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(RAvatar.Root, { ref, className: cx("ms-avatar", `ms-avatar--${size}`, className), ...rest, children: [
    src && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(RAvatar.Image, { src, alt, className: "ms-avatar__img" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(RAvatar.Fallback, { delayMs: 200, children: initials?.slice(0, 2).toUpperCase() })
  ] });
});

// src/Card.tsx
var import_react4 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var Card = (0, import_react4.forwardRef)(function Card2({ variant = "outline", as: Tag = "div", className, ...rest }, ref) {
  const classes = cx(
    "ms-card",
    variant === "elevated" && "ms-card--elevated",
    variant === "inset" && "ms-card--inset",
    className
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Tag, { ref, className: classes, ...rest });
});

// src/Alert.tsx
var import_react5 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var Alert = (0, import_react5.forwardRef)(function Alert2({ title, icon = "i", urgent, className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "div",
    {
      ref,
      role: urgent ? "alert" : "status",
      "aria-live": urgent ? "assertive" : "polite",
      className: cx("ms-alert", className),
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ms-alert__icon", "aria-hidden": true, children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "ms-alert__title", children: title }),
          children && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "ms-alert__msg", children })
        ] })
      ]
    }
  );
});

// src/Input.tsx
var import_react6 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var Input = (0, import_react6.forwardRef)(function Input2({ invalid, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "input",
    {
      ref,
      "aria-invalid": invalid || void 0,
      className: cx("ms-input", className),
      ...rest
    }
  );
});
var Textarea = (0, import_react6.forwardRef)(function Textarea2({ invalid, className, rows = 4, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  const reactId = (0, import_react6.useId)();
  const id = idProp ?? `ms-field-${reactId}`;
  const helpId = help ? `${id}-help` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || void 0;
  const invalid = Boolean(error);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: cx("ms-field", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { className: "ms-field__label", htmlFor: id, children: label }),
    children({ id, describedBy, invalid }),
    help && !error && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { id: helpId, className: "ms-field__help", children: help }),
    error && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { id: errorId, role: "alert", className: "ms-field__error", children: error })
  ] });
}

// src/Form.tsx
var import_react7 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
function useMonosetForm(options) {
  const { initialValues, validate, onSubmit } = options;
  const [values, setValues] = (0, import_react7.useState)({ ...initialValues });
  const [errors, setErrors] = (0, import_react7.useState)({});
  const [isSubmitting, setIsSubmitting] = (0, import_react7.useState)(false);
  const touched = (0, import_react7.useRef)(/* @__PURE__ */ new Set());
  const dirty = (0, import_react7.useRef)(/* @__PURE__ */ new Set());
  const validateField = (0, import_react7.useCallback)(
    (name, value) => {
      const rule = validate?.[name];
      return rule ? rule(value) : void 0;
    },
    [validate]
  );
  const field = (0, import_react7.useCallback)(
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
  const fieldState = (0, import_react7.useCallback)(
    (name) => ({
      value: values[name] ?? "",
      error: errors[name],
      touched: touched.current.has(name),
      dirty: dirty.current.has(name)
    }),
    [values, errors]
  );
  const error = (0, import_react7.useCallback)(
    (name) => touched.current.has(name) ? errors[name] : void 0,
    [errors]
  );
  const handleSubmit = (0, import_react7.useCallback)(
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
  const reset = (0, import_react7.useCallback)(() => {
    setValues({ ...initialValues });
    setErrors({});
    touched.current.clear();
    dirty.current.clear();
  }, [initialValues]);
  const setValue = (0, import_react7.useCallback)((name, value) => {
    dirty.current.add(name);
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);
  const setErrorManual = (0, import_react7.useCallback)((name, msg) => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
var RCheckbox = __toESM(require("@radix-ui/react-checkbox"), 1);
var import_react8 = require("react");
var import_framer_motion = require("framer-motion");
var import_motion = require("@monoset/motion");
var import_jsx_runtime8 = require("react/jsx-runtime");
var Checkbox = (0, import_react8.forwardRef)(function Checkbox2({ label, className, checked, defaultChecked, ...rest }, ref) {
  const isChecked = checked ?? defaultChecked ?? false;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("label", { className: cx("ms-check", className), "data-state": isChecked ? "checked" : "unchecked", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      RCheckbox.Root,
      {
        ref,
        checked,
        defaultChecked,
        className: "ms-check__box",
        ...rest,
        children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(RCheckbox.Indicator, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_framer_motion.AnimatePresence, { initial: false, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          import_framer_motion.motion.span,
          {
            initial: { opacity: 0, scale: 0.6 },
            animate: { opacity: 1, scale: 1, transition: { duration: import_motion.DUR.fast, ease: import_motion.EASE_EMPHASIS } },
            exit: { opacity: 0, scale: 0.6, transition: { duration: import_motion.DUR.fast, ease: import_motion.EASE_EXIT } },
            style: { display: "inline-flex" },
            children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M5 12l5 5L20 7" }) })
          },
          "check"
        ) }) })
      }
    ),
    label && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: label })
  ] });
});

// src/Switch.tsx
var RSwitch = __toESM(require("@radix-ui/react-switch"), 1);
var import_react9 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime");
var Switch = (0, import_react9.forwardRef)(function Switch2({ label, className, checked, defaultChecked, ...rest }, ref) {
  const isChecked = checked ?? defaultChecked ?? false;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { className: cx("ms-switch", className), "data-state": isChecked ? "checked" : "unchecked", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      RSwitch.Root,
      {
        ref,
        checked,
        defaultChecked,
        className: "ms-switch__track",
        ...rest,
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(RSwitch.Thumb, { className: "ms-switch__thumb" })
      }
    ),
    label && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: label })
  ] });
});

// src/RadioGroup.tsx
var RRadio = __toESM(require("@radix-ui/react-radio-group"), 1);
var import_react10 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
var RadioGroup = (0, import_react10.forwardRef)(function RadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(RRadio.Root, { ref, className: cx("ms-radio-group", className), ...rest });
});
var Radio = (0, import_react10.forwardRef)(function Radio2({ label, className, value, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("label", { className: cx("ms-radio", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(RRadio.Item, { ref, value, className: "ms-radio__dot", ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(RRadio.Indicator, {}) }),
    label && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: label })
  ] });
});

// src/Tabs.tsx
var RTabs = __toESM(require("@radix-ui/react-tabs"), 1);
var import_react11 = require("react");
var import_framer_motion2 = require("framer-motion");
var import_motion2 = require("@monoset/motion");
var import_jsx_runtime11 = require("react/jsx-runtime");
var Tabs = RTabs.Root;
var TabsList = (0, import_react11.forwardRef)(function TabsList2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(RTabs.List, { ref, className: cx("ms-tabs__list", className), ...rest });
});
var TabsTrigger = (0, import_react11.forwardRef)(function TabsTrigger2({ className, children, isActive, layoutId = "ms-tabs-indicator", ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    RTabs.Trigger,
    {
      ref,
      className: cx("ms-tabs__trigger", className),
      "data-state": isActive ? "active" : "inactive",
      ...rest,
      children: [
        children,
        isActive && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          import_framer_motion2.motion.span,
          {
            layoutId,
            className: "ms-tabs__indicator",
            transition: { duration: import_motion2.DUR.base, ease: import_motion2.EASE_EMPHASIS }
          }
        )
      ]
    }
  );
});
var TabsContent = RTabs.Content;

// src/Table.tsx
var import_react12 = require("react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var Table = (0, import_react12.forwardRef)(
  function Table2({ className, children, maxHeight, wrapperClassName, ...rest }, ref) {
    const style = maxHeight !== void 0 ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight } : void 0;
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      "div",
      {
        className: cx(
          "ms-table-wrapper",
          maxHeight !== void 0 && "ms-table-wrapper--scroll",
          wrapperClassName
        ),
        style,
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("table", { ref, className: cx("ms-table", className), ...rest, children })
      }
    );
  }
);
function SortIcon({ direction }) {
  if (direction === "asc") {
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M5 2L8.5 7H1.5L5 2Z", fill: "currentColor" }) });
  }
  if (direction === "desc") {
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M5 8L1.5 3H8.5L5 8Z", fill: "currentColor" }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M5 1L7.5 4.5H2.5L5 1Z", fill: "currentColor", opacity: "0.4" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M5 9L2.5 5.5H7.5L5 9Z", fill: "currentColor", opacity: "0.4" })
  ] });
}
var TableHeader = (0, import_react12.forwardRef)(
  function TableHeader2({ sortable, sortDirection, onSort, className, children, ...rest }, ref) {
    const handleClick = sortable && onSort ? onSort : void 0;
    const ariaSort = sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : void 0;
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
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
          sortable && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "span",
            {
              className: cx(
                "ms-table-header__sort",
                sortDirection != null && "ms-table-header__sort--active"
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(SortIcon, { direction: sortDirection })
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
  const inputRef = (0, import_react12.useRef)(null);
  (0, import_react12.useEffect)(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { className: "ms-table-select", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("td", { className: "ms-table-select", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
var RToast = __toESM(require("@radix-ui/react-toast"), 1);
var import_jsx_runtime13 = require("react/jsx-runtime");
function ToastProvider({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(RToast.Provider, { swipeDirection: "right", duration: 4e3, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(RToast.Viewport, { className: "ms-toast-viewport" })
  ] });
}
function Toast({ title, kind = "info", action, children, className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(RToast.Root, { className: cx("ms-toast", className), "data-kind": kind, ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { "aria-hidden": true, style: {
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
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(RToast.Title, { style: { fontWeight: 600 }, children: title }),
      children && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(RToast.Description, { children })
    ] }),
    action && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(RToast.Action, { altText: "Action", asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "ms-toast__action", children: action }) })
  ] });
}

// src/Dialog.tsx
var RDialog = __toESM(require("@radix-ui/react-dialog"), 1);
var import_jsx_runtime14 = require("react/jsx-runtime");
var Dialog = RDialog.Root;
var DialogTrigger = RDialog.Trigger;
var DialogClose = RDialog.Close;
function DialogContent({ title, description, children, className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(RDialog.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RDialog.Overlay, { className: "ms-dialog-scrim" }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(RDialog.Content, { className: cx("ms-dialog", className), ...rest, children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RDialog.Title, { className: "ms-dialog__title", children: title }),
      description && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RDialog.Description, { className: "ms-dialog__desc", children: description }),
      children
    ] })
  ] });
}

// src/Sheet.tsx
var RDialog2 = __toESM(require("@radix-ui/react-dialog"), 1);
var import_jsx_runtime15 = require("react/jsx-runtime");
var Sheet = RDialog2.Root;
var SheetTrigger = RDialog2.Trigger;
var SheetClose = RDialog2.Close;
function SheetContent({
  title,
  description,
  children,
  className,
  side = "right",
  size = 380,
  style,
  ...rest
}) {
  const px = typeof size === "number" ? `${size}px` : size;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(RDialog2.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RDialog2.Overlay, { className: "ms-sheet-scrim" }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
      RDialog2.Content,
      {
        className: cx("ms-sheet", `ms-sheet--${side}`, className),
        style: { ...sizeStyle(side, px), ...style },
        ...rest,
        children: [
          (title || description) && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "ms-sheet__header", children: [
            title && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RDialog2.Title, { className: "ms-sheet__title", children: title }),
            description && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RDialog2.Description, { className: "ms-sheet__desc", children: description })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "ms-sheet__body", children })
        ]
      }
    )
  ] });
}
function sizeStyle(side, px) {
  if (side === "left" || side === "right") return { width: px };
  return { height: px };
}

// src/CommandPalette.tsx
var RDialog3 = __toESM(require("@radix-ui/react-dialog"), 1);
var import_react13 = require("react");
var import_jsx_runtime16 = require("react/jsx-runtime");
function isGrouped(items) {
  return items.length > 0 && "items" in items[0];
}
function flatten(items) {
  if (isGrouped(items)) return items.flatMap((g) => g.items);
  return items;
}
function defaultFilter(query, item) {
  const q = query.toLowerCase();
  if (item.label.toLowerCase().includes(q)) return true;
  if (item.description?.toLowerCase().includes(q)) return true;
  if (item.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
  return false;
}
var CommandPalette = (0, import_react13.forwardRef)(
  function CommandPalette2({
    open,
    onOpenChange,
    items = [],
    placeholder = "Search\u2026",
    emptyMessage = "No results.",
    filter = defaultFilter,
    footer,
    className
  }, ref) {
    const [query, setQuery] = (0, import_react13.useState)("");
    const [cursor, setCursor] = (0, import_react13.useState)(0);
    const inputRef = (0, import_react13.useRef)(null);
    const listRef = (0, import_react13.useRef)(null);
    const allItems = flatten(items);
    const filtered = query.trim() ? allItems.filter((item) => filter(query, item)) : allItems;
    (0, import_react13.useEffect)(() => {
      if (open) {
        setQuery("");
        setCursor(0);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    }, [open]);
    (0, import_react13.useEffect)(() => {
      setCursor((c) => Math.min(c, Math.max(0, filtered.length - 1)));
    }, [filtered.length]);
    (0, import_react13.useEffect)(() => {
      const el = listRef.current?.querySelector("[data-active]");
      el?.scrollIntoView({ block: "nearest" });
    }, [cursor]);
    const close = (0, import_react13.useCallback)(() => onOpenChange?.(false), [onOpenChange]);
    const select = (0, import_react13.useCallback)(
      (item) => {
        if (item.disabled) return;
        item.onSelect?.();
        close();
      },
      [close]
    );
    const onKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => (c + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => (c - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[cursor];
        if (item) select(item);
      }
    };
    const renderItems = () => {
      if (filtered.length === 0) {
        return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "ms-cmd__empty", children: emptyMessage });
      }
      if (!isGrouped(items) || query.trim()) {
        let idx2 = 0;
        return filtered.map((item) => {
          const i = idx2++;
          return renderItem(item, i);
        });
      }
      let idx = 0;
      return items.map((group, gi) => {
        const groupFiltered = group.items.filter((item) => filter(query, item));
        if (groupFiltered.length === 0) return null;
        return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { role: "group", "aria-label": group.heading, children: [
          group.heading && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "ms-cmd__group-heading", children: group.heading }),
          groupFiltered.map((item) => {
            const i = idx++;
            return renderItem(item, i);
          })
        ] }, gi);
      });
    };
    const renderItem = (item, idx) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
      "button",
      {
        role: "option",
        "aria-selected": idx === cursor,
        "aria-disabled": item.disabled || void 0,
        "data-active": idx === cursor ? "" : void 0,
        className: cx("ms-cmd__item", idx === cursor && "ms-cmd__item--active"),
        onMouseEnter: () => setCursor(idx),
        onClick: () => select(item),
        tabIndex: -1,
        children: [
          item.icon && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "ms-cmd__item-icon", children: item.icon }),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("span", { className: "ms-cmd__item-text", children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "ms-cmd__item-label", children: item.label }),
            item.description && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "ms-cmd__item-desc", children: item.description })
          ] })
        ]
      },
      item.id
    );
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RDialog3.Root, { open, onOpenChange, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(RDialog3.Portal, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RDialog3.Overlay, { className: "ms-cmd-scrim" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
        RDialog3.Content,
        {
          ref,
          className: cx("ms-cmd", className),
          "aria-label": "Command palette",
          onKeyDown: onKey,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "ms-cmd__input-wrap", children: [
              /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
                "svg",
                {
                  className: "ms-cmd__search-icon",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("circle", { cx: "11", cy: "11", r: "7" }),
                    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("path", { d: "m21 21-4.3-4.3" })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                "input",
                {
                  ref: inputRef,
                  className: "ms-cmd__input",
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  placeholder,
                  "aria-label": "Search",
                  "aria-autocomplete": "list",
                  "aria-controls": "ms-cmd-list",
                  autoComplete: "off",
                  spellCheck: false
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
              "div",
              {
                ref: listRef,
                id: "ms-cmd-list",
                role: "listbox",
                className: "ms-cmd__list",
                children: renderItems()
              }
            ),
            footer && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "ms-cmd__footer", children: footer })
          ]
        }
      )
    ] }) });
  }
);

// src/Tooltip.tsx
var RTooltip = __toESM(require("@radix-ui/react-tooltip"), 1);
var import_jsx_runtime17 = require("react/jsx-runtime");
function TooltipProvider({ children, delayDuration = 300 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RTooltip.Provider, { delayDuration, children });
}
function Tooltip({ content, side = "top", children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(RTooltip.Root, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RTooltip.Trigger, { asChild: true, children }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RTooltip.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RTooltip.Content, { side, sideOffset: 6, className: cx("ms-tooltip"), children: content }) })
  ] });
}

// src/Popover.tsx
var RPopover = __toESM(require("@radix-ui/react-popover"), 1);
var import_jsx_runtime18 = require("react/jsx-runtime");
var Popover = RPopover.Root;
var PopoverTrigger = RPopover.Trigger;
var PopoverClose = RPopover.Close;
function PopoverContent({ className, children, sideOffset = 6, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(RPopover.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(RPopover.Content, { sideOffset, className: cx("ms-popover", className), ...rest, children }) });
}

// src/DropdownMenu.tsx
var RDropdown = __toESM(require("@radix-ui/react-dropdown-menu"), 1);
var import_jsx_runtime19 = require("react/jsx-runtime");
var DropdownMenu = RDropdown.Root;
var DropdownMenuTrigger = RDropdown.Trigger;
function DropdownMenuContent({ children, className, sideOffset = 6, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(RDropdown.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(RDropdown.Content, { sideOffset, className: cx("ms-menu", className), ...rest, children }) });
}
function DropdownMenuItem({ className, children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(RDropdown.Item, { className: cx("ms-menu__item", className), ...rest, children });
}
function DropdownMenuLabel({ className, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(RDropdown.Label, { className: cx("ms-menu__label", className), children });
}
function DropdownMenuSeparator() {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(RDropdown.Separator, { className: "ms-menu__separator" });
}

// src/Select.tsx
var RSelect = __toESM(require("@radix-ui/react-select"), 1);
var import_react14 = require("react");
var import_jsx_runtime20 = require("react/jsx-runtime");
var Select = RSelect.Root;
var SelectTrigger = (0, import_react14.forwardRef)(function SelectTrigger2({ className, placeholder, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(RSelect.Trigger, { ref, className: cx("ms-select", className), ...rest, children: [
    children ?? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(RSelect.Value, { placeholder }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(RSelect.Icon, { "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("path", { d: "m6 9 6 6 6-6" }) }) })
  ] });
});
function SelectContent({ children, className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(RSelect.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(RSelect.Content, { className: cx("ms-menu", className), position: "popper", sideOffset: 6, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(RSelect.Viewport, { children }) }) });
}
var SelectItem = (0, import_react14.forwardRef)(
  function SelectItem2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(RSelect.Item, { ref, className: cx("ms-menu__item", className), ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(RSelect.ItemText, { children }) });
  }
);

// src/Skeleton.tsx
var import_react15 = require("react");
var import_jsx_runtime21 = require("react/jsx-runtime");
var Skeleton = (0, import_react15.forwardRef)(function Skeleton2({ width = "100%", height = 12, circle, style, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
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
var import_jsx_runtime22 = require("react/jsx-runtime");
function EmptyState({ icon, title, body, action, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: cx("ms-empty", className), children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "ms-empty__icon", "aria-hidden": true, children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "ms-empty__title", children: title }),
    body && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "ms-empty__body", children: body }),
    action
  ] });
}

// src/Pagination.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("nav", { "aria-label": "Pagination", className: cx("ms-pagination", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
      (p, i) => p === "\u2026" ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "ms-pagination__btn", "aria-hidden": true, children: "\u2026" }, `e-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
var import_react16 = require("react");
var import_jsx_runtime24 = require("react/jsx-runtime");
function Breadcrumb({ items, separator = "/", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("nav", { "aria-label": "Breadcrumb", className: cx("ms-breadcrumb", className), children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_react16.Fragment, { children: [
    i > 0 && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "ms-breadcrumb__sep", "aria-hidden": true, children: separator }),
    it.href && !it.current ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("a", { href: it.href, className: "ms-breadcrumb__item", children: it.label }) : /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "ms-breadcrumb__item", "aria-current": it.current ? "page" : void 0, children: it.label })
  ] }, i)) });
}

// src/Progress.tsx
var RProgress = __toESM(require("@radix-ui/react-progress"), 1);
var import_jsx_runtime25 = require("react/jsx-runtime");
function Progress({
  value,
  max = 100,
  indeterminate,
  className,
  "aria-label": ariaLabel = "Progress"
}) {
  const pct = indeterminate ? void 0 : Math.min(100, Math.max(0, (value ?? 0) / max * 100));
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(RProgress.Root, { value: indeterminate ? null : value ?? 0, max, "aria-label": ariaLabel, className: cx("ms-progress", className), children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    RProgress.Indicator,
    {
      className: "ms-progress__indicator",
      style: indeterminate ? { width: "40%", animation: "ms-indeterminate 1.4s infinite" } : { width: `${pct}%` }
    }
  ) });
}

// src/Separator.tsx
var RSeparator = __toESM(require("@radix-ui/react-separator"), 1);
var import_jsx_runtime26 = require("react/jsx-runtime");
function Separator2({ className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(RSeparator.Root, { className: cx("ms-separator", className), ...rest });
}

// src/Layout.tsx
var import_react17 = require("react");
var import_jsx_runtime27 = require("react/jsx-runtime");
var Stack = (0, import_react17.forwardRef)(function Stack2({ gap = 4, align, style, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
var Inline = (0, import_react17.forwardRef)(function Inline2({ gap = 4, align, wrap = true, style, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
var Grid = (0, import_react17.forwardRef)(function Grid2({ columns, minWidth = 240, gap = 4, style, className, ...rest }, ref) {
  const min = typeof minWidth === "number" ? `${minWidth}px` : minWidth;
  const template = columns ? `repeat(${columns}, 1fr)` : `repeat(auto-fit, minmax(${min}, 1fr))`;
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
var Container = (0, import_react17.forwardRef)(function Container2({ size = "lg", padding = true, style, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
var import_react18 = require("react");
var import_jsx_runtime28 = require("react/jsx-runtime");
var Kbd = (0, import_react18.forwardRef)(function Kbd2({ size = "md", className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("kbd", { ref, className: cx("ms-kbd", `ms-kbd--${size}`, className), ...rest });
});

// src/Spinner.tsx
var import_react19 = require("react");
var import_jsx_runtime29 = require("react/jsx-runtime");
var Spinner = (0, import_react19.forwardRef)(function Spinner2({ size = 16, label = "Loading", className, style, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
var RAccordion = __toESM(require("@radix-ui/react-accordion"), 1);
var import_react20 = require("react");
var import_jsx_runtime30 = require("react/jsx-runtime");
var Accordion = RAccordion.Root;
var AccordionItem = (0, import_react20.forwardRef)(function AccordionItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RAccordion.Item, { ref, className: cx("ms-accordion__item", className), ...rest });
});
var AccordionTrigger = (0, import_react20.forwardRef)(function AccordionTrigger2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RAccordion.Header, { className: "ms-accordion__header", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(RAccordion.Trigger, { ref, className: cx("ms-accordion__trigger", className), ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { children }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("polyline", { points: "6 9 12 15 18 9" })
      }
    )
  ] }) });
});
var AccordionContent = (0, import_react20.forwardRef)(function AccordionContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RAccordion.Content, { ref, className: cx("ms-accordion__content", className), ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "ms-accordion__content-inner", children }) });
});

// src/Slider.tsx
var RSlider = __toESM(require("@radix-ui/react-slider"), 1);
var import_react21 = require("react");
var import_jsx_runtime31 = require("react/jsx-runtime");
var Slider = (0, import_react21.forwardRef)(function Slider2({ className, defaultValue = [50], value, ...rest }, ref) {
  const thumbs = value ?? defaultValue;
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
    RSlider.Root,
    {
      ref,
      className: cx("ms-slider", className),
      defaultValue,
      value,
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(RSlider.Track, { className: "ms-slider__track", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(RSlider.Range, { className: "ms-slider__range" }) }),
        thumbs.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(RSlider.Thumb, { className: "ms-slider__thumb", "aria-label": `Value ${i + 1}` }, i))
      ]
    }
  );
});

// src/ToggleGroup.tsx
var RToggleGroup = __toESM(require("@radix-ui/react-toggle-group"), 1);
var RToggle = __toESM(require("@radix-ui/react-toggle"), 1);
var import_react22 = require("react");
var import_jsx_runtime32 = require("react/jsx-runtime");
var Toggle = (0, import_react22.forwardRef)(function Toggle2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(RToggle.Root, { ref, className: cx("ms-toggle", className), ...rest });
});
var ToggleGroup = (0, import_react22.forwardRef)(function ToggleGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(RToggleGroup.Root, { ref, className: cx("ms-toggle-group", className), ...rest });
});
var ToggleGroupItem = (0, import_react22.forwardRef)(function ToggleGroupItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(RToggleGroup.Item, { ref, className: cx("ms-toggle", className), ...rest });
});

// src/MonosetProvider.tsx
var import_framer_motion3 = require("framer-motion");

// src/Theme.tsx
var import_react23 = require("react");
var import_jsx_runtime33 = require("react/jsx-runtime");
var ThemeCtx = (0, import_react23.createContext)(null);
function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "monoset-theme"
}) {
  const [theme, setThemeState] = (0, import_react23.useState)(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
    return defaultTheme;
  });
  const [systemTheme, setSystemTheme] = (0, import_react23.useState)(getSystemTheme);
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const setTheme = (0, import_react23.useCallback)(
    (next) => {
      setThemeState(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
      }
    },
    [storageKey]
  );
  (0, import_react23.useEffect)(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  (0, import_react23.useEffect)(() => {
    const root = document.documentElement;
    root.setAttribute("data-monoset-theme", resolvedTheme);
    root.classList.toggle("monoset-dark", resolvedTheme === "dark");
  }, [resolvedTheme]);
  const value = (0, import_react23.useMemo)(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(ThemeCtx.Provider, { value, children });
}
function useTheme() {
  const ctx = (0, import_react23.useContext)(ThemeCtx);
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
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("circle", { cx: "8", cy: "8", r: "3", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("rect", { x: "2", y: "2.5", width: "12", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("path", { d: "M5.5 13.5h5M8 10.5v3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
var ICON = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon
};
var ThemeToggle = (0, import_react23.forwardRef)(
  function ThemeToggle2({ className, ...rest }, ref) {
    const { theme, setTheme } = useTheme();
    const Icon2 = ICON[theme];
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
      "button",
      {
        ref,
        type: "button",
        "aria-label": LABEL[theme],
        className: cx("ms-btn", "ms-btn--ghost", "ms-btn--sm", className),
        onClick: () => setTheme(NEXT[theme]),
        ...rest,
        children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Icon2, {})
      }
    );
  }
);

// src/MonosetProvider.tsx
var import_jsx_runtime34 = require("react/jsx-runtime");
function MonosetProvider({
  children,
  reducedMotion = "user",
  tooltipDelay = 300,
  defaultTheme
}) {
  const inner = /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_framer_motion3.MotionConfig, { reducedMotion, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(TooltipProvider, { delayDuration: tooltipDelay, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(ToastProvider, { children }) }) });
  if (defaultTheme) {
    return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(ThemeProvider, { defaultTheme, children: inner });
  }
  return inner;
}

// src/index.ts
var import_motion4 = require("@monoset/motion");

// src/Motion.tsx
var import_react24 = require("react");
var import_framer_motion4 = require("framer-motion");
var import_motion3 = require("@monoset/motion");
var import_jsx_runtime35 = require("react/jsx-runtime");
var Reveal = (0, import_react24.forwardRef)(
  ({
    children,
    variant = import_motion3.fadeUp,
    once = true,
    margin = "-80px",
    delay = 0,
    className,
    style
  }, forwardedRef) => {
    const localRef = (0, import_react24.useRef)(null);
    const ref = forwardedRef ?? localRef;
    const inView = (0, import_framer_motion4.useInView)(ref, { once, margin });
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
    return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
      import_framer_motion4.motion.div,
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
  hidden: import_motion3.fadeUp.hidden,
  visible: import_motion3.fadeUp.visible
};
var StaggerList = (0, import_react24.forwardRef)(
  ({
    children,
    stagger = 0.04,
    once = true,
    margin = "-80px",
    className,
    style
  }, forwardedRef) => {
    const localRef = (0, import_react24.useRef)(null);
    const ref = forwardedRef ?? localRef;
    const inView = (0, import_framer_motion4.useInView)(ref, { once, margin });
    const containerVariants = {
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger }
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
      import_framer_motion4.motion.div,
      {
        ref,
        initial: "hidden",
        animate: inView ? "visible" : "hidden",
        variants: containerVariants,
        className,
        style,
        children: import_react24.Children.map(children, (child) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_framer_motion4.motion.div, { variants: childVariants, children: child }))
      }
    );
  }
);
StaggerList.displayName = "StaggerList";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
  CommandPalette,
  Container,
  DUR,
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
  EASE_EMPHASIS,
  EASE_EXIT,
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
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
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
  fadeUp,
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
});
//# sourceMappingURL=index.cjs.map