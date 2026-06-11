import * as RPopover from "@radix-ui/react-popover";
import {
  type KeyboardEvent,
  useState,
  useRef,
  useEffect,
  useId,
  forwardRef,
} from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cx } from "./cx";

/* ─── Types ─────────────────────────────────────────────────────── */

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  /** Extra terms used by search but not displayed. */
  keywords?: string[];
}

export interface ComboboxProps {
  options: ComboboxOption[];
  /** Controlled value. */
  value?: string;
  /** Called with the new value when an option is picked. */
  onValueChange?: (value: string) => void;
  /** Placeholder text on the trigger when nothing is selected. Default: "Select..." */
  placeholder?: string;
  /** Placeholder text inside the search input. Default: "Search..." */
  searchPlaceholder?: string;
  /** Text shown when no options match the query. Default: "No results." */
  emptyMessage?: string;
  /** Custom filter function. Receives the query and an option, return true to keep. */
  filter?: (query: string, option: ComboboxOption) => boolean;
  /** Disabled state for the whole control. */
  disabled?: boolean;
  /** Forwarded to the trigger button. */
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

/* ─── Helpers ───────────────────────────────────────────────────── */

function defaultFilter(query: string, option: ComboboxOption): boolean {
  const q = query.toLowerCase();
  if (option.label.toLowerCase().includes(q)) return true;
  if (option.description?.toLowerCase().includes(q)) return true;
  if (option.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
  return false;
}

/* ─── Component ─────────────────────────────────────────────────── */

export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  function Combobox(
    {
      options,
      value,
      onValueChange,
      placeholder = "Select…",
      searchPlaceholder = "Search…",
      emptyMessage = "No results.",
      filter = defaultFilter,
      disabled,
      id,
      className,
      ...ariaProps
    },
    ref,
  ) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const listId = useId();

    const filtered = query.trim()
      ? options.filter((opt) => filter(query, opt))
      : options;

    const selected = options.find((opt) => opt.value === value) || null;

    // Reset on open
    useEffect(() => {
      if (open) {
        setQuery("");
        // Query resets to "" on open, so the visible list is the full options
        // array; index into that, not the stale filtered list from the last query.
        setCursor(Math.max(0, options.findIndex((opt) => opt.value === value)));
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    // Keep cursor in bounds
    useEffect(() => {
      setCursor((c) => Math.min(c, Math.max(0, filtered.length - 1)));
    }, [filtered.length]);

    // Scroll active item into view
    useEffect(() => {
      const el = listRef.current?.querySelector("[data-active]");
      el?.scrollIntoView({ block: "nearest" });
    }, [cursor]);

    const select = (option: ComboboxOption) => {
      if (option.disabled) return;
      onValueChange?.(option.value);
      setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => (c + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => (c - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const opt = filtered[cursor];
        if (opt) select(opt);
      }
    };

    return (
      <RPopover.Root open={open} onOpenChange={setOpen}>
        <RPopover.Trigger asChild disabled={disabled}>
          <button
            ref={ref}
            id={id}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-haspopup="listbox"
            disabled={disabled}
            className={cx("ms-combobox__trigger", className)}
            {...ariaProps}
          >
            <span className={cx("ms-combobox__value", !selected && "ms-combobox__value--placeholder")}>
              {selected ? selected.label : placeholder}
            </span>
            <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
          </button>
        </RPopover.Trigger>

        <RPopover.Portal>
          <RPopover.Content
            sideOffset={6}
            align="start"
            className="ms-combobox__panel"
            onOpenAutoFocus={(e) => e.preventDefault()}
            style={{ width: "var(--radix-popover-trigger-width)" }}
          >
            <div className="ms-combobox__input-wrap">
              <Search className="ms-combobox__search-icon" size={14} strokeWidth={2} aria-hidden="true" />
              <input
                ref={inputRef}
                className="ms-combobox__input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKey}
                placeholder={searchPlaceholder}
                aria-autocomplete="list"
                aria-controls={listId}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div ref={listRef} id={listId} role="listbox" className="ms-combobox__list">
              {filtered.length === 0 ? (
                <div className="ms-combobox__empty">{emptyMessage}</div>
              ) : (
                filtered.map((opt, i) => {
                  const isSelected = opt.value === value;
                  const isActive = i === cursor;
                  return (
                    <button
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={opt.disabled || undefined}
                      data-active={isActive ? "" : undefined}
                      className={cx(
                        "ms-combobox__option",
                        isActive && "ms-combobox__option--active",
                        isSelected && "ms-combobox__option--selected",
                      )}
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => select(opt)}
                      tabIndex={-1}
                      type="button"
                    >
                      <span className="ms-combobox__option-text">
                        <span className="ms-combobox__option-label">{opt.label}</span>
                        {opt.description && (
                          <span className="ms-combobox__option-desc">{opt.description}</span>
                        )}
                      </span>
                      {isSelected && <Check className="ms-combobox__check" size={14} strokeWidth={2} aria-hidden="true" />}
                    </button>
                  );
                })
              )}
            </div>
          </RPopover.Content>
        </RPopover.Portal>
      </RPopover.Root>
    );
  },
);
