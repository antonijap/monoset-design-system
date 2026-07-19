import { createRef, useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { Field, NumberInput } from "../index";

describe("NumberInput", () => {
  it("supports uncontrolled values and emits committed changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <NumberInput
        aria-label="Quantity"
        defaultValue={2}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Quantity" });
    await user.click(screen.getByRole("button", { name: /Increase/ }));

    expect(input).toHaveValue("3");
    expect(onValueChange).toHaveBeenLastCalledWith(3);
  });

  it("keeps controlled values authoritative", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <NumberInput aria-label="Quantity" value={2} onValueChange={onValueChange} />,
    );

    const input = screen.getByRole("textbox", { name: "Quantity" });
    await user.click(screen.getByRole("button", { name: /Increase/ }));
    expect(onValueChange).toHaveBeenLastCalledWith(3);
    expect(input).toHaveValue("2");

    rerender(<NumberInput aria-label="Quantity" value={3} onValueChange={onValueChange} />);
    expect(input).toHaveValue("3");
  });

  it("keeps controlled null controlled and maps an empty commit to null", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <NumberInput aria-label="Quantity" value={null} onValueChange={onValueChange} />,
    );

    const input = screen.getByRole("textbox", { name: "Quantity" });
    expect(input).toHaveValue("");

    await user.click(screen.getByRole("button", { name: /Increase/ }));
    expect(onValueChange).toHaveBeenCalledWith(0);
    expect(input).toHaveValue("");
  });

  it("starts an uncontrolled null value empty", async () => {
    const user = userEvent.setup();
    render(<NumberInput aria-label="Optional count" defaultValue={null} />);

    const input = screen.getByRole("textbox", { name: "Optional count" });
    expect(input).toHaveValue("");
    await user.click(screen.getByRole("button", { name: /Increase/ }));
    expect(input).toHaveValue("0");
  });

  it("preserves empty and intermediate negative drafts until commit", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <NumberInput
        aria-label="Temperature"
        defaultValue={4}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Temperature" });
    await user.clear(input);
    expect(input).toHaveValue("");
    expect(onValueChange).not.toHaveBeenCalled();

    await user.type(input, "-");
    expect(input).toHaveValue("-");
    expect(onValueChange).not.toHaveBeenCalled();

    await user.clear(input);
    await user.tab();
    expect(onValueChange).toHaveBeenLastCalledWith(null);
    expect(input).toHaveValue("");
  });

  it("uses locale-aware decimal drafts and parsing", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <NumberInput
        aria-label="Price"
        locale="de-DE"
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Price" });
    await user.type(input, "1,");
    expect(input).toHaveValue("1,");
    expect(onValueChange).not.toHaveBeenCalled();

    await user.type(input, "5");
    await user.tab();
    expect(onValueChange).toHaveBeenLastCalledWith(1.5);
    expect(input).toHaveValue("1,5");
  });

  it("clamps and snaps only when a draft is committed", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <NumberInput
        aria-label="Rating"
        defaultValue={5}
        min={0}
        max={10}
        step={2}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Rating" });
    await user.clear(input);
    await user.type(input, "15");
    expect(input).toHaveValue("15");
    expect(onValueChange).not.toHaveBeenCalled();

    await user.tab();
    expect(onValueChange).toHaveBeenLastCalledWith(10);
    expect(input).toHaveValue("10");
  });

  it("steps floating-point values without precision artifacts", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <NumberInput
        aria-label="Opacity"
        defaultValue={0.1}
        step={0.1}
        onValueChange={onValueChange}
      />,
    );

    const increment = screen.getByRole("button", { name: /Increase/ });
    await user.click(increment);
    await user.click(increment);

    expect(screen.getByRole("textbox", { name: "Opacity" })).toHaveValue("0.3");
    expect(onValueChange).toHaveBeenLastCalledWith(0.3);
  });

  it("supports keyboard stepping and optional stepper buttons", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <NumberInput
        aria-label="Guests"
        defaultValue={2}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Guests" });
    await user.click(input);
    await user.keyboard("{ArrowUp}{ArrowDown}");
    expect(onValueChange).toHaveBeenNthCalledWith(1, 3);
    expect(onValueChange).toHaveBeenNthCalledWith(2, 2);

    rerender(<NumberInput aria-label="Guests" defaultValue={2} hideStepper />);
    expect(screen.queryByRole("button", { name: /Increase/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Decrease/ })).not.toBeInTheDocument();
  });

  it("disables unavailable bounds and all interaction when disabled or read only", () => {
    const { rerender } = render(
      <NumberInput key="minimum" aria-label="Bounded" defaultValue={0} min={0} max={1} />,
    );

    expect(screen.getByRole("button", { name: /Decrease/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Increase/ })).toBeEnabled();

    rerender(<NumberInput key="maximum" aria-label="Bounded" value={1} min={0} max={1} />);
    expect(screen.getByRole("button", { name: /Increase/ })).toBeDisabled();

    rerender(<NumberInput aria-label="Bounded" value={1} disabled />);
    expect(screen.getByRole("textbox", { name: "Bounded" })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Increase/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Decrease/ })).toBeDisabled();

    rerender(<NumberInput aria-label="Bounded" value={1} readOnly />);
    expect(screen.getByRole("textbox", { name: "Bounded" })).toHaveAttribute("readonly");
    expect(screen.getByRole("button", { name: /Increase/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Decrease/ })).toBeDisabled();
  });

  it("places Field.Control metadata on the actual input", async () => {
    const user = userEvent.setup();
    render(
      <Field
        label="Quantity"
        id="quantity"
        description="Whole items only"
        error="Choose another quantity"
        required
      >
        <Field.Control>
          {(controlProps) => <NumberInput {...controlProps} />}
        </Field.Control>
      </Field>,
    );

    const input = screen.getByRole("textbox", { name: "Quantity" });
    const description = screen.getByText("Whole items only");
    const error = screen.getByText("Choose another quantity");
    expect(input).toHaveAttribute("id", "quantity");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")?.split(/\s+/)).toEqual([
      description.id,
      error.id,
    ]);
    expect(document.querySelectorAll("#quantity")).toHaveLength(1);

    await user.click(screen.getByText("Quantity"));
    expect(document.activeElement).toBe(input);
  });

  it("supports named internal and external forms and omits disabled values", async () => {
    const user = userEvent.setup();
    render(
      <>
        <form data-testid="internal-form">
          <NumberInput aria-label="Internal" name="internal" defaultValue={2} />
        </form>
        <form id="external-form" data-testid="external-form" />
        <NumberInput
          aria-label="External"
          name="external"
          form="external-form"
          defaultValue={5}
        />
        <NumberInput
          aria-label="Disabled"
          name="disabled"
          form="external-form"
          defaultValue={8}
          disabled
        />
      </>,
    );

    const internal = screen.getByTestId("internal-form") as HTMLFormElement;
    const external = screen.getByTestId("external-form") as HTMLFormElement;
    expect(new FormData(internal).get("internal")).toBe("2");
    expect(new FormData(external).get("external")).toBe("5");
    expect(new FormData(external).get("disabled")).toBeNull();

    await user.click(screen.getAllByRole("button", { name: /Increase/ })[0]);
    expect(new FormData(internal).get("internal")).toBe("3");

    fireEvent.reset(internal);
    await waitFor(() => expect(new FormData(internal).get("internal")).toBe("2"));
    expect(screen.getByRole("textbox", { name: "Internal" })).toHaveValue("2");
  });

  it("keeps wrapper and input metadata, classes, events, and refs distinct", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const { container } = render(
      <>
        <span id="amount-help">Enter an amount</span>
        <span id="amount-error">Enter a valid amount</span>
        <NumberInput
          ref={ref}
          id="amount"
          aria-label="Amount"
          aria-describedby="amount-help"
          aria-errormessage="amount-error"
          title="Invoice amount"
          autoComplete="transaction-amount"
          className="amount-root"
          inputClassName="amount-input"
          data-testid="amount-root"
          data-state="ready"
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </>,
    );

    const root = screen.getByTestId("amount-root");
    const input = screen.getByRole("textbox", { name: "Amount" });
    expect(root).toBe(container.querySelector(".ms-numberinput"));
    expect(root).toHaveClass("amount-root");
    expect(root).toHaveAttribute("data-state", "ready");
    expect(root).toHaveAttribute("title", "Invoice amount");
    expect(input).toHaveClass("ms-numberinput__input", "amount-input");
    expect(input).toHaveAttribute("id", "amount");
    expect(input).toHaveAttribute("aria-describedby", "amount-help");
    expect(input).toHaveAttribute("aria-errormessage", "amount-error");
    expect(input).toHaveAttribute("autocomplete", "transaction-amount");
    expect(ref.current).toBe(input);
    expect(container.querySelectorAll("#amount")).toHaveLength(1);

    await user.click(input);
    await user.tab();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("updates through a controlled state owner", async () => {
    const user = userEvent.setup();
    function ControlledNumberInput() {
      const [value, setValue] = useState<number | null>(null);
      return (
        <NumberInput aria-label="Score" value={value} onValueChange={setValue} />
      );
    }

    render(<ControlledNumberInput />);
    await user.click(screen.getByRole("button", { name: /Increase/ }));
    expect(screen.getByRole("textbox", { name: "Score" })).toHaveValue("0");
  });

  it("formats values with Intl number format options", () => {
    render(
      <NumberInput
        aria-label="Progress"
        value={0.25}
        formatOptions={{ style: "percent" }}
        hideStepper
      />,
    );

    expect(screen.getByRole("textbox", { name: "Progress" })).toHaveValue("25%");
  });

  it("has no obvious accessibility violations", async () => {
    const { container } = render(
      <Field label="Quantity" description="Between one and ten">
        <Field.Control>
          {(controlProps) => (
            <NumberInput {...controlProps} min={1} max={10} defaultValue={2} />
          )}
        </Field.Control>
      </Field>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
