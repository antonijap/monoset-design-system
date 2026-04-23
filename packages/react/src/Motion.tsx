import {
  forwardRef,
  useRef,
  Children,
  type ReactNode,
  type CSSProperties,
} from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "@monoset/motion";

/* ------------------------------------------------------------------ */
/*  Reveal                                                            */
/* ------------------------------------------------------------------ */

export interface RevealProps {
  children: ReactNode;
  /** Animation variant object with `hidden` and `visible` keys. Default: fadeUp */
  variant?: Record<string, any>;
  /** Trigger once or every time the element enters the viewport. Default: true */
  once?: boolean;
  /** IntersectionObserver margin. Default: "-80px" */
  margin?: string;
  /** Delay in seconds before animation starts. Default: 0 */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  (
    {
      children,
      variant = fadeUp,
      once = true,
      margin = "-80px",
      delay = 0,
      className,
      style,
    },
    forwardedRef,
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLDivElement>) ?? localRef;
    const inView = useInView(ref, { once, margin: margin as any });

    const resolvedVariant = delay
      ? {
          ...variant,
          visible: {
            ...variant.visible,
            transition: {
              ...variant.visible?.transition,
              delay,
            },
          },
        }
      : variant;

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={resolvedVariant}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    );
  },
);

Reveal.displayName = "Reveal";

/* ------------------------------------------------------------------ */
/*  StaggerList                                                       */
/* ------------------------------------------------------------------ */

export interface StaggerListProps {
  children: ReactNode;
  /** Stagger delay between children in seconds. Default: 0.04 */
  stagger?: number;
  /** Trigger once when in viewport. Default: true */
  once?: boolean;
  /** IntersectionObserver margin. Default: "-80px" */
  margin?: string;
  className?: string;
  style?: CSSProperties;
}

const childVariants = {
  hidden: fadeUp.hidden,
  visible: fadeUp.visible,
} as const;

export const StaggerList = forwardRef<HTMLDivElement, StaggerListProps>(
  (
    {
      children,
      stagger = 0.04,
      once = true,
      margin = "-80px",
      className,
      style,
    },
    forwardedRef,
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLDivElement>) ?? localRef;
    const inView = useInView(ref, { once, margin: margin as any });

    const containerVariants = {
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className={className}
        style={style}
      >
        {Children.map(children, (child) => (
          <motion.div variants={childVariants}>{child}</motion.div>
        ))}
      </motion.div>
    );
  },
);

StaggerList.displayName = "StaggerList";
