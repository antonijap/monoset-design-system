import * as RDialog from "@radix-ui/react-dialog";
import { forwardRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cx } from "./cx";
import { useMonosetPortalContainer } from "./PortalContext";

export const Sheet = RDialog.Root;
export const SheetTrigger = RDialog.Trigger;
export const SheetClose = RDialog.Close;

export type SheetSide = "left" | "right" | "top" | "bottom";

export interface SheetContentProps extends Omit<React.ComponentPropsWithoutRef<typeof RDialog.Content>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  overlayClassName?: string;
  /** Which edge the panel slides in from. Default: "right". */
  side?: SheetSide;
  /** Panel width (left/right) or height (top/bottom). Default: 380px. */
  size?: string | number;
  /** Show the built-in close button in the top corner. Default: true. */
  showClose?: boolean;
}

export const SheetContent = forwardRef<
  React.ElementRef<typeof RDialog.Content>,
  SheetContentProps
>(function SheetContent(
  {
    title,
    description,
    children,
    className,
    overlayClassName,
    side = "right",
    size = 380,
    showClose = true,
    style,
    "aria-describedby": ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const portalContainer = useMonosetPortalContainer();
  const px = typeof size === "number" ? `${size}px` : size;
  const hasDescription =
    description !== undefined && description !== null && description !== false;
  const descriptionProps =
    ariaDescribedBy !== undefined
      ? { "aria-describedby": ariaDescribedBy }
      : hasDescription
        ? {}
        : { "aria-describedby": undefined };

  return (
    <RDialog.Portal container={portalContainer ?? undefined}>
      <RDialog.Overlay className={cx("ms-sheet-scrim", overlayClassName)} />
      <RDialog.Content
        ref={ref}
        className={cx("ms-sheet", `ms-sheet--${side}`, className)}
        style={{ ...sizeStyle(side, px), ...style }}
        {...descriptionProps}
        {...rest}
      >
        {showClose && (
          <RDialog.Close className="ms-sheet__close" aria-label="Close">
            <X size={16} strokeWidth={2} aria-hidden />
          </RDialog.Close>
        )}
        <div className="ms-sheet__header">
          <RDialog.Title className="ms-sheet__title">{title}</RDialog.Title>
          {hasDescription && (
            <RDialog.Description className="ms-sheet__desc">
              {description}
            </RDialog.Description>
          )}
        </div>
        <div className="ms-sheet__body">{children}</div>
      </RDialog.Content>
    </RDialog.Portal>
  );
});

function sizeStyle(side: SheetSide, px: string): React.CSSProperties {
  if (side === "left" || side === "right") return { width: px };
  return { height: px };
}
