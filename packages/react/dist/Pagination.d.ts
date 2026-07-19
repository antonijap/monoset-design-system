import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface PaginationProps extends Omit<ComponentPropsWithoutRef<"nav">, "children"> {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    /** Max numbered buttons shown — defaults to 7. Ellipsis fills gaps. */
    siblings?: number;
    prevLabel?: ReactNode;
    nextLabel?: ReactNode;
}
declare const Pagination: react.ForwardRefExoticComponent<PaginationProps & react.RefAttributes<HTMLElement>>;

export { Pagination, type PaginationProps };
