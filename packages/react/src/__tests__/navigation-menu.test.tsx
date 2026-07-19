import { createRef, useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../NavigationMenu";

afterEach(() => {
  vi.unstubAllGlobals();
});

class ImmediateResizeObserver implements ResizeObserver {
  constructor(private readonly callback: ResizeObserverCallback) {}

  observe() {
    this.callback([], this);
  }

  unobserve() {}

  disconnect() {}
}

function BasicMenu() {
  return (
    <NavigationMenu aria-label="Primary">
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/web">Web kit</NavigationMenuLink>
            <NavigationMenuLink href="/native">Native kit</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator>
          <span>Active</span>
        </NavigationMenuIndicator>
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
}

describe("NavigationMenu", () => {
  it("opens content, supports link selection and Escape focus return", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);

    const trigger = screen.getByRole("button", { name: "Products" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Web kit" })).toBeVisible();

    await user.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
    expect(trigger).toHaveFocus();
  });

  it("moves between triggers with horizontal arrow keys", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);

    const products = screen.getByRole("button", { name: "Products" });
    const resources = screen.getByRole("button", { name: "Resources" });
    products.focus();
    await user.keyboard("{ArrowRight}");
    expect(resources).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(products).toHaveFocus();
  });

  it("preserves disabled trigger behavior", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <NavigationMenu aria-label="Primary">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger disabled onClick={onClick}>
              Disabled
            </NavigationMenuTrigger>
            <NavigationMenuContent>Unavailable</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByRole("button", { name: "Disabled" });
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(onClick).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports controlled values", async () => {
    const user = userEvent.setup();

    function ControlledMenu() {
      const [value, setValue] = useState("");
      return (
        <>
          <span data-testid="value">{value || "closed"}</span>
          <NavigationMenu value={value} onValueChange={setValue}>
            <NavigationMenuList>
              <NavigationMenuItem value="products">
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="/web">Web kit</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </>
      );
    }

    render(<ControlledMenu />);
    await user.click(screen.getByRole("button", { name: "Products" }));
    expect(screen.getByTestId("value")).toHaveTextContent("products");
    await user.keyboard("{Escape}");
    expect(screen.getByTestId("value")).toHaveTextContent("closed");
  });

  it("forwards exact refs and composes native props, classes, and handlers", async () => {
    vi.stubGlobal("ResizeObserver", ImmediateResizeObserver);
    const user = userEvent.setup();
    const rootRef = createRef<HTMLElement>();
    const listRef = createRef<HTMLUListElement>();
    const itemRef = createRef<HTMLLIElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();
    const linkRef = createRef<HTMLAnchorElement>();
    const indicatorRef = createRef<HTMLDivElement>();
    const viewportRef = createRef<HTMLDivElement>();
    const onContentClick = vi.fn();
    const onLinkSelect = vi.fn((event: Event) => event.preventDefault());

    render(
      <NavigationMenu ref={rootRef} aria-label="Primary">
        <NavigationMenuList ref={listRef} data-list="primary">
          <NavigationMenuItem
            ref={itemRef}
            value="products"
            className="product-item"
            data-item="products"
          >
            <NavigationMenuTrigger
              ref={triggerRef}
              className="product-trigger"
              data-trigger="products"
            >
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent
              ref={contentRef}
              className="product-content"
              data-content="products"
              onClick={onContentClick}
            >
              <NavigationMenuLink
                ref={linkRef}
                href="/web"
                className="product-link"
                data-link="web"
                onSelect={onLinkSelect}
              >
                Web kit
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuIndicator
            ref={indicatorRef}
            className="product-indicator"
            data-indicator="primary"
            forceMount
          />
        </NavigationMenuList>
        <NavigationMenuViewport
          ref={viewportRef}
          className="product-viewport"
          data-viewport="primary"
          forceMount
        />
      </NavigationMenu>,
    );

    const trigger = screen.getByRole("button", { name: "Products" });
    await user.click(trigger);
    const link = screen.getByRole("link", { name: "Web kit" });
    expect(rootRef.current).toBe(screen.getByRole("navigation", { name: "Primary" }));
    expect(rootRef.current).toHaveClass("ms-nav");
    expect(listRef.current).toHaveAttribute("data-list", "primary");
    expect(listRef.current).toHaveClass("ms-nav-list");
    expect(itemRef.current).toHaveClass("ms-nav-item", "product-item");
    expect(triggerRef.current).toBe(trigger);
    expect(trigger).toHaveClass("ms-nav-trigger", "product-trigger");
    expect(trigger).toHaveAttribute("data-trigger", "products");
    expect(contentRef.current).toHaveClass("ms-nav-content", "product-content");
    expect(contentRef.current).toHaveAttribute("data-content", "products");
    expect(linkRef.current).toBe(link);
    expect(link).toHaveClass("ms-nav-link", "product-link");
    expect(link).toHaveAttribute("data-link", "web");
    expect(indicatorRef.current).toHaveClass(
      "ms-nav-indicator",
      "product-indicator",
    );
    expect(indicatorRef.current).toHaveAttribute("data-indicator", "primary");
    expect(viewportRef.current).toHaveClass(
      "ms-nav-viewport",
      "product-viewport",
    );
    expect(viewportRef.current).toHaveAttribute("data-viewport", "primary");

    await user.click(link);
    expect(onLinkSelect).toHaveBeenCalledTimes(1);
    expect(onContentClick).toHaveBeenCalledTimes(1);
  });

  it("supports asChild triggers without losing the Monoset caret", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger asChild>
              <a href="/products" className="product-anchor">
                Products
              </a>
            </NavigationMenuTrigger>
            <NavigationMenuContent>Products panel</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByRole("link", { name: "Products" });
    expect(trigger).toHaveClass("ms-nav-trigger", "product-anchor");
    expect(trigger.querySelector(".ms-nav-caret")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("marks active links through the native Radix contract", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs" active>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "data-active",
    );
  });

  it("has no obvious accessibility violations", async () => {
    render(<BasicMenu />);

    expect(
      await axe(screen.getByRole("navigation", { name: "Primary" })),
    ).toHaveNoViolations();
  });
});
