import * as RToast from "@radix-ui/react-toast";
import { type ReactNode } from "react";
import { cx } from "./cx";

/** Wrap your app in <ToastProvider>…</ToastProvider> to enable toasts. */
export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <RToast.Provider swipeDirection="right" duration={4000}>
      {children}
      <RToast.Viewport className="ms-toast-viewport" />
    </RToast.Provider>
  );
}

export interface ToastProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RToast.Root>, "title"> {
  title?: ReactNode;
  kind?: "success" | "error" | "info";
  action?: ReactNode;
}

export function Toast({ title, kind = "info", action, children, className, ...rest }: ToastProps) {
  return (
    <RToast.Root className={cx("ms-toast", className)} data-kind={kind} {...rest}>
      <span aria-hidden style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff",
        color: kind === "error" ? "var(--status-danger)" : "var(--mono-1000)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
        {kind === "error" ? "!" : "✓"}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <RToast.Title style={{ fontWeight: 600 }}>{title}</RToast.Title>}
        {children && <RToast.Description>{children}</RToast.Description>}
      </div>
      {action && <RToast.Action altText="Action" asChild><span className="ms-toast__action">{action}</span></RToast.Action>}
    </RToast.Root>
  );
}
