import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Animated, Easing, Modal, Pressable, View, type LayoutChangeEvent, type StyleProp, type ViewStyle,
} from "react-native";
import { colors, radius, shadow } from "./tokens";

export interface PopoverProps {
  open: boolean;
  onClose: () => void;
  /** Anchor element. Required for positioning. */
  anchorRef: React.RefObject<View | null>;
  /** Side of the anchor. Default: "bottom". */
  side?: "top" | "bottom";
  /** Distance from the anchor in pixels. Default: 6. */
  sideOffset?: number;
  /** Custom width. Default: matches the anchor. */
  width?: number;
  children?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * A floating panel anchored to a trigger. The anchor's screen coordinates
 * are measured when the popover opens; reposition by closing/reopening.
 *
 * Usage:
 *   const triggerRef = useRef<View>(null);
 *   <Pressable ref={triggerRef} onPress={() => setOpen(true)}>...</Pressable>
 *   <Popover open={open} onClose={() => setOpen(false)} anchorRef={triggerRef}>
 *     ...
 *   </Popover>
 */
export const Popover = forwardRef<View, PopoverProps>(function Popover(
  { open, onClose, anchorRef, side = "bottom", sideOffset = 6, width, children, contentStyle },
  ref,
) {
  const [anchor, setAnchor] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(side === "top" ? 4 : -4)).current;

  useEffect(() => {
    if (open && anchorRef.current) {
      anchorRef.current.measureInWindow((x, y, w, h) => setAnchor({ x, y, w, h }));
    } else {
      setAnchor(null);
    }
  }, [open, anchorRef]);

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 140, easing: Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
        Animated.timing(ty,      { toValue: 0, duration: 180, easing: Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
      ]).start();
    } else {
      opacity.setValue(0);
      ty.setValue(side === "top" ? 4 : -4);
    }
  }, [open, opacity, ty, side]);

  if (!open || !anchor) return null;

  const w = width ?? anchor.w;
  const top = side === "bottom"
    ? anchor.y + anchor.h + sideOffset
    : anchor.y - size.h - sideOffset;
  const left = anchor.x;

  const onContentLayout = (e: LayoutChangeEvent) => {
    setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });
  };

  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        <Animated.View
          ref={ref as any}
          onStartShouldSetResponder={() => true}
          onLayout={onContentLayout}
          style={[
            {
              position: "absolute",
              top, left, width: w,
              backgroundColor: colors.bg,
              borderColor: colors.border, borderWidth: 1,
              borderRadius: 12, padding: 8,
              opacity, transform: [{ translateY: ty }],
            },
            shadow.lg,
            contentStyle,
          ]}
        >
          {children}
        </Animated.View>
      </Pressable>
    </Modal>
  );
});
