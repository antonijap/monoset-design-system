import * as react from 'react';
import { HTMLAttributes, ReactNode } from 'react';

interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    children: ReactNode;
    /** Currently visible index (0-based). Controlled. */
    index?: number;
    defaultIndex?: number;
    onIndexChange?: (index: number) => void;
    /** Show prev/next buttons. Default: true. */
    showArrows?: boolean;
    /** Show pagination dots. Default: true. */
    showDots?: boolean;
    /** Auto-advance interval in ms. Omit to disable. */
    autoplay?: number;
}
/**
 * A simple horizontal carousel. Slides snap to each child via CSS scroll-snap;
 * arrows scroll programmatically; dots reflect/control the current index.
 */
declare const Carousel: react.ForwardRefExoticComponent<CarouselProps & react.RefAttributes<HTMLDivElement>>;

export { Carousel, type CarouselProps };
