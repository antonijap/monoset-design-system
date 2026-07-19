import * as react from 'react';
import { ComponentPropsWithoutRef, Key, ReactNode } from 'react';

interface BreadcrumbItem {
    id?: Key;
    label: ReactNode;
    href?: string;
    /** The final crumb — marked aria-current */
    current?: boolean;
}
interface BreadcrumbProps extends Omit<ComponentPropsWithoutRef<"nav">, "children"> {
    items: BreadcrumbItem[];
    separator?: ReactNode;
}
declare const Breadcrumb: react.ForwardRefExoticComponent<BreadcrumbProps & react.RefAttributes<HTMLElement>>;

export { Breadcrumb, type BreadcrumbItem, type BreadcrumbProps };
