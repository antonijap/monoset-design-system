import * as RCollapsible from "@radix-ui/react-collapsible";
import { forwardRef, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "./cx";

export const Collapsible = RCollapsible.Root;

export interface CollapsibleTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RCollapsible.Trigger> {
  children?: ReactNode;
  /** Hide the built-in chevron. Default: false. */
  hideChevron?: boolean;
}

export const CollapsibleTrigger = forwardRef<
  React.ElementRef<typeof RCollapsible.Trigger>,
  CollapsibleTriggerProps
>(function CollapsibleTrigger({ className, children, hideChevron, ...rest }, ref) {
  return (
    <RCollapsible.Trigger ref={ref} className={cx("ms-collapsible__trigger", className)} {...rest}>
      <span className="ms-collapsible__label">{children}</span>
      {!hideChevron && <ChevronDown className="ms-collapsible__chevron" size={16} strokeWidth={2} aria-hidden />}
    </RCollapsible.Trigger>
  );
});

export const CollapsibleContent = forwardRef<
  React.ElementRef<typeof RCollapsible.Content>,
  React.ComponentPropsWithoutRef<typeof RCollapsible.Content>
>(function CollapsibleContent({ className, children, ...rest }, ref) {
  return (
    <RCollapsible.Content ref={ref} className={cx("ms-collapsible__content", className)} {...rest}>
      <div className="ms-collapsible__inner">{children}</div>
    </RCollapsible.Content>
  );
});
