import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field, Input, Textarea } from "../index";

describe("Field", () => {
  it("composes directly with Input and Textarea", () => {
    render(
      <>
        <Field label="Email"><Input /></Field>
        <Field label="Notes"><Textarea /></Field>
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Notes" })).toBeInTheDocument();
  });

  it("keeps native label activation intact", async () => {
    const user = userEvent.setup();
    render(<Field label="Email"><Input /></Field>);
    await user.click(screen.getByText("Email"));
    expect(document.activeElement).toBe(screen.getByRole("textbox", { name: "Email" }));
  });

  it("propagates required and invalid state without letting a control erase them", () => {
    render(
      <>
        <Field label="Email" required invalid>
          <Input required={false} invalid={false} aria-invalid={false} />
        </Field>
        <Field label="Notes" error="Notes are required">
          <Textarea required={false} invalid={false} aria-invalid={false} />
        </Field>
      </>,
    );

    expect(screen.getByRole("textbox", { name: /Email/ })).toBeRequired();
    expect(screen.getByRole("textbox", { name: /Email/ })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("textbox", { name: "Notes" })).toHaveAttribute("aria-invalid", "true");
  });

  it("renders description and error together and describes the control once with each", () => {
    render(
      <Field label="Email" description="Used for receipts" error="Enter a valid email">
        <Input />
      </Field>,
    );

    const control = screen.getByRole("textbox", { name: "Email" });
    const description = screen.getByText("Used for receipts");
    const error = screen.getByText("Enter a valid email");
    const ids = control.getAttribute("aria-describedby")?.split(/\s+/) ?? [];

    expect(ids).toEqual([description.id, error.id]);
    expect(new Set(ids).size).toBe(2);
    expect(document.querySelectorAll(`#${CSS.escape(description.id)}`)).toHaveLength(1);
    expect(document.querySelectorAll(`#${CSS.escape(error.id)}`)).toHaveLength(1);
  });

  it("uses id for the control and rootId for the wrapper", () => {
    render(
      <Field label="Email" id="account-email" rootId="email-field" data-testid="field">
        <Input id="ignored-control-id" />
      </Field>,
    );

    expect(screen.getByTestId("field")).toHaveAttribute("id", "email-field");
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("id", "account-email");
  });

  it("forwards its root ref and native div props", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Field ref={ref} label="Email" data-state="ready" aria-live="polite">
        <Input />
      </Field>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute("data-state", "ready");
    expect(ref.current).toHaveAttribute("aria-live", "polite");
  });

  it("merges and deduplicates consumer descriptions", () => {
    render(
      <>
        <span id="external-note">External note</span>
        <Field label="Email" id="email" description="Internal note">
          <Input aria-describedby="external-note email-description external-note" />
        </Field>
      </>,
    );

    const ids = screen.getByRole("textbox", { name: "Email" })
      .getAttribute("aria-describedby")?.split(/\s+/) ?? [];
    expect(ids).toEqual(["external-note", "email-description"]);
  });

  it("keeps native control behavior outside Field", () => {
    render(
      <>
        <span id="standalone-note">Standalone note</span>
        <Input id="standalone-input" required aria-describedby="standalone-note" aria-invalid="grammar" />
        <Textarea id="standalone-textarea" invalid aria-describedby="standalone-note" />
      </>,
    );

    expect(document.getElementById("standalone-input")).toBeInTheDocument();
    expect(document.getElementById("standalone-input")).toHaveAttribute("aria-invalid", "grammar");
    expect(document.getElementById("standalone-input")).toHaveAttribute("aria-describedby", "standalone-note");
    expect(document.getElementById("standalone-textarea")).toHaveAttribute("aria-invalid", "true");
  });

  it("passes Field state to a custom control", () => {
    render(
      <Field label="Country" id="country" description="Billing country" required invalid>
        <Field.Control>
          {(controlProps) => <button type="button" {...controlProps}>Choose a country</button>}
        </Field.Control>
      </Field>,
    );

    const trigger = screen.getByRole("button", { name: "Country" });
    const description = screen.getByText("Billing country");
    expect(trigger).toHaveAttribute("id", "country");
    expect(trigger).toHaveAttribute("required");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveAttribute("aria-describedby", description.id);
  });

  it("throws a clear error when Field.Control is used outside Field", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(
      <Field.Control>{(props) => <button {...props}>Broken</button>}</Field.Control>,
    )).toThrow("Field.Control must be used within Field");
    error.mockRestore();
  });

  it("does not add dangling description ids", () => {
    render(
      <>
        <span id="external-only">External description</span>
        <Field label="Email" error={null} description={null}>
          <Input aria-describedby="external-only" />
        </Field>
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
      "aria-describedby",
      "external-only",
    );
  });
});
