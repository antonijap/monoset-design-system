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
  DUR: () => import_motion3.DUR,
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
  EASE_EMPHASIS: () => import_motion3.EASE_EMPHASIS,
  EASE_EXIT: () => import_motion3.EASE_EXIT,
  EASE_STANDARD: () => import_motion3.EASE_STANDARD,
  EmptyState: () => EmptyState,
  Field: () => Field,
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
  Select: () => Select,
  SelectContent: () => SelectContent,
  SelectItem: () => SelectItem,
  SelectTrigger: () => SelectTrigger,
  Separator: () => Separator2,
  Skeleton: () => Skeleton,
  Slider: () => Slider,
  Spinner: () => Spinner,
  Switch: () => Switch,
  Table: () => Table,
  Tabs: () => Tabs,
  TabsContent: () => TabsContent,
  TabsList: () => TabsList,
  TabsTrigger: () => TabsTrigger,
  Textarea: () => Textarea,
  Toast: () => Toast,
  ToastProvider: () => ToastProvider,
  Toggle: () => Toggle,
  ToggleGroup: () => ToggleGroup,
  ToggleGroupItem: () => ToggleGroupItem,
  Tooltip: () => Tooltip,
  TooltipProvider: () => TooltipProvider,
  cx: () => cx,
  fadeUp: () => import_motion3.fadeUp,
  hoverLift: () => import_motion3.hoverLift,
  listStagger: () => import_motion3.listStagger,
  modalPanel: () => import_motion3.modalPanel,
  modalScrim: () => import_motion3.modalScrim,
  popoverIn: () => import_motion3.popoverIn,
  pressDown: () => import_motion3.pressDown
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

// src/Checkbox.tsx
var RCheckbox = __toESM(require("@radix-ui/react-checkbox"), 1);
var import_react7 = require("react");
var import_framer_motion = require("framer-motion");
var import_motion = require("@monoset/motion");
var import_jsx_runtime7 = require("react/jsx-runtime");
var Checkbox = (0, import_react7.forwardRef)(function Checkbox2({ label, className, checked, defaultChecked, ...rest }, ref) {
  const isChecked = checked ?? defaultChecked ?? false;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: cx("ms-check", className), "data-state": isChecked ? "checked" : "unchecked", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      RCheckbox.Root,
      {
        ref,
        checked,
        defaultChecked,
        className: "ms-check__box",
        ...rest,
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(RCheckbox.Indicator, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_framer_motion.AnimatePresence, { initial: false, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          import_framer_motion.motion.span,
          {
            initial: { opacity: 0, scale: 0.6 },
            animate: { opacity: 1, scale: 1, transition: { duration: import_motion.DUR.fast, ease: import_motion.EASE_EMPHASIS } },
            exit: { opacity: 0, scale: 0.6, transition: { duration: import_motion.DUR.fast, ease: import_motion.EASE_EXIT } },
            style: { display: "inline-flex" },
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M5 12l5 5L20 7" }) })
          },
          "check"
        ) }) })
      }
    ),
    label && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: label })
  ] });
});

// src/Switch.tsx
var RSwitch = __toESM(require("@radix-ui/react-switch"), 1);
var import_react8 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var Switch = (0, import_react8.forwardRef)(function Switch2({ label, className, checked, defaultChecked, ...rest }, ref) {
  const isChecked = checked ?? defaultChecked ?? false;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("label", { className: cx("ms-switch", className), "data-state": isChecked ? "checked" : "unchecked", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      RSwitch.Root,
      {
        ref,
        checked,
        defaultChecked,
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
var import_react9 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime");
var RadioGroup = (0, import_react9.forwardRef)(function RadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(RRadio.Root, { ref, className: cx("ms-radio-group", className), ...rest });
});
var Radio = (0, import_react9.forwardRef)(function Radio2({ label, className, value, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { className: cx("ms-radio", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(RRadio.Item, { ref, value, className: "ms-radio__dot", ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(RRadio.Indicator, {}) }),
    label && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: label })
  ] });
});

// src/Tabs.tsx
var RTabs = __toESM(require("@radix-ui/react-tabs"), 1);
var import_react10 = require("react");
var import_framer_motion2 = require("framer-motion");
var import_motion2 = require("@monoset/motion");
var import_jsx_runtime10 = require("react/jsx-runtime");
var Tabs = RTabs.Root;
var TabsList = (0, import_react10.forwardRef)(function TabsList2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(RTabs.List, { ref, className: cx("ms-tabs__list", className), ...rest });
});
var TabsTrigger = (0, import_react10.forwardRef)(function TabsTrigger2({ className, children, isActive, layoutId = "ms-tabs-indicator", ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    RTabs.Trigger,
    {
      ref,
      className: cx("ms-tabs__trigger", className),
      "data-state": isActive ? "active" : "inactive",
      ...rest,
      children: [
        children,
        isActive && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
var import_react11 = require("react");
var import_jsx_runtime11 = require("react/jsx-runtime");
var Table = (0, import_react11.forwardRef)(
  function Table2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "ms-table-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("table", { ref, className: cx("ms-table", className), ...rest, children }) });
  }
);

// src/Toast.tsx
var RToast = __toESM(require("@radix-ui/react-toast"), 1);
var import_jsx_runtime12 = require("react/jsx-runtime");
function ToastProvider({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(RToast.Provider, { swipeDirection: "right", duration: 4e3, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RToast.Viewport, { className: "ms-toast-viewport" })
  ] });
}
function Toast({ title, kind = "info", action, children, className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(RToast.Root, { className: cx("ms-toast", className), "data-kind": kind, ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { "aria-hidden": true, style: {
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
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RToast.Title, { style: { fontWeight: 600 }, children: title }),
      children && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RToast.Description, { children })
    ] }),
    action && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RToast.Action, { altText: "Action", asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "ms-toast__action", children: action }) })
  ] });
}

// src/Dialog.tsx
var RDialog = __toESM(require("@radix-ui/react-dialog"), 1);
var import_jsx_runtime13 = require("react/jsx-runtime");
var Dialog = RDialog.Root;
var DialogTrigger = RDialog.Trigger;
var DialogClose = RDialog.Close;
function DialogContent({ title, description, children, className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(RDialog.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(RDialog.Overlay, { className: "ms-dialog-scrim" }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(RDialog.Content, { className: cx("ms-dialog", className), ...rest, children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(RDialog.Title, { className: "ms-dialog__title", children: title }),
      description && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(RDialog.Description, { className: "ms-dialog__desc", children: description }),
      children
    ] })
  ] });
}

// src/Tooltip.tsx
var RTooltip = __toESM(require("@radix-ui/react-tooltip"), 1);
var import_jsx_runtime14 = require("react/jsx-runtime");
function TooltipProvider({ children, delayDuration = 300 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RTooltip.Provider, { delayDuration, children });
}
function Tooltip({ content, side = "top", children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(RTooltip.Root, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RTooltip.Trigger, { asChild: true, children }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RTooltip.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RTooltip.Content, { side, sideOffset: 6, className: cx("ms-tooltip"), children: content }) })
  ] });
}

// src/Popover.tsx
var RPopover = __toESM(require("@radix-ui/react-popover"), 1);
var import_jsx_runtime15 = require("react/jsx-runtime");
var Popover = RPopover.Root;
var PopoverTrigger = RPopover.Trigger;
var PopoverClose = RPopover.Close;
function PopoverContent({ className, children, sideOffset = 6, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RPopover.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(RPopover.Content, { sideOffset, className: cx("ms-popover", className), ...rest, children }) });
}

// src/DropdownMenu.tsx
var RDropdown = __toESM(require("@radix-ui/react-dropdown-menu"), 1);
var import_jsx_runtime16 = require("react/jsx-runtime");
var DropdownMenu = RDropdown.Root;
var DropdownMenuTrigger = RDropdown.Trigger;
function DropdownMenuContent({ children, className, sideOffset = 6, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RDropdown.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RDropdown.Content, { sideOffset, className: cx("ms-menu", className), ...rest, children }) });
}
function DropdownMenuItem({ className, children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RDropdown.Item, { className: cx("ms-menu__item", className), ...rest, children });
}
function DropdownMenuLabel({ className, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RDropdown.Label, { className: cx("ms-menu__label", className), children });
}
function DropdownMenuSeparator() {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(RDropdown.Separator, { className: "ms-menu__separator" });
}

// src/Select.tsx
var RSelect = __toESM(require("@radix-ui/react-select"), 1);
var import_react12 = require("react");
var import_jsx_runtime17 = require("react/jsx-runtime");
var Select = RSelect.Root;
var SelectTrigger = (0, import_react12.forwardRef)(function SelectTrigger2({ className, placeholder, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(RSelect.Trigger, { ref, className: cx("ms-select", className), ...rest, children: [
    children ?? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RSelect.Value, { placeholder }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RSelect.Icon, { "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "m6 9 6 6 6-6" }) }) })
  ] });
});
function SelectContent({ children, className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RSelect.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RSelect.Content, { className: cx("ms-menu", className), position: "popper", sideOffset: 6, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RSelect.Viewport, { children }) }) });
}
var SelectItem = (0, import_react12.forwardRef)(
  function SelectItem2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RSelect.Item, { ref, className: cx("ms-menu__item", className), ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RSelect.ItemText, { children }) });
  }
);

// src/Skeleton.tsx
var import_react13 = require("react");
var import_jsx_runtime18 = require("react/jsx-runtime");
var Skeleton = (0, import_react13.forwardRef)(function Skeleton2({ width = "100%", height = 12, circle, style, className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
var import_jsx_runtime19 = require("react/jsx-runtime");
function EmptyState({ icon, title, body, action, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: cx("ms-empty", className), children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "ms-empty__icon", "aria-hidden": true, children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "ms-empty__title", children: title }),
    body && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "ms-empty__body", children: body }),
    action
  ] });
}

// src/Pagination.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("nav", { "aria-label": "Pagination", className: cx("ms-pagination", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
      (p, i) => p === "\u2026" ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "ms-pagination__btn", "aria-hidden": true, children: "\u2026" }, `e-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
var import_react14 = require("react");
var import_jsx_runtime21 = require("react/jsx-runtime");
function Breadcrumb({ items, separator = "/", className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("nav", { "aria-label": "Breadcrumb", className: cx("ms-breadcrumb", className), children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_react14.Fragment, { children: [
    i > 0 && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "ms-breadcrumb__sep", "aria-hidden": true, children: separator }),
    it.href && !it.current ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("a", { href: it.href, className: "ms-breadcrumb__item", children: it.label }) : /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "ms-breadcrumb__item", "aria-current": it.current ? "page" : void 0, children: it.label })
  ] }, i)) });
}

// src/Progress.tsx
var RProgress = __toESM(require("@radix-ui/react-progress"), 1);
var import_jsx_runtime22 = require("react/jsx-runtime");
function Progress({
  value,
  max = 100,
  indeterminate,
  className,
  "aria-label": ariaLabel = "Progress"
}) {
  const pct = indeterminate ? void 0 : Math.min(100, Math.max(0, (value ?? 0) / max * 100));
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(RProgress.Root, { value: indeterminate ? null : value ?? 0, max, "aria-label": ariaLabel, className: cx("ms-progress", className), children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    RProgress.Indicator,
    {
      className: "ms-progress__indicator",
      style: indeterminate ? { width: "40%", animation: "ms-indeterminate 1.4s infinite" } : { width: `${pct}%` }
    }
  ) });
}

// src/Separator.tsx
var RSeparator = __toESM(require("@radix-ui/react-separator"), 1);
var import_jsx_runtime23 = require("react/jsx-runtime");
function Separator2({ className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(RSeparator.Root, { className: cx("ms-separator", className), ...rest });
}

// src/Kbd.tsx
var import_react15 = require("react");
var import_jsx_runtime24 = require("react/jsx-runtime");
var Kbd = (0, import_react15.forwardRef)(function Kbd2({ size = "md", className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("kbd", { ref, className: cx("ms-kbd", `ms-kbd--${size}`, className), ...rest });
});

// src/Spinner.tsx
var import_react16 = require("react");
var import_jsx_runtime25 = require("react/jsx-runtime");
var Spinner = (0, import_react16.forwardRef)(function Spinner2({ size = 16, label = "Loading", className, style, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
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
var import_react17 = require("react");
var import_jsx_runtime26 = require("react/jsx-runtime");
var Accordion = RAccordion.Root;
var AccordionItem = (0, import_react17.forwardRef)(function AccordionItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(RAccordion.Item, { ref, className: cx("ms-accordion__item", className), ...rest });
});
var AccordionTrigger = (0, import_react17.forwardRef)(function AccordionTrigger2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(RAccordion.Header, { className: "ms-accordion__header", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(RAccordion.Trigger, { ref, className: cx("ms-accordion__trigger", className), ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { children }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("polyline", { points: "6 9 12 15 18 9" })
      }
    )
  ] }) });
});
var AccordionContent = (0, import_react17.forwardRef)(function AccordionContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(RAccordion.Content, { ref, className: cx("ms-accordion__content", className), ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "ms-accordion__content-inner", children }) });
});

// src/Slider.tsx
var RSlider = __toESM(require("@radix-ui/react-slider"), 1);
var import_react18 = require("react");
var import_jsx_runtime27 = require("react/jsx-runtime");
var Slider = (0, import_react18.forwardRef)(function Slider2({ className, defaultValue = [50], value, ...rest }, ref) {
  const thumbs = value ?? defaultValue;
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
    RSlider.Root,
    {
      ref,
      className: cx("ms-slider", className),
      defaultValue,
      value,
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RSlider.Track, { className: "ms-slider__track", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RSlider.Range, { className: "ms-slider__range" }) }),
        thumbs.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(RSlider.Thumb, { className: "ms-slider__thumb", "aria-label": `Value ${i + 1}` }, i))
      ]
    }
  );
});

// src/ToggleGroup.tsx
var RToggleGroup = __toESM(require("@radix-ui/react-toggle-group"), 1);
var RToggle = __toESM(require("@radix-ui/react-toggle"), 1);
var import_react19 = require("react");
var import_jsx_runtime28 = require("react/jsx-runtime");
var Toggle = (0, import_react19.forwardRef)(function Toggle2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(RToggle.Root, { ref, className: cx("ms-toggle", className), ...rest });
});
var ToggleGroup = (0, import_react19.forwardRef)(function ToggleGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(RToggleGroup.Root, { ref, className: cx("ms-toggle-group", className), ...rest });
});
var ToggleGroupItem = (0, import_react19.forwardRef)(function ToggleGroupItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(RToggleGroup.Item, { ref, className: cx("ms-toggle", className), ...rest });
});

// src/MonosetProvider.tsx
var import_framer_motion3 = require("framer-motion");
var import_jsx_runtime29 = require("react/jsx-runtime");
function MonosetProvider({
  children,
  reducedMotion = "user",
  tooltipDelay = 300
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_framer_motion3.MotionConfig, { reducedMotion, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(TooltipProvider, { delayDuration: tooltipDelay, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(ToastProvider, { children }) }) });
}

// src/index.ts
var import_motion3 = require("@monoset/motion");
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
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
  pressDown
});
//# sourceMappingURL=index.cjs.map