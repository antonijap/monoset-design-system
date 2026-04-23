import { MotionConfig } from "framer-motion";
import { TooltipProvider } from "./Tooltip";
import { ToastProvider } from "./Toast";
import { ThemeProvider, type Theme } from "./Theme";
import { type ReactNode } from "react";

/**
 * Wrap your app in <MonosetProvider> to enable:
 *   - prefers-reduced-motion handling (via framer-motion MotionConfig)
 *   - Radix TooltipProvider for delay sharing
 *   - Toast viewport for <Toast> components
 *   - Optional theme management (light / dark / system)
 */
export interface MonosetProviderProps {
  children: ReactNode;
  /** Inherit system preference. Set to "always" for testing, "never" to disable entirely. */
  reducedMotion?: "user" | "always" | "never";
  /** Default tooltip delay. */
  tooltipDelay?: number;
  /** Set to enable theme management. Omit to skip ThemeProvider entirely. */
  defaultTheme?: Theme;
}

export function MonosetProvider({
  children,
  reducedMotion = "user",
  tooltipDelay = 300,
  defaultTheme,
}: MonosetProviderProps) {
  const inner = (
    <MotionConfig reducedMotion={reducedMotion}>
      <TooltipProvider delayDuration={tooltipDelay}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </TooltipProvider>
    </MotionConfig>
  );

  if (defaultTheme) {
    return <ThemeProvider defaultTheme={defaultTheme}>{inner}</ThemeProvider>;
  }

  return inner;
}
