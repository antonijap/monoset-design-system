import {
  cx
} from "./chunk-LW4KFLCO.js";

// src/Avatar.tsx
import * as RAvatar from "@radix-ui/react-avatar";
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function getInitials(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}
var Avatar = forwardRef(function Avatar2({ size = "md", name, initials, src, alt, decorative = false, className, ...rest }, ref) {
  const normalizedName = typeof name === "string" ? name.trim() : "";
  if (!decorative && !normalizedName) {
    throw new Error("Avatar requires a non-empty name unless decorative.");
  }
  const fallback = (initials?.trim() || getInitials(normalizedName)).slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxs(
    RAvatar.Root,
    {
      ...rest,
      ref,
      role: decorative ? void 0 : "img",
      "aria-label": decorative ? void 0 : alt?.trim() || normalizedName,
      "aria-hidden": decorative || void 0,
      className: cx("ms-avatar", `ms-avatar--${size}`, className),
      children: [
        src && /* @__PURE__ */ jsx(RAvatar.Image, { src, alt: "", "aria-hidden": true, className: "ms-avatar__img" }),
        /* @__PURE__ */ jsx(RAvatar.Fallback, { delayMs: src ? 200 : void 0, "aria-hidden": true, children: fallback })
      ]
    }
  );
});

export {
  Avatar
};
//# sourceMappingURL=chunk-RGO33G4F.js.map