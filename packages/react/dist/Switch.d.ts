import * as react from 'react';
import { ReactNode } from 'react';
import * as RSwitch from '@radix-ui/react-switch';

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RSwitch.Root> {
    label?: ReactNode;
}
declare const Switch: react.ForwardRefExoticComponent<SwitchProps & react.RefAttributes<HTMLButtonElement>>;

export { Switch, type SwitchProps };
