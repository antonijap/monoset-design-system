import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Sheet.tsx
import * as RDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Sheet = RDialog.Root;
var SheetTrigger = RDialog.Trigger;
var SheetClose = RDialog.Close;
var SheetContent = forwardRef(function SheetContent2({
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
  return /* @__PURE__ */ jsxs(RDialog.Portal, { container: portalContainer ?? void 0, children: [
    /* @__PURE__ */ jsx(RDialog.Overlay, { className: cx("ms-sheet-scrim", overlayClassName) }),
    /* @__PURE__ */ jsxs(
      RDialog.Content,
      {
        ref,
        className: cx("ms-sheet", `ms-sheet--${side}`, className),
        style: { ...sizeStyle(side, px), ...style },
        ...descriptionProps,
        ...rest,
        children: [
          showClose && /* @__PURE__ */ jsx(RDialog.Close, { className: "ms-sheet__close", "aria-label": "Close", children: /* @__PURE__ */ jsx(X, { size: 16, strokeWidth: 2, "aria-hidden": true }) }),
          /* @__PURE__ */ jsxs("div", { className: "ms-sheet__header", children: [
            /* @__PURE__ */ jsx(RDialog.Title, { className: "ms-sheet__title", children: title }),
            hasDescription && /* @__PURE__ */ jsx(RDialog.Description, { className: "ms-sheet__desc", children: description })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "ms-sheet__body", children })
        ]
      }
    )
  ] });
});
function sizeStyle(side, px) {
  if (side === "left" || side === "right") return { width: px };
  return { height: px };
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent
};
//# sourceMappingURL=chunk-GINTVZTY.js.map