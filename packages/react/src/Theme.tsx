import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cx } from "./cx";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface ThemeProviderProps {
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

const ThemeCtx = createContext<ThemeContextValue | null>(null);
const DocumentThemeDepthCtx = createContext(0);

interface DocumentThemeOwner {
  identity: symbol;
  depth: number;
  sequence: number;
  theme: ResolvedTheme;
}

interface DocumentThemeRegistry {
  baselineTheme: string | null;
  baselineDark: boolean;
  owners: DocumentThemeOwner[];
}

const documentThemeRegistries = new WeakMap<HTMLElement, DocumentThemeRegistry>();
let documentThemeSequence = 0;

function applyDocumentTheme(root: HTMLElement, registry: DocumentThemeRegistry) {
  const owner = registry.owners.reduce<DocumentThemeOwner | null>((winner, entry) => {
    if (!winner || entry.depth > winner.depth) return entry;
    if (entry.depth === winner.depth && entry.sequence > winner.sequence) return entry;
    return winner;
  }, null);

  if (owner) {
    root.setAttribute("data-monoset-theme", owner.theme);
    root.classList.toggle("monoset-dark", owner.theme === "dark");
    return;
  }

  if (registry.baselineTheme === null) root.removeAttribute("data-monoset-theme");
  else root.setAttribute("data-monoset-theme", registry.baselineTheme);
  root.classList.toggle("monoset-dark", registry.baselineDark);
}

function registerDocumentTheme(
  root: HTMLElement,
  identity: symbol,
  depth: number,
  theme: ResolvedTheme,
) {
  let registry = documentThemeRegistries.get(root);
  if (!registry) {
    registry = {
      baselineTheme: root.getAttribute("data-monoset-theme"),
      baselineDark: root.classList.contains("monoset-dark"),
      owners: [],
    };
    documentThemeRegistries.set(root, registry);
  }
  registry.owners.push({
    identity,
    depth,
    sequence: ++documentThemeSequence,
    theme,
  });
  applyDocumentTheme(root, registry);
}

function updateDocumentTheme(
  root: HTMLElement,
  identity: symbol,
  theme: ResolvedTheme,
) {
  const registry = documentThemeRegistries.get(root);
  const owner = registry?.owners.find((entry) => entry.identity === identity);
  if (!registry || !owner) return;
  owner.theme = theme;
  applyDocumentTheme(root, registry);
}

function unregisterDocumentTheme(root: HTMLElement, identity: symbol) {
  const registry = documentThemeRegistries.get(root);
  if (!registry) return;
  registry.owners = registry.owners.filter((entry) => entry.identity !== identity);
  applyDocumentTheme(root, registry);
  if (registry.owners.length === 0) documentThemeRegistries.delete(root);
}

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

function getStorage(storage: ThemeStorage | null | undefined): ThemeStorage | null {
  if (storage !== undefined) return storage;
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

function getMediaQuery(): MediaQueryList | null {
  if (typeof window === "undefined") return null;
  try {
    return typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;
  } catch {
    return null;
  }
}

function withoutOwnedDarkClass(className: string | undefined): string | undefined {
  const classes = className
    ?.split(/\s+/)
    .filter((name) => name && name !== "monoset-dark")
    .join(" ");
  return classes || undefined;
}

export function ThemeProvider({
  children,
  initialTheme = "system",
  storageKey = "monoset-theme",
  storage,
  target = "document",
  scopeProps,
}: ThemeProviderProps) {
  const parentDocumentDepth = useContext(DocumentThemeDepthCtx);
  const [ownerIdentity] = useState(() => Symbol("monoset-document-theme-owner"));
  const documentDepth = parentDocumentDepth + (target === "document" ? 1 : 0);
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const [registrationTheme] = useState<ResolvedTheme>(resolvedTheme);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      const persistence = getStorage(storage);
      try {
        persistence?.setItem(storageKey, next);
      } catch {
        // Persistence can be disabled by browser privacy settings or storage limits.
      }
    },
    [storage, storageKey],
  );

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      const persistence = getStorage(storage);
      try {
        const stored = persistence?.getItem(storageKey);
        if (active && isTheme(stored)) setThemeState(stored);
      } catch {
        // Keep the explicit initial theme when persistence is unavailable.
      }
    });
    return () => {
      active = false;
    };
  }, [storage, storageKey]);

  useEffect(() => {
    const query = getMediaQuery();
    if (!query) return;

    const update = (event: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };
    update(query);

    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", update);
      return () => query.removeEventListener("change", update);
    }
    if (typeof query.addListener === "function") {
      query.addListener(update);
      return () => query.removeListener(update);
    }
  }, []);

  useEffect(() => {
    if (target !== "document" || typeof document === "undefined") return;
    const root = document.documentElement;
    registerDocumentTheme(root, ownerIdentity, documentDepth, registrationTheme);
    return () => unregisterDocumentTheme(root, ownerIdentity);
  }, [documentDepth, ownerIdentity, registrationTheme, target]);

  useEffect(() => {
    if (target !== "document" || typeof document === "undefined") return;
    updateDocumentTheme(document.documentElement, ownerIdentity, resolvedTheme);
  }, [ownerIdentity, resolvedTheme, target]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  const content = (
    <DocumentThemeDepthCtx.Provider value={documentDepth}>
      <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
    </DocumentThemeDepthCtx.Provider>
  );
  if (target !== "scope") return content;

  const { className, ...nativeScopeProps } = scopeProps ?? {};
  return (
    <div
      {...nativeScopeProps}
      className={cx(
        withoutOwnedDarkClass(className),
        resolvedTheme === "dark" && "monoset-dark",
      )}
      data-monoset-theme={resolvedTheme}
    >
      {content}
    </div>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeCtx);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return ctx;
}

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
  function ThemeToggle(
    { className, onClick, type = "button", "aria-label": ariaLabel, ...rest },
    ref,
  ) {
    const { theme, setTheme } = useTheme();
    const Icon = ICON[theme];
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setTheme(NEXT[theme]);
      onClick?.(event);
    };

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        aria-label={ariaLabel ?? LABEL[theme]}
        className={cx("ms-btn", "ms-btn--ghost", "ms-btn--sm", className)}
        onClick={handleClick}
      >
        <Icon />
      </button>
    );
  },
);
