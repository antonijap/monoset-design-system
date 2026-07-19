import {
  forwardRef,
  useRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useComposedRefs,
  useInView,
  useReducedMotionConfig,
  type MotionProps,
  type UseInViewOptions,
} from "framer-motion";
import { fadeUp } from "@monoset/motion";

type RevealVariants = NonNullable<MotionProps["variants"]>;
type RevealNativeProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | keyof MotionProps
>;

export type RevealProps = RevealNativeProps & {
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

function addDelay(variants: RevealVariants, delay: number): RevealVariants {
  const visible = variants.visible;
  if (!delay || !visible || typeof visible === "function") return variants;

  return {
    ...variants,
    visible: {
      ...visible,
      transition: {
        ...visible.transition,
        delay,
      },
    },
  };
}

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  {
    children,
    variant = fadeUp as RevealVariants,
    once = true,
    margin = "-80px",
    delay = 0,
    ...rest
  },
  forwardedRef,
) {
  const localRef = useRef<HTMLDivElement>(null);
  const ref = useComposedRefs(localRef, forwardedRef);
  const inView = useInView(localRef, { once, margin });
  const reducedMotion = useReducedMotionConfig();
  const resolvedVariant = addDelay(variant, delay);

  if (reducedMotion) {
    return (
      <div {...rest} ref={ref} data-reduced-motion="true">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      {...rest}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={resolvedVariant}
    >
      {children}
    </motion.div>
  );
});

Reveal.displayName = "Reveal";
