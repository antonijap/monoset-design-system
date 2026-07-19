import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { spawn } from "node:child_process";
import { after, before, test } from "node:test";
import puppeteer from "puppeteer-core";
import browserGateConfig from "../browser-gate.config.ts";

let browser;
let previewProcess;
let previewOutput = "";
let previewFailure;

async function firstAvailable(paths) {
  for (const candidate of paths) {
    if (!candidate) continue;
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next platform-specific browser path.
    }
  }
  return null;
}

async function waitForPreview() {
  const deadline = Date.now() + browserGateConfig.navigationTimeout;
  while (Date.now() < deadline) {
    if (previewFailure) throw previewFailure;
    try {
      const response = await fetch(browserGateConfig.baseURL);
      if (response.ok) return;
    } catch {
      // Vite is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`The production preview did not start.\n${previewOutput}`);
}

async function openFixture({ width = 1280, height = 900, media = [] } = {}) {
  const page = await browser.newPage();
  page.setDefaultTimeout(browserGateConfig.navigationTimeout);
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  const supportedMedia = media.filter((feature) => feature.name !== "forced-colors");
  if (supportedMedia.length > 0) await page.emulateMediaFeatures(supportedMedia);
  if (media.some((feature) => feature.name === "forced-colors")) {
    const session = await page.createCDPSession();
    await session.send("Emulation.setEmulatedMedia", { features: media });
  }
  await page.goto(browserGateConfig.baseURL, { waitUntil: "networkidle0" });
  await page.waitForSelector("[data-gate='calendar']");
  return page;
}

async function waitForFilteredOptions(page, inputSelector, query, expectedLabels) {
  await page.waitForFunction((selector, value, labels) => {
    const input = document.querySelector(selector);
    if (!(input instanceof HTMLInputElement) || input.value !== value) return false;

    const controls = input.getAttribute("aria-controls");
    const listbox = controls ? document.getElementById(controls) : null;
    const options = [...(listbox?.querySelectorAll('[role="option"]') ?? [])];
    return options.length === labels.length && labels.every((label, index) => (
      options[index]?.textContent?.includes(label)
    ));
  }, {}, inputSelector, query, expectedLabels);
}

before(async () => {
  const executablePath = await firstAvailable([
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ]);
  assert.ok(
    executablePath,
    "No local Chrome or Chromium executable is available. Set PUPPETEER_EXECUTABLE_PATH.",
  );

  previewProcess = spawn("pnpm", browserGateConfig.previewCommand, {
    cwd: browserGateConfig.packageDirectory,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  previewProcess.stdout.on("data", (chunk) => { previewOutput += chunk; });
  previewProcess.stderr.on("data", (chunk) => { previewOutput += chunk; });
  previewProcess.on("exit", (code, signal) => {
    if (code !== 0 && signal !== "SIGTERM") {
      previewFailure = new Error(
        `The production preview exited before the browser gates ran.\n${previewOutput}`,
      );
    }
  });
  await waitForPreview();

  browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ["--disable-dev-shm-usage", "--no-sandbox"],
  });
});

after(async () => {
  await browser?.close();
  previewProcess?.kill("SIGTERM");
});

test("Calendar moves real browser focus with the keyboard", async () => {
  const page = await openFixture();
  try {
    const selector = "[data-gate='calendar'] [role='gridcell'] [role='button'][tabindex='0']";
    await page.click(selector);
    const before = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
    await page.keyboard.press("ArrowRight");
    await page.waitForFunction((previous) => (
      document.activeElement?.getAttribute("aria-label") !== previous
    ), {}, before);
    const afterLabel = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
    assert.match(before ?? "", /July 18, 2026/i);
    assert.match(afterLabel ?? "", /July 19, 2026/i);
  } finally {
    await page.close();
  }
});

test("Combobox and MultiCombobox expose active options and selected tags", async () => {
  const page = await openFixture();
  try {
    const singleInput = '[data-gate="combobox"] .ms-combobox__input';
    assert.equal(await page.$$eval('[data-gate="combobox"] [role="combobox"]', (items) => items.length), 2);

    await page.click(singleInput);
    await page.keyboard.type("hel");
    await waitForFilteredOptions(page, singleInput, "hel", ["Helsinki"]);
    await page.focus(singleInput);
    await page.keyboard.press("ArrowDown");
    await page.waitForFunction(() => {
      const input = document.querySelector('[data-gate="combobox"] .ms-combobox [role="combobox"]');
      return Boolean(input?.getAttribute("aria-activedescendant"));
    });
    const singleSemantics = await page.evaluate(() => {
      const input = document.querySelector('[data-gate="combobox"] .ms-combobox [role="combobox"]');
      const activeId = input?.getAttribute("aria-activedescendant");
      const controls = input?.getAttribute("aria-controls");
      return {
        expanded: input?.getAttribute("aria-expanded"),
        activeText: activeId ? document.getElementById(activeId)?.textContent : null,
        controlsRole: controls ? document.getElementById(controls)?.getAttribute("role") : null,
      };
    });
    assert.equal(singleSemantics.expanded, "true");
    assert.match(singleSemantics.activeText ?? "", /Helsinki/);
    assert.equal(singleSemantics.controlsRole, "listbox");

    await page.keyboard.press("Escape");
    await page.waitForFunction(() => (
      document.querySelector('[data-gate="combobox"] .ms-combobox__input')
        ?.getAttribute("aria-expanded") === "false" &&
      !document.querySelector('[role="listbox"]')
    ));
    await page.click('[data-gate="combobox"] .ms-multicombobox__input');
    await page.keyboard.type("lis");
    await waitForFilteredOptions(
      page,
      '[data-gate="combobox"] .ms-multicombobox__input',
      "lis",
      ["Lisbon"],
    );
    const multiSemantics = await page.$eval(
      '[data-gate="combobox"] .ms-multicombobox__input',
      (input) => ({
        expanded: input.getAttribute("aria-expanded"),
        controls: input.getAttribute("aria-controls"),
      }),
    );
    assert.equal(multiSemantics.expanded, "true");
    assert.ok(multiSemantics.controls);
    await page.click('[role="listbox"] [role="option"]');
    await page.waitForSelector('[data-gate="combobox"] [aria-label="Remove Lisbon"]');
    const formValue = await page.$eval(
      '[data-gate="combobox"] input[type="hidden"][name="cities"]',
      (input) => input.value,
    );
    assert.equal(formValue, "lisbon");
  } finally {
    await page.close();
  }
});

test("Dialog and Sheet return focus to their triggers", async () => {
  const page = await openFixture();
  try {
    for (const [trigger, name] of [
      ["#dialog-trigger", "Confirm action"],
      ["#sheet-trigger", "Account settings"],
    ]) {
      await page.click(trigger);
      await page.waitForFunction((dialogName) => (
        [...document.querySelectorAll('[role="dialog"]')]
          .some((dialog) => dialog.getAttribute("aria-label") === dialogName || dialog.textContent?.includes(dialogName))
      ), {}, name);
      await page.waitForFunction(() => document.activeElement?.closest('[role="dialog"]'));
      await new Promise((resolve) => setTimeout(resolve, 100));
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => !document.querySelector('[role="dialog"]'));
      await page.waitForFunction((selector) => document.activeElement?.matches(selector), {}, trigger);
    }
  } finally {
    await page.close();
  }
});

test("CommandPalette keeps an active descendant and returns focus to its opener", async () => {
  const page = await openFixture();
  try {
    await page.click("#command-trigger");
    await page.waitForSelector('.ms-cmd__input[aria-activedescendant]');
    const activeText = async () => page.$eval(".ms-cmd__input", (input) => {
      const activeId = input.getAttribute("aria-activedescendant");
      return activeId ? document.getElementById(activeId)?.textContent : null;
    });
    assert.match((await activeText()) ?? "", /New file/);
    await page.keyboard.press("ArrowDown");
    assert.match((await activeText()) ?? "", /Open file/);
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.querySelector(".ms-cmd"));
    await page.waitForFunction(() => document.activeElement?.id === "command-trigger");
  } finally {
    await page.close();
  }
});

test("Carousel derives its current slide from manual scrolling", async () => {
  const page = await openFixture();
  try {
    await page.click("[data-gate='carousel'] [aria-label='Pause carousel']");
    await page.$eval("[data-gate='carousel'] .ms-carousel__track", (track) => {
      track.scrollLeft = track.children[1].offsetLeft;
      track.dispatchEvent(new Event("scroll"));
    });
    await page.waitForFunction(() => (
      document.querySelector("[data-gate='carousel'] .ms-carousel__slide:nth-child(2)")
        ?.getAttribute("aria-current") === "true"
    ));
    const dotCurrent = await page.$eval(
      "[data-gate='carousel'] [aria-label='Go to slide 2']",
      (dot) => dot.getAttribute("aria-current"),
    );
    assert.equal(dotCurrent, "true");
  } finally {
    await page.close();
  }
});

test("Carousel keeps explicit autoplay pause until the user resumes it", async () => {
  const page = await openFixture();
  try {
    const root = "[data-gate='carousel'] .ms-carousel";
    const currentSlide = () => page.$eval(root, (carousel) => (
      [...carousel.querySelectorAll(".ms-carousel__slide")]
        .findIndex((slide) => slide.getAttribute("aria-current") === "true")
    ));

    await page.click(`${root} [aria-label='Pause carousel']`);
    await page.waitForSelector(`${root} [aria-label='Play carousel'][data-state='paused']`);
    const pausedIndex = await currentSlide();

    await page.hover(root);
    await page.focus(`${root} [aria-label='Next slide']`);
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.mouse.move(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 600));
    assert.equal(await currentSlide(), pausedIndex);

    await page.click(`${root} [aria-label='Play carousel']`);
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.mouse.move(0, 0);
    await page.waitForFunction((selector, previousIndex) => (
      [...document.querySelectorAll(`${selector} .ms-carousel__slide`)]
        .findIndex((slide) => slide.getAttribute("aria-current") === "true") !== previousIndex
    ), {}, root, pausedIndex);
    await page.waitForSelector(`${root} [aria-label='Pause carousel'][data-state='playing']`);
  } finally {
    await page.close();
  }
});

test("AppShell uses one modal sidebar in narrow mode and restores focus", async () => {
  const page = await openFixture({ width: 600, height: 800 });
  try {
    const display = await page.$eval("#app-shell-trigger", (element) => getComputedStyle(element).display);
    assert.notEqual(display, "none");
    await page.click("#app-shell-trigger");
    await page.waitForSelector("[data-gate='app-shell'] [role='dialog'][data-state='open']");
    const state = await page.$eval("[data-gate='app-shell'] .ms-app-shell", (shell) => ({
      sidebars: shell.querySelectorAll("[data-ms='app-shell-sidebar']").length,
      mainHidden: shell.querySelector(".ms-app-shell__main")?.getAttribute("aria-hidden"),
      mainInert: shell.querySelector(".ms-app-shell__main")?.hasAttribute("inert"),
    }));
    assert.deepEqual(state, { sidebars: 1, mainHidden: "true", mainInert: true });
    await page.waitForFunction(() => (
      document.activeElement?.closest("[data-ms='app-shell-sidebar']")
    ));
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => document.activeElement?.id === "app-shell-trigger");
  } finally {
    await page.close();
  }
});

test("reduced motion removes animated component behavior", async () => {
  const page = await openFixture({
    media: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  try {
    assert.equal(
      await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches),
      true,
    );
    await page.waitForSelector('[data-testid="reveal"][data-reduced-motion="true"]');
    assert.equal(await page.$('[data-testid="loading-button"] animateTransform'), null);
    assert.equal(
      await page.$("[data-gate='carousel'] .ms-carousel__autoplay"),
      null,
    );
  } finally {
    await page.close();
  }
});

test("forced-colors mode preserves visible keyboard focus indicators", async () => {
  const page = await openFixture({
    media: [{ name: "forced-colors", value: "active" }],
  });
  try {
    assert.equal(
      await page.evaluate(() => matchMedia("(forced-colors: active)").matches),
      true,
    );

    for (const { name, focus, indicator } of [
      {
        name: "Button",
        focus: '[data-testid="forced-colors-button"]',
        indicator: '[data-testid="forced-colors-button"]',
      },
      {
        name: "Input",
        focus: '[data-testid="forced-colors-input"]',
        indicator: '[data-testid="forced-colors-input"]',
      },
      {
        name: "Textarea",
        focus: '[data-testid="forced-colors-textarea"]',
        indicator: '[data-testid="forced-colors-textarea"]',
      },
      {
        name: "Select",
        focus: '[data-testid="forced-colors-select"]',
        indicator: '[data-testid="forced-colors-select"]',
      },
      {
        name: "NumberInput",
        focus: '[data-testid="forced-colors-number"] .ms-numberinput__input',
        indicator: '[data-testid="forced-colors-number"]',
      },
      {
        name: "PinInput",
        focus: '[data-testid="forced-colors-pin"] .ms-pininput__cell',
        indicator: '[data-testid="forced-colors-pin"] .ms-pininput__cell',
      },
      {
        name: "FileUpload",
        focus: '[data-testid="forced-colors-upload"] .ms-fileupload__input',
        indicator: '[data-testid="forced-colors-upload"] .ms-fileupload__dropzone',
      },
    ]) {
      await page.focus(focus);
      const focusStyle = await page.$eval(indicator, (element) => {
        const style = getComputedStyle(element);
        return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
      });
      assert.notEqual(focusStyle.outlineStyle, "none", `${name} has no focus outline`);
      assert.notEqual(focusStyle.outlineWidth, "0px", `${name} has a zero-width focus outline`);
    }

    const assertActiveIndicator = async (name, activeSelector) => {
      const activeStyle = await page.evaluate((activeSelector) => {
        const active = document.querySelector(activeSelector);
        if (!active) return null;
        const style = getComputedStyle(active);
        return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
      }, activeSelector);
      assert.ok(activeStyle, `${name} active option must render`);
      assert.notEqual(activeStyle.outlineStyle, "none", `${name} active option has no outline`);
      assert.notEqual(activeStyle.outlineWidth, "0px", `${name} active option outline is zero-width`);
    };

    const comboboxInput = '[data-gate="combobox"] .ms-combobox__input';
    await page.click(comboboxInput);
    await page.keyboard.type("h");
    await waitForFilteredOptions(page, comboboxInput, "h", ["Helsinki"]);
    await page.focus(comboboxInput);
    await page.keyboard.press("ArrowDown");
    await page.waitForFunction(() => Boolean(
      document.querySelector('[data-gate="combobox"] .ms-combobox__input')
        ?.getAttribute("aria-activedescendant"),
    ));
    const comboboxState = await page.$eval(
      '[data-gate="combobox"] .ms-combobox__input',
      (input) => {
        const activeId = input.getAttribute("aria-activedescendant");
        const active = activeId ? document.getElementById(activeId) : null;
        return active ? {
          activeId,
          className: active.className,
          outlineStyle: getComputedStyle(active).outlineStyle,
          outlineWidth: getComputedStyle(active).outlineWidth,
        } : null;
      },
    );
    assert.ok(comboboxState, "Combobox active option must render");
    assert.match(comboboxState.className, /ms-combobox__option--active/);
    assert.notEqual(comboboxState.outlineStyle, "none");
    assert.notEqual(comboboxState.outlineWidth, "0px");
    await page.keyboard.press("Escape");

    await page.click("#command-trigger");
    await page.waitForSelector(".ms-cmd__item--active");
    const commandFocusStyle = await page.$eval(".ms-cmd__input-wrap", (element) => {
      const style = getComputedStyle(element);
      return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
    });
    assert.notEqual(commandFocusStyle.outlineStyle, "none");
    assert.notEqual(commandFocusStyle.outlineWidth, "0px");
    await assertActiveIndicator(
      "CommandPalette",
      ".ms-cmd__item--active",
    );
    await page.keyboard.press("Escape");

    await page.focus('[data-testid="forced-colors-select"]');
    await page.keyboard.press("Enter");
    await page.waitForSelector(".ms-select__content");
    await page.keyboard.press("ArrowDown");
    await page.waitForSelector('.ms-select__content .ms-menu__item[data-highlighted]');
    await assertActiveIndicator(
      "Select",
      '.ms-select__content .ms-menu__item[data-highlighted]',
    );
    await page.keyboard.press("Escape");
  } finally {
    await page.close();
  }
});
