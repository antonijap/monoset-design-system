import { createRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionConfig } from "framer-motion";
import { Carousel } from "../Carousel";

function slides() {
  return [<div key="a">Alpha</div>, <div key="b">Beta</div>, <div key="c">Gamma</div>];
}

function setSlideOffsets(track: HTMLElement, offsets = [0, 300, 600]) {
  Array.from(track.children).forEach((slide, index) => {
    Object.defineProperty(slide, "offsetLeft", {
      configurable: true,
      value: offsets[index],
    });
  });
}

function currentSlide() {
  return screen
    .getAllByRole("group", { hidden: true })
    .find((element) => element.getAttribute("aria-roledescription") === "slide" && element.hasAttribute("aria-current"));
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Carousel", () => {
  it("derives the active slide from settled manual scrolling", () => {
    vi.useFakeTimers();
    const onIndexChange = vi.fn();
    const { container } = render(
      <Carousel showDots={false} onIndexChange={onIndexChange}>
        {slides()}
      </Carousel>,
    );
    const track = container.querySelector(".ms-carousel__track") as HTMLDivElement;
    setSlideOffsets(track);
    track.scrollLeft = 330;

    fireEvent.scroll(track);
    expect(currentSlide()).toHaveTextContent("Alpha");
    act(() => vi.advanceTimersByTime(100));

    expect(currentSlide()).toHaveTextContent("Beta");
    expect(onIndexChange).toHaveBeenLastCalledWith(1);
  });

  it("scrolls only its own track when controls change the slide", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <Carousel ref={ref} showDots={false}>
        {slides()}
      </Carousel>,
    );
    const track = container.querySelector(".ms-carousel__track") as HTMLDivElement;
    setSlideOffsets(track);
    const scrollTo = vi.fn();
    Object.defineProperty(track, "scrollTo", { configurable: true, value: scrollTo });

    await user.click(screen.getByRole("button", { name: "Next slide" }));

    expect(scrollTo).toHaveBeenLastCalledWith({
      behavior: "smooth",
      left: 300,
      top: 0,
    });
    expect(currentSlide()).toHaveTextContent("Beta");
    expect(ref.current).toHaveAttribute("aria-roledescription", "carousel");
  });

  it("uses labelled pagination buttons without incomplete tab semantics", async () => {
    const user = userEvent.setup();
    render(<Carousel>{slides()}</Carousel>);

    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    const second = screen.getByRole("button", { name: "Go to slide 2" });
    expect(screen.getByRole("button", { name: "Go to slide 1" })).toHaveAttribute(
      "aria-current",
      "true",
    );

    await user.click(second);
    expect(second).toHaveAttribute("aria-current", "true");
    expect(currentSlide()).toHaveTextContent("Beta");
  });

  it("clamps invalid starting indexes and keeps arrow boundaries correct", () => {
    const { rerender } = render(
      <Carousel defaultIndex={99} showDots={false}>
        {slides()}
      </Carousel>,
    );
    expect(currentSlide()).toHaveTextContent("Gamma");
    expect(screen.getByRole("button", { name: "Next slide" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous slide" })).toBeEnabled();

    rerender(
      <Carousel index={Number.POSITIVE_INFINITY} showDots={false}>
        {slides()}
      </Carousel>,
    );
    expect(currentSlide()).toHaveTextContent("Gamma");

    rerender(
      <Carousel index={-8} showDots={false}>
        {slides()}
      </Carousel>,
    );
    expect(currentSlide()).toHaveTextContent("Alpha");
    expect(screen.getByRole("button", { name: "Previous slide" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next slide" })).toBeEnabled();
  });

  it("pauses autoplay while hovered or focused and resumes afterwards", () => {
    vi.useFakeTimers();
    const { container } = render(<Carousel autoplay={100}>{slides()}</Carousel>);
    const root = container.querySelector(".ms-carousel") as HTMLElement;

    act(() => vi.advanceTimersByTime(100));
    expect(currentSlide()).toHaveTextContent("Beta");

    fireEvent.mouseEnter(root);
    act(() => vi.advanceTimersByTime(300));
    expect(currentSlide()).toHaveTextContent("Beta");

    fireEvent.mouseLeave(root);
    act(() => vi.advanceTimersByTime(100));
    expect(currentSlide()).toHaveTextContent("Gamma");

    const previous = screen.getByRole("button", { name: "Previous slide" });
    fireEvent.focus(previous);
    act(() => vi.advanceTimersByTime(300));
    expect(currentSlide()).toHaveTextContent("Gamma");

    fireEvent.blur(previous, { relatedTarget: document.body });
    act(() => vi.advanceTimersByTime(100));
    expect(currentSlide()).toHaveTextContent("Alpha");
  });

  it("renders a persistent rotation control only for valid autoplay", () => {
    const { rerender } = render(
      <Carousel autoplay={100} showDots={false}>{slides()}</Carousel>,
    );

    expect(screen.getByRole("button", { name: "Pause carousel" })).toHaveAttribute(
      "data-state",
      "playing",
    );
    expect(screen.queryByRole("group", { name: "Choose slide" })).not.toBeInTheDocument();

    rerender(<Carousel autoplay={0}>{slides()}</Carousel>);
    expect(screen.queryByRole("button", { name: /carousel/i })).not.toBeInTheDocument();

    rerender(<Carousel autoplay={Number.POSITIVE_INFINITY}>{slides()}</Carousel>);
    expect(screen.queryByRole("button", { name: /carousel/i })).not.toBeInTheDocument();

    rerender(
      <Carousel autoplay={100}>
        <div>Only</div>
      </Carousel>,
    );
    expect(screen.queryByRole("button", { name: /carousel/i })).not.toBeInTheDocument();
  });

  it("keeps an explicit pause through hover and focus changes until resumed", () => {
    vi.useFakeTimers();
    const onIndexChange = vi.fn();
    const { container } = render(
      <Carousel autoplay={100} onIndexChange={onIndexChange}>
        {slides()}
      </Carousel>,
    );
    const root = container.querySelector(".ms-carousel") as HTMLElement;

    act(() => vi.advanceTimersByTime(100));
    expect(currentSlide()).toHaveTextContent("Beta");

    fireEvent.click(screen.getByRole("button", { name: "Pause carousel" }));
    expect(screen.getByRole("button", { name: "Play carousel" })).toHaveAttribute(
      "data-state",
      "paused",
    );

    fireEvent.mouseEnter(root);
    fireEvent.mouseLeave(root);
    const previous = screen.getByRole("button", { name: "Previous slide" });
    fireEvent.focus(previous);
    fireEvent.blur(previous, { relatedTarget: document.body });
    act(() => vi.advanceTimersByTime(500));

    expect(currentSlide()).toHaveTextContent("Beta");
    expect(onIndexChange).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Play carousel" }));
    act(() => vi.advanceTimersByTime(100));

    expect(screen.getByRole("button", { name: "Pause carousel" })).toHaveAttribute(
      "data-state",
      "playing",
    );
    expect(currentSlide()).toHaveTextContent("Gamma");
    expect(onIndexChange).toHaveBeenLastCalledWith(2);
  });

  it("preserves controlled index ownership and consumer event handlers", () => {
    vi.useFakeTimers();
    const onIndexChange = vi.fn();
    const onClick = vi.fn();
    const { rerender } = render(
      <Carousel index={0} autoplay={100} onIndexChange={onIndexChange} onClick={onClick}>
        {slides()}
      </Carousel>,
    );

    act(() => vi.advanceTimersByTime(100));
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(currentSlide()).toHaveTextContent("Alpha");

    fireEvent.click(screen.getByRole("button", { name: "Pause carousel" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    act(() => vi.advanceTimersByTime(300));
    expect(onIndexChange).toHaveBeenCalledTimes(1);

    rerender(
      <Carousel index={1} autoplay={100} onIndexChange={onIndexChange} onClick={onClick}>
        {slides()}
      </Carousel>,
    );
    expect(currentSlide()).toHaveTextContent("Beta");
  });

  it("pauses autoplay while the document is hidden", () => {
    vi.useFakeTimers();
    let hidden = true;
    const originalHidden = Object.getOwnPropertyDescriptor(document, "hidden");
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => hidden,
    });
    render(<Carousel autoplay={100}>{slides()}</Carousel>);

    act(() => vi.advanceTimersByTime(300));
    expect(currentSlide()).toHaveTextContent("Alpha");

    hidden = false;
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    act(() => vi.advanceTimersByTime(100));
    expect(currentSlide()).toHaveTextContent("Beta");

    if (originalHidden) {
      Object.defineProperty(document, "hidden", originalHidden);
    } else {
      delete (document as { hidden?: boolean }).hidden;
    }
  });

  it("does not autoplay when reduced motion is requested", () => {
    vi.useFakeTimers();
    render(
      <MotionConfig reducedMotion="always">
        <Carousel autoplay={100}>{slides()}</Carousel>
      </MotionConfig>,
    );
    act(() => vi.advanceTimersByTime(500));
    expect(currentSlide()).toHaveTextContent("Alpha");
    expect(screen.queryByRole("button", { name: /carousel/i })).not.toBeInTheDocument();
  });

  it("does not render navigation for zero or one slide", () => {
    const { rerender } = render(<Carousel>{[]}</Carousel>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    rerender(<Carousel>{[<div key="only">Only</div>]}</Carousel>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(currentSlide()).toHaveTextContent("Only");
  });
});
