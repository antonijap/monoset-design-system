import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/ToggleGroup.tsx
import * as RToggleGroup from "@radix-ui/react-toggle-group";
import * as RToggle from "@radix-ui/react-toggle";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var Toggle = forwardRef(function Toggle2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(RToggle.Root, { ref, className: cx("ms-toggle", className), ...rest });
});
var ToggleGroup = forwardRef(function ToggleGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(RToggleGroup.Root, { ref, className: cx("ms-toggle-group", className), ...rest });
});
var ToggleGroupItem = forwardRef(function ToggleGroupItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(RToggleGroup.Item, { ref, className: cx("ms-toggle", className), ...rest });
});

export {
  Toggle,
  ToggleGroup,
  ToggleGroupItem
};
//# sourceMappingURL=chunk-JN5DGQFN.js.map