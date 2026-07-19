import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Slider.tsx
import * as RSlider from "@radix-ui/react-slider";
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function defaultThumbLabel(count, index) {
  if (count === 1) return "Value";
  if (count === 2) return index === 0 ? "Minimum" : "Maximum";
  return `Value ${index + 1}`;
}
var Slider = forwardRef(function Slider2({
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
  return /* @__PURE__ */ jsxs(
    RSlider.Root,
    {
      ref,
      className: cx("ms-slider", className),
      defaultValue,
      value,
      ...rest,
      children: [
        /* @__PURE__ */ jsx(RSlider.Track, { className: "ms-slider__track", children: /* @__PURE__ */ jsx(RSlider.Range, { className: "ms-slider__range" }) }),
        thumbs.map((_, i) => {
          const labelledBy = thumbLabelledBy?.[i] || (thumbCount === 1 ? ariaLabelledBy : void 0);
          const label = thumbLabels?.[i] || (thumbCount === 1 ? ariaLabel : void 0) || defaultThumbLabel(thumbCount, i);
          return /* @__PURE__ */ jsx(
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

export {
  Slider
};
//# sourceMappingURL=chunk-DMVT33IV.js.map