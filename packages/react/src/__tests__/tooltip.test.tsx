import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MonosetProvider, Tooltip, TooltipProvider } from "../index";

afterEach(() => {
  vi.useRealTimers();
});

function HelpTooltip(props: Partial<React.ComponentProps<typeof Tooltip>> = {}) {
  return (
    <Tooltip content="Helpful context" {...props}>
      <button type="button">More information</button>
    </Tooltip>
  );
}

describe("Tooltip", () => {
  it("opens from pointer hover and closes when the pointer leaves", async () => {
    render(
      <TooltipProvider delayDuration={0}>
        <HelpTooltip disableHoverableContent />
      </TooltipProvider>,
    );
    const trigger = screen.getByRole("button", { name: "More information" });

    fireEvent.pointerMove(trigger, { pointerType: "mouse" });
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Helpful context");
    const content = document.querySelector<HTMLElement>(".ms-tooltip")!;
    fireEvent.pointerLeave(trigger, { pointerType: "mouse" });
    expect(content).toHaveAttribute("data-state", "closed");
  });

  it("opens from keyboard focus and Escape closes without moving focus", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <HelpTooltip />
      </TooltipProvider>,
    );
    const trigger = screen.getByRole("button", { name: "More information" });

    await user.tab();
    expect(trigger).toHaveFocus();
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("forwards controlled Root state and its change callback", async () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <TooltipProvider delayDuration={0}>
        <HelpTooltip open={false} onOpenChange={onOpenChange} delayDuration={0} />
      </TooltipProvider>,
    );
    const trigger = screen.getByRole("button", { name: "More information" });

    fireEvent.pointerMove(trigger, { pointerType: "mouse" });
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    rerender(
      <TooltipProvider delayDuration={0}>
        <HelpTooltip open onOpenChange={onOpenChange} delayDuration={0} />
      </TooltipProvider>,
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent("Helpful context");
  });

  it("forwards content placement, class, native props, and handlers", () => {
    const onPointerDown = vi.fn();
    render(
      <TooltipProvider delayDuration={0}>
        <HelpTooltip
          defaultOpen
          side="left"
          sideOffset={12}
          align="end"
          className="account-help"
          contentProps={{
            avoidCollisions: false,
            "data-owner": "account",
            onPointerDown,
          }}
        />
      </TooltipProvider>,
    );

    const content = document.querySelector<HTMLElement>(".ms-tooltip")!;
    expect(content).toHaveClass("ms-tooltip", "account-help");
    expect(content).toHaveAttribute("data-side", "left");
    expect(content).toHaveAttribute("data-align", "end");
    expect(content).toHaveAttribute("data-owner", "account");
    fireEvent.pointerDown(content);
    expect(onPointerDown).toHaveBeenCalledOnce();
  });

  it("preserves the single trigger element and its own handler", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip content={<strong>Formatting is preserved</strong>} defaultOpen>
          <button type="button" className="original-trigger" onClick={onClick}>
            Details
          </button>
        </Tooltip>
      </TooltipProvider>,
    );

    const trigger = screen.getByRole("button", { name: "Details" });
    expect(trigger).toHaveClass("original-trigger");
    expect(document.querySelectorAll("button")).toHaveLength(1);
    expect(document.querySelector(".ms-tooltip > strong")).toHaveTextContent("Formatting is preserved");
    await user.click(trigger);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("uses the portal target from MonosetProvider", async () => {
    const portal = document.createElement("div");
    document.body.append(portal);
    const { unmount } = render(
      <MonosetProvider
        portal={{ container: portal }}
        tooltip={{ delayDuration: 0 }}
        toast={false}
        theme={false}
        motion={false}
      >
        <HelpTooltip />
      </MonosetProvider>,
    );

    try {
      fireEvent.pointerMove(screen.getByRole("button", { name: "More information" }), {
        pointerType: "mouse",
      });
      const tooltip = await screen.findByRole("tooltip");
      expect(portal).toContainElement(tooltip);
    } finally {
      unmount();
      portal.remove();
    }
  });

  it("honors provider and per-tooltip delay values", async () => {
    vi.useFakeTimers();
    const first = render(
      <TooltipProvider delayDuration={500}>
        <HelpTooltip />
      </TooltipProvider>,
    );

    fireEvent.pointerMove(screen.getByRole("button", { name: "More information" }), {
      pointerType: "mouse",
    });
    await act(async () => vi.advanceTimersByTime(499));
    expect(screen.queryByText("Helpful context")).not.toBeInTheDocument();
    await act(async () => vi.advanceTimersByTime(1));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Helpful context");

    first.unmount();
    render(
      <TooltipProvider delayDuration={500}>
        <Tooltip content="Immediate" delayDuration={0}>
          <button type="button">Immediate information</button>
        </Tooltip>
      </TooltipProvider>,
    );
    fireEvent.pointerMove(screen.getByRole("button", { name: "Immediate information" }), {
      pointerType: "mouse",
    });
    await act(async () => vi.advanceTimersByTime(0));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Immediate");
  });

  it("has no detectable accessibility violations while closed or open", async () => {
    const { container } = render(
      <TooltipProvider delayDuration={0}>
        <HelpTooltip />
      </TooltipProvider>,
    );
    expect(await axe(container)).toHaveNoViolations();

    fireEvent.focus(screen.getByRole("button", { name: "More information" }));
    await screen.findByRole("tooltip");
    const content = document.querySelector<HTMLElement>(".ms-tooltip")!;
    expect(await axe(content, {
      rules: { region: { enabled: false } },
    })).toHaveNoViolations();
  });
});
