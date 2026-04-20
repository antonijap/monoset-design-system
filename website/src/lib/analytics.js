// Analytics loader.
//
// PostHog (EU region) is wired inside a requestIdleCallback so it never
// blocks first paint. The project API key is read from VITE_POSTHOG_KEY
// at build time — set it in your deploy platform's env vars. Without it,
// analytics is a silent no-op, which is what you want for forks and local
// dev.

import { track as noop } from "./_noop.js";  // fallback when PostHog not ready yet

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST =
  import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com";

let _initialized = false;
let _posthog = null;

/**
 * Kick PostHog on idle so it never blocks first paint.
 * Safe to call more than once — guarded by _initialized.
 */
export function initAnalytics() {
  if (_initialized || typeof window === "undefined") return;
  if (!POSTHOG_KEY) return;   // no key, no analytics, clean no-op
  _initialized = true;

  const schedule = window.requestIdleCallback
    ? (cb) => window.requestIdleCallback(cb, { timeout: 2000 })
    : (cb) => setTimeout(cb, 200);

  schedule(async () => {
    try {
      const { default: posthog } = await import("posthog-js");
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: "history_change",
        person_profiles: "identified_only",
        defaults: "2025-05-24",
      });
      _posthog = posthog;
      window.__monoset_analytics__ = posthog;
    } catch (err) {
      // Don't crash the app if PostHog fails to load (ad-blocker, offline, etc.)
      if (import.meta.env.DEV) console.warn("[analytics] PostHog load failed", err);
    }
  });
}

/**
 * Fire an analytics event. Safe to call before PostHog has loaded.
 * @param {string} event
 * @param {Record<string, unknown>} [props]
 */
export function track(event, props) {
  if (_posthog && typeof _posthog.capture === "function") {
    _posthog.capture(event, props);
  } else {
    // Quietly drop events before PostHog is ready. They'd be a tiny minority
    // (only events in the first ~1 RIC tick) and queueing them would mean
    // importing posthog-js's queue shape here. Not worth it.
    noop(event, props);
  }
}

/**
 * Identify the current user. Call after login/signup.
 * @param {string} distinctId
 * @param {Record<string, unknown>} [props]
 */
export function identify(distinctId, props) {
  if (_posthog && typeof _posthog.identify === "function") {
    _posthog.identify(distinctId, props);
  }
}
