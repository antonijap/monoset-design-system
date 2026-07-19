import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { MotionConfig, useInView } from "framer-motion";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    useInView: vi.fn(() => false),
  };
});

import { Reveal } from "../Motion";

beforeEach(() => {
  vi.mocked(useInView).mockClear();
});

describe("Reveal", () => {
  it("composes a callback ref with the local in-view ref and cleans both up", () => {
    const callbackRef = vi.fn<(node: HTMLDivElement | null) => void>();
    const { unmount } = render(
      <Reveal ref={callbackRef} className="callback-reveal">
        <button type="button">Keep this button</button>
      </Reveal>,
    );

    const root = document.querySelector<HTMLDivElement>(".callback-reveal")!;
    expect(callbackRef).toHaveBeenCalledWith(root);
    expect(vi.mocked(useInView).mock.calls.at(-1)?.[0].current).toBe(root);
    expect(root.children).toHaveLength(1);
    expect(root.firstElementChild).toBe(screen.getByRole("button", { name: "Keep this button" }));

    unmount();
    expect(callbackRef).toHaveBeenLastCalledWith(null);
  });

  it("composes an object ref with the observed element", () => {
    const objectRef = createRef<HTMLDivElement>();
    render(
      <Reveal ref={objectRef} className="object-reveal">
        Content
      </Reveal>,
    );

    const root = document.querySelector<HTMLDivElement>(".object-reveal")!;
    expect(objectRef.current).toBe(root);
    expect(vi.mocked(useInView).mock.calls.at(-1)?.[0].current).toBe(root);
  });

  it("renders content immediately and preserves native props when motion is reduced", () => {
    const onClick = vi.fn();
    render(
      <MotionConfig reducedMotion="always">
        <Reveal
          aria-label="Reduced reveal"
          className="reduced-reveal"
          data-testid="reduced-reveal"
          onClick={onClick}
          style={{ color: "rgb(1, 2, 3)" }}
        >
          <strong>Visible content</strong>
        </Reveal>
      </MotionConfig>,
    );

    const root = screen.getByTestId("reduced-reveal");
    root.click();
    expect(onClick).toHaveBeenCalledOnce();
    expect(root).toHaveAttribute("data-reduced-motion", "true");
    expect(root).toHaveStyle({ color: "rgb(1, 2, 3)" });
    expect(root.children).toHaveLength(1);
    expect(root.firstElementChild?.tagName).toBe("STRONG");
    expect(root).not.toHaveStyle({ opacity: "0" });
    expect(root).not.toHaveStyle({ transform: "translateY(8px)" });
  });
});
