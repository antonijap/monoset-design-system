import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Info } from "lucide-react";
import { cx } from "./cx";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  icon?: ReactNode;
  /** If true, applies `role="alert"` instead of `role="status"`. */
  urgent?: boolean;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { title, icon, urgent, className, children, ...rest }, ref
) {
  return (
    <div
      {...rest}
      ref={ref}
      role={urgent ? "alert" : "status"}
      aria-live={urgent ? "assertive" : "polite"}
      className={cx("ms-alert", className)}
    >
      <span className="ms-alert__icon" aria-hidden>
        {icon ?? <Info size={16} strokeWidth={2} />}
      </span>
      <div>
        {title && <div className="ms-alert__title">{title}</div>}
        {children && <div className="ms-alert__msg">{children}</div>}
      </div>
    </div>
  );
});
