import * as react from 'react';
import { HTMLAttributes, ReactNode } from 'react';

interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    icon?: ReactNode;
    title: ReactNode;
    body?: ReactNode;
    action?: ReactNode;
    headingLevel?: 2 | 3 | 4 | 5 | 6;
}
declare const EmptyState: react.ForwardRefExoticComponent<EmptyStateProps & react.RefAttributes<HTMLDivElement>>;

export { EmptyState, type EmptyStateProps };
