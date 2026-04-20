import { MotionConfig } from "framer-motion";
import { TooltipProvider } from "./Tooltip";
import { ToastProvider } from "./Toast";
import { type ReactNode } from "react";

/**
 * Wrap your app in <MonosetProvider> to enable:
 *   - prefers-reduced-motion handling (via framer-motion MotionConfig)
 *   - Radix TooltipProvider for delay sharing
 *   - Toast viewport for <Toast> components
 */
export interface MonosetProviderProps {
  children: ReactNode;
  /** Inherit system preference. Set to "always" for testing, "never" to disable entirely. */
  reducedMotion?: "user" | "always" | "never";
  /** Default tooltip delay. */
  tooltipDelay?: number;
}

export function MonosetProvider({
  children,
  reducedMotion = "user",
  tooltipDelay = 300,
}: MonosetProviderProps) {
  return (
    <MotionConfig reducedMotion={reducedMotion}>
      <TooltipProvider delayDuration={tooltipDelay}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </TooltipProvider>
    </MotionConfig>
  );
}
