import * as RSwitch from "@radix-ui/react-switch";
import { forwardRef, type ReactNode } from "react";
import { cx } from "./cx";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof RSwitch.Root> {
  label?: ReactNode;
}

export const Switch = forwardRef<
  React.ElementRef<typeof RSwitch.Root>,
  SwitchProps
>(function Switch({ label, className, ...rest }, ref) {
  return (
    <label className={cx("ms-switch", className)}>
      <RSwitch.Root
        ref={ref}
        className="ms-switch__track"
        {...rest}
      >
        <RSwitch.Thumb className="ms-switch__thumb" />
      </RSwitch.Root>
      {label && <span>{label}</span>}
    </label>
  );
});
