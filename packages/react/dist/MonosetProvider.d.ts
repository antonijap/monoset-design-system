import * as react_jsx_runtime from 'react/jsx-runtime';
import { ComponentProps, ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { TooltipProviderProps } from './Tooltip.js';
import { ToastProviderProps } from './Toast.js';
import { ThemeProviderProps } from './Theme.js';
export { useMonosetPortalContainer } from './PortalContext.js';
import '@radix-ui/react-tooltip';
import '@radix-ui/react-toast';

type MonosetThemeOptions = Omit<ThemeProviderProps, "children">;
type MonosetTooltipOptions = Omit<TooltipProviderProps, "children">;
type MonosetToastOptions = Omit<ToastProviderProps, "children">;
type MonosetMotionOptions = Omit<ComponentProps<typeof MotionConfig>, "children">;
interface MonosetPortalOptions {
    container: HTMLElement | null;
}
interface MonosetProviderProps {
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
declare function MonosetProvider({ children, theme, tooltip, toast, motion, portal, }: MonosetProviderProps): react_jsx_runtime.JSX.Element;

export { type MonosetMotionOptions, type MonosetPortalOptions, MonosetProvider, type MonosetProviderProps, type MonosetThemeOptions, type MonosetToastOptions, type MonosetTooltipOptions };
