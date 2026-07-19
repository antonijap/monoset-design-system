import { createRef } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionConfig } from "framer-motion";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Breadcrumb } from "../Breadcrumb";
import { Pagination } from "../Pagination";
import { Stepper } from "../Stepper";
import { Tabs, TabsList, TabsTrigger } from "../Tabs";

const originalFontsDescriptor = Object.getOwnPropertyDescriptor(document, "fonts");

class ControlledResizeObserver {
  static instances: ControlledResizeObserver[] = [];

  readonly observed = new Set<Element>();
  readonly disconnect = vi.fn(() => this.observed.clear());

  constructor(private readonly callback: ResizeObserverCallback) {
    ControlledResizeObserver.instances.push(this);
  }

  observe = (target: Element) => {
    this.observed.add(target);
  };

  unobserve = (target: Element) => {
    this.observed.delete(target);
  };

  flush() {
    this.callback([], this as unknown as ResizeObserver);
  }
}

function setTabGeometry(element: HTMLElement, left: number, width: number) {
  Object.defineProperties(element, {
    offsetLeft: { configurable: true, value: left },
    offsetWidth: { configurable: true, value: width },
  });
}

function DynamicTabs({
  values,
  active,
}: {
  values: string[];
  active: string;
}) {
  return (
    <Tabs value={active}>
      <TabsList data-testid="tabs-list">
        {values.map((value) => (
          <TabsTrigger key={value} value={value}>
            {value.toUpperCase()}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

beforeEach(() => {
  ControlledResizeObserver.instances = [];
  vi.stubGlobal("ResizeObserver", ControlledResizeObserver);
});

afterEach(() => {
  if (originalFontsDescriptor) {
    Object.defineProperty(document, "fonts", originalFontsDescriptor);
  } else {
    Reflect.deleteProperty(document, "fonts");
  }
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Tabs", () => {
  it("forwards exact refs and props and honors shared reduced motion", async () => {
    const listRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const onPointerDown = vi.fn();

    render(
      <MotionConfig reducedMotion="always">
        <Tabs defaultValue="overview">
          <TabsList
            ref={listRef}
            className="custom-list"
            data-testid="tabs-list"
            onPointerDown={onPointerDown}
          >
            <TabsTrigger
              ref={triggerRef}
              className="custom-trigger"
              value="overview"
            >
              Overview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </MotionConfig>,
    );

    const list = screen.getByTestId("tabs-list");
    const trigger = screen.getByRole("tab", { name: "Overview" });
    setTabGeometry(trigger, 12, 84);
    act(() => ControlledResizeObserver.instances[0]!.flush());

    expect(listRef.current).toBe(list);
    expect(triggerRef.current).toBe(trigger);
    expect(list).toHaveClass("ms-tabs__list", "custom-list");
    expect(trigger).toHaveClass("ms-tabs__trigger", "custom-trigger");
    fireEvent.pointerDown(list);
    expect(onPointerDown).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(list.querySelector(".ms-tabs__indicator")).toHaveAttribute(
        "data-reduced-motion",
        "true",
      );
    });
  });

  it("tracks dynamically added, resized, and removed active triggers", async () => {
    const { rerender, unmount } = render(
      <MotionConfig reducedMotion="always">
        <DynamicTabs values={["a", "b"]} active="a" />
      </MotionConfig>,
    );
    const observer = ControlledResizeObserver.instances[0]!;
    const first = screen.getByRole("tab", { name: "A" });
    setTabGeometry(first, 4, 40);
    act(() => observer.flush());
    await waitFor(() => {
      expect(screen.getByTestId("tabs-list").querySelector(".ms-tabs__indicator"))
        .toHaveStyle({ left: "4px", width: "40px" });
    });

    rerender(
      <MotionConfig reducedMotion="always">
        <DynamicTabs values={["a", "b", "c"]} active="c" />
      </MotionConfig>,
    );
    const added = screen.getByRole("tab", { name: "C" });
    setTabGeometry(added, 96, 52);
    await waitFor(() => expect(observer.observed.has(added)).toBe(true));
    act(() => observer.flush());
    await waitFor(() => {
      expect(screen.getByTestId("tabs-list").querySelector(".ms-tabs__indicator"))
        .toHaveStyle({ left: "96px", width: "52px" });
    });

    setTabGeometry(added, 96, 68);
    act(() => observer.flush());
    await waitFor(() => {
      expect(screen.getByTestId("tabs-list").querySelector(".ms-tabs__indicator"))
        .toHaveStyle({ width: "68px" });
    });

    rerender(
      <MotionConfig reducedMotion="always">
        <DynamicTabs values={["a", "b"]} active="c" />
      </MotionConfig>,
    );
    await waitFor(() => {
      expect(
        screen.getByTestId("tabs-list").querySelector(".ms-tabs__indicator"),
      ).not.toBeInTheDocument();
    });

    unmount();
    expect(observer.disconnect).toHaveBeenCalledOnce();
  });

  it("remeasures after fonts finish loading without updating after cleanup", async () => {
    let resolveFonts = () => {};
    const fontsReady = new Promise<void>((resolve) => {
      resolveFonts = resolve;
    });
    Object.defineProperty(document, "fonts", {
      configurable: true,
      value: { ready: fontsReady },
    });
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const { unmount } = render(
      <MotionConfig reducedMotion="always">
        <DynamicTabs values={["font"]} active="font" />
      </MotionConfig>,
    );
    const trigger = screen.getByRole("tab", { name: "FONT" });
    setTabGeometry(trigger, 0, 60);

    await act(async () => resolveFonts());
    await waitFor(() => {
      expect(screen.getByTestId("tabs-list").querySelector(".ms-tabs__indicator"))
        .toHaveStyle({ width: "60px" });
    });

    unmount();
    resolveFonts();
    await Promise.resolve();
    expect(
      consoleError.mock.calls.some((call) =>
        call.some((value) => String(value).includes("unmounted component")),
      ),
    ).toBe(false);
  });
});

describe("Breadcrumb", () => {
  it("forwards the nav ref and native nav props", () => {
    const ref = createRef<HTMLElement>();
    const onClick = vi.fn();
    render(
      <Breadcrumb
        ref={ref}
        items={[{ label: "Home", href: "/" }, { label: "Library" }]}
        className="custom-breadcrumb"
        data-testid="breadcrumb"
        aria-describedby="breadcrumb-help"
        onClick={onClick}
      />,
    );

    const nav = screen.getByTestId("breadcrumb");
    expect(ref.current).toBe(nav);
    expect(nav.tagName).toBe("NAV");
    expect(nav).toHaveClass("ms-breadcrumb", "custom-breadcrumb");
    expect(nav).toHaveAttribute("aria-describedby", "breadcrumb-help");
    fireEvent.click(nav);
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("Pagination", () => {
  it("forwards the nav ref and native nav props", () => {
    const ref = createRef<HTMLElement>();
    const onPointerDown = vi.fn();
    render(
      <Pagination
        ref={ref}
        page={2}
        pageCount={4}
        onPageChange={() => {}}
        aria-label="Search pages"
        aria-describedby="pagination-help"
        className="custom-pagination"
        data-testid="pagination"
        onPointerDown={onPointerDown}
      />,
    );

    const nav = screen.getByTestId("pagination");
    expect(ref.current).toBe(nav);
    expect(nav.tagName).toBe("NAV");
    expect(nav).toHaveAccessibleName("Search pages");
    expect(nav).toHaveAttribute("aria-describedby", "pagination-help");
    expect(nav).toHaveClass("ms-pagination", "custom-pagination");
    fireEvent.pointerDown(nav);
    expect(onPointerDown).toHaveBeenCalledOnce();
  });

  it("normalizes fractional values and non-negative siblings", () => {
    render(
      <Pagination
        page={3.9}
        pageCount={5.8}
        siblings={-4}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.queryByRole("button", { name: "Page 2" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Page 4" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 5" })).toBeInTheDocument();
  });

  it("normalizes non-finite counts and pages", () => {
    const { rerender } = render(
      <Pagination page={Number.NaN} pageCount={Number.NaN} onPageChange={() => {}} />,
    );
    expect(screen.queryByRole("navigation", { name: "Pagination" }))
      .not.toBeInTheDocument();

    rerender(
      <Pagination page={Number.NaN} pageCount={4} onPageChange={() => {}} />,
    );
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("clamps invalid pages and never requests an out-of-range page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    const { rerender } = render(
      <Pagination page={-10} pageCount={5} onPageChange={onPageChange} />,
    );

    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenLastCalledWith(2);

    rerender(
      <Pagination page={99} pageCount={5} onPageChange={onPageChange} />,
    );
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onPageChange).toHaveBeenLastCalledWith(4);
    expect(onPageChange.mock.calls.flat()).toEqual(
      expect.arrayContaining([2, 4]),
    );
    expect(
      onPageChange.mock.calls.flat().every((value) => value >= 1 && value <= 5),
    ).toBe(true);
  });
});

describe("Stepper", () => {
  const steps = [
    { label: "Account" },
    { label: "Profile" },
    { label: "Finish" },
  ];

  it.each([
    [Number.NaN, "Account"],
    [-4, "Account"],
    [20, "Finish"],
    [1.9, "Profile"],
  ])("normalizes current %s to a coherent current step", (current, label) => {
    render(<Stepper steps={steps} current={current} />);

    const currentMarkers = document.querySelectorAll('[aria-current="step"]');
    expect(currentMarkers).toHaveLength(1);
    expect(currentMarkers[0]!.closest("li")).toHaveTextContent(label);
  });

  it("renders an empty list without inventing a current step", () => {
    render(<Stepper steps={[]} current={Number.NaN} data-testid="empty-stepper" />);

    expect(screen.getByTestId("empty-stepper").tagName).toBe("OL");
    expect(screen.getByTestId("empty-stepper").children).toHaveLength(0);
    expect(document.querySelector('[aria-current="step"]')).not.toBeInTheDocument();
  });
});
