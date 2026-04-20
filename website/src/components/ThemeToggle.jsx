import { useEffect, useState } from "react";

// One source of truth: document.documentElement.dataset.theme.
// A small inline <script> in index.html primes this before CSS so there's
// no flash on first paint.

// Dark mode is scoped to the docs area only (landing stays as-designed).
// We read the preference from localStorage and toggle the `monoset-dark`
// class on the docs-layout container. The CSS rule lives in the shipped
// @monoset/tokens package.
function readTheme() {
  if (typeof document === "undefined") return "light";
  try {
    const t = localStorage.getItem("monoset-theme");
    return t === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function writeTheme(theme) {
  if (typeof document === "undefined") return;
  const layout = document.querySelector('[data-ms="docs-layout"]');
  if (layout) layout.classList.toggle("monoset-dark", theme === "dark");
  try {
    localStorage.setItem("monoset-theme", theme);
  } catch {}
}

/**
 * Header icon button that flips between light and dark.
 * Respects OS `prefers-color-scheme` on first visit, then remembers.
 */
export default function ThemeToggle({ size = 16 }) {
  const [theme, setTheme] = useState(readTheme);

  // On mount, sync the docs-layout container with the stored preference.
  useEffect(() => {
    writeTheme(readTheme());
  }, []);

  useEffect(() => {
    // Sync with OS changes if the user never explicitly toggled.
    const mm = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mm) return;
    const onOs = (e) => {
      if (!localStorage.getItem("monoset-theme")) {
        const next = e.matches ? "dark" : "light";
        writeTheme(next);
        setTheme(next);
      }
    };
    mm.addEventListener?.("change", onOs);
    return () => mm.removeEventListener?.("change", onOs);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    writeTheme(next);
    setTheme(next);
  };

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      data-ms="theme-toggle"
      style={{
        width: 30,
        height: 30,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "1px solid var(--border)",
        borderRadius: 6,
        cursor: "pointer",
        color: "var(--fg2)",
        transition:
          "color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--fg1)";
        e.currentTarget.style.background = "var(--bg-subtle)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--fg2)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {isDark ? (
        // Sun icon (switch to light)
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon icon (switch to dark)
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
