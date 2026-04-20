import { type ReactNode } from "react";
import { cx } from "./cx";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, body, action, className }: EmptyStateProps) {
  return (
    <div className={cx("ms-empty", className)}>
      {icon && <div className="ms-empty__icon" aria-hidden>{icon}</div>}
      <div className="ms-empty__title">{title}</div>
      {body && <div className="ms-empty__body">{body}</div>}
      {action}
    </div>
  );
}
