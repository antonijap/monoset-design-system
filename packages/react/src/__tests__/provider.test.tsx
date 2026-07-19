import { act, fireEvent, render, screen } from "@testing-library/react";
import { useReducedMotionConfig } from "framer-motion";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  MonosetProvider,
  useMonosetPortalContainer,
} from "../MonosetProvider";
import { Toast } from "../Toast";
import { Tooltip } from "../Tooltip";

function PortalValue({ name }: { name: string }) {
  const container = useMonosetPortalContainer();
  return <output data-testid={name}>{container?.id ?? "default"}</output>;
}

function MotionValue() {
  return <output data-testid="motion">{String(useReducedMotionConfig())}</output>;
}

afterEach(() => {
  vi.useRealTimers();
  document.documentElement.removeAttribute("data-monoset-theme");
  document.documentElement.classList.remove("monoset-dark");
});

describe("MonosetProvider", () => {
  it("applies theme and motion configuration", () => {
    render(
      <MonosetProvider
        theme={{ initialTheme: "dark", target: "scope", storage: null, scopeProps: { "data-testid": "theme" } }}
        motion={{ reducedMotion: "always" }}
      >
        <MotionValue />
      </MonosetProvider>,
    );

    expect(screen.getByTestId("theme")).toHaveAttribute("data-monoset-theme", "dark");
    expect(screen.getByTestId("motion")).toHaveTextContent("true");
  });

  it("does not mutate the document when theme is omitted or false", () => {
    const first = render(<MonosetProvider>default</MonosetProvider>);
    expect(document.documentElement).not.toHaveAttribute("data-monoset-theme");
    first.unmount();
    render(<MonosetProvider theme={false}>disabled</MonosetProvider>);
    expect(document.documentElement).not.toHaveAttribute("data-monoset-theme");
  });

  it("keeps one nested infrastructure", () => {
    const { container } = render(
      <MonosetProvider tooltip={{ delayDuration: 17 }} toast={{ duration: 23, swipeDirection: "left" }}>
        <MonosetProvider>
          nested
        </MonosetProvider>
      </MonosetProvider>,
    );
    expect(container.querySelectorAll(".ms-toast-viewport")).toHaveLength(1);
  });

  it("keeps the first enabled ancestor's tooltip configuration", async () => {
    vi.useFakeTimers();
    render(
      <MonosetProvider tooltip={{ delayDuration: 500 }} toast={false}>
        <MonosetProvider tooltip={{ delayDuration: 0 }} toast={false}>
          <Tooltip content="Ancestor delay">
            <button type="button">Nested info</button>
          </Tooltip>
        </MonosetProvider>
      </MonosetProvider>,
    );
    fireEvent.pointerMove(screen.getByRole("button", { name: "Nested info" }), {
      pointerType: "mouse",
    });

    await act(async () => vi.advanceTimersByTime(499));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    await act(async () => vi.advanceTimersByTime(1));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Ancestor delay");
  });

  it("forwards tooltip delay configuration", async () => {
    vi.useFakeTimers();
    render(
      <MonosetProvider tooltip={{ delayDuration: 500 }} toast={false}>
        <Tooltip content="Delayed help">
          <button type="button">Info</button>
        </Tooltip>
      </MonosetProvider>,
    );
    fireEvent.pointerMove(screen.getByRole("button", { name: "Info" }), {
      pointerType: "mouse",
    });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await act(async () => vi.advanceTimersByTime(499));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    await act(async () => vi.advanceTimersByTime(1));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Delayed help");
  });

  it("forwards toast duration configuration", async () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    render(
      <MonosetProvider tooltip={false} toast={{ duration: 500 }}>
        <Toast defaultOpen onOpenChange={onOpenChange}>Saved</Toast>
      </MonosetProvider>,
    );

    await act(async () => vi.advanceTimersByTime(499));
    expect(onOpenChange).not.toHaveBeenCalled();
    await act(async () => vi.advanceTimersByTime(1));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("allows a child to enable infrastructure disabled by its parent", () => {
    const { container } = render(
      <MonosetProvider tooltip={false} toast={false}>
        <MonosetProvider>nested</MonosetProvider>
      </MonosetProvider>,
    );
    expect(container.querySelectorAll(".ms-toast-viewport")).toHaveLength(1);
  });

  it("does not let nested false disable active ancestor infrastructure", () => {
    const { container } = render(
      <MonosetProvider>
        <MonosetProvider tooltip={false} toast={false}>
          nested
        </MonosetProvider>
      </MonosetProvider>,
    );
    expect(container.querySelectorAll(".ms-toast-viewport")).toHaveLength(1);
  });

  it("can disable infrastructure for a standalone provider", () => {
    const { container } = render(
      <MonosetProvider tooltip={false} toast={false} motion={false}>
        bare
      </MonosetProvider>,
    );
    expect(container.querySelector(".ms-toast-viewport")).not.toBeInTheDocument();
  });

  it("inherits, overrides, and resets portal containers", () => {
    const outer = document.createElement("div");
    outer.id = "outer";
    const inner = document.createElement("div");
    inner.id = "inner";
    render(
      <MonosetProvider portal={{ container: outer }}>
        <PortalValue name="outer" />
        <MonosetProvider>
          <PortalValue name="inherited" />
        </MonosetProvider>
        <MonosetProvider portal={{ container: inner }}>
          <PortalValue name="overridden" />
        </MonosetProvider>
        <MonosetProvider portal={false}>
          <PortalValue name="reset" />
        </MonosetProvider>
      </MonosetProvider>,
    );

    expect(screen.getByTestId("outer")).toHaveTextContent("outer");
    expect(screen.getByTestId("inherited")).toHaveTextContent("outer");
    expect(screen.getByTestId("overridden")).toHaveTextContent("inner");
    expect(screen.getByTestId("reset")).toHaveTextContent("default");
  });

  it("portals tooltip content into the configured container", async () => {
    const portalContainer = document.createElement("div");
    document.body.append(portalContainer);
    let unmount = () => {};
    try {
      ({ unmount } = render(
        <MonosetProvider
          portal={{ container: portalContainer }}
          tooltip={{ delayDuration: 0 }}
          toast={false}
        >
          <Tooltip content="Portalled help">
            <button type="button">Portal info</button>
          </Tooltip>
        </MonosetProvider>,
      ));
      fireEvent.pointerMove(screen.getByRole("button", { name: "Portal info" }), {
        pointerType: "mouse",
      });

      const tooltip = await screen.findByRole("tooltip");
      expect(portalContainer).toContainElement(tooltip);
    } finally {
      unmount();
      portalContainer.remove();
    }
  });
});
