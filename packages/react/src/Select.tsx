import * as RSelect from "@radix-ui/react-select";
import { forwardRef, type ReactNode } from "react";
import { cx } from "./cx";

export const Select = RSelect.Root;

export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof RSelect.Trigger> {
  placeholder?: string;
}

export const SelectTrigger = forwardRef<
  React.ElementRef<typeof RSelect.Trigger>,
  SelectTriggerProps
>(function SelectTrigger({ className, placeholder, children, ...rest }, ref) {
  return (
    <RSelect.Trigger ref={ref} className={cx("ms-select", className)} {...rest}>
      {children ?? <RSelect.Value placeholder={placeholder} />}
      <RSelect.Icon aria-hidden>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </RSelect.Icon>
    </RSelect.Trigger>
  );
});

export function SelectContent({ children, className, ...rest }: React.ComponentPropsWithoutRef<typeof RSelect.Content>) {
  return (
    <RSelect.Portal>
      <RSelect.Content className={cx("ms-menu", className)} position="popper" sideOffset={6} {...rest}>
        <RSelect.Viewport>{children}</RSelect.Viewport>
      </RSelect.Content>
    </RSelect.Portal>
  );
}

export interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof RSelect.Item> {
  children: ReactNode;
}

export const SelectItem = forwardRef<React.ElementRef<typeof RSelect.Item>, SelectItemProps>(
  function SelectItem({ className, children, ...rest }, ref) {
    return (
      <RSelect.Item ref={ref} className={cx("ms-menu__item", className)} {...rest}>
        <RSelect.ItemText>{children}</RSelect.ItemText>
      </RSelect.Item>
    );
  }
);
