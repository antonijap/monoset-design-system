import * as RSelect from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { useMonosetPortalContainer } from "./PortalContext";
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
      <RSelect.Icon className="ms-select__chevron" aria-hidden>
        <ChevronDown size={12} strokeWidth={2} aria-hidden />
      </RSelect.Icon>
    </RSelect.Trigger>
  );
});

export const SelectContent = forwardRef<
  React.ElementRef<typeof RSelect.Content>,
  React.ComponentPropsWithoutRef<typeof RSelect.Content>
>(function SelectContent(
  {
    children,
    className,
    position = "popper",
    sideOffset = 6,
    ...rest
  },
  ref,
) {
  const portalContainer = useMonosetPortalContainer();

  return (
    <RSelect.Portal container={portalContainer ?? undefined}>
      <RSelect.Content
        ref={ref}
        className={cx("ms-menu", "ms-select__content", className)}
        position={position}
        sideOffset={sideOffset}
        {...rest}
      >
        <RSelect.ScrollUpButton className="ms-select__scroll-up" aria-hidden>
          <ChevronUp size={14} strokeWidth={2} aria-hidden />
        </RSelect.ScrollUpButton>
        <RSelect.Viewport>{children}</RSelect.Viewport>
        <RSelect.ScrollDownButton className="ms-select__scroll-down" aria-hidden>
          <ChevronDown size={14} strokeWidth={2} aria-hidden />
        </RSelect.ScrollDownButton>
      </RSelect.Content>
    </RSelect.Portal>
  );
});

export interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof RSelect.Item> {
  children: ReactNode;
}

export const SelectItem = forwardRef<React.ElementRef<typeof RSelect.Item>, SelectItemProps>(
  function SelectItem({ className, children, ...rest }, ref) {
    return (
      <RSelect.Item
        ref={ref}
        className={cx("ms-menu__item", "ms-select__item", className)}
        {...rest}
      >
        <RSelect.ItemIndicator className="ms-select__indicator">
          <Check size={14} strokeWidth={2} aria-hidden />
        </RSelect.ItemIndicator>
        <RSelect.ItemText>{children}</RSelect.ItemText>
      </RSelect.Item>
    );
  }
);
