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
import { Monitor, Moon, Sun } from "lucide-react";
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
  return <Sun size={16} strokeWidth={2} aria-hidden="true" />;
}

function MoonIcon() {
  return <Moon size={16} strokeWidth={2} aria-hidden="true" />;
}

function MonitorIcon() {
  return <Monitor size={16} strokeWidth={2} aria-hidden="true" />;
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
