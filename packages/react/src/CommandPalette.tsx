import * as RDialog from "@radix-ui/react-dialog";
import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Search } from "lucide-react";
import { useMonosetPortalContainer } from "./PortalContext";
import { cx } from "./cx";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  /** Called when the action is selected. */
  onSelect?: () => void;
  /** Extra search terms that are not rendered. */
  keywords?: string[];
  disabled?: boolean;
}

export interface CommandGroup {
  heading?: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  /** CommandPalette is explicitly controlled. */
  open: boolean;
  /** Called when an action or dialog interaction requests dismissal. */
  onOpenChange: (open: boolean) => void;
  items?: CommandItem[] | CommandGroup[];
  placeholder?: string;
  emptyMessage?: string;
  filter?: (query: string, item: CommandItem) => boolean;
  footer?: ReactNode;
  className?: string;
}

interface IndexedItem {
  item: CommandItem;
  index: number;
}

interface IndexedGroup {
  heading?: string;
  groupIndex: number;
  entries: IndexedItem[];
}

function isGrouped(items: CommandItem[] | CommandGroup[]): items is CommandGroup[] {
  return items.length > 0 && "items" in items[0];
}

function indexItems(items: CommandItem[] | CommandGroup[]): {
  entries: IndexedItem[];
  groups: IndexedGroup[] | null;
} {
  if (!isGrouped(items)) {
    return {
      entries: items.map((item, index) => ({ item, index })),
      groups: null,
    };
  }

  let index = 0;
  const groups = items.map((group, groupIndex) => ({
    heading: group.heading,
    groupIndex,
    entries: group.items.map((item) => ({ item, index: index++ })),
  }));
  return { entries: groups.flatMap((group) => group.entries), groups };
}

function defaultFilter(query: string, item: CommandItem): boolean {
  const normalizedQuery = query.toLocaleLowerCase();
  return (
    item.label.toLocaleLowerCase().includes(normalizedQuery) ||
    !!item.description?.toLocaleLowerCase().includes(normalizedQuery) ||
    !!item.keywords?.some((keyword) =>
      keyword.toLocaleLowerCase().includes(normalizedQuery),
    )
  );
}

export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  function CommandPalette(
    {
      open,
      onOpenChange,
      items = [],
      placeholder = "Search…",
      emptyMessage = "No results.",
      filter = defaultFilter,
      footer,
      className,
    },
    ref,
  ) {
    const portalContainer = useMonosetPortalContainer();
    const instanceId = useId();
    const listId = `${instanceId}-listbox`;
    const inputRef = useRef<HTMLInputElement>(null);
    const returnFocusRef = useRef<HTMLElement | null>(null);
    const wasOpen = useRef(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const indexed = useMemo(() => indexItems(items), [items]);
    const normalizedQuery = query.trim();
    const matches = (entry: IndexedItem) =>
      normalizedQuery.length === 0 || filter(normalizedQuery, entry.item);
    const filteredEntries = indexed.entries.filter(matches);
    const enabledEntries = filteredEntries.filter((entry) => !entry.item.disabled);
    const activeEntry =
      enabledEntries.find((entry) => entry.index === activeIndex) ??
      enabledEntries[0] ??
      null;

    const optionId = (entry: IndexedItem) =>
      `${instanceId}-option-${entry.index}`;

    useEffect(() => {
      if (open && !wasOpen.current) {
        setQuery("");
        setActiveIndex(indexed.entries.find((entry) => !entry.item.disabled)?.index ?? null);
      }
      wasOpen.current = open;
    }, [indexed.entries, open]);

    useEffect(() => {
      if (!activeEntry) return;
      const option = document.getElementById(
        `${instanceId}-option-${activeEntry.index}`,
      );
      option?.scrollIntoView({ block: "nearest" });
    }, [activeEntry, instanceId]);

    const moveActive = (direction: 1 | -1) => {
      if (enabledEntries.length === 0) return;
      const currentIndex = activeEntry
        ? enabledEntries.findIndex((entry) => entry.index === activeEntry.index)
        : -1;
      const nextIndex =
        currentIndex < 0
          ? direction === 1
            ? 0
            : enabledEntries.length - 1
          : (currentIndex + direction + enabledEntries.length) % enabledEntries.length;
      setActiveIndex(enabledEntries[nextIndex].index);
    };

    const select = (item: CommandItem) => {
      if (item.disabled) return;
      item.onSelect?.();
      onOpenChange(false);
    };

    const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveActive(1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        moveActive(-1);
      } else if (event.key === "Enter" && activeEntry) {
        event.preventDefault();
        select(activeEntry.item);
      }
    };

    const renderItem = (entry: IndexedItem) => {
      const { item } = entry;
      const active = entry.index === activeEntry?.index;
      return (
        <button
          key={`${entry.index}-${item.id}`}
          id={optionId(entry)}
          type="button"
          role="option"
          aria-selected={active}
          aria-disabled={item.disabled || undefined}
          disabled={item.disabled}
          data-active={active ? "" : undefined}
          className={cx("ms-cmd__item", active && "ms-cmd__item--active")}
          onMouseEnter={() => {
            if (!item.disabled) setActiveIndex(entry.index);
          }}
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
    };

    const renderResults = () => {
      if (filteredEntries.length === 0) {
        return <div className="ms-cmd__empty">{emptyMessage}</div>;
      }
      if (!indexed.groups) return filteredEntries.map(renderItem);

      return indexed.groups.map((group) => {
        const visibleEntries = group.entries.filter(matches);
        if (visibleEntries.length === 0) return null;
        const headingId = `${instanceId}-group-${group.groupIndex}`;
        return (
          <div
            key={group.groupIndex}
            role="group"
            aria-label={group.heading ? undefined : "Commands"}
            aria-labelledby={group.heading ? headingId : undefined}
          >
            {group.heading && (
              <div id={headingId} className="ms-cmd__group-heading">
                {group.heading}
              </div>
            )}
            {visibleEntries.map(renderItem)}
          </div>
        );
      });
    };

    return (
      <RDialog.Root open={open} onOpenChange={onOpenChange}>
        <RDialog.Portal container={portalContainer ?? undefined}>
          <RDialog.Overlay className="ms-cmd-scrim" />
          <RDialog.Content
            ref={ref}
            className={cx("ms-cmd", className)}
            aria-label="Command palette"
            aria-describedby={undefined}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              const activeElement = document.activeElement;
              const content = inputRef.current?.closest(".ms-cmd");
              returnFocusRef.current =
                activeElement instanceof HTMLElement &&
                activeElement !== document.body &&
                !content?.contains(activeElement)
                  ? activeElement
                  : null;
              inputRef.current?.focus();
            }}
            onCloseAutoFocus={(event) => {
              const returnFocusTo = returnFocusRef.current;
              returnFocusRef.current = null;
              if (!returnFocusTo?.isConnected) return;
              event.preventDefault();
              returnFocusTo.focus();
            }}
          >
            <RDialog.Title className="ms-sr-only">Command palette</RDialog.Title>
            <div className="ms-cmd__input-wrap">
              <Search
                className="ms-cmd__search-icon"
                size={16}
                strokeWidth={2}
                aria-hidden
              />
              <input
                ref={inputRef}
                role="combobox"
                className="ms-cmd__input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder={placeholder}
                aria-label="Search commands"
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls={listId}
                aria-activedescendant={activeEntry ? optionId(activeEntry) : undefined}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div
              id={listId}
              role="listbox"
              aria-label="Commands"
              className="ms-cmd__list"
            >
              {renderResults()}
            </div>
            {footer && <div className="ms-cmd__footer">{footer}</div>}
          </RDialog.Content>
        </RDialog.Portal>
      </RDialog.Root>
    );
  },
);
