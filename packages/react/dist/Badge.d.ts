import * as react from 'react';
import { HTMLAttributes } from 'react';

type BadgeVariant = "neutral" | "solid" | "outline";
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}
declare const Badge: react.ForwardRefExoticComponent<BadgeProps & react.RefAttributes<HTMLSpanElement>>;

export { Badge, type BadgeProps, type BadgeVariant };
