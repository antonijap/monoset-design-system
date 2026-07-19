import * as react from 'react';
import { ReactNode } from 'react';
import * as RCtx from '@radix-ui/react-context-menu';

declare const ContextMenu: react.FC<RCtx.ContextMenuProps>;
declare const ContextMenuTrigger: react.ForwardRefExoticComponent<RCtx.ContextMenuTriggerProps & react.RefAttributes<HTMLSpanElement>>;
declare const ContextMenuSub: react.FC<RCtx.ContextMenuSubProps>;
interface ContextMenuContentProps extends React.ComponentPropsWithoutRef<typeof RCtx.Content> {
    children?: ReactNode;
}
declare const ContextMenuContent: react.ForwardRefExoticComponent<ContextMenuContentProps & react.RefAttributes<HTMLDivElement>>;
interface ContextMenuItemProps extends React.ComponentPropsWithoutRef<typeof RCtx.Item> {
    children?: ReactNode;
}
declare const ContextMenuItem: react.ForwardRefExoticComponent<ContextMenuItemProps & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuLabel: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuLabelProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSeparator: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuSeparatorProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuGroup: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuGroupProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuCheckboxItem: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuCheckboxItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuItemIndicator: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuItemIndicatorProps & react.RefAttributes<HTMLSpanElement>, "ref"> & react.RefAttributes<HTMLSpanElement>>;
declare const ContextMenuRadioGroup: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuRadioGroupProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuRadioItem: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuRadioItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSubTrigger: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuSubTriggerProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSubContent: react.ForwardRefExoticComponent<Omit<RCtx.ContextMenuSubContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

export { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, type ContextMenuContentProps, ContextMenuGroup, ContextMenuItem, ContextMenuItemIndicator, type ContextMenuItemProps, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger };
