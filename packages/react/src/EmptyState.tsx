import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "./cx";

export interface EmptyStateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  icon?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { icon, title, body, action, headingLevel = 2, className, ...rest }, ref,
) {
  const Heading = `h${headingLevel}` as const;

  return (
    <div {...rest} ref={ref} className={cx("ms-empty", className)}>
      {icon && <div className="ms-empty__icon" aria-hidden>{icon}</div>}
      <Heading className="ms-empty__title">{title}</Heading>
      {body && <div className="ms-empty__body">{body}</div>}
      {action && <div className="ms-empty__action">{action}</div>}
    </div>
  );
});
