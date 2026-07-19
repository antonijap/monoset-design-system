export { DUR, EASE_EMPHASIS, EASE_EXIT, EASE_STANDARD, fadeUp, hoverLift, listStagger, modalPanel, modalScrim, popoverIn, pressDown, scaleIn, slideInBottom, slideInLeft, slideInRight, slideInTop } from '@monoset/motion';
import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode, CSSProperties } from 'react';
import { MotionProps, UseInViewOptions } from 'framer-motion';

type RevealVariants = NonNullable<MotionProps["variants"]>;
type RevealNativeProps = Omit<ComponentPropsWithoutRef<"div">, "children" | keyof MotionProps>;
type RevealProps = RevealNativeProps & {
    children: ReactNode;
    style?: CSSProperties;
    /** Animation variants with `hidden` and `visible` states. */
    variant?: RevealVariants;
    /** Trigger once or every time the element enters the viewport. */
    once?: boolean;
    /** IntersectionObserver margin. */
    margin?: UseInViewOptions["margin"];
    /** Delay in seconds before the visible animation starts. */
    delay?: number;
};
declare const Reveal: react.ForwardRefExoticComponent<RevealNativeProps & {
    children: ReactNode;
    style?: CSSProperties;
    /** Animation variants with `hidden` and `visible` states. */
    variant?: RevealVariants;
    /** Trigger once or every time the element enters the viewport. */
    once?: boolean;
    /** IntersectionObserver margin. */
    margin?: UseInViewOptions["margin"];
    /** Delay in seconds before the visible animation starts. */
    delay?: number;
} & react.RefAttributes<HTMLDivElement>>;

export { Reveal, type RevealProps };
