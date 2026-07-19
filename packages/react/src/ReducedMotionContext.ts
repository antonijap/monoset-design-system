import { createContext } from "react";

export type ReducedMotionPreference = "always" | "never" | "user";

export const ReducedMotionPreferenceContext =
  createContext<ReducedMotionPreference>("user");
