import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Skeleton.tsx
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var Skeleton = forwardRef(function Skeleton2({ width = "100%", height = 12, circle, style, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
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

export {
  Skeleton
};
//# sourceMappingURL=chunk-YMNA54WX.js.map