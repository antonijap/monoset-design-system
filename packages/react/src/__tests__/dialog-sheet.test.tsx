import { createRef, useState } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../Dialog";
import { MonosetProvider } from "../MonosetProvider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  type SheetSide,
} from "../Sheet";

describe("Dialog", () => {
  it("forwards the content ref and composes content and overlay classes", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Dialog open>
        <DialogContent
          ref={ref}
          title="Account settings"
          className="product-dialog"
          overlayClassName="product-overlay"
          data-scope="account"
        >
          Dialog body
        </DialogContent>
      </Dialog>,
    );

    const dialog = screen.getByRole("dialog", { name: "Account settings" });
    expect(ref.current).toBe(dialog);
    expect(dialog).toHaveClass("ms-dialog", "product-dialog");
    expect(dialog).toHaveAttribute("data-scope", "account");
    expect(document.querySelector(".ms-dialog-scrim")).toHaveClass(
      "product-overlay",
    );
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
        <Dialog open>
          <DialogContent title="Portaled dialog">Body</DialogContent>
        </Dialog>
      </MonosetProvider>,
    );

    expect(
      within(portal).getByRole("dialog", { name: "Portaled dialog" }),
    ).toBeInTheDocument();
    expect(portal.querySelector(".ms-dialog-scrim")).toBeInTheDocument();

    portal.remove();
  });

  it("supports controlled close, Escape, and focus return", async () => {
    const user = userEvent.setup();

    function ControlledDialog() {
      const [open, setOpen] = useState(false);
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>Open account</DialogTrigger>
          <DialogContent title="Account">
            <button>Focusable action</button>
            <DialogClose>Done</DialogClose>
          </DialogContent>
        </Dialog>
      );
    }

    render(<ControlledDialog />);
    const trigger = screen.getByRole("button", { name: "Open account" });

    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Account" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Focusable action" }),
    ).toHaveFocus();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Done" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  });

  it("preserves consumer content props and event handlers", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Dialog open>
        <DialogContent
          title="Preferences"
          description="Choose how the app behaves."
          onClick={onClick}
          aria-describedby="custom-description"
        >
          <p id="custom-description">Consumer description</p>
          <button>Update</button>
        </DialogContent>
      </Dialog>,
    );

    const dialog = screen.getByRole("dialog", { name: "Preferences" });
    expect(dialog).toHaveAttribute("aria-describedby", "custom-description");
    await user.click(screen.getByRole("button", { name: "Update" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has no obvious accessibility violations", async () => {
    render(
      <Dialog open>
        <DialogContent
          title="Preferences"
          description="Choose how the app behaves."
        >
          <button>Save preferences</button>
        </DialogContent>
      </Dialog>,
    );

    expect(
      await axe(screen.getByRole("dialog", { name: "Preferences" })),
    ).toHaveNoViolations();
  });
});

describe("Sheet", () => {
  it("forwards the content ref, portals through the provider, and composes classes", () => {
    const portal = document.createElement("section");
    document.body.append(portal);
    const ref = createRef<HTMLDivElement>();

    render(
      <MonosetProvider
        portal={{ container: portal }}
        tooltip={false}
        toast={false}
        motion={false}
      >
        <Sheet open>
          <SheetContent
            ref={ref}
            title="Filters"
            className="product-sheet"
            overlayClassName="product-overlay"
          >
            Body
          </SheetContent>
        </Sheet>
      </MonosetProvider>,
    );

    const sheet = within(portal).getByRole("dialog", { name: "Filters" });
    expect(ref.current).toBe(sheet);
    expect(sheet).toHaveClass("ms-sheet", "ms-sheet--right", "product-sheet");
    expect(portal.querySelector(".ms-sheet-scrim")).toHaveClass(
      "product-overlay",
    );

    portal.remove();
  });

  it.each<[SheetSide, string | number, string, string]>([
    ["left", "20rem", "width", "20rem"],
    ["right", 420, "width", "420px"],
    ["top", "35vh", "height", "35vh"],
    ["bottom", 280, "height", "280px"],
  ])("applies %s placement and size", (side, size, property, expected) => {
    render(
      <Sheet open>
        <SheetContent title={`${side} sheet`} side={side} size={size}>
          Body
        </SheetContent>
      </Sheet>,
    );

    const sheet = screen.getByRole("dialog", { name: `${side} sheet` });
    expect(sheet).toHaveClass(`ms-sheet--${side}`);
    expect(sheet.style.getPropertyValue(property)).toBe(expected);
  });

  it("lets consumer styles win and preserves content handlers", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Sheet open>
        <SheetContent
          title="Styled sheet"
          side="left"
          size={320}
          style={{ width: "44rem", maxWidth: "90vw" }}
          onClick={onClick}
          data-product="billing"
        >
          <button>Continue</button>
        </SheetContent>
      </Sheet>,
    );

    const sheet = screen.getByRole("dialog", { name: "Styled sheet" });
    expect(sheet.style.width).toBe("44rem");
    expect(sheet.style.maxWidth).toBe("90vw");
    expect(sheet).toHaveAttribute("data-product", "billing");
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("keeps the built-in close button accessible and supports hiding it", () => {
    const { rerender } = render(
      <Sheet open>
        <SheetContent title="Visible close">Body</SheetContent>
      </Sheet>,
    );

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();

    rerender(
      <Sheet open>
        <SheetContent title="Hidden close" showClose={false}>
          <SheetClose>Finish</SheetClose>
        </SheetContent>
      </Sheet>,
    );

    expect(
      screen.queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Finish" })).toBeInTheDocument();
  });

  it("supports controlled close, Escape, and focus return", async () => {
    const user = userEvent.setup();

    function ControlledSheet() {
      const [open, setOpen] = useState(false);
      return (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>Open filters</SheetTrigger>
          <SheetContent title="Filters">
            <button>First filter</button>
          </SheetContent>
        </Sheet>
      );
    }

    render(<ControlledSheet />);
    const trigger = screen.getByRole("button", { name: "Open filters" });

    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Filters" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  });

  it("has no obvious accessibility violations", async () => {
    render(
      <Sheet open>
        <SheetContent title="Filters" description="Narrow the results.">
          <button>Apply filters</button>
        </SheetContent>
      </Sheet>,
    );

    expect(
      await axe(screen.getByRole("dialog", { name: "Filters" })),
    ).toHaveNoViolations();
  });
});
