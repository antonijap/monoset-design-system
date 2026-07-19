import * as react from 'react';
import { ReactNode } from 'react';
import * as RRadio from '@radix-ui/react-radio-group';

declare const RadioGroup: react.ForwardRefExoticComponent<Omit<RRadio.RadioGroupProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
interface RadioProps extends React.ComponentPropsWithoutRef<typeof RRadio.Item> {
    label?: ReactNode;
}
declare const Radio: react.ForwardRefExoticComponent<RadioProps & react.RefAttributes<HTMLButtonElement>>;

export { Radio, RadioGroup, type RadioProps };
