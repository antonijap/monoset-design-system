import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface StepperStep {
    label: ReactNode;
    /** Optional sublabel below the main label. */
    description?: ReactNode;
}
interface StepperProps extends Omit<ComponentPropsWithoutRef<"ol">, "children"> {
    steps: StepperStep[];
    /** Current step (0-indexed). */
    current: number;
}
/**
 * A horizontal multi-step indicator (1 of N). Use it at the top of a wizard
 * to show progress. The component is presentational; you drive the step state.
 */
declare const Stepper: react.ForwardRefExoticComponent<StepperProps & react.RefAttributes<HTMLOListElement>>;

export { Stepper, type StepperProps, type StepperStep };
