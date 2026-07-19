import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AppShell,
  Button,
  Calendar,
  CalendarDate,
  Carousel,
  Combobox,
  CommandPalette,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  FileUpload,
  Input,
  MultiCombobox,
  MonosetProvider,
  NumberInput,
  PinInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  Textarea,
} from "@monoset/react";
import { Reveal } from "@monoset/react/motion";
import "@monoset/tokens/css";
import "@monoset/react/styles.css";

const places = [
  { value: "helsinki", label: "Helsinki", description: "Finland" },
  { value: "lisbon", label: "Lisbon", description: "Portugal" },
  { value: "tokyo", label: "Tokyo", description: "Japan" },
];

function BrowserGateFixture() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <main className="gate-page">
      <h1>Monoset React browser gates</h1>

      <section data-gate="calendar">
        <h2>Calendar</h2>
        <Calendar
          aria-label="Release date"
          defaultValue={new CalendarDate(2026, 7, 18)}
          defaultFocusedValue={new CalendarDate(2026, 7, 18)}
        />
      </section>

      <section data-gate="combobox">
        <h2>Comboboxes</h2>
        <Combobox aria-label="City" options={places} />
        <MultiCombobox aria-label="Cities" options={places} name="cities" />
      </section>

      <section data-gate="dialogs">
        <h2>Dialogs</h2>
        <Dialog>
          <DialogTrigger asChild>
            <button id="dialog-trigger" type="button">Open dialog</button>
          </DialogTrigger>
          <DialogContent title="Confirm action" description="Check focus restoration.">
            <DialogClose asChild>
              <button type="button">Close dialog</button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Sheet>
          <SheetTrigger asChild>
            <button id="sheet-trigger" type="button">Open sheet</button>
          </SheetTrigger>
          <SheetContent title="Account settings" description="Check focus restoration.">
            <SheetClose asChild>
              <button type="button">Close sheet</button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </section>

      <section data-gate="command-palette">
        <h2>Command palette</h2>
        <button id="command-trigger" type="button" onClick={() => setCommandOpen(true)}>
          Open commands
        </button>
        <CommandPalette
          open={commandOpen}
          onOpenChange={setCommandOpen}
          items={[
            { id: "new-file", label: "New file" },
            { id: "open-file", label: "Open file" },
            { id: "disabled", label: "Disabled action", disabled: true },
          ]}
        />
      </section>

      <section data-gate="carousel">
        <h2>Carousel</h2>
        <Carousel aria-label="Release highlights" autoplay={250}>
          <article>First slide</article>
          <article>Second slide</article>
          <article>Third slide</article>
        </Carousel>
      </section>

      <section data-gate="app-shell">
        <h2>App shell</h2>
        <AppShell>
          <AppShell.Sidebar brand="Monoset" aria-label="Fixture navigation">
            <AppShell.SidebarItem>Overview</AppShell.SidebarItem>
            <AppShell.SidebarItem>Settings</AppShell.SidebarItem>
          </AppShell.Sidebar>
          <AppShell.Main>
            <AppShell.Header>
              <AppShell.MobileTrigger id="app-shell-trigger" />
            </AppShell.Header>
            <AppShell.Content>Fixture content</AppShell.Content>
          </AppShell.Main>
        </AppShell>
      </section>

      <section data-gate="media">
        <h2>Media preferences</h2>
        <Button data-testid="loading-button" loading>Saving</Button>
        <Reveal data-testid="reveal">Reduced motion content</Reveal>
        <Button data-testid="forced-colors-button">Focusable control</Button>
        <Input data-testid="forced-colors-input" aria-label="Focusable input" />
        <Textarea data-testid="forced-colors-textarea" aria-label="Focusable textarea" />
        <Select>
          <SelectTrigger
            data-testid="forced-colors-select"
            aria-label="Focusable select"
            placeholder="Choose an option"
          />
          <SelectContent>
            <SelectItem value="first">First option</SelectItem>
            <SelectItem value="second">Second option</SelectItem>
          </SelectContent>
        </Select>
        <NumberInput
          data-testid="forced-colors-number"
          aria-label="Focusable number input"
          defaultValue={1}
        />
        <PinInput
          data-testid="forced-colors-pin"
          aria-label="Focusable pin input"
          length={4}
        />
        <FileUpload
          data-testid="forced-colors-upload"
          aria-label="Focusable file upload"
        />
      </section>
    </main>
  );
}

const root = document.getElementById("root");
if (!root) throw new Error("Consumer fixture root is missing.");
createRoot(root).render(
  <MonosetProvider tooltip={false} toast={false}>
    <BrowserGateFixture />
  </MonosetProvider>,
);
