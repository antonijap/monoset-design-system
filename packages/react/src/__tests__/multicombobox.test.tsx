import { createRef } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { MonosetProvider, MultiCombobox } from "../index";

const options = [
  {
    value: "helsinki",
    label: "Helsinki",
    description: "Finland",
    keywords: ["suomi", "hel"],
  },
  {
    value: "stockholm",
    label: "Stockholm",
    description: "Sweden",
    keywords: ["sverige"],
    disabled: true,
  },
  {
    value: "copenhagen",
    label: "Copenhagen",
    description: "Denmark",
    keywords: ["kobenhavn"],
  },
];

function comboInput() {
  return screen.getByRole("combobox");
}

function openButton() {
  return document.querySelector<HTMLButtonElement>(".ms-multicombobox__button")!;
}

function option(name: string) {
  return screen.getByRole("option", { name: new RegExp(`^${name}`) });
}

describe("MultiCombobox", () => {
  it("uses one editable input for combobox semantics and renders selected tags as siblings", () => {
    render(
      <MultiCombobox
        aria-label="Cities"
        name="cities"
        autoComplete="address-level2"
        placeholder="Choose cities"
        options={options}
        defaultValue={["helsinki"]}
      />,
    );

    const input = comboInput();
    const root = document.querySelector(".ms-multicombobox");
    const tags = document.querySelector(".ms-multicombobox__tags");
    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveAttribute("placeholder", "Choose cities");
    expect(input).toHaveAttribute("autocomplete", "address-level2");
    expect(input).toHaveAttribute("aria-autocomplete", "list");
    expect(document.querySelectorAll("input[type='text']")).toHaveLength(1);
    expect(tags?.closest(".ms-multicombobox")).toBe(root);
    expect(tags?.parentElement).toBe(input.parentElement);
    expect(tags?.closest("button")).toBeNull();
    expect(screen.getByRole("button", { name: "Remove Helsinki" })).toBeInTheDocument();
  });

  it("supports controlled and uncontrolled string-array values", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const first = render(
      <MultiCombobox
        aria-label="Cities"
        options={options}
        defaultValue={["helsinki"]}
        onValueChange={onValueChange}
      />,
    );
    expect(screen.getByText("Helsinki", { selector: ".ms-multicombobox__tag-label" }))
      .toBeInTheDocument();
    await user.click(openButton());
    await user.click(option("Copenhagen"));
    expect(screen.getByText("Copenhagen", { selector: ".ms-multicombobox__tag-label" }))
      .toBeInTheDocument();
    expect(onValueChange).toHaveBeenLastCalledWith(["helsinki", "copenhagen"]);
    first.unmount();

    const { rerender } = render(
      <MultiCombobox
        aria-label="Cities"
        options={options}
        value={["helsinki"]}
        onValueChange={onValueChange}
      />,
    );
    await user.click(openButton());
    await user.click(option("Copenhagen"));
    expect(onValueChange).toHaveBeenLastCalledWith(["helsinki", "copenhagen"]);
    expect(screen.queryByText("Copenhagen", { selector: ".ms-multicombobox__tag-label" }))
      .not.toBeInTheDocument();
    rerender(
      <MultiCombobox
        aria-label="Cities"
        options={options}
        value={["helsinki", "copenhagen"]}
        onValueChange={onValueChange}
      />,
    );
    expect(screen.getByText("Copenhagen", { selector: ".ms-multicombobox__tag-label" }))
      .toBeInTheDocument();
  });

  it("exposes controlled input text without allowing custom selected values", async () => {
    const user = userEvent.setup();
    const onInputValueChange = vi.fn();
    const { rerender } = render(
      <MultiCombobox
        aria-label="Cities"
        options={options}
        inputValue="Hel"
        onInputValueChange={onInputValueChange}
      />,
    );

    await user.type(comboInput(), "sinki");
    expect(onInputValueChange).toHaveBeenCalled();
    expect(comboInput()).toHaveValue("Hel");
    rerender(
      <MultiCombobox
        aria-label="Cities"
        options={options}
        inputValue="Atlantis"
        onInputValueChange={onInputValueChange}
      />,
    );
    await user.keyboard("{Enter}");
    expect(document.querySelectorAll(".ms-multicombobox__tag")).toHaveLength(0);
  });

  it("filters by label, description, and keywords", async () => {
    const user = userEvent.setup();
    render(<MultiCombobox aria-label="Cities" options={options} />);

    await user.type(comboInput(), "denmark");
    expect(option("Copenhagen")).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /^Helsinki/ })).not.toBeInTheDocument();

    await user.clear(comboInput());
    await user.type(comboInput(), "suomi");
    expect(option("Helsinki")).toBeInTheDocument();
  });

  it("accepts a custom option filter", async () => {
    const user = userEvent.setup();
    const filter = vi.fn((query: string, item: (typeof options)[number]) =>
      item.value.startsWith(query.toLowerCase()),
    );
    render(<MultiCombobox aria-label="Cities" options={options} filter={filter} />);

    await user.type(comboInput(), "cop");
    expect(option("Copenhagen")).toBeInTheDocument();
    expect(filter).toHaveBeenCalledWith("cop", expect.objectContaining({ value: "copenhagen" }));
  });

  it("uses distinct text values to disambiguate duplicate visible labels", async () => {
    const user = userEvent.setup();
    render(
      <MultiCombobox
        aria-label="Regions"
        options={[
          { value: "fi", label: "Nordic", textValue: "Finland" },
          { value: "se", label: "Nordic", textValue: "Sweden" },
        ]}
        defaultValue={["fi", "se"]}
      />,
    );

    expect(screen.getByRole("button", { name: "Remove Finland" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove Sweden" })).toBeInTheDocument();
    const toggle = openButton();
    await user.type(comboInput(), "Finland");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(option("Nordic")).toBeInTheDocument();
    await user.clear(comboInput());
    await user.type(comboInput(), "Sweden");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(option("Nordic")).toBeInTheDocument();
    await user.click(toggle);
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
  });

  it("throws when options have duplicate effective text values", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => render(
        <MultiCombobox
          aria-label="Regions"
          options={[
            { value: "fi", label: "Nordic", textValue: "Region" },
            { value: "se", label: "Baltic", textValue: "region" },
          ]}
        />,
      )).toThrow(/unique textValue/i);
    } finally {
      consoleError.mockRestore();
    }
  });

  it("throws when options have duplicate values", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => render(
        <MultiCombobox
          aria-label="Regions"
          options={[
            { value: "region", label: "Nordic" },
            { value: "region", label: "Baltic" },
          ]}
        />,
      )).toThrow(/unique value/i);
    } finally {
      consoleError.mockRestore();
    }
  });

  it("shows an empty message and rejects unmatched custom text", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <MultiCombobox
        aria-label="Cities"
        options={options}
        emptyMessage="No matching cities"
        onValueChange={onValueChange}
      />,
    );

    await user.type(comboInput(), "Atlantis");
    expect(await screen.findByText("No matching cities")).toBeInTheDocument();
    await user.keyboard("{Enter}");
    expect(onValueChange).not.toHaveBeenCalled();
    expect(document.querySelectorAll(".ms-multicombobox__tag")).toHaveLength(0);
  });

  it("lets React Aria own active-descendant navigation and skip disabled options", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <MultiCombobox aria-label="Cities" options={options} onValueChange={onValueChange} />,
    );

    await user.click(comboInput());
    await user.keyboard("{ArrowDown}");
    expect(comboInput()).toHaveAttribute("aria-expanded", "true");
    const firstActive = comboInput().getAttribute("aria-activedescendant");
    expect(firstActive).toBeTruthy();
    expect(document.getElementById(firstActive!)).toHaveTextContent("Helsinki");

    await user.keyboard("{ArrowDown}");
    const secondActive = comboInput().getAttribute("aria-activedescendant");
    expect(document.getElementById(secondActive!)).toHaveTextContent("Copenhagen");
    expect(option("Stockholm")).toHaveAttribute("aria-disabled", "true");
    await user.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenLastCalledWith(["copenhagen"]);
    expect(comboInput()).toHaveValue("");
    expect(comboInput()).toHaveAttribute("aria-expanded", "true");
  });

  it("supports controlled and default open state and restores focus on Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    const defaultOpenRender = render(
      <MultiCombobox aria-label="Default cities" options={options} defaultOpen />,
    );
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    defaultOpenRender.unmount();

    const { rerender } = render(
      <MultiCombobox aria-label="Cities" options={options} open onOpenChange={onOpenChange} />,
    );
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    await user.click(comboInput());
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    rerender(
      <MultiCombobox aria-label="Cities" options={options} open={false} onOpenChange={onOpenChange} />,
    );
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(document.activeElement).toBe(comboInput());
  });

  it("maps disabled, read-only, required, and invalid states", () => {
    const first = render(
      <MultiCombobox
        aria-label="Cities"
        options={options}
        disabled
        required
        invalid
      />,
    );
    expect(comboInput()).toBeDisabled();
    expect(comboInput()).toBeRequired();
    expect(comboInput()).toHaveAttribute("aria-invalid", "true");
    expect(document.querySelector(".ms-multicombobox")).toHaveAttribute("data-disabled");
    expect(document.querySelector(".ms-multicombobox")).toHaveAttribute("data-required");
    expect(document.querySelector(".ms-multicombobox")).toHaveAttribute("data-invalid");
    expect(screen.queryByRole("button", { name: /^Remove / })).not.toBeInTheDocument();
    first.unmount();

    render(
      <MultiCombobox
        aria-label="Cities"
        options={options}
        defaultValue={["helsinki"]}
        readOnly
      />,
    );
    expect(comboInput()).toHaveAttribute("readonly");
    expect(document.querySelector(".ms-multicombobox")).toHaveAttribute("data-readonly");
    expect(screen.queryByRole("button", { name: "Remove Helsinki" })).not.toBeInTheDocument();
  });

  it("requires a selection rather than query text and restores required state on removal and reset", async () => {
    const user = userEvent.setup();
    render(
      <form data-testid="required-form">
        <MultiCombobox aria-label="Cities" name="cities" options={options} required />
        <button type="reset">Reset required cities</button>
      </form>,
    );
    const form = screen.getByTestId("required-form") as HTMLFormElement;
    const input = comboInput() as HTMLInputElement;
    const toggle = openButton();

    expect(input.required).toBe(true);
    expect(form.checkValidity()).toBe(false);
    await user.click(toggle);
    await user.click(option("Copenhagen"));
    expect(input.required).toBe(false);
    expect(form.checkValidity()).toBe(true);

    await user.click(toggle);
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: "Remove Copenhagen" }));
    expect(input.required).toBe(true);
    expect(form.checkValidity()).toBe(false);

    await user.click(toggle);
    await user.click(option("Helsinki"));
    await user.click(toggle);
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: "Reset required cities" }));
    await waitFor(() => expect(input.required).toBe(true));
    expect(form.checkValidity()).toBe(false);
  });

  it("does not allow a disabled selected option to be removed", () => {
    render(
      <MultiCombobox
        aria-label="Cities"
        options={options}
        defaultValue={["helsinki", "stockholm"]}
      />,
    );
    expect(screen.getByRole("button", { name: "Remove Helsinki" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Remove Stockholm" })).not.toBeInTheDocument();
    expect(screen.getByText("Stockholm", { selector: ".ms-multicombobox__tag-label" }))
      .toBeInTheDocument();
  });

  it("removes tags with buttons and Backspace removes the last removable tag for an empty query", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <MultiCombobox
        aria-label="Cities"
        options={options}
        defaultValue={["helsinki", "stockholm", "copenhagen"]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Remove Helsinki" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["stockholm", "copenhagen"]);
    await user.click(comboInput());
    await user.keyboard("{Backspace}");
    expect(onValueChange).toHaveBeenLastCalledWith(["stockholm"]);
    await user.keyboard("{Backspace}");
    expect(onValueChange).toHaveBeenCalledTimes(2);

    await user.type(comboInput(), "query");
    await user.keyboard("{Backspace}");
    expect(onValueChange).toHaveBeenCalledTimes(2);
  });

  it("pastes enabled exact value or label matches and preserves unmatched tokens as query", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <MultiCombobox
        aria-label="Cities"
        options={options}
        defaultValue={["helsinki"]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(comboInput());
    await user.paste("HELSINKI, Copenhagen\nAtlantis\nStockholm, helsinki");
    expect(onValueChange).toHaveBeenLastCalledWith(["helsinki", "copenhagen"]);
    expect(comboInput()).toHaveValue("Atlantis, Stockholm");
    expect(screen.getByText("Copenhagen", { selector: ".ms-multicombobox__tag-label" }))
      .toBeInTheDocument();
  });

  it("pastes exact text values but preserves ambiguous visible labels", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <MultiCombobox
        aria-label="Regions"
        options={[
          { value: "fi", label: "Nordic", textValue: "Finland" },
          { value: "se", label: "Nordic", textValue: "Sweden" },
        ]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(comboInput());
    await user.paste("FINLAND, Nordic");
    expect(onValueChange).toHaveBeenLastCalledWith(["fi"]);
    expect(comboInput()).toHaveValue("Nordic");
  });

  it("serializes repeated keys and resets uncontrolled selection and input state", async () => {
    const user = userEvent.setup();
    render(
      <form data-testid="form">
        <MultiCombobox
          aria-label="Cities"
          name="cities"
          options={options}
          defaultValue={["helsinki"]}
          defaultInputValue="suomi"
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const form = screen.getByTestId("form") as HTMLFormElement;
    const input = comboInput();
    const reset = screen.getByRole("button", { name: "Reset" });
    const toggle = openButton();
    expect(new FormData(form).getAll("cities")).toEqual(["helsinki"]);
    expect(input).toHaveValue("suomi");

    await user.clear(input);
    if (!screen.queryByRole("listbox")) await user.click(openButton());
    await user.click(option("Copenhagen"));
    await user.type(input, "den");
    expect(new FormData(form).getAll("cities")).toEqual(["helsinki", "copenhagen"]);
    await user.click(toggle);
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    await user.click(reset);
    await waitFor(() => expect(input).toHaveValue("suomi"));
    expect(new FormData(form).getAll("cities")).toEqual(["helsinki"]);
    expect(screen.queryByText("Copenhagen", { selector: ".ms-multicombobox__tag-label" }))
      .not.toBeInTheDocument();
  });

  it("honors an external form owner and omits a disabled control", () => {
    render(
      <>
        <form id="city-form" data-testid="city-form" />
        <MultiCombobox
          aria-label="Cities"
          form="city-form"
          name="cities"
          options={options}
          defaultValue={["helsinki", "copenhagen"]}
        />
        <MultiCombobox
          aria-label="Disabled cities"
          form="city-form"
          name="disabled-cities"
          options={options}
          defaultValue={["helsinki"]}
          disabled
        />
        <MultiCombobox
          aria-label="Empty cities"
          form="city-form"
          name="empty-cities"
          options={options}
        />
      </>,
    );
    const formData = new FormData(screen.getByTestId("city-form") as HTMLFormElement);
    expect(formData.getAll("cities")).toEqual(["helsinki", "copenhagen"]);
    expect(formData.has("disabled-cities")).toBe(false);
    expect(formData.has("empty-cities")).toBe(false);
  });

  it("uses the provider portal container", async () => {
    const user = userEvent.setup();
    const portal = document.createElement("div");
    document.body.append(portal);
    const { unmount } = render(
      <MonosetProvider portal={{ container: portal }}>
        <MultiCombobox aria-label="Cities" options={options} />
      </MonosetProvider>,
    );
    try {
      await user.click(openButton());
      expect(await within(portal).findByRole("listbox")).toBeInTheDocument();
    } finally {
      unmount();
      portal.remove();
    }
  });

  it("forwards root metadata, classes, data attributes, and ARIA relationships", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLDivElement>();
    render(
      <MultiCombobox
        ref={ref}
        id="cities"
        title="Destination cities"
        aria-label="Cities"
        aria-describedby="cities-help"
        aria-errormessage="cities-error"
        data-owner="checkout"
        className="cities-root"
        inputClassName="cities-input"
        popoverClassName="cities-popover"
        options={options}
      />,
    );

    expect(ref.current).toBe(document.querySelector(".ms-multicombobox"));
    expect(ref.current).toHaveAttribute("id", "cities");
    expect(ref.current).toHaveAttribute("title", "Destination cities");
    expect(ref.current).toHaveAttribute("data-owner", "checkout");
    expect(ref.current).toHaveClass("cities-root");
    expect(comboInput()).toHaveClass("cities-input");
    expect(comboInput()).toHaveAttribute("aria-describedby", "cities-help");
    expect(comboInput()).toHaveAttribute("aria-errormessage", "cities-error");
    await user.click(openButton());
    expect(document.querySelector(".ms-multicombobox__panel")).toHaveClass("cities-popover");
  });

  it("has no accessibility violations while closed or open with tags", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MultiCombobox
        aria-label="Cities"
        options={options}
        defaultValue={["helsinki", "stockholm"]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
    await user.click(openButton());
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
    expect(await axe(document.querySelector<HTMLElement>(".ms-multicombobox__panel")!))
      .toHaveNoViolations();
  });
});
