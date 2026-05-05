import { forwardRef, type ReactNode } from "react";
import { cx } from "./cx";

export interface StepperStep {
  label: ReactNode;
  /** Optional sublabel below the main label. */
  description?: ReactNode;
}

export interface StepperProps {
  steps: StepperStep[];
  /** Current step (0-indexed). */
  current: number;
  className?: string;
  "aria-label"?: string;
}

/**
 * A horizontal multi-step indicator (1 of N). Use it at the top of a wizard
 * to show progress. The component is presentational; you drive the step state.
 */
export const Stepper = forwardRef<HTMLOListElement, StepperProps>(function Stepper(
  { steps, current, className, "aria-label": ariaLabel = "Progress" },
  ref,
) {
  return (
    <ol ref={ref} aria-label={ariaLabel} className={cx("ms-stepper", className)}>
      {steps.map((step, i) => {
        const state = i < current ? "done" : i === current ? "current" : "pending";
        return (
          <li key={i} className={cx("ms-stepper__step", `ms-stepper__step--${state}`)}>
            <div className="ms-stepper__dot" aria-current={state === "current" ? "step" : undefined}>
              {state === "done" ? "✓" : i + 1}
            </div>
            <div className="ms-stepper__body">
              <div className="ms-stepper__label">{step.label}</div>
              {step.description && <div className="ms-stepper__desc">{step.description}</div>}
            </div>
            {i < steps.length - 1 && <div className="ms-stepper__connector" aria-hidden/>}
          </li>
        );
      })}
    </ol>
  );
});
