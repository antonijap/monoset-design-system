import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ThemeProvider,
  ThemeToggle,
  useTheme,
  type ThemeStorage,
} from "../Theme";
import { stubMatchMedia } from "./helpers";

function ThemeState({ name = "theme" }: { name?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <button type="button" onClick={() => setTheme("dark")}>
      {name}:{theme}:{resolvedTheme}
    </button>
  );
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("data-monoset-theme");
  document.documentElement.classList.remove("monoset-dark", "existing-class");
  try {
    window.localStorage?.clear();
  } catch {
    // A test may intentionally replace the storage getter.
  }
});

describe("ThemeProvider", () => {
  it("renders explicit scope themes on the server and hydrates without a mismatch", async () => {
    const element = (
      <ThemeProvider initialTheme="dark" target="scope">
        <ThemeState />
      </ThemeProvider>
    );
    const html = renderToString(element);
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.append(container);
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(html).toContain('data-monoset-theme="dark"');
    expect(html).toContain("monoset-dark");
    const root = hydrateRoot(container, element);
    await act(async () => {});

    expect(consoleError).not.toHaveBeenCalled();
    await act(async () => root.unmount());
    container.remove();
  });

  it("starts system themes as light and resolves the browser preference after mount", async () => {
    const media = stubMatchMedia(true);
    const html = renderToString(
      <ThemeProvider target="scope"><ThemeState /></ThemeProvider>,
    );
    expect(html).toContain('data-monoset-theme="light"');

    render(<ThemeProvider target="scope"><ThemeState /></ThemeProvider>);
    expect(await screen.findByText("theme:system:dark")).toBeInTheDocument();
    media.restore();
  });

  it("ignores unavailable, invalid, and throwing storage", async () => {
    const getter = vi
      .spyOn(window, "localStorage", "get")
      .mockImplementation(() => {
        throw new Error("storage blocked");
      });
    render(<ThemeProvider initialTheme="light" target="scope"><ThemeState /></ThemeProvider>);
    expect(await screen.findByText("theme:light:light")).toBeInTheDocument();
    expect(getter).toHaveBeenCalled();
    getter.mockRestore();

    const invalid: ThemeStorage = {
      getItem: vi.fn(() => "sepia"),
      setItem: vi.fn(() => {
        throw new Error("quota");
      }),
    };
    render(
      <ThemeProvider initialTheme="light" target="scope" storage={invalid}>
        <ThemeState name="invalid" />
      </ThemeProvider>,
    );
    const control = await screen.findByText("invalid:light:light");
    expect(() => fireEvent.click(control)).not.toThrow();
    expect(await screen.findByText("invalid:dark:dark")).toBeInTheDocument();

    const throwingGet: ThemeStorage = {
      getItem: vi.fn(() => {
        throw new Error("blocked");
      }),
      setItem: vi.fn(),
    };
    render(
      <ThemeProvider initialTheme="light" target="scope" storage={throwingGet}>
        <ThemeState name="throwing" />
      </ThemeProvider>,
    );
    expect(await screen.findByText("throwing:light:light")).toBeInTheDocument();
    expect(throwingGet.getItem).toHaveBeenCalledWith("monoset-theme");
  });

  it("does not access persistence when storage is disabled", async () => {
    const getter = vi.spyOn(window, "localStorage", "get");
    render(
      <ThemeProvider storage={null} target="scope">
        <ThemeState />
      </ThemeProvider>,
    );
    fireEvent.click(await screen.findByRole("button"));
    expect(getter).not.toHaveBeenCalled();
  });

  it("restores the document theme exactly when it unmounts", async () => {
    document.documentElement.setAttribute("data-monoset-theme", "legacy");
    document.documentElement.classList.add("monoset-dark", "existing-class");
    const { unmount } = render(
      <ThemeProvider initialTheme="light" storage={null}>
        <ThemeState />
      </ThemeProvider>,
    );
    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "light");
    expect(document.documentElement).not.toHaveClass("monoset-dark");

    unmount();
    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "legacy");
    expect(document.documentElement).toHaveClass("monoset-dark", "existing-class");
  });

  it("keeps the top sibling owner active when an earlier owner unmounts", () => {
    document.documentElement.setAttribute("data-monoset-theme", "baseline");
    document.documentElement.classList.add("monoset-dark");
    function Fixture({ first }: { first: boolean }) {
      return (
        <>
          {first && (
            <ThemeProvider key="first" initialTheme="light" storage={null}>
              first
            </ThemeProvider>
          )}
          <ThemeProvider key="second" initialTheme="dark" storage={null}>
            second
          </ThemeProvider>
        </>
      );
    }
    const { rerender, unmount } = render(<Fixture first />);
    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "dark");

    rerender(<Fixture first={false} />);
    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "dark");
    expect(document.documentElement).toHaveClass("monoset-dark");

    unmount();
    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "baseline");
    expect(document.documentElement).toHaveClass("monoset-dark");
  });

  it("reveals the previous document owner when the top owner unmounts", () => {
    function Fixture({ top }: { top: boolean }) {
      return (
        <>
          <ThemeProvider initialTheme="light" storage={null}>
            first
          </ThemeProvider>
          {top && (
            <ThemeProvider initialTheme="dark" storage={null}>
              second
            </ThemeProvider>
          )}
        </>
      );
    }
    const { rerender } = render(<Fixture top />);
    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "dark");

    rerender(<Fixture top={false} />);
    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "light");
    expect(document.documentElement).not.toHaveClass("monoset-dark");
  });

  it("keeps ownership order when a non-top owner updates", () => {
    render(
      <>
        <ThemeProvider initialTheme="light" storage={null}>
          <ThemeState name="first" />
        </ThemeProvider>
        <ThemeProvider initialTheme="light" storage={null}>
          <ThemeState name="top" />
        </ThemeProvider>
      </>,
    );

    fireEvent.click(screen.getByText("first:light:light"));
    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "light");
    fireEvent.click(screen.getByText("top:light:light"));
    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "dark");
  });

  it("lets the innermost nested document provider own the theme", () => {
    const { unmount } = render(
      <ThemeProvider initialTheme="light" storage={null}>
        <ThemeProvider initialTheme="dark" storage={null}>
          nested
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "dark");
    expect(document.documentElement).toHaveClass("monoset-dark");
    unmount();
    expect(document.documentElement).not.toHaveAttribute("data-monoset-theme");
    expect(document.documentElement).not.toHaveClass("monoset-dark");
  });

  it("preserves the baseline through StrictMode effect replay", () => {
    document.documentElement.setAttribute("data-monoset-theme", "baseline");
    const { unmount } = render(
      <StrictMode>
        <ThemeProvider initialTheme="dark" storage={null}>
          strict
        </ThemeProvider>
      </StrictMode>,
    );

    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "dark");
    unmount();
    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "baseline");
    expect(document.documentElement).not.toHaveClass("monoset-dark");
  });

  it("keeps scoped providers independent and leaves the document untouched", () => {
    document.documentElement.setAttribute("data-monoset-theme", "outside");
    render(
      <>
        <ThemeProvider
          initialTheme="dark"
          storage={null}
          target="scope"
          scopeProps={{ className: "custom", "data-monoset-theme": "wrong", "data-testid": "dark" }}
        >
          dark
        </ThemeProvider>
        <ThemeProvider initialTheme="light" storage={null} target="scope" scopeProps={{ "data-testid": "light" }}>
          light
        </ThemeProvider>
      </>,
    );

    expect(screen.getByTestId("dark")).toHaveAttribute("data-monoset-theme", "dark");
    expect(screen.getByTestId("dark")).toHaveClass("custom", "monoset-dark");
    expect(screen.getByTestId("light")).toHaveAttribute("data-monoset-theme", "light");
    expect(screen.getByTestId("light")).not.toHaveClass("monoset-dark");
    expect(document.documentElement).toHaveAttribute("data-monoset-theme", "outside");
  });

  it("owns the reserved dark class in scoped mode", () => {
    render(
      <ThemeProvider
        initialTheme="light"
        storage={null}
        target="scope"
        scopeProps={{ className: "custom monoset-dark", "data-testid": "scope" }}
      >
        light
      </ThemeProvider>,
    );

    expect(screen.getByTestId("scope")).toHaveClass("custom");
    expect(screen.getByTestId("scope")).not.toHaveClass("monoset-dark");
  });

  it("tracks live system changes", async () => {
    const media = stubMatchMedia(false);
    render(<ThemeProvider target="scope" storage={null}><ThemeState /></ThemeProvider>);
    expect(await screen.findByText("theme:system:light")).toBeInTheDocument();

    await act(async () => media.setMatches(true));
    expect(screen.getByText("theme:system:dark")).toBeInTheDocument();
    media.restore();
  });

  it("supports legacy media-query listeners and removes them", async () => {
    const original = Object.getOwnPropertyDescriptor(window, "matchMedia");
    let listener: ((event: MediaQueryListEvent) => void) | undefined;
    const addListener = vi.fn((next: (event: MediaQueryListEvent) => void) => {
      listener = next;
    });
    const removeListener = vi.fn();
    const query = {
      matches: false,
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addListener,
      removeListener,
      addEventListener: undefined,
      removeEventListener: undefined,
      dispatchEvent: () => true,
    } as unknown as MediaQueryList;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => query,
    });

    try {
      const { unmount } = render(
        <ThemeProvider target="scope" storage={null}>
          <ThemeState />
        </ThemeProvider>,
      );
      expect(addListener).toHaveBeenCalledOnce();
      await act(async () => {
        listener?.({ matches: true } as MediaQueryListEvent);
      });
      expect(screen.getByText("theme:system:dark")).toBeInTheDocument();
      unmount();
      expect(removeListener).toHaveBeenCalledWith(listener);
    } finally {
      if (original) Object.defineProperty(window, "matchMedia", original);
      else delete (window as { matchMedia?: typeof window.matchMedia }).matchMedia;
    }
  });
});

describe("ThemeToggle", () => {
  it("updates internally before invoking the consumer click and forwards native props", () => {
    const observed: string[] = [];
    const ref = createRef<HTMLButtonElement>();
    const storage: ThemeStorage = {
      getItem: () => null,
      setItem: () => observed.push("storage"),
    };
    function ToggleFixture() {
      return (
        <ThemeToggle
          ref={ref}
          data-testid="toggle"
          onClick={() => observed.push("consumer")}
        />
      );
    }
    render(
      <ThemeProvider initialTheme="light" storage={storage} target="scope">
        <ToggleFixture />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByTestId("toggle"));
    expect(observed).toEqual(["storage", "consumer"]);
    expect(screen.getByTestId("toggle")).toHaveAccessibleName("Switch to system mode");
    expect(ref.current).toBe(screen.getByTestId("toggle"));
    expect(ref.current).toHaveAttribute("type", "button");
  });
});
