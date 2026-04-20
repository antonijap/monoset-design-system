import * as RSlider from "@radix-ui/react-slider";
import { forwardRef } from "react";
import { cx } from "./cx";

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof RSlider.Root> {}

export const Slider = forwardRef<
  React.ElementRef<typeof RSlider.Root>,
  SliderProps
>(function Slider({ className, defaultValue = [50], value, ...rest }, ref) {
  const thumbs = (value ?? defaultValue) as number[];
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
      {thumbs.map((_, i) => (
        <RSlider.Thumb key={i} className="ms-slider__thumb" aria-label={`Value ${i + 1}`} />
      ))}
    </RSlider.Root>
  );
});
