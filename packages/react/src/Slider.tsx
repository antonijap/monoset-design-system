import * as RSlider from "@radix-ui/react-slider";
import { forwardRef } from "react";
import { cx } from "./cx";

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof RSlider.Root> {
  /** Accessible labels applied to thumbs by index. */
  thumbLabels?: readonly (string | undefined)[];
  /** IDs of elements that label thumbs, applied by index. */
  thumbLabelledBy?: readonly (string | undefined)[];
}

function defaultThumbLabel(count: number, index: number): string {
  if (count === 1) return "Value";
  if (count === 2) return index === 0 ? "Minimum" : "Maximum";
  return `Value ${index + 1}`;
}

export const Slider = forwardRef<
  React.ElementRef<typeof RSlider.Root>,
  SliderProps
>(function Slider(
  {
    className,
    defaultValue = [50],
    value,
    thumbLabels,
    thumbLabelledBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...rest
  },
  ref,
) {
  const thumbs = (value ?? defaultValue) as number[];
  const thumbCount = thumbs.length;
  return (
    <RSlider.Root
      ref={ref}
      className={cx("ms-slider", className)}
      defaultValue={defaultValue}
      value={value}
      {...rest}
    >
      <RSlider.Track className="ms-slider__track">
        <RSlider.Range className="ms-slider__range" />
      </RSlider.Track>
      {thumbs.map((_, i) => {
        const labelledBy = thumbLabelledBy?.[i]
          || (thumbCount === 1 ? ariaLabelledBy : undefined);
        const label = thumbLabels?.[i]
          || (thumbCount === 1 ? ariaLabel : undefined)
          || defaultThumbLabel(thumbCount, i);
        return (
          <RSlider.Thumb
            key={i}
            className="ms-slider__thumb"
            aria-label={labelledBy ? undefined : label}
            aria-labelledby={labelledBy || undefined}
          />
        );
      })}
    </RSlider.Root>
  );
});
