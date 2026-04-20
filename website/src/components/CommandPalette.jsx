import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Full-text search palette. Opens on Cmd/Ctrl+K or "/" (when not typing).
// Orama + index are lazy-loaded on first open so they don't hit the main bundle.

let _searchImpl;
async function loadIndex() {
  const [{ create, insert, search }, res] = await Promise.all([
    import("@orama/orama"),
    fetch("/search-index.json"),
  ]);
  if (!res.ok) throw new Error("search index missing");
  /** @type {Array<{id:string, slug:string, hash:string, title:string, kind:string, desc:string, body:string}>} */
  const records = await res.json();
  const db = create({
    schema: {
      title: "string",
      desc: "string",
      body: "string",
      slug: "string",
      hash: "string",
      kind: "string",
    },
  });
  for (const r of records) insert(db, r);
  _searchImpl = search;
  return { db, records };
}

function useCmdK(onOpen) {
  useEffect(() => {
    const onKey = (e) => {
      const inTextField =
        document.activeElement instanceof HTMLElement &&
        /^(INPUT|TEXTAREA|SELECT)$/i.test(document.activeElement.tagName);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      } else if (e.key === "/" && !inTextField) {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpen]);
}

/**
 * Global command palette. Mount once, anywhere in the tree.
 * Consumers can trigger it by dispatching a CustomEvent('monoset:open-palette').
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(null);     // { db, records }
  const [results, setResults] = useState([]);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Lazy-load the index the first time the palette is opened
  useEffect(() => {
    if (!open || idx) return;
    let cancelled = false;
    loadIndex().then((x) => {
      if (!cancelled) setIdx(x);
    });
    return () => {
      cancelled = true;
    };
  }, [open, idx]);

  // Keyboard: Cmd+K / Ctrl+K / "/"
  useCmdK(() => setOpen(true));

  // Also allow any component to open it via a CustomEvent
  useEffect(() => {
    const fn = () => setOpen(true);
    window.addEventListener("monoset:open-palette", fn);
    return () => window.removeEventListener("monoset:open-palette", fn);
  }, []);

  // Autofocus when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  // Run search whenever query or index changes
  useEffect(() => {
    if (!idx) {
      setResults([]);
      return;
    }
    if (!q.trim()) {
      // Show the 8 top-level pages when query is empty
      const topLevel = idx.records.filter((r) => r.kind === "page" || r.kind === "home").slice(0, 8);
      setResults(topLevel);
      setCursor(0);
      return;
    }
    const doSearch = async () => {
      if (!_searchImpl) return;
      const r = await _searchImpl(idx.db, {
        term: q,
        properties: ["title", "desc", "body"],
        boost: { title: 3, desc: 1.5 },
        limit: 10,
        tolerance: 1,
      });
      setResults(r.hits.map((h) => h.document));
      setCursor(0);
    };
    doSearch();
  }, [q, idx]);

  const close = () => {
    setOpen(false);
    setQ("");
  };
  const pick = (row) => {
    close();
    navigate(`/${row.slug}${row.hash || ""}`);
  };

  const onKey = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const row = results[cursor];
      if (row) pick(row);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search Monoset"
          data-ms="command-palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgb(0 0 0 / 0.4)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "12vh 16px 0",
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.3, 0, 0, 1] }}
            style={{
              width: "100%",
              maxWidth: 560,
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              boxShadow: "var(--shadow-xl, 0 24px 48px -12px rgb(0 0 0 / 0.25))",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              maxHeight: "70vh",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--fg3)" }}>
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder="Search pages, tokens, components…"
                aria-label="Search"
                style={{
                  flex: 1,
                  fontFamily: "inherit",
                  fontSize: 15,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "var(--fg1)",
                }}
              />
              <kbd style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                background: "var(--bg-muted)",
                color: "var(--fg3)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 4,
                padding: "2px 6px",
                lineHeight: 1,
              }}>Esc</kbd>
            </div>

            <div style={{ overflowY: "auto", padding: 8 }}>
              {!idx && (
                <div style={{ padding: "24px 12px", fontSize: 13, color: "var(--fg3)" }}>
                  Loading…
                </div>
              )}
              {idx && results.length === 0 && (
                <div style={{ padding: "24px 12px", fontSize: 13, color: "var(--fg3)" }}>
                  No matches.
                </div>
              )}
              {results.map((row, i) => (
                <button
                  key={row.id}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => pick(row)}
                  style={{
                    all: "unset",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                    background: i === cursor ? "var(--bg-muted)" : "transparent",
                    color: "var(--fg1)",
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{row.title}</span>
                  {row.desc && (
                    <span style={{ fontSize: 12, color: "var(--fg3)" }}>{row.desc}</span>
                  )}
                </button>
              ))}
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 14px",
              borderTop: "1px solid var(--border-subtle)",
              fontSize: 10,
              color: "var(--fg3)",
              background: "var(--bg-subtle)",
            }}>
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span>esc close</span>
              <span style={{ marginLeft: "auto" }}>
                <kbd style={{ fontFamily: "var(--font-mono)", background: "var(--bg)", border: "1px solid var(--border-subtle)", borderRadius: 3, padding: "0 4px" }}>⌘K</kbd>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
