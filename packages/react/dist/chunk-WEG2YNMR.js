import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Table.tsx
import {
  forwardRef,
  useEffect,
  useRef
} from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Table = forwardRef(
  function Table2({ className, children, maxHeight, wrapperClassName, ...rest }, ref) {
    const style = maxHeight !== void 0 ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight } : void 0;
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cx(
          "ms-table-wrapper",
          maxHeight !== void 0 && "ms-table-wrapper--scroll",
          wrapperClassName
        ),
        style,
        children: /* @__PURE__ */ jsx("table", { ref, className: cx("ms-table", className), ...rest, children })
      }
    );
  }
);
function SortIcon({ direction }) {
  if (direction === "asc") {
    return /* @__PURE__ */ jsx(ChevronUp, { size: 14, strokeWidth: 2, "aria-hidden": "true" });
  }
  if (direction === "desc") {
    return /* @__PURE__ */ jsx(ChevronDown, { size: 14, strokeWidth: 2, "aria-hidden": "true" });
  }
  return /* @__PURE__ */ jsx(
    ChevronsUpDown,
    {
      size: 14,
      strokeWidth: 2,
      className: "ms-table-header__sort-neutral",
      "aria-hidden": "true"
    }
  );
}
var TableHeader = forwardRef(
  function TableHeader2({ sortable, sortDirection, onSort, className, children, ...rest }, ref) {
    const ariaSort = !sortable ? void 0 : sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : sortable ? "none" : void 0;
    return /* @__PURE__ */ jsx(
      "th",
      {
        ...rest,
        ref,
        className: cx(
          "ms-table-header",
          sortable && "ms-table-header--sortable",
          className
        ),
        "aria-sort": ariaSort,
        children: sortable ? /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "ms-table-header__sort-button",
            onClick: onSort,
            disabled: !onSort,
            children: [
              /* @__PURE__ */ jsx("span", { className: "ms-table-header__label", children }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cx(
                    "ms-table-header__sort",
                    sortDirection != null && "ms-table-header__sort--active"
                  ),
                  children: /* @__PURE__ */ jsx(SortIcon, { direction: sortDirection })
                }
              )
            ]
          }
        ) : children
      }
    );
  }
);
function TableSelectAll({
  checked,
  indeterminate,
  onChange,
  label = "Select all rows"
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);
  return /* @__PURE__ */ jsx("th", { className: "ms-table-select", children: /* @__PURE__ */ jsx(
    "input",
    {
      ref: inputRef,
      type: "checkbox",
      checked,
      onChange: (e) => onChange(e.target.checked),
      "aria-label": label
    }
  ) });
}
function TableSelectRow({
  checked,
  onChange,
  label = "Select row"
}) {
  return /* @__PURE__ */ jsx("td", { className: "ms-table-select", children: /* @__PURE__ */ jsx(
    "input",
    {
      type: "checkbox",
      checked,
      onChange: (e) => onChange(e.target.checked),
      "aria-label": label
    }
  ) });
}

export {
  Table,
  TableHeader,
  TableSelectAll,
  TableSelectRow
};
//# sourceMappingURL=chunk-WEG2YNMR.js.map