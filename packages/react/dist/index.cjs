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
var src_exports = {};
__export(src_exports, {
  Accordion: () => Accordion,
  AccordionContent: () => AccordionContent,
  AccordionItem: () => AccordionItem,
  AccordionTrigger: () => AccordionTrigger,
  Alert: () => Alert,
  AppShell: () => AppShell,
  AspectRatio: () => AspectRatio,
  Avatar: () => Avatar,
  Badge: () => Badge,
  Breadcrumb: () => Breadcrumb,
  Button: () => Button,
  Calendar: () => Calendar,
  CalendarDate: () => import_date2.CalendarDate,
  Card: () => Card,
  Carousel: () => Carousel,
  Checkbox: () => Checkbox,
  Collapsible: () => Collapsible,
  CollapsibleContent: () => CollapsibleContent,
  CollapsibleTrigger: () => CollapsibleTrigger,
  Combobox: () => Combobox,
  CommandPalette: () => CommandPalette,
  Container: () => Container,
  ContextMenu: () => ContextMenu,
  ContextMenuCheckboxItem: () => ContextMenuCheckboxItem,
  ContextMenuContent: () => ContextMenuContent,
  ContextMenuGroup: () => ContextMenuGroup,
  ContextMenuItem: () => ContextMenuItem,
  ContextMenuItemIndicator: () => ContextMenuItemIndicator,
  ContextMenuLabel: () => ContextMenuLabel,
  ContextMenuRadioGroup: () => ContextMenuRadioGroup,
  ContextMenuRadioItem: () => ContextMenuRadioItem,
  ContextMenuSeparator: () => ContextMenuSeparator,
  ContextMenuSub: () => ContextMenuSub,
  ContextMenuSubContent: () => ContextMenuSubContent,
  ContextMenuSubTrigger: () => ContextMenuSubTrigger,
  ContextMenuTrigger: () => ContextMenuTrigger,
  DatePicker: () => DatePicker,
  Dialog: () => Dialog,
  DialogClose: () => DialogClose,
  DialogContent: () => DialogContent,
  DialogTrigger: () => DialogTrigger,
  DropdownMenu: () => DropdownMenu,
  DropdownMenuCheckboxItem: () => DropdownMenuCheckboxItem,
  DropdownMenuContent: () => DropdownMenuContent,
  DropdownMenuGroup: () => DropdownMenuGroup,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuItemIndicator: () => DropdownMenuItemIndicator,
  DropdownMenuLabel: () => DropdownMenuLabel,
  DropdownMenuRadioGroup: () => DropdownMenuRadioGroup,
  DropdownMenuRadioItem: () => DropdownMenuRadioItem,
  DropdownMenuSeparator: () => DropdownMenuSeparator,
  DropdownMenuSub: () => DropdownMenuSub,
  DropdownMenuSubContent: () => DropdownMenuSubContent,
  DropdownMenuSubTrigger: () => DropdownMenuSubTrigger,
  DropdownMenuTrigger: () => DropdownMenuTrigger,
  EmptyState: () => EmptyState,
  Field: () => Field2,
  FileUpload: () => FileUpload,
  Grid: () => Grid2,
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
  NavigationMenuIndicator: () => NavigationMenuIndicator,
  NavigationMenuItem: () => NavigationMenuItem,
  NavigationMenuLink: () => NavigationMenuLink,
  NavigationMenuList: () => NavigationMenuList,
  NavigationMenuTrigger: () => NavigationMenuTrigger,
  NavigationMenuViewport: () => NavigationMenuViewport,
  NumberInput: () => NumberInput,
  Pagination: () => Pagination,
  PasswordInput: () => PasswordInput,
  PinInput: () => PinInput,
  Popover: () => Popover4,
  PopoverClose: () => PopoverClose,
  PopoverContent: () => PopoverContent,
  PopoverTrigger: () => PopoverTrigger,
  Progress: () => Progress,
  Radio: () => Radio,
  RadioGroup: () => RadioGroup,
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
  calendarDateFromNativeDate: () => calendarDateFromNativeDate,
  calendarDateToNativeDate: () => calendarDateToNativeDate,
  cx: () => cx,
  useAppShellMobile: () => useAppShellMobile,
  useTheme: () => useTheme,
  useToast: () => useToast
});
module.exports = __toCommonJS(src_exports);

// src/Button.tsx
var import_react2 = require("react");

// src/cx.ts
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

// src/ReducedMotionContext.ts
var import_react = require("react");
var ReducedMotionPreferenceContext = (0, import_react.createContext)("user");

// src/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var reducedMotionQuery = "(prefers-reduced-motion: reduce)";
var subscribeToHydration = () => () => {
};
var getHydratedSnapshot = () => true;
var getServerHydratedSnapshot = () => false;
function subscribeToReducedMotion(onStoreChange) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {
    };
  }
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}
function getReducedMotionSnapshot() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(reducedMotionQuery).matches : false;
}
function LoadingSpinner() {
  const hydrated = (0, import_react2.useSyncExternalStore)(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerHydratedSnapshot
  );
  const prefersReducedMotion = (0, import_react2.useSyncExternalStore)(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => true
  );
  const reducedMotion = (0, import_react2.useContext)(ReducedMotionPreferenceContext);
  const reduceMotion = reducedMotion === "always" || reducedMotion !== "never" && prefersReducedMotion;
  const animate = hydrated && !reduceMotion;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "9", opacity: "0.25" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12a9 9 0 0 1-9 9", children: animate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateTransform", { attributeName: "transform", type: "rotate", from: "0 12 12", to: "360 12 12", dur: "0.9s", repeatCount: "indefinite" }) })
  ] });
}
var Button = (0, import_react2.forwardRef)(function Button2({
  variant = "secondary",
  size = "md",
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled,
  "aria-busy": ariaBusy,
  className,
  children,
  type = "button",
  ...rest
}, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      ...rest,
      ref,
      type,
      disabled: disabled || loading,
      "aria-busy": loading ? true : ariaBusy,
      className: cx("ms-btn", `ms-btn--${variant}`, `ms-btn--${size}`, className),
      children: [
        loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSpinner, {}) : leadingIcon,
        children,
        !loading && trailingIcon
      ]
    }
  );
});

// src/Badge.tsx
var import_react3 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var Badge = (0, import_react3.forwardRef)(function Badge2({ variant = "neutral", className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { ref, className: cx("ms-badge", `ms-badge--${variant}`, className), ...rest });
});

// src/Avatar.tsx
var RAvatar = __toESM(require("@radix-ui/react-avatar"), 1);
var import_react4 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function getInitials(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}
var Avatar = (0, import_react4.forwardRef)(function Avatar2({ size = "md", name, initials, src, alt, decorative = false, className, ...rest }, ref) {
  const normalizedName = typeof name === "string" ? name.trim() : "";
  if (!decorative && !normalizedName) {
    throw new Error("Avatar requires a non-empty name unless decorative.");
  }
  const fallback = (initials?.trim() || getInitials(normalizedName)).slice(0, 2).toUpperCase();
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    RAvatar.Root,
    {
      ...rest,
      ref,
      role: decorative ? void 0 : "img",
      "aria-label": decorative ? void 0 : alt?.trim() || normalizedName,
      "aria-hidden": decorative || void 0,
      className: cx("ms-avatar", `ms-avatar--${size}`, className),
      children: [
        src && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(RAvatar.Image, { src, alt: "", "aria-hidden": true, className: "ms-avatar__img" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(RAvatar.Fallback, { delayMs: src ? 200 : void 0, "aria-hidden": true, children: fallback })
      ]
    }
  );
});

// src/Card.tsx
var import_react_slot = require("@radix-ui/react-slot");
var import_react5 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var htmlElementTags = new Set(
  "a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p picture pre progress q rp rt ruby s samp script search section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr".split(" ")
);
var Card = (0, import_react5.forwardRef)(function Card2({ variant = "outline", asChild = false, className, children, ...rest }, ref) {
  const classes = cx(
    "ms-card",
    variant === "elevated" && "ms-card--elevated",
    variant === "inset" && "ms-card--inset",
    className
  );
  if (asChild) {
    if (!(0, import_react5.isValidElement)(children) || typeof children.type !== "string" || !htmlElementTags.has(children.type)) {
      throw new Error("Card asChild requires exactly one intrinsic HTML element.");
    }
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_slot.Slot, { ref, className: classes, ...rest, children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_slot.Slot, { ref, className: classes, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children }) });
});

// src/Alert.tsx
var import_react6 = require("react");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var Alert = (0, import_react6.forwardRef)(function Alert2({ title, icon, urgent, className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "div",
    {
      ...rest,
      ref,
      role: urgent ? "alert" : "status",
      "aria-live": urgent ? "assertive" : "polite",
      className: cx("ms-alert", className),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ms-alert__icon", "aria-hidden": true, children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react.Info, { size: 16, strokeWidth: 2 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "ms-alert__title", children: title }),
          children && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "ms-alert__msg", children })
        ] })
      ]
    }
  );
});

// src/Input.tsx
var import_react7 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var FieldContext = (0, import_react7.createContext)(null);
function mergeTokens(...values) {
  const tokens = values.flatMap((value) => value?.split(/\s+/).filter(Boolean) ?? []);
  return tokens.length > 0 ? [...new Set(tokens)].join(" ") : void 0;
}
var Input = (0, import_react7.forwardRef)(function Input2({
  invalid,
  className,
  id,
  required,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...rest
}, ref) {
  const field = (0, import_react7.useContext)(FieldContext);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "input",
    {
      ...rest,
      ref,
      id: field?.id ?? id,
      required: field?.required || required,
      "aria-describedby": mergeTokens(ariaDescribedBy, field?.describedBy),
      "aria-invalid": field?.invalid ? true : invalid ? true : ariaInvalid,
      className: cx("ms-input", className)
    }
  );
});
var Textarea = (0, import_react7.forwardRef)(function Textarea2({
  invalid,
  className,
  rows = 4,
  id,
  required,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...rest
}, ref) {
  const field = (0, import_react7.useContext)(FieldContext);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "textarea",
    {
      ...rest,
      ref,
      rows,
      id: field?.id ?? id,
      required: field?.required || required,
      "aria-describedby": mergeTokens(ariaDescribedBy, field?.describedBy),
      "aria-invalid": field?.invalid ? true : invalid ? true : ariaInvalid,
      className: cx("ms-input", className)
    }
  );
});
function FieldControl({ children }) {
  const field = (0, import_react7.useContext)(FieldContext);
  if (!field) {
    throw new Error("Field.Control must be used within Field");
  }
  return children({
    id: field.id,
    "aria-labelledby": field.labelId,
    "aria-describedby": field.describedBy,
    "aria-invalid": field.invalid ? true : void 0,
    required: field.required ? true : void 0
  });
}
var FieldRoot = (0, import_react7.forwardRef)(function Field({
  label,
  description,
  error,
  children,
  id: idProp,
  rootId,
  required = false,
  invalid: invalidProp = false,
  className,
  ...rest
}, ref) {
  const generatedId = (0, import_react7.useId)();
  const id = idProp ?? `ms-field-${generatedId}`;
  const labelId = `${id}-label`;
  const hasDescription = description !== void 0 && description !== null && description !== false;
  const hasError = error !== void 0 && error !== null && error !== false;
  const descriptionId = hasDescription ? `${id}-description` : void 0;
  const errorId = hasError ? `${id}-error` : void 0;
  const describedBy = mergeTokens(descriptionId, errorId);
  const invalid = invalidProp || hasError;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { ...rest, ref, id: rootId, className: cx("ms-field", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "label",
      {
        id: labelId,
        className: "ms-field__label",
        htmlFor: id,
        onClick: (event) => {
          const control = document.getElementById(id);
          if (control instanceof HTMLElement && !control.matches("input, textarea, select, button")) {
            event.preventDefault();
            control.querySelector("[tabindex]:not([tabindex='-1'])")?.focus();
          }
        },
        children: label
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FieldContext.Provider, { value: { id, labelId, describedBy, invalid, required }, children }),
    hasDescription && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { id: descriptionId, className: "ms-field__description", children: description }),
    hasError && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { id: errorId, role: "alert", className: "ms-field__error", children: error })
  ] });
});
var Field2 = Object.assign(FieldRoot, { Control: FieldControl });

// src/Checkbox.tsx
var RCheckbox = __toESM(require("@radix-ui/react-checkbox"), 1);
var import_react8 = require("react");
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime7 = require("react/jsx-runtime");
var Checkbox = (0, import_react8.forwardRef)(function Checkbox2({ label, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: cx("ms-check", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      RCheckbox.Root,
      {
        ref,
        className: "ms-check__box",
        ...rest,
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(RCheckbox.Indicator, { forceMount: true, "aria-hidden": true, className: "ms-check__indicator", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            import_lucide_react2.Check,
            {
              size: 11,
              strokeWidth: 2,
              className: "ms-check__visual ms-check__visual--checked",
              "data-check-visual": "checked"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            import_lucide_react2.Minus,
            {
              size: 11,
              strokeWidth: 2,
              className: "ms-check__visual ms-check__visual--indeterminate",
              "data-check-visual": "indeterminate"
            }
          )
        ] })
      }
    ),
    label && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: label })
  ] });
});

// src/Switch.tsx
var RSwitch = __toESM(require("@radix-ui/react-switch"), 1);
var import_react9 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var Switch = (0, import_react9.forwardRef)(function Switch2({ label, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("label", { className: cx("ms-switch", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      RSwitch.Root,
      {
        ref,
        className: "ms-switch__track",
        ...rest,
        children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(RSwitch.Thumb, { className: "ms-switch__thumb" })
      }
    ),
    label && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: label })
  ] });
});

// src/RadioGroup.tsx
var RRadio = __toESM(require("@radix-ui/react-radio-group"), 1);
var import_react10 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime");
var RadioGroup = (0, import_react10.forwardRef)(function RadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(RRadio.Root, { ref, className: cx("ms-radio-group", className), ...rest });
});
var Radio = (0, import_react10.forwardRef)(function Radio2({ label, className, value, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { className: cx("ms-radio", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(RRadio.Item, { ref, value, className: "ms-radio__dot", ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(RRadio.Indicator, {}) }),
    label && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: label })
  ] });
});

// src/Tabs.tsx
var RTabs = __toESM(require("@radix-ui/react-tabs"), 1);
var import_react11 = require("react");
var import_framer_motion = require("framer-motion");
var import_motion = require("@monoset/motion");
var import_jsx_runtime10 = require("react/jsx-runtime");
var Tabs = RTabs.Root;
function setRef(ref, value) {
  if (typeof ref === "function") ref(value);
  else if (ref && typeof ref === "object") ref.current = value;
}
var TabsList = (0, import_react11.forwardRef)(function TabsList2({ className, children, ...rest }, ref) {
  const listRef = (0, import_react11.useRef)(null);
  const [rect, setRect] = (0, import_react11.useState)(null);
  const reduceMotion = (0, import_framer_motion.useReducedMotionConfig)();
  (0, import_react11.useEffect)(() => {
    const list = listRef.current;
    if (!list || typeof MutationObserver === "undefined" || typeof ResizeObserver === "undefined") {
      return;
    }
    let cancelled = false;
    const update = () => {
      if (cancelled) return;
      const active = list.querySelector('[role="tab"][data-state="active"]');
      if (!active) {
        setRect(null);
        return;
      }
      const next = { left: active.offsetLeft, width: active.offsetWidth };
      setRect(
        (previous) => previous?.left === next.left && previous.width === next.width ? previous : next
      );
    };
    const ro = new ResizeObserver(update);
    const observed = /* @__PURE__ */ new Set();
    const syncResizeObservers = () => {
      const next = /* @__PURE__ */ new Set([list, ...list.querySelectorAll('[role="tab"]')]);
      observed.forEach((element) => {
        if (!next.has(element)) {
          ro.unobserve(element);
          observed.delete(element);
        }
      });
      next.forEach((element) => {
        if (!observed.has(element)) {
          ro.observe(element);
          observed.add(element);
        }
      });
    };
    const mo = new MutationObserver(() => {
      syncResizeObservers();
      update();
    });
    mo.observe(list, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["data-state"]
    });
    syncResizeObservers();
    update();
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(update).catch(() => {
      });
    }
    return () => {
      cancelled = true;
      mo.disconnect();
      ro.disconnect();
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    RTabs.List,
    {
      ref: (node) => {
        listRef.current = node;
        setRef(ref, node);
      },
      className: cx("ms-tabs__list", className),
      ...rest,
      children: [
        children,
        rect && (reduceMotion ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "span",
          {
            "aria-hidden": true,
            className: "ms-tabs__indicator",
            "data-reduced-motion": "true",
            style: { left: rect.left, width: rect.width }
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          import_framer_motion.motion.span,
          {
            "aria-hidden": true,
            className: "ms-tabs__indicator",
            initial: false,
            animate: { left: rect.left, width: rect.width },
            transition: { duration: import_motion.DUR.base, ease: import_motion.EASE_EMPHASIS }
          }
        ))
      ]
    }
  );
});
var TabsTrigger = (0, import_react11.forwardRef)(function TabsTrigger2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(RTabs.Trigger, { ref, className: cx("ms-tabs__trigger", className), ...rest, children });
});
var TabsContent = RTabs.Content;

// src/Table.tsx
var import_react12 = require("react");
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime11 = require("react/jsx-runtime");
var Table = (0, import_react12.forwardRef)(
  function Table2({ className, children, maxHeight, wrapperClassName, ...rest }, ref) {
    const style = maxHeight !== void 0 ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight } : void 0;
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "div",
      {
        className: cx(
          "ms-table-wrapper",
          maxHeight !== void 0 && "ms-table-wrapper--scroll",
          wrapperClassName
        ),
        style,
        children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("table", { ref, className: cx("ms-table", className), ...rest, children })
      }
    );
  }
);
function SortIcon({ direction }) {
  if (direction === "asc") {
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react3.ChevronUp, { size: 14, strokeWidth: 2, "aria-hidden": "true" });
  }
  if (direction === "desc") {
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react3.ChevronDown, { size: 14, strokeWidth: 2, "aria-hidden": "true" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    import_lucide_react3.ChevronsUpDown,
    {
      size: 14,
      strokeWidth: 2,
      className: "ms-table-header__sort-neutral",
      "aria-hidden": "true"
    }
  );
}
var TableHeader = (0, import_react12.forwardRef)(
  function TableHeader2({ sortable, sortDirection, onSort, className, children, ...rest }, ref) {
    const ariaSort = !sortable ? void 0 : sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : sortable ? "none" : void 0;
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "th",
      {
        ...rest,
        ref,
        className: cx(
          "ms-table-header",
          sortable && "ms-table-header--sortable",
          className
        ),
        "aria-sort": ariaSort,
        children: sortable ? /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
          "button",
          {
            type: "button",
            className: "ms-table-header__sort-button",
            onClick: onSort,
            disabled: !onSort,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "ms-table-header__label", children }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                "span",
                {
                  className: cx(
                    "ms-table-header__sort",
                    sortDirection != null && "ms-table-header__sort--active"
                  ),
                  children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(SortIcon, { direction: sortDirection })
                }
              )
            ]
          }
        ) : children
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("th", { className: "ms-table-select", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("td", { className: "ms-table-select", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
var import_framer_motion2 = require("framer-motion");
var import_lucide_react4 = require("lucide-react");
var import_react13 = require("react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var ToastContext = (0, import_react13.createContext)(null);
var nextToastId = 1;
function useToast() {
  const context = (0, import_react13.useContext)(ToastContext);
  if (!context) {
    throw new Error("useToast must be called inside <ToastProvider>.");
  }
  return context;
}
function ToastProvider({
  children,
  duration = 4e3,
  swipeDirection = "right",
  ...props
}) {
  const [items, setItems] = (0, import_react13.useState)([]);
  const dismiss = (0, import_react13.useCallback)((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);
  const toast = (0, import_react13.useCallback)((input) => {
    const id = nextToastId++;
    setItems((current) => [...current, { ...input, id }]);
    return id;
  }, []);
  const context = (0, import_react13.useMemo)(
    () => ({ toast, dismiss }),
    [dismiss, toast]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
    RToast.Provider,
    {
      ...props,
      duration,
      swipeDirection,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(ToastContext.Provider, { value: context, children: [
          children,
          items.map(({ id, description, onOpenChange, ...item }) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            Toast,
            {
              ...item,
              open: true,
              onOpenChange: (open) => {
                onOpenChange?.(open);
                if (!open) dismiss(id);
              },
              children: description
            },
            id
          ))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RToast.Viewport, { className: "ms-toast-viewport" })
      ]
    }
  );
}
var Toast = (0, import_react13.forwardRef)(function Toast2({
  title,
  kind = "info",
  action,
  actionAltText,
  onAction,
  closeLabel = "Dismiss notification",
  children,
  className,
  style,
  type,
  ...rest
}, ref) {
  const reducedMotion = (0, import_framer_motion2.useReducedMotionConfig)();
  const announcementType = type ?? (kind === "error" ? "foreground" : "background");
  const Icon2 = kind === "error" ? import_lucide_react4.AlertCircle : kind === "success" ? import_lucide_react4.Check : import_lucide_react4.Info;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
    RToast.Root,
    {
      ...rest,
      ref,
      type: announcementType,
      className: cx("ms-toast", className),
      "data-kind": kind,
      "data-reduced-motion": reducedMotion ? "true" : void 0,
      style: reducedMotion ? { ...style, animation: "none" } : style,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "span",
          {
            className: "ms-toast__icon",
            "aria-hidden": "true",
            children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Icon2, { size: 12, strokeWidth: 2 })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "ms-toast__content", children: [
          title != null && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RToast.Title, { className: "ms-toast__title", children: title }),
          children != null && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RToast.Description, { className: "ms-toast__description", children })
        ] }),
        action != null && actionAltText != null && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          RToast.Action,
          {
            altText: actionAltText,
            className: "ms-toast__action",
            onClick: onAction,
            children: action
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RToast.Close, { className: "ms-toast__close", "aria-label": closeLabel, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react4.X, { "aria-hidden": "true", size: 14, strokeWidth: 2 }) })
      ]
    }
  );
});

// src/Dialog.tsx
var RDialog = __toESM(require("@radix-ui/react-dialog"), 1);
var import_react15 = require("react");

// src/PortalContext.tsx
var import_react14 = require("react");
var MonosetPortalContext = (0, import_react14.createContext)(null);
function useMonosetPortalContainer() {
  return (0, import_react14.useContext)(MonosetPortalContext);
}

// src/Dialog.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
var Dialog = RDialog.Root;
var DialogTrigger = RDialog.Trigger;
var DialogClose = RDialog.Close;
var DialogContent = (0, import_react15.forwardRef)(function DialogContent2({
  title,
  description,
  children,
  className,
  overlayClassName,
  "aria-describedby": ariaDescribedBy,
  ...rest
}, ref) {
  const portalContainer = useMonosetPortalContainer();
  const hasDescription = description !== void 0 && description !== null && description !== false;
  const descriptionProps = ariaDescribedBy !== void 0 ? { "aria-describedby": ariaDescribedBy } : hasDescription ? {} : { "aria-describedby": void 0 };
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(RDialog.Portal, { container: portalContainer ?? void 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(RDialog.Overlay, { className: cx("ms-dialog-scrim", overlayClassName) }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
      RDialog.Content,
      {
        ref,
        className: cx("ms-dialog", className),
        ...descriptionProps,
        ...rest,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(RDialog.Title, { className: "ms-dialog__title", children: title }),
          hasDescription && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(RDialog.Description, { className: "ms-dialog__desc", children: description }),
          children
        ]
      }
    )
  ] });
});

// src/Sheet.tsx
var RDialog2 = __toESM(require("@radix-ui/react-dialog"), 1);
var import_react16 = require("react");
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime14 = require("react/jsx-runtime");
var Sheet = RDialog2.Root;
var SheetTrigger = RDialog2.Trigger;
var SheetClose = RDialog2.Close;
var SheetContent = (0, import_react16.forwardRef)(function SheetContent2({
  title,
  description,
  children,
  className,
  overlayClassName,
  side = "right",
  size = 380,
  showClose = true,
  style,
  "aria-describedby": ariaDescribedBy,
  ...rest
}, ref) {
  const portalContainer = useMonosetPortalContainer();
  const px = typeof size === "number" ? `${size}px` : size;
  const hasDescription = description !== void 0 && description !== null && description !== false;
  const descriptionProps = ariaDescribedBy !== void 0 ? { "aria-describedby": ariaDescribedBy } : hasDescription ? {} : { "aria-describedby": void 0 };
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(RDialog2.Portal, { container: portalContainer ?? void 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RDialog2.Overlay, { className: cx("ms-sheet-scrim", overlayClassName) }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      RDialog2.Content,
      {
        ref,
        className: cx("ms-sheet", `ms-sheet--${side}`, className),
        style: { ...sizeStyle(side, px), ...style },
        ...descriptionProps,
        ...rest,
        children: [
          showClose && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RDialog2.Close, { className: "ms-sheet__close", "aria-label": "Close", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react5.X, { size: 16, strokeWidth: 2, "aria-hidden": true }) }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "ms-sheet__header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RDialog2.Title, { className: "ms-sheet__title", children: title }),
            hasDescription && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RDialog2.Description, { className: "ms-sheet__desc", children: description })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "ms-sheet__body", children })
        ]
      }
    )
  ] });
});
function sizeStyle(side, px) {
  if (side === "left" || side === "right") return { width: px };
  return { height: px };
}

// src/CommandPalette.tsx
var RDialog3 = __toESM(require("@radix-ui/react-dialog"), 1);
var import_react17 = require("react");
var import_lucide_react6 = require("lucide-react");
var import_jsx_runtime15 = require("react/jsx-runtime");
function isGrouped(items) {
  return items.length > 0 && "items" in items[0];
}
function indexItems(items) {
  if (!isGrouped(items)) {
    return {
      entries: items.map((item, index2) => ({ item, index: index2 })),
      groups: null
    };
  }
  let index = 0;
  const groups = items.map((group, groupIndex) => ({
    heading: group.heading,
    groupIndex,
    entries: group.items.map((item) => ({ item, index: index++ }))
  }));
  return { entries: groups.flatMap((group) => group.entries), groups };
}
function defaultFilter(query, item) {
  const normalizedQuery = query.toLocaleLowerCase();
  return item.label.toLocaleLowerCase().includes(normalizedQuery) || !!item.description?.toLocaleLowerCase().includes(normalizedQuery) || !!item.keywords?.some(
    (keyword) => keyword.toLocaleLowerCase().includes(normalizedQuery)
  );
}
var CommandPalette = (0, import_react17.forwardRef)(
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
    const portalContainer = useMonosetPortalContainer();
    const instanceId = (0, import_react17.useId)();
    const listId = `${instanceId}-listbox`;
    const inputRef = (0, import_react17.useRef)(null);
    const returnFocusRef = (0, import_react17.useRef)(null);
    const wasOpen = (0, import_react17.useRef)(false);
    const [query, setQuery] = (0, import_react17.useState)("");
    const [activeIndex, setActiveIndex] = (0, import_react17.useState)(null);
    const indexed = (0, import_react17.useMemo)(() => indexItems(items), [items]);
    const normalizedQuery = query.trim();
    const matches = (entry) => normalizedQuery.length === 0 || filter(normalizedQuery, entry.item);
    const filteredEntries = indexed.entries.filter(matches);
    const enabledEntries = filteredEntries.filter((entry) => !entry.item.disabled);
    const activeEntry = enabledEntries.find((entry) => entry.index === activeIndex) ?? enabledEntries[0] ?? null;
    const optionId = (entry) => `${instanceId}-option-${entry.index}`;
    (0, import_react17.useEffect)(() => {
      if (open && !wasOpen.current) {
        setQuery("");
        setActiveIndex(indexed.entries.find((entry) => !entry.item.disabled)?.index ?? null);
      }
      wasOpen.current = open;
    }, [indexed.entries, open]);
    (0, import_react17.useEffect)(() => {
      if (!activeEntry) return;
      const option = document.getElementById(
        `${instanceId}-option-${activeEntry.index}`
      );
      option?.scrollIntoView({ block: "nearest" });
    }, [activeEntry, instanceId]);
    const moveActive = (direction) => {
      if (enabledEntries.length === 0) return;
      const currentIndex = activeEntry ? enabledEntries.findIndex((entry) => entry.index === activeEntry.index) : -1;
      const nextIndex = currentIndex < 0 ? direction === 1 ? 0 : enabledEntries.length - 1 : (currentIndex + direction + enabledEntries.length) % enabledEntries.length;
      setActiveIndex(enabledEntries[nextIndex].index);
    };
    const select = (item) => {
      if (item.disabled) return;
      item.onSelect?.();
      onOpenChange(false);
    };
    const onInputKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveActive(1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        moveActive(-1);
      } else if (event.key === "Enter" && activeEntry) {
        event.preventDefault();
        select(activeEntry.item);
      }
    };
    const renderItem = (entry) => {
      const { item } = entry;
      const active = entry.index === activeEntry?.index;
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
        "button",
        {
          id: optionId(entry),
          type: "button",
          role: "option",
          "aria-selected": active,
          "aria-disabled": item.disabled || void 0,
          disabled: item.disabled,
          "data-active": active ? "" : void 0,
          className: cx("ms-cmd__item", active && "ms-cmd__item--active"),
          onMouseEnter: () => {
            if (!item.disabled) setActiveIndex(entry.index);
          },
          onClick: () => select(item),
          tabIndex: -1,
          children: [
            item.icon && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "ms-cmd__item-icon", children: item.icon }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { className: "ms-cmd__item-text", children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "ms-cmd__item-label", children: item.label }),
              item.description && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "ms-cmd__item-desc", children: item.description })
            ] })
          ]
        },
        `${entry.index}-${item.id}`
      );
    };
    const renderResults = () => {
      if (filteredEntries.length === 0) {
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "ms-cmd__empty", children: emptyMessage });
      }
      if (!indexed.groups) return filteredEntries.map(renderItem);
      return indexed.groups.map((group) => {
        const visibleEntries = group.entries.filter(matches);
        if (visibleEntries.length === 0) return null;
        const headingId = `${instanceId}-group-${group.groupIndex}`;
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
          "div",
          {
            role: "group",
            "aria-label": group.heading ? void 0 : "Commands",
            "aria-labelledby": group.heading ? headingId : void 0,
            children: [
              group.heading && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { id: headingId, className: "ms-cmd__group-heading", children: group.heading }),
              visibleEntries.map(renderItem)
            ]
          },
          group.groupIndex
        );
      });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RDialog3.Root, { open, onOpenChange, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(RDialog3.Portal, { container: portalContainer ?? void 0, children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RDialog3.Overlay, { className: "ms-cmd-scrim" }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
        RDialog3.Content,
        {
          ref,
          className: cx("ms-cmd", className),
          "aria-label": "Command palette",
          "aria-describedby": void 0,
          onOpenAutoFocus: (event) => {
            event.preventDefault();
            const activeElement = document.activeElement;
            const content = inputRef.current?.closest(".ms-cmd");
            returnFocusRef.current = activeElement instanceof HTMLElement && activeElement !== document.body && !content?.contains(activeElement) ? activeElement : null;
            inputRef.current?.focus();
          },
          onCloseAutoFocus: (event) => {
            const returnFocusTo = returnFocusRef.current;
            returnFocusRef.current = null;
            if (!returnFocusTo?.isConnected) return;
            event.preventDefault();
            returnFocusTo.focus();
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RDialog3.Title, { className: "ms-sr-only", children: "Command palette" }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "ms-cmd__input-wrap", children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
                import_lucide_react6.Search,
                {
                  className: "ms-cmd__search-icon",
                  size: 16,
                  strokeWidth: 2,
                  "aria-hidden": true
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
                "input",
                {
                  ref: inputRef,
                  role: "combobox",
                  className: "ms-cmd__input",
                  value: query,
                  onChange: (event) => setQuery(event.target.value),
                  onKeyDown: onInputKeyDown,
                  placeholder,
                  "aria-label": "Search commands",
                  "aria-autocomplete": "list",
                  "aria-expanded": open,
                  "aria-controls": listId,
                  "aria-activedescendant": activeEntry ? optionId(activeEntry) : void 0,
                  autoComplete: "off",
                  spellCheck: false
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
              "div",
              {
                id: listId,
                role: "listbox",
                "aria-label": "Commands",
                className: "ms-cmd__list",
                children: renderResults()
              }
            ),
            footer && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "ms-cmd__footer", children: footer })
          ]
        }
      )
    ] }) });
  }
);

// src/AppShell.tsx
var import_react18 = require("react");
var import_react_dom = require("react-dom");
var import_lucide_react7 = require("lucide-react");
var import_jsx_runtime16 = require("react/jsx-runtime");
var Ctx = (0, import_react18.createContext)(null);
var focusableSelector = [
  "a[href]:not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "input:not([disabled]):not([type='hidden']):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "[contenteditable]:not([contenteditable='false']):not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])"
].join(", ");
function isHiddenFromFocus(element, boundary) {
  let current = element;
  while (current && boundary.contains(current)) {
    if (current.hidden || current.inert || current.getAttribute("aria-hidden") === "true") {
      return true;
    }
    const style = window.getComputedStyle(current);
    if (style.display === "none" || style.visibility === "hidden") return true;
    if (current === boundary) break;
    current = current.parentElement;
  }
  return false;
}
function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(focusableSelector)
  ).filter(
    (element) => !element.matches(":disabled, input[type='hidden']") && !(element.hasAttribute("tabindex") && Number(element.getAttribute("tabindex")) < 0) && !isHiddenFromFocus(element, container)
  );
}
var pageScrollLockCount = 0;
var previousBodyOverflow = "";
var previousDocumentOverflow = "";
function lockPageScroll() {
  if (typeof document === "undefined") return () => {
  };
  if (pageScrollLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }
  pageScrollLockCount += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    pageScrollLockCount = Math.max(0, pageScrollLockCount - 1);
    if (pageScrollLockCount === 0) {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      previousBodyOverflow = "";
      previousDocumentOverflow = "";
    }
  };
}
function useAppShell() {
  const value = (0, import_react18.useContext)(Ctx);
  if (!value) {
    throw new Error("AppShell sub-components must be used inside <AppShell>.");
  }
  return value;
}
var AppShellRoot = (0, import_react18.forwardRef)(function AppShellRoot2({
  children,
  sidebarWidth = 240,
  className,
  mobileOpen: controlledOpen,
  defaultMobileOpen = false,
  onMobileOpenChange,
  navigationSignal,
  style,
  ...rootProps
}, ref) {
  const portalContainer = useMonosetPortalContainer();
  const sidebarId = `${(0, import_react18.useId)()}-sidebar`;
  const sidebarRef = (0, import_react18.useRef)(null);
  const returnFocusRef = (0, import_react18.useRef)(null);
  const previousOpen = (0, import_react18.useRef)(false);
  const previousNavigationSignal = (0, import_react18.useRef)(navigationSignal);
  const [uncontrolledOpen, setUncontrolledOpen] = (0, import_react18.useState)(defaultMobileOpen);
  const isControlled = controlledOpen !== void 0;
  const mobileOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const setMobileOpen = (0, import_react18.useCallback)(
    (nextOpen, returnFocusTo) => {
      if (nextOpen === mobileOpen) return;
      if (nextOpen && !mobileOpen) {
        returnFocusRef.current = returnFocusTo ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
      }
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onMobileOpenChange?.(nextOpen);
    },
    [isControlled, mobileOpen, onMobileOpenChange]
  );
  (0, import_react18.useEffect)(() => {
    let frame = 0;
    if (mobileOpen && !previousOpen.current) {
      if (!returnFocusRef.current?.isConnected) {
        const activeElement = document.activeElement;
        returnFocusRef.current = activeElement instanceof HTMLElement && !sidebarRef.current?.contains(activeElement) ? activeElement : null;
      }
      frame = requestAnimationFrame(() => {
        const sidebar = sidebarRef.current;
        const target = sidebar ? getFocusableElements(sidebar)[0] : void 0;
        (target ?? sidebar)?.focus();
      });
    } else if (!mobileOpen && previousOpen.current) {
      const returnFocusTo = returnFocusRef.current;
      frame = requestAnimationFrame(() => {
        returnFocusTo?.focus();
        returnFocusRef.current = null;
      });
    }
    previousOpen.current = mobileOpen;
    return () => cancelAnimationFrame(frame);
  }, [mobileOpen]);
  (0, import_react18.useEffect)(() => {
    if (!mobileOpen) return;
    return lockPageScroll();
  }, [mobileOpen]);
  (0, import_react18.useEffect)(() => {
    let frame = 0;
    if (previousNavigationSignal.current !== navigationSignal) {
      previousNavigationSignal.current = navigationSignal;
      if (mobileOpen) {
        frame = requestAnimationFrame(() => setMobileOpen(false));
      }
    }
    return () => cancelAnimationFrame(frame);
  }, [mobileOpen, navigationSignal, setMobileOpen]);
  const normalizedWidth = Number.isFinite(sidebarWidth) && sidebarWidth > 0 ? sidebarWidth : 240;
  const contextValue = {
    mobileOpen,
    sidebarId,
    sidebarRef,
    setMobileOpen
  };
  const portalTarget = portalContainer ?? (typeof document !== "undefined" ? document.body : null);
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(Ctx.Provider, { value: contextValue, children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      "div",
      {
        ...rootProps,
        ref,
        className: cx("ms-app-shell", className),
        style: {
          ...style,
          ["--ms-sidebar-w"]: `${normalizedWidth}px`
        },
        children
      }
    ),
    mobileOpen && portalTarget ? (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "div",
        {
          className: "ms-app-shell__drawer-scrim",
          "data-state": "open",
          "aria-hidden": "true",
          onPointerDown: () => setMobileOpen(false)
        }
      ),
      portalTarget
    ) : null
  ] });
});
var AppShellSidebar = (0, import_react18.forwardRef)(
  function AppShellSidebar2({
    children,
    brand,
    footer,
    className,
    onKeyDown,
    tabIndex,
    "aria-label": ariaLabel,
    ...rest
  }, forwardedRef) {
    const { mobileOpen, setMobileOpen, sidebarId, sidebarRef } = useAppShell();
    const handleKeyDown = (event) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (!mobileOpen) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusableElements(event.currentTarget);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      "div",
      {
        ...rest,
        ref: (node) => {
          sidebarRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        },
        id: sidebarId,
        className: cx(
          "ms-app-shell__sidebar",
          mobileOpen && "ms-app-shell__drawer",
          className
        ),
        "data-ms": "app-shell-sidebar",
        "data-state": mobileOpen ? "open" : "closed",
        role: mobileOpen ? "dialog" : "complementary",
        "aria-modal": mobileOpen ? true : void 0,
        "aria-label": mobileOpen ? ariaLabel ?? "Navigation" : ariaLabel,
        tabIndex: mobileOpen ? -1 : tabIndex,
        onKeyDown: handleKeyDown,
        children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "ms-app-shell__sidebar-inner", children: [
          brand && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "ms-app-shell__brand", children: brand }),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("nav", { className: "ms-app-shell__nav", children }),
          footer && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "ms-app-shell__sidebar-footer", children: footer })
        ] })
      }
    );
  }
);
function AppShellSidebarGroup({
  label,
  children,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: cx("ms-app-shell__group", className), children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "ms-app-shell__group-label", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "ms-app-shell__group-items", children })
  ] });
}
var AppShellSidebarItem = (0, import_react18.forwardRef)(
  function AppShellSidebarItem2({ icon, active, children, className, onClick, ...rest }, ref) {
    const { setMobileOpen } = useAppShell();
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
      "button",
      {
        ...rest,
        ref,
        type: "button",
        "aria-current": active ? "page" : void 0,
        className: cx(
          "ms-app-shell__item",
          active && "ms-app-shell__item--active",
          className
        ),
        onClick: (event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setMobileOpen(false);
        },
        children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "ms-app-shell__item-icon", children: icon }),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "ms-app-shell__item-label", children })
        ]
      }
    );
  }
);
var AppShellMain = (0, import_react18.forwardRef)(function AppShellMain2({
  children,
  className,
  "aria-hidden": ariaHidden,
  ...rest
}, ref) {
  const { mobileOpen } = useAppShell();
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "div",
    {
      ...rest,
      ...mobileOpen ? { inert: "" } : {},
      ref,
      "aria-hidden": mobileOpen ? true : ariaHidden,
      className: cx("ms-app-shell__main", className),
      children
    }
  );
});
var AppShellHeader = (0, import_react18.forwardRef)(function AppShellHeader2({ children, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("header", { ...rest, ref, className: cx("ms-app-shell__header", className), children });
});
var AppShellMobileTrigger = (0, import_react18.forwardRef)(function AppShellMobileTrigger2({ label = "Open navigation", className, onClick, ...rest }, ref) {
  const { mobileOpen, setMobileOpen, sidebarId } = useAppShell();
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "button",
    {
      ...rest,
      ref,
      type: "button",
      "aria-label": label,
      "aria-expanded": mobileOpen,
      "aria-controls": sidebarId,
      className: cx("ms-app-shell__mobile-trigger", className),
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setMobileOpen(true, event.currentTarget);
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react7.Menu, { size: 20, strokeWidth: 2, "aria-hidden": true })
    }
  );
});
var AppShellContent = (0, import_react18.forwardRef)(
  function AppShellContent2({ children, className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("main", { ...rest, ref, className: cx("ms-app-shell__content", className), children });
  }
);
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
var import_react19 = require("react");
var import_lucide_react8 = require("lucide-react");
var import_react_aria_components = require("react-aria-components");
var import_jsx_runtime17 = require("react/jsx-runtime");
function defaultComboboxFilter(query, option) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return true;
  return [option.textValue, option.label, option.description, ...option.keywords ?? []].filter((term) => Boolean(term)).some((term) => term.toLocaleLowerCase().includes(normalizedQuery));
}
var useIsomorphicLayoutEffect = typeof document === "undefined" ? import_react19.useEffect : import_react19.useLayoutEffect;
function OpenStateSync({
  open,
  defaultOpen,
  syncingRef
}) {
  const state = (0, import_react19.useContext)(import_react_aria_components.ComboBoxStateContext);
  const appliedDefault = (0, import_react19.useRef)(false);
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
var Combobox = (0, import_react19.forwardRef)(function Combobox2({
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
  const syncingOpenRef = (0, import_react19.useRef)(false);
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
  const setRootRef = (0, import_react19.useCallback)((element) => {
    if (element) {
      if (id) element.id = id;
      else element.removeAttribute("id");
      if (title) element.title = title;
      else element.removeAttribute("title");
    }
    if (typeof ref === "function") ref(element);
    else if (ref) ref.current = element;
  }, [id, ref, title]);
  const setInputRef = (0, import_react19.useCallback)((element) => {
    if (element) element.setAttribute("autocomplete", autoComplete ?? "off");
  }, [autoComplete]);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    import_react_aria_components.ComboBox,
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
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(OpenStateSync, { open, defaultOpen, syncingRef: syncingOpenRef }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_react_aria_components.Group, { className: "ms-combobox__group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
            import_react_aria_components.Input,
            {
              ref: setInputRef,
              className: cx("ms-combobox__input", inputClassName),
              placeholder,
              autoComplete
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_react_aria_components.Button, { className: "ms-combobox__button", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react8.ChevronDown, { size: 14, strokeWidth: 2, "aria-hidden": true }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          import_react_aria_components.Popover,
          {
            UNSTABLE_portalContainer: portalContainer ?? void 0,
            placement: "bottom start",
            offset: 6,
            className: cx("ms-combobox__panel", popoverClassName),
            children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
              import_react_aria_components.ListBox,
              {
                className: "ms-combobox__list",
                renderEmptyState: () => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "ms-combobox__empty", children: emptyMessage }),
                children: (option) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                  import_react_aria_components.ListBoxItem,
                  {
                    id: option.value,
                    textValue: option.textValue ?? option.label,
                    isDisabled: option.disabled,
                    className: ({ isFocused, isSelected }) => cx(
                      "ms-combobox__option",
                      isFocused && "ms-combobox__option--active",
                      isSelected && "ms-combobox__option--selected"
                    ),
                    children: ({ isSelected }) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { className: "ms-combobox__option-text", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "ms-combobox__option-label", children: option.label }),
                        option.description && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "ms-combobox__option-desc", children: option.description })
                      ] }),
                      isSelected && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react8.Check, { className: "ms-combobox__check", size: 14, strokeWidth: 2, "aria-hidden": true })
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

// src/MultiCombobox.tsx
var import_react20 = require("react");
var import_lucide_react9 = require("lucide-react");
var import_react_aria_components2 = require("react-aria-components");
var import_jsx_runtime18 = require("react/jsx-runtime");
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
var useIsomorphicLayoutEffect2 = typeof document === "undefined" ? import_react20.useEffect : import_react20.useLayoutEffect;
function OpenStateSync2({
  open,
  defaultOpen,
  syncingRef
}) {
  const state = (0, import_react20.useContext)(import_react_aria_components2.ComboBoxStateContext);
  const appliedDefault = (0, import_react20.useRef)(false);
  useIsomorphicLayoutEffect2(() => {
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
  const state = (0, import_react20.useContext)(import_react_aria_components2.ComboBoxStateContext);
  if (!state || !name || disabled) return null;
  return selectedStringValues(state.value).map((value) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("input", { type: "hidden", name, form, value }, value));
}
function SelectedTags({
  options,
  disabled,
  readOnly
}) {
  const state = (0, import_react20.useContext)(import_react_aria_components2.ComboBoxStateContext);
  const selectedValues = selectedStringValues(state?.value);
  const optionsByValue = new Map(options.map((option) => [option.value, option]));
  const selected = selectedValues.map((value) => optionsByValue.get(value)).filter((option) => Boolean(option));
  if (selected.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "ms-multicombobox__tags", children: selected.map((option) => {
    const removable = !disabled && !readOnly && !option.disabled;
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { className: "ms-multicombobox__tag", children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ms-multicombobox__tag-label", children: option.label }),
      removable && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
          children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_lucide_react9.X, { size: 12, strokeWidth: 2, "aria-hidden": true })
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
  const state = (0, import_react20.useContext)(import_react_aria_components2.ComboBoxStateContext);
  const setInputRef = (0, import_react20.useCallback)((element) => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    import_react_aria_components2.Input,
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
var MultiCombobox = (0, import_react20.forwardRef)(
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
    const syncingOpenRef = (0, import_react20.useRef)(false);
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
    const isRequired = required || ariaRequired === true || ariaRequired === "true";
    const optionsByTextValue = createOptionsByTextValue(options);
    const [uncontrolledValue, setUncontrolledValue] = (0, import_react20.useState)(
      () => normalizedValues(defaultValue, options) ?? []
    );
    const [uncontrolledInputValue, setUncontrolledInputValue] = (0, import_react20.useState)(defaultInputValue ?? "");
    const initialValueRef = (0, import_react20.useRef)(uncontrolledValue);
    const initialInputValueRef = (0, import_react20.useRef)(uncontrolledInputValue);
    const controlledValue = (0, import_react20.useMemo)(
      () => normalizedValues(value ?? uncontrolledValue, options) ?? [],
      [options, uncontrolledValue, value]
    );
    const currentInputValue = inputValue ?? uncontrolledInputValue;
    const rootRef = (0, import_react20.useRef)(null);
    const setRootRef = (0, import_react20.useCallback)((element) => {
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
    (0, import_react20.useEffect)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
      import_react_aria_components2.ComboBox,
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
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(SelectionFormInputs, { name, form, disabled }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            OpenStateSync2,
            {
              open,
              defaultOpen,
              syncingRef: syncingOpenRef
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_react_aria_components2.Group, { className: cx("ms-combobox__group", "ms-multicombobox__group"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              SelectedTags,
              {
                options,
                disabled,
                readOnly
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_react_aria_components2.Button, { className: cx("ms-combobox__button", "ms-multicombobox__button"), children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_lucide_react9.ChevronDown, { size: 14, strokeWidth: 2, "aria-hidden": true }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            import_react_aria_components2.Popover,
            {
              UNSTABLE_portalContainer: portalContainer ?? void 0,
              placement: "bottom start",
              offset: 6,
              className: cx("ms-combobox__panel", "ms-multicombobox__panel", popoverClassName),
              children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                import_react_aria_components2.ListBox,
                {
                  className: "ms-combobox__list",
                  selectionBehavior: "toggle",
                  renderEmptyState: () => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "ms-combobox__empty", children: emptyMessage }),
                  children: (option) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                    import_react_aria_components2.ListBoxItem,
                    {
                      id: option.value,
                      textValue: optionTextValue(option),
                      isDisabled: option.disabled,
                      className: ({ isFocused, isSelected }) => cx(
                        "ms-combobox__option",
                        isFocused && "ms-combobox__option--active",
                        isSelected && "ms-combobox__option--selected"
                      ),
                      children: ({ isSelected }) => /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                          "span",
                          {
                            className: cx(
                              "ms-multicombobox__check",
                              isSelected && "ms-multicombobox__check--on"
                            ),
                            children: isSelected && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_lucide_react9.Check, { size: 14, strokeWidth: 2, "aria-hidden": true })
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { className: "ms-combobox__option-text", children: [
                          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ms-combobox__option-label", children: option.label }),
                          option.description && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ms-combobox__option-desc", children: option.description })
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

// src/HoverCard.tsx
var RHoverCard = __toESM(require("@radix-ui/react-hover-card"), 1);
var import_react21 = require("react");
var import_jsx_runtime19 = require("react/jsx-runtime");
var HoverCard = RHoverCard.Root;
var HoverCardTrigger = RHoverCard.Trigger;
var HoverCardContent = (0, import_react21.forwardRef)(function HoverCardContent2({ className, children, sideOffset = 6, ...rest }, ref) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(RHoverCard.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    RHoverCard.Content,
    {
      ref,
      sideOffset,
      className: cx("ms-hovercard", className),
      ...rest,
      children
    }
  ) });
});

// src/PasswordInput.tsx
var import_react22 = require("react");
var import_lucide_react10 = require("lucide-react");
var import_jsx_runtime20 = require("react/jsx-runtime");
var PasswordInput = (0, import_react22.forwardRef)(
  function PasswordInput2({
    showToggle = true,
    showLabel = "Show",
    hideLabel = "Hide",
    className,
    wrapperClassName,
    autoComplete = "current-password",
    disabled,
    ...rest
  }, ref) {
    const [visible, setVisible] = (0, import_react22.useState)(false);
    if (!showToggle) {
      return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        Input,
        {
          ref,
          type: "password",
          className,
          autoComplete,
          disabled,
          ...rest
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: cx("ms-password", wrapperClassName), children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        Input,
        {
          ref,
          type: visible ? "text" : "password",
          className: cx("ms-password__input", className),
          autoComplete,
          disabled,
          ...rest
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        "button",
        {
          type: "button",
          "aria-pressed": visible,
          "aria-label": visible ? hideLabel : showLabel,
          onClick: () => setVisible((v) => !v),
          className: "ms-password__toggle",
          disabled,
          children: visible ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_lucide_react10.EyeOff, { size: 16, strokeWidth: 2, "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_lucide_react10.Eye, { size: 16, strokeWidth: 2, "aria-hidden": true })
        }
      )
    ] });
  }
);

// src/NumberInput.tsx
var import_react23 = require("react");
var import_lucide_react11 = require("lucide-react");
var import_react_aria_components3 = require("react-aria-components");
var import_jsx_runtime21 = require("react/jsx-runtime");
var NumberInput = (0, import_react23.forwardRef)(
  function NumberInput2({
    value,
    defaultValue,
    onValueChange,
    min,
    max,
    step,
    formatOptions,
    hideStepper = false,
    disabled = false,
    readOnly = false,
    required = false,
    invalid = false,
    locale,
    className,
    inputClassName,
    name,
    form,
    id,
    title,
    autoComplete,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-errormessage": ariaErrorMessage,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
    onFocus,
    onBlur,
    ...dataAttributes
  }, ref) {
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
    const isRequired = required || ariaRequired === true || ariaRequired === "true";
    const effectiveAriaInvalid = isInvalid ? true : ariaInvalid;
    const effectiveAriaRequired = isRequired ? true : ariaRequired;
    const numberField = /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
      import_react_aria_components3.NumberField,
      {
        ...dataAttributes,
        id,
        name,
        form,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        "aria-errormessage": ariaErrorMessage,
        "aria-invalid": effectiveAriaInvalid,
        "aria-required": effectiveAriaRequired,
        value: value === null ? Number.NaN : value,
        defaultValue: defaultValue === null ? Number.NaN : defaultValue,
        onChange: (nextValue) => {
          onValueChange?.(Number.isNaN(nextValue) ? null : nextValue);
        },
        minValue: min,
        maxValue: max,
        step,
        formatOptions,
        isDisabled: disabled,
        isReadOnly: readOnly,
        isRequired,
        isInvalid,
        className: ({ isDisabled }) => cx(
          "ms-numberinput",
          isDisabled && "ms-numberinput--disabled",
          className
        ),
        render: (rootProps) => /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { ...rootProps, title }),
        children: [
          !hideStepper && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_aria_components3.Button, { slot: "decrement", className: "ms-numberinput__btn", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_lucide_react11.Minus, { size: 16, strokeWidth: 2, "aria-hidden": true }) }),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
            import_react_aria_components3.Input,
            {
              ref,
              autoComplete,
              "aria-label": ariaLabel,
              "aria-labelledby": ariaLabelledBy,
              "aria-describedby": ariaDescribedBy,
              "aria-errormessage": ariaErrorMessage,
              "aria-invalid": effectiveAriaInvalid,
              "aria-required": effectiveAriaRequired,
              onFocus,
              onBlur,
              className: cx("ms-numberinput__input", inputClassName)
            }
          ),
          !hideStepper && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_aria_components3.Button, { slot: "increment", className: "ms-numberinput__btn", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_lucide_react11.Plus, { size: 16, strokeWidth: 2, "aria-hidden": true }) })
        ]
      }
    );
    return locale ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react_aria_components3.I18nProvider, { locale, children: numberField }) : numberField;
  }
);

// src/PinInput.tsx
var import_react24 = require("react");
var import_jsx_runtime22 = require("react/jsx-runtime");
var DIGIT_RE = /^[0-9]$/;
var useIsomorphicLayoutEffect3 = typeof window === "undefined" ? import_react24.useEffect : import_react24.useLayoutEffect;
function acceptsCharacter(pattern, character) {
  pattern.lastIndex = 0;
  return pattern.test(character);
}
function slotsFromValue(value, length, pattern) {
  const accepted = Array.from(value).filter(
    (character) => acceptsCharacter(pattern, character)
  );
  return Array.from({ length }, (_, index) => accepted[index] ?? "");
}
function flattenSlots(slots) {
  return slots.join("");
}
function isComplete(slots) {
  return slots.every(Boolean);
}
var PinInput = (0, import_react24.forwardRef)(function PinInput2({
  length = 6,
  value,
  defaultValue = "",
  onValueChange,
  onComplete,
  mask = false,
  pattern = DIGIT_RE,
  disabled = false,
  readOnly = false,
  required = false,
  invalid = false,
  autoFocus = false,
  name,
  form,
  id,
  title,
  className,
  "aria-label": ariaLabelProp,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-errormessage": ariaErrorMessage,
  "aria-invalid": ariaInvalid,
  "aria-required": ariaRequired,
  ...dataAttributes
}, forwardedRef) {
  if (!Number.isFinite(length) || !Number.isInteger(length) || length <= 0) {
    throw new Error("PinInput length must be a positive finite integer.");
  }
  const isControlled = value !== void 0;
  const ariaLabel = ariaLabelProp ?? (ariaLabelledBy ? void 0 : "One-time code");
  const patternKey = `${pattern.source}/${pattern.flags}`;
  const initialValue = isControlled ? value : defaultValue;
  const [slots, setSlots] = (0, import_react24.useState)(
    () => slotsFromValue(initialValue, length, pattern)
  );
  const cells = (0, import_react24.useRef)([]);
  const root = (0, import_react24.useRef)(null);
  const lastControlledValue = (0, import_react24.useRef)(value);
  const lastLength = (0, import_react24.useRef)(length);
  const lastPatternKey = (0, import_react24.useRef)(patternKey);
  const pendingControlledEcho = (0, import_react24.useRef)(null);
  const wasComplete = (0, import_react24.useRef)(isComplete(slots));
  const effectiveInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
  const effectiveRequired = required || ariaRequired === true || ariaRequired === "true";
  const flattenedValue = flattenSlots(slots);
  useIsomorphicLayoutEffect3(() => {
    const lengthChanged = lastLength.current !== length;
    const patternChanged = lastPatternKey.current !== patternKey;
    const controlledValueChanged = isControlled && lastControlledValue.current !== value;
    if (controlledValueChanged || lengthChanged || patternChanged) {
      const pendingEcho = pendingControlledEcho.current;
      const sanitizedValue = flattenSlots(slotsFromValue(value ?? flattenedValue, length, pattern));
      const nextSlots = controlledValueChanged && !patternChanged && pendingEcho?.value === sanitizedValue && pendingEcho.slots.length === length ? pendingEcho.slots : slotsFromValue(value ?? flattenedValue, length, pattern);
      pendingControlledEcho.current = null;
      setSlots(nextSlots);
      wasComplete.current = isComplete(nextSlots);
    }
    lastControlledValue.current = value;
    lastLength.current = length;
    lastPatternKey.current = patternKey;
  }, [flattenedValue, isControlled, length, pattern, patternKey, value]);
  (0, import_react24.useEffect)(() => {
    if (autoFocus && !disabled) cells.current[0]?.focus();
  }, [autoFocus, disabled]);
  (0, import_react24.useEffect)(() => {
    if (isControlled) return;
    const owner = form ? document.getElementById(form) : root.current?.closest("form");
    if (!(owner instanceof HTMLFormElement)) return;
    const handleReset = () => {
      const resetSlots = slotsFromValue(defaultValue, length, pattern);
      pendingControlledEcho.current = null;
      setSlots(resetSlots);
      wasComplete.current = isComplete(resetSlots);
    };
    owner.addEventListener("reset", handleReset);
    return () => owner.removeEventListener("reset", handleReset);
  }, [defaultValue, form, isControlled, length, pattern]);
  const commit = (nextSlots) => {
    const nextValue = flattenSlots(nextSlots);
    const complete = isComplete(nextSlots);
    pendingControlledEcho.current = isControlled ? { value: nextValue, slots: nextSlots } : null;
    setSlots(nextSlots);
    onValueChange?.(nextValue);
    if (complete && !wasComplete.current) onComplete?.(nextValue);
    wasComplete.current = complete;
  };
  const handleChange = (index, rawValue) => {
    if (disabled || readOnly) return;
    if (rawValue === "") {
      const nextSlots2 = [...slots];
      nextSlots2[index] = "";
      commit(nextSlots2);
      return;
    }
    const accepted = Array.from(rawValue).filter(
      (character) => acceptsCharacter(pattern, character)
    );
    const nextSlots = [...slots];
    if (accepted.length > 1) {
      accepted.slice(0, length - index).forEach((character, offset) => {
        nextSlots[index + offset] = character;
      });
    } else {
      const character = accepted[0];
      if (!character) return;
      nextSlots[index] = character;
    }
    commit(nextSlots);
    const nextCell = Math.min(index + accepted.length, length - 1);
    cells.current[nextCell]?.focus();
  };
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !slots[index] && index > 0) {
      event.preventDefault();
      cells.current[index - 1]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      cells.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      cells.current[index + 1]?.focus();
    }
  };
  const handlePaste = (index, event) => {
    if (disabled || readOnly) return;
    const clipboardValue = event.clipboardData.getData("text");
    if (!clipboardValue) return;
    event.preventDefault();
    const accepted = Array.from(clipboardValue).filter((character) => acceptsCharacter(pattern, character)).slice(0, length - index);
    if (accepted.length === 0) return;
    const nextSlots = [...slots];
    accepted.forEach((character, offset) => {
      nextSlots[index + offset] = character;
    });
    commit(nextSlots);
    const firstEmptyAfterPaste = nextSlots.findIndex(
      (slot, slotIndex) => slotIndex >= index + accepted.length && !slot
    );
    const nextFocus = firstEmptyAfterPaste === -1 ? length - 1 : firstEmptyAfterPaste;
    cells.current[nextFocus]?.focus();
  };
  const setRootRef = (element) => {
    root.current = element;
    if (typeof forwardedRef === "function") forwardedRef(element);
    else if (forwardedRef) forwardedRef.current = element;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    "div",
    {
      ...dataAttributes,
      ref: setRootRef,
      id,
      title,
      role: "group",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-errormessage": ariaErrorMessage,
      "aria-invalid": effectiveInvalid || void 0,
      "aria-required": effectiveRequired || void 0,
      "data-disabled": disabled || void 0,
      "data-readonly": readOnly || void 0,
      "data-invalid": effectiveInvalid || void 0,
      className: cx(
        "ms-pininput",
        disabled && "ms-pininput--disabled",
        readOnly && "ms-pininput--readonly",
        effectiveInvalid && "ms-pininput--invalid",
        className
      ),
      children: [
        Array.from({ length }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          "input",
          {
            ref: (element) => {
              cells.current[index] = element;
            },
            type: mask ? "password" : "text",
            inputMode: pattern === DIGIT_RE ? "numeric" : "text",
            autoComplete: index === 0 ? "one-time-code" : "off",
            maxLength: 1,
            value: slots[index] ?? "",
            onChange: (event) => handleChange(index, event.target.value),
            onKeyDown: (event) => handleKeyDown(index, event),
            onPaste: (event) => handlePaste(index, event),
            disabled,
            readOnly,
            required: effectiveRequired,
            form,
            "aria-label": `Character ${index + 1} of ${length}`,
            "aria-describedby": ariaDescribedBy,
            "aria-errormessage": ariaErrorMessage,
            "aria-invalid": effectiveInvalid || void 0,
            className: "ms-pininput__cell"
          },
          index
        )),
        name && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          "input",
          {
            type: "hidden",
            name,
            form,
            value: flattenedValue,
            disabled
          }
        )
      ]
    }
  );
});

// src/FileUpload.tsx
var import_react25 = require("react");
var import_jsx_runtime23 = require("react/jsx-runtime");
function normalizeFiles(files, multiple) {
  return multiple || files.length <= 1 ? files : files.slice(0, 1);
}
function acceptsFile(file, accept) {
  if (!accept?.trim()) return true;
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();
  return accept.split(",").some((rawToken) => {
    const token = rawToken.trim().toLowerCase();
    if (!token) return false;
    if (token.startsWith(".")) return fileName.endsWith(token);
    if (token.endsWith("/*")) {
      return fileType.startsWith(token.slice(0, -1));
    }
    return fileType === token;
  });
}
var FileUpload = (0, import_react25.forwardRef)(
  function FileUpload2({
    files,
    defaultFiles = [],
    onFilesChange,
    onFilesRejected,
    accept,
    multiple = false,
    disabled = false,
    required = false,
    invalid = false,
    name,
    form,
    id,
    title,
    children,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    "aria-errormessage": ariaErrorMessage,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
    ...dataAttributes
  }, ref) {
    const inputRef = (0, import_react25.useRef)(null);
    const initialDefaultFilesRef = (0, import_react25.useRef)(null);
    if (initialDefaultFilesRef.current === null) {
      initialDefaultFilesRef.current = normalizeFiles([...defaultFiles], multiple);
    }
    const initialDefaultFiles = initialDefaultFilesRef.current;
    const [uncontrolledFiles, setUncontrolledFiles] = (0, import_react25.useState)(
      initialDefaultFiles
    );
    const [over, setOver] = (0, import_react25.useState)(false);
    const controlled = files !== void 0;
    const currentFiles = normalizeFiles(
      controlled ? files : uncontrolledFiles,
      multiple
    );
    const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
    const isRequired = required || ariaRequired === true || ariaRequired === "true";
    const effectiveAriaInvalid = isInvalid ? true : ariaInvalid;
    const effectiveAriaRequired = isRequired ? true : ariaRequired;
    const commitFiles = (nextFiles) => {
      if (disabled) return;
      const normalizedFiles = normalizeFiles(nextFiles, multiple);
      if (!controlled) setUncontrolledFiles(normalizedFiles);
      onFilesChange?.(normalizedFiles);
    };
    const processFiles = (nextFiles) => {
      if (disabled) return;
      const accepted = [];
      const rejected = [];
      for (const file of nextFiles) {
        if (acceptsFile(file, accept)) accepted.push(file);
        else rejected.push(file);
      }
      if (rejected.length > 0) onFilesRejected?.(rejected);
      if (accepted.length === 0) return;
      commitFiles(multiple ? accepted : accepted.slice(0, 1));
    };
    (0, import_react25.useEffect)(() => {
      const input = inputRef.current;
      const ownerForm = input?.form;
      if (!input || !ownerForm) return;
      const handleFormData = (event) => {
        if (disabled || !name) return;
        const formData = event.formData;
        for (const file of currentFiles) {
          formData.append(name, file, file.name);
        }
      };
      const handleReset = () => {
        input.value = "";
        setOver(false);
        if (!controlled) setUncontrolledFiles(initialDefaultFiles);
      };
      ownerForm.addEventListener("formdata", handleFormData);
      ownerForm.addEventListener("reset", handleReset);
      return () => {
        ownerForm.removeEventListener("formdata", handleFormData);
        ownerForm.removeEventListener("reset", handleReset);
      };
    }, [controlled, currentFiles, disabled, initialDefaultFiles, name]);
    const accessibleLabel = ariaLabel ?? (ariaLabelledby ? void 0 : "Upload files");
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
      "div",
      {
        ref,
        title,
        ...dataAttributes,
        className: cx(
          "ms-fileupload",
          over && "ms-fileupload--over",
          disabled && "ms-fileupload--disabled",
          isInvalid && "ms-fileupload--invalid",
          className
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
            "label",
            {
              className: "ms-fileupload__dropzone",
              "aria-disabled": disabled || void 0,
              onDragOver: (event) => {
                event.preventDefault();
                if (!disabled) setOver(true);
              },
              onDragLeave: () => setOver(false),
              onDrop: (event) => {
                event.preventDefault();
                setOver(false);
                if (!disabled) processFiles(Array.from(event.dataTransfer.files));
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                  "input",
                  {
                    ref: inputRef,
                    id,
                    type: "file",
                    accept,
                    multiple,
                    disabled,
                    form,
                    required: isRequired && currentFiles.length === 0,
                    "aria-required": effectiveAriaRequired,
                    "aria-invalid": effectiveAriaInvalid,
                    "aria-label": accessibleLabel,
                    "aria-labelledby": ariaLabelledby,
                    "aria-describedby": ariaDescribedby,
                    "aria-errormessage": ariaErrorMessage,
                    className: "ms-fileupload__input",
                    onChange: (event) => {
                      processFiles(Array.from(event.currentTarget.files ?? []));
                      event.currentTarget.value = "";
                    }
                  }
                ),
                children ?? /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { className: "ms-fileupload__hint", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "ms-fileupload__title", children: multiple ? "Drop files or click to upload" : "Drop a file or click to upload" }),
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "ms-fileupload__sub", children: accept || "Any file type" })
                ] })
              ]
            }
          ),
          currentFiles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("ul", { className: "ms-fileupload__files", "aria-live": "polite", children: currentFiles.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
            "li",
            {
              className: "ms-fileupload__file",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "ms-fileupload__filename", children: file.name }),
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "ms-fileupload__remove",
                    disabled,
                    "aria-label": `Remove ${file.name}`,
                    onClick: () => {
                      if (disabled) return;
                      commitFiles(
                        currentFiles.filter((_, fileIndex) => fileIndex !== index)
                      );
                    },
                    children: "Remove"
                  }
                )
              ]
            },
            `${file.name}-${file.size}-${file.lastModified}-${index}`
          )) })
        ]
      }
    );
  }
);

// src/Stepper.tsx
var import_react26 = require("react");
var import_lucide_react12 = require("lucide-react");
var import_jsx_runtime24 = require("react/jsx-runtime");
var Stepper = (0, import_react26.forwardRef)(function Stepper2({ steps, current, className, "aria-label": ariaLabel = "Progress", ...rest }, ref) {
  const normalizedCurrent = steps.length === 0 ? -1 : Math.min(
    Math.max(Number.isNaN(current) ? 0 : Math.trunc(current), 0),
    steps.length - 1
  );
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    "ol",
    {
      ...rest,
      ref,
      "aria-label": ariaLabel,
      className: cx("ms-stepper", className),
      children: steps.map((step, i) => {
        const state = i < normalizedCurrent ? "done" : i === normalizedCurrent ? "current" : "pending";
        return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
          "li",
          {
            className: cx("ms-stepper__step", `ms-stepper__step--${state}`),
            "aria-current": state === "current" ? "step" : void 0,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "ms-stepper__dot", children: state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react12.Check, { size: 16, strokeWidth: 2, "aria-hidden": true }) : i + 1 }),
              /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "ms-stepper__body", children: [
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "ms-stepper__label", children: step.label }),
                step.description != null && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "ms-stepper__desc", children: step.description })
              ] }),
              i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "ms-stepper__connector", "aria-hidden": true })
            ]
          },
          i
        );
      })
    }
  );
});

// src/NavigationMenu.tsx
var RNav = __toESM(require("@radix-ui/react-navigation-menu"), 1);
var import_lucide_react13 = require("lucide-react");
var import_react27 = require("react");
var import_jsx_runtime25 = require("react/jsx-runtime");
var NavigationMenu = (0, import_react27.forwardRef)(function NavigationMenu2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(RNav.Root, { ref, className: cx("ms-nav", className), ...rest });
});
var NavigationMenuList = (0, import_react27.forwardRef)(function NavigationMenuList2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(RNav.List, { ref, className: cx("ms-nav-list", className), ...rest });
});
var NavigationMenuItem = (0, import_react27.forwardRef)(
  function NavigationMenuItem2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      RNav.Item,
      {
        ref,
        className: cx("ms-nav-item", className),
        ...rest
      }
    );
  }
);
var NavigationMenuTrigger = (0, import_react27.forwardRef)(
  function NavigationMenuTrigger2({ asChild, className, children, ...rest }, ref) {
    let triggerChildren = /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_jsx_runtime25.Fragment, { children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(NavigationMenuCaret, {})
    ] });
    if (asChild) {
      const child = import_react27.Children.only(children);
      triggerChildren = (0, import_react27.cloneElement)(
        child,
        void 0,
        child.props.children,
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(NavigationMenuCaret, {})
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      RNav.Trigger,
      {
        ref,
        asChild,
        className: cx("ms-nav-trigger", className),
        ...rest,
        children: triggerChildren
      }
    );
  }
);
function NavigationMenuCaret() {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "ms-nav-caret", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react13.ChevronDown, { size: 16, strokeWidth: 2 }) });
}
var NavigationMenuContent = (0, import_react27.forwardRef)(
  function NavigationMenuContent2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      RNav.Content,
      {
        ref,
        className: cx("ms-nav-content", className),
        ...rest,
        children
      }
    );
  }
);
var NavigationMenuLink = (0, import_react27.forwardRef)(
  function NavigationMenuLink2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(RNav.Link, { ref, className: cx("ms-nav-link", className), ...rest, children });
  }
);
var NavigationMenuIndicator = (0, import_react27.forwardRef)(function NavigationMenuIndicator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    RNav.Indicator,
    {
      ref,
      className: cx("ms-nav-indicator", className),
      ...rest
    }
  );
});
var NavigationMenuViewport = (0, import_react27.forwardRef)(function NavigationMenuViewport2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    RNav.Viewport,
    {
      ref,
      className: cx("ms-nav-viewport", className),
      ...rest
    }
  );
});

// src/ContextMenu.tsx
var RCtx = __toESM(require("@radix-ui/react-context-menu"), 1);
var import_react28 = require("react");
var import_jsx_runtime26 = require("react/jsx-runtime");
var ContextMenu = RCtx.Root;
var ContextMenuTrigger = RCtx.Trigger;
var ContextMenuSub = RCtx.Sub;
var ContextMenuContent = (0, import_react28.forwardRef)(
  function ContextMenuContent2({ className, children, ...rest }, ref) {
    const portalContainer = useMonosetPortalContainer();
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(RCtx.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(RCtx.Content, { ref, className: cx("ms-menu", className), ...rest, children }) });
  }
);
var ContextMenuItem = (0, import_react28.forwardRef)(
  function ContextMenuItem2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      RCtx.Item,
      {
        ref,
        className: cx("ms-menu__item", className),
        ...rest
      }
    );
  }
);
var ContextMenuLabel = (0, import_react28.forwardRef)(
  function ContextMenuLabel2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      RCtx.Label,
      {
        ref,
        className: cx("ms-menu__label", className),
        ...rest
      }
    );
  }
);
var ContextMenuSeparator = (0, import_react28.forwardRef)(
  function ContextMenuSeparator2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      RCtx.Separator,
      {
        ref,
        className: cx("ms-menu__separator", className),
        ...rest
      }
    );
  }
);
var ContextMenuGroup = (0, import_react28.forwardRef)(function ContextMenuGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    RCtx.Group,
    {
      ref,
      className: cx("ms-menu__group", className),
      ...rest
    }
  );
});
var ContextMenuCheckboxItem = (0, import_react28.forwardRef)(function ContextMenuCheckboxItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    RCtx.CheckboxItem,
    {
      ref,
      className: cx(
        "ms-menu__item",
        "ms-menu__item--checkbox",
        className
      ),
      ...rest
    }
  );
});
var ContextMenuItemIndicator = (0, import_react28.forwardRef)(function ContextMenuItemIndicator2({ "aria-hidden": ariaHidden = true, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    RCtx.ItemIndicator,
    {
      ref,
      "aria-hidden": ariaHidden,
      className: cx("ms-menu__indicator", className),
      ...rest
    }
  );
});
var ContextMenuRadioGroup = (0, import_react28.forwardRef)(function ContextMenuRadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    RCtx.RadioGroup,
    {
      ref,
      className: cx(
        "ms-menu__group",
        "ms-menu__radio-group",
        className
      ),
      ...rest
    }
  );
});
var ContextMenuRadioItem = (0, import_react28.forwardRef)(function ContextMenuRadioItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    RCtx.RadioItem,
    {
      ref,
      className: cx("ms-menu__item", "ms-menu__item--radio", className),
      ...rest
    }
  );
});
var ContextMenuSubTrigger = (0, import_react28.forwardRef)(function ContextMenuSubTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    RCtx.SubTrigger,
    {
      ref,
      className: cx("ms-menu__item", "ms-menu__sub-trigger", className),
      ...rest
    }
  );
});
var ContextMenuSubContent = (0, import_react28.forwardRef)(function ContextMenuSubContent2({ className, sideOffset = 4, ...rest }, ref) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(RCtx.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    RCtx.SubContent,
    {
      ref,
      sideOffset,
      className: cx("ms-menu", "ms-menu__sub-content", className),
      ...rest
    }
  ) });
});

// src/Carousel.tsx
var import_react29 = require("react");
var import_lucide_react14 = require("lucide-react");
var import_framer_motion3 = require("framer-motion");
var import_jsx_runtime27 = require("react/jsx-runtime");
function clampIndex(value, slideCount) {
  if (slideCount === 0) return 0;
  if (value === Number.POSITIVE_INFINITY) return slideCount - 1;
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(slideCount - 1, Math.trunc(value)));
}
var Carousel = (0, import_react29.forwardRef)(function Carousel2({
  children,
  index,
  defaultIndex = 0,
  onIndexChange,
  showArrows = true,
  showDots = true,
  autoplay,
  className,
  role = "region",
  "aria-label": ariaLabel = "Carousel",
  onMouseEnter,
  onMouseLeave,
  onFocusCapture,
  onBlurCapture,
  ...rest
}, ref) {
  const slides = import_react29.Children.toArray(children);
  const autoplayInterval = autoplay !== void 0 && Number.isFinite(autoplay) && autoplay > 0 ? autoplay : null;
  const isControlled = index !== void 0;
  const [internal, setInternal] = (0, import_react29.useState)(defaultIndex);
  const [isUserPaused, setIsUserPaused] = (0, import_react29.useState)(false);
  const current = clampIndex(isControlled ? index : internal, slides.length);
  const trackRef = (0, import_react29.useRef)(null);
  const [hovered, setHovered] = (0, import_react29.useState)(false);
  const [focusWithin, setFocusWithin] = (0, import_react29.useState)(false);
  const [documentHidden, setDocumentHidden] = (0, import_react29.useState)(
    () => typeof document !== "undefined" && document.hidden
  );
  const reducedMotion = (0, import_framer_motion3.useReducedMotionConfig)();
  const hasAutoplayControl = autoplayInterval !== null && slides.length > 1 && !reducedMotion;
  const goTo = (0, import_react29.useCallback)((next) => {
    const clamped = clampIndex(next, slides.length);
    if (slides.length === 0 || clamped === current) return;
    if (!isControlled) setInternal(clamped);
    onIndexChange?.(clamped);
  }, [current, isControlled, onIndexChange, slides.length]);
  (0, import_react29.useEffect)(() => {
    const t = trackRef.current;
    if (!t || slides.length === 0) return;
    const slide = t.children[current];
    if (!slide) return;
    const options = {
      behavior: reducedMotion ? "auto" : "smooth",
      left: slide.offsetLeft,
      top: 0
    };
    if (typeof t.scrollTo === "function") {
      t.scrollTo(options);
    } else {
      t.scrollLeft = slide.offsetLeft;
    }
  }, [current, reducedMotion, slides.length]);
  (0, import_react29.useEffect)(() => {
    const track = trackRef.current;
    if (!track || slides.length < 2) return;
    let settleTimer;
    const settle = () => {
      const slideElements = Array.from(track.children);
      const next = slideElements.reduce((nearest, slide, slideIndex) => {
        const nearestDistance = Math.abs(slideElements[nearest].offsetLeft - track.scrollLeft);
        const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
        return distance < nearestDistance ? slideIndex : nearest;
      }, 0);
      goTo(next);
    };
    const handleScroll = () => {
      if (settleTimer !== void 0) clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 80);
    };
    track.addEventListener("scroll", handleScroll, { passive: true });
    track.addEventListener("scrollend", settle);
    return () => {
      if (settleTimer !== void 0) clearTimeout(settleTimer);
      track.removeEventListener("scroll", handleScroll);
      track.removeEventListener("scrollend", settle);
    };
  }, [goTo, slides.length]);
  (0, import_react29.useEffect)(() => {
    const handleVisibility = () => setDocumentHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);
  (0, import_react29.useEffect)(() => {
    if (autoplayInterval === null || slides.length < 2 || isUserPaused || hovered || focusWithin || documentHidden || reducedMotion) return;
    const id = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplayInterval, current, documentHidden, focusWithin, goTo, hovered, isUserPaused, reducedMotion, slides.length]);
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
    "div",
    {
      ...rest,
      ref,
      role,
      "aria-roledescription": "carousel",
      "aria-label": ariaLabel,
      className: cx("ms-carousel", className),
      onMouseEnter: (event) => {
        setHovered(true);
        onMouseEnter?.(event);
      },
      onMouseLeave: (event) => {
        setHovered(false);
        onMouseLeave?.(event);
      },
      onFocusCapture: (event) => {
        setFocusWithin(true);
        onFocusCapture?.(event);
      },
      onBlurCapture: (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusWithin(false);
        }
        onBlurCapture?.(event);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "ms-carousel__viewport", children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { ref: trackRef, className: "ms-carousel__track", children: slides.map((child, i) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
            "div",
            {
              role: "group",
              "aria-roledescription": "slide",
              "aria-label": `${i + 1} of ${slides.length}`,
              "aria-current": i === current ? "true" : void 0,
              className: "ms-carousel__slide",
              children: child
            },
            i
          )) }),
          showArrows && slides.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_jsx_runtime27.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              "button",
              {
                type: "button",
                "aria-label": "Previous slide",
                disabled: current === 0,
                onClick: () => goTo(current - 1),
                className: "ms-carousel__arrow ms-carousel__arrow--prev",
                children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react14.ChevronLeft, { size: 16, strokeWidth: 2, "aria-hidden": true })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              "button",
              {
                type: "button",
                "aria-label": "Next slide",
                disabled: current === slides.length - 1,
                onClick: () => goTo(current + 1),
                className: "ms-carousel__arrow ms-carousel__arrow--next",
                children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react14.ChevronRight, { size: 16, strokeWidth: 2, "aria-hidden": true })
              }
            )
          ] })
        ] }),
        (showDots && slides.length > 1 || hasAutoplayControl) && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "ms-carousel__controls", children: [
          showDots && slides.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "ms-carousel__dots", role: "group", "aria-label": "Choose slide", children: slides.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
            "button",
            {
              type: "button",
              "aria-current": i === current ? "true" : void 0,
              "aria-label": `Go to slide ${i + 1}`,
              onClick: () => goTo(i),
              className: cx("ms-carousel__dot", i === current && "ms-carousel__dot--active")
            },
            i
          )) }),
          hasAutoplayControl && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
            "button",
            {
              type: "button",
              "aria-label": isUserPaused ? "Play carousel" : "Pause carousel",
              "data-state": isUserPaused ? "paused" : "playing",
              onClick: () => setIsUserPaused((paused) => !paused),
              className: "ms-carousel__autoplay",
              children: [
                isUserPaused ? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react14.Play, { size: 14, strokeWidth: 2, "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react14.Pause, { size: 14, strokeWidth: 2, "aria-hidden": true }),
                /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: isUserPaused ? "Play" : "Pause" })
              ]
            }
          )
        ] })
      ]
    }
  );
});

// src/DatePicker.tsx
var import_react31 = require("react");
var import_lucide_react16 = require("lucide-react");
var import_react_aria_components5 = require("react-aria-components");

// src/Calendar.tsx
var import_react30 = require("react");
var import_date = require("@internationalized/date");
var import_lucide_react15 = require("lucide-react");
var import_react_aria_components4 = require("react-aria-components");
var import_jsx_runtime28 = require("react/jsx-runtime");
function calendarDateFromNativeDate(date) {
  return new import_date.CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}
function calendarDateToNativeDate(date, timeZone = (0, import_date.getLocalTimeZone)()) {
  return date.toDate(timeZone);
}
function CalendarLocale({ locale, children }) {
  return locale ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_aria_components4.I18nProvider, { locale, children }) : children;
}
var Calendar = (0, import_react30.forwardRef)(function Calendar2({
  value,
  defaultValue,
  onValueChange,
  focusedValue,
  defaultFocusedValue,
  onFocusChange,
  min,
  max,
  isDateUnavailable,
  disabled,
  readOnly,
  invalid,
  autoFocus,
  locale,
  firstDayOfWeek,
  weeksInMonth = 6,
  id,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...dataProps
}, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(CalendarLocale, { locale, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
    import_react_aria_components4.Calendar,
    {
      ...dataProps,
      ref,
      id,
      value,
      defaultValue,
      onChange: onValueChange,
      focusedValue,
      defaultFocusedValue,
      onFocusChange,
      minValue: min,
      maxValue: max,
      isDateUnavailable: isDateUnavailable ? (date) => isDateUnavailable(date) : void 0,
      isDisabled: disabled,
      isReadOnly: readOnly,
      "data-readonly": readOnly || void 0,
      isInvalid: invalid,
      autoFocus,
      firstDayOfWeek,
      weeksInMonth,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      className: cx("ms-calendar", className),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "ms-calendar__header", children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_aria_components4.Button, { slot: "previous", className: "ms-calendar__nav", children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_lucide_react15.ChevronLeft, { size: 16, strokeWidth: 2, "aria-hidden": true }) }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_aria_components4.CalendarHeading, { className: "ms-calendar__month" }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_aria_components4.Button, { slot: "next", className: "ms-calendar__nav", children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_lucide_react15.ChevronRight, { size: 16, strokeWidth: 2, "aria-hidden": true }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_react_aria_components4.CalendarGrid, { className: "ms-calendar__grid", weekdayStyle: "short", children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_aria_components4.CalendarGridHeader, { className: "ms-calendar__weekdays", children: (day) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_aria_components4.CalendarHeaderCell, { className: "ms-calendar__weekday", children: day }) }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_aria_components4.CalendarGridBody, { className: "ms-calendar__body", children: (date) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_aria_components4.CalendarCell, { date, className: "ms-calendar__cell" }) })
        ] })
      ]
    }
  ) });
});

// src/DatePicker.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
function DatePickerLocale({ locale, children }) {
  return locale ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_aria_components5.I18nProvider, { locale, children }) : children;
}
var DatePicker = (0, import_react31.forwardRef)(function DatePicker2({
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  isDateUnavailable,
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
  locale,
  firstDayOfWeek,
  weeksInMonth = 6,
  clearable = true,
  clearLabel = "Clear date",
  className,
  triggerClassName,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  "aria-required": ariaRequired,
  "aria-live": ariaLive,
  title,
  ...dataProps
}, ref) {
  const portalContainer = useMonosetPortalContainer();
  const label = ariaLabel ?? (ariaLabelledBy ? void 0 : "Date");
  const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";
  const isRequired = required || ariaRequired === true || ariaRequired === "true";
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(DatePickerLocale, { locale, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
    import_react_aria_components5.DatePicker,
    {
      ...dataProps,
      ref,
      value,
      defaultValue,
      onChange: onValueChange,
      minValue: min,
      maxValue: max,
      isDateUnavailable: isDateUnavailable ? (date) => isDateUnavailable(date) : void 0,
      isOpen: open,
      defaultOpen,
      onOpenChange,
      isDisabled: disabled,
      isReadOnly: readOnly,
      isRequired,
      isInvalid,
      granularity: "day",
      name,
      form,
      autoComplete,
      "aria-label": label,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      className: cx("ms-datepicker", className),
      children: ({ state }) => /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_jsx_runtime29.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
          import_react_aria_components5.Group,
          {
            id,
            title,
            "aria-live": ariaLive,
            "aria-describedby": ariaDescribedBy,
            "aria-invalid": isInvalid || void 0,
            "aria-required": isRequired || void 0,
            className: cx("ms-datepicker__trigger", triggerClassName),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_aria_components5.DateInput, { className: "ms-datepicker__input", "aria-label": label, children: (segment) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_aria_components5.DateSegment, { segment, className: "ms-datepicker__segment" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react_aria_components5.Button, { className: "ms-datepicker__button", children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_lucide_react16.Calendar, { size: 15, strokeWidth: 2, "aria-hidden": true }) })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          import_react_aria_components5.Popover,
          {
            UNSTABLE_portalContainer: portalContainer ?? void 0,
            placement: "bottom start",
            offset: 6,
            className: "ms-datepicker__panel",
            children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_react_aria_components5.Dialog, { className: "ms-datepicker__dialog", children: [
              /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                Calendar,
                {
                  locale,
                  firstDayOfWeek,
                  weeksInMonth
                }
              ),
              clearable && state.value && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "ms-datepicker__footer", children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                import_react_aria_components5.Button,
                {
                  className: "ms-datepicker__clear",
                  onPress: () => {
                    state.setValue(null);
                    state.setOpen(false);
                  },
                  children: clearLabel
                }
              ) })
            ] })
          }
        )
      ] })
    }
  ) });
});

// src/index.ts
var import_date2 = require("@internationalized/date");

// src/Tooltip.tsx
var RTooltip = __toESM(require("@radix-ui/react-tooltip"), 1);
var import_jsx_runtime30 = require("react/jsx-runtime");
function TooltipProvider({
  children,
  delayDuration = 300,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RTooltip.Provider, { ...props, delayDuration, children });
}
function Tooltip({
  content,
  children,
  side = "top",
  sideOffset = 6,
  align,
  className,
  contentProps,
  ...rootProps
}) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(RTooltip.Root, { ...rootProps, children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RTooltip.Trigger, { asChild: true, children }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(RTooltip.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      RTooltip.Content,
      {
        ...contentProps,
        side,
        sideOffset,
        align,
        className: cx("ms-tooltip", className),
        children: content
      }
    ) })
  ] });
}

// src/Popover.tsx
var RPopover = __toESM(require("@radix-ui/react-popover"), 1);
var import_react32 = require("react");
var import_jsx_runtime31 = require("react/jsx-runtime");
var Popover4 = RPopover.Root;
var PopoverTrigger = RPopover.Trigger;
var PopoverClose = RPopover.Close;
var PopoverContent = (0, import_react32.forwardRef)(function PopoverContent2({ className, children, sideOffset = 6, ...rest }, ref) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(RPopover.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    RPopover.Content,
    {
      ref,
      sideOffset,
      className: cx("ms-popover", className),
      ...rest,
      children
    }
  ) });
});

// src/DropdownMenu.tsx
var RDropdown = __toESM(require("@radix-ui/react-dropdown-menu"), 1);
var import_react33 = require("react");
var import_jsx_runtime32 = require("react/jsx-runtime");
var DropdownMenu = RDropdown.Root;
var DropdownMenuTrigger = RDropdown.Trigger;
var DropdownMenuSub = RDropdown.Sub;
var DropdownMenuContent = (0, import_react33.forwardRef)(function DropdownMenuContent2({ children, className, sideOffset = 6, ...rest }, ref) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(RDropdown.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    RDropdown.Content,
    {
      ref,
      sideOffset,
      className: cx("ms-menu", className),
      ...rest,
      children
    }
  ) });
});
var DropdownMenuItem = (0, import_react33.forwardRef)(function DropdownMenuItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    RDropdown.Item,
    {
      ref,
      className: cx("ms-menu__item", className),
      ...rest
    }
  );
});
var DropdownMenuLabel = (0, import_react33.forwardRef)(function DropdownMenuLabel2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    RDropdown.Label,
    {
      ref,
      className: cx("ms-menu__label", className),
      ...rest
    }
  );
});
var DropdownMenuSeparator = (0, import_react33.forwardRef)(function DropdownMenuSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    RDropdown.Separator,
    {
      ref,
      className: cx("ms-menu__separator", className),
      ...rest
    }
  );
});
var DropdownMenuGroup = (0, import_react33.forwardRef)(function DropdownMenuGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    RDropdown.Group,
    {
      ref,
      className: cx("ms-menu__group", className),
      ...rest
    }
  );
});
var DropdownMenuCheckboxItem = (0, import_react33.forwardRef)(function DropdownMenuCheckboxItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    RDropdown.CheckboxItem,
    {
      ref,
      className: cx(
        "ms-menu__item",
        "ms-menu__item--checkbox",
        className
      ),
      ...rest
    }
  );
});
var DropdownMenuItemIndicator = (0, import_react33.forwardRef)(function DropdownMenuItemIndicator2({ "aria-hidden": ariaHidden = true, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    RDropdown.ItemIndicator,
    {
      ref,
      "aria-hidden": ariaHidden,
      className: cx("ms-menu__indicator", className),
      ...rest
    }
  );
});
var DropdownMenuRadioGroup = (0, import_react33.forwardRef)(function DropdownMenuRadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    RDropdown.RadioGroup,
    {
      ref,
      className: cx(
        "ms-menu__group",
        "ms-menu__radio-group",
        className
      ),
      ...rest
    }
  );
});
var DropdownMenuRadioItem = (0, import_react33.forwardRef)(function DropdownMenuRadioItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    RDropdown.RadioItem,
    {
      ref,
      className: cx("ms-menu__item", "ms-menu__item--radio", className),
      ...rest
    }
  );
});
var DropdownMenuSubTrigger = (0, import_react33.forwardRef)(function DropdownMenuSubTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    RDropdown.SubTrigger,
    {
      ref,
      className: cx("ms-menu__item", "ms-menu__sub-trigger", className),
      ...rest
    }
  );
});
var DropdownMenuSubContent = (0, import_react33.forwardRef)(function DropdownMenuSubContent2({ className, sideOffset = 4, ...rest }, ref) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(RDropdown.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    RDropdown.SubContent,
    {
      ref,
      sideOffset,
      className: cx("ms-menu", "ms-menu__sub-content", className),
      ...rest
    }
  ) });
});

// src/Select.tsx
var RSelect = __toESM(require("@radix-ui/react-select"), 1);
var import_lucide_react17 = require("lucide-react");
var import_react34 = require("react");
var import_jsx_runtime33 = require("react/jsx-runtime");
var Select = RSelect.Root;
var SelectTrigger = (0, import_react34.forwardRef)(function SelectTrigger2({ className, placeholder, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(RSelect.Trigger, { ref, className: cx("ms-select", className), ...rest, children: [
    children ?? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.Value, { placeholder }),
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.Icon, { className: "ms-select__chevron", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react17.ChevronDown, { size: 12, strokeWidth: 2, "aria-hidden": true }) })
  ] });
});
var SelectContent = (0, import_react34.forwardRef)(function SelectContent2({
  children,
  className,
  position = "popper",
  sideOffset = 6,
  ...rest
}, ref) {
  const portalContainer = useMonosetPortalContainer();
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.Portal, { container: portalContainer ?? void 0, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
    RSelect.Content,
    {
      ref,
      className: cx("ms-menu", "ms-select__content", className),
      position,
      sideOffset,
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.ScrollUpButton, { className: "ms-select__scroll-up", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react17.ChevronUp, { size: 14, strokeWidth: 2, "aria-hidden": true }) }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.Viewport, { children }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.ScrollDownButton, { className: "ms-select__scroll-down", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react17.ChevronDown, { size: 14, strokeWidth: 2, "aria-hidden": true }) })
      ]
    }
  ) });
});
var SelectItem = (0, import_react34.forwardRef)(
  function SelectItem2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
      RSelect.Item,
      {
        ref,
        className: cx("ms-menu__item", "ms-select__item", className),
        ...rest,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.ItemIndicator, { className: "ms-select__indicator", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react17.Check, { size: 14, strokeWidth: 2, "aria-hidden": true }) }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(RSelect.ItemText, { children })
        ]
      }
    );
  }
);

// src/Skeleton.tsx
var import_react35 = require("react");
var import_jsx_runtime34 = require("react/jsx-runtime");
var Skeleton = (0, import_react35.forwardRef)(function Skeleton2({ width = "100%", height = 12, circle, style, className, ...rest }, ref) {
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
var import_react36 = require("react");
var import_jsx_runtime35 = require("react/jsx-runtime");
var EmptyState = (0, import_react36.forwardRef)(function EmptyState2({ icon, title, body, action, headingLevel = 2, className, ...rest }, ref) {
  const Heading2 = `h${headingLevel}`;
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { ...rest, ref, className: cx("ms-empty", className), children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "ms-empty__icon", "aria-hidden": true, children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(Heading2, { className: "ms-empty__title", children: title }),
    body && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "ms-empty__body", children: body }),
    action && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "ms-empty__action", children: action })
  ] });
});

// src/Pagination.tsx
var import_react37 = require("react");
var import_lucide_react18 = require("lucide-react");
var import_jsx_runtime36 = require("react/jsx-runtime");
function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}
function normalizePageCount(pageCount) {
  return Number.isFinite(pageCount) ? Math.max(0, Math.floor(pageCount)) : 0;
}
function normalizePage(page, pageCount) {
  const integerPage = Number.isFinite(page) ? Math.floor(page) : 1;
  return Math.min(Math.max(integerPage, 1), pageCount);
}
function normalizeSiblings(siblings) {
  return Number.isFinite(siblings) ? Math.max(0, Math.floor(siblings)) : 1;
}
var Pagination = (0, import_react37.forwardRef)(function Pagination2({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  prevLabel = /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_lucide_react18.ChevronLeft, { size: 16, strokeWidth: 2, "aria-hidden": true }),
  nextLabel = /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_lucide_react18.ChevronRight, { size: 16, strokeWidth: 2, "aria-hidden": true }),
  className,
  "aria-label": ariaLabel = "Pagination",
  ...rest
}, ref) {
  const normalizedPageCount = normalizePageCount(pageCount);
  if (normalizedPageCount <= 1) return null;
  const normalizedPage = normalizePage(page, normalizedPageCount);
  const normalizedSiblings = normalizeSiblings(siblings);
  const first = 1;
  const last = normalizedPageCount;
  const start = Math.max(normalizedPage - normalizedSiblings, first + 1);
  const end = Math.min(normalizedPage + normalizedSiblings, last - 1);
  const pages = [first];
  if (start > first + 1) pages.push("\u2026");
  pages.push(...range(start, end));
  if (end < last - 1) pages.push("\u2026");
  if (last > first) pages.push(last);
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
    "nav",
    {
      ...rest,
      ref,
      "aria-label": ariaLabel,
      className: cx("ms-pagination", className),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
          "button",
          {
            type: "button",
            className: "ms-pagination__btn",
            "aria-label": "Previous page",
            disabled: normalizedPage <= 1,
            onClick: () => onPageChange(normalizedPage - 1),
            children: prevLabel
          }
        ),
        pages.map(
          (p, i) => p === "\u2026" ? /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("span", { className: "ms-pagination__btn", "aria-hidden": true, children: "\u2026" }, `e-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
            "button",
            {
              type: "button",
              className: "ms-pagination__btn",
              "aria-current": p === normalizedPage ? "page" : void 0,
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
            disabled: normalizedPage >= normalizedPageCount,
            onClick: () => onPageChange(normalizedPage + 1),
            children: nextLabel
          }
        )
      ]
    }
  );
});

// src/Breadcrumb.tsx
var import_react38 = require("react");
var import_jsx_runtime37 = require("react/jsx-runtime");
var Breadcrumb = (0, import_react38.forwardRef)(
  function Breadcrumb2({ items, separator = "/", className, "aria-label": ariaLabel = "Breadcrumb", ...rest }, ref) {
    const hasExplicitCurrent = items.some((item) => item.current === true);
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
      "nav",
      {
        ...rest,
        ref,
        "aria-label": ariaLabel,
        className: cx("ms-breadcrumb", className),
        children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("ol", { className: "ms-breadcrumb__list", children: items.map((item, index) => {
          const current = item.current ?? (!hasExplicitCurrent && index === items.length - 1);
          const fallbackKey = item.href ?? (typeof item.label === "string" ? item.label : "item");
          const key = item.id ?? `${fallbackKey}-${index}`;
          return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("li", { className: "ms-breadcrumb__entry", children: [
            index > 0 && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "ms-breadcrumb__sep", "aria-hidden": true, children: separator }),
            item.href && !current ? /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("a", { href: item.href, className: "ms-breadcrumb__item", children: item.label }) : /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "ms-breadcrumb__item", "aria-current": current ? "page" : void 0, children: item.label })
          ] }, key);
        }) })
      }
    );
  }
);

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
  const isIndeterminate = indeterminate ?? value === void 0;
  const normalizedMax = Number.isFinite(max) && max > 0 ? max : 100;
  const normalizedValue = Number.isFinite(value) ? Math.min(normalizedMax, Math.max(0, value ?? 0)) : 0;
  const pct = isIndeterminate ? void 0 : normalizedValue / normalizedMax * 100;
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(RProgress.Root, { value: isIndeterminate ? null : normalizedValue, max: normalizedMax, "aria-label": ariaLabel, className: cx("ms-progress", className), children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
    RProgress.Indicator,
    {
      className: "ms-progress__indicator",
      style: isIndeterminate ? { width: "40%", animation: "ms-indeterminate 1.4s infinite" } : { width: `${pct}%` }
    }
  ) });
}

// src/Separator.tsx
var RSeparator = __toESM(require("@radix-ui/react-separator"), 1);
var import_react39 = require("react");
var import_jsx_runtime39 = require("react/jsx-runtime");
var Separator3 = (0, import_react39.forwardRef)(function Separator4({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(RSeparator.Root, { ref, className: cx("ms-separator", className), ...rest });
});

// src/Layout.tsx
var import_react40 = require("react");
var import_jsx_runtime40 = require("react/jsx-runtime");
var DEFAULT_GRID_MIN_WIDTH = "240px";
var CSS_LENGTH = /^(?:0|(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em|ch|ex|cap|ic|lh|rlh|vw|vh|vi|vb|vmin|vmax|svw|svh|lvw|lvh|dvw|dvh|cm|mm|q|in|pc|pt|%))$/i;
var CSS_SIZE_KEYWORD = /^(?:auto|min-content|max-content)$/i;
var CSS_SIZE_FUNCTION = /^(?:var|calc|min|max|clamp|fit-content)\(.+\)$/i;
function normalizeColumns(columns) {
  if (columns === void 0 || !Number.isFinite(columns)) return void 0;
  return Math.max(1, Math.trunc(columns));
}
function hasBalancedParentheses(value) {
  let depth = 0;
  for (const character of value) {
    if (character === "(") depth += 1;
    if (character === ")") depth -= 1;
    if (depth < 0) return false;
  }
  return depth === 0;
}
function normalizeMinWidth(minWidth) {
  if (typeof minWidth === "number") {
    return Number.isFinite(minWidth) && minWidth >= 0 ? `${minWidth}px` : DEFAULT_GRID_MIN_WIDTH;
  }
  const value = minWidth.trim();
  if (value.length === 0 || /[;{}]/.test(value) || !hasBalancedParentheses(value) || !CSS_LENGTH.test(value) && !CSS_SIZE_KEYWORD.test(value) && !CSS_SIZE_FUNCTION.test(value)) {
    return DEFAULT_GRID_MIN_WIDTH;
  }
  return value;
}
var Stack = (0, import_react40.forwardRef)(function Stack2({ gap = 4, align, style, className, ...rest }, ref) {
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
var Inline = (0, import_react40.forwardRef)(function Inline2({ gap = 4, align, wrap = true, style, className, ...rest }, ref) {
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
var Grid2 = (0, import_react40.forwardRef)(function Grid3({ columns, minWidth = 240, gap = 4, style, className, ...rest }, ref) {
  const normalizedColumns = normalizeColumns(columns);
  const min = normalizeMinWidth(minWidth);
  const template = normalizedColumns === void 0 ? `repeat(auto-fit, minmax(${min}, 1fr))` : `repeat(${normalizedColumns}, 1fr)`;
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
var Container = (0, import_react40.forwardRef)(function Container2({ size = "lg", padding = true, style, className, ...rest }, ref) {
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
var import_react41 = require("react");
var import_jsx_runtime41 = require("react/jsx-runtime");
var Kbd = (0, import_react41.forwardRef)(function Kbd2({ size = "md", className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("kbd", { ref, className: cx("ms-kbd", `ms-kbd--${size}`, className), ...rest });
});

// src/Spinner.tsx
var import_react42 = require("react");
var import_jsx_runtime42 = require("react/jsx-runtime");
var Spinner = (0, import_react42.forwardRef)(function Spinner2({ size = 16, label = "Loading", className, style, ...rest }, ref) {
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
var import_lucide_react19 = require("lucide-react");
var import_react43 = require("react");
var import_jsx_runtime43 = require("react/jsx-runtime");
var Accordion = RAccordion.Root;
var AccordionItem = (0, import_react43.forwardRef)(function AccordionItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(RAccordion.Item, { ref, className: cx("ms-accordion__item", className), ...rest });
});
var AccordionTrigger = (0, import_react43.forwardRef)(function AccordionTrigger2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(RAccordion.Header, { className: "ms-accordion__header", children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(RAccordion.Trigger, { ref, className: cx("ms-accordion__trigger", className), ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { children }),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
      import_lucide_react19.ChevronDown,
      {
        className: "ms-accordion__chevron",
        size: 14,
        strokeWidth: 2,
        "aria-hidden": true
      }
    )
  ] }) });
});
var AccordionContent = (0, import_react43.forwardRef)(function AccordionContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(RAccordion.Content, { ref, className: cx("ms-accordion__content", className), ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "ms-accordion__content-inner", children }) });
});

// src/Slider.tsx
var RSlider = __toESM(require("@radix-ui/react-slider"), 1);
var import_react44 = require("react");
var import_jsx_runtime44 = require("react/jsx-runtime");
function defaultThumbLabel(count, index) {
  if (count === 1) return "Value";
  if (count === 2) return index === 0 ? "Minimum" : "Maximum";
  return `Value ${index + 1}`;
}
var Slider = (0, import_react44.forwardRef)(function Slider2({
  className,
  defaultValue = [50],
  value,
  thumbLabels,
  thumbLabelledBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...rest
}, ref) {
  const thumbs = value ?? defaultValue;
  const thumbCount = thumbs.length;
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
        thumbs.map((_, i) => {
          const labelledBy = thumbLabelledBy?.[i] || (thumbCount === 1 ? ariaLabelledBy : void 0);
          const label = thumbLabels?.[i] || (thumbCount === 1 ? ariaLabel : void 0) || defaultThumbLabel(thumbCount, i);
          return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
            RSlider.Thumb,
            {
              className: "ms-slider__thumb",
              "aria-label": labelledBy ? void 0 : label,
              "aria-labelledby": labelledBy || void 0
            },
            i
          );
        })
      ]
    }
  );
});

// src/ToggleGroup.tsx
var RToggleGroup = __toESM(require("@radix-ui/react-toggle-group"), 1);
var RToggle = __toESM(require("@radix-ui/react-toggle"), 1);
var import_react45 = require("react");
var import_jsx_runtime45 = require("react/jsx-runtime");
var Toggle = (0, import_react45.forwardRef)(function Toggle2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(RToggle.Root, { ref, className: cx("ms-toggle", className), ...rest });
});
var ToggleGroup = (0, import_react45.forwardRef)(function ToggleGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(RToggleGroup.Root, { ref, className: cx("ms-toggle-group", className), ...rest });
});
var ToggleGroupItem = (0, import_react45.forwardRef)(function ToggleGroupItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(RToggleGroup.Item, { ref, className: cx("ms-toggle", className), ...rest });
});

// src/Collapsible.tsx
var RCollapsible = __toESM(require("@radix-ui/react-collapsible"), 1);
var import_react46 = require("react");
var import_lucide_react20 = require("lucide-react");
var import_jsx_runtime46 = require("react/jsx-runtime");
var Collapsible = RCollapsible.Root;
var CollapsibleTrigger = (0, import_react46.forwardRef)(function CollapsibleTrigger2({ className, children, hideChevron, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(RCollapsible.Trigger, { ref, className: cx("ms-collapsible__trigger", className), ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("span", { className: "ms-collapsible__label", children }),
    !hideChevron && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_lucide_react20.ChevronDown, { className: "ms-collapsible__chevron", size: 16, strokeWidth: 2, "aria-hidden": true })
  ] });
});
var CollapsibleContent = (0, import_react46.forwardRef)(function CollapsibleContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(RCollapsible.Content, { ref, className: cx("ms-collapsible__content", className), ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("div", { className: "ms-collapsible__inner", children }) });
});

// src/AspectRatio.tsx
var RAspectRatio = __toESM(require("@radix-ui/react-aspect-ratio"), 1);
var import_react47 = require("react");
var import_jsx_runtime47 = require("react/jsx-runtime");
var AspectRatio = (0, import_react47.forwardRef)(
  function AspectRatio2({ ratio = 1, className, ...rest }, ref) {
    const normalizedRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
    return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(RAspectRatio.Root, { ref, ratio: normalizedRatio, className: cx("ms-aspect-ratio", className), ...rest });
  }
);

// src/MonosetProvider.tsx
var import_react49 = require("react");
var import_framer_motion4 = require("framer-motion");

// src/Theme.tsx
var import_react48 = require("react");
var import_lucide_react21 = require("lucide-react");
var import_jsx_runtime48 = require("react/jsx-runtime");
var ThemeCtx = (0, import_react48.createContext)(null);
var DocumentThemeDepthCtx = (0, import_react48.createContext)(0);
var documentThemeRegistries = /* @__PURE__ */ new WeakMap();
var documentThemeSequence = 0;
function applyDocumentTheme(root, registry) {
  const owner = registry.owners.reduce((winner, entry) => {
    if (!winner || entry.depth > winner.depth) return entry;
    if (entry.depth === winner.depth && entry.sequence > winner.sequence) return entry;
    return winner;
  }, null);
  if (owner) {
    root.setAttribute("data-monoset-theme", owner.theme);
    root.classList.toggle("monoset-dark", owner.theme === "dark");
    return;
  }
  if (registry.baselineTheme === null) root.removeAttribute("data-monoset-theme");
  else root.setAttribute("data-monoset-theme", registry.baselineTheme);
  root.classList.toggle("monoset-dark", registry.baselineDark);
}
function registerDocumentTheme(root, identity, depth, theme) {
  let registry = documentThemeRegistries.get(root);
  if (!registry) {
    registry = {
      baselineTheme: root.getAttribute("data-monoset-theme"),
      baselineDark: root.classList.contains("monoset-dark"),
      owners: []
    };
    documentThemeRegistries.set(root, registry);
  }
  registry.owners.push({
    identity,
    depth,
    sequence: ++documentThemeSequence,
    theme
  });
  applyDocumentTheme(root, registry);
}
function updateDocumentTheme(root, identity, theme) {
  const registry = documentThemeRegistries.get(root);
  const owner = registry?.owners.find((entry) => entry.identity === identity);
  if (!registry || !owner) return;
  owner.theme = theme;
  applyDocumentTheme(root, registry);
}
function unregisterDocumentTheme(root, identity) {
  const registry = documentThemeRegistries.get(root);
  if (!registry) return;
  registry.owners = registry.owners.filter((entry) => entry.identity !== identity);
  applyDocumentTheme(root, registry);
  if (registry.owners.length === 0) documentThemeRegistries.delete(root);
}
function isTheme(value) {
  return value === "light" || value === "dark" || value === "system";
}
function getStorage(storage) {
  if (storage !== void 0) return storage;
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}
function getMediaQuery() {
  if (typeof window === "undefined") return null;
  try {
    return typeof window.matchMedia === "function" ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  } catch {
    return null;
  }
}
function withoutOwnedDarkClass(className) {
  const classes = className?.split(/\s+/).filter((name) => name && name !== "monoset-dark").join(" ");
  return classes || void 0;
}
function ThemeProvider({
  children,
  initialTheme = "system",
  storageKey = "monoset-theme",
  storage,
  target = "document",
  scopeProps
}) {
  const parentDocumentDepth = (0, import_react48.useContext)(DocumentThemeDepthCtx);
  const [ownerIdentity] = (0, import_react48.useState)(() => /* @__PURE__ */ Symbol("monoset-document-theme-owner"));
  const documentDepth = parentDocumentDepth + (target === "document" ? 1 : 0);
  const [theme, setThemeState] = (0, import_react48.useState)(initialTheme);
  const [systemTheme, setSystemTheme] = (0, import_react48.useState)("light");
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const [registrationTheme] = (0, import_react48.useState)(resolvedTheme);
  const setTheme = (0, import_react48.useCallback)(
    (next) => {
      setThemeState(next);
      const persistence = getStorage(storage);
      try {
        persistence?.setItem(storageKey, next);
      } catch {
      }
    },
    [storage, storageKey]
  );
  (0, import_react48.useEffect)(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      const persistence = getStorage(storage);
      try {
        const stored = persistence?.getItem(storageKey);
        if (active && isTheme(stored)) setThemeState(stored);
      } catch {
      }
    });
    return () => {
      active = false;
    };
  }, [storage, storageKey]);
  (0, import_react48.useEffect)(() => {
    const query = getMediaQuery();
    if (!query) return;
    const update = (event) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };
    update(query);
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", update);
      return () => query.removeEventListener("change", update);
    }
    if (typeof query.addListener === "function") {
      query.addListener(update);
      return () => query.removeListener(update);
    }
  }, []);
  (0, import_react48.useEffect)(() => {
    if (target !== "document" || typeof document === "undefined") return;
    const root = document.documentElement;
    registerDocumentTheme(root, ownerIdentity, documentDepth, registrationTheme);
    return () => unregisterDocumentTheme(root, ownerIdentity);
  }, [documentDepth, ownerIdentity, registrationTheme, target]);
  (0, import_react48.useEffect)(() => {
    if (target !== "document" || typeof document === "undefined") return;
    updateDocumentTheme(document.documentElement, ownerIdentity, resolvedTheme);
  }, [ownerIdentity, resolvedTheme, target]);
  const value = (0, import_react48.useMemo)(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );
  const content = /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(DocumentThemeDepthCtx.Provider, { value: documentDepth, children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(ThemeCtx.Provider, { value, children }) });
  if (target !== "scope") return content;
  const { className, ...nativeScopeProps } = scopeProps ?? {};
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
    "div",
    {
      ...nativeScopeProps,
      className: cx(
        withoutOwnedDarkClass(className),
        resolvedTheme === "dark" && "monoset-dark"
      ),
      "data-monoset-theme": resolvedTheme,
      children: content
    }
  );
}
function useTheme() {
  const ctx = (0, import_react48.useContext)(ThemeCtx);
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
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_lucide_react21.Sun, { size: 16, strokeWidth: 2, "aria-hidden": "true" });
}
function MoonIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_lucide_react21.Moon, { size: 16, strokeWidth: 2, "aria-hidden": "true" });
}
function MonitorIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_lucide_react21.Monitor, { size: 16, strokeWidth: 2, "aria-hidden": "true" });
}
var ICON = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon
};
var ThemeToggle = (0, import_react48.forwardRef)(
  function ThemeToggle2({ className, onClick, type = "button", "aria-label": ariaLabel, ...rest }, ref) {
    const { theme, setTheme } = useTheme();
    const Icon2 = ICON[theme];
    const handleClick = (event) => {
      setTheme(NEXT[theme]);
      onClick?.(event);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
      "button",
      {
        ...rest,
        ref,
        type,
        "aria-label": ariaLabel ?? LABEL[theme],
        className: cx("ms-btn", "ms-btn--ghost", "ms-btn--sm", className),
        onClick: handleClick,
        children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(Icon2, {})
      }
    );
  }
);

// src/MonosetProvider.tsx
var import_jsx_runtime49 = require("react/jsx-runtime");
var InfrastructureContext = (0, import_react49.createContext)({
  tooltip: false,
  toast: false
});
function MonosetProvider({
  children,
  theme,
  tooltip,
  toast,
  motion: motion2,
  portal
}) {
  const parentInfrastructure = (0, import_react49.useContext)(InfrastructureContext);
  const parentPortal = useMonosetPortalContainer();
  const addTooltipProvider = tooltip !== false && !parentInfrastructure.tooltip;
  const addToastProvider = toast !== false && !parentInfrastructure.toast;
  const infrastructure = (0, import_react49.useMemo)(
    () => ({
      tooltip: parentInfrastructure.tooltip || addTooltipProvider,
      toast: parentInfrastructure.toast || addToastProvider
    }),
    [addToastProvider, addTooltipProvider, parentInfrastructure]
  );
  const portalContainer = portal === void 0 ? parentPortal : portal === false ? null : portal.container;
  const reducedMotionPreference = motion2 && motion2.reducedMotion ? motion2.reducedMotion : "user";
  let content = /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(InfrastructureContext.Provider, { value: infrastructure, children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(MonosetPortalContext.Provider, { value: portalContainer, children }) });
  if (addToastProvider) {
    content = /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(ToastProvider, { ...toast || {}, children: content });
  }
  if (addTooltipProvider) {
    content = /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(TooltipProvider, { ...tooltip || {}, children: content });
  }
  if (motion2 !== false) {
    content = /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(ReducedMotionPreferenceContext.Provider, { value: reducedMotionPreference, children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_framer_motion4.MotionConfig, { reducedMotion: "user", ...motion2, children: content }) });
  }
  if (theme) {
    content = /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(ThemeProvider, { ...theme, children: content });
  }
  return content;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AppShell,
  AspectRatio,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  CalendarDate,
  Card,
  Carousel,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  CommandPalette,
  Container,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  DatePicker,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  EmptyState,
  Field,
  FileUpload,
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
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
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
  calendarDateFromNativeDate,
  calendarDateToNativeDate,
  cx,
  useAppShellMobile,
  useTheme,
  useToast
});
//# sourceMappingURL=index.cjs.map