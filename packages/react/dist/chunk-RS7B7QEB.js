// src/PortalContext.tsx
import { createContext, useContext } from "react";
var MonosetPortalContext = createContext(null);
function useMonosetPortalContainer() {
  return useContext(MonosetPortalContext);
}

export {
  MonosetPortalContext,
  useMonosetPortalContainer
};
//# sourceMappingURL=chunk-RS7B7QEB.js.map