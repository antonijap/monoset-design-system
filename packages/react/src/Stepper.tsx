import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { Check } from "lucide-react";
import { cx } from "./cx";

export interface StepperStep {
  label: ReactNode;
  /** Optional sublabel below the main label. */
  description?: ReactNode;
}

export interface StepperProps extends Omit<ComponentPropsWithoutRef<"ol">, "children"> {
  steps: StepperStep[];
  /** Current step (0-indexed). */
  current: number;
}

/**
 * A horizontal multi-step indicator (1 of N). Use it at the top of a wizard
 * to show progress. The component is presentational; you drive the step state.
 */
export const Stepper = forwardRef<ElementRef<"ol">, StepperProps>(function Stepper(
  { steps, current, className, "aria-label": ariaLabel = "Progress", ...rest },
  ref,
) {
  const normalizedCurrent =
    steps.length === 0
      ? -1
      : Math.min(
          Math.max(Number.isNaN(current) ? 0 : Math.trunc(current), 0),
          steps.length - 1,
        );

  return (
    <ol
      {...rest}
      ref={ref}
      aria-label={ariaLabel}
      className={cx("ms-stepper", className)}
    >
      {steps.map((step, i) => {
        const state =
          i < normalizedCurrent ? "done" : i === normalizedCurrent ? "current" : "pending";
        return (
          <li
            key={i}
            className={cx("ms-stepper__step", `ms-stepper__step--${state}`)}
            aria-current={state === "current" ? "step" : undefined}
          >
            <div className="ms-stepper__dot">
              {state === "done" ? <Check size={16} strokeWidth={2} aria-hidden /> : i + 1}
            </div>
            <div className="ms-stepper__body">
              <div className="ms-stepper__label">{step.label}</div>
              {step.description != null && (
                <div className="ms-stepper__desc">{step.description}</div>
              )}
            </div>
            {i < steps.length - 1 && <div className="ms-stepper__connector" aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
});
