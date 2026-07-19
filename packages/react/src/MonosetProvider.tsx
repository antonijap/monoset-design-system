import {
  createContext,
  useContext,
  useMemo,
  type ComponentProps,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";
import { TooltipProvider, type TooltipProviderProps } from "./Tooltip";
import { ToastProvider, type ToastProviderProps } from "./Toast";
import { ThemeProvider, type ThemeProviderProps } from "./Theme";
import {
  MonosetPortalContext,
  useMonosetPortalContainer,
} from "./PortalContext";
import {
  ReducedMotionPreferenceContext,
  type ReducedMotionPreference,
} from "./ReducedMotionContext";

export { useMonosetPortalContainer } from "./PortalContext";

export type MonosetThemeOptions = Omit<ThemeProviderProps, "children">;
export type MonosetTooltipOptions = Omit<TooltipProviderProps, "children">;
export type MonosetToastOptions = Omit<ToastProviderProps, "children">;
export type MonosetMotionOptions = Omit<
  ComponentProps<typeof MotionConfig>,
  "children"
>;

export interface MonosetPortalOptions {
  container: HTMLElement | null;
}

export interface MonosetProviderProps {
  children: ReactNode;
  /** Theme management is opt-in. */
  theme?: false | MonosetThemeOptions;
  /**
   * Shared tooltips, enabled by default. The first enabled ancestor owns the
   * configuration. Nested values are ignored while infrastructure is inherited.
   * False skips creation here, but cannot disable an active ancestor.
   */
  tooltip?: false | MonosetTooltipOptions;
  /**
   * Shared toasts, enabled by default. The first enabled ancestor owns the
   * configuration. Nested values are ignored while infrastructure is inherited.
   * False skips creation here, but cannot disable an active ancestor.
   */
  toast?: false | MonosetToastOptions;
  /** Motion configuration. Defaults to the user's reduced-motion preference. */
  motion?: false | MonosetMotionOptions;
  /** Portal target inherited by Monoset overlay components. */
  portal?: false | MonosetPortalOptions;
}

interface InfrastructureState {
  tooltip: boolean;
  toast: boolean;
}

const InfrastructureContext = createContext<InfrastructureState>({
  tooltip: false,
  toast: false,
});

export function MonosetProvider({
  children,
  theme,
  tooltip,
  toast,
  motion,
  portal,
}: MonosetProviderProps) {
  const parentInfrastructure = useContext(InfrastructureContext);
  const parentPortal = useMonosetPortalContainer();
  const addTooltipProvider = tooltip !== false && !parentInfrastructure.tooltip;
  const addToastProvider = toast !== false && !parentInfrastructure.toast;
  const infrastructure = useMemo<InfrastructureState>(
    () => ({
      tooltip: parentInfrastructure.tooltip || addTooltipProvider,
      toast: parentInfrastructure.toast || addToastProvider,
    }),
    [addToastProvider, addTooltipProvider, parentInfrastructure],
  );
  const portalContainer =
    portal === undefined
      ? parentPortal
      : portal === false
        ? null
        : portal.container;
  const reducedMotionPreference: ReducedMotionPreference =
    motion && motion.reducedMotion ? motion.reducedMotion : "user";

  let content = (
    <InfrastructureContext.Provider value={infrastructure}>
      <MonosetPortalContext.Provider value={portalContainer}>
        {children}
      </MonosetPortalContext.Provider>
    </InfrastructureContext.Provider>
  );

  if (addToastProvider) {
    content = <ToastProvider {...(toast || {})}>{content}</ToastProvider>;
  }
  if (addTooltipProvider) {
    content = <TooltipProvider {...(tooltip || {})}>{content}</TooltipProvider>;
  }
  if (motion !== false) {
    content = (
      <ReducedMotionPreferenceContext.Provider value={reducedMotionPreference}>
        <MotionConfig reducedMotion="user" {...motion}>
          {content}
        </MotionConfig>
      </ReducedMotionPreferenceContext.Provider>
    );
  }
  if (theme) {
    content = <ThemeProvider {...theme}>{content}</ThemeProvider>;
  }

  return content;
}
