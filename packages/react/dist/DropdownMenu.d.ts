import * as react from 'react';
import * as RDropdown from '@radix-ui/react-dropdown-menu';

declare const DropdownMenu: react.FC<RDropdown.DropdownMenuProps>;
declare const DropdownMenuTrigger: react.ForwardRefExoticComponent<RDropdown.DropdownMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuSub: react.FC<RDropdown.DropdownMenuSubProps>;
declare const DropdownMenuContent: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuLabelProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuSeparatorProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuGroup: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuGroupProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuCheckboxItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItemIndicator: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuItemIndicatorProps & react.RefAttributes<HTMLSpanElement>, "ref"> & react.RefAttributes<HTMLSpanElement>>;
declare const DropdownMenuRadioGroup: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuRadioGroupProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuRadioItemProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubTrigger: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuSubTriggerProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: react.ForwardRefExoticComponent<Omit<RDropdown.DropdownMenuSubContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

export { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuItemIndicator, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger };
