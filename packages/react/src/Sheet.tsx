import * as RDialog from "@radix-ui/react-dialog";
import { type ReactNode } from "react";
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
}

export function SheetContent({
  title,
  description,
  children,
  className,
  side = "right",
  size = 380,
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
