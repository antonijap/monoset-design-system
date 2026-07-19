import { createRef, useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PinInput } from "../index";

function cells() {
  return Array.from(document.querySelectorAll<HTMLInputElement>(".ms-pininput__cell"));
}

function cellValues() {
  return cells().map((cell) => cell.value);
}

describe("PinInput", () => {
  it("keeps later cells fixed when a middle cell is cleared and replaced", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <PinInput
        aria-label="Security code"
        length={4}
        defaultValue="1234"
        onValueChange={onValueChange}
      />,
    );

    await user.clear(cells()[1]);
    expect(cellValues()).toEqual(["1", "", "3", "4"]);
    expect(onValueChange).toHaveBeenLastCalledWith("134");

    await user.type(cells()[1], "9");
    expect(cellValues()).toEqual(["1", "9", "3", "4"]);
    expect(onValueChange).toHaveBeenLastCalledWith("1934");
  });

  it("preserves a fixed-slot controlled edit when the parent echoes the flattened value", async () => {
    const user = userEvent.setup();

    function ControlledPin() {
      const [value, setValue] = useState("1234");
      return (
        <PinInput
          aria-label="Security code"
          length={4}
          value={value}
          onValueChange={setValue}
        />
      );
    }

    render(<ControlledPin />);
    await user.clear(cells()[1]);
    expect(cellValues()).toEqual(["1", "", "3", "4"]);

    await user.type(cells()[1], "9");
    expect(cellValues()).toEqual(["1", "9", "3", "4"]);
  });

  it("focuses the next cell after replacing a cleared middle cell in controlled mode", async () => {
    const user = userEvent.setup();

    function ControlledPin() {
      const [value, setValue] = useState("123456");
      return (
        <PinInput
          aria-label="Security code"
          length={6}
          value={value}
          onValueChange={setValue}
        />
      );
    }

    render(<ControlledPin />);
    await user.click(cells()[2]);
    await user.keyboard("{Backspace}7");

    expect(cellValues()).toEqual(["1", "2", "7", "4", "5", "6"]);
    expect(document.activeElement).toBe(cells()[3]);
  });

  it("resynchronizes slots for a genuinely external controlled value", () => {
    const { rerender } = render(
      <PinInput aria-label="Security code" length={4} value="1234" />,
    );
    rerender(<PinInput aria-label="Security code" length={4} value="87" />);

    expect(cellValues()).toEqual(["8", "7", "", ""]);
  });

  it("pastes from the active cell, filters each character, and focuses the next empty cell", () => {
    const onValueChange = vi.fn();
    render(
      <PinInput
        aria-label="Security code"
        length={6}
        defaultValue="12"
        onValueChange={onValueChange}
      />,
    );

    cells()[2].focus();
    fireEvent.paste(cells()[2], {
      clipboardData: { getData: () => "a3-b4" },
    });

    expect(cellValues()).toEqual(["1", "2", "3", "4", "", ""]);
    expect(onValueChange).toHaveBeenLastCalledWith("1234");
    expect(document.activeElement).toBe(cells()[4]);
  });

  it("distributes a multi-character OTP autofill change from the active cell", () => {
    const onValueChange = vi.fn();
    render(
      <PinInput
        aria-label="Security code"
        length={5}
        defaultValue="1"
        onValueChange={onValueChange}
      />,
    );

    fireEvent.change(cells()[1], { target: { value: "a2-34" } });

    expect(cellValues()).toEqual(["1", "2", "3", "4", ""]);
    expect(onValueChange).toHaveBeenLastCalledWith("1234");
    expect(document.activeElement).toBe(cells()[4]);
  });

  it("resets stateful regular expressions before testing every character", () => {
    render(
      <PinInput
        aria-label="Invite code"
        length={4}
        pattern={/[A-Z]/g}
      />,
    );

    fireEvent.paste(cells()[0], {
      clipboardData: { getData: () => "ABCD" },
    });
    expect(cellValues()).toEqual(["A", "B", "C", "D"]);
    expect(cells()[0]).toHaveAttribute("inputmode", "text");
  });

  it("resanitizes existing slots when the pattern changes", () => {
    const { rerender } = render(
      <PinInput
        aria-label="Invite code"
        length={4}
        defaultValue="A1B2"
        pattern={/^[A-Z0-9]$/}
      />,
    );

    rerender(<PinInput aria-label="Invite code" length={4} defaultValue="A1B2" />);
    expect(cellValues()).toEqual(["1", "2", "", ""]);
  });

  it("fires onComplete once per transition into a complete code", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    const { rerender } = render(
      <PinInput
        aria-label="Security code"
        length={2}
        defaultValue="1"
        onComplete={onComplete}
      />,
    );

    await user.type(cells()[1], "2");
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenLastCalledWith("12");

    rerender(
      <PinInput
        aria-label="Security code"
        length={2}
        defaultValue="1"
        onComplete={onComplete}
        className="rerendered"
      />,
    );
    expect(onComplete).toHaveBeenCalledTimes(1);

    await user.clear(cells()[1]);
    await user.type(cells()[1], "3");
    expect(onComplete).toHaveBeenCalledTimes(2);
    expect(onComplete).toHaveBeenLastCalledWith("13");
  });

  it("supports form submission, external forms, reset, and disabled omission", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <>
        <form id="verification" />
        <PinInput
          aria-label="Security code"
          length={4}
          defaultValue="12"
          name="code"
          form="verification"
        />
      </>,
    );

    await user.type(cells()[2], "3");
    expect(new FormData(document.querySelector("form")!).get("code")).toBe("123");

    fireEvent.reset(document.querySelector("form")!);
    await waitFor(() => expect(cellValues()).toEqual(["1", "2", "", ""]));
    expect(new FormData(document.querySelector("form")!).get("code")).toBe("12");

    rerender(
      <>
        <form id="verification" />
        <PinInput
          aria-label="Security code"
          length={4}
          defaultValue="12"
          name="code"
          form="verification"
          disabled
        />
      </>,
    );
    expect(new FormData(document.querySelector("form")!).has("code")).toBe(false);
  });

  it("uses native required validity until every cell is filled", async () => {
    const user = userEvent.setup();
    render(
      <form>
        <PinInput aria-label="Security code" length={2} required name="code" />
      </form>,
    );

    expect(document.querySelector("form")!.checkValidity()).toBe(false);
    await user.type(cells()[0], "1");
    expect(document.querySelector("form")!.checkValidity()).toBe(false);
    await user.type(cells()[1], "2");
    expect(document.querySelector("form")!.checkValidity()).toBe(true);
  });

  it("supports disabled, read-only, invalid, mask, and autofocus states", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <PinInput
        aria-label="Security code"
        length={2}
        disabled
        autoFocus
        invalid
        mask
        onValueChange={onValueChange}
      />,
    );

    expect(cells()[0]).toBeDisabled();
    expect(cells()[0]).toHaveAttribute("type", "password");
    expect(screen.getByRole("group")).toHaveAttribute("aria-invalid", "true");
    expect(document.activeElement).not.toBe(cells()[0]);

    rerender(
      <PinInput
        aria-label="Security code"
        length={2}
        readOnly
        autoFocus
        onValueChange={onValueChange}
      />,
    );
    expect(cells()[0]).toHaveAttribute("readonly");
    await waitFor(() => expect(document.activeElement).toBe(cells()[0]));
    await user.type(cells()[0], "1");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("forwards root metadata, ARIA metadata, data attributes, and the root ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <PinInput
        ref={ref}
        id="security-code"
        title="Enter the code"
        className="custom-pin"
        aria-label="Security code"
        aria-describedby="code-help"
        aria-errormessage="code-error"
        data-size="large"
      />,
    );

    const group = screen.getByRole("group", { name: "Security code" });
    expect(ref.current).toBe(group);
    expect(group).toHaveAttribute("id", "security-code");
    expect(group).toHaveAttribute("title", "Enter the code");
    expect(group).toHaveClass("ms-pininput", "custom-pin");
    expect(group).toHaveAttribute("aria-describedby", "code-help");
    expect(group).toHaveAttribute("aria-errormessage", "code-error");
    expect(group).toHaveAttribute("data-size", "large");
  });

  it("uses aria-labelledby without masking it with the fallback label", () => {
    render(
      <>
        <span id="pin-label">Recovery code</span>
        <PinInput aria-labelledby="pin-label" />
      </>,
    );

    const group = screen.getByRole("group", { name: "Recovery code" });
    expect(group).not.toHaveAttribute("aria-label");
  });

  it("uses numeric input mode for the default digit pattern and supports arrow navigation", async () => {
    const user = userEvent.setup();
    render(<PinInput aria-label="Security code" length={3} />);

    expect(cells()[0]).toHaveAttribute("inputmode", "numeric");
    cells()[1].focus();
    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(cells()[0]);
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(cells()[1]);
    await user.keyboard("{Backspace}");
    expect(document.activeElement).toBe(cells()[0]);
  });

  it("rejects invalid lengths", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => render(<PinInput length={0} />)).toThrow(/positive finite integer/i);
      expect(() => render(<PinInput length={2.5} />)).toThrow(/positive finite integer/i);
      expect(() => render(<PinInput length={Number.POSITIVE_INFINITY} />)).toThrow(
        /positive finite integer/i,
      );
    } finally {
      consoleError.mockRestore();
    }
  });
});
