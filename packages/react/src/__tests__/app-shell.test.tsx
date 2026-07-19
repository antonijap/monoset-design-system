import { createRef, forwardRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { AppShell, MonosetProvider } from "../index";

interface ShellProps extends React.ComponentProps<typeof AppShell> {
  triggerProps?: React.ComponentProps<typeof AppShell.MobileTrigger>;
  itemProps?: React.ComponentProps<typeof AppShell.SidebarItem>;
}

const Shell = forwardRef<HTMLDivElement, ShellProps>(function Shell(
  { triggerProps, itemProps, ...rootProps },
  ref,
) {
  return (
    <AppShell ref={ref} {...rootProps}>
      <AppShell.Sidebar brand={<strong>Monoset</strong>} footer={<span>Account</span>}>
        <AppShell.SidebarGroup label="Main">
          <AppShell.SidebarItem {...itemProps}>Dashboard</AppShell.SidebarItem>
          <AppShell.SidebarItem>Reports</AppShell.SidebarItem>
        </AppShell.SidebarGroup>
      </AppShell.Sidebar>
      <AppShell.Main>
        <AppShell.Header>
          <AppShell.MobileTrigger label="Open menu" {...triggerProps} />
        </AppShell.Header>
        <AppShell.Content>Page content</AppShell.Content>
      </AppShell.Main>
    </AppShell>
  );
});

describe("AppShell", () => {
  it("keeps one stable sidebar DOM tree while changing mobile presentation", async () => {
    const user = userEvent.setup();
    render(<Shell />);
    const sidebar = document.querySelector<HTMLElement>("[data-ms='app-shell-sidebar']")!;

    expect(screen.getAllByText("Dashboard")).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getAllByText("Dashboard")).toHaveLength(1);
    expect(document.querySelector("[data-ms='app-shell-sidebar']")).toBe(sidebar);
    expect(sidebar).toHaveAttribute("role", "dialog");
    expect(sidebar).toHaveAttribute("aria-modal", "true");
    expect(sidebar).not.toHaveStyle({ display: "flex" });
  });

  it("makes the background main region inert and hidden while the drawer is modal", async () => {
    const user = userEvent.setup();
    render(<Shell />);
    const main = document.querySelector<HTMLElement>(".ms-app-shell__main")!;
    const trigger = screen.getByRole("button", { name: "Open menu" });

    expect(main).not.toHaveAttribute("inert");
    expect(main).not.toHaveAttribute("aria-hidden");
    await user.click(trigger);
    expect(main).toHaveAttribute("inert");
    expect(main).toHaveAttribute("aria-hidden", "true");
    await user.keyboard("{Escape}");
    expect(main).not.toHaveAttribute("inert");
    expect(main).not.toHaveAttribute("aria-hidden");
  });

  it("composes the mobile trigger handler and forwards its exact ref and props", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    render(
      <Shell
        triggerProps={{
          ref,
          onClick,
          className: "custom-trigger",
          "data-source": "header",
        }}
      />,
    );
    const trigger = screen.getByRole("button", { name: "Open menu" });

    expect(ref.current).toBe(trigger);
    expect(trigger).toHaveClass("ms-app-shell__mobile-trigger", "custom-trigger");
    expect(trigger).toHaveAttribute("data-source", "header");
    await user.click(trigger);
    expect(onClick).toHaveBeenCalledOnce();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: "Navigation" })).toBeInTheDocument();
  });

  it("lets a consumer cancel opening from the trigger", async () => {
    const user = userEvent.setup();
    render(
      <Shell triggerProps={{ onClick: (event) => event.preventDefault() }} />,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.queryByRole("dialog", { name: "Navigation" })).not.toBeInTheDocument();
  });

  it("focuses drawer navigation and returns focus after Escape", async () => {
    const user = userEvent.setup();
    render(<Shell />);
    const trigger = screen.getByRole("button", { name: "Open menu" });

    trigger.focus();
    await user.click(trigger);
    await waitFor(() => expect(screen.getByRole("button", { name: "Dashboard" })).toHaveFocus());
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Navigation" })).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });
  });

  it("focuses the drawer itself when its navigation has no focusable descendants", async () => {
    render(
      <AppShell defaultMobileOpen>
        <AppShell.Sidebar>{null}</AppShell.Sidebar>
        <AppShell.Main>Content</AppShell.Main>
      </AppShell>,
    );

    const drawer = screen.getByRole("dialog", { name: "Navigation" });
    await waitFor(() => expect(drawer).toHaveFocus());
    expect(drawer).toHaveAttribute("tabindex", "-1");
  });

  it("autofocuses and traps Tab across native controls without tabindex", async () => {
    const user = userEvent.setup();
    render(
      <AppShell defaultMobileOpen>
        <AppShell.Sidebar>
          <input aria-label="Project name" />
          <select aria-label="Project owner" defaultValue="ada">
            <option value="ada">Ada</option>
          </select>
          <textarea aria-label="Project notes" />
          <div
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-label="Project description"
          >
            Description
          </div>
        </AppShell.Sidebar>
        <AppShell.Main>Content</AppShell.Main>
      </AppShell>,
    );

    const input = screen.getByRole("textbox", { name: "Project name" });
    const select = screen.getByRole("combobox", { name: "Project owner" });
    const textarea = screen.getByRole("textbox", { name: "Project notes" });
    const editable = screen.getByRole("textbox", { name: "Project description" });
    await waitFor(() => expect(input).toHaveFocus());

    await user.tab();
    expect(select).toHaveFocus();
    await user.tab();
    expect(textarea).toHaveFocus();
    await user.tab();
    expect(editable).toHaveFocus();
    await user.tab();
    expect(input).toHaveFocus();
    await user.tab({ shift: true });
    expect(editable).toHaveFocus();
  });

  it("excludes disabled, hidden, and nonfocusable descendants from the trap", async () => {
    const user = userEvent.setup();
    render(
      <AppShell defaultMobileOpen>
        <AppShell.Sidebar>
          <button type="button" disabled>Disabled before</button>
          <input type="hidden" defaultValue="hidden" />
          <div hidden><input aria-label="Hidden descendant" /></div>
          <a>Missing href</a>
          <div tabIndex={-1}>Negative tabindex</div>
          <div tabIndex={-2}>Other negative tabindex</div>
          <div contentEditable={false}>Not editable</div>
          <input aria-label="First available" />
          <select aria-label="Disabled select" disabled><option>Disabled</option></select>
          <textarea aria-label="Disabled textarea" disabled />
          <button type="button">Last available</button>
        </AppShell.Sidebar>
        <AppShell.Main>Content</AppShell.Main>
      </AppShell>,
    );

    const first = screen.getByRole("textbox", { name: "First available" });
    const last = screen.getByRole("button", { name: "Last available" });
    await waitFor(() => expect(first).toHaveFocus());

    await user.tab({ shift: true });
    expect(last).toHaveFocus();
    await user.tab();
    expect(first).toHaveFocus();
  });

  it("preserves a consumer sidebar label when it becomes a dialog", () => {
    render(
      <AppShell defaultMobileOpen>
        <AppShell.Sidebar aria-label="Project navigation">
          <AppShell.SidebarItem>Projects</AppShell.SidebarItem>
        </AppShell.Sidebar>
        <AppShell.Main>Content</AppShell.Main>
      </AppShell>,
    );

    expect(screen.getByRole("dialog", { name: "Project navigation" })).toBeInTheDocument();
  });

  it("locks page scrolling and restores exact prior inline values", () => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "scroll";
    document.documentElement.style.overflow = "auto";

    const { rerender, unmount } = render(<Shell mobileOpen />);
    try {
      expect(document.body.style.overflow).toBe("hidden");
      expect(document.documentElement.style.overflow).toBe("hidden");

      rerender(<Shell mobileOpen={false} />);
      expect(document.body.style.overflow).toBe("scroll");
      expect(document.documentElement.style.overflow).toBe("auto");
    } finally {
      unmount();
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    }
  });

  it("reference-counts scroll locking across concurrent drawers", () => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "visible";
    document.documentElement.style.overflow = "scroll";

    const { rerender, unmount } = render(
      <>
        <Shell mobileOpen />
        <Shell mobileOpen />
      </>,
    );
    try {
      expect(document.body.style.overflow).toBe("hidden");
      expect(document.documentElement.style.overflow).toBe("hidden");

      rerender(
        <>
          <Shell mobileOpen={false} />
          <Shell mobileOpen />
        </>,
      );
      expect(document.body.style.overflow).toBe("hidden");
      expect(document.documentElement.style.overflow).toBe("hidden");

      rerender(
        <>
          <Shell mobileOpen={false} />
          <Shell mobileOpen={false} />
        </>,
      );
      expect(document.body.style.overflow).toBe("visible");
      expect(document.documentElement.style.overflow).toBe("scroll");
    } finally {
      unmount();
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    }
  });

  it("composes sidebar item actions, closes, and returns focus", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Shell itemProps={{ onClick }} />);
    const trigger = screen.getByRole("button", { name: "Open menu" });

    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Dashboard" }));
    expect(onClick).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Navigation" })).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });
  });

  it("supports controlled mobile state without hiding before its owner updates", async () => {
    const user = userEvent.setup();
    const onMobileOpenChange = vi.fn();
    const { rerender } = render(
      <Shell mobileOpen onMobileOpenChange={onMobileOpenChange} />,
    );

    expect(screen.getByRole("dialog", { name: "Navigation" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onMobileOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("dialog", { name: "Navigation" })).toBeInTheDocument();

    rerender(<Shell mobileOpen={false} onMobileOpenChange={onMobileOpenChange} />);
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Navigation" })).not.toBeInTheDocument();
    });
  });

  it("captures focus for controlled programmatic opening and restores it on close", async () => {
    const onMobileOpenChange = vi.fn();
    const { rerender } = render(
      <>
        <button type="button">Outside action</button>
        <Shell mobileOpen={false} onMobileOpenChange={onMobileOpenChange} />
      </>,
    );
    const outside = screen.getByRole("button", { name: "Outside action" });
    outside.focus();

    rerender(
      <>
        <button type="button">Outside action</button>
        <Shell mobileOpen onMobileOpenChange={onMobileOpenChange} />
      </>,
    );
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Dashboard" })).toHaveFocus();
    });

    rerender(
      <>
        <button type="button">Outside action</button>
        <Shell mobileOpen={false} onMobileOpenChange={onMobileOpenChange} />
      </>,
    );
    await waitFor(() => expect(outside).toHaveFocus());
  });

  it("does not emit a redundant close request from a desktop sidebar item", async () => {
    const user = userEvent.setup();
    const onMobileOpenChange = vi.fn();
    render(<Shell onMobileOpenChange={onMobileOpenChange} />);

    await user.click(screen.getByRole("button", { name: "Dashboard" }));
    expect(onMobileOpenChange).not.toHaveBeenCalled();
  });

  it("closes an uncontrolled drawer when the navigation signal changes", async () => {
    const onMobileOpenChange = vi.fn();
    const { rerender } = render(
      <Shell
        defaultMobileOpen
        navigationSignal="/dashboard"
        onMobileOpenChange={onMobileOpenChange}
      />,
    );
    expect(screen.getByRole("dialog", { name: "Navigation" })).toBeInTheDocument();

    rerender(
      <Shell
        defaultMobileOpen
        navigationSignal="/reports"
        onMobileOpenChange={onMobileOpenChange}
      />,
    );
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Navigation" })).not.toBeInTheDocument();
    });
    expect(onMobileOpenChange).toHaveBeenCalledWith(false);
  });

  it("keeps nested shell mobile state scoped to the nearest root", async () => {
    const user = userEvent.setup();
    render(
      <AppShell>
        <AppShell.Sidebar>
          <AppShell.SidebarItem>Outer destination</AppShell.SidebarItem>
        </AppShell.Sidebar>
        <AppShell.Main>
          <AppShell.MobileTrigger label="Open outer" />
          <AppShell>
            <AppShell.Sidebar>
              <AppShell.SidebarItem>Inner destination</AppShell.SidebarItem>
            </AppShell.Sidebar>
            <AppShell.Main>
              <AppShell.MobileTrigger label="Open inner" />
            </AppShell.Main>
          </AppShell>
        </AppShell.Main>
      </AppShell>,
    );

    const innerTrigger = screen.getByRole("button", { name: "Open inner" });
    const outerTrigger = screen.getByRole("button", { name: "Open outer" });
    await user.click(innerTrigger);
    expect(innerTrigger).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(outerTrigger).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getAllByRole("dialog", { name: "Navigation" })).toHaveLength(1);
  });

  it("portals only the scrim through the provider target", async () => {
    const user = userEvent.setup();
    const portal = document.createElement("div");
    document.body.append(portal);
    const { unmount } = render(
      <MonosetProvider
        portal={{ container: portal }}
        theme={false}
        tooltip={false}
        toast={false}
        motion={false}
      >
        <Shell />
      </MonosetProvider>,
    );
    try {
      await user.click(screen.getByRole("button", { name: "Open menu" }));
      expect(portal.querySelector(".ms-app-shell__drawer-scrim")).toBeInTheDocument();
      expect(portal.querySelector("[data-ms='app-shell-sidebar']")).not.toBeInTheDocument();
    } finally {
      unmount();
      portal.remove();
    }
  });

  it("forwards the root ref/class and normalizes its sidebar width", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Shell ref={ref} className="account-shell" sidebarWidth={280} />);

    expect(ref.current).toBe(document.querySelector(".ms-app-shell"));
    expect(ref.current).toHaveClass("ms-app-shell", "account-shell");
    expect(ref.current?.style.getPropertyValue("--ms-sidebar-w")).toBe("280px");
  });

  it("forwards native props and exact refs from structural compound parts", () => {
    const rootRef = createRef<HTMLDivElement>();
    const sidebarRef = createRef<HTMLDivElement>();
    const mainRef = createRef<HTMLDivElement>();
    const headerRef = createRef<HTMLElement>();
    const contentRef = createRef<HTMLElement>();
    const onPointerDown = vi.fn();
    render(
      <AppShell
        ref={rootRef}
        data-owner="account"
        aria-label="Account application"
        style={{ minHeight: 400 }}
        onPointerDown={onPointerDown}
      >
        <AppShell.Sidebar ref={sidebarRef} data-source="primary" className="custom-sidebar">
          Navigation
        </AppShell.Sidebar>
        <AppShell.Main ref={mainRef} data-source="workspace" className="custom-main">
          <AppShell.Header ref={headerRef} title="Workspace header" className="custom-header">
            Header
          </AppShell.Header>
          <AppShell.Content ref={contentRef} aria-live="polite" className="custom-content">
            Content
          </AppShell.Content>
        </AppShell.Main>
      </AppShell>,
    );

    expect(rootRef.current).toHaveAttribute("data-owner", "account");
    expect(rootRef.current).toHaveAttribute("aria-label", "Account application");
    expect(rootRef.current).toHaveStyle({ minHeight: "400px" });
    fireEvent.pointerDown(rootRef.current!);
    expect(onPointerDown).toHaveBeenCalledOnce();
    expect(sidebarRef.current).toHaveClass("ms-app-shell__sidebar", "custom-sidebar");
    expect(sidebarRef.current).toHaveAttribute("data-source", "primary");
    expect(mainRef.current).toHaveClass("ms-app-shell__main", "custom-main");
    expect(mainRef.current).toHaveAttribute("data-source", "workspace");
    expect(headerRef.current).toHaveClass("ms-app-shell__header", "custom-header");
    expect(headerRef.current).toHaveAttribute("title", "Workspace header");
    expect(contentRef.current).toHaveClass("ms-app-shell__content", "custom-content");
    expect(contentRef.current).toHaveAttribute("aria-live", "polite");
  });

  it("has no detectable accessibility violations when closed or open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Shell />);
    expect(await axe(container)).toHaveNoViolations();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("dialog", { name: "Navigation" });
    expect(await axe(drawer, {
      rules: { region: { enabled: false } },
    })).toHaveNoViolations();
  });
});
