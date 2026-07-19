import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { Container, Grid, Inline, Stack } from "../Layout";

describe("Layout", () => {
  it("forwards refs and native props while allowing explicit style overrides", () => {
    const stackRef = createRef<HTMLDivElement>();
    render(
      <>
        <Stack ref={stackRef} data-testid="stack" className="custom" gap={2} style={{ gap: "3rem" }} />
        <Inline data-testid="inline" wrap={false} aria-label="Actions" />
        <Container data-testid="container" size="sm" padding={false} style={{ maxWidth: "30rem" }} />
      </>,
    );

    expect(stackRef.current).toBe(screen.getByTestId("stack"));
    expect(stackRef.current).toHaveClass("ms-stack", "custom");
    expect(stackRef.current).toHaveStyle({ gap: "3rem" });
    expect(screen.getByTestId("inline")).not.toHaveClass("ms-inline--wrap");
    expect(screen.getByTestId("inline")).toHaveAttribute("aria-label", "Actions");
    expect(screen.getByTestId("container")).not.toHaveClass("ms-container--padded");
    expect(screen.getByTestId("container").style.maxWidth).toBe("30rem");
  });

  it("normalizes fixed column counts to positive whole numbers", () => {
    const { rerender } = render(<Grid data-testid="grid" columns={3.9} />);
    expect(screen.getByTestId("grid")).toHaveStyle({ gridTemplateColumns: "repeat(3, 1fr)" });

    rerender(<Grid data-testid="grid" columns={0} />);
    expect(screen.getByTestId("grid")).toHaveStyle({ gridTemplateColumns: "repeat(1, 1fr)" });

    rerender(<Grid data-testid="grid" columns={-4} />);
    expect(screen.getByTestId("grid")).toHaveStyle({ gridTemplateColumns: "repeat(1, 1fr)" });
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "falls back to an auto-fitting grid for a non-finite column count (%s)",
    (columns) => {
      render(<Grid data-testid="grid" columns={columns} />);
      expect(screen.getByTestId("grid")).toHaveStyle({
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      });
    },
  );

  it.each([
    [0, "0px"],
    [180, "180px"],
    ["18rem", "18rem"],
    ["50%", "50%"],
    ["clamp(12rem, 30vw, 24rem)", "clamp(12rem, 30vw, 24rem)"],
    ["var(--card-min)", "var(--card-min)"],
  ] as const)("accepts a valid minimum width (%s)", (minWidth, expected) => {
    render(<Grid data-testid="grid" minWidth={minWidth} />);
    expect(screen.getByTestId("grid").style.gridTemplateColumns).toBe(
      `repeat(auto-fit, minmax(${expected}, 1fr))`,
    );
  });

  it.each([
    -1,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    "",
    "wide",
    "-10px",
    "10px; color: red",
    "calc(100% - 2rem",
  ])("uses a safe default for an invalid minimum width (%s)", (minWidth) => {
    render(<Grid data-testid="grid" minWidth={minWidth} />);
    expect(screen.getByTestId("grid")).toHaveStyle({
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    });
  });

  it("lets an explicit style override the generated grid template", () => {
    render(
      <Grid
        data-testid="grid"
        columns={3}
        style={{ gridTemplateColumns: "10rem 1fr" }}
      />,
    );
    expect(screen.getByTestId("grid")).toHaveStyle({ gridTemplateColumns: "10rem 1fr" });
  });
});
