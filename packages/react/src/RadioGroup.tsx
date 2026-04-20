import * as RRadio from "@radix-ui/react-radio-group";
import { forwardRef, type ReactNode } from "react";
import { cx } from "./cx";

export const RadioGroup = forwardRef<
  React.ElementRef<typeof RRadio.Root>,
  React.ComponentPropsWithoutRef<typeof RRadio.Root>
>(function RadioGroup({ className, ...rest }, ref) {
  return <RRadio.Root ref={ref} className={cx("ms-radio-group", className)} {...rest} />;
});

export interface RadioProps
  extends React.ComponentPropsWithoutRef<typeof RRadio.Item> {
  label?: ReactNode;
}

export const Radio = forwardRef<
  React.ElementRef<typeof RRadio.Item>,
  RadioProps
>(function Radio({ label, className, value, ...rest }, ref) {
  return (
    <label className={cx("ms-radio", className)}>
      <RRadio.Item ref={ref} value={value} className="ms-radio__dot" {...rest}>
        <RRadio.Indicator />
      </RRadio.Item>
      {label && <span>{label}</span>}
    </label>
  );
});
