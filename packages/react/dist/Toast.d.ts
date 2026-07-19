import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as RToast from '@radix-ui/react-toast';

type ToastKind = "success" | "error" | "info";
type ToastActionProps = {
    action: ReactNode;
    actionAltText: string;
    onAction?: () => void;
} | {
    action?: undefined;
    actionAltText?: never;
    onAction?: never;
};
interface ToastBaseProps extends Omit<ComponentPropsWithoutRef<typeof RToast.Root>, "title"> {
    title?: ReactNode;
    kind?: ToastKind;
    closeLabel?: string;
}
type ToastProps = ToastBaseProps & ToastActionProps;
type ToastInput = Omit<ToastBaseProps, "open" | "defaultOpen" | "children" | "id"> & ToastActionProps & {
    description?: ReactNode;
};
type ToastItem = ToastInput & {
    id: number;
};
interface ToastApi {
    /** Queue a toast and return its id. */
    toast: (item: ToastInput) => number;
    /** Dismiss a queued toast by id. */
    dismiss: (id: number) => void;
}
declare function useToast(): ToastApi;
interface ToastProviderProps extends ComponentPropsWithoutRef<typeof RToast.Provider> {
}
/** Wrap your app in ToastProvider to enable declarative and queued toasts. */
declare function ToastProvider({ children, duration, swipeDirection, ...props }: ToastProviderProps): react_jsx_runtime.JSX.Element;
declare const Toast: react.ForwardRefExoticComponent<ToastProps & react.RefAttributes<HTMLLIElement>>;

export { Toast, type ToastApi, type ToastInput, type ToastItem, type ToastKind, type ToastProps, ToastProvider, type ToastProviderProps, useToast };
