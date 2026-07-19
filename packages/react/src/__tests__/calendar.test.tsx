import { createRef, useState } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import {
  Calendar,
  CalendarDate,
  calendarDateFromNativeDate,
  calendarDateToNativeDate,
} from "../index";

function dateCell(name: RegExp) {
  return screen.getByRole("button", { name });
}

async function focus(element: HTMLElement) {
  await act(async () => element.focus());
}

async function pressKey(element: Element, key: string) {
  await act(async () => fireEvent.keyDown(element, { key }));
}

describe("Calendar", () => {
  it("converts between native dates and calendar dates", () => {
    const native = new Date(2026, 5, 10, 18, 30);
    expect(calendarDateFromNativeDate(native)).toEqual(new CalendarDate(2026, 6, 10));

    const converted = calendarDateToNativeDate(new CalendarDate(2026, 6, 10), "UTC");
    expect(converted.toISOString()).toBe("2026-06-10T00:00:00.000Z");
  });

  it("has one tabbable date and initially focuses the selected date", async () => {
    const first = render(<Calendar defaultValue={new CalendarDate(2026, 6, 10)} locale="en-US" />);

    const cells = screen.getAllByRole("button").filter((cell) => cell.closest("[role='gridcell']"));
    expect(cells.filter((cell) => cell.tabIndex === 0)).toHaveLength(1);
    expect(dateCell(/Wednesday, June 10, 2026/i)).toHaveAttribute("tabindex", "0");
    expect(document.activeElement).not.toBe(dateCell(/Wednesday, June 10, 2026/i));
    first.unmount();

    render(
      <Calendar defaultValue={new CalendarDate(2026, 6, 10)} locale="en-US" autoFocus />,
    );
    expect(document.activeElement).toBe(dateCell(/Wednesday, June 10, 2026/i));
  });

  it("supports day, week, row, and month keyboard navigation", async () => {
    render(<Calendar defaultFocusedValue={new CalendarDate(2026, 6, 10)} locale="en-US" />);
    const start = dateCell(/Wednesday, June 10, 2026/i);
    await focus(start);

    await pressKey(start, "ArrowLeft");
    expect(document.activeElement).toBe(dateCell(/Tuesday, June 9, 2026/i));
    await pressKey(document.activeElement!, "ArrowRight");
    expect(document.activeElement).toBe(start);
    await pressKey(document.activeElement!, "ArrowUp");
    expect(document.activeElement).toBe(dateCell(/Wednesday, June 3, 2026/i));
    await pressKey(document.activeElement!, "ArrowDown");
    expect(document.activeElement).toBe(start);
    await pressKey(document.activeElement!, "Home");
    expect(document.activeElement).toBe(dateCell(/Monday, June 1, 2026/i));
    await pressKey(document.activeElement!, "End");
    expect(document.activeElement).toBe(dateCell(/Tuesday, June 30, 2026/i));
    await pressKey(document.activeElement!, "PageUp");
    expect(document.querySelector(".ms-calendar__month")).toHaveTextContent("May 2026");
    await pressKey(document.activeElement!, "PageDown");
    expect(document.querySelector(".ms-calendar__month")).toHaveTextContent("June 2026");
  });

  it("moves the visible month when focus crosses its boundary", async () => {
    render(<Calendar defaultFocusedValue={new CalendarDate(2026, 6, 1)} locale="en-US" />);
    const start = dateCell(/Monday, June 1, 2026/i);
    await focus(start);
    await pressKey(start, "ArrowLeft");
    expect(document.querySelector(".ms-calendar__month")).toHaveTextContent("May 2026");
    expect(document.activeElement).toBe(dateCell(/Sunday, May 31, 2026/i));
  });

  it("supports controlled focus", async () => {
    function Example() {
      const [focusedValue, setFocusedValue] = useState(new CalendarDate(2026, 6, 10));
      return (
        <>
          <Calendar focusedValue={focusedValue} onFocusChange={setFocusedValue} locale="en-US" />
          <output>{focusedValue.toString()}</output>
        </>
      );
    }
    render(<Example />);
    const start = dateCell(/Wednesday, June 10, 2026/i);
    await focus(start);
    await pressKey(start, "ArrowRight");
    expect(await screen.findByText("2026-06-11")).toBeInTheDocument();
  });

  it("enforces minimum, maximum, and unavailable dates", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        defaultFocusedValue={new CalendarDate(2026, 6, 10)}
        min={new CalendarDate(2026, 6, 5)}
        max={new CalendarDate(2026, 6, 20)}
        isDateUnavailable={(date) => date.day === 12}
        onValueChange={onValueChange}
        locale="en-US"
      />,
    );

    const beforeMin = dateCell(/Thursday, June 4, 2026/i);
    const afterMax = dateCell(/Sunday, June 21, 2026/i);
    const unavailable = dateCell(/Friday, June 12, 2026/i);
    expect(beforeMin).toHaveAttribute("aria-disabled", "true");
    expect(afterMax).toHaveAttribute("aria-disabled", "true");
    expect(unavailable).toHaveAttribute("aria-disabled", "true");
    await focus(unavailable);
    expect(document.activeElement).toBe(unavailable);
    await user.click(unavailable);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("exposes read-only state without presenting dates as disabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        defaultValue={new CalendarDate(2026, 6, 10)}
        onValueChange={onValueChange}
        readOnly
        locale="en-US"
      />,
    );
    const calendar = document.querySelector<HTMLElement>(".ms-calendar")!;
    const nextDate = dateCell(/Thursday, June 11, 2026/i);
    expect(calendar).toHaveAttribute("data-readonly");
    expect(nextDate).not.toHaveAttribute("aria-disabled", "true");
    await user.click(nextDate);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("uses the requested first day of the week", () => {
    const { rerender } = render(
      <Calendar defaultFocusedValue={new CalendarDate(2026, 6, 10)} firstDayOfWeek="mon" locale="en-US" />,
    );
    expect(screen.getAllByRole("columnheader", { hidden: true })[0]).toHaveTextContent(/mon/i);

    rerender(<Calendar defaultFocusedValue={new CalendarDate(2026, 6, 10)} firstDayOfWeek="sun" locale="en-US" />);
    expect(screen.getAllByRole("columnheader", { hidden: true })[0]).toHaveTextContent(/sun/i);
  });

  it("keeps outside-month dates visible but nonselectable", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        defaultFocusedValue={new CalendarDate(2026, 6, 10)}
        onValueChange={onValueChange}
        locale="en-US"
      />,
    );
    const outside = dateCell(/Sunday, May 31, 2026/i);
    expect(outside).toBeVisible();
    expect(outside).toHaveAttribute("data-outside-month");
    expect(outside).toHaveAttribute("aria-disabled", "true");
    await user.click(outside);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("supports uncontrolled selection", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        defaultValue={new CalendarDate(2026, 6, 10)}
        onValueChange={onValueChange}
        locale="en-US"
      />,
    );
    await user.click(dateCell(/Thursday, June 11, 2026/i));
    expect(onValueChange).toHaveBeenLastCalledWith(new CalendarDate(2026, 6, 11));
    expect(dateCell(/Thursday, June 11, 2026/i)).toHaveAttribute("data-selected");
  });

  it("supports controlled selection", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        value={new CalendarDate(2026, 6, 15)}
        onValueChange={onValueChange}
        locale="en-US"
      />,
    );
    await user.click(dateCell(/Tuesday, June 16, 2026/i));
    expect(onValueChange).toHaveBeenLastCalledWith(new CalendarDate(2026, 6, 16));
    expect(dateCell(/Monday, June 15, 2026/i)).toHaveAttribute("data-selected");
  });

  it("forwards its ref and native data props", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Calendar
        ref={ref}
        defaultFocusedValue={new CalendarDate(2026, 6, 10)}
        data-state="ready"
        id="release-calendar"
        locale="en-US"
      />,
    );
    expect(ref.current).toHaveAttribute("id", "release-calendar");
    expect(ref.current).toHaveAttribute("data-state", "ready");
    expect(ref.current).toHaveAccessibleName("June 2026");
  });

  it("uses aria-labelledby without adding a hardcoded default label", () => {
    render(
      <>
        <span id="calendar-label">Release date</span>
        <Calendar
          aria-labelledby="calendar-label"
          defaultFocusedValue={new CalendarDate(2026, 6, 10)}
          locale="en-US"
        />
      </>,
    );
    const calendar = document.querySelector(".ms-calendar");
    expect(calendar).toHaveAttribute("aria-labelledby", expect.stringContaining("calendar-label"));
    expect(calendar).not.toHaveAttribute("aria-label", "Calendar");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Calendar defaultValue={new CalendarDate(2026, 6, 10)} aria-label="Choose a date" locale="en-US" />,
    );
    await waitFor(async () => expect(await axe(container)).toHaveNoViolations());
  });
});
