import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as RHoverCard from '@radix-ui/react-hover-card';

declare const HoverCard: react.FC<RHoverCard.HoverCardProps>;
declare const HoverCardTrigger: react.ForwardRefExoticComponent<RHoverCard.HoverCardTriggerProps & react.RefAttributes<HTMLAnchorElement>>;
interface HoverCardContentProps extends ComponentPropsWithoutRef<typeof RHoverCard.Content> {
    children?: ReactNode;
}
declare const HoverCardContent: react.ForwardRefExoticComponent<HoverCardContentProps & react.RefAttributes<HTMLDivElement>>;

export { HoverCard, HoverCardContent, type HoverCardContentProps, HoverCardTrigger };
