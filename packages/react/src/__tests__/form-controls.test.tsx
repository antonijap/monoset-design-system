import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import {
  Checkbox,
  Field,
  PasswordInput,
  Slider,
  Switch,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from "../index";
import { readComponentStyles } from "./style-source";

const componentStyles = readComponentStyles();

describe("Checkbox", () => {
  it("follows Radix state for uncontrolled clicks and label activation", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Checkbox className="choice" label="Accept terms" defaultChecked={false} />,
    );

    const wrapper = container.querySelector(".ms-check");
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(wrapper).toHaveClass("choice");
    expect(wrapper).not.toHaveAttribute("data-state");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");

    await user.click(screen.getByText("Accept terms"));
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("renders controlled checked and indeterminate indicators distinctly", () => {
    const { container, rerender } = render(
      <Checkbox label="Selection" checked onCheckedChange={() => {}} />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Selection" });
    const indicator = container.querySelector(".ms-check__indicator");
    expect(checkbox).toHaveAttribute("data-state", "checked");
    expect(indicator).toHaveAttribute("data-state", "checked");
    expect(indicator).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector('[data-check-visual="checked"]')).toBeInTheDocument();
    expect(container.querySelector('[data-check-visual="indeterminate"]')).toBeInTheDocument();
    expect(componentStyles).toContain(
      '.ms-check__indicator[data-state="checked"] .ms-check__visual--checked',
    );
    expect(componentStyles).toContain(
      '.ms-check__indicator[data-state="indeterminate"] .ms-check__visual--indeterminate',
    );

    rerender(
      <Checkbox label="Selection" checked="indeterminate" onCheckedChange={() => {}} />,
    );
    expect(checkbox).toHaveAttribute("data-state", "indeterminate");
    expect(indicator).toHaveAttribute("data-state", "indeterminate");
    expect(container.querySelector('[data-check-visual="checked"]')).toBeInTheDocument();
    expect(container.querySelector('[data-check-visual="indeterminate"]')).toBeInTheDocument();
  });

  it("preserves native form submission semantics", () => {
    render(
      <form data-testid="preferences">
        <Checkbox name="terms" defaultChecked label="Accept terms" />
      </form>,
    );

    const form = screen.getByTestId("preferences") as HTMLFormElement;
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeChecked();
    expect(new FormData(form).get("terms")).toBe("on");
  });
});

describe("Switch", () => {
  it("follows Radix state for uncontrolled clicks and label activation", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Switch className="setting" label="Email alerts" defaultChecked={false} />,
    );

    const wrapper = container.querySelector(".ms-switch");
    const control = screen.getByRole("switch", { name: "Email alerts" });
    expect(wrapper).toHaveClass("setting");
    expect(wrapper).not.toHaveAttribute("data-state");
    expect(control).toHaveAttribute("data-state", "unchecked");

    await user.click(screen.getByText("Email alerts"));
    expect(control).toBeChecked();
    expect(control).toHaveAttribute("data-state", "checked");
  });

  it("keeps controlled state authoritative", async () => {
    const user = userEvent.setup();
    function ControlledSwitch() {
      const [checked, setChecked] = useState(false);
      return <Switch label="Sync" checked={checked} onCheckedChange={setChecked} />;
    }

    render(<ControlledSwitch />);
    const control = screen.getByRole("switch", { name: "Sync" });
    await user.click(control);
    expect(control).toBeChecked();
    expect(control).toHaveAttribute("data-state", "checked");
  });
});

describe("form-control styles", () => {
  it("uses semantic, state-aware colors for Slider and Switch", () => {
    expect(componentStyles).toMatch(
      /\.ms-slider__range\s*\{[^}]*background:\s*var\(--accent\)/s,
    );
    expect(componentStyles).toMatch(
      /\.ms-slider__thumb\s*\{[^}]*border:\s*1px solid var\(--accent\)/s,
    );
    expect(componentStyles).toMatch(
      /\.ms-switch__thumb\s*\{[^}]*background:\s*var\(--fg1\)/s,
    );
    expect(componentStyles).toMatch(
      /\.ms-switch__thumb\[data-state="checked"\]\s*\{[^}]*transform:\s*translateX\(14px\)[^}]*background:\s*var\(--accent-fg\)/s,
    );
  });

  it("keeps Toggle geometry stable and marks the selected state", () => {
    expect(componentStyles).toMatch(
      /\.ms-toggle\s*\{[^}]*border:\s*1px solid transparent/s,
    );
    expect(componentStyles).toMatch(
      /\.ms-toggle\[data-state="on"\]\s*\{[^}]*border-color:\s*var\(--fg3\)/s,
    );
  });

  it("styles disabled Checkbox and Switch from Radix root state", () => {
    expect(componentStyles).toContain(
      ".ms-check:has(.ms-check__box[data-disabled])",
    );
    expect(componentStyles).toContain(
      ".ms-switch:has(.ms-switch__track[data-disabled])",
    );
    expect(componentStyles).toMatch(
      /\.ms-check__box\[data-disabled\][^{]*\{[^}]*cursor:\s*not-allowed[^}]*opacity:/s,
    );
    expect(componentStyles).toMatch(
      /\.ms-switch__track\[data-disabled\][^{]*\{[^}]*cursor:\s*not-allowed[^}]*opacity:/s,
    );
  });

  it("forwards disabled semantics to the Radix roots", () => {
    render(
      <>
        <Checkbox disabled label="Locked choice" />
        <Switch disabled label="Locked setting" />
      </>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Locked choice" });
    const toggle = screen.getByRole("switch", { name: "Locked setting" });
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute("data-disabled", "");
    expect(toggle).toBeDisabled();
    expect(toggle).toHaveAttribute("data-disabled", "");
  });
});

describe("Slider", () => {
  it("moves a legacy single-slider accessible name to its thumb", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Slider
        ref={ref}
        aria-label="Volume"
        className="volume"
        data-testid="volume-slider"
      />,
    );

    const root = screen.getByTestId("volume-slider");
    const thumb = screen.getByRole("slider", { name: "Volume" });
    expect(ref.current).toBe(root);
    expect(root).toHaveClass("ms-slider", "volume");
    expect(root).not.toHaveAttribute("aria-label");
    expect(thumb).toHaveAttribute("aria-label", "Volume");
  });

  it("names range thumbs and supports per-index overrides", () => {
    render(
      <>
        <span id="end-label">End</span>
        <Slider
          defaultValue={[20, 80]}
          thumbLabels={["Start", "Ignored"]}
          thumbLabelledBy={[undefined, "end-label"]}
        />
      </>,
    );

    const thumbs = screen.getAllByRole("slider");
    expect(thumbs).toHaveLength(2);
    expect(thumbs[0]).toHaveAccessibleName("Start");
    expect(thumbs[1]).toHaveAttribute("aria-labelledby", "end-label");
    expect(thumbs[1]).not.toHaveAttribute("aria-label");
    expect(thumbs[1]).toHaveAccessibleName("End");
  });

  it("moves a legacy labelled-by relationship to a single thumb", () => {
    render(
      <>
        <span id="brightness-label">Brightness</span>
        <Slider aria-labelledby="brightness-label" />
      </>,
    );

    const thumb = screen.getByRole("slider", { name: "Brightness" });
    expect(thumb).toHaveAttribute("aria-labelledby", "brightness-label");
    expect(thumb.closest(".ms-slider")).not.toHaveAttribute("aria-labelledby");
  });

  it("uses safe defaults and tolerates controlled thumb-count changes", () => {
    const { rerender } = render(<Slider value={[20, 80]} onValueChange={() => {}} />);
    expect(screen.getByRole("slider", { name: "Minimum" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Maximum" })).toBeInTheDocument();

    expect(() =>
      rerender(<Slider value={[40]} onValueChange={() => {}} />),
    ).not.toThrow();
    expect(screen.getByRole("slider", { name: "Value" })).toBeInTheDocument();
  });
});

describe("Toggle controls", () => {
  it("supports uncontrolled keyboard toggling", async () => {
    const user = userEvent.setup();
    render(<Toggle aria-label="Bold">B</Toggle>);
    const toggle = screen.getByRole("button", { name: "Bold" });
    toggle.focus();
    await user.keyboard(" ");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("supports controlled toggle groups", async () => {
    const user = userEvent.setup();
    function ControlledGroup() {
      const [value, setValue] = useState("left");
      return (
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={setValue}
          aria-label="Alignment"
        >
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      );
    }

    render(<ControlledGroup />);
    await user.click(screen.getByRole("radio", { name: "Right" }));
    expect(screen.getByRole("radio", { name: "Right" })).toHaveAttribute(
      "data-state",
      "on",
    );
  });
});

describe("PasswordInput", () => {
  it("targets className and ref at the input while styling its wrapper separately", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    const { container } = render(
      <PasswordInput
        ref={ref}
        aria-label="Password"
        className="input-class"
        wrapperClassName="wrapper-class"
      />,
    );

    const input = screen.getByLabelText("Password");
    const wrapper = container.querySelector(".ms-password");
    expect(ref.current).toBe(input);
    expect(input).toHaveClass("ms-password__input", "input-class");
    expect(wrapper).toHaveClass("wrapper-class");
    expect(wrapper).not.toHaveClass("input-class");
    expect(input).toHaveAttribute("autocomplete", "current-password");

    await user.click(screen.getByRole("button", { name: "Show" }));
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Hide" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("defaults autocomplete and preserves Field integration without the toggle", () => {
    render(
      <Field label="Secret" required>
        <PasswordInput showToggle={false} />
      </Field>,
    );

    const input = screen.getByLabelText("Secret");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveAttribute("autocomplete", "current-password");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("honors consumer autocomplete overrides", () => {
    render(
      <PasswordInput
        showToggle={false}
        aria-label="Create password"
        autoComplete="new-password"
      />,
    );

    expect(screen.getByLabelText("Create password")).toHaveAttribute(
      "autocomplete",
      "new-password",
    );
  });

  it("disables the visibility toggle with the input", () => {
    render(<PasswordInput aria-label="Password" disabled />);

    expect(screen.getByLabelText("Password")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Show" })).toBeDisabled();
  });
});

it("has no focused form-control accessibility violations", async () => {
  const { container } = render(
    <div>
      <Checkbox label="Accept terms" />
      <Switch label="Email alerts" />
      <Slider defaultValue={[25, 75]} />
      <Toggle aria-label="Bold">B</Toggle>
      <PasswordInput aria-label="Password" />
    </div>,
  );

  expect(await axe(container)).toHaveNoViolations();
});
