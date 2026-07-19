import { act, render, screen, waitFor } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement, createRef, Fragment, type ReactElement } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Alert } from "../Alert";
import { AspectRatio } from "../AspectRatio";
import { Avatar } from "../Avatar";
import { Breadcrumb } from "../Breadcrumb";
import { Button } from "../Button";
import { Card } from "../Card";
import { EmptyState } from "../EmptyState";
import { MonosetProvider } from "../MonosetProvider";
import { Progress } from "../Progress";
import { Separator } from "../Separator";
import { renderWithMonoset, stubMatchMedia } from "./helpers";
import { readComponentStyles } from "./style-source";

const componentStyles = readComponentStyles();
const buttonSource = readFileSync(resolve(process.cwd(), "src/Button.tsx"), "utf8");

class LoadedImage extends EventTarget {
  complete = true;
  naturalWidth = 100;
  src = "";
  referrerPolicy = "";
  crossOrigin: string | null = null;
}

describe("Avatar", () => {
  it.each([
    ["  Ada   Lovelace  ", "AL"],
    ["Prince", "PR"],
    ["A", "A"],
  ])("derives a fallback from %s", async (name, expected) => {
    render(<Avatar name={name} />);

    expect(await screen.findByText(expected)).toBeInTheDocument();
  });

  it("uses explicit initials as a compatibility override", async () => {
    render(<Avatar name="Ada Lovelace" initials="alx" />);

    expect(await screen.findByText("AL")).toBeInTheDocument();
  });

  afterEach(() => vi.unstubAllGlobals());

  it("has one meaningful image announcement for loaded-image markup", async () => {
    vi.stubGlobal("Image", LoadedImage);
    const { container } = render(
      <Avatar name="Ada Lovelace" src="ada.png" alt="Portrait of Ada" />,
    );

    expect(screen.getByRole("img", { name: "Portrait of Ada" })).toBeInTheDocument();
    await waitFor(() => expect(container.querySelector("img")).toBeInTheDocument());
    expect(container.querySelectorAll('[role="img"], img:not([alt=""])')).toHaveLength(1);
  });

  it("falls back to the required name when alt text is empty", () => {
    render(<Avatar name="Ada Lovelace" src="ada.png" alt="" />);

    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toBeInTheDocument();
  });

  it("allows a decorative avatar without a name", () => {
    const { container } = render(<Avatar decorative />);

    expect(container.querySelector(".ms-avatar")).toHaveAttribute("aria-hidden", "true");
  });

  it.each([
    <Avatar key="space" name="   " />,
    createElement(Avatar, Object.create(null)),
  ])("rejects missing or whitespace-only accessible names", (avatar) => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(avatar)).toThrow(
      "Avatar requires a non-empty name unless decorative.",
    );
    consoleError.mockRestore();
  });

  it("renders an initials-only fallback immediately on the server", () => {
    const html = renderToString(<Avatar name="Ada Turing" />);

    expect(html).toContain("AT");
  });

  it("is hidden from accessibility APIs only when explicitly decorative", async () => {
    vi.stubGlobal("Image", LoadedImage);
    const { container } = render(
      <Avatar name="Ada Lovelace" src="ada.png" decorative />,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container.querySelector(".ms-avatar")).toHaveAttribute("aria-hidden", "true");
    await waitFor(() => expect(container.querySelector("img")).toBeInTheDocument());
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });
});

describe("Breadcrumb", () => {
  it("renders list semantics, hides separators, defaults the final item to current, and forwards nav props", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Breadcrumb
        ref={ref}
        data-testid="crumbs"
        items={[
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs" },
          { label: "Button", href: "/docs/button" },
        ]}
      />,
    );

    const nav = screen.getByTestId("crumbs");
    const list = nav.querySelector(":scope > ol");
    expect(ref.current).toBe(nav);
    expect(nav).toHaveAccessibleName("Breadcrumb");
    expect(list?.children).toHaveLength(3);
    expect(list).toHaveClass("ms-breadcrumb__list");
    list?.querySelectorAll(":scope > li").forEach((item) => {
      expect(item).toHaveClass("ms-breadcrumb__entry");
    });
    expect(nav.querySelectorAll(".ms-breadcrumb__sep")).toHaveLength(2);
    nav.querySelectorAll(".ms-breadcrumb__sep").forEach((separator) => {
      expect(separator).toHaveAttribute("aria-hidden", "true");
      expect(separator.parentElement?.tagName).toBe("LI");
    });
    expect(screen.getByText("Button")).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Button" })).not.toBeInTheDocument();
  });

  it("respects an explicitly current item instead of marking the final item", () => {
    render(
      <Breadcrumb
        aria-label="Location"
        items={[
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs", current: true },
          { label: "Button", href: "/docs/button" },
        ]}
      />,
    );

    expect(screen.getByRole("navigation", { name: "Location" })).toBeInTheDocument();
    expect(screen.getByText("Docs")).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Docs" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Button" })).not.toHaveAttribute("aria-current");
  });

  it("respects an explicit false current value on the final item", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs", current: false },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "Docs" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("renders duplicate labels and hrefs without duplicate React keys", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Docs", href: "/docs" },
        ]}
      />,
    );

    expect(screen.getAllByText("Docs")).toHaveLength(2);
    expect(
      consoleError.mock.calls.some((call) =>
        call.some((value) => String(value).includes("same key")),
      ),
    ).toBe(false);
    consoleError.mockRestore();
  });

  it("retains horizontal list layout without browser list defaults", () => {
    expect(componentStyles).toMatch(
      /\.ms-breadcrumb__list\s*\{[^}]*display:\s*inline-flex[^}]*align-items:\s*center[^}]*gap:\s*6px[^}]*list-style:\s*none[^}]*margin:\s*0[^}]*padding:\s*0[^}]*\}/s,
    );
    expect(componentStyles).toMatch(
      /\.ms-breadcrumb__entry\s*\{[^}]*display:\s*inline-flex[^}]*align-items:\s*center[^}]*gap:\s*6px[^}]*\}/s,
    );
  });
});

describe("Button", () => {
  it("does not import Framer Motion into the Button module", () => {
    expect(buttonSource).not.toMatch(/framer-motion|MotionConfigContext/);
  });

  it("does not subscribe to motion preferences for an ordinary button", () => {
    const media = stubMatchMedia(false);

    renderToString(<Button>Save</Button>);

    expect(media.matchMedia).not.toHaveBeenCalled();
    media.restore();
  });

  it("keeps its label, disables interaction, and owns busy state while loading", () => {
    render(
      <Button loading aria-busy={false} leadingIcon="before" trailingIcon="after">
        Save changes
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveTextContent("Save changes");
    expect(button).not.toHaveTextContent("before");
    expect(button).not.toHaveTextContent("after");
  });

  it("preserves an explicit busy state when it is not loading", () => {
    render(<Button aria-busy>Save changes</Button>);

    expect(screen.getByRole("button", { name: "Save changes" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
  });

  it("does not rotate its spinner when reduced motion is requested", () => {
    const media = stubMatchMedia(false);
    const { container } = renderWithMonoset(<Button loading>Save</Button>, {
      providerProps: { motion: { reducedMotion: "always" } },
    });

    expect(container.querySelector("animateTransform")).not.toBeInTheDocument();
    media.restore();
  });

  it("keeps spinner rotation when reduced motion is not requested", () => {
    const media = stubMatchMedia(true);
    const { container } = renderWithMonoset(<Button loading>Save</Button>, {
      providerProps: { motion: { reducedMotion: "never" } },
    });

    expect(container.querySelector("animateTransform")).toBeInTheDocument();
    media.restore();
  });

  it("uses the OS preference for explicit user motion configuration", async () => {
    const media = stubMatchMedia(false);
    const { container } = renderWithMonoset(<Button loading>Save</Button>, {
      providerProps: { motion: { reducedMotion: "user" } },
    });

    expect(container.querySelector("animateTransform")).toBeInTheDocument();
    await act(async () => media.setMatches(true));
    expect(container.querySelector("animateTransform")).not.toBeInTheDocument();
    media.restore();
  });

  it("uses the OS preference without a MonosetProvider", async () => {
    const media = stubMatchMedia(false);
    const { container } = render(<Button loading>Save</Button>);

    expect(container.querySelector("animateTransform")).toBeInTheDocument();
    await act(async () => media.setMatches(true));
    expect(container.querySelector("animateTransform")).not.toBeInTheDocument();
    media.restore();
  });

  it("hydrates reduced-motion loading markup without a mismatch or animation", async () => {
    const media = stubMatchMedia(true);
    const element = (
      <MonosetProvider>
        <Button loading>Save</Button>
      </MonosetProvider>
    );
    const html = renderToString(element);
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.append(container);
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(html).not.toContain("animateTransform");
    const root = hydrateRoot(container, element);
    await act(async () => {});

    expect(container.querySelector("animateTransform")).not.toBeInTheDocument();
    expect(consoleError).not.toHaveBeenCalled();

    await act(async () => root.unmount());
    container.remove();
    consoleError.mockRestore();
    media.restore();
  });

  it("adds loading animation after hydration and reacts to preference changes", async () => {
    const media = stubMatchMedia(false);
    const element = (
      <MonosetProvider>
        <Button loading>Save</Button>
      </MonosetProvider>
    );
    const html = renderToString(element);
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.append(container);

    expect(html).not.toContain("animateTransform");
    const root = hydrateRoot(container, element);
    await act(async () => {});
    expect(container.querySelector("animateTransform")).toBeInTheDocument();

    await act(async () => media.setMatches(true));
    expect(container.querySelector("animateTransform")).not.toBeInTheDocument();

    await act(async () => root.unmount());
    container.remove();
    media.restore();
  });
});

describe("Card", () => {
  it("renders a div by default and forwards its ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref} data-testid="card" variant="elevated" />);

    expect(ref.current).toBe(screen.getByTestId("card"));
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current).toHaveClass("ms-card", "ms-card--elevated");
  });

  it("merges Card props onto exactly one child with asChild", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Card asChild ref={ref} variant="inset" data-testid="article-card">
        <article aria-label="Release notes">Notes</article>
      </Card>,
    );

    const article = screen.getByTestId("article-card");
    expect(ref.current).toBe(article);
    expect(article.tagName).toBe("ARTICLE");
    expect(article).toHaveClass("ms-card", "ms-card--inset");
  });

  it.each([
    <Fragment key="fragment"><article>Fragment child</article></Fragment>,
    <svg key="svg" aria-label="Vector child" />,
    createElement("sample-card"),
    createElement(function CustomCardChild(): ReactElement {
      return <article>Custom child</article>;
    }),
  ])("rejects non-intrinsic asChild content", (child) => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Card asChild>{child}</Card>)).toThrow(
      "Card asChild requires exactly one intrinsic HTML element.",
    );
    consoleError.mockRestore();
  });
});

describe("EmptyState", () => {
  it("uses an h2 by default and forwards root div props and ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<EmptyState ref={ref} title="No projects" data-testid="empty" />);

    expect(ref.current).toBe(screen.getByTestId("empty"));
    expect(screen.getByRole("heading", { level: 2, name: "No projects" })).toBeInTheDocument();
  });

  it("supports a configured heading level", () => {
    render(<EmptyState title="No projects" headingLevel={4} />);

    expect(screen.getByRole("heading", { level: 4, name: "No projects" })).toBeInTheDocument();
  });

  it("resets the semantic heading's browser margin", () => {
    expect(componentStyles).toMatch(
      /\.ms-empty__title\s*\{[^}]*margin:\s*0[^}]*\}/s,
    );
  });
});

describe("Progress", () => {
  it.each([
    [Number.NaN, 20, 100, 20, "20%"],
    [0, 20, 100, 20, "20%"],
    [-1, 20, 100, 20, "20%"],
    [200, 250, 200, 200, "100%"],
    [100, -20, 100, 0, "0%"],
    [100, Number.POSITIVE_INFINITY, 100, 0, "0%"],
  ])("normalizes max %s and value %s", (max, value, expectedMax, expectedValue, width) => {
    const { container } = render(<Progress max={max} value={value} />);
    const progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("aria-valuemax", String(expectedMax));
    expect(progress).toHaveAttribute("aria-valuenow", String(expectedValue));
    expect(container.querySelector(".ms-progress__indicator")).toHaveStyle({ width });
  });

  it("preserves indeterminate semantics and animation", () => {
    const { container } = render(<Progress value={75} indeterminate />);
    const progress = screen.getByRole("progressbar");

    expect(progress).not.toHaveAttribute("aria-valuenow");
    expect(container.querySelector(".ms-progress__indicator")).toHaveStyle({
      width: "40%",
      animation: "ms-indeterminate 1.4s infinite",
    });
  });

  it("infers indeterminate state when value and indeterminate are omitted", () => {
    const { container } = render(<Progress />);

    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
    expect(container.querySelector(".ms-progress__indicator")).toHaveStyle({
      width: "40%",
      animation: "ms-indeterminate 1.4s infinite",
    });
  });

  it("allows an explicit determinate zero without a value", () => {
    const { container } = render(<Progress indeterminate={false} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    expect(container.querySelector(".ms-progress__indicator")).toHaveStyle({ width: "0%" });
  });
});

describe("Separator", () => {
  it("forwards its exact Radix ref and native props", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Separator ref={ref} data-testid="separator" orientation="vertical" />);

    expect(ref.current).toBe(screen.getByTestId("separator"));
    expect(ref.current).toHaveAttribute("data-orientation", "vertical");
  });
});

describe("AspectRatio", () => {
  it("defaults to a square ratio and forwards its ref and props", () => {
    const ref = createRef<HTMLDivElement>();
    render(<AspectRatio ref={ref} data-testid="ratio">Media</AspectRatio>);

    const content = screen.getByTestId("ratio");
    expect(ref.current).toBe(content);
    expect(content.parentElement).toHaveAttribute("data-radix-aspect-ratio-wrapper", "");
    expect(content.parentElement).toHaveStyle({ paddingBottom: "100%" });
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "normalizes invalid ratio %s to a square",
    (ratio) => {
      render(<AspectRatio ratio={ratio} data-testid="invalid-ratio" />);

      expect(screen.getByTestId("invalid-ratio").parentElement).toHaveStyle({
        paddingBottom: "100%",
      });
    },
  );
});

describe("Alert", () => {
  it.each([
    [false, "status", "polite"],
    [true, "alert", "assertive"],
  ])("uses the expected live semantics when urgent is %s", (urgent, role, live) => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Alert ref={ref} urgent={urgent} data-testid="alert" title="Notice">
        Details
      </Alert>,
    );

    const alert = screen.getByTestId("alert");
    expect(ref.current).toBe(alert);
    expect(alert).toHaveAttribute("role", role);
    expect(alert).toHaveAttribute("aria-live", live);
  });

  it.each([
    [false, "alert", "assertive", "status", "polite"],
    [true, "status", "polite", "alert", "assertive"],
  ])(
    "owns live semantics when urgent is %s",
    (urgent, suppliedRole, suppliedLive, expectedRole, expectedLive) => {
      render(
        <Alert urgent={urgent} role={suppliedRole} aria-live={suppliedLive}>
          Details
        </Alert>,
      );

      expect(screen.getByText("Details").closest("[role]")).toHaveAttribute(
        "role",
        expectedRole,
      );
      expect(screen.getByText("Details").closest("[role]")).toHaveAttribute(
        "aria-live",
        expectedLive,
      );
    },
  );
});
