import * as react from 'react';
import { ReactNode } from 'react';
import * as RDialog from '@radix-ui/react-dialog';

declare const Sheet: react.FC<RDialog.DialogProps>;
declare const SheetTrigger: react.ForwardRefExoticComponent<RDialog.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const SheetClose: react.ForwardRefExoticComponent<RDialog.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
type SheetSide = "left" | "right" | "top" | "bottom";
interface SheetContentProps extends Omit<React.ComponentPropsWithoutRef<typeof RDialog.Content>, "title"> {
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
declare const SheetContent: react.ForwardRefExoticComponent<SheetContentProps & react.RefAttributes<HTMLDivElement>>;

export { Sheet, SheetClose, SheetContent, type SheetContentProps, type SheetSide, SheetTrigger };
