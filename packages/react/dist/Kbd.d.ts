import * as react from 'react';
import { HTMLAttributes } from 'react';

interface KbdProps extends HTMLAttributes<HTMLElement> {
    size?: "sm" | "md";
}
declare const Kbd: react.ForwardRefExoticComponent<KbdProps & react.RefAttributes<HTMLElement>>;

export { Kbd, type KbdProps };
