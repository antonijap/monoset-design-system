import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/AspectRatio.tsx
import * as RAspectRatio from "@radix-ui/react-aspect-ratio";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var AspectRatio = forwardRef(
  function AspectRatio2({ ratio = 1, className, ...rest }, ref) {
    const normalizedRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
    return /* @__PURE__ */ jsx(RAspectRatio.Root, { ref, ratio: normalizedRatio, className: cx("ms-aspect-ratio", className), ...rest });
  }
);

export {
  AspectRatio
};
//# sourceMappingURL=chunk-UYGA6XB2.js.map