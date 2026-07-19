import * as react from 'react';

type ReducedMotionPreference = "always" | "never" | "user";
declare const ReducedMotionPreferenceContext: react.Context<ReducedMotionPreference>;

export { type ReducedMotionPreference, ReducedMotionPreferenceContext };
