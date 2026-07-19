import { createRef, useState } from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import {
  CalendarDate,
  DatePicker,
  Field,
  MonosetProvider,
} from "../index";

function openButton() {
  return document.querySelector<HTMLButtonElement>(".ms-datepicker__button")!;
}

function segment(type: "month" | "day" | "year") {
  return document.querySelector<HTMLElement>(`.ms-datepicker__segment[data-type="${type}"]`)!;
}

async function axeWithRacHiddenInputLabel(root: HTMLElement) {
  const hiddenInputs = Array.from(
    root.querySelectorAll<HTMLInputElement>(
      ".ms-datepicker__trigger > input[type='text'][hidden][data-rac]",
    ),
  );
  const labels = hiddenInputs.map((input) => input.getAttribute("aria-label"));
  hiddenInputs.forEach((input) => input.setAttribute("aria-label", "Date value"));
  try {
    return await axe(root);
  } finally {
    hiddenInputs.forEach((input, index) => {
      const label = labels[index];
      if (label === null) input.removeAttribute("aria-label");
      else input.setAttribute("aria-label", label);
    });
  }
}

function submittedValues(form: HTMLFormElement, name: string) {
  // happy-dom does not honor form="" as an explicit form-owner override. RAC
  // uses it on its mobile date-input shim so browsers exclude that input.
  const racMobileShims = Array.from(
    form.querySelectorAll<HTMLInputElement>(`input[type='date'][name='${name}'][form='']`),
  );
  const disabledStates = racMobileShims.map((input) => input.disabled);
  racMobileShims.forEach((input) => { input.disabled = true; });
  try {
    return new FormData(form).getAll(name);
  } finally {
    racMobileShims.forEach((input, index) => { input.disabled = disabledStates[index]; });
  }
}

describe("DatePicker", () => {
  it("renders an accessible segmented input with a default label", () => {
    render(<DatePicker locale="en-US" defaultValue={new CalendarDate(2026, 6, 10)} />);

    expect(segment("month")).toHaveAttribute("role", "spinbutton");
    expect(segment("month")).toHaveTextContent("6");
    expect(segment("day")).toHaveTextContent("10");
    expect(segment("year")).toHaveTextContent("2026");
    expect(document.querySelector("[data-type='hour']")).not.toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Date" })).toBeInTheDocument();
  });

  it("supports controlled CalendarDate values without changing them internally", async () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <DatePicker
        locale="en-US"
        value={new CalendarDate(2026, 6, 10)}
        onValueChange={onValueChange}
      />,
    );

    rerender(
      <DatePicker
        locale="en-US"
        value={new CalendarDate(2027, 7, 11)}
        onValueChange={onValueChange}
      />,
    );
    expect(segment("month")).toHaveTextContent("7");
    expect(segment("day")).toHaveTextContent("11");
    expect(segment("year")).toHaveTextContent("2027");
  });

  it("opens a named calendar dialog from the icon button", async () => {
    const user = userEvent.setup();
    render(<DatePicker locale="en-US" defaultValue={new CalendarDate(2026, 6, 10)} />);

    await user.click(openButton());
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    const calendar = document.querySelector<HTMLElement>(".ms-calendar")!;
    expect(calendar.querySelector("[role='grid']")).toBeInTheDocument();
    expect(calendar.querySelectorAll("[role='gridcell'] [tabindex='0']")).toHaveLength(1);
  });

  it("localizes calendar trigger and navigation labels", () => {
    render(
      <DatePicker
        locale="de-DE"
        defaultOpen
        defaultValue={new CalendarDate(2026, 6, 10)}
      />,
    );
    expect(openButton()).toHaveAccessibleName(expect.stringMatching(/Kalender/i));
    expect(document.querySelector(".ms-calendar__nav[slot='previous']")).toHaveAccessibleName(
      "Zurück",
    );
    expect(document.querySelector(".ms-calendar__nav[slot='next']")).toHaveAccessibleName(
      "Weiter",
    );
  });

  it("selects a CalendarDate and closes the popover", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        locale="en-US"
        defaultValue={new CalendarDate(2026, 6, 10)}
        onValueChange={onValueChange}
      />,
    );

    await user.click(openButton());
    await user.click(screen.getByRole("button", { name: /Thursday, June 11, 2026/i }));

    expect(onValueChange).toHaveBeenCalledWith(new CalendarDate(2026, 6, 11));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(segment("day")).toHaveTextContent("11");
    expect(document.activeElement).toBe(openButton());
  });

  it("clears an uncontrolled value, closes, and restores trigger focus", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        locale="en-US"
        defaultValue={new CalendarDate(2026, 6, 10)}
        onValueChange={onValueChange}
      />,
    );

    await user.click(openButton());
    await user.click(screen.getByRole("button", { name: "Clear date" }));

    expect(onValueChange).toHaveBeenCalledWith(null);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(segment("month")).toHaveAttribute("data-placeholder");
    expect(document.activeElement).toBe(openButton());
  });

  it("clears a controlled value and closes without changing controlled state", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        locale="en-US"
        value={new CalendarDate(2026, 6, 10)}
        onValueChange={onValueChange}
      />,
    );

    await user.click(openButton());
    await user.click(screen.getByRole("button", { name: "Clear date" }));
    expect(onValueChange).toHaveBeenCalledWith(null);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(segment("day")).toHaveTextContent("10");
  });

  it("can hide the clear action", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        locale="en-US"
        defaultValue={new CalendarDate(2026, 6, 10)}
        clearable={false}
      />,
    );
    await user.click(openButton());
    expect(screen.queryByRole("button", { name: "Clear date" })).not.toBeInTheDocument();
  });

  it("dismisses with Escape and returns focus to the open button", async () => {
    const user = userEvent.setup();
    render(<DatePicker locale="en-US" defaultValue={new CalendarDate(2026, 6, 10)} />);
    await user.click(openButton());
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.activeElement).toBe(openButton());
  });

  it("maps disabled, read only, required, and invalid states", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<DatePicker locale="en-US" disabled />);
    const root = document.querySelector<HTMLElement>(".ms-datepicker")!;
    expect(root).toHaveAttribute("data-disabled");
    expect(openButton()).toBeDisabled();
    await user.click(openButton());
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(<DatePicker locale="en-US" readOnly required invalid />);
    const group = screen.getByRole("group", { name: "Date" });
    expect(root).toHaveAttribute("data-readonly");
    expect(root).toHaveAttribute("data-required");
    expect(root).toHaveAttribute("data-invalid");
    expect(group).toHaveAttribute("aria-required", "true");
    expect(group).toHaveAttribute("aria-invalid", "true");
  });

  it("integrates with Field.Control without leaking state attributes", () => {
    render(
      <Field
        label="Birthday"
        id="birthday"
        description="Used for age checks"
        error="Choose a valid birthday"
        required
      >
        <Field.Control>
          {(controlProps) => <DatePicker {...controlProps} locale="en-US" />}
        </Field.Control>
      </Field>,
    );

    const group = screen.getByRole("group", { name: "Birthday" });
    const root = document.querySelector<HTMLElement>(".ms-datepicker")!;
    expect(group).toHaveAttribute("id", "birthday");
    expect(group).toHaveAttribute(
      "aria-describedby",
      "birthday-description birthday-error",
    );
    expect(group).toHaveAttribute("aria-required", "true");
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(root).not.toHaveAttribute("required");
    expect(root).not.toHaveAttribute("invalid");

    const focus = vi.spyOn(segment("month"), "focus").mockImplementation(() => {});
    fireEvent.click(screen.getByText("Birthday"));
    expect(focus).toHaveBeenCalledOnce();
  });

  it("serializes its date into a named form value", () => {
    const { rerender } = render(
      <form data-testid="form">
        <DatePicker
          locale="en-US"
          name="due"
          autoComplete="bday"
          defaultValue={new CalendarDate(2026, 6, 10)}
        />
      </form>,
    );

    const form = screen.getByTestId("form") as HTMLFormElement;
    expect(submittedValues(form, "due")).toEqual(["2026-06-10"]);
    expect(screen.getByTestId("hidden-dateinput-container").querySelector("input")).toHaveAttribute(
      "autocomplete",
      "bday",
    );

    rerender(
      <form data-testid="form">
        <DatePicker
          locale="en-US"
          name="due"
          autoComplete="bday"
          defaultValue={new CalendarDate(2026, 6, 10)}
          disabled
        />
      </form>,
    );
    expect(submittedValues(screen.getByTestId("form") as HTMLFormElement, "due")).toEqual([]);
  });

  it("supports external form association and native form reset", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <>
        <form id="appointment-form" data-testid="external-form" />
        <DatePicker
          locale="en-US"
          form="appointment-form"
          name="due"
          defaultValue={new CalendarDate(2026, 6, 10)}
        />
      </>,
    );
    const externalForm = screen.getByTestId("external-form") as HTMLFormElement;
    expect(submittedValues(externalForm, "due")).toEqual(["2026-06-10"]);

    rerender(
      <form data-testid="reset-form">
        <DatePicker
          locale="en-US"
          name="due"
          defaultValue={new CalendarDate(2026, 6, 10)}
        />
      </form>,
    );
    await user.click(openButton());
    await user.click(screen.getByRole("button", { name: /Thursday, June 11, 2026/i }));
    expect(segment("day")).toHaveTextContent("11");
    fireEvent.reset(screen.getByTestId("reset-form"));
    await waitFor(() => expect(segment("day")).toHaveTextContent("10"));
    expect(submittedValues(screen.getByTestId("reset-form") as HTMLFormElement, "due")).toEqual([
      "2026-06-10",
    ]);
  });

  it("supports controlled and uncontrolled open state callbacks", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const first = render(
      <DatePicker
        locale="en-US"
        defaultOpen
        defaultValue={new CalendarDate(2026, 6, 10)}
        onOpenChange={onOpenChange}
      />,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    first.unmount();

    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <DatePicker
          locale="en-US"
          open={open}
          onOpenChange={(next) => {
            onOpenChange(next);
            setOpen(next);
          }}
        />
      );
    }
    render(<Controlled />);
    await user.click(openButton());
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("forwards bounds, unavailable dates, locale, week start, and week count", async () => {
    const user = userEvent.setup();
    const unavailable = vi.fn((date: CalendarDate) => date.day === 12);
    render(
      <DatePicker
        locale="en-US"
        defaultOpen
        defaultValue={new CalendarDate(2026, 6, 10)}
        min={new CalendarDate(2026, 6, 5)}
        max={new CalendarDate(2026, 6, 20)}
        isDateUnavailable={unavailable}
        firstDayOfWeek="mon"
        weeksInMonth={5}
      />,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog.querySelectorAll(".ms-calendar__weekday")[0]).toHaveTextContent("Mon");
    expect(dialog.querySelectorAll(".ms-calendar__body > tr")).toHaveLength(5);
    expect(screen.getByRole("button", { name: /Thursday, June 4, 2026/i })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("button", { name: /Friday, June 12, 2026/i })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("button", { name: /Sunday, June 21, 2026/i })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(unavailable).toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: /Friday, June 12, 2026/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("portals into the Monoset provider container", async () => {
    const user = userEvent.setup();
    const portal = document.createElement("div");
    portal.dataset.testid = "portal";
    document.body.append(portal);
    const view = render(
      <MonosetProvider portal={{ container: portal }} tooltip={false} toast={false} motion={false}>
        <DatePicker locale="en-US" defaultValue={new CalendarDate(2026, 6, 10)} />
      </MonosetProvider>,
    );
    await user.click(openButton());
    expect(within(portal).getByRole("dialog")).toBeInTheDocument();
    view.unmount();
    portal.remove();
  });

  it("forwards root refs, classes, and safe native data and aria props", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <DatePicker
        ref={ref}
        locale="en-US"
        className="custom-picker"
        data-track="birthday"
        aria-live="polite"
        title="Birthday picker"
      />,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass("ms-datepicker", "custom-picker");
    expect(ref.current).toHaveAttribute("data-track", "birthday");
    const group = screen.getByRole("group", { name: "Date" });
    expect(group).toHaveAttribute("aria-live", "polite");
    expect(group).toHaveAttribute("title", "Birthday picker");
    expect(ref.current).not.toHaveAttribute("aria-live");
  });

  it("has no obvious accessibility violations closed or open", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DatePicker
        locale="en-US"
        aria-label="Appointment date"
        defaultValue={new CalendarDate(2026, 6, 10)}
      />,
    );
    expect(await axeWithRacHiddenInputLabel(container)).toHaveNoViolations();
    await user.click(openButton());
    expect(await axeWithRacHiddenInputLabel(document.body)).toHaveNoViolations();
  });
});
