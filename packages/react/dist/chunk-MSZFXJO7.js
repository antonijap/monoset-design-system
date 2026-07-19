import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Pagination.tsx
import {
  forwardRef
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}
function normalizePageCount(pageCount) {
  return Number.isFinite(pageCount) ? Math.max(0, Math.floor(pageCount)) : 0;
}
function normalizePage(page, pageCount) {
  const integerPage = Number.isFinite(page) ? Math.floor(page) : 1;
  return Math.min(Math.max(integerPage, 1), pageCount);
}
function normalizeSiblings(siblings) {
  return Number.isFinite(siblings) ? Math.max(0, Math.floor(siblings)) : 1;
}
var Pagination = forwardRef(function Pagination2({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  prevLabel = /* @__PURE__ */ jsx(ChevronLeft, { size: 16, strokeWidth: 2, "aria-hidden": true }),
  nextLabel = /* @__PURE__ */ jsx(ChevronRight, { size: 16, strokeWidth: 2, "aria-hidden": true }),
  className,
  "aria-label": ariaLabel = "Pagination",
  ...rest
}, ref) {
  const normalizedPageCount = normalizePageCount(pageCount);
  if (normalizedPageCount <= 1) return null;
  const normalizedPage = normalizePage(page, normalizedPageCount);
  const normalizedSiblings = normalizeSiblings(siblings);
  const first = 1;
  const last = normalizedPageCount;
  const start = Math.max(normalizedPage - normalizedSiblings, first + 1);
  const end = Math.min(normalizedPage + normalizedSiblings, last - 1);
  const pages = [first];
  if (start > first + 1) pages.push("\u2026");
  pages.push(...range(start, end));
  if (end < last - 1) pages.push("\u2026");
  if (last > first) pages.push(last);
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      ...rest,
      ref,
      "aria-label": ariaLabel,
      className: cx("ms-pagination", className),
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "ms-pagination__btn",
            "aria-label": "Previous page",
            disabled: normalizedPage <= 1,
            onClick: () => onPageChange(normalizedPage - 1),
            children: prevLabel
          }
        ),
        pages.map(
          (p, i) => p === "\u2026" ? /* @__PURE__ */ jsx("span", { className: "ms-pagination__btn", "aria-hidden": true, children: "\u2026" }, `e-${i}`) : /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "ms-pagination__btn",
              "aria-current": p === normalizedPage ? "page" : void 0,
              "aria-label": `Page ${p}`,
              onClick: () => onPageChange(p),
              children: p
            },
            p
          )
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "ms-pagination__btn",
            "aria-label": "Next page",
            disabled: normalizedPage >= normalizedPageCount,
            onClick: () => onPageChange(normalizedPage + 1),
            children: nextLabel
          }
        )
      ]
    }
  );
});

export {
  Pagination
};
//# sourceMappingURL=chunk-MSZFXJO7.js.map