import {
  Input
} from "./chunk-U54SG3NW.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/PasswordInput.tsx
import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var PasswordInput = forwardRef(
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
    const [visible, setVisible] = useState(false);
    if (!showToggle) {
      return /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsxs("div", { className: cx("ms-password", wrapperClassName), children: [
      /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-pressed": visible,
          "aria-label": visible ? hideLabel : showLabel,
          onClick: () => setVisible((v) => !v),
          className: "ms-password__toggle",
          disabled,
          children: visible ? /* @__PURE__ */ jsx(EyeOff, { size: 16, strokeWidth: 2, "aria-hidden": true }) : /* @__PURE__ */ jsx(Eye, { size: 16, strokeWidth: 2, "aria-hidden": true })
        }
      )
    ] });
  }
);

export {
  PasswordInput
};
//# sourceMappingURL=chunk-3VB26SMY.js.map