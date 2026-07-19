import userEvent from "@testing-library/user-event";
import {
  render,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react";
import { type ReactElement, type ReactNode } from "react";
import { vi } from "vitest";
import {
  MonosetProvider,
  type MonosetProviderProps,
} from "../MonosetProvider";

export function setupUser() {
  return userEvent.setup();
}

interface MonosetRenderOptions extends Omit<RenderOptions, "wrapper"> {
  providerProps?: Omit<MonosetProviderProps, "children">;
}

export function renderWithMonoset(
  ui: ReactElement,
  { providerProps, ...options }: MonosetRenderOptions = {},
): RenderResult {
  function Wrapper({ children }: { children: ReactNode }) {
    return <MonosetProvider {...providerProps}>{children}</MonosetProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

export function createDeferred<T>(): Deferred<T> {
  let resolve!: Deferred<T>["resolve"];
  let reject!: Deferred<T>["reject"];
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });

  return { promise, resolve, reject };
}

type MatchMediaListener =
  | EventListenerOrEventListenerObject
  | ((event: MediaQueryListEvent) => void);

interface MatchMediaListState {
  media: string;
  listeners: Set<MatchMediaListener>;
  onchange: ((this: MediaQueryList, event: MediaQueryListEvent) => void) | null;
  list: MediaQueryList;
}

export interface MatchMediaController {
  matchMedia: ReturnType<typeof vi.fn<(query: string) => MediaQueryList>>;
  setMatches: (matches: boolean) => void;
  restore: () => void;
}

export function stubMatchMedia(initialMatches = false): MatchMediaController {
  let matches = initialMatches;
  const states = new Set<MatchMediaListState>();
  const originalDescriptor = Object.getOwnPropertyDescriptor(window, "matchMedia");

  const matchMedia = vi.fn((media: string): MediaQueryList => {
    const state = {} as MatchMediaListState;
    const list = {
      get matches() {
        return matches;
      },
      media,
      get onchange() {
        return state.onchange;
      },
      set onchange(listener) {
        state.onchange = listener;
      },
      addListener(listener: (event: MediaQueryListEvent) => void) {
        state.listeners.add(listener);
      },
      removeListener(listener: (event: MediaQueryListEvent) => void) {
        state.listeners.delete(listener);
      },
      addEventListener(_type: "change", listener: EventListenerOrEventListenerObject) {
        state.listeners.add(listener);
      },
      removeEventListener(_type: "change", listener: EventListenerOrEventListenerObject) {
        state.listeners.delete(listener);
      },
      dispatchEvent(event: Event) {
        if (event.type === "change") {
          state.onchange?.call(list, event as MediaQueryListEvent);
        }
        for (const listener of state.listeners) {
          if (typeof listener === "function") {
            (listener as (event: MediaQueryListEvent) => void).call(
              list,
              event as MediaQueryListEvent,
            );
          } else {
            listener.handleEvent(event);
          }
        }
        return true;
      },
    } as MediaQueryList;

    Object.assign(state, { media, listeners: new Set(), onchange: null, list });
    states.add(state);
    return list;
  });

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: matchMedia,
  });

  return {
    matchMedia,
    setMatches(nextMatches) {
      if (matches === nextMatches) return;
      matches = nextMatches;
      for (const state of states) {
        const event = Object.assign(new Event("change"), {
          matches,
          media: state.media,
        }) as MediaQueryListEvent;
        state.list.dispatchEvent(event);
      }
    },
    restore() {
      if (originalDescriptor) {
        Object.defineProperty(window, "matchMedia", originalDescriptor);
      } else {
        delete (window as { matchMedia?: typeof window.matchMedia }).matchMedia;
      }
    },
  };
}
