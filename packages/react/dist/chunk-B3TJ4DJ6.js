import {
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/CommandPalette.tsx
import * as RDialog from "@radix-ui/react-dialog";
import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState
} from "react";
import { Search } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
function isGrouped(items) {
  return items.length > 0 && "items" in items[0];
}
function indexItems(items) {
  if (!isGrouped(items)) {
    return {
      entries: items.map((item, index2) => ({ item, index: index2 })),
      groups: null
    };
  }
  let index = 0;
  const groups = items.map((group, groupIndex) => ({
    heading: group.heading,
    groupIndex,
    entries: group.items.map((item) => ({ item, index: index++ }))
  }));
  return { entries: groups.flatMap((group) => group.entries), groups };
}
function defaultFilter(query, item) {
  const normalizedQuery = query.toLocaleLowerCase();
  return item.label.toLocaleLowerCase().includes(normalizedQuery) || !!item.description?.toLocaleLowerCase().includes(normalizedQuery) || !!item.keywords?.some(
    (keyword) => keyword.toLocaleLowerCase().includes(normalizedQuery)
  );
}
var CommandPalette = forwardRef(
  function CommandPalette2({
    open,
    onOpenChange,
    items = [],
    placeholder = "Search\u2026",
    emptyMessage = "No results.",
    filter = defaultFilter,
    footer,
    className
  }, ref) {
    const portalContainer = useMonosetPortalContainer();
    const instanceId = useId();
    const listId = `${instanceId}-listbox`;
    const inputRef = useRef(null);
    const returnFocusRef = useRef(null);
    const wasOpen = useRef(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(null);
    const indexed = useMemo(() => indexItems(items), [items]);
    const normalizedQuery = query.trim();
    const matches = (entry) => normalizedQuery.length === 0 || filter(normalizedQuery, entry.item);
    const filteredEntries = indexed.entries.filter(matches);
    const enabledEntries = filteredEntries.filter((entry) => !entry.item.disabled);
    const activeEntry = enabledEntries.find((entry) => entry.index === activeIndex) ?? enabledEntries[0] ?? null;
    const optionId = (entry) => `${instanceId}-option-${entry.index}`;
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
        `${instanceId}-option-${activeEntry.index}`
      );
      option?.scrollIntoView({ block: "nearest" });
    }, [activeEntry, instanceId]);
    const moveActive = (direction) => {
      if (enabledEntries.length === 0) return;
      const currentIndex = activeEntry ? enabledEntries.findIndex((entry) => entry.index === activeEntry.index) : -1;
      const nextIndex = currentIndex < 0 ? direction === 1 ? 0 : enabledEntries.length - 1 : (currentIndex + direction + enabledEntries.length) % enabledEntries.length;
      setActiveIndex(enabledEntries[nextIndex].index);
    };
    const select = (item) => {
      if (item.disabled) return;
      item.onSelect?.();
      onOpenChange(false);
    };
    const onInputKeyDown = (event) => {
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
    const renderItem = (entry) => {
      const { item } = entry;
      const active = entry.index === activeEntry?.index;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          id: optionId(entry),
          type: "button",
          role: "option",
          "aria-selected": active,
          "aria-disabled": item.disabled || void 0,
          disabled: item.disabled,
          "data-active": active ? "" : void 0,
          className: cx("ms-cmd__item", active && "ms-cmd__item--active"),
          onMouseEnter: () => {
            if (!item.disabled) setActiveIndex(entry.index);
          },
          onClick: () => select(item),
          tabIndex: -1,
          children: [
            item.icon && /* @__PURE__ */ jsx("span", { className: "ms-cmd__item-icon", children: item.icon }),
            /* @__PURE__ */ jsxs("span", { className: "ms-cmd__item-text", children: [
              /* @__PURE__ */ jsx("span", { className: "ms-cmd__item-label", children: item.label }),
              item.description && /* @__PURE__ */ jsx("span", { className: "ms-cmd__item-desc", children: item.description })
            ] })
          ]
        },
        `${entry.index}-${item.id}`
      );
    };
    const renderResults = () => {
      if (filteredEntries.length === 0) {
        return /* @__PURE__ */ jsx("div", { className: "ms-cmd__empty", children: emptyMessage });
      }
      if (!indexed.groups) return filteredEntries.map(renderItem);
      return indexed.groups.map((group) => {
        const visibleEntries = group.entries.filter(matches);
        if (visibleEntries.length === 0) return null;
        const headingId = `${instanceId}-group-${group.groupIndex}`;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            role: "group",
            "aria-label": group.heading ? void 0 : "Commands",
            "aria-labelledby": group.heading ? headingId : void 0,
            children: [
              group.heading && /* @__PURE__ */ jsx("div", { id: headingId, className: "ms-cmd__group-heading", children: group.heading }),
              visibleEntries.map(renderItem)
            ]
          },
          group.groupIndex
        );
      });
    };
    return /* @__PURE__ */ jsx(RDialog.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs(RDialog.Portal, { container: portalContainer ?? void 0, children: [
      /* @__PURE__ */ jsx(RDialog.Overlay, { className: "ms-cmd-scrim" }),
      /* @__PURE__ */ jsxs(
        RDialog.Content,
        {
          ref,
          className: cx("ms-cmd", className),
          "aria-label": "Command palette",
          "aria-describedby": void 0,
          onOpenAutoFocus: (event) => {
            event.preventDefault();
            const activeElement = document.activeElement;
            const content = inputRef.current?.closest(".ms-cmd");
            returnFocusRef.current = activeElement instanceof HTMLElement && activeElement !== document.body && !content?.contains(activeElement) ? activeElement : null;
            inputRef.current?.focus();
          },
          onCloseAutoFocus: (event) => {
            const returnFocusTo = returnFocusRef.current;
            returnFocusRef.current = null;
            if (!returnFocusTo?.isConnected) return;
            event.preventDefault();
            returnFocusTo.focus();
          },
          children: [
            /* @__PURE__ */ jsx(RDialog.Title, { className: "ms-sr-only", children: "Command palette" }),
            /* @__PURE__ */ jsxs("div", { className: "ms-cmd__input-wrap", children: [
              /* @__PURE__ */ jsx(
                Search,
                {
                  className: "ms-cmd__search-icon",
                  size: 16,
                  strokeWidth: 2,
                  "aria-hidden": true
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  role: "combobox",
                  className: "ms-cmd__input",
                  value: query,
                  onChange: (event) => setQuery(event.target.value),
                  onKeyDown: onInputKeyDown,
                  placeholder,
                  "aria-label": "Search commands",
                  "aria-autocomplete": "list",
                  "aria-expanded": open,
                  "aria-controls": listId,
                  "aria-activedescendant": activeEntry ? optionId(activeEntry) : void 0,
                  autoComplete: "off",
                  spellCheck: false
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                id: listId,
                role: "listbox",
                "aria-label": "Commands",
                className: "ms-cmd__list",
                children: renderResults()
              }
            ),
            footer && /* @__PURE__ */ jsx("div", { className: "ms-cmd__footer", children: footer })
          ]
        }
      )
    ] }) });
  }
);

export {
  CommandPalette
};
//# sourceMappingURL=chunk-B3TJ4DJ6.js.map