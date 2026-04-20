import * as RDropdown from "@radix-ui/react-dropdown-menu";
import { type ReactNode } from "react";
import { cx } from "./cx";

export const DropdownMenu = RDropdown.Root;
export const DropdownMenuTrigger = RDropdown.Trigger;

export function DropdownMenuContent({ children, className, sideOffset = 6, ...rest }: React.ComponentPropsWithoutRef<typeof RDropdown.Content>) {
  return (
    <RDropdown.Portal>
      <RDropdown.Content sideOffset={sideOffset} className={cx("ms-menu", className)} {...rest}>
        {children}
      </RDropdown.Content>
    </RDropdown.Portal>
  );
}

export function DropdownMenuItem({ className, children, ...rest }: React.ComponentPropsWithoutRef<typeof RDropdown.Item>) {
  return (
    <RDropdown.Item className={cx("ms-menu__item", className)} {...rest}>
      {children}
    </RDropdown.Item>
  );
}

export function DropdownMenuLabel({ className, children }: { className?: string; children: ReactNode }) {
  return <RDropdown.Label className={cx("ms-menu__label", className)}>{children}</RDropdown.Label>;
}

export function DropdownMenuSeparator() {
  return <RDropdown.Separator className="ms-menu__separator" />;
}
