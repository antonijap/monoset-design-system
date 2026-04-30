import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import {
  Button,
  Badge,
  Avatar,
  Card,
  Alert,
  Input,
  Textarea,
  Field,
  Checkbox,
  Switch,
  RadioGroup,
  Radio,
  Skeleton,
  EmptyState,
  Pagination,
  Breadcrumb,
  Progress,
  Separator,
  Kbd,
  Spinner,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  SheetContent,
  Sheet,
  AppShell,
  Combobox,
} from "../index";

// Each test renders the component in a minimal-but-complete accessible
// state and asserts axe reports no violations. Radix-backed components
// that require a portal (Dialog, Popover, Tooltip, DropdownMenu, Select,
// Toast) are exercised indirectly through the docs demos; axe inside
// happy-dom struggles with portaled content so we focus on the inline
// components here.

describe("a11y", () => {
  it("Button has no violations", async () => {
    const { container } = render(<Button>Save</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Badge has no violations", async () => {
    const { container } = render(<Badge>New</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Avatar has no violations", async () => {
    const { container } = render(<Avatar name="Ada Turing" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Card has no violations", async () => {
    const { container } = render(
      <Card>
        <h3>Title</h3>
        <p>Body text.</p>
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Alert has no violations", async () => {
    const { container } = render(
      <Alert title="Heads up">Something happened.</Alert>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Field + Input has no violations (explicit label)", async () => {
    const { container } = render(
      <Field label="Email" help="We'll send a confirmation.">
        {({ id, describedBy }) => (
          <Input id={id} aria-describedby={describedBy} type="email" />
        )}
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Field + Textarea has no violations", async () => {
    const { container } = render(
      <Field label="Notes">
        {({ id }) => <Textarea id={id} />}
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Checkbox has no violations", async () => {
    const { container } = render(<Checkbox label="Accept terms" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Switch has no violations", async () => {
    const { container } = render(<Switch label="Email alerts" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("RadioGroup has no violations", async () => {
    const { container } = render(
      <RadioGroup defaultValue="a" aria-label="Pick one">
        <Radio value="a" label="One" />
        <Radio value="b" label="Two" />
      </RadioGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Tabs has no violations", async () => {
    const { container } = render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Overview</TabsTrigger>
          <TabsTrigger value="b">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Skeleton has no violations", async () => {
    const { container } = render(<Skeleton />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("EmptyState has no violations", async () => {
    const { container } = render(
      <EmptyState title="No results" description="Try a different search." />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Pagination has no violations", async () => {
    const { container } = render(
      <Pagination page={1} pageCount={10} onPageChange={() => {}} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Breadcrumb has no violations", async () => {
    const { container } = render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs" },
          { label: "Buttons" },
        ]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Progress has no violations", async () => {
    const { container } = render(<Progress value={60} aria-label="Loading" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Separator has no violations", async () => {
    const { container } = render(<Separator />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Kbd has no violations", async () => {
    const { container } = render(<Kbd>⌘K</Kbd>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Spinner has no violations", async () => {
    const { container } = render(<Spinner label="Loading" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Sheet has no violations", async () => {
    const { container } = render(
      <Sheet open>
        <SheetContent title="Filters" description="Narrow down results.">
          <p>Sheet body content</p>
        </SheetContent>
      </Sheet>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Combobox has no violations", async () => {
    const { container } = render(
      <Combobox
        aria-label="Country"
        options={[
          { value: "us", label: "United States" },
          { value: "fr", label: "France" },
          { value: "de", label: "Germany" },
        ]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("AppShell has no violations", async () => {
    const { container } = render(
      <AppShell>
        <AppShell.Sidebar brand={<span>Acme</span>}>
          <AppShell.SidebarGroup label="Main">
            <AppShell.SidebarItem active>Dashboard</AppShell.SidebarItem>
            <AppShell.SidebarItem>Settings</AppShell.SidebarItem>
          </AppShell.SidebarGroup>
        </AppShell.Sidebar>
        <AppShell.Main>
          <AppShell.Header>
            <AppShell.MobileTrigger />
            <h1>Page title</h1>
          </AppShell.Header>
          <AppShell.Content>
            <p>Main content here.</p>
          </AppShell.Content>
        </AppShell.Main>
      </AppShell>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
