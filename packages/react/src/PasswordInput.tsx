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
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ showToggle = true, showLabel = "Show", hideLabel = "Hide", className, ...rest }, ref) {
    const [visible, setVisible] = useState(false);
    if (!showToggle) {
      return <Input ref={ref} type="password" className={className} {...rest} />;
    }
    return (
      <div className={cx("ms-password", className)}>
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className="ms-password__input"
          autoComplete="current-password"
          {...rest}
        />
        <button
          type="button"
          aria-pressed={visible}
          aria-label={visible ? hideLabel : showLabel}
          onClick={() => setVisible((v) => !v)}
          className="ms-password__toggle"
        >
          {visible ? <EyeOff size={16} strokeWidth={2} aria-hidden /> : <Eye size={16} strokeWidth={2} aria-hidden />}
        </button>
      </div>
    );
  },
);
