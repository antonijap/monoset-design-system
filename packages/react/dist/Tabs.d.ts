import * as react from 'react';
import { ReactNode } from 'react';
import * as RTabs from '@radix-ui/react-tabs';

declare const Tabs: react.ForwardRefExoticComponent<RTabs.TabsProps & react.RefAttributes<HTMLDivElement>>;
declare const TabsList: react.ForwardRefExoticComponent<Omit<RTabs.TabsListProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof RTabs.Trigger> {
    children?: ReactNode;
}
declare const TabsTrigger: react.ForwardRefExoticComponent<TabsTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: react.ForwardRefExoticComponent<RTabs.TabsContentProps & react.RefAttributes<HTMLDivElement>>;

export { Tabs, TabsContent, TabsList, TabsTrigger, type TabsTriggerProps };
