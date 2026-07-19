import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, type InputProps } from "./Input";
import { cx } from "./cx";

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  /** Show the toggle button. Default: true. */
  showToggle?: boolean;
  /** Override the visible-state text on the toggle button. */
  showLabel?: string;
  hideLabel?: string;
  /** Class name applied to the wrapper when the toggle is visible. */
  wrapperClassName?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({
    showToggle = true,
    showLabel = "Show",
    hideLabel = "Hide",
    className,
    wrapperClassName,
    autoComplete = "current-password",
    disabled,
    ...rest
  }, ref) {
    const [visible, setVisible] = useState(false);
    if (!showToggle) {
      return (
        <Input
          ref={ref}
          type="password"
          className={className}
          autoComplete={autoComplete}
          disabled={disabled}
          {...rest}
        />
      );
    }
    return (
      <div className={cx("ms-password", wrapperClassName)}>
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cx("ms-password__input", className)}
          autoComplete={autoComplete}
          disabled={disabled}
          {...rest}
        />
        <button
          type="button"
          aria-pressed={visible}
          aria-label={visible ? hideLabel : showLabel}
          onClick={() => setVisible((v) => !v)}
          className="ms-password__toggle"
          disabled={disabled}
        >
          {visible ? <EyeOff size={16} strokeWidth={2} aria-hidden /> : <Eye size={16} strokeWidth={2} aria-hidden />}
        </button>
      </div>
    );
  },
);
