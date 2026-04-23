import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "./cx";

export type Theme = "light" | "dark" | "system";

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme. Defaults to "system". */
  defaultTheme?: Theme;
  /** localStorage key. Defaults to "monoset-theme". */
  storageKey?: string;
}

interface ThemeContext {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeCtx = createContext<ThemeContext | null>(null);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "monoset-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
    return defaultTheme;
  });

  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(getSystemTheme);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        // Storage full or unavailable -- silent fail.
      }
    },
    [storageKey],
  );

  // Listen for system preference changes.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Apply attribute to documentElement.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-monoset-theme", resolvedTheme);
    root.classList.toggle("monoset-dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): ThemeContext {
  const ctx = useContext(ThemeCtx);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return ctx;
}

/* ---------------------------------------------------------------
   ThemeToggle — cycles light > dark > system
   --------------------------------------------------------------- */

const NEXT: Record<Theme, Theme> = {
  light: "dark",
  dark: "system",
  system: "light",
};

const LABEL: Record<Theme, string> = {
  light: "Switch to dark mode",
  dark: "Switch to system mode",
  system: "Switch to light mode",
};

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.5 9.2A5.5 5.5 0 0 1 6.8 2.5 5.5 5.5 0 1 0 13.5 9.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2.5" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 13.5h5M8 10.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const ICON: Record<Theme, () => JSX.Element> = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon,
};

export interface ThemeToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {}

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  function ThemeToggle({ className, ...rest }, ref) {
    const { theme, setTheme } = useTheme();
    const Icon = ICON[theme];

    return (
      <button
        ref={ref}
        type="button"
        aria-label={LABEL[theme]}
        className={cx("ms-btn", "ms-btn--ghost", "ms-btn--sm", className)}
        onClick={() => setTheme(NEXT[theme])}
        {...rest}
      >
        <Icon />
      </button>
    );
  },
);
