import * as RPopover from "@radix-ui/react-popover";
import { forwardRef, useEffect, useRef, useState, useId, type KeyboardEvent } from "react";
import { cx } from "./cx";

export interface MultiComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  keywords?: string[];
}

export interface MultiComboboxProps {
  options: MultiComboboxOption[];
  /** Currently selected values. Controlled. */
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  filter?: (query: string, option: MultiComboboxOption) => boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

function defaultFilter(query: string, option: MultiComboboxOption): boolean {
  const q = query.toLowerCase();
  return (
    option.label.toLowerCase().includes(q) ||
    !!option.description?.toLowerCase().includes(q) ||
    !!option.keywords?.some((k) => k.toLowerCase().includes(q))
  );
}

export const MultiCombobox = forwardRef<HTMLButtonElement, MultiComboboxProps>(
  function MultiCombobox({ options, value, defaultValue = [], onValueChange, placeholder = "Select…", searchPlaceholder = "Search…", emptyMessage = "No results.", filter = defaultFilter, disabled, id, className, ...ariaProps }, ref) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<string[]>(defaultValue);
    const selected = isControlled ? value! : internal;

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listId = useId();

    const filtered = query.trim() ? options.filter((o) => filter(query, o)) : options;

    useEffect(() => {
      if (open) {
        setQuery("");
        setCursor(0);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    }, [open]);

    useEffect(() => {
      setCursor((c) => Math.min(c, Math.max(0, filtered.length - 1)));
    }, [filtered.length]);

    const setSelected = (next: string[]) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };

    const toggle = (val: string) => {
      const next = selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val];
      setSelected(next);
    };

    const removeAt = (val: string) => setSelected(selected.filter((v) => v !== val));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => (c + 1) % Math.max(1, filtered.length)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => (c - 1 + filtered.length) % Math.max(1, filtered.length)); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const opt = filtered[cursor];
        if (opt && !opt.disabled) toggle(opt.value);
      }
    };

    const labelOf = (val: string) => options.find((o) => o.value === val)?.label || val;

    return (
      <RPopover.Root open={open} onOpenChange={setOpen}>
        <RPopover.Trigger asChild disabled={disabled}>
          <button
            ref={ref}
            id={id}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={listId}
            disabled={disabled}
            className={cx("ms-combobox__trigger", "ms-multicombobox__trigger", className)}
            {...ariaProps}
          >
            {selected.length === 0 ? (
              <span className="ms-combobox__value ms-combobox__value--placeholder">{placeholder}</span>
            ) : (
              <span className="ms-multicombobox__tags">
                {selected.map((v) => (
                  <span key={v} className="ms-multicombobox__tag">
                    {labelOf(v)}
                    <span
                      role="button"
                      aria-label={`Remove ${labelOf(v)}`}
                      onClick={(e) => { e.stopPropagation(); removeAt(v); }}
                      className="ms-multicombobox__tag-remove"
                    >×</span>
                  </span>
                ))}
              </span>
            )}
            <ChevronDown/>
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
              <SearchIcon/>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKey}
                placeholder={searchPlaceholder}
                aria-controls={listId}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                className="ms-combobox__input"
              />
            </div>
            <div id={listId} role="listbox" aria-multiselectable className="ms-combobox__list">
              {filtered.length === 0 ? (
                <div className="ms-combobox__empty">{emptyMessage}</div>
              ) : filtered.map((opt, i) => {
                const isSel = selected.includes(opt.value);
                const isActive = i === cursor;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSel}
                    aria-disabled={opt.disabled || undefined}
                    data-active={isActive ? "" : undefined}
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => !opt.disabled && toggle(opt.value)}
                    className={cx("ms-combobox__option", isActive && "ms-combobox__option--active", isSel && "ms-combobox__option--selected")}
                    tabIndex={-1}
                  >
                    <span className={cx("ms-multicombobox__check", isSel && "ms-multicombobox__check--on")}>
                      {isSel ? "✓" : ""}
                    </span>
                    <span className="ms-combobox__option-text">
                      <span className="ms-combobox__option-label">{opt.label}</span>
                      {opt.description && <span className="ms-combobox__option-desc">{opt.description}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </RPopover.Content>
        </RPopover.Portal>
      </RPopover.Root>
    );
  },
);

function ChevronDown() {
  return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6"/></svg>);
}
function SearchIcon() {
  return (<svg className="ms-combobox__search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>);
}
