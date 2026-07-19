import { createRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import {
  MonosetProvider,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../index";

function RolesSelect({
  rootProps = {},
  triggerProps = {},
  contentProps = {},
}: {
  rootProps?: React.ComponentProps<typeof Select>;
  triggerProps?: React.ComponentProps<typeof SelectTrigger>;
  contentProps?: React.ComponentProps<typeof SelectContent>;
}) {
  return (
    <Select {...rootProps}>
      <SelectTrigger aria-label="Role" placeholder="Choose a role" {...triggerProps} />
      <SelectContent {...contentProps}>
        <SelectItem value="admin">Administrator</SelectItem>
        <SelectItem value="member" disabled>Member</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  );
}

async function openSelect(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("combobox", { name: "Role" }));
  return screen.findByRole("listbox");
}

describe("Select", () => {
  it("keeps the trigger placeholder and accessible name", () => {
    render(<RolesSelect />);

    const trigger = screen.getByRole("combobox", { name: "Role" });
    expect(trigger).toHaveTextContent("Choose a role");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports uncontrolled and controlled selection", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { unmount } = render(
      <RolesSelect rootProps={{ defaultValue: "admin", onValueChange }} />,
    );

    expect(screen.getByRole("combobox", { name: "Role" })).toHaveTextContent("Administrator");
    await openSelect(user);
    await user.click(screen.getByRole("option", { name: "Viewer" }));
    expect(onValueChange).toHaveBeenCalledWith("viewer");
    expect(screen.getByRole("combobox", { name: "Role" })).toHaveTextContent("Viewer");

    unmount();
    render(
      <RolesSelect rootProps={{ value: "admin", onValueChange }} />,
    );
    expect(screen.getByRole("combobox", { name: "Role" })).toHaveTextContent("Administrator");
    await openSelect(user);
    await user.click(screen.getByRole("option", { name: "Viewer" }));
    expect(onValueChange).toHaveBeenLastCalledWith("viewer");
    expect(screen.getByRole("combobox", { name: "Role" })).toHaveTextContent("Administrator");
  });

  it("selects with the keyboard and skips disabled options", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RolesSelect rootProps={{ defaultValue: "admin", onValueChange }} />);

    const trigger = screen.getByRole("combobox", { name: "Role" });
    trigger.focus();
    await user.keyboard("{ArrowDown}");
    await screen.findByRole("listbox");
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("viewer");
    expect(trigger).toHaveTextContent("Viewer");
  });

  it("retains Radix form naming, required state, and reset behavior", async () => {
    const user = userEvent.setup();
    render(
      <form data-testid="form">
        <RolesSelect rootProps={{ name: "role", required: true, defaultValue: "admin" }} />
      </form>,
    );
    const form = screen.getByTestId("form") as HTMLFormElement;
    const trigger = screen.getByRole("combobox", { name: "Role" });

    expect(trigger).toHaveAttribute("aria-required", "true");
    expect(new FormData(form).getAll("role")).toEqual(["admin"]);
    await openSelect(user);
    await user.click(screen.getByRole("option", { name: "Viewer" }));
    expect(new FormData(form).getAll("role")).toEqual(["viewer"]);

    // Radix owns the hidden native select and does not reset its React state
    // in response to a native form reset. The wrapper deliberately preserves
    // that Root behavior instead of introducing a second state engine.
    fireEvent.reset(form);
    expect(trigger).toHaveTextContent("Viewer");
    expect(new FormData(form).getAll("role")).toEqual(["viewer"]);
  });

  it("forwards trigger and item refs, native props, classes, and handlers", async () => {
    const user = userEvent.setup();
    const triggerRef = createRef<HTMLButtonElement>();
    const itemRef = createRef<HTMLDivElement>();
    const onPointerMove = vi.fn();
    render(
      <Select>
        <SelectTrigger
          ref={triggerRef}
          aria-label="Role"
          placeholder="Choose"
          className="custom-trigger"
          data-owner="account"
        />
        <SelectContent>
          <SelectItem
            ref={itemRef}
            value="admin"
            className="custom-item"
            data-source="directory"
            onPointerMove={onPointerMove}
          >
            Administrator
          </SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(triggerRef.current).toBe(screen.getByRole("combobox", { name: "Role" }));
    expect(triggerRef.current).toHaveClass("ms-select", "custom-trigger");
    expect(triggerRef.current).toHaveAttribute("data-owner", "account");
    await openSelect(user);
    expect(itemRef.current).toBe(screen.getByRole("option", { name: "Administrator" }));
    expect(itemRef.current).toHaveClass("ms-menu__item", "ms-select__item", "custom-item");
    expect(itemRef.current).toHaveAttribute("data-source", "directory");
    fireEvent.pointerMove(itemRef.current!);
    expect(onPointerMove).toHaveBeenCalledOnce();
  });

  it("forwards the exact content ref, props, class, and dismissal handler", async () => {
    const user = userEvent.setup();
    const contentRef = createRef<HTMLDivElement>();
    const onEscapeKeyDown = vi.fn();
    render(
      <RolesSelect
        contentProps={{
          ref: contentRef,
          className: "custom-content",
          "data-source": "roles",
          position: "item-aligned",
          sideOffset: 12,
          onEscapeKeyDown,
        }}
      />,
    );

    const listbox = await openSelect(user);
    expect(contentRef.current).toBe(listbox);
    expect(contentRef.current).toHaveClass("ms-menu", "ms-select__content", "custom-content");
    expect(contentRef.current).toHaveAttribute("data-source", "roles");
    await user.keyboard("{Escape}");
    expect(onEscapeKeyDown).toHaveBeenCalledOnce();
  });

  it("portals content into the provider target", async () => {
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
        <RolesSelect />
      </MonosetProvider>,
    );

    try {
      await openSelect(user);
      expect(portal.querySelector("[role='listbox']")).toBeInTheDocument();
    } finally {
      unmount();
      portal.remove();
    }
  });

  it("renders long-list scroll controls and a selected-item indicator", async () => {
    const user = userEvent.setup();
    const scrollHeight = vi
      .spyOn(HTMLElement.prototype, "scrollHeight", "get")
      .mockReturnValue(400);
    const clientHeight = vi
      .spyOn(HTMLElement.prototype, "clientHeight", "get")
      .mockReturnValue(100);
    try {
      render(
        <Select defaultValue="item-1">
          <SelectTrigger aria-label="Item" placeholder="Choose" />
          <SelectContent>
            {Array.from({ length: 30 }, (_, index) => (
              <SelectItem key={index} value={`item-${index + 1}`}>
                Item {index + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>,
      );

      await user.click(screen.getByRole("combobox", { name: "Item" }));
      await screen.findByRole("listbox");
      await waitFor(() => {
        expect(document.querySelector(".ms-select__scroll-down")).toBeInTheDocument();
      });
      const selected = screen.getByRole("option", { name: "Item 1" });
      expect(selected.querySelector(".ms-select__indicator svg")).toBeInTheDocument();

      const viewport = document.querySelector<HTMLElement>("[data-radix-select-viewport]")!;
      viewport.scrollTop = 50;
      fireEvent.scroll(viewport);
      await waitFor(() => {
        expect(document.querySelector(".ms-select__scroll-up")).toBeInTheDocument();
      });
    } finally {
      scrollHeight.mockRestore();
      clientHeight.mockRestore();
    }
  });

  it("has no detectable accessibility violations while closed or open", async () => {
    const user = userEvent.setup();
    const { container } = render(<RolesSelect rootProps={{ defaultValue: "admin" }} />);
    expect(await axe(container)).toHaveNoViolations();

    const listbox = await openSelect(user);
    expect(await axe(listbox, {
      rules: { region: { enabled: false } },
    })).toHaveNoViolations();
  });
});
