import * as react from 'react';
import { HTMLAttributes } from 'react';

type SpaceScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
interface StackProps extends HTMLAttributes<HTMLDivElement> {
    gap?: SpaceScale;
    align?: "start" | "center" | "end" | "stretch";
}
declare const Stack: react.ForwardRefExoticComponent<StackProps & react.RefAttributes<HTMLDivElement>>;
interface InlineProps extends HTMLAttributes<HTMLDivElement> {
    gap?: SpaceScale;
    align?: "start" | "center" | "end" | "baseline";
    wrap?: boolean;
}
declare const Inline: react.ForwardRefExoticComponent<InlineProps & react.RefAttributes<HTMLDivElement>>;
interface GridProps extends HTMLAttributes<HTMLDivElement> {
    columns?: number;
    minWidth?: number | string;
    gap?: SpaceScale;
}
declare const Grid: react.ForwardRefExoticComponent<GridProps & react.RefAttributes<HTMLDivElement>>;
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
    padding?: boolean;
}
declare const Container: react.ForwardRefExoticComponent<ContainerProps & react.RefAttributes<HTMLDivElement>>;

export { Container, type ContainerProps, Grid, type GridProps, Inline, type InlineProps, Stack, type StackProps };
