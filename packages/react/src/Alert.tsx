import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "./cx";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  icon?: ReactNode;
  /** If true, applies `role="alert"` instead of `role="status"`. */
  urgent?: boolean;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { title, icon = "i", urgent, className, children, ...rest }, ref
) {
  return (
    <div
      ref={ref}
      role={urgent ? "alert" : "status"}
      aria-live={urgent ? "assertive" : "polite"}
      className={cx("ms-alert", className)}
      {...rest}
    >
      <span className="ms-alert__icon" aria-hidden>{icon}</span>
      <div>
        {title && <div className="ms-alert__title">{title}</div>}
        {children && <div className="ms-alert__msg">{children}</div>}
      </div>
    </div>
  );
});
