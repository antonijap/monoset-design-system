import * as react from 'react';
import { ReactNode, ComponentPropsWithoutRef, ButtonHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";
interface ThemeStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}
interface ThemeProviderProps {
    children: ReactNode;
    /** Theme used for server rendering and the first client render. */
    initialTheme?: Theme;
    /** Persistence key. Defaults to "monoset-theme". */
    storageKey?: string;
    /** Custom persistence. Pass null to disable it. */
    storage?: ThemeStorage | null;
    /**
     * Apply the theme to the document or to a provider-owned wrapper. Document
     * providers own data-monoset-theme and monoset-dark while mounted.
     */
    target?: "document" | "scope";
    /** Native props for the wrapper rendered when target is "scope". */
    scopeProps?: Omit<ComponentPropsWithoutRef<"div">, "children">;
}
interface ThemeContextValue {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
}
declare function ThemeProvider({ children, initialTheme, storageKey, storage, target, scopeProps, }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
declare function useTheme(): ThemeContextValue;
interface ThemeToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
}
declare const ThemeToggle: react.ForwardRefExoticComponent<ThemeToggleProps & react.RefAttributes<HTMLButtonElement>>;

export { type ResolvedTheme, type Theme, ThemeProvider, type ThemeProviderProps, type ThemeStorage, ThemeToggle, type ThemeToggleProps, useTheme };
