import {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useReducedMotionConfig } from "framer-motion";
import { cx } from "./cx";

export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
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

function clampIndex(value: number, slideCount: number) {
  if (slideCount === 0) return 0;
  if (value === Number.POSITIVE_INFINITY) return slideCount - 1;
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(slideCount - 1, Math.trunc(value)));
}

/**
 * A simple horizontal carousel. Slides snap to each child via CSS scroll-snap;
 * arrows scroll programmatically; dots reflect/control the current index.
 */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  {
    children,
    index,
    defaultIndex = 0,
    onIndexChange,
    showArrows = true,
    showDots = true,
    autoplay,
    className,
    role = "region",
    "aria-label": ariaLabel = "Carousel",
    onMouseEnter,
    onMouseLeave,
    onFocusCapture,
    onBlurCapture,
    ...rest
  },
  ref,
) {
  const slides = Children.toArray(children);
  const autoplayInterval =
    autoplay !== undefined && Number.isFinite(autoplay) && autoplay > 0
      ? autoplay
      : null;
  const isControlled = index !== undefined;
  const [internal, setInternal] = useState(defaultIndex);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const current = clampIndex(isControlled ? index : internal, slides.length);
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(
    () => typeof document !== "undefined" && document.hidden,
  );
  const reducedMotion = useReducedMotionConfig();
  const hasAutoplayControl =
    autoplayInterval !== null && slides.length > 1 && !reducedMotion;

  const goTo = useCallback((next: number) => {
    const clamped = clampIndex(next, slides.length);
    if (slides.length === 0 || clamped === current) return;
    if (!isControlled) setInternal(clamped);
    onIndexChange?.(clamped);
  }, [current, isControlled, onIndexChange, slides.length]);

  useEffect(() => {
    const t = trackRef.current;
    if (!t || slides.length === 0) return;
    const slide = t.children[current] as HTMLElement | undefined;
    if (!slide) return;

    const options: ScrollToOptions = {
      behavior: reducedMotion ? "auto" : "smooth",
      left: slide.offsetLeft,
      top: 0,
    };
    if (typeof t.scrollTo === "function") {
      t.scrollTo(options);
    } else {
      t.scrollLeft = slide.offsetLeft;
    }
  }, [current, reducedMotion, slides.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || slides.length < 2) return;

    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const settle = () => {
      const slideElements = Array.from(track.children) as HTMLElement[];
      const next = slideElements.reduce((nearest, slide, slideIndex) => {
        const nearestDistance = Math.abs(slideElements[nearest].offsetLeft - track.scrollLeft);
        const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
        return distance < nearestDistance ? slideIndex : nearest;
      }, 0);
      goTo(next);
    };
    const handleScroll = () => {
      if (settleTimer !== undefined) clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 80);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    track.addEventListener("scrollend", settle);
    return () => {
      if (settleTimer !== undefined) clearTimeout(settleTimer);
      track.removeEventListener("scroll", handleScroll);
      track.removeEventListener("scrollend", settle);
    };
  }, [goTo, slides.length]);

  useEffect(() => {
    const handleVisibility = () => setDocumentHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (
      autoplayInterval === null ||
      slides.length < 2 ||
      isUserPaused ||
      hovered ||
      focusWithin ||
      documentHidden ||
      reducedMotion
    ) return;
    const id = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplayInterval, current, documentHidden, focusWithin, goTo, hovered, isUserPaused, reducedMotion, slides.length]);

  return (
    <div
      {...rest}
      ref={ref}
      role={role}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={cx("ms-carousel", className)}
      onMouseEnter={(event) => {
        setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        onMouseLeave?.(event);
      }}
      onFocusCapture={(event) => {
        setFocusWithin(true);
        onFocusCapture?.(event);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocusWithin(false);
        }
        onBlurCapture?.(event);
      }}
    >
      <div className="ms-carousel__viewport">
        <div ref={trackRef} className="ms-carousel__track">
          {slides.map((child, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-current={i === current ? "true" : undefined}
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
            ><ChevronLeft size={16} strokeWidth={2} aria-hidden /></button>
            <button
              type="button"
              aria-label="Next slide"
              disabled={current === slides.length - 1}
              onClick={() => goTo(current + 1)}
              className="ms-carousel__arrow ms-carousel__arrow--next"
            ><ChevronRight size={16} strokeWidth={2} aria-hidden /></button>
          </>
        )}
      </div>
      {((showDots && slides.length > 1) || hasAutoplayControl) && (
        <div className="ms-carousel__controls">
          {showDots && slides.length > 1 && (
            <div className="ms-carousel__dots" role="group" aria-label="Choose slide">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-current={i === current ? "true" : undefined}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={cx("ms-carousel__dot", i === current && "ms-carousel__dot--active")}
                />
              ))}
            </div>
          )}
          {hasAutoplayControl && (
            <button
              type="button"
              aria-label={isUserPaused ? "Play carousel" : "Pause carousel"}
              data-state={isUserPaused ? "paused" : "playing"}
              onClick={() => setIsUserPaused((paused) => !paused)}
              className="ms-carousel__autoplay"
            >
              {isUserPaused
                ? <Play size={14} strokeWidth={2} aria-hidden />
                : <Pause size={14} strokeWidth={2} aria-hidden />}
              <span>{isUserPaused ? "Play" : "Pause"}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
});
