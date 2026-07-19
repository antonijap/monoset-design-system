import * as RDialog from "@radix-ui/react-dialog";
import { forwardRef, type ReactNode } from "react";
import { cx } from "./cx";
import { useMonosetPortalContainer } from "./PortalContext";

export const Dialog = RDialog.Root;
export const DialogTrigger = RDialog.Trigger;
export const DialogClose = RDialog.Close;

export interface DialogContentProps extends Omit<React.ComponentPropsWithoutRef<typeof RDialog.Content>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  overlayClassName?: string;
}

export const DialogContent = forwardRef<
  React.ElementRef<typeof RDialog.Content>,
  DialogContentProps
>(function DialogContent(
  {
    title,
    description,
    children,
    className,
    overlayClassName,
    "aria-describedby": ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const portalContainer = useMonosetPortalContainer();
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
      <RDialog.Overlay className={cx("ms-dialog-scrim", overlayClassName)} />
      <RDialog.Content
        ref={ref}
        className={cx("ms-dialog", className)}
        {...descriptionProps}
        {...rest}
      >
        <RDialog.Title className="ms-dialog__title">{title}</RDialog.Title>
        {hasDescription && (
          <RDialog.Description className="ms-dialog__desc">
            {description}
          </RDialog.Description>
        )}
        {children}
      </RDialog.Content>
    </RDialog.Portal>
  );
});
