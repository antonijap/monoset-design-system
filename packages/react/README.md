# @monoset/react

Brand-neutral React components for Monoset. See the [live documentation](https://monoset.design).

## Install

```bash
npm install @monoset/react @monoset/tokens react react-dom
```

React and ReactDOM are peer dependencies. Radix, React Aria, Framer Motion, and Lucide are implementation dependencies.

React 18 and 19 are supported. The peer dependency range is `>=18` for both React and ReactDOM.

## Setup

```tsx
import "@monoset/tokens/css";
import "@monoset/react/styles.css";
import { Button, MonosetProvider } from "@monoset/react";

export default function App() {
  return (
    <MonosetProvider>
      <Button variant="primary">Save changes</Button>
    </MonosetProvider>
  );
}
```

`@monoset/tokens/css` includes variables, base element styles, and typography defaults. If your app owns its reset and typography, import `@monoset/tokens/variables.css` instead. Import the React stylesheet after either token entry.

`MonosetProvider` adds shared tooltip and toast providers. It also configures Framer Motion to follow the user's reduced-motion preference. Theme management is opt-in through the `theme` prop.

## Components

The package includes buttons, form controls, date and collection inputs, navigation, overlays, feedback, data display, and layout primitives. The selective CSS table below is also the component index. Each row names the public components covered by that stylesheet.

Browse rendered examples and usage notes in the [live component documentation](https://monoset.design).

## Selective CSS

`@monoset/react/styles.css` is the complete entry. For less CSS, load token CSS first, then `styles/base.css`, the component entries you use, and `styles/feedback.css`.

Base owns shared utilities. Feedback owns shared motion and accessibility fallbacks. Family entries are convenience bundles. Component entries minimize CSS.

This Select-with-Field example needs the Select, Field, and shared menu styles:

```tsx
import "@monoset/tokens/css";
import "@monoset/react/styles/base.css";
import "@monoset/react/styles/field.css";
import "@monoset/react/styles/menu.css";
import "@monoset/react/styles/select.css";
import "@monoset/react/styles/feedback.css";
```

### Component entries

The table lists component entries and their extra CSS dependencies. Token CSS, `base.css`, and `feedback.css` still apply to every selective setup.

| Entry | Components | Also load |
| --- | --- | --- |
| `button.css` | Button, ThemeToggle | None |
| `badge.css` | Badge | None |
| `avatar.css` | Avatar | None |
| `card.css` | Card | None |
| `alert.css` | Alert | None |
| `field.css` | Field | None |
| `input.css` | Input, Textarea | None |
| `choice-controls.css` | Checkbox, Switch, RadioGroup, Radio | None |
| `select.css` | Select, SelectTrigger, SelectContent, SelectItem | menu.css; field.css when wrapped in Field |
| `slider.css` | Slider | None |
| `toggle.css` | Toggle, ToggleGroup, ToggleGroupItem | None |
| `tabs.css` | Tabs, TabsList, TabsTrigger, TabsContent | None |
| `pagination.css` | Pagination | None |
| `breadcrumb.css` | Breadcrumb | None |
| `accordion.css` | Accordion, AccordionItem, AccordionTrigger, AccordionContent | None |
| `stepper.css` | Stepper | None |
| `navigation-menu.css` | NavigationMenu family | None |
| `collapsible.css` | Collapsible, CollapsibleTrigger, CollapsibleContent | None |
| `table.css` | Table, TableHeader, TableSelectAll, TableSelectRow | None |
| `skeleton.css` | Skeleton | None |
| `empty.css` | EmptyState | None |
| `progress.css` | Progress | None |
| `separator.css` | Separator | None |
| `kbd.css` | Kbd | None |
| `spinner.css` | Spinner | None |
| `carousel.css` | Carousel | None |
| `aspect-ratio.css` | AspectRatio | None |
| `dialog.css` | Dialog, DialogTrigger, DialogContent, DialogClose | None |
| `menu.css` | Popover family, Tooltip, DropdownMenu family, ContextMenu family | None |
| `sheet.css` | Sheet, SheetTrigger, SheetContent, SheetClose | None |
| `command.css` | CommandPalette | None |
| `hover-card.css` | HoverCard, HoverCardTrigger, HoverCardContent | None |
| `combobox.css` | Combobox | None |
| `password-input.css` | PasswordInput | input.css |
| `number-input.css` | NumberInput | None |
| `pin-input.css` | PinInput | None |
| `file-upload.css` | FileUpload | None |
| `multi-combobox.css` | MultiCombobox | combobox.css |
| `date-picker.css` | DatePicker | calendar.css |
| `calendar.css` | Calendar | None |
| `layout.css` | Stack, Inline, Grid, Container, AppShell | None |
| `feedback.css` | Toast, ToastProvider | None |

## Fields and forms

`Field` connects its label, description, error, and required state to a direct `Input` or `Textarea` child.

```tsx
import { Field, Input } from "@monoset/react";

<Field label="Email" description="Used for receipts" required>
  <Input type="email" name="email" autoComplete="email" />
</Field>
```

Compound controls use `Field.Control` to receive the generated label and description props.

```tsx
<Field label="Role" error={!role ? "Choose a role" : undefined}>
  <Select value={role} onValueChange={setRole} name="role">
    <Field.Control>
      {props => <SelectTrigger {...props} placeholder="Choose a role" />}
    </Field.Control>
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="member">Member</SelectItem>
    </SelectContent>
  </Select>
</Field>
```

Stateful controls support controlled and uncontrolled use. Use `value` with its change callback when your app owns state. Use `defaultValue` for local state. Form-capable controls expose `name`, and several also accept `form`, `required`, or `readOnly`.

## Motion

Motion helpers are in a separate entry so regular component imports stay independent of the helper API.

```tsx
import { motion } from "framer-motion";
import { Reveal, fadeUp, hoverLift } from "@monoset/react/motion";

<Reveal variant={fadeUp}>Loaded</Reveal>
```

Add `framer-motion` as a direct dependency when your code imports from it.

## Accessibility

Radix and React Aria provide behavior for the components built on them. Custom components implement their own keyboard and ARIA behavior. You still need to provide useful labels, page structure, error copy, and alt text. Test the finished page with a keyboard, axe, and a screen reader.

Reduced motion changes or removes movement where each component implements it. It does not disable every CSS transition in an application.

## React v1 migration

- Use `Toast` props or `useToast`; the unstyled subprimitive exports are gone.
- Import `Reveal` and motion presets from `@monoset/react/motion`, not the package root.
- Replace `TableHeader sorted` with `sortable` and `sortDirection`.
- Replace `Checkbox onChange` and `Switch onChange` with `onCheckedChange`.
- Remove `Form`, `useMonosetForm`, and `StaggerList`. Keep form state in React or your form library.
- Wrap custom Field controls with `Field.Control`. Direct `Input` and `Textarea` children need no wrapper.

## Verification

The React v1 release gate runs 466 automated tests and 9 browser gates. The packed package is checked as ESM, CommonJS, and TypeScript, including server rendering. A Button-only production import measures about 1.07 KB gzip.

## Limits

- Components do not choose page headings, landmark structure, or accessible names for your content.
- `Badge` has `neutral`, `solid`, and `outline` variants. It does not infer status semantics.
- `Tabs` ships the underline treatment. Use `ToggleGroup` for a segmented choice.
- React re-exports `CalendarDate`, so consumer code can import it from `@monoset/react`.
