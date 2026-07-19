import * as react from 'react';
import { ReactNode } from 'react';
import * as RDialog from '@radix-ui/react-dialog';

declare const Dialog: react.FC<RDialog.DialogProps>;
declare const DialogTrigger: react.ForwardRefExoticComponent<RDialog.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: react.ForwardRefExoticComponent<RDialog.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
interface DialogContentProps extends Omit<React.ComponentPropsWithoutRef<typeof RDialog.Content>, "title"> {
    title: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    overlayClassName?: string;
}
declare const DialogContent: react.ForwardRefExoticComponent<DialogContentProps & react.RefAttributes<HTMLDivElement>>;

export { Dialog, DialogClose, DialogContent, type DialogContentProps, DialogTrigger };
