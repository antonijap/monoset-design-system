import * as RDialog from "@radix-ui/react-dialog";
import { type ReactNode } from "react";
import { cx } from "./cx";

export const Dialog = RDialog.Root;
export const DialogTrigger = RDialog.Trigger;
export const DialogClose = RDialog.Close;

export interface DialogContentProps extends Omit<React.ComponentPropsWithoutRef<typeof RDialog.Content>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export function DialogContent({ title, description, children, className, ...rest }: DialogContentProps) {
  return (
    <RDialog.Portal>
      <RDialog.Overlay className="ms-dialog-scrim" />
      <RDialog.Content className={cx("ms-dialog", className)} {...rest}>
        {title && <RDialog.Title className="ms-dialog__title">{title}</RDialog.Title>}
        {description && <RDialog.Description className="ms-dialog__desc">{description}</RDialog.Description>}
        {children}
      </RDialog.Content>
    </RDialog.Portal>
  );
}
