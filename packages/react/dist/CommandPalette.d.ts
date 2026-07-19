import * as react from 'react';
import { ReactNode } from 'react';

interface CommandItem {
    id: string;
    label: string;
    description?: string;
    icon?: ReactNode;
    /** Called when the action is selected. */
    onSelect?: () => void;
    /** Extra search terms that are not rendered. */
    keywords?: string[];
    disabled?: boolean;
}
interface CommandGroup {
    heading?: string;
    items: CommandItem[];
}
interface CommandPaletteProps {
    /** CommandPalette is explicitly controlled. */
    open: boolean;
    /** Called when an action or dialog interaction requests dismissal. */
    onOpenChange: (open: boolean) => void;
    items?: CommandItem[] | CommandGroup[];
    placeholder?: string;
    emptyMessage?: string;
    filter?: (query: string, item: CommandItem) => boolean;
    footer?: ReactNode;
    className?: string;
}
declare const CommandPalette: react.ForwardRefExoticComponent<CommandPaletteProps & react.RefAttributes<HTMLDivElement>>;

export { type CommandGroup, type CommandItem, CommandPalette, type CommandPaletteProps };
