// Silent no-op sink for events fired before PostHog finishes loading.
// Separated to its own file so analytics.js reads cleanly.
export function track() {}
