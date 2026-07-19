import * as react from 'react';
import { HTMLAttributes, ReactNode, ReactElement } from 'react';

type CardVariant = "outline" | "elevated" | "inset";
interface CardSharedProps {
    variant?: CardVariant;
}
type CardProps = CardSharedProps & ((Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    /** Uses the default div wrapper. */
    asChild?: false;
    children?: ReactNode;
}) | (Omit<HTMLAttributes<HTMLElement>, "children"> & {
    /** Applies the card props to exactly one child element. */
    asChild: true;
    children: ReactElement<HTMLAttributes<HTMLElement>, keyof HTMLElementTagNameMap>;
}));
declare const Card: react.ForwardRefExoticComponent<CardProps & react.RefAttributes<HTMLElement>>;

export { Card, type CardProps, type CardVariant };
