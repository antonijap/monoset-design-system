import { createContext, useContext } from "react";

export const MonosetPortalContext = createContext<HTMLElement | null>(null);

export function useMonosetPortalContainer(): HTMLElement | null {
  return useContext(MonosetPortalContext);
}
