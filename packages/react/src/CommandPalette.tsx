import * as RDialog from "@radix-ui/react-dialog";
import {
  type ReactNode,
  type KeyboardEvent,
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import { cx } from "./cx";

/* ─── Types ─────────────────────────────────────────────────────── */

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  /** Called when the item is selected. */
  onSelect?: () => void;
  /** Keywords for search matching (not shown in the UI). */
  keywords?: string[];
  disabled?: boolean;
}

export interface CommandGroup {
  heading?: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  /** Controlled open state. */
  open?: boolean;
  /** Called when the palette wants to open or close. */
  onOpenChange?: (open: boolean) => void;
  /** Flat list of items or grouped items. */
  items?: CommandItem[] | CommandGroup[];
  /** Placeholder text for the search input. Default: "Search..." */
  placeholder?: string;
  /** Text shown when no items match. Default: "No results." */
  emptyMessage?: string;
  /** Custom filter function. Receives the query and an item, return true to keep. */
  filter?: (query: string, item: CommandItem) => boolean;
  /** Footer content (keyboard hints, etc). */
  footer?: ReactNode;
  className?: string;
}

/* ─── Helpers ───────────────────────────────────────────────────── */

function isGrouped(items: CommandItem[] | CommandGroup[]): items is CommandGroup[] {
  return items.length > 0 && "items" in items[0];
}

function flatten(items: CommandItem[] | CommandGroup[]): CommandItem[] {
  if (isGrouped(items)) return items.flatMap((g) => g.items);
  return items;
}

function defaultFilter(query: string, item: CommandItem): boolean {
  const q = query.toLowerCase();
  if (item.label.toLowerCase().includes(q)) return true;
  if (item.description?.toLowerCase().includes(q)) return true;
  if (item.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
  return false;
}

/* ─── Component ─────────────────────────────────────────────────── */

export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  function CommandPalette(
    {
      open,
      onOpenChange,
      items = [],
      placeholder = "Search\u2026",
      emptyMessage = "No results.",
      filter = defaultFilter,
      footer,
      className,
    },
    ref,
  ) {
    const [query, setQuery] = useState("");
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Flatten items for keyboard navigation
    const allItems = flatten(items);
    const filtered = query.trim()
      ? allItems.filter((item) => filter(query, item))
      : allItems;

    // Reset state when opened/closed
    useEffect(() => {
      if (open) {
        setQuery("");
        setCursor(0);
        // Focus the input after the portal mounts
        requestAnimationFrame(() => inputRef.current?.focus());
      }
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

    const close = useCallback(() => onOpenChange?.(false), [onOpenChange]);

    const select = useCallback(
      (item: CommandItem) => {
        if (item.disabled) return;
        item.onSelect?.();
        close();
      },
      [close],
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => (c + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => (c - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[cursor];
        if (item) select(item);
      }
    };

    // Build rendered groups
    const renderItems = () => {
      if (filtered.length === 0) {
        return <div className="ms-cmd__empty">{emptyMessage}</div>;
      }

      if (!isGrouped(items) || query.trim()) {
        // Flat list (ungrouped or searching -- groups don't matter during search)
        let idx = 0;
        return filtered.map((item) => {
          const i = idx++;
          return renderItem(item, i);
        });
      }

      // Grouped, no search active
      let idx = 0;
      return items.map((group, gi) => {
        const groupFiltered = group.items.filter((item) => filter(query, item));
        if (groupFiltered.length === 0) return null;
        return (
          <div key={gi} role="group" aria-label={group.heading}>
            {group.heading && (
              <div className="ms-cmd__group-heading">{group.heading}</div>
            )}
            {groupFiltered.map((item) => {
              const i = idx++;
              return renderItem(item, i);
            })}
          </div>
        );
      });
    };

    const renderItem = (item: CommandItem, idx: number) => (
      <button
        key={item.id}
        role="option"
        aria-selected={idx === cursor}
        aria-disabled={item.disabled || undefined}
        data-active={idx === cursor ? "" : undefined}
        className={cx("ms-cmd__item", idx === cursor && "ms-cmd__item--active")}
        onMouseEnter={() => setCursor(idx)}
        onClick={() => select(item)}
        tabIndex={-1}
      >
        {item.icon && <span className="ms-cmd__item-icon">{item.icon}</span>}
        <span className="ms-cmd__item-text">
          <span className="ms-cmd__item-label">{item.label}</span>
          {item.description && (
            <span className="ms-cmd__item-desc">{item.description}</span>
          )}
        </span>
      </button>
    );

    return (
      <RDialog.Root open={open} onOpenChange={onOpenChange}>
        <RDialog.Portal>
          <RDialog.Overlay className="ms-cmd-scrim" />
          <RDialog.Content
            ref={ref}
            className={cx("ms-cmd", className)}
            aria-label="Command palette"
            onKeyDown={onKey}
          >
            <RDialog.Title className="ms-sr-only">Command palette</RDialog.Title>
            <div className="ms-cmd__input-wrap">
              <svg
                className="ms-cmd__search-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                className="ms-cmd__input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                aria-label="Search"
                aria-autocomplete="list"
                aria-controls="ms-cmd-list"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div
              ref={listRef}
              id="ms-cmd-list"
              role="listbox"
              className="ms-cmd__list"
            >
              {renderItems()}
            </div>
            {footer && <div className="ms-cmd__footer">{footer}</div>}
          </RDialog.Content>
        </RDialog.Portal>
      </RDialog.Root>
    );
  },
);
