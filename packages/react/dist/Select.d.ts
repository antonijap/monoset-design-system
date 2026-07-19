import * as react from 'react';
import { ReactNode } from 'react';
import * as RSelect from '@radix-ui/react-select';

declare const Select: react.FC<RSelect.SelectProps>;
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof RSelect.Trigger> {
    placeholder?: string;
}
declare const SelectTrigger: react.ForwardRefExoticComponent<SelectTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const SelectContent: react.ForwardRefExoticComponent<Omit<RSelect.SelectContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof RSelect.Item> {
    children: ReactNode;
}
declare const SelectItem: react.ForwardRefExoticComponent<SelectItemProps & react.RefAttributes<HTMLDivElement>>;

export { Select, SelectContent, SelectItem, type SelectItemProps, SelectTrigger, type SelectTriggerProps };
