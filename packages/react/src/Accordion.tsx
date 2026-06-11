import * as RAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { cx } from "./cx";

export const Accordion = RAccordion.Root;

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof RAccordion.Item> {}

export const AccordionItem = forwardRef<
  React.ElementRef<typeof RAccordion.Item>,
  AccordionItemProps
>(function AccordionItem({ className, ...rest }, ref) {
  return <RAccordion.Item ref={ref} className={cx("ms-accordion__item", className)} {...rest} />;
});

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RAccordion.Trigger> {
  children: ReactNode;
}

export const AccordionTrigger = forwardRef<
  React.ElementRef<typeof RAccordion.Trigger>,
  AccordionTriggerProps
>(function AccordionTrigger({ className, children, ...rest }, ref) {
  return (
    <RAccordion.Header className="ms-accordion__header">
      <RAccordion.Trigger ref={ref} className={cx("ms-accordion__trigger", className)} {...rest}>
        <span>{children}</span>
        <ChevronDown
          className="ms-accordion__chevron"
          size={14}
          strokeWidth={2}
          aria-hidden={true}
        />
      </RAccordion.Trigger>
    </RAccordion.Header>
  );
});

export const AccordionContent = forwardRef<
  React.ElementRef<typeof RAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RAccordion.Content>
>(function AccordionContent({ className, children, ...rest }, ref) {
  return (
    <RAccordion.Content ref={ref} className={cx("ms-accordion__content", className)} {...rest}>
      <div className="ms-accordion__content-inner">{children}</div>
    </RAccordion.Content>
  );
});
