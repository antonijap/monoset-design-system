import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Theme.tsx
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { jsx } from "react/jsx-runtime";
var ThemeCtx = createContext(null);
var DocumentThemeDepthCtx = createContext(0);
var documentThemeRegistries = /* @__PURE__ */ new WeakMap();
var documentThemeSequence = 0;
function applyDocumentTheme(root, registry) {
  const owner = registry.owners.reduce((winner, entry) => {
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
function registerDocumentTheme(root, identity, depth, theme) {
  let registry = documentThemeRegistries.get(root);
  if (!registry) {
    registry = {
      baselineTheme: root.getAttribute("data-monoset-theme"),
      baselineDark: root.classList.contains("monoset-dark"),
      owners: []
    };
    documentThemeRegistries.set(root, registry);
  }
  registry.owners.push({
    identity,
    depth,
    sequence: ++documentThemeSequence,
    theme
  });
  applyDocumentTheme(root, registry);
}
function updateDocumentTheme(root, identity, theme) {
  const registry = documentThemeRegistries.get(root);
  const owner = registry?.owners.find((entry) => entry.identity === identity);
  if (!registry || !owner) return;
  owner.theme = theme;
  applyDocumentTheme(root, registry);
}
function unregisterDocumentTheme(root, identity) {
  const registry = documentThemeRegistries.get(root);
  if (!registry) return;
  registry.owners = registry.owners.filter((entry) => entry.identity !== identity);
  applyDocumentTheme(root, registry);
  if (registry.owners.length === 0) documentThemeRegistries.delete(root);
}
function isTheme(value) {
  return value === "light" || value === "dark" || value === "system";
}
function getStorage(storage) {
  if (storage !== void 0) return storage;
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}
function getMediaQuery() {
  if (typeof window === "undefined") return null;
  try {
    return typeof window.matchMedia === "function" ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  } catch {
    return null;
  }
}
function withoutOwnedDarkClass(className) {
  const classes = className?.split(/\s+/).filter((name) => name && name !== "monoset-dark").join(" ");
  return classes || void 0;
}
function ThemeProvider({
  children,
  initialTheme = "system",
  storageKey = "monoset-theme",
  storage,
  target = "document",
  scopeProps
}) {
  const parentDocumentDepth = useContext(DocumentThemeDepthCtx);
  const [ownerIdentity] = useState(() => /* @__PURE__ */ Symbol("monoset-document-theme-owner"));
  const documentDepth = parentDocumentDepth + (target === "document" ? 1 : 0);
  const [theme, setThemeState] = useState(initialTheme);
  const [systemTheme, setSystemTheme] = useState("light");
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const [registrationTheme] = useState(resolvedTheme);
  const setTheme = useCallback(
    (next) => {
      setThemeState(next);
      const persistence = getStorage(storage);
      try {
        persistence?.setItem(storageKey, next);
      } catch {
      }
    },
    [storage, storageKey]
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
      }
    });
    return () => {
      active = false;
    };
  }, [storage, storageKey]);
  useEffect(() => {
    const query = getMediaQuery();
    if (!query) return;
    const update = (event) => {
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
    [theme, resolvedTheme, setTheme]
  );
  const content = /* @__PURE__ */ jsx(DocumentThemeDepthCtx.Provider, { value: documentDepth, children: /* @__PURE__ */ jsx(ThemeCtx.Provider, { value, children }) });
  if (target !== "scope") return content;
  const { className, ...nativeScopeProps } = scopeProps ?? {};
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...nativeScopeProps,
      className: cx(
        withoutOwnedDarkClass(className),
        resolvedTheme === "dark" && "monoset-dark"
      ),
      "data-monoset-theme": resolvedTheme,
      children: content
    }
  );
}
function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return ctx;
}
var NEXT = {
  light: "dark",
  dark: "system",
  system: "light"
};
var LABEL = {
  light: "Switch to dark mode",
  dark: "Switch to system mode",
  system: "Switch to light mode"
};
function SunIcon() {
  return /* @__PURE__ */ jsx(Sun, { size: 16, strokeWidth: 2, "aria-hidden": "true" });
}
function MoonIcon() {
  return /* @__PURE__ */ jsx(Moon, { size: 16, strokeWidth: 2, "aria-hidden": "true" });
}
function MonitorIcon() {
  return /* @__PURE__ */ jsx(Monitor, { size: 16, strokeWidth: 2, "aria-hidden": "true" });
}
var ICON = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon
};
var ThemeToggle = forwardRef(
  function ThemeToggle2({ className, onClick, type = "button", "aria-label": ariaLabel, ...rest }, ref) {
    const { theme, setTheme } = useTheme();
    const Icon = ICON[theme];
    const handleClick = (event) => {
      setTheme(NEXT[theme]);
      onClick?.(event);
    };
    return /* @__PURE__ */ jsx(
      "button",
      {
        ...rest,
        ref,
        type,
        "aria-label": ariaLabel ?? LABEL[theme],
        className: cx("ms-btn", "ms-btn--ghost", "ms-btn--sm", className),
        onClick: handleClick,
        children: /* @__PURE__ */ jsx(Icon, {})
      }
    );
  }
);

export {
  ThemeProvider,
  useTheme,
  ThemeToggle
};
//# sourceMappingURL=chunk-QLOWXPQE.js.map