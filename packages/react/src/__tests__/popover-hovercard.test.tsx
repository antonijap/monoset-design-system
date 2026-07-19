import { createRef } from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../HoverCard";
import { MonosetProvider } from "../MonosetProvider";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../Popover";

describe("Popover", () => {
  it("forwards the content ref and props to the Radix content element", () => {
    const ref = createRef<HTMLDivElement>();
    const onPointerDown = vi.fn();

    render(
      <Popover open>
        <PopoverTrigger>Account</PopoverTrigger>
        <PopoverContent
          ref={ref}
          className="account-popover"
          data-testid="account-content"
          side="top"
          align="start"
          avoidCollisions={false}
          onPointerDown={onPointerDown}
        >
          Account settings
        </PopoverContent>
      </Popover>,
    );

    const content = screen.getByTestId("account-content");
    expect(ref.current).toBe(content);
    expect(content).toHaveClass("ms-popover", "account-popover");
    expect(content).toHaveAttribute("data-side", "top");
    expect(content).toHaveAttribute("data-align", "start");
    fireEvent.pointerDown(content);
    expect(onPointerDown).toHaveBeenCalledOnce();
  });

  it("uses the portal target from MonosetProvider", () => {
    const portal = document.createElement("div");
    document.body.append(portal);

    try {
      render(
        <MonosetProvider
          portal={{ container: portal }}
          tooltip={false}
          toast={false}
          motion={false}
        >
          <Popover open>
            <PopoverTrigger>Help</PopoverTrigger>
            <PopoverContent>Portalled popover</PopoverContent>
          </Popover>
        </MonosetProvider>,
      );

      expect(within(portal).getByRole("dialog")).toHaveTextContent(
        "Portalled popover",
      );
    } finally {
      portal.remove();
    }
  });

  it("keeps controlled state, Escape dismissal, and trigger focus return", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    function ControlledPopover() {
      return (
        <Popover open onOpenChange={onOpenChange}>
          <PopoverTrigger>Open profile</PopoverTrigger>
          <PopoverContent>
            Profile details
            <PopoverClose>Close profile</PopoverClose>
          </PopoverContent>
        </Popover>
      );
    }

    render(<ControlledPopover />);
    const trigger = screen.getByRole("button", { name: "Open profile" });
    await user.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(trigger).toHaveFocus();
  });

  it("keeps the default offset and allows an override", async () => {
    render(
      <>
        <Popover open>
          <PopoverTrigger>Default offset</PopoverTrigger>
          <PopoverContent data-testid="default-offset">Default</PopoverContent>
        </Popover>
        <Popover open>
          <PopoverTrigger>Custom offset</PopoverTrigger>
          <PopoverContent data-testid="custom-offset" sideOffset={18}>
            Custom
          </PopoverContent>
        </Popover>
      </>,
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const defaultWrapper = screen.getByTestId("default-offset").parentElement;
    const customWrapper = screen.getByTestId("custom-offset").parentElement;
    expect(defaultWrapper).not.toBeNull();
    expect(customWrapper).not.toBeNull();

    await vi.waitFor(() => {
      expect(defaultWrapper?.getAttribute("style")).not.toBe(
        customWrapper?.getAttribute("style"),
      );
    });
  });

  it("has no detectable accessibility violations", async () => {
    render(
      <Popover open>
        <PopoverTrigger>Open help</PopoverTrigger>
        <PopoverContent aria-label="Help details">
          Keyboard help
        </PopoverContent>
      </Popover>,
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(await axe(document.body)).toHaveNoViolations();
  });
});

describe("HoverCard", () => {
  it("forwards the content ref and props to the Radix content element", () => {
    const ref = createRef<HTMLDivElement>();
    const onPointerDown = vi.fn();

    render(
      <HoverCard open>
        <HoverCardTrigger href="/team/ada">Ada</HoverCardTrigger>
        <HoverCardContent
          ref={ref}
          className="profile-card"
          data-testid="profile-content"
          side="top"
          align="start"
          avoidCollisions={false}
          onPointerDown={onPointerDown}
        >
          Ada's profile
        </HoverCardContent>
      </HoverCard>,
    );

    const content = screen.getByTestId("profile-content");
    expect(ref.current).toBe(content);
    expect(content).toHaveClass("ms-hovercard", "profile-card");
    expect(content).toHaveAttribute("data-side", "top");
    expect(content).toHaveAttribute("data-align", "start");
    fireEvent.pointerDown(content);
    expect(onPointerDown).toHaveBeenCalledOnce();
  });

  it("uses the portal target from MonosetProvider", () => {
    const portal = document.createElement("div");
    document.body.append(portal);

    try {
      render(
        <MonosetProvider
          portal={{ container: portal }}
          tooltip={false}
          toast={false}
          motion={false}
        >
          <HoverCard open>
            <HoverCardTrigger href="/team/grace">Grace</HoverCardTrigger>
            <HoverCardContent data-testid="portalled-hovercard">
              Grace's profile
            </HoverCardContent>
          </HoverCard>
        </MonosetProvider>,
      );

      expect(within(portal).getByTestId("portalled-hovercard")).toHaveTextContent(
        "Grace's profile",
      );
    } finally {
      portal.remove();
    }
  });

  it("opens from pointer hover and closes when hover leaves", async () => {
    const user = userEvent.setup();
    render(
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger href="/team/lin">Lin</HoverCardTrigger>
        <HoverCardContent data-testid="lin-card">Lin's profile</HoverCardContent>
      </HoverCard>,
    );

    const trigger = screen.getByRole("link", { name: "Lin" });
    await user.hover(trigger);
    expect(await screen.findByTestId("lin-card")).toBeInTheDocument();

    await user.unhover(trigger);
    await vi.waitFor(() => {
      expect(screen.queryByTestId("lin-card")).not.toBeInTheDocument();
    });
  });

  it("opens for keyboard focus", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <HoverCard openDelay={0} onOpenChange={onOpenChange}>
        <HoverCardTrigger href="/team/margaret">Margaret</HoverCardTrigger>
        <HoverCardContent>Margaret's profile</HoverCardContent>
      </HoverCard>,
    );

    await user.tab();
    expect(screen.getByRole("link", { name: "Margaret" })).toHaveFocus();
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("keeps controlled open state while reporting dismissal requests", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <HoverCard open onOpenChange={onOpenChange}>
        <HoverCardTrigger href="/team/katherine">Katherine</HoverCardTrigger>
        <HoverCardContent data-testid="controlled-hovercard">
          Katherine's profile
        </HoverCardContent>
      </HoverCard>,
    );

    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByTestId("controlled-hovercard")).toBeInTheDocument();
  });

  it("keeps the default offset and allows an override", async () => {
    render(
      <>
        <HoverCard open>
          <HoverCardTrigger href="/default">Default offset</HoverCardTrigger>
          <HoverCardContent data-testid="default-hover-offset">
            Default
          </HoverCardContent>
        </HoverCard>
        <HoverCard open>
          <HoverCardTrigger href="/custom">Custom offset</HoverCardTrigger>
          <HoverCardContent data-testid="custom-hover-offset" sideOffset={18}>
            Custom
          </HoverCardContent>
        </HoverCard>
      </>,
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const defaultWrapper = screen.getByTestId("default-hover-offset").parentElement;
    const customWrapper = screen.getByTestId("custom-hover-offset").parentElement;
    expect(defaultWrapper).not.toBeNull();
    expect(customWrapper).not.toBeNull();

    await vi.waitFor(() => {
      expect(defaultWrapper?.getAttribute("style")).not.toBe(
        customWrapper?.getAttribute("style"),
      );
    });
  });
});
