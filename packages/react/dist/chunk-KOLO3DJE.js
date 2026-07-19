import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Dialog.tsx
import * as RDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Dialog = RDialog.Root;
var DialogTrigger = RDialog.Trigger;
var DialogClose = RDialog.Close;
var DialogContent = forwardRef(function DialogContent2({
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
  return /* @__PURE__ */ jsxs(RDialog.Portal, { container: portalContainer ?? void 0, children: [
    /* @__PURE__ */ jsx(RDialog.Overlay, { className: cx("ms-dialog-scrim", overlayClassName) }),
    /* @__PURE__ */ jsxs(
      RDialog.Content,
      {
        ref,
        className: cx("ms-dialog", className),
        ...descriptionProps,
        ...rest,
        children: [
          /* @__PURE__ */ jsx(RDialog.Title, { className: "ms-dialog__title", children: title }),
          hasDescription && /* @__PURE__ */ jsx(RDialog.Description, { className: "ms-dialog__desc", children: description }),
          children
        ]
      }
    )
  ] });
});

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent
};
//# sourceMappingURL=chunk-KOLO3DJE.js.map