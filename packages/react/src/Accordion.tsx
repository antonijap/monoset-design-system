import * as RAccordion from "@radix-ui/react-accordion";
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
        <svg
          className="ms-accordion__chevron"
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
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
