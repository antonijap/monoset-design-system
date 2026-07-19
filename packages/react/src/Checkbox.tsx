import * as RCheckbox from "@radix-ui/react-checkbox";
import { forwardRef, type ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import { cx } from "./cx";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof RCheckbox.Root> {
  label?: ReactNode;
}

export const Checkbox = forwardRef<
  React.ElementRef<typeof RCheckbox.Root>,
  CheckboxProps
>(function Checkbox({ label, className, ...rest }, ref) {
  return (
    <label className={cx("ms-check", className)}>
      <RCheckbox.Root
        ref={ref}
        className="ms-check__box"
        {...rest}
      >
        <RCheckbox.Indicator forceMount aria-hidden className="ms-check__indicator">
          <Check
            size={11}
            strokeWidth={2}
            className="ms-check__visual ms-check__visual--checked"
            data-check-visual="checked"
          />
          <Minus
            size={11}
            strokeWidth={2}
            className="ms-check__visual ms-check__visual--indeterminate"
            data-check-visual="indeterminate"
          />
        </RCheckbox.Indicator>
      </RCheckbox.Root>
      {label && <span>{label}</span>}
    </label>
  );
});
