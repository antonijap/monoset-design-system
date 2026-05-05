import { useRef, useState, type ReactElement, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { Popover } from "./Popover";
import { colors, fontSize } from "./tokens";

export interface TooltipProps {
  /** Tooltip body. String renders styled; ReactNode renders raw. */
  content: ReactNode;
  /** The element that triggers the tooltip. Wrapped to capture press. */
  children: ReactElement;
  /** Side relative to the trigger. Default: "top". */
  side?: "top" | "bottom";
  /** Width of the bubble. Default: undefined (auto-fit, max 240). */
  width?: number;
  /** Long-press duration in ms before showing. Default: 400. */
  longPressDelay?: number;
}

/**
 * A short label shown on long-press. Less critical on touch devices
 * than on web, but still useful for icon-only buttons or accessibility.
 */
export function Tooltip({ content, children, side = "top", width, longPressDelay = 400 }: TooltipProps) {
  const triggerRef = useRef<View>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        ref={triggerRef}
        onLongPress={() => setOpen(true)}
        delayLongPress={longPressDelay}
      >
        {children}
      </Pressable>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorRef={triggerRef}
        side={side}
        width={width}
        contentStyle={{ padding: 10, maxWidth: 240 }}
      >
        {typeof content === "string"
          ? <Text style={{ fontSize: fontSize.sm, color: colors.fg1 }}>{content}</Text>
          : content}
      </Popover>
    </>
  );
}
