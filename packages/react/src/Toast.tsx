import * as RToast from "@radix-ui/react-toast";
import { useReducedMotionConfig } from "framer-motion";
import { AlertCircle, Check, Info, X } from "lucide-react";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cx } from "./cx";

export type ToastKind = "success" | "error" | "info";

type ToastActionProps =
  | {
      action: ReactNode;
      actionAltText: string;
      onAction?: () => void;
    }
  | {
      action?: undefined;
      actionAltText?: never;
      onAction?: never;
    };

interface ToastBaseProps
  extends Omit<ComponentPropsWithoutRef<typeof RToast.Root>, "title"> {
  title?: ReactNode;
  kind?: ToastKind;
  closeLabel?: string;
}

export type ToastProps = ToastBaseProps & ToastActionProps;

export type ToastInput = Omit<
  ToastBaseProps,
  "open" | "defaultOpen" | "children" | "id"
> &
  ToastActionProps & {
    description?: ReactNode;
  };

export type ToastItem = ToastInput & { id: number };

export interface ToastApi {
  /** Queue a toast and return its id. */
  toast: (item: ToastInput) => number;
  /** Dismiss a queued toast by id. */
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastApi | null>(null);
let nextToastId = 1;

export function useToast(): ToastApi {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be called inside <ToastProvider>.");
  }
  return context;
}

export interface ToastProviderProps
  extends ComponentPropsWithoutRef<typeof RToast.Provider> {}

/** Wrap your app in ToastProvider to enable declarative and queued toasts. */
export function ToastProvider({
  children,
  duration = 4000,
  swipeDirection = "right",
  ...props
}: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const id = nextToastId++;
    setItems((current) => [...current, { ...input, id }]);
    return id;
  }, []);

  const context = useMemo<ToastApi>(
    () => ({ toast, dismiss }),
    [dismiss, toast],
  );

  return (
    <RToast.Provider
      {...props}
      duration={duration}
      swipeDirection={swipeDirection}
    >
      <ToastContext.Provider value={context}>
        {children}
        {items.map(({ id, description, onOpenChange, ...item }) => (
          <Toast
            key={id}
            {...item}
            open
            onOpenChange={(open) => {
              onOpenChange?.(open);
              if (!open) dismiss(id);
            }}
          >
            {description}
          </Toast>
        ))}
      </ToastContext.Provider>
      <RToast.Viewport className="ms-toast-viewport" />
    </RToast.Provider>
  );
}

export const Toast = forwardRef<
  ElementRef<typeof RToast.Root>,
  ToastProps
>(function Toast(
  {
    title,
    kind = "info",
    action,
    actionAltText,
    onAction,
    closeLabel = "Dismiss notification",
    children,
    className,
    style,
    type,
    ...rest
  },
  ref,
) {
  const reducedMotion = useReducedMotionConfig();
  const announcementType = type ?? (kind === "error" ? "foreground" : "background");
  const Icon = kind === "error" ? AlertCircle : kind === "success" ? Check : Info;

  return (
    <RToast.Root
      {...rest}
      ref={ref}
      type={announcementType}
      className={cx("ms-toast", className)}
      data-kind={kind}
      data-reduced-motion={reducedMotion ? "true" : undefined}
      style={reducedMotion ? { ...style, animation: "none" } : style}
    >
      <span
        className="ms-toast__icon"
        aria-hidden="true"
      >
        <Icon size={12} strokeWidth={2} />
      </span>
      <div className="ms-toast__content">
        {title != null && (
          <RToast.Title className="ms-toast__title">
            {title}
          </RToast.Title>
        )}
        {children != null && (
          <RToast.Description className="ms-toast__description">
            {children}
          </RToast.Description>
        )}
      </div>
      {action != null && actionAltText != null && (
        <RToast.Action
          altText={actionAltText}
          className="ms-toast__action"
          onClick={onAction}
        >
          {action}
        </RToast.Action>
      )}
      <RToast.Close className="ms-toast__close" aria-label={closeLabel}>
        <X aria-hidden="true" size={14} strokeWidth={2} />
      </RToast.Close>
    </RToast.Root>
  );
});
