import * as react from 'react';
import { ReactNode } from 'react';
import * as RCollapsible from '@radix-ui/react-collapsible';

declare const Collapsible: react.ForwardRefExoticComponent<RCollapsible.CollapsibleProps & react.RefAttributes<HTMLDivElement>>;
interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<typeof RCollapsible.Trigger> {
    children?: ReactNode;
    /** Hide the built-in chevron. Default: false. */
    hideChevron?: boolean;
}
declare const CollapsibleTrigger: react.ForwardRefExoticComponent<CollapsibleTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const CollapsibleContent: react.ForwardRefExoticComponent<Omit<RCollapsible.CollapsibleContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

export { Collapsible, CollapsibleContent, CollapsibleTrigger, type CollapsibleTriggerProps };
