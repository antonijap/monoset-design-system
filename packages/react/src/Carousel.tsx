import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "./cx";

export interface CarouselProps {
  children: ReactNode[];
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
  className?: string;
  "aria-label"?: string;
}

/**
 * A simple horizontal carousel. Slides snap to each child via CSS scroll-snap;
 * arrows scroll programmatically; dots reflect/control the current index.
 */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  { children, index, defaultIndex = 0, onIndexChange, showArrows = true, showDots = true, autoplay, className, "aria-label": ariaLabel = "Carousel" },
  ref,
) {
  const isControlled = index !== undefined;
  const [internal, setInternal] = useState(defaultIndex);
  const current = isControlled ? index! : internal;
  const trackRef = useRef<HTMLDivElement>(null);
  const slides = Array.isArray(children) ? children : [children];

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, next));
    if (!isControlled) setInternal(clamped);
    onIndexChange?.(clamped);
  };

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const slide = t.children[current] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, [current]);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, autoplay);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, autoplay, slides.length]);

  return (
    <div ref={ref} aria-roledescription="carousel" aria-label={ariaLabel} className={cx("ms-carousel", className)}>
      <div ref={trackRef} className="ms-carousel__track">
        {slides.map((child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-current={i === current}
            className="ms-carousel__slide"
          >
            {child}
          </div>
        ))}
      </div>
      {showArrows && slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            disabled={current === 0}
            onClick={() => goTo(current - 1)}
            className="ms-carousel__arrow ms-carousel__arrow--prev"
          >‹</button>
          <button
            type="button"
            aria-label="Next slide"
            disabled={current === slides.length - 1}
            onClick={() => goTo(current + 1)}
            className="ms-carousel__arrow ms-carousel__arrow--next"
          >›</button>
        </>
      )}
      {showDots && slides.length > 1 && (
        <div className="ms-carousel__dots" role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cx("ms-carousel__dot", i === current && "ms-carousel__dot--active")}
            />
          ))}
        </div>
      )}
    </div>
  );
});
