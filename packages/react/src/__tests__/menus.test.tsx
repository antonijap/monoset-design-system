import { createRef, useState } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../DropdownMenu";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ContextMenu";
import { MonosetProvider } from "../MonosetProvider";

describe("DropdownMenu", () => {
  it("opens from its trigger, supports keyboard selection, and returns focus", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const trigger = screen.getByRole("button", { name: "Open actions" });
    await user.click(trigger);
    expect(screen.getByRole("menu")).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  });

  it("skips disabled items during keyboard navigation", async () => {
    const user = userEvent.setup();
    const disabledSelect = vi.fn();
    const enabledSelect = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled onSelect={disabledSelect}>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={enabledSelect}>Archive</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByRole("button", { name: "Open actions" }));
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveAttribute(
      "data-disabled",
    );
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Archive" })).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(disabledSelect).not.toHaveBeenCalled();
    expect(enabledSelect).toHaveBeenCalledTimes(1);
  });

  it("supports controlled open state", async () => {
    const user = userEvent.setup();

    function ControlledMenu() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <span data-testid="state">{open ? "open" : "closed"}</span>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger>Open controlled</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Action</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    }

    render(<ControlledMenu />);
    await user.click(screen.getByRole("button", { name: "Open controlled" }));
    expect(screen.getByTestId("state")).toHaveTextContent("open");
    await user.keyboard("{Escape}");
    expect(screen.getByTestId("state")).toHaveTextContent("closed");
  });

  it("forwards exact refs and composes classes, props, and handlers", async () => {
    const user = userEvent.setup();
    const contentRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLDivElement>();
    const labelRef = createRef<HTMLDivElement>();
    const separatorRef = createRef<HTMLDivElement>();
    const onContentClick = vi.fn();
    const onItemSelect = vi.fn((event: Event) => event.preventDefault());
    const onLabelClick = vi.fn();

    render(
      <DropdownMenu open>
        <DropdownMenuContent
          ref={contentRef}
          className="product-menu"
          data-scope="account"
          onClick={onContentClick}
        >
          <DropdownMenuLabel
            ref={labelRef}
            className="product-label"
            data-label="account"
            onClick={onLabelClick}
          >
            Account
          </DropdownMenuLabel>
          <DropdownMenuItem
            ref={itemRef}
            className="product-item"
            data-action="edit"
            onSelect={onItemSelect}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator
            ref={separatorRef}
            className="product-separator"
            data-separator="account"
          />
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const menu = screen.getByRole("menu");
    const item = screen.getByRole("menuitem", { name: "Edit" });
    expect(contentRef.current).toBe(menu);
    expect(itemRef.current).toBe(item);
    expect(labelRef.current).toHaveTextContent("Account");
    expect(labelRef.current).toHaveAttribute("data-label", "account");
    expect(separatorRef.current).toHaveAttribute("role", "separator");
    expect(separatorRef.current).toHaveAttribute(
      "data-separator",
      "account",
    );
    expect(menu).toHaveClass("ms-menu", "product-menu");
    expect(menu).toHaveAttribute("data-scope", "account");
    expect(item).toHaveClass("ms-menu__item", "product-item");
    expect(item).toHaveAttribute("data-action", "edit");
    expect(labelRef.current).toHaveClass("ms-menu__label", "product-label");
    expect(separatorRef.current).toHaveClass(
      "ms-menu__separator",
      "product-separator",
    );

    await user.click(labelRef.current!);
    expect(onLabelClick).toHaveBeenCalledTimes(1);
    await user.click(item);
    expect(onItemSelect).toHaveBeenCalledTimes(1);
    expect(onContentClick).toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("uses the provider portal target and preserves positioning props", () => {
    const portal = document.createElement("section");
    document.body.append(portal);

    render(
      <MonosetProvider
        portal={{ container: portal }}
        tooltip={false}
        toast={false}
        motion={false}
      >
        <DropdownMenu open>
          <DropdownMenuContent
            data-testid="dropdown-content"
            align="end"
          >
            <DropdownMenuItem>Action</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </MonosetProvider>,
    );

    const menu = within(portal).getByRole("menu");
    expect(menu).toHaveAttribute("data-align", "end");
    expect(menu).toHaveAttribute("data-testid", "dropdown-content");

    portal.remove();
  });

  it("has no obvious accessibility violations", async () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent aria-label="Account actions">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(await axe(screen.getByRole("menu"))).toHaveNoViolations();
  });
});

describe("ContextMenu", () => {
  function openContextMenu(target: HTMLElement) {
    fireEvent.contextMenu(target, { clientX: 40, clientY: 60 });
  }

  it("opens on contextmenu and supports keyboard selection", async () => {
    const user = userEvent.setup();
    const editSelect = vi.fn();
    const duplicateSelect = vi.fn();

    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="context-target" tabIndex={0}>
          Selected row
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={editSelect}>Edit</ContextMenuItem>
          <ContextMenuItem onSelect={duplicateSelect}>Duplicate</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const target = screen.getByTestId("context-target");
    target.focus();
    openContextMenu(target);
    expect(screen.getByRole("menu")).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    await user.keyboard("{ArrowDown}{Enter}");

    expect(editSelect).not.toHaveBeenCalled();
    expect(duplicateSelect).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("closes on Escape and returns focus to the context target", async () => {
    const user = userEvent.setup();

    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="context-target" tabIndex={0}>
          Selected row
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Edit</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const target = screen.getByTestId("context-target");
    target.focus();
    openContextMenu(target);
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
    expect(target).toHaveFocus();
  });

  it("supports controlled open state", async () => {
    const user = userEvent.setup();

    function ControlledContextMenu() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <span data-testid="context-state">{open ? "open" : "closed"}</span>
          <ContextMenu open={open} onOpenChange={setOpen}>
            <ContextMenuTrigger data-testid="controlled-context-target">
              Target
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Action</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </>
      );
    }

    render(<ControlledContextMenu />);
    openContextMenu(screen.getByTestId("controlled-context-target"));
    expect(screen.getByTestId("context-state")).toHaveTextContent("open");
    await user.keyboard("{Escape}");
    expect(screen.getByTestId("context-state")).toHaveTextContent("closed");
  });

  it("skips disabled items", async () => {
    const user = userEvent.setup();
    const disabledSelect = vi.fn();
    const enabledSelect = vi.fn();

    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="context-target">Target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem disabled onSelect={disabledSelect}>
            Delete
          </ContextMenuItem>
          <ContextMenuItem onSelect={enabledSelect}>Archive</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    openContextMenu(screen.getByTestId("context-target"));
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Archive" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(disabledSelect).not.toHaveBeenCalled();
    expect(enabledSelect).toHaveBeenCalledTimes(1);
  });

  it("forwards refs and composes props, classes, and handlers", async () => {
    const user = userEvent.setup();
    const contentRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLDivElement>();
    const labelRef = createRef<HTMLDivElement>();
    const separatorRef = createRef<HTMLDivElement>();
    const onContentClick = vi.fn();
    const onItemSelect = vi.fn((event: Event) => event.preventDefault());
    const onLabelClick = vi.fn();

    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="composition-target">
          Target
        </ContextMenuTrigger>
        <ContextMenuContent
          ref={contentRef}
          className="product-menu"
          onClick={onContentClick}
          data-scope="row"
        >
          <ContextMenuLabel
            ref={labelRef}
            className="product-label"
            onClick={onLabelClick}
            data-label="row"
          >
            Row actions
          </ContextMenuLabel>
          <ContextMenuItem
            ref={itemRef}
            className="product-item"
            onSelect={onItemSelect}
          >
            Edit
          </ContextMenuItem>
          <ContextMenuSeparator
            ref={separatorRef}
            className="product-separator"
            data-separator="row"
          />
        </ContextMenuContent>
      </ContextMenu>,
    );

    openContextMenu(screen.getByTestId("composition-target"));

    const menu = screen.getByRole("menu");
    const item = screen.getByRole("menuitem", { name: "Edit" });
    expect(contentRef.current).toBe(menu);
    expect(itemRef.current).toBe(item);
    expect(labelRef.current).toHaveClass("ms-menu__label", "product-label");
    expect(labelRef.current).toHaveAttribute("data-label", "row");
    expect(separatorRef.current).toHaveClass(
      "ms-menu__separator",
      "product-separator",
    );
    expect(separatorRef.current).toHaveAttribute("data-separator", "row");
    expect(menu).toHaveClass("ms-menu", "product-menu");
    expect(menu).toHaveAttribute("data-scope", "row");
    expect(item).toHaveClass("ms-menu__item", "product-item");

    await user.click(labelRef.current!);
    expect(onLabelClick).toHaveBeenCalledTimes(1);
    await user.click(item);
    expect(onItemSelect).toHaveBeenCalledTimes(1);
    expect(onContentClick).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("uses the provider portal target", () => {
    const portal = document.createElement("section");
    document.body.append(portal);

    render(
      <MonosetProvider
        portal={{ container: portal }}
        tooltip={false}
        toast={false}
        motion={false}
      >
        <ContextMenu>
          <ContextMenuTrigger data-testid="portal-target">
            Target
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Action</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </MonosetProvider>,
    );

    openContextMenu(screen.getByTestId("portal-target"));
    expect(within(portal).getByRole("menu")).toBeInTheDocument();
    portal.remove();
  });

  it("has no obvious accessibility violations", async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="axe-context-target" tabIndex={0}>
          Selected row
        </ContextMenuTrigger>
        <ContextMenuContent aria-label="Row actions">
          <ContextMenuLabel>Row</ContextMenuLabel>
          <ContextMenuItem>Edit</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem disabled>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    openContextMenu(screen.getByTestId("axe-context-target"));
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument());
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(await axe(screen.getByRole("menu"))).toHaveNoViolations();
  });
});

describe("DropdownMenu compound items", () => {
  it("supports grouped checkbox and radio state with exact refs and classes", async () => {
    const user = userEvent.setup();
    const groupRef = createRef<HTMLDivElement>();
    const checkboxRef = createRef<HTMLDivElement>();
    const checkboxIndicatorRef = createRef<HTMLSpanElement>();
    const radioGroupRef = createRef<HTMLDivElement>();
    const radioRef = createRef<HTMLDivElement>();
    const radioIndicatorRef = createRef<HTMLSpanElement>();

    function ChoiceMenu() {
      const [grid, setGrid] = useState(false);
      const [density, setDensity] = useState("comfortable");
      return (
        <DropdownMenu open>
          <DropdownMenuContent aria-label="View options">
            <DropdownMenuGroup
              ref={groupRef}
              className="product-group"
              data-group="view"
            >
              <DropdownMenuCheckboxItem
                ref={checkboxRef}
                checked={grid}
                onCheckedChange={setGrid}
                onSelect={(event) => event.preventDefault()}
                className="product-checkbox"
              >
                <DropdownMenuItemIndicator
                  ref={checkboxIndicatorRef}
                  forceMount
                  className="product-indicator"
                >
                  ✓
                </DropdownMenuItemIndicator>
                Grid
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuRadioGroup
              ref={radioGroupRef}
              value={density}
              onValueChange={setDensity}
              className="product-radio-group"
              data-group="density"
            >
              <DropdownMenuRadioItem
                ref={radioRef}
                value="comfortable"
                onSelect={(event) => event.preventDefault()}
              >
                <DropdownMenuItemIndicator
                  ref={radioIndicatorRef}
                  className="radio-indicator"
                >
                  •
                </DropdownMenuItemIndicator>
                Comfortable
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="compact"
                onSelect={(event) => event.preventDefault()}
              >
                Compact
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    render(<ChoiceMenu />);
    const checkbox = screen.getByRole("menuitemcheckbox", { name: "Grid" });
    const comfortable = screen.getByRole("menuitemradio", {
      name: "Comfortable",
    });
    const compact = screen.getByRole("menuitemradio", { name: "Compact" });

    expect(groupRef.current).toHaveClass("ms-menu__group", "product-group");
    expect(groupRef.current).toHaveAttribute("data-group", "view");
    expect(checkboxRef.current).toBe(checkbox);
    expect(checkbox).toHaveClass(
      "ms-menu__item",
      "ms-menu__item--checkbox",
      "product-checkbox",
    );
    expect(checkboxIndicatorRef.current).toHaveClass(
      "ms-menu__indicator",
      "product-indicator",
    );
    expect(checkboxIndicatorRef.current).toHaveAttribute("aria-hidden", "true");
    expect(radioGroupRef.current).toHaveClass(
      "ms-menu__group",
      "ms-menu__radio-group",
      "product-radio-group",
    );
    expect(radioGroupRef.current).toHaveAttribute("data-group", "density");
    expect(radioRef.current).toBe(comfortable);
    expect(comfortable).toHaveClass("ms-menu__item", "ms-menu__item--radio");
    expect(radioIndicatorRef.current).toHaveClass(
      "ms-menu__indicator",
      "radio-indicator",
    );
    expect(radioIndicatorRef.current).toHaveAttribute("aria-hidden", "true");

    expect(checkbox).toHaveAttribute("aria-checked", "false");
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(comfortable).toHaveAttribute("aria-checked", "true");
    await user.click(compact);
    expect(compact).toHaveAttribute("aria-checked", "true");
    expect(comfortable).toHaveAttribute("aria-checked", "false");
  });

  it("opens a keyboard submenu in the provider portal and restores focus", async () => {
    const user = userEvent.setup();
    const portal = document.createElement("section");
    document.body.append(portal);
    const subTriggerRef = createRef<HTMLDivElement>();
    const subContentRef = createRef<HTMLDivElement>();

    render(
      <MonosetProvider
        portal={{ container: portal }}
        tooltip={false}
        toast={false}
        motion={false}
      >
        <DropdownMenu>
          <DropdownMenuTrigger>Open actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger
                ref={subTriggerRef}
                className="product-sub-trigger"
              >
                Share
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent
                ref={subContentRef}
                className="product-sub-content"
                aria-label="Share options"
              >
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </MonosetProvider>,
    );

    const rootTrigger = screen.getByRole("button", { name: "Open actions" });
    await user.click(rootTrigger);
    await user.keyboard("{ArrowDown}");
    const subTrigger = screen.getByRole("menuitem", { name: "Share" });
    expect(subTriggerRef.current).toBe(subTrigger);
    expect(subTrigger).toHaveClass(
      "ms-menu__item",
      "ms-menu__sub-trigger",
      "product-sub-trigger",
    );
    expect(subTrigger).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    await waitFor(() => expect(within(portal).getAllByRole("menu")).toHaveLength(2));
    expect(subContentRef.current).toHaveClass(
      "ms-menu",
      "ms-menu__sub-content",
      "product-sub-content",
    );
    expect(screen.getByRole("menuitem", { name: "Email" })).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    await waitFor(() => expect(within(portal).getAllByRole("menu")).toHaveLength(1));
    expect(subTrigger).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(rootTrigger).toHaveFocus();

    portal.remove();
  });

  it("keeps compound items free of obvious accessibility violations", async () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent aria-label="View options">
          <DropdownMenuCheckboxItem checked>
            <DropdownMenuItemIndicator>✓</DropdownMenuItemIndicator>
            Grid
          </DropdownMenuCheckboxItem>
          <DropdownMenuRadioGroup value="comfortable">
            <DropdownMenuRadioItem value="comfortable">
              Comfortable
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="compact">
              Compact
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(await axe(screen.getByRole("menu"))).toHaveNoViolations();
  });
});

describe("ContextMenu compound items", () => {
  function openCompoundContextMenu(target: HTMLElement) {
    fireEvent.contextMenu(target, { clientX: 40, clientY: 60 });
  }

  it("supports grouped checkbox and radio state with exact refs and classes", async () => {
    const user = userEvent.setup();
    const groupRef = createRef<HTMLDivElement>();
    const checkboxRef = createRef<HTMLDivElement>();
    const indicatorRef = createRef<HTMLSpanElement>();
    const radioGroupRef = createRef<HTMLDivElement>();
    const radioRef = createRef<HTMLDivElement>();

    function ChoiceMenu() {
      const [grid, setGrid] = useState(false);
      const [density, setDensity] = useState("comfortable");
      return (
        <ContextMenu>
          <ContextMenuTrigger data-testid="choice-context-target">
            Target
          </ContextMenuTrigger>
          <ContextMenuContent aria-label="View options">
            <ContextMenuGroup ref={groupRef} className="product-group">
              <ContextMenuCheckboxItem
                ref={checkboxRef}
                checked={grid}
                onCheckedChange={setGrid}
                onSelect={(event) => event.preventDefault()}
              >
                <ContextMenuItemIndicator
                  ref={indicatorRef}
                  forceMount
                  className="product-indicator"
                >
                  ✓
                </ContextMenuItemIndicator>
                Grid
              </ContextMenuCheckboxItem>
            </ContextMenuGroup>
            <ContextMenuRadioGroup
              ref={radioGroupRef}
              value={density}
              onValueChange={setDensity}
            >
              <ContextMenuRadioItem
                ref={radioRef}
                value="comfortable"
                onSelect={(event) => event.preventDefault()}
              >
                Comfortable
              </ContextMenuRadioItem>
              <ContextMenuRadioItem
                value="compact"
                onSelect={(event) => event.preventDefault()}
              >
                Compact
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      );
    }

    render(<ChoiceMenu />);
    openCompoundContextMenu(screen.getByTestId("choice-context-target"));
    const checkbox = screen.getByRole("menuitemcheckbox", { name: "Grid" });
    const comfortable = screen.getByRole("menuitemradio", {
      name: "Comfortable",
    });
    const compact = screen.getByRole("menuitemradio", { name: "Compact" });

    expect(groupRef.current).toHaveClass("ms-menu__group", "product-group");
    expect(checkboxRef.current).toBe(checkbox);
    expect(checkbox).toHaveClass("ms-menu__item", "ms-menu__item--checkbox");
    expect(indicatorRef.current).toHaveClass(
      "ms-menu__indicator",
      "product-indicator",
    );
    expect(indicatorRef.current).toHaveAttribute("aria-hidden", "true");
    expect(radioGroupRef.current).toHaveClass(
      "ms-menu__group",
      "ms-menu__radio-group",
    );
    expect(radioRef.current).toBe(comfortable);
    expect(comfortable).toHaveClass("ms-menu__item", "ms-menu__item--radio");

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    await user.click(compact);
    expect(compact).toHaveAttribute("aria-checked", "true");
    expect(comfortable).toHaveAttribute("aria-checked", "false");
  });

  it("opens a keyboard submenu in the provider portal and restores focus", async () => {
    const user = userEvent.setup();
    const portal = document.createElement("section");
    document.body.append(portal);
    const subTriggerRef = createRef<HTMLDivElement>();
    const subContentRef = createRef<HTMLDivElement>();

    render(
      <MonosetProvider
        portal={{ container: portal }}
        tooltip={false}
        toast={false}
        motion={false}
      >
        <ContextMenu>
          <ContextMenuTrigger data-testid="sub-context-target" tabIndex={0}>
            Target
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuSub>
              <ContextMenuSubTrigger ref={subTriggerRef}>Share</ContextMenuSubTrigger>
              <ContextMenuSubContent
                ref={subContentRef}
                aria-label="Share options"
              >
                <ContextMenuItem>Email</ContextMenuItem>
                <ContextMenuItem>Copy link</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      </MonosetProvider>,
    );

    const rootTarget = screen.getByTestId("sub-context-target");
    rootTarget.focus();
    openCompoundContextMenu(rootTarget);
    await user.keyboard("{ArrowDown}");
    const subTrigger = screen.getByRole("menuitem", { name: "Share" });
    expect(subTriggerRef.current).toBe(subTrigger);
    expect(subTrigger).toHaveFocus();
    expect(subTrigger).toHaveClass("ms-menu__item", "ms-menu__sub-trigger");

    await user.keyboard("{ArrowRight}");
    await waitFor(() => expect(within(portal).getAllByRole("menu")).toHaveLength(2));
    expect(subContentRef.current).toHaveClass("ms-menu", "ms-menu__sub-content");
    expect(screen.getByRole("menuitem", { name: "Email" })).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    await waitFor(() => expect(within(portal).getAllByRole("menu")).toHaveLength(1));
    expect(subTrigger).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(rootTarget).toHaveFocus();

    portal.remove();
  });

  it("keeps compound items free of obvious accessibility violations", async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="compound-axe-target">
          Target
        </ContextMenuTrigger>
        <ContextMenuContent aria-label="View options">
          <ContextMenuCheckboxItem checked>
            <ContextMenuItemIndicator>✓</ContextMenuItemIndicator>
            Grid
          </ContextMenuCheckboxItem>
          <ContextMenuRadioGroup value="comfortable">
            <ContextMenuRadioItem value="comfortable">
              Comfortable
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>,
    );

    openCompoundContextMenu(screen.getByTestId("compound-axe-target"));
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument());
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(await axe(screen.getByRole("menu"))).toHaveNoViolations();
  });
});
