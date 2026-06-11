import * as RDialog from "@radix-ui/react-dialog";
import { type ReactNode } from "react";
import { X } from "lucide-react";
import { cx } from "./cx";

export const Sheet = RDialog.Root;
export const SheetTrigger = RDialog.Trigger;
export const SheetClose = RDialog.Close;

export type SheetSide = "left" | "right" | "top" | "bottom";

export interface SheetContentProps extends Omit<React.ComponentPropsWithoutRef<typeof RDialog.Content>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Which edge the panel slides in from. Default: "right". */
  side?: SheetSide;
  /** Panel width (left/right) or height (top/bottom). Default: 380px. */
  size?: string | number;
  /** Show the built-in close button in the top corner. Default: true. */
  showClose?: boolean;
}

export function SheetContent({
  title,
  description,
  children,
  className,
  side = "right",
  size = 380,
  showClose = true,
  style,
  ...rest
}: SheetContentProps) {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <RDialog.Portal>
      <RDialog.Overlay className="ms-sheet-scrim" />
      <RDialog.Content
        className={cx("ms-sheet", `ms-sheet--${side}`, className)}
        style={{ ...sizeStyle(side, px), ...style }}
        {...rest}
      >
        {showClose && (
          <RDialog.Close className="ms-sheet__close" aria-label="Close">
            <X size={16} strokeWidth={2} aria-hidden />
          </RDialog.Close>
        )}
        {(title || description) && (
          <div className="ms-sheet__header">
            {title && <RDialog.Title className="ms-sheet__title">{title}</RDialog.Title>}
            {description && <RDialog.Description className="ms-sheet__desc">{description}</RDialog.Description>}
          </div>
        )}
        <div className="ms-sheet__body">{children}</div>
      </RDialog.Content>
    </RDialog.Portal>
  );
}

function sizeStyle(side: SheetSide, px: string): React.CSSProperties {
  if (side === "left" || side === "right") return { width: px };
  return { height: px };
}
