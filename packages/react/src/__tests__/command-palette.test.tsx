import { createRef, forwardRef, useState } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import {
  CommandPalette,
  MonosetProvider,
  type CommandGroup,
  type CommandItem,
} from "../index";

const items: CommandItem[] = [
  { id: "new", label: "New project", keywords: ["create"] },
  { id: "archive", label: "Archive project", disabled: true },
  { id: "settings", label: "Open settings", description: "Manage your workspace" },
  { id: "invite", label: "Invite teammate", keywords: ["member", "people"] },
];

type PaletteProps = Partial<React.ComponentProps<typeof CommandPalette>> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Palette = forwardRef<HTMLDivElement, PaletteProps>(function Palette(
  {
    open = true,
    onOpenChange = vi.fn(),
    ...props
  },
  ref,
) {
  return (
    <CommandPalette
      ref={ref}
      open={open}
      onOpenChange={onOpenChange}
      items={items}
      {...props}
    />
  );
});

function searchInput() {
  return screen.getByRole("combobox", { name: "Search commands" });
}

describe("CommandPalette", () => {
  it("gives each instance its own listbox, option, and active-descendant ids", () => {
    render(
      <>
        <Palette />
        <Palette />
      </>,
    );

    const inputs = document.querySelectorAll<HTMLInputElement>(".ms-cmd__input");
    const lists = document.querySelectorAll<HTMLElement>(".ms-cmd__list");
    expect(inputs).toHaveLength(2);
    expect(lists).toHaveLength(2);
    expect(inputs[0].getAttribute("aria-controls")).toBe(lists[0].id);
    expect(inputs[1].getAttribute("aria-controls")).toBe(lists[1].id);
    expect(lists[0].id).not.toBe(lists[1].id);
    expect(inputs[0].getAttribute("aria-activedescendant")).not.toBe(
      inputs[1].getAttribute("aria-activedescendant"),
    );
    for (const input of inputs) {
      const activeId = input.getAttribute("aria-activedescendant");
      expect(activeId).toBeTruthy();
      expect(document.getElementById(activeId!)).toHaveAttribute("role", "option");
    }
  });

  it("announces expanded state, controls, and the active enabled option", () => {
    render(<Palette />);

    const input = searchInput();
    const active = document.getElementById(input.getAttribute("aria-activedescendant")!);
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input).toHaveAttribute("aria-autocomplete", "list");
    expect(document.getElementById(input.getAttribute("aria-controls")!)).toHaveAttribute(
      "role",
      "listbox",
    );
    expect(active).toHaveAccessibleName("New project");
    expect(active).not.toHaveAttribute("aria-disabled", "true");
  });

  it("skips disabled items with arrow keys and wraps enabled options", async () => {
    const user = userEvent.setup();
    render(<Palette />);
    const input = searchInput();
    input.focus();

    await user.keyboard("{ArrowDown}");
    expect(document.getElementById(input.getAttribute("aria-activedescendant")!))
      .toHaveAccessibleName(/Open settings/);
    await user.keyboard("{ArrowUp}");
    expect(document.getElementById(input.getAttribute("aria-activedescendant")!))
      .toHaveAccessibleName("New project");
    await user.keyboard("{ArrowUp}");
    expect(document.getElementById(input.getAttribute("aria-activedescendant")!))
      .toHaveAccessibleName("Invite teammate");
  });

  it("filters by label, description, keywords, and a custom filter", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Palette />);
    const input = searchInput();

    await user.type(input, "workspace");
    expect(screen.getByRole("option", { name: /Open settings/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /New project/ })).not.toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "people");
    expect(screen.getByRole("option", { name: /Invite teammate/ })).toBeInTheDocument();

    rerender(
      <Palette filter={(query, item) => item.id.startsWith(query.toLowerCase())} />,
    );
    await user.clear(searchInput());
    await user.type(searchInput(), "new");
    expect(screen.getByRole("option", { name: /New project/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Open settings/ })).not.toBeInTheDocument();
  });

  it("preserves named groups while filtering and removes empty groups", async () => {
    const user = userEvent.setup();
    const groups: CommandGroup[] = [
      { heading: "Projects", items: items.slice(0, 2) },
      { heading: "Workspace", items: items.slice(2) },
    ];
    render(<Palette items={groups} />);

    expect(screen.getByRole("group", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Workspace" })).toBeInTheDocument();
    await user.type(searchInput(), "settings");
    expect(screen.queryByRole("group", { name: "Projects" })).not.toBeInTheDocument();
    const workspace = screen.getByRole("group", { name: "Workspace" });
    expect(within(workspace).getByRole("option", { name: /Open settings/ })).toBeInTheDocument();
  });

  it("renders an empty result without a stale active descendant", async () => {
    const user = userEvent.setup();
    render(<Palette emptyMessage="Nothing available" />);

    await user.type(searchInput(), "not-a-command");
    expect(screen.getByText("Nothing available")).toBeInTheDocument();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
    expect(searchInput()).not.toHaveAttribute("aria-activedescendant");
  });

  it("runs enabled actions and requests controlled dismissal", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <Palette
        onOpenChange={onOpenChange}
        items={[
          { id: "disabled", label: "Unavailable", disabled: true, onSelect },
          { id: "run", label: "Run report", onSelect },
        ]}
      />,
    );
    const input = searchInput();
    input.focus();

    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false);
    // The palette is explicitly controlled and remains open until its owner updates `open`.
    expect(screen.getByRole("dialog", { name: "Command palette" })).toBeInTheDocument();

    onSelect.mockClear();
    onOpenChange.mockClear();
    await user.click(screen.getByRole("option", { name: "Unavailable" }));
    expect(onSelect).not.toHaveBeenCalled();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("requests dismissal on Escape and closes only when controlled state changes", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(<Palette onOpenChange={onOpenChange} />);
    searchInput().focus();

    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("dialog", { name: "Command palette" })).toBeInTheDocument();

    rerender(<Palette open={false} onOpenChange={onOpenChange} />);
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Command palette" })).not.toBeInTheDocument();
    });
  });

  it("returns focus to its external opener after Escape or selection", async () => {
    const user = userEvent.setup();

    function ControlledPalette() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open commands
          </button>
          <Palette open={open} onOpenChange={setOpen} />
        </>
      );
    }

    render(<ControlledPalette />);
    const opener = screen.getByRole("button", { name: "Open commands" });

    await user.click(opener);
    await waitFor(() => expect(searchInput()).toHaveFocus());
    await user.keyboard("{Escape}");

    await waitFor(() => expect(opener).toHaveFocus());

    await user.click(opener);
    await waitFor(() => expect(searchInput()).toHaveFocus());
    await user.click(screen.getByRole("option", { name: "New project" }));

    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("captures focus on a programmatic open and restores it on controlled close", async () => {
    const onOpenChange = vi.fn();
    const opener = document.createElement("button");
    opener.textContent = "Keyboard shortcut target";
    document.body.append(opener);
    try {
      const renderPalette = (open: boolean) => (
        <Palette open={open} onOpenChange={onOpenChange} />
      );
      const { rerender } = render(renderPalette(false));
      opener.focus();
      expect(opener).toHaveFocus();

      rerender(renderPalette(true));
      await waitFor(() => expect(searchInput()).toHaveFocus());
      rerender(renderPalette(false));

      await waitFor(() => expect(opener).toHaveFocus());
    } finally {
      opener.remove();
    }
  });

  it("resets the query and focuses search each time it reopens", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(<Palette onOpenChange={onOpenChange} />);
    await waitFor(() => expect(searchInput()).toHaveFocus());
    await user.type(searchInput(), "settings");

    rerender(<Palette open={false} onOpenChange={onOpenChange} />);
    rerender(<Palette open onOpenChange={onOpenChange} />);
    await waitFor(() => {
      expect(searchInput()).toHaveValue("");
      expect(searchInput()).toHaveFocus();
    });
  });

  it("forwards its content ref/class and renders footer content", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Palette ref={ref} className="project-commands" footer={<span>Press Esc to close</span>} />);

    const dialog = screen.getByRole("dialog", { name: "Command palette" });
    expect(ref.current).toBe(dialog);
    expect(dialog).toHaveClass("ms-cmd", "project-commands");
    expect(screen.getByText("Press Esc to close")).toBeInTheDocument();
  });

  it("portals through MonosetProvider", () => {
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
        <Palette />
      </MonosetProvider>,
    );
    try {
      expect(portal).toContainElement(screen.getByRole("dialog", { name: "Command palette" }));
    } finally {
      unmount();
      portal.remove();
    }
  });

  it("has no detectable accessibility violations", async () => {
    render(<Palette />);
    const dialog = screen.getByRole("dialog", { name: "Command palette" });
    expect(await axe(dialog, {
      rules: { region: { enabled: false } },
    })).toHaveNoViolations();
  });
});
