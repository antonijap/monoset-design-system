import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar, Field, Input } from "../index";

describe("React v1 component contracts", () => {
  it("derives avatar initials from a name", async () => {
    render(<Avatar name="Ada Turing" />);

    expect(await screen.findByText("AT")).toBeInTheDocument();
  });

  it("composes Field directly with a control and valid descriptions", () => {
    const renderField = () =>
      render(
        <Field label="Email" description="Help" error="Invalid">
          <Input />
        </Field>,
      );

    expect(renderField).not.toThrow();

    const control = screen.getByRole("textbox", { name: "Email" });
    const description = screen.getByText("Help");
    const error = screen.getByText("Invalid");
    const describedByIds = control.getAttribute("aria-describedby")?.split(/\s+/);

    expect(description.id).toBeTruthy();
    expect(error.id).toBeTruthy();
    expect(describedByIds).toEqual(expect.arrayContaining([description.id, error.id]));
    expect(describedByIds).toHaveLength(2);
    expect(control).toHaveAttribute("aria-invalid", "true");
  });
});
