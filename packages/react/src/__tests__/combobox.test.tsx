import { createRef } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Combobox, Field, MonosetProvider } from "../index";

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
  return document.querySelector<HTMLButtonElement>(".ms-combobox__button")!;
}

function option(name: string) {
  return screen.getByRole("option", { name: new RegExp(`^${name}`) });
}

describe("Combobox", () => {
  it("renders one editable, named input instead of a trigger plus search field", () => {
    render(
      <Combobox
        aria-label="City"
        name="city"
        autoComplete="address-level2"
        placeholder="Choose a city"
        options={options}
      />,
    );

    const input = comboInput();
    expect(input).toHaveAttribute("placeholder", "Choose a city");
    expect(input).toHaveAttribute("autocomplete", "address-level2");
    expect(input).toHaveAttribute("aria-autocomplete", "list");
    expect(document.querySelectorAll("input[type='text']")).toHaveLength(1);
    expect(document.querySelector("input[type='hidden'][name='city']")).toBeInTheDocument();
  });

  it("supports controlled and uncontrolled string values", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const first = render(
      <Combobox
        aria-label="City"
        options={options}
        defaultValue="helsinki"
        onValueChange={onValueChange}
      />,
    );
    expect(comboInput()).toHaveValue("Helsinki");
    await user.click(openButton());
    await user.click(option("Copenhagen"));
    expect(comboInput()).toHaveValue("Copenhagen");
    expect(onValueChange).toHaveBeenLastCalledWith("copenhagen");
    first.unmount();

    const { rerender } = render(
      <Combobox
        aria-label="City"
        options={options}
        value="helsinki"
        onValueChange={onValueChange}
      />,
    );
    await user.click(openButton());
    await user.click(option("Copenhagen"));
    expect(onValueChange).toHaveBeenLastCalledWith("copenhagen");
    expect(comboInput()).toHaveValue("Helsinki");
    rerender(
      <Combobox
        aria-label="City"
        options={options}
        value="copenhagen"
        onValueChange={onValueChange}
      />,
    );
    expect(comboInput()).toHaveValue("Copenhagen");
  });

  it("exposes controlled input text without allowing custom values", async () => {
    const user = userEvent.setup();
    const onInputValueChange = vi.fn();
    const { rerender } = render(
      <Combobox
        aria-label="City"
        options={options}
        inputValue="Hel"
        onInputValueChange={onInputValueChange}
      />,
    );

    await user.type(comboInput(), "sinki");
    expect(onInputValueChange).toHaveBeenCalled();
    expect(comboInput()).toHaveValue("Hel");
    rerender(
      <Combobox
        aria-label="City"
        options={options}
        inputValue="Helsinki"
        onInputValueChange={onInputValueChange}
      />,
    );
    expect(comboInput()).toHaveValue("Helsinki");
  });

  it("filters by label, description, and keywords", async () => {
    const user = userEvent.setup();
    render(<Combobox aria-label="City" options={options} />);

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
    render(<Combobox aria-label="City" options={options} filter={filter} />);

    await user.type(comboInput(), "cop");
    expect(option("Copenhagen")).toBeInTheDocument();
    expect(filter).toHaveBeenCalledWith("cop", expect.objectContaining({ value: "copenhagen" }));
  });

  it("uses distinct text values to disambiguate duplicate visible labels", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        aria-label="Region"
        options={[
          { value: "fi", label: "Nordic", textValue: "Finland" },
          { value: "se", label: "Nordic", textValue: "Sweden" },
        ]}
      />,
    );

    await user.type(comboInput(), "Finland");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(option("Nordic")).toBeInTheDocument();
  });

  it("throws for duplicate values or case-insensitive effective text values", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => render(
        <Combobox
          aria-label="Region"
          options={[
            { value: "fi", label: "Nordic", textValue: "Region" },
            { value: "se", label: "Baltic", textValue: "region" },
          ]}
        />,
      )).toThrow(/unique textValue/i);
      expect(() => render(
        <Combobox
          aria-label="Region"
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
    render(
      <Combobox
        aria-label="City"
        options={options}
        emptyMessage="No matching cities"
      />,
    );

    await user.type(comboInput(), "Atlantis");
    expect(await screen.findByText("No matching cities")).toBeInTheDocument();
    await user.tab();
    expect(comboInput()).toHaveValue("");
  });

  it("lets React Aria own active-descendant navigation and skips disabled options", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox aria-label="City" options={options} onValueChange={onValueChange} />,
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
    expect(onValueChange).toHaveBeenCalledWith("copenhagen");
    expect(comboInput()).toHaveValue("Copenhagen");
  });

  it("supports controlled and default open state and restores focus on Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    const defaultOpenRender = render(
      <Combobox aria-label="Default city" options={options} defaultOpen />,
    );
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    defaultOpenRender.unmount();

    const { rerender } = render(
      <Combobox aria-label="City" options={options} open onOpenChange={onOpenChange} />,
    );
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    await user.click(comboInput());
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    rerender(
      <Combobox aria-label="City" options={options} open={false} onOpenChange={onOpenChange} />,
    );
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(document.activeElement).toBe(comboInput());
  });

  it("maps disabled, read-only, required, and invalid states", () => {
    const first = render(
      <Combobox
        aria-label="City"
        options={options}
        disabled
        required
        invalid
      />,
    );
    expect(comboInput()).toBeDisabled();
    expect(comboInput()).toBeRequired();
    expect(comboInput()).toHaveAttribute("aria-invalid", "true");
    expect(document.querySelector(".ms-combobox")).toHaveAttribute("data-disabled");
    expect(document.querySelector(".ms-combobox")).toHaveAttribute("data-required");
    expect(document.querySelector(".ms-combobox")).toHaveAttribute("data-invalid");
    first.unmount();

    render(<Combobox aria-label="City" options={options} readOnly />);
    expect(comboInput()).toHaveAttribute("readonly");
    expect(document.querySelector(".ms-combobox")).toHaveAttribute("data-readonly");
  });

  it("integrates with Field.Control and focuses the editable input from its label", async () => {
    const user = userEvent.setup();
    render(
      <Field
        id="home-city"
        label="Home city"
        description="Used for local times."
        error="Choose an available city."
        required
        invalid
      >
        <Field.Control>
          {(fieldProps) => <Combobox {...fieldProps} options={options} />}
        </Field.Control>
      </Field>,
    );

    const input = screen.getByRole("combobox", { name: "Home city" });
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(
      "Used for local times. Choose an available city.",
    );
    await user.click(screen.getByText("Home city"));
    expect(document.activeElement).toBe(input);
  });

  it("updates available options and the selected label when options are replaced", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Combobox aria-label="City" options={options} value="helsinki" />,
    );
    expect(comboInput()).toHaveValue("Helsinki");

    const replacementOptions = [
      { value: "helsinki", label: "Helsinki, Finland" },
      { value: "oslo", label: "Oslo", description: "Norway" },
    ];
    rerender(
      <Combobox aria-label="City" options={replacementOptions} value="helsinki" />,
    );

    await waitFor(() => expect(comboInput()).toHaveValue("Helsinki, Finland"));
    await user.click(openButton());
    expect(option("Helsinki, Finland")).toBeInTheDocument();
    expect(option("Oslo")).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /^Copenhagen/ })).not.toBeInTheDocument();
  });

  it("filters duplicate labels by disambiguated text and selects that text", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        aria-label="Office"
        options={[
          {
            value: "springfield-il",
            label: "Springfield",
            textValue: "Springfield, Illinois",
            description: "Illinois",
            keywords: ["midwest"],
          },
          {
            value: "springfield-ma",
            label: "Springfield",
            textValue: "Springfield, Massachusetts",
            description: "Massachusetts",
            keywords: ["new england"],
          },
        ]}
      />,
    );

    await user.type(comboInput(), "new england");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    const matchingOption = option("Springfield");
    expect(matchingOption).toHaveTextContent("Massachusetts");
    await user.click(matchingOption);
    expect(comboInput()).toHaveValue("Springfield, Massachusetts");
  });

  it("rejects duplicate effective text values", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => render(
        <Combobox
          aria-label="Office"
          options={[
            { value: "springfield-il", label: "Springfield", description: "Illinois" },
            { value: "springfield-ma", label: "Springfield", description: "Massachusetts" },
          ]}
        />,
      )).toThrow(/unique textValue/i);
    } finally {
      consoleError.mockRestore();
    }
  });

  it("serializes the selected key and resets uncontrolled value and input state", async () => {
    const user = userEvent.setup();
    render(
      <form data-testid="form">
        <Combobox
          aria-label="City"
          name="city"
          options={options}
          defaultValue="helsinki"
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const form = screen.getByTestId("form") as HTMLFormElement;
    expect(new FormData(form).getAll("city")).toEqual(["helsinki"]);

    await user.click(openButton());
    await user.click(option("Copenhagen"));
    expect(new FormData(form).getAll("city")).toEqual(["copenhagen"]);
    await user.click(screen.getByRole("button", { name: "Reset" }));
    await waitFor(() => expect(comboInput()).toHaveValue("Helsinki"));
    expect(new FormData(form).getAll("city")).toEqual(["helsinki"]);
  });

  it("honors an external form owner", () => {
    render(
      <>
        <form id="city-form" data-testid="city-form" />
        <Combobox
          aria-label="City"
          form="city-form"
          name="city"
          options={options}
          defaultValue="helsinki"
        />
      </>,
    );
    expect(new FormData(screen.getByTestId("city-form") as HTMLFormElement).get("city")).toBe(
      "helsinki",
    );
  });

  it("omits a disabled named combobox from form data", () => {
    render(
      <form data-testid="disabled-form">
        <Combobox
          aria-label="City"
          name="city"
          options={options}
          defaultValue="helsinki"
          disabled
        />
      </form>,
    );

    expect(
      new FormData(screen.getByTestId("disabled-form") as HTMLFormElement).has("city"),
    ).toBe(false);
  });

  it("uses the provider portal container", async () => {
    const user = userEvent.setup();
    const portal = document.createElement("div");
    document.body.append(portal);
    const { unmount } = render(
      <MonosetProvider portal={{ container: portal }}>
        <Combobox aria-label="City" options={options} />
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

  it("forwards the root ref, id, classes, data attributes, and ARIA relationships", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLDivElement>();
    render(
      <Combobox
        ref={ref}
        id="city"
        aria-label="City"
        aria-describedby="city-help"
        data-owner="checkout"
        className="city-root"
        inputClassName="city-input"
        popoverClassName="city-popover"
        options={options}
      />,
    );

    expect(ref.current).toBe(document.querySelector(".ms-combobox"));
    expect(ref.current).toHaveAttribute("id", "city");
    expect(ref.current).toHaveAttribute("data-owner", "checkout");
    expect(ref.current).toHaveClass("city-root");
    expect(comboInput()).toHaveClass("city-input");
    expect(comboInput()).toHaveAttribute("aria-describedby", "city-help");
    await user.click(openButton());
    expect(document.querySelector(".ms-combobox__panel")).toHaveClass("city-popover");
  });

  it("has no accessibility violations while closed or open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Combobox aria-label="City" options={options} />);
    expect(await axe(container)).toHaveNoViolations();
    await user.click(openButton());
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
    expect(await axe(document.querySelector<HTMLElement>(".ms-combobox__panel")!))
      .toHaveNoViolations();
  });
});
