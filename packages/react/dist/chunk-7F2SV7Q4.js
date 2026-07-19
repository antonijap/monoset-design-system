import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Carousel.tsx
import {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useReducedMotionConfig } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function clampIndex(value, slideCount) {
  if (slideCount === 0) return 0;
  if (value === Number.POSITIVE_INFINITY) return slideCount - 1;
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(slideCount - 1, Math.trunc(value)));
}
var Carousel = forwardRef(function Carousel2({
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
}, ref) {
  const slides = Children.toArray(children);
  const autoplayInterval = autoplay !== void 0 && Number.isFinite(autoplay) && autoplay > 0 ? autoplay : null;
  const isControlled = index !== void 0;
  const [internal, setInternal] = useState(defaultIndex);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const current = clampIndex(isControlled ? index : internal, slides.length);
  const trackRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(
    () => typeof document !== "undefined" && document.hidden
  );
  const reducedMotion = useReducedMotionConfig();
  const hasAutoplayControl = autoplayInterval !== null && slides.length > 1 && !reducedMotion;
  const goTo = useCallback((next) => {
    const clamped = clampIndex(next, slides.length);
    if (slides.length === 0 || clamped === current) return;
    if (!isControlled) setInternal(clamped);
    onIndexChange?.(clamped);
  }, [current, isControlled, onIndexChange, slides.length]);
  useEffect(() => {
    const t = trackRef.current;
    if (!t || slides.length === 0) return;
    const slide = t.children[current];
    if (!slide) return;
    const options = {
      behavior: reducedMotion ? "auto" : "smooth",
      left: slide.offsetLeft,
      top: 0
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
    let settleTimer;
    const settle = () => {
      const slideElements = Array.from(track.children);
      const next = slideElements.reduce((nearest, slide, slideIndex) => {
        const nearestDistance = Math.abs(slideElements[nearest].offsetLeft - track.scrollLeft);
        const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
        return distance < nearestDistance ? slideIndex : nearest;
      }, 0);
      goTo(next);
    };
    const handleScroll = () => {
      if (settleTimer !== void 0) clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 80);
    };
    track.addEventListener("scroll", handleScroll, { passive: true });
    track.addEventListener("scrollend", settle);
    return () => {
      if (settleTimer !== void 0) clearTimeout(settleTimer);
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
    if (autoplayInterval === null || slides.length < 2 || isUserPaused || hovered || focusWithin || documentHidden || reducedMotion) return;
    const id = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplayInterval, current, documentHidden, focusWithin, goTo, hovered, isUserPaused, reducedMotion, slides.length]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...rest,
      ref,
      role,
      "aria-roledescription": "carousel",
      "aria-label": ariaLabel,
      className: cx("ms-carousel", className),
      onMouseEnter: (event) => {
        setHovered(true);
        onMouseEnter?.(event);
      },
      onMouseLeave: (event) => {
        setHovered(false);
        onMouseLeave?.(event);
      },
      onFocusCapture: (event) => {
        setFocusWithin(true);
        onFocusCapture?.(event);
      },
      onBlurCapture: (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusWithin(false);
        }
        onBlurCapture?.(event);
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "ms-carousel__viewport", children: [
          /* @__PURE__ */ jsx("div", { ref: trackRef, className: "ms-carousel__track", children: slides.map((child, i) => /* @__PURE__ */ jsx(
            "div",
            {
              role: "group",
              "aria-roledescription": "slide",
              "aria-label": `${i + 1} of ${slides.length}`,
              "aria-current": i === current ? "true" : void 0,
              className: "ms-carousel__slide",
              children: child
            },
            i
          )) }),
          showArrows && slides.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "aria-label": "Previous slide",
                disabled: current === 0,
                onClick: () => goTo(current - 1),
                className: "ms-carousel__arrow ms-carousel__arrow--prev",
                children: /* @__PURE__ */ jsx(ChevronLeft, { size: 16, strokeWidth: 2, "aria-hidden": true })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "aria-label": "Next slide",
                disabled: current === slides.length - 1,
                onClick: () => goTo(current + 1),
                className: "ms-carousel__arrow ms-carousel__arrow--next",
                children: /* @__PURE__ */ jsx(ChevronRight, { size: 16, strokeWidth: 2, "aria-hidden": true })
              }
            )
          ] })
        ] }),
        (showDots && slides.length > 1 || hasAutoplayControl) && /* @__PURE__ */ jsxs("div", { className: "ms-carousel__controls", children: [
          showDots && slides.length > 1 && /* @__PURE__ */ jsx("div", { className: "ms-carousel__dots", role: "group", "aria-label": "Choose slide", children: slides.map((_, i) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-current": i === current ? "true" : void 0,
              "aria-label": `Go to slide ${i + 1}`,
              onClick: () => goTo(i),
              className: cx("ms-carousel__dot", i === current && "ms-carousel__dot--active")
            },
            i
          )) }),
          hasAutoplayControl && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              "aria-label": isUserPaused ? "Play carousel" : "Pause carousel",
              "data-state": isUserPaused ? "paused" : "playing",
              onClick: () => setIsUserPaused((paused) => !paused),
              className: "ms-carousel__autoplay",
              children: [
                isUserPaused ? /* @__PURE__ */ jsx(Play, { size: 14, strokeWidth: 2, "aria-hidden": true }) : /* @__PURE__ */ jsx(Pause, { size: 14, strokeWidth: 2, "aria-hidden": true }),
                /* @__PURE__ */ jsx("span", { children: isUserPaused ? "Play" : "Pause" })
              ]
            }
          )
        ] })
      ]
    }
  );
});

export {
  Carousel
};
//# sourceMappingURL=chunk-7F2SV7Q4.js.map