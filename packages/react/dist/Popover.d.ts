import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as RPopover from '@radix-ui/react-popover';

declare const Popover: react.FC<RPopover.PopoverProps>;
declare const PopoverTrigger: react.ForwardRefExoticComponent<RPopover.PopoverTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const PopoverClose: react.ForwardRefExoticComponent<RPopover.PopoverCloseProps & react.RefAttributes<HTMLButtonElement>>;
interface PopoverContentProps extends ComponentPropsWithoutRef<typeof RPopover.Content> {
    children?: ReactNode;
}
declare const PopoverContent: react.ForwardRefExoticComponent<PopoverContentProps & react.RefAttributes<HTMLDivElement>>;

export { Popover, PopoverClose, PopoverContent, type PopoverContentProps, PopoverTrigger };
