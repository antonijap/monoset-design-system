const docsSlugByModule = {
  "./Accordion": "accordion",
  "./Alert": "alerts",
  "./AppShell": "appshell",
  "./AspectRatio": "aspectratio",
  "./Avatar": "avatars",
  "./Badge": "badges",
  "./Breadcrumb": "breadcrumb",
  "./Button": "buttons",
  "./Calendar": "calendar",
  "./Card": "cards",
  "./Carousel": "carousel",
  "./Checkbox": "toggles",
  "./Collapsible": "collapsible",
  "./Combobox": "combobox",
  "./CommandPalette": "command",
  "./ContextMenu": "contextmenu",
  "./DatePicker": "datepicker",
  "./Dialog": "dialog",
  "./DropdownMenu": "dropdown",
  "./EmptyState": "empty",
  "./FileUpload": "fileupload",
  "./HoverCard": "hovercard",
  "./Input": "inputs",
  "./Kbd": "kbd",
  "./Layout": "layout",
  "./MonosetProvider": "theming",
  "./Motion": "motion",
  "./MultiCombobox": "multicombobox",
  "./NavigationMenu": "navmenu",
  "./NumberInput": "numberinput",
  "./Pagination": "paging",
  "./PasswordInput": "password",
  "./PinInput": "pininput",
  "./Popover": "popover",
  "./Progress": "progress",
  "./RadioGroup": "radio",
  "./Select": "select",
  "./Separator": "separator",
  "./Sheet": "sheet",
  "./Skeleton": "skeleton",
  "./Slider": "slider",
  "./Spinner": "spinner",
  "./Stepper": "stepper",
  "./Switch": "toggles",
  "./Table": "table",
  "./Tabs": "tabs",
  "./Theme": "theming",
  "./Toast": "alerts",
  "./ToggleGroup": "toggle",
  "./Tooltip": "tooltip",
};

const descriptionByName = {
  AccordionContent: "Renders one Accordion panel.",
  AccordionItem: "Groups one Accordion trigger and panel.",
  AccordionTrigger: "Toggles one Accordion panel.",
  Alert: "Shows persistent status or error feedback within the page.",
  Avatar: "Shows a user image with a named fallback, or a decorative avatar.",
  Checkbox: "A form control for checked, unchecked, or indeterminate choices.",
  CollapsibleContent: "Renders the optional Collapsible region.",
  CollapsibleTrigger: "Toggles the Collapsible region.",
  CommandPalette: "A searchable action menu for commands and navigation.",
  Container: "Centers content within a responsive maximum width.",
  ContextMenuContent: "Renders the ContextMenu panel.",
  ContextMenuItem: "Renders one ContextMenu action.",
  ContextMenuLabel: "Labels a group of ContextMenu items.",
  ContextMenuSeparator: "Separates groups of ContextMenu items.",
  ContextMenuTrigger: "Defines the right-click target for a ContextMenu.",
  DialogClose: "Closes the nearest Dialog.",
  DialogContent: "Renders the Dialog overlay and panel.",
  DialogTrigger: "Opens a Dialog.",
  DropdownMenuContent: "Renders the DropdownMenu panel.",
  DropdownMenuItem: "Renders one DropdownMenu action.",
  DropdownMenuLabel: "Labels a group of DropdownMenu items.",
  DropdownMenuSeparator: "Separates groups of DropdownMenu items.",
  DropdownMenuTrigger: "Opens a DropdownMenu.",
  Field: "Connects one control to its label, description, error, and required state.",
  Grid: "Lays out children in a responsive CSS grid.",
  HoverCardContent: "Renders the HoverCard preview panel.",
  HoverCardTrigger: "Defines the element that opens a HoverCard.",
  Inline: "Lays out children horizontally with token-based spacing.",
  Input: "Styles a native input and integrates it with Field.",
  MonosetProvider: "Sets up shared theme, tooltip, toast, and motion behavior.",
  NavigationMenuContent: "Renders one NavigationMenu content panel.",
  NavigationMenuItem: "Groups one NavigationMenu trigger, link, or panel.",
  NavigationMenuLink: "Renders a link within a NavigationMenu.",
  NavigationMenuList: "Groups the top-level NavigationMenu items.",
  NavigationMenuTrigger: "Opens one NavigationMenu content panel.",
  PopoverClose: "Closes the nearest Popover.",
  PopoverContent: "Renders the Popover panel.",
  PopoverTrigger: "Opens a Popover.",
  Radio: "Renders one option in a RadioGroup.",
  Reveal: "Reveals content when it enters the viewport.",
  SelectContent: "Renders the Select options panel.",
  SelectItem: "Renders one Select option.",
  SelectTrigger: "Opens a Select and displays its current value.",
  SheetClose: "Closes the nearest Sheet.",
  SheetContent: "Renders the Sheet overlay and sliding panel.",
  SheetTrigger: "Opens a Sheet.",
  Stack: "Lays out children vertically with token-based spacing.",
  StaggerList: "Reveals a list of children with staggered timing.",
  TableHeader: "Renders a sortable table header cell.",
  TableSelectAll: "Renders the table select-all checkbox.",
  TableSelectRow: "Renders a checkbox for one table row.",
  TabsContent: "Renders one Tabs panel.",
  TabsList: "Groups the Tabs triggers.",
  TabsTrigger: "Selects one Tabs panel.",
  Textarea: "Styles a native textarea and integrates it with Field.",
  ThemeProvider: "Provides light, dark, and system theme state.",
  ThemeToggle: "Cycles through the available themes.",
  ToastProvider: "Provides the shared Toast viewport and timing context.",
  Toast: "Shows brief feedback in the shared Toast viewport.",
  Toggle: "A standalone button with pressed and unpressed states.",
  ToggleGroup: "Groups related toggles with single or multiple selection.",
  ToggleGroupItem: "Renders one option in a ToggleGroup.",
  TooltipProvider: "Shares Tooltip delay settings across an application.",
  Switch: "An on or off control for settings that take effect right away.",
};

export function parseLocalRuntimeExports(indexSource) {
  const exports = [];
  const declarations = indexSource.matchAll(
    /export\s*\{([^{}]*)\}\s*from\s*["']([^"']+)["'];/g,
  );

  for (const declaration of declarations) {
    const [, specifierList, sourceModule] = declaration;
    if (!sourceModule.startsWith(".")) continue;
    for (const rawSpecifier of specifierList.split(",")) {
      const specifier = rawSpecifier.trim();
      if (!specifier || specifier.startsWith("type ")) continue;

      const exportedName = specifier.split(/\s+as\s+/).at(-1)?.trim();
      if (!exportedName || !/^[A-Z]/.test(exportedName)) continue;
      exports.push({ exportedName, sourceModule });
    }
  }

  const names = new Set();
  for (const component of exports) {
    if (names.has(component.exportedName)) {
      throw new Error(`Duplicate React component export: ${component.exportedName}`);
    }
    names.add(component.exportedName);
  }

  return exports.sort((a, b) => a.exportedName.localeCompare(b.exportedName));
}

export function parseLiveDocsRoutes(docsSource) {
  const pages = docsSource.match(
    /(?:export\s+)?const\s+(?:REACT_DOC_ROUTES|PAGES)\s*=\s*\{([\s\S]*?)\n\s*\};/,
  );
  if (!pages) throw new Error("Could not find the website React docs route registry");

  return new Set(
    [...pages[1].matchAll(/^\s*([a-z0-9]+)\s*:/gm)].map((match) => match[1]),
  );
}

export function generateComponentCatalog({ indexSource, pageMeta, liveRoutes }) {
  return parseLocalRuntimeExports(indexSource).map(({ exportedName, sourceModule }) => {
    const slug = docsSlugByModule[sourceModule];
    if (!slug || !liveRoutes.has(slug)) {
      throw new Error(`${exportedName} has no mapped live docs route`);
    }

    const metadata = pageMeta[slug];
    if (!metadata?.desc) {
      throw new Error(`${exportedName} has no docs description at ${slug}`);
    }

    return {
      name: exportedName,
      description: descriptionByName[exportedName] ?? metadata.desc,
      docUrl: `https://monoset.design/${slug}`,
    };
  });
}
