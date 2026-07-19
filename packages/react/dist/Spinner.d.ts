import * as react from 'react';
import { HTMLAttributes } from 'react';

interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    size?: number;
    label?: string;
}
declare const Spinner: react.ForwardRefExoticComponent<SpinnerProps & react.RefAttributes<HTMLSpanElement>>;

export { Spinner, type SpinnerProps };
