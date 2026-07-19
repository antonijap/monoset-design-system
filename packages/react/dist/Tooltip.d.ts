import * as react_jsx_runtime from 'react/jsx-runtime';
import * as RTooltip from '@radix-ui/react-tooltip';
import { ComponentPropsWithoutRef, ReactNode, ReactElement } from 'react';

interface TooltipProviderProps extends ComponentPropsWithoutRef<typeof RTooltip.Provider> {
}
declare function TooltipProvider({ children, delayDuration, ...props }: TooltipProviderProps): react_jsx_runtime.JSX.Element;
type TooltipRootProps = ComponentPropsWithoutRef<typeof RTooltip.Root>;
type TooltipContentProps = ComponentPropsWithoutRef<typeof RTooltip.Content>;
interface TooltipProps extends Omit<TooltipRootProps, "children"> {
    content: ReactNode;
    children: ReactElement;
    side?: TooltipContentProps["side"];
    sideOffset?: TooltipContentProps["sideOffset"];
    align?: TooltipContentProps["align"];
    className?: string;
    contentProps?: Omit<TooltipContentProps, "children" | "side" | "sideOffset" | "align" | "className">;
}
declare function Tooltip({ content, children, side, sideOffset, align, className, contentProps, ...rootProps }: TooltipProps): react_jsx_runtime.JSX.Element;

export { Tooltip, type TooltipProps, TooltipProvider, type TooltipProviderProps };
