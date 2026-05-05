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
  AppShell: () => AppShell,
  Avatar: () => Avatar,
  Badge: () => Badge,
  Breadcrumb: () => Breadcrumb,
  Button: () => Button,
  Card: () => Card,
  Carousel: () => Carousel,
  Checkbox: () => Checkbox,
  Combobox: () => Combobox,
  CommandPalette: () => CommandPalette,
  Container: () => Container,
  ContextMenu: () => ContextMenu,
  ContextMenuContent: () => ContextMenuContent,
  ContextMenuItem: () => ContextMenuItem,
  ContextMenuLabel: () => ContextMenuLabel,
  ContextMenuSeparator: () => ContextMenuSeparator,
  ContextMenuTrigger: () => ContextMenuTrigger,
  DUR: () => import_motion4.DUR,
  DatePicker: () => DatePicker,
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
  FileUpload: () => FileUpload,
  Form: () => Form,
  Grid: () => Grid,
  HoverCard: () => HoverCard,
  HoverCardContent: () => HoverCardContent,
  HoverCardTrigger: () => HoverCardTrigger,
  Inline: () => Inline,
  Input: () => Input,
  Kbd: () => Kbd,
  MonosetProvider: () => MonosetProvider,
  MultiCombobox: () => MultiCombobox,
  NavigationMenu: () => NavigationMenu,
  NavigationMenuContent: () => NavigationMenuContent,
  NavigationMenuItem: () => NavigationMenuItem,
  NavigationMenuLink: () => NavigationMenuLink,
  NavigationMenuList: () => NavigationMenuList,
  NavigationMenuTrigger: () => NavigationMenuTrigger,
  NumberInput: () => NumberInput,
  Pagination: () => Pagination,
  PasswordInput: () => PasswordInput,
  PinInput: () => PinInput,
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
  Separator: () => Separator3,
  Sheet: () => Sheet,
  SheetClose: () => SheetClose,
  SheetContent: () => SheetContent,
  SheetTrigger: () => SheetTrigger,
  Skeleton: () => Skeleton,
  Slider: () => Slider,
  Spinner: () => Spinner,
  Stack: () => Stack,
  StaggerList: () => StaggerList,
  Stepper: () => Stepper,
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
  useAppShellMobile: () => useAppShellMobile,
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
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RDialog3.Title, { className: "ms-sr-only", children: "Command palette" }),
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

// src/AppShell.tsx
var import_react14 = require("react");
var RDialog4 = __toESM(require("@radix-ui/react-dialog"), 1);
var import_jsx_runtime17 = require("react/jsx-runtime");
var Ctx = (0, import_react14.createContext)(null);
function useAppShell() {
  const ctx = (0, import_react14.useContext)(Ctx);
  if (!ctx) throw new Error("AppShell sub-components must be used inside <AppShell>.");
  return ctx;
}
var AppShellRoot = (0, import_react14.forwardRef)(
  function AppShellRoot2({ children, sidebarWidth = 240, className }, ref) {
    const [mobileOpen, setMobileOpen] = (0, import_react14.useState)(false);
    const value = { mobileOpen, setMobileOpen };
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Ctx.Provider, { value, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      "div",
      {
        ref,
        className: cx("ms-app-shell", className),
        style: { ["--ms-sidebar-w"]: `${sidebarWidth}px` },
        children
      }
    ) });
  }
);
function AppShellSidebar({ children, brand, footer, className }) {
  const { mobileOpen, setMobileOpen } = useAppShell();
  const inner = /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: cx("ms-app-shell__sidebar-inner", className), children: [
    brand && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "ms-app-shell__brand", children: brand }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("nav", { className: "ms-app-shell__nav", children }),
    footer && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "ms-app-shell__sidebar-footer", children: footer })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("aside", { className: "ms-app-shell__sidebar", "data-ms": "app-shell-sidebar", children: inner }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RDialog4.Root, { open: mobileOpen, onOpenChange: setMobileOpen, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(RDialog4.Portal, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RDialog4.Overlay, { className: "ms-app-shell__drawer-scrim" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(RDialog4.Content, { className: "ms-app-shell__drawer", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RDialog4.Title, { className: "ms-sr-only", children: "Navigation" }),
        inner
      ] })
    ] }) })
  ] });
}
function AppShellSidebarGroup({ label, children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: cx("ms-app-shell__group", className), children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "ms-app-shell__group-label", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "ms-app-shell__group-items", children })
  ] });
}
var AppShellSidebarItem = (0, import_react14.forwardRef)(
  function AppShellSidebarItem2({ icon, active, children, className, onClick, ...rest }, ref) {
    const { setMobileOpen } = useAppShell();
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
      "button",
      {
        ref,
        type: "button",
        "aria-current": active ? "page" : void 0,
        className: cx("ms-app-shell__item", active && "ms-app-shell__item--active", className),
        onClick: (e) => {
          onClick?.(e);
          setMobileOpen(false);
        },
        ...rest,
        children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "ms-app-shell__item-icon", children: icon }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "ms-app-shell__item-label", children })
        ]
      }
    );
  }
);
function AppShellMain({ children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: cx("ms-app-shell__main", className), children });
}
function AppShellHeader({ children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("header", { className: cx("ms-app-shell__header", className), children });
}
var AppShellMobileTrigger = (0, import_react14.forwardRef)(
  function AppShellMobileTrigger2({ label = "Open navigation", className, ...rest }, ref) {
    const { setMobileOpen } = useAppShell();
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      "button",
      {
        ref,
        type: "button",
        "aria-label": label,
        className: cx("ms-app-shell__mobile-trigger", className),
        onClick: () => setMobileOpen(true),
        ...rest,
        children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M3 6h18M3 12h18M3 18h18" }) })
      }
    );
  }
);
function AppShellContent({ children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("main", { className: cx("ms-app-shell__content", className), children });
}
function useAppShellMobile() {
  const { mobileOpen, setMobileOpen } = useAppShell();
  return { open: mobileOpen, setOpen: setMobileOpen };
}
var AppShell = AppShellRoot;
AppShell.Sidebar = AppShellSidebar;
AppShell.SidebarGroup = AppShellSidebarGroup;
AppShell.SidebarItem = AppShellSidebarItem;
AppShell.Main = AppShellMain;
AppShell.Header = AppShellHeader;
AppShell.MobileTrigger = AppShellMobileTrigger;
AppShell.Content = AppShellContent;

// src/Combobox.tsx
var RPopover = __toESM(require("@radix-ui/react-popover"), 1);
var import_react15 = require("react");
var import_jsx_runtime18 = require("react/jsx-runtime");
function defaultFilter2(query, option) {
  const q = query.toLowerCase();
  if (option.label.toLowerCase().includes(q)) return true;
  if (option.description?.toLowerCase().includes(q)) return true;
  if (option.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
  return false;
}
var Combobox = (0, import_react15.forwardRef)(
  function Combobox2({
    options,
    value,
    onValueChange,
    placeholder = "Select\u2026",
    searchPlaceholder = "Search\u2026",
    emptyMessage = "No results.",
    filter = defaultFilter2,
    disabled,
    id,
    className,
    ...ariaProps
  }, ref) {
    const [open, setOpen] = (0, import_react15.useState)(false);
    const [query, setQuery] = (0, import_react15.useState)("");
    const [cursor, setCursor] = (0, import_react15.useState)(0);
    const inputRef = (0, import_react15.useRef)(null);
    const listRef = (0, import_react15.useRef)(null);
    const listId = (0, import_react15.useId)();
    const filtered = query.trim() ? options.filter((opt) => filter(query, opt)) : options;
    const selected = options.find((opt) => opt.value === value) || null;
    (0, import_react15.useEffect)(() => {
      if (open) {
        setQuery("");
        setCursor(Math.max(0, filtered.findIndex((opt) => opt.value === value)));
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    }, [open]);
    (0, import_react15.useEffect)(() => {
      setCursor((c) => Math.min(c, Math.max(0, filtered.length - 1)));
    }, [filtered.length]);
    (0, import_react15.useEffect)(() => {
      const el = listRef.current?.querySelector("[data-active]");
      el?.scrollIntoView({ block: "nearest" });
    }, [cursor]);
    const select = (option) => {
      if (option.disabled) return;
      onValueChange?.(option.value);
      setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => (c + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => (c - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const opt = filtered[cursor];
        if (opt) select(opt);
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(RPopover.Root, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(RPopover.Trigger, { asChild: true, disabled, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
        "button",
        {
          ref,
          id,
          type: "button",
          role: "combobox",
          "aria-expanded": open,
          "aria-controls": listId,
          "aria-haspopup": "listbox",
          disabled,
          className: cx("ms-combobox__trigger", className),
          ...ariaProps,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: cx("ms-combobox__value", !selected && "ms-combobox__value--placeholder"), children: selected ? selected.label : placeholder }),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ChevronDown, {})
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(RPopover.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
        RPopover.Content,
        {
          sideOffset: 6,
          align: "start",
          className: "ms-combobox__panel",
          onOpenAutoFocus: (e) => e.preventDefault(),
          style: { width: "var(--radix-popover-trigger-width)" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "ms-combobox__input-wrap", children: [
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(SearchIcon, {}),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                "input",
                {
                  ref: inputRef,
                  className: "ms-combobox__input",
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  onKeyDown: onKey,
                  placeholder: searchPlaceholder,
                  "aria-autocomplete": "list",
                  "aria-controls": listId,
                  autoComplete: "off",
                  spellCheck: false
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { ref: listRef, id: listId, role: "listbox", className: "ms-combobox__list", children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "ms-combobox__empty", children: emptyMessage }) : filtered.map((opt, i) => {
              const isSelected = opt.value === value;
              const isActive = i === cursor;
              return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
                "button",
                {
                  role: "option",
                  "aria-selected": isSelected,
                  "aria-disabled": opt.disabled || void 0,
                  "data-active": isActive ? "" : void 0,
                  className: cx(
                    "ms-combobox__option",
                    isActive && "ms-combobox__option--active",
                    isSelected && "ms-combobox__option--selected"
                  ),
                  onMouseEnter: () => setCursor(i),
                  onClick: () => select(opt),
                  tabIndex: -1,
                  type: "button",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { className: "ms-combobox__option-text", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ms-combobox__option-label", children: opt.label }),
                      opt.description && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ms-combobox__option-desc", children: opt.description })
                    ] }),
                    isSelected && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(CheckIcon, {})
                  ]
                },
                opt.value
              );
            }) })
          ]
        }
      ) })
    ] });
  }
);
function ChevronDown() {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { d: "m6 9 6 6 6-6" }) });
}
function SearchIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("svg", { className: "ms-combobox__search-icon", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("circle", { cx: "11", cy: "11", r: "7" }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { d: "m21 21-4.3-4.3" })
  ] });
}
function CheckIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", className: "ms-combobox__check", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { d: "M5 12l5 5L20 7" }) });
}

// src/MultiCombobox.tsx
var RPopover2 = __toESM(require("@radix-ui/react-popover"), 1);
var import_react16 = require("react");
var import_jsx_runtime19 = require("react/jsx-runtime");
function defaultFilter3(query, option) {
  const q = query.toLowerCase();
  return option.label.toLowerCase().includes(q) || !!option.description?.toLowerCase().includes(q) || !!option.keywords?.some((k) => k.toLowerCase().includes(q));
}
var MultiCombobox = (0, import_react16.forwardRef)(
  function MultiCombobox2({ options, value, defaultValue = [], onValueChange, placeholder = "Select\u2026", searchPlaceholder = "Search\u2026", emptyMessage = "No results.", filter = defaultFilter3, disabled, id, className, ...ariaProps }, ref) {
    const isControlled = value !== void 0;
    const [internal, setInternal] = (0, import_react16.useState)(defaultValue);
    const selected = isControlled ? value : internal;
    const [open, setOpen] = (0, import_react16.useState)(false);
    const [query, setQuery] = (0, import_react16.useState)("");
    const [cursor, setCursor] = (0, import_react16.useState)(0);
    const inputRef = (0, import_react16.useRef)(null);
    const listId = (0, import_react16.useId)();
    const filtered = query.trim() ? options.filter((o) => filter(query, o)) : options;
    (0, import_react16.useEffect)(() => {
      if (open) {
        setQuery("");
        setCursor(0);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    }, [open]);
    (0, import_react16.useEffect)(() => {
      setCursor((c) => Math.min(c, Math.max(0, filtered.length - 1)));
    }, [filtered.length]);
    const setSelected = (next) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };
    const toggle = (val) => {
      const next = selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val];
      setSelected(next);
    };
    const removeAt = (val) => setSelected(selected.filter((v) => v !== val));
    const onKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => (c + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => (c - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const opt = filtered[cursor];
        if (opt && !opt.disabled) toggle(opt.value);
      }
    };
    const labelOf = (val) => options.find((o) => o.value === val)?.label || val;
    return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(RPopover2.Root, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(RPopover2.Trigger, { asChild: true, disabled, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
        "button",
        {
          ref,
          id,
          type: "button",
          role: "combobox",
          "aria-expanded": open,
          "aria-haspopup": "listbox",
          "aria-controls": listId,
          disabled,
          className: cx("ms-combobox__trigger", "ms-multicombobox__trigger", className),
          ...ariaProps,
          children: [
            selected.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "ms-combobox__value ms-combobox__value--placeholder", children: placeholder }) : /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "ms-multicombobox__tags", children: selected.map((v) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("span", { className: "ms-multicombobox__tag", children: [
              labelOf(v),
              /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
                "span",
                {
                  role: "button",
                  "aria-label": `Remove ${labelOf(v)}`,
                  onClick: (e) => {
                    e.stopPropagation();
                    removeAt(v);
                  },
                  className: "ms-multicombobox__tag-remove",
                  children: "\xD7"
                }
              )
            ] }, v)) }),
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(ChevronDown2, {})
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(RPopover2.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
        RPopover2.Content,
        {
          sideOffset: 6,
          align: "start",
          className: "ms-combobox__panel",
          onOpenAutoFocus: (e) => e.preventDefault(),
          style: { width: "var(--radix-popover-trigger-width)" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "ms-combobox__input-wrap", children: [
              /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(SearchIcon2, {}),
              /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
                "input",
                {
                  ref: inputRef,
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  onKeyDown: onKey,
                  placeholder: searchPlaceholder,
                  "aria-controls": listId,
                  "aria-autocomplete": "list",
                  autoComplete: "off",
                  spellCheck: false,
                  className: "ms-combobox__input"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { id: listId, role: "listbox", "aria-multiselectable": true, className: "ms-combobox__list", children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "ms-combobox__empty", children: emptyMessage }) : filtered.map((opt, i) => {
              const isSel = selected.includes(opt.value);
              const isActive = i === cursor;
              return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": isSel,
                  "aria-disabled": opt.disabled || void 0,
                  "data-active": isActive ? "" : void 0,
                  onMouseEnter: () => setCursor(i),
                  onClick: () => !opt.disabled && toggle(opt.value),
                  className: cx("ms-combobox__option", isActive && "ms-combobox__option--active", isSel && "ms-combobox__option--selected"),
                  tabIndex: -1,
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: cx("ms-multicombobox__check", isSel && "ms-multicombobox__check--on"), children: isSel ? "\u2713" : "" }),
                    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("span", { className: "ms-combobox__option-text", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "ms-combobox__option-label", children: opt.label }),
                      opt.description && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "ms-combobox__option-desc", children: opt.description })
                    ] })
                  ]
                },
                opt.value
              );
            }) })
          ]
        }
      ) })
    ] });
  }
);
function ChevronDown2() {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("path", { d: "m6 9 6 6 6-6" }) });
}
function SearchIcon2() {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("svg", { className: "ms-combobox__search-icon", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("circle", { cx: "11", cy: "11", r: "7" }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("path", { d: "m21 21-4.3-4.3" })
  ] });
}

// src/HoverCard.tsx
var RHoverCard = __toESM(require("@radix-ui/react-hover-card"), 1);
var import_jsx_runtime20 = require("react/jsx-runtime");
var HoverCard = RHoverCard.Root;
var HoverCardTrigger = RHoverCard.Trigger;
function HoverCardContent({ className, children, sideOffset = 6, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(RHoverCard.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    RHoverCard.Content,
    {
      sideOffset,
      className: cx("ms-hovercard", className),
      ...rest,
      children
    }
  ) });
}

// src/PasswordInput.tsx
var import_react17 = require("react");
var import_jsx_runtime21 = require("react/jsx-runtime");
var PasswordInput = (0, import_react17.forwardRef)(
  function PasswordInput2({ showToggle = true, showLabel = "Show", hideLabel = "Hide", className, ...rest }, ref) {
    const [visible, setVisible] = (0, import_react17.useState)(false);
    if (!showToggle) {
      return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Input, { ref, type: "password", className, ...rest });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: cx("ms-password", className), children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
        Input,
        {
          ref,
          type: visible ? "text" : "password",
          className: "ms-password__input",
          autoComplete: "current-password",
          ...rest
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
        "button",
        {
          type: "button",
          "aria-pressed": visible,
          onClick: () => setVisible((v) => !v),
          className: "ms-password__toggle",
          children: visible ? hideLabel : showLabel
        }
      )
    ] });
  }
);

// src/NumberInput.tsx
var import_react18 = require("react");
var import_jsx_runtime22 = require("react/jsx-runtime");
var NumberInput = (0, import_react18.forwardRef)(
  function NumberInput2({ value, defaultValue, onValueChange, min = -Infinity, max = Infinity, step = 1, hideStepper, className, disabled, ...rest }, ref) {
    const isControlled = value !== void 0;
    const current = isControlled ? value : defaultValue;
    const clamp = (0, import_react18.useCallback)((n) => Math.max(min, Math.min(max, n)), [min, max]);
    const change = (next) => {
      const c = clamp(next);
      onValueChange?.(c);
    };
    const onChange = (e) => {
      const raw = e.target.value;
      if (raw === "" || raw === "-") return;
      const n = Number(raw);
      if (Number.isFinite(n)) change(n);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: cx("ms-numberinput", disabled && "ms-numberinput--disabled", className), children: [
      !hideStepper && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        "button",
        {
          type: "button",
          "aria-label": "Decrement",
          disabled: disabled || current !== void 0 && current <= min,
          onClick: () => change((current ?? 0) - step),
          className: "ms-numberinput__btn",
          children: "\u2212"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        Input,
        {
          ref,
          type: "number",
          inputMode: "numeric",
          value: current === void 0 ? "" : String(current),
          onChange,
          min: Number.isFinite(min) ? min : void 0,
          max: Number.isFinite(max) ? max : void 0,
          step,
          disabled,
          className: "ms-numberinput__input",
          ...rest
        }
      ),
      !hideStepper && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        "button",
        {
          type: "button",
          "aria-label": "Increment",
          disabled: disabled || current !== void 0 && current >= max,
          onClick: () => change((current ?? 0) + step),
          className: "ms-numberinput__btn",
          children: "+"
        }
      )
    ] });
  }
);

// src/PinInput.tsx
var import_react19 = require("react");
var import_jsx_runtime23 = require("react/jsx-runtime");
var DIGIT_RE = /^[0-9]$/;
var PinInput = (0, import_react19.forwardRef)(function PinInput2({
  length = 6,
  value,
  defaultValue = "",
  onValueChange,
  onComplete,
  mask,
  pattern = DIGIT_RE,
  disabled,
  autoFocus,
  className,
  "aria-label": ariaLabel = "One-time code"
}, ref) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = (0, import_react19.useState)(defaultValue.slice(0, length));
  const current = (isControlled ? value : internal).padEnd(length, "").slice(0, length);
  const inputs = (0, import_react19.useRef)([]);
  (0, import_react19.useEffect)(() => {
    if (autoFocus) inputs.current[0]?.focus();
  }, [autoFocus]);
  const set = (next) => {
    const trimmed = next.replace(/\s+/g, "");
    if (!isControlled) setInternal(trimmed);
    onValueChange?.(trimmed);
    if (trimmed.length === length) onComplete?.(trimmed);
  };
  const onChange = (i, raw) => {
    if (disabled) return;
    const ch = raw.slice(-1);
    if (ch && !pattern.test(ch)) return;
    const arr = current.split("");
    arr[i] = ch;
    const joined = arr.join("").trimEnd();
    set(joined);
    if (ch && i < length - 1) inputs.current[i + 1]?.focus();
  };
  const onKey = (i, e) => {
    if (e.key === "Backspace" && !current[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      inputs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      e.preventDefault();
      inputs.current[i + 1]?.focus();
    }
  };
  const onPaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\s+/g, "").slice(0, length);
    if (!text) return;
    e.preventDefault();
    if ([...text].every((c) => pattern.test(c))) {
      set(text);
      const focusIdx = Math.min(text.length, length - 1);
      inputs.current[focusIdx]?.focus();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { ref, role: "group", "aria-label": ariaLabel, className: cx("ms-pininput", className), children: Array.from({ length }, (_, i) => {
    const v = current[i] || "";
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      "input",
      {
        ref: (el) => {
          inputs.current[i] = el;
        },
        type: mask ? "password" : "text",
        inputMode: "numeric",
        autoComplete: i === 0 ? "one-time-code" : "off",
        maxLength: 1,
        value: v,
        onChange: (e) => onChange(i, e.target.value),
        onKeyDown: (e) => onKey(i, e),
        onPaste,
        disabled,
        "aria-label": `Digit ${i + 1} of ${length}`,
        className: "ms-pininput__cell"
      },
      i
    );
  }) });
});

// src/FileUpload.tsx
var import_react20 = require("react");
var import_jsx_runtime24 = require("react/jsx-runtime");
var FileUpload = (0, import_react20.forwardRef)(function FileUpload2({ files, onFilesChange, accept, multiple, disabled, children, className, "aria-label": ariaLabel = "Upload files" }, ref) {
  const inputRef = (0, import_react20.useRef)(null);
  const [over, setOver] = (0, import_react20.useState)(false);
  const update = (fl) => {
    if (!fl || disabled) return;
    const arr = multiple ? Array.from(fl) : [fl[0]].filter(Boolean);
    onFilesChange?.(arr);
  };
  const onDrop = (e) => {
    e.preventDefault();
    setOver(false);
    update(e.dataTransfer.files);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
    "div",
    {
      ref,
      role: "button",
      tabIndex: disabled ? -1 : 0,
      "aria-disabled": disabled || void 0,
      onClick: () => !disabled && inputRef.current?.click(),
      onKeyDown: (e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      },
      onDragOver: (e) => {
        e.preventDefault();
        setOver(true);
      },
      onDragLeave: () => setOver(false),
      onDrop,
      className: cx("ms-fileupload", over && "ms-fileupload--over", disabled && "ms-fileupload--disabled", className),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          "input",
          {
            ref: inputRef,
            type: "file",
            accept,
            multiple,
            disabled,
            "aria-label": ariaLabel,
            onChange: (e) => update(e.target.files),
            className: "ms-fileupload__input",
            tabIndex: -1
          }
        ),
        children ?? /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "ms-fileupload__hint", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "ms-fileupload__title", children: files && files.length > 0 ? files.length === 1 ? files[0].name : `${files.length} files selected` : "Drop a file or click to upload" }),
          (!files || files.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "ms-fileupload__sub", children: accept ? accept : "Any file type" })
        ] })
      ]
    }
  );
});

// src/Stepper.tsx
var import_react21 = require("react");
var import_jsx_runtime25 = require("react/jsx-runtime");
var Stepper = (0, import_react21.forwardRef)(function Stepper2({ steps, current, className, "aria-label": ariaLabel = "Progress" }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("ol", { ref, "aria-label": ariaLabel, className: cx("ms-stepper", className), children: steps.map((step, i) => {
    const state = i < current ? "done" : i === current ? "current" : "pending";
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("li", { className: cx("ms-stepper__step", `ms-stepper__step--${state}`), children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "ms-stepper__dot", "aria-current": state === "current" ? "step" : void 0, children: state === "done" ? "\u2713" : i + 1 }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "ms-stepper__body", children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "ms-stepper__label", children: step.label }),
        step.description && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "ms-stepper__desc", children: step.description })
      ] }),
      i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "ms-stepper__connector", "aria-hidden": true })
    ] }, i);
  }) });
});

// src/NavigationMenu.tsx
var RNav = __toESM(require("@radix-ui/react-navigation-menu"), 1);
var import_react22 = require("react");
var import_jsx_runtime26 = require("react/jsx-runtime");
var NavigationMenu = RNav.Root;
var NavigationMenuList = RNav.List;
var NavigationMenuItem = (0, import_react22.forwardRef)(
  function NavigationMenuItem2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(RNav.Item, { ref, className: cx("ms-nav-item", className), ...rest });
  }
);
var NavigationMenuTrigger = (0, import_react22.forwardRef)(
  function NavigationMenuTrigger2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(RNav.Trigger, { ref, className: cx("ms-nav-trigger", className), ...rest, children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "ms-nav-caret", "aria-hidden": true, children: "\u25BE" })
    ] });
  }
);
var NavigationMenuContent = (0, import_react22.forwardRef)(
  function NavigationMenuContent2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(RNav.Content, { ref, className: cx("ms-nav-content", className), ...rest, children });
  }
);
var NavigationMenuLink = (0, import_react22.forwardRef)(
  function NavigationMenuLink2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(RNav.Link, { ref, className: cx("ms-nav-link", className), ...rest, children });
  }
);

// src/ContextMenu.tsx
var RCtx = __toESM(require("@radix-ui/react-context-menu"), 1);
var import_react23 = require("react");
var import_jsx_runtime27 = require("react/jsx-runtime");
var ContextMenu = RCtx.Root;
var ContextMenuTrigger = RCtx.Trigger;
var ContextMenuContent = (0, import_react23.forwardRef)(
  function ContextMenuContent2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RCtx.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RCtx.Content, { ref, className: cx("ms-menu", className), ...rest, children }) });
  }
);
var ContextMenuItem = (0, import_react23.forwardRef)(
  function ContextMenuItem2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RCtx.Item, { ref, className: cx("ms-menu__item", className), ...rest });
  }
);
var ContextMenuLabel = (0, import_react23.forwardRef)(
  function ContextMenuLabel2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RCtx.Label, { ref, className: cx("ms-menu__label", className), ...rest });
  }
);
var ContextMenuSeparator = (0, import_react23.forwardRef)(
  function ContextMenuSeparator2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RCtx.Separator, { ref, className: cx("ms-menu__separator", className), ...rest });
  }
);

// src/Carousel.tsx
var import_react24 = require("react");
var import_jsx_runtime28 = require("react/jsx-runtime");
var Carousel = (0, import_react24.forwardRef)(function Carousel2({ children, index, defaultIndex = 0, onIndexChange, showArrows = true, showDots = true, autoplay, className, "aria-label": ariaLabel = "Carousel" }, ref) {
  const isControlled = index !== void 0;
  const [internal, setInternal] = (0, import_react24.useState)(defaultIndex);
  const current = isControlled ? index : internal;
  const trackRef = (0, import_react24.useRef)(null);
  const slides = Array.isArray(children) ? children : [children];
  const goTo = (next) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, next));
    if (!isControlled) setInternal(clamped);
    onIndexChange?.(clamped);
  };
  (0, import_react24.useEffect)(() => {
    const t = trackRef.current;
    if (!t) return;
    const slide = t.children[current];
    slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, [current]);
  (0, import_react24.useEffect)(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, autoplay);
    return () => clearInterval(id);
  }, [current, autoplay, slides.length]);
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { ref, "aria-roledescription": "carousel", "aria-label": ariaLabel, className: cx("ms-carousel", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { ref: trackRef, className: "ms-carousel__track", children: slides.map((child, i) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
      "div",
      {
        role: "group",
        "aria-roledescription": "slide",
        "aria-label": `${i + 1} of ${slides.length}`,
        "aria-current": i === current,
        className: "ms-carousel__slide",
        children: child
      },
      i
    )) }),
    showArrows && slides.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_jsx_runtime28.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
        "button",
        {
          type: "button",
          "aria-label": "Previous slide",
          disabled: current === 0,
          onClick: () => goTo(current - 1),
          className: "ms-carousel__arrow ms-carousel__arrow--prev",
          children: "\u2039"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
        "button",
        {
          type: "button",
          "aria-label": "Next slide",
          disabled: current === slides.length - 1,
          onClick: () => goTo(current + 1),
          className: "ms-carousel__arrow ms-carousel__arrow--next",
          children: "\u203A"
        }
      )
    ] }),
    showDots && slides.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "ms-carousel__dots", role: "tablist", children: slides.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
      "button",
      {
        role: "tab",
        "aria-selected": i === current,
        "aria-label": `Go to slide ${i + 1}`,
        onClick: () => goTo(i),
        className: cx("ms-carousel__dot", i === current && "ms-carousel__dot--active")
      },
      i
    )) })
  ] });
});

// src/DatePicker.tsx
var RPopover3 = __toESM(require("@radix-ui/react-popover"), 1);
var import_react25 = require("react");
var import_jsx_runtime29 = require("react/jsx-runtime");
var WEEKDAYS_FALLBACK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function startOfDay(d) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function addMonths(d, n) {
  const c = new Date(d);
  c.setMonth(c.getMonth() + n);
  return c;
}
function defaultFormat(d, locale) {
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}
var DatePicker = (0, import_react25.forwardRef)(
  function DatePicker2({ value, defaultValue, onValueChange, min, max, locale, placeholder = "Pick a date", disabled, id, className, format = (d) => defaultFormat(d, locale), ...ariaProps }, ref) {
    const isControlled = value !== void 0;
    const [internal, setInternal] = (0, import_react25.useState)(defaultValue ?? null);
    const selected = isControlled ? value ?? null : internal;
    const [open, setOpen] = (0, import_react25.useState)(false);
    const [view, setView] = (0, import_react25.useState)(() => selected || /* @__PURE__ */ new Date());
    const popId = (0, import_react25.useId)();
    const set = (d) => {
      if (!isControlled) setInternal(d);
      onValueChange?.(d);
    };
    const isDisabled = (d) => {
      if (min && startOfDay(d) < startOfDay(min)) return true;
      if (max && startOfDay(d) > startOfDay(max)) return true;
      return false;
    };
    const firstOfMonth = new Date(view.getFullYear(), view.getMonth(), 1);
    const startWeekday = (firstOfMonth.getDay() + 6) % 7;
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(firstOfMonth.getDate() - startWeekday);
    const days = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      days.push(d);
    }
    const monthLabel = view.toLocaleDateString(locale, { month: "long", year: "numeric" });
    const today = startOfDay(/* @__PURE__ */ new Date());
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(RPopover3.Root, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(RPopover3.Trigger, { asChild: true, disabled, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
        "button",
        {
          ref,
          id,
          type: "button",
          disabled,
          className: cx("ms-combobox__trigger", "ms-datepicker__trigger", className),
          ...ariaProps,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: cx("ms-combobox__value", !selected && "ms-combobox__value--placeholder"), children: selected ? format(selected) : placeholder }),
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(CalendarIcon, {})
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(RPopover3.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
        RPopover3.Content,
        {
          id: popId,
          sideOffset: 6,
          align: "start",
          className: "ms-datepicker__panel",
          onOpenAutoFocus: (e) => e.preventDefault(),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "ms-datepicker__header", children: [
              /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("button", { type: "button", "aria-label": "Previous month", onClick: () => setView((v) => addMonths(v, -1)), className: "ms-datepicker__nav", children: "\u2039" }),
              /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: "ms-datepicker__month", children: monthLabel }),
              /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("button", { type: "button", "aria-label": "Next month", onClick: () => setView((v) => addMonths(v, 1)), className: "ms-datepicker__nav", children: "\u203A" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "ms-datepicker__weekdays", "aria-hidden": true, children: WEEKDAYS_FALLBACK.map((w) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { children: w }, w)) }),
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { role: "grid", "aria-label": monthLabel, className: "ms-datepicker__grid", children: days.map((d) => {
              const inMonth = d.getMonth() === view.getMonth();
              const isSelected = selected && sameDay(d, selected);
              const isToday = sameDay(d, today);
              const off = isDisabled(d);
              return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                "button",
                {
                  type: "button",
                  role: "gridcell",
                  "aria-selected": !!isSelected,
                  "aria-current": isToday ? "date" : void 0,
                  disabled: off,
                  onClick: () => {
                    set(d);
                    setOpen(false);
                  },
                  className: cx(
                    "ms-datepicker__cell",
                    !inMonth && "ms-datepicker__cell--outside",
                    isSelected && "ms-datepicker__cell--selected",
                    isToday && "ms-datepicker__cell--today"
                  ),
                  children: d.getDate()
                },
                d.toISOString()
              );
            }) }),
            selected && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "ms-datepicker__footer", children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("button", { type: "button", onClick: () => {
              set(null);
              setOpen(false);
            }, className: "ms-datepicker__clear", children: "Clear" }) })
          ]
        }
      ) })
    ] });
  }
);
function CalendarIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("path", { d: "M16 2v4M8 2v4M3 10h18" })
  ] });
}

// src/Tooltip.tsx
var RTooltip = __toESM(require("@radix-ui/react-tooltip"), 1);
var import_jsx_runtime30 = require("react/jsx-runtime");
function TooltipProvider({ children, delayDuration = 300 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RTooltip.Provider, { delayDuration, children });
}
function Tooltip({ content, side = "top", children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(RTooltip.Root, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RTooltip.Trigger, { asChild: true, children }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RTooltip.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RTooltip.Content, { side, sideOffset: 6, className: cx("ms-tooltip"), children: content }) })
  ] });
}

// src/Popover.tsx
var RPopover4 = __toESM(require("@radix-ui/react-popover"), 1);
var import_jsx_runtime31 = require("react/jsx-runtime");
var Popover = RPopover4.Root;
var PopoverTrigger = RPopover4.Trigger;
var PopoverClose = RPopover4.Close;
function PopoverContent({ className, children, sideOffset = 6, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(RPopover4.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(RPopover4.Content, { sideOffset, className: cx("ms-popover", className), ...rest, children }) });
}

// src/DropdownMenu.tsx
var RDropdown = __toESM(require("@radix-ui/react-dropdown-menu"), 1);
var import_jsx_runtime32 = require("react/jsx-runtime");
var DropdownMenu = RDropdown.Root;
var DropdownMenuTrigger = RDropdown.Trigger;
function DropdownMenuContent({ children, className, sideOffset = 6, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(RDropdown.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(RDropdown.Content, { sideOffset, className: cx("ms-menu", className), ...rest, children }) });
}
function DropdownMenuItem({ className, children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(RDropdown.Item, { className: cx("ms-menu__item", className), ...rest, children });
}
function DropdownMenuLabel({ className, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(RDropdown.Label, { className: cx("ms-menu__label", className), children });
}
function DropdownMenuSeparator() {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(RDropdown.Separator, { className: "ms-menu__separator" });
}

// src/Select.tsx
var RSelect = __toESM(require("@radix-ui/react-select"), 1);
var import_react26 = require("react");
var import_jsx_runtime33 = require("react/jsx-runtime");
var Select = RSelect.Root;
var SelectTrigger = (0, import_react26.forwardRef)(function SelectTrigger2({ className, placeholder, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(RSelect.Trigger, { ref, className: cx("ms-select", className), ...rest, children: [
    children ?? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.Value, { placeholder }),
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.Icon, { "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("path", { d: "m6 9 6 6 6-6" }) }) })
  ] });
});
function SelectContent({ children, className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.Content, { className: cx("ms-menu", className), position: "popper", sideOffset: 6, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.Viewport, { children }) }) });
}
var SelectItem = (0, import_react26.forwardRef)(
  function SelectItem2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.Item, { ref, className: cx("ms-menu__item", className), ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.ItemText, { children }) });
  }
);

// src/Skeleton.tsx
var import_react27 = require("react");
var import_jsx_runtime34 = require("react/jsx-runtime");
var Skeleton = (0, import_react27.forwardRef)(function Skeleton2({ width = "100%", height = 12, circle, style, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
var import_jsx_runtime35 = require("react/jsx-runtime");
function EmptyState({ icon, title, body, action, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { className: cx("ms-empty", className), children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "ms-empty__icon", "aria-hidden": true, children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "ms-empty__title", children: title }),
    body && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "ms-empty__body", children: body }),
    action
  ] });
}

// src/Pagination.tsx
var import_jsx_runtime36 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("nav", { "aria-label": "Pagination", className: cx("ms-pagination", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
      (p, i) => p === "\u2026" ? /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("span", { className: "ms-pagination__btn", "aria-hidden": true, children: "\u2026" }, `e-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
var import_react28 = require("react");
var import_jsx_runtime37 = require("react/jsx-runtime");
function Breadcrumb({ items, separator = "/", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("nav", { "aria-label": "Breadcrumb", className: cx("ms-breadcrumb", className), children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_react28.Fragment, { children: [
    i > 0 && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "ms-breadcrumb__sep", "aria-hidden": true, children: separator }),
    it.href && !it.current ? /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("a", { href: it.href, className: "ms-breadcrumb__item", children: it.label }) : /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "ms-breadcrumb__item", "aria-current": it.current ? "page" : void 0, children: it.label })
  ] }, i)) });
}

// src/Progress.tsx
var RProgress = __toESM(require("@radix-ui/react-progress"), 1);
var import_jsx_runtime38 = require("react/jsx-runtime");
function Progress({
  value,
  max = 100,
  indeterminate,
  className,
  "aria-label": ariaLabel = "Progress"
}) {
  const pct = indeterminate ? void 0 : Math.min(100, Math.max(0, (value ?? 0) / max * 100));
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(RProgress.Root, { value: indeterminate ? null : value ?? 0, max, "aria-label": ariaLabel, className: cx("ms-progress", className), children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
    RProgress.Indicator,
    {
      className: "ms-progress__indicator",
      style: indeterminate ? { width: "40%", animation: "ms-indeterminate 1.4s infinite" } : { width: `${pct}%` }
    }
  ) });
}

// src/Separator.tsx
var RSeparator = __toESM(require("@radix-ui/react-separator"), 1);
var import_jsx_runtime39 = require("react/jsx-runtime");
function Separator3({ className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(RSeparator.Root, { className: cx("ms-separator", className), ...rest });
}

// src/Layout.tsx
var import_react29 = require("react");
var import_jsx_runtime40 = require("react/jsx-runtime");
var Stack = (0, import_react29.forwardRef)(function Stack2({ gap = 4, align, style, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
var Inline = (0, import_react29.forwardRef)(function Inline2({ gap = 4, align, wrap = true, style, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
var Grid = (0, import_react29.forwardRef)(function Grid2({ columns, minWidth = 240, gap = 4, style, className, ...rest }, ref) {
  const min = typeof minWidth === "number" ? `${minWidth}px` : minWidth;
  const template = columns ? `repeat(${columns}, 1fr)` : `repeat(auto-fit, minmax(${min}, 1fr))`;
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
var Container = (0, import_react29.forwardRef)(function Container2({ size = "lg", padding = true, style, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
var import_react30 = require("react");
var import_jsx_runtime41 = require("react/jsx-runtime");
var Kbd = (0, import_react30.forwardRef)(function Kbd2({ size = "md", className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("kbd", { ref, className: cx("ms-kbd", `ms-kbd--${size}`, className), ...rest });
});

// src/Spinner.tsx
var import_react31 = require("react");
var import_jsx_runtime42 = require("react/jsx-runtime");
var Spinner = (0, import_react31.forwardRef)(function Spinner2({ size = 16, label = "Loading", className, style, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var import_react32 = require("react");
var import_jsx_runtime43 = require("react/jsx-runtime");
var Accordion = RAccordion.Root;
var AccordionItem = (0, import_react32.forwardRef)(function AccordionItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(RAccordion.Item, { ref, className: cx("ms-accordion__item", className), ...rest });
});
var AccordionTrigger = (0, import_react32.forwardRef)(function AccordionTrigger2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(RAccordion.Header, { className: "ms-accordion__header", children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(RAccordion.Trigger, { ref, className: cx("ms-accordion__trigger", className), ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { children }),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("polyline", { points: "6 9 12 15 18 9" })
      }
    )
  ] }) });
});
var AccordionContent = (0, import_react32.forwardRef)(function AccordionContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(RAccordion.Content, { ref, className: cx("ms-accordion__content", className), ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "ms-accordion__content-inner", children }) });
});

// src/Slider.tsx
var RSlider = __toESM(require("@radix-ui/react-slider"), 1);
var import_react33 = require("react");
var import_jsx_runtime44 = require("react/jsx-runtime");
var Slider = (0, import_react33.forwardRef)(function Slider2({ className, defaultValue = [50], value, ...rest }, ref) {
  const thumbs = value ?? defaultValue;
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
    RSlider.Root,
    {
      ref,
      className: cx("ms-slider", className),
      defaultValue,
      value,
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(RSlider.Track, { className: "ms-slider__track", children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(RSlider.Range, { className: "ms-slider__range" }) }),
        thumbs.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(RSlider.Thumb, { className: "ms-slider__thumb", "aria-label": `Value ${i + 1}` }, i))
      ]
    }
  );
});

// src/ToggleGroup.tsx
var RToggleGroup = __toESM(require("@radix-ui/react-toggle-group"), 1);
var RToggle = __toESM(require("@radix-ui/react-toggle"), 1);
var import_react34 = require("react");
var import_jsx_runtime45 = require("react/jsx-runtime");
var Toggle = (0, import_react34.forwardRef)(function Toggle2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(RToggle.Root, { ref, className: cx("ms-toggle", className), ...rest });
});
var ToggleGroup = (0, import_react34.forwardRef)(function ToggleGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(RToggleGroup.Root, { ref, className: cx("ms-toggle-group", className), ...rest });
});
var ToggleGroupItem = (0, import_react34.forwardRef)(function ToggleGroupItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(RToggleGroup.Item, { ref, className: cx("ms-toggle", className), ...rest });
});

// src/MonosetProvider.tsx
var import_framer_motion3 = require("framer-motion");

// src/Theme.tsx
var import_react35 = require("react");
var import_jsx_runtime46 = require("react/jsx-runtime");
var ThemeCtx = (0, import_react35.createContext)(null);
function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "monoset-theme"
}) {
  const [theme, setThemeState] = (0, import_react35.useState)(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
    return defaultTheme;
  });
  const [systemTheme, setSystemTheme] = (0, import_react35.useState)(getSystemTheme);
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const setTheme = (0, import_react35.useCallback)(
    (next) => {
      setThemeState(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
      }
    },
    [storageKey]
  );
  (0, import_react35.useEffect)(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  (0, import_react35.useEffect)(() => {
    const root = document.documentElement;
    root.setAttribute("data-monoset-theme", resolvedTheme);
    root.classList.toggle("monoset-dark", resolvedTheme === "dark");
  }, [resolvedTheme]);
  const value = (0, import_react35.useMemo)(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(ThemeCtx.Provider, { value, children });
}
function useTheme() {
  const ctx = (0, import_react35.useContext)(ThemeCtx);
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
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("circle", { cx: "8", cy: "8", r: "3", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("rect", { x: "2", y: "2.5", width: "12", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("path", { d: "M5.5 13.5h5M8 10.5v3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
var ICON = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon
};
var ThemeToggle = (0, import_react35.forwardRef)(
  function ThemeToggle2({ className, ...rest }, ref) {
    const { theme, setTheme } = useTheme();
    const Icon2 = ICON[theme];
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
      "button",
      {
        ref,
        type: "button",
        "aria-label": LABEL[theme],
        className: cx("ms-btn", "ms-btn--ghost", "ms-btn--sm", className),
        onClick: () => setTheme(NEXT[theme]),
        ...rest,
        children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Icon2, {})
      }
    );
  }
);

// src/MonosetProvider.tsx
var import_jsx_runtime47 = require("react/jsx-runtime");
function MonosetProvider({
  children,
  reducedMotion = "user",
  tooltipDelay = 300,
  defaultTheme
}) {
  const inner = /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_framer_motion3.MotionConfig, { reducedMotion, children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(TooltipProvider, { delayDuration: tooltipDelay, children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(ToastProvider, { children }) }) });
  if (defaultTheme) {
    return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(ThemeProvider, { defaultTheme, children: inner });
  }
  return inner;
}

// src/index.ts
var import_motion4 = require("@monoset/motion");

// src/Motion.tsx
var import_react36 = require("react");
var import_framer_motion4 = require("framer-motion");
var import_motion3 = require("@monoset/motion");
var import_jsx_runtime48 = require("react/jsx-runtime");
var Reveal = (0, import_react36.forwardRef)(
  ({
    children,
    variant = import_motion3.fadeUp,
    once = true,
    margin = "-80px",
    delay = 0,
    className,
    style
  }, forwardedRef) => {
    const localRef = (0, import_react36.useRef)(null);
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
    return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
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
var StaggerList = (0, import_react36.forwardRef)(
  ({
    children,
    stagger = 0.04,
    once = true,
    margin = "-80px",
    className,
    style
  }, forwardedRef) => {
    const localRef = (0, import_react36.useRef)(null);
    const ref = forwardedRef ?? localRef;
    const inView = (0, import_framer_motion4.useInView)(ref, { once, margin });
    const containerVariants = {
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger }
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
      import_framer_motion4.motion.div,
      {
        ref,
        initial: "hidden",
        animate: inView ? "visible" : "hidden",
        variants: containerVariants,
        className,
        style,
        children: import_react36.Children.map(children, (child) => /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_framer_motion4.motion.div, { variants: childVariants, children: child }))
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
  AppShell,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Checkbox,
  Combobox,
  CommandPalette,
  Container,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DUR,
  DatePicker,
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
  FileUpload,
  Form,
  Grid,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Inline,
  Input,
  Kbd,
  MonosetProvider,
  MultiCombobox,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NumberInput,
  Pagination,
  PasswordInput,
  PinInput,
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
  Stepper,
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
  useAppShellMobile,
  useMonosetForm,
  useTheme
});
//# sourceMappingURL=index.cjs.map