import {
  forwardRef,
  useContext,
  useSyncExternalStore,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "./cx";
import { ReducedMotionPreferenceContext } from "./ReducedMotionContext";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeToHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerHydratedSnapshot = () => false;

function subscribeToReducedMotion(onStoreChange: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }

  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(reducedMotionQuery).matches
    : false;
}

function LoadingSpinner() {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  );
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => true,
  );
  const reducedMotion = useContext(ReducedMotionPreferenceContext);
  const reduceMotion =
    reducedMotion === "always" ||
    (reducedMotion !== "never" && prefersReducedMotion);
  const animate = hydrated && !reduceMotion;

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" opacity="0.25" />
      <path d="M21 12a9 9 0 0 1-9 9">
        {animate && (
          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.9s" repeatCount="indefinite" />
        )}
      </path>
    </svg>
  );
}

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Left-slot icon (rendered before children). */
  leadingIcon?: ReactNode;
  /** Right-slot icon. */
  trailingIcon?: ReactNode;
  /** Renders a spinner and sets `aria-busy`. */
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "secondary",
    size = "md",
    leadingIcon,
    trailingIcon,
    loading = false,
    disabled,
    "aria-busy": ariaBusy,
    className,
    children,
    type = "button",
    ...rest
  },
  ref
) {
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading ? true : ariaBusy}
      className={cx("ms-btn", `ms-btn--${variant}`, `ms-btn--${size}`, className)}
    >
      {loading ? <LoadingSpinner /> : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  );
});
