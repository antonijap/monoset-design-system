import * as react from 'react';
import * as RToggleGroup from '@radix-ui/react-toggle-group';
import * as RToggle from '@radix-ui/react-toggle';

interface ToggleProps extends React.ComponentPropsWithoutRef<typeof RToggle.Root> {
}
declare const Toggle: react.ForwardRefExoticComponent<ToggleProps & react.RefAttributes<HTMLButtonElement>>;
type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof RToggleGroup.Root>;
declare const ToggleGroup: react.ForwardRefExoticComponent<ToggleGroupProps & react.RefAttributes<HTMLDivElement>>;
interface ToggleGroupItemProps extends React.ComponentPropsWithoutRef<typeof RToggleGroup.Item> {
}
declare const ToggleGroupItem: react.ForwardRefExoticComponent<ToggleGroupItemProps & react.RefAttributes<HTMLButtonElement>>;

export { Toggle, ToggleGroup, ToggleGroupItem, type ToggleGroupItemProps, type ToggleGroupProps, type ToggleProps };
