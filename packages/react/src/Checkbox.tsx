import * as RCheckbox from "@radix-ui/react-checkbox";
import { forwardRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { DUR, EASE_EMPHASIS, EASE_EXIT } from "@monoset/motion";
import { cx } from "./cx";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof RCheckbox.Root> {
  label?: ReactNode;
}

export const Checkbox = forwardRef<
  React.ElementRef<typeof RCheckbox.Root>,
  CheckboxProps
>(function Checkbox({ label, className, checked, defaultChecked, ...rest }, ref) {
  const isChecked = checked ?? defaultChecked ?? false;
  return (
    <label className={cx("ms-check", className)} data-state={isChecked ? "checked" : "unchecked"}>
      <RCheckbox.Root
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        className="ms-check__box"
        {...rest}
      >
        <RCheckbox.Indicator asChild>
          <AnimatePresence initial={false}>
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: DUR.fast, ease: EASE_EMPHASIS } }}
              exit={{ opacity: 0, scale: 0.6, transition: { duration: DUR.fast, ease: EASE_EXIT } }}
              style={{ display: "inline-flex" }}
            >
              <Check size={11} strokeWidth={2} aria-hidden />
            </motion.span>
          </AnimatePresence>
        </RCheckbox.Indicator>
      </RCheckbox.Root>
      {label && <span>{label}</span>}
    </label>
  );
});
