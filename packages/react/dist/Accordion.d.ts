import * as react from 'react';
import { ReactNode } from 'react';
import * as RAccordion from '@radix-ui/react-accordion';

declare const Accordion: react.ForwardRefExoticComponent<(RAccordion.AccordionSingleProps | RAccordion.AccordionMultipleProps) & react.RefAttributes<HTMLDivElement>>;
interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof RAccordion.Item> {
}
declare const AccordionItem: react.ForwardRefExoticComponent<AccordionItemProps & react.RefAttributes<HTMLDivElement>>;
interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof RAccordion.Trigger> {
    children: ReactNode;
}
declare const AccordionTrigger: react.ForwardRefExoticComponent<AccordionTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: react.ForwardRefExoticComponent<Omit<RAccordion.AccordionContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

export { Accordion, AccordionContent, AccordionItem, type AccordionItemProps, AccordionTrigger, type AccordionTriggerProps };
