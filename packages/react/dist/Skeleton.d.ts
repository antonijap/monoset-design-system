import * as react from 'react';
import { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    /** Pixel or percent width (default 100%). */
    width?: number | string;
    /** Pixel height — default 12px. */
    height?: number | string;
    /** Fully rounded, circle. */
    circle?: boolean;
}
declare const Skeleton: react.ForwardRefExoticComponent<SkeletonProps & react.RefAttributes<HTMLDivElement>>;

export { Skeleton, type SkeletonProps };
