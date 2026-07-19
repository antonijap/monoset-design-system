import {
  ThemeProvider
} from "./chunk-QLOWXPQE.js";
import {
  ToastProvider
} from "./chunk-25PCQU2E.js";
import {
  TooltipProvider
} from "./chunk-53I7ETZD.js";
import {
  MonosetPortalContext,
  useMonosetPortalContainer
} from "./chunk-RS7B7QEB.js";
import {
  ReducedMotionPreferenceContext
} from "./chunk-6R6U55G4.js";

// src/MonosetProvider.tsx
import {
  createContext,
  useContext,
  useMemo
} from "react";
import { MotionConfig } from "framer-motion";
import { jsx } from "react/jsx-runtime";
var InfrastructureContext = createContext({
  tooltip: false,
  toast: false
});
function MonosetProvider({
  children,
  theme,
  tooltip,
  toast,
  motion,
  portal
}) {
  const parentInfrastructure = useContext(InfrastructureContext);
  const parentPortal = useMonosetPortalContainer();
  const addTooltipProvider = tooltip !== false && !parentInfrastructure.tooltip;
  const addToastProvider = toast !== false && !parentInfrastructure.toast;
  const infrastructure = useMemo(
    () => ({
      tooltip: parentInfrastructure.tooltip || addTooltipProvider,
      toast: parentInfrastructure.toast || addToastProvider
    }),
    [addToastProvider, addTooltipProvider, parentInfrastructure]
  );
  const portalContainer = portal === void 0 ? parentPortal : portal === false ? null : portal.container;
  const reducedMotionPreference = motion && motion.reducedMotion ? motion.reducedMotion : "user";
  let content = /* @__PURE__ */ jsx(InfrastructureContext.Provider, { value: infrastructure, children: /* @__PURE__ */ jsx(MonosetPortalContext.Provider, { value: portalContainer, children }) });
  if (addToastProvider) {
    content = /* @__PURE__ */ jsx(ToastProvider, { ...toast || {}, children: content });
  }
  if (addTooltipProvider) {
    content = /* @__PURE__ */ jsx(TooltipProvider, { ...tooltip || {}, children: content });
  }
  if (motion !== false) {
    content = /* @__PURE__ */ jsx(ReducedMotionPreferenceContext.Provider, { value: reducedMotionPreference, children: /* @__PURE__ */ jsx(MotionConfig, { reducedMotion: "user", ...motion, children: content }) });
  }
  if (theme) {
    content = /* @__PURE__ */ jsx(ThemeProvider, { ...theme, children: content });
  }
  return content;
}

export {
  MonosetProvider
};
//# sourceMappingURL=chunk-ZWZKJTR2.js.map