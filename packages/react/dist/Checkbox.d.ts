import * as react from 'react';
import { ReactNode } from 'react';
import * as RCheckbox from '@radix-ui/react-checkbox';

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof RCheckbox.Root> {
    label?: ReactNode;
}
declare const Checkbox: react.ForwardRefExoticComponent<CheckboxProps & react.RefAttributes<HTMLButtonElement>>;

export { Checkbox, type CheckboxProps };
