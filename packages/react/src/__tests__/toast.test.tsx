import { createRef, forwardRef, useImperativeHandle } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionConfig } from "framer-motion";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  Toast,
  ToastProvider,
  useToast,
  type ToastApi,
  type ToastProviderProps,
} from "../Toast";

const CaptureToastApi = forwardRef<ToastApi>(function CaptureToastApi(_, ref) {
  const toastApi = useToast();
  useImperativeHandle(ref, () => toastApi, [toastApi]);
  return null;
});

function renderToastQueue(
  providerProps: Omit<ToastProviderProps, "children"> = {},
) {
  const apiRef = createRef<ToastApi>();
  render(
    <ToastProvider {...providerProps}>
      <CaptureToastApi ref={apiRef} />
    </ToastProvider>,
  );
  return apiRef;
}

function getToast(message: string) {
  const root = document.querySelector<HTMLElement>(".ms-toast");
  expect(root).not.toBeNull();
  expect(within(root!).getByText(message)).toBeInTheDocument();
  return root!;
}

afterEach(() => {
  vi.useRealTimers();
});

describe("Toast queue API", () => {
  it("queues notifications and returns stable ids", () => {
    const api = renderToastQueue();

    let firstId = 0;
    let secondId = 0;
    act(() => {
      firstId = api.current!.toast({ title: "Saved" });
      secondId = api.current!.toast({ title: "Published" });
    });

    expect(firstId).toBeGreaterThan(0);
    expect(secondId).toBeGreaterThan(firstId);
    expect(document.querySelectorAll(".ms-toast")).toHaveLength(2);
    expect(screen.getAllByText("Saved").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Published").length).toBeGreaterThan(0);
  });

  it("dismisses a queued notification by id", () => {
    const api = renderToastQueue();

    let id = 0;
    act(() => {
      id = api.current!.toast({ title: "Archived" });
    });
    expect(getToast("Archived")).toBeInTheDocument();

    act(() => api.current!.dismiss(id));
    expect(document.querySelector(".ms-toast")).not.toBeInTheDocument();
  });

  it("uses provider duration and allows per-toast duration overrides", () => {
    vi.useFakeTimers();
    const api = renderToastQueue({ duration: 800 });

    act(() => {
      api.current!.toast({ title: "Provider duration" });
      api.current!.toast({ title: "Custom duration", duration: 300 });
    });

    act(() => vi.advanceTimersByTime(299));
    expect(document.querySelectorAll(".ms-toast")).toHaveLength(2);
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryAllByText("Custom duration")).toHaveLength(0);
    expect(screen.getAllByText("Provider duration").length).toBeGreaterThan(0);
    act(() => vi.advanceTimersByTime(500));
    expect(document.querySelectorAll(".ms-toast")).toHaveLength(0);
  });

  it("pauses duration while the viewport is being interacted with", () => {
    vi.useFakeTimers();
    const onPause = vi.fn();
    const onResume = vi.fn();
    const api = renderToastQueue({ duration: 500 });

    act(() => {
      api.current!.toast({ title: "Paused", onPause, onResume });
    });
    act(() => vi.advanceTimersByTime(200));

    const viewportRegion = screen.getByRole("region", {
      name: /notifications/i,
    });
    fireEvent.pointerMove(viewportRegion);
    expect(onPause).toHaveBeenCalledOnce();
    act(() => vi.advanceTimersByTime(1000));
    expect(getToast("Paused")).toBeInTheDocument();

    fireEvent.pointerLeave(viewportRegion);
    expect(onResume).toHaveBeenCalledOnce();
    act(() => vi.advanceTimersByTime(299));
    expect(getToast("Paused")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(document.querySelector(".ms-toast")).not.toBeInTheDocument();
  });

  it("uses semantic urgency for variants", async () => {
    const api = renderToastQueue();

    act(() => {
      api.current!.toast({ title: "Could not save", kind: "error" });
    });
    expect(getToast("Could not save")).toHaveAttribute("data-kind", "error");
    await waitFor(() => {
      expect(
        Array.from(document.querySelectorAll('[aria-live="assertive"]')).some(
          (node) => node.textContent?.includes("Could not save"),
        ),
      ).toBe(true);
    });

    act(() => {
      api.current!.toast({ title: "Synced", kind: "success" });
    });
    const roots = document.querySelectorAll<HTMLElement>(".ms-toast");
    expect(roots[1]).toHaveAttribute("data-kind", "success");
    await waitFor(() => {
      expect(
        Array.from(document.querySelectorAll('[aria-live="polite"]')).some(
          (node) => node.textContent?.includes("Synced"),
        ),
      ).toBe(true);
    });
  });

  it("uses consumer-supplied action alternative text and dismisses after action", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    const api = renderToastQueue();

    act(() => {
      api.current!.toast({
        title: "Archived",
        action: "Undo",
        actionAltText: "Undo archiving the item",
        onAction,
      });
    });

    const action = screen.getByRole("button", { name: "Undo" });
    expect(action).toHaveAttribute(
      "data-radix-toast-announce-alt",
      "Undo archiving the item",
    );
    await user.click(action);
    expect(onAction).toHaveBeenCalledOnce();
    expect(document.querySelector(".ms-toast")).not.toBeInTheDocument();
  });
});

describe("declarative Toast", () => {
  it("forwards its ref, class, handlers, and root props", () => {
    const ref = createRef<HTMLLIElement>();
    const onPointerDown = vi.fn();
    render(
      <ToastProvider>
        <Toast
          ref={ref}
          defaultOpen
          title="Draft saved"
          kind="success"
          className="custom-toast"
          data-testid="declarative-toast"
          onPointerDown={onPointerDown}
        >
          You can keep editing.
        </Toast>
      </ToastProvider>,
    );

    const root = screen.getByTestId("declarative-toast");
    expect(ref.current).toBe(root);
    expect(root).toHaveClass("ms-toast", "custom-toast");
    expect(root).toHaveAttribute("data-kind", "success");
    fireEvent.pointerDown(root);
    expect(onPointerDown).toHaveBeenCalledOnce();
  });

  it("renders a close control with a customizable accessible label", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <ToastProvider>
        <Toast
          defaultOpen
          title="Import complete"
          closeLabel="Dismiss import notification"
          onOpenChange={onOpenChange}
        />
      </ToastProvider>,
    );

    await user.click(
      screen.getByRole("button", { name: "Dismiss import notification" }),
    );
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("disables animation through the shared reduced-motion configuration", () => {
    render(
      <MotionConfig reducedMotion="always">
        <ToastProvider>
          <Toast
            defaultOpen
            title="No motion"
            data-testid="reduced-toast"
            style={{ color: "rgb(1, 2, 3)" }}
          />
        </ToastProvider>
      </MotionConfig>,
    );

    expect(screen.getByTestId("reduced-toast")).toHaveAttribute(
      "data-reduced-motion",
      "true",
    );
    expect(screen.getByTestId("reduced-toast")).toHaveStyle({
      animation: "none",
      color: "rgb(1, 2, 3)",
    });
  });
});
