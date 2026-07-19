import * as react from 'react';
import { HTMLAttributes, ReactNode } from 'react';

interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title?: ReactNode;
    icon?: ReactNode;
    /** If true, applies `role="alert"` instead of `role="status"`. */
    urgent?: boolean;
}
declare const Alert: react.ForwardRefExoticComponent<AlertProps & react.RefAttributes<HTMLDivElement>>;

export { Alert, type AlertProps };
