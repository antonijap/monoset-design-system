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
>(function Switch({ label, className, checked, defaultChecked, ...rest }, ref) {
  const isChecked = checked ?? defaultChecked ?? false;
  return (
    <label className={cx("ms-switch", className)} data-state={isChecked ? "checked" : "unchecked"}>
      <RSwitch.Root
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        className="ms-switch__track"
        {...rest}
      >
        <RSwitch.Thumb className="ms-switch__thumb" />
      </RSwitch.Root>
      {label && <span>{label}</span>}
    </label>
  );
});
