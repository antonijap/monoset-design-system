import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Animated, Easing, Modal, Pressable, View, useWindowDimensions, type LayoutChangeEvent, type StyleProp, type ViewStyle,
} from "react-native";
import { colors, radius, shadow } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";

export interface PopoverProps {
  open: boolean;
  onClose: () => void;
  /** Anchor element. Required for positioning. */
  anchorRef: React.RefObject<View | null>;
  /** Side of the anchor. Default: "bottom". */
  side?: "top" | "bottom";
  /** Distance from the anchor in pixels. Default: 6. */
  sideOffset?: number;
  /** Custom width, or "auto" to size to content. Default: matches the anchor. */
  width?: number | "auto";
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
  const reduceMotion = useReducedMotion();
  const { width: windowWidth } = useWindowDimensions();
  const [anchor, setAnchor] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [host, setHost] = useState<{ w: number; h: number } | null>(null);
  const backdropRef = useRef<View>(null);
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
        Animated.timing(opacity, { toValue: 1, duration: reduceMotion ? 0 : 140, easing: Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
        Animated.timing(ty,      { toValue: 0, duration: reduceMotion ? 0 : 180, easing: Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0,                    duration: reduceMotion ? 0 : 140, easing: Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
        Animated.timing(ty,      { toValue: side === "top" ? 4 : -4, duration: reduceMotion ? 0 : 180, easing: Easing.bezier(0.3, 0, 0, 1), useNativeDriver: true }),
      ]).start();
    }
  }, [open, opacity, ty, side, reduceMotion]);

  if (!open || !anchor) return null;

  // measureInWindow gives window coordinates. The modal host is usually the
  // full window (origin 0,0 on native), but when it isn't, subtract the
  // backdrop's own window offset so the panel stays anchored. All edge math
  // happens in host space against the host's measured bounds.
  const EDGE = 12;
  const hostW = host?.w ?? windowWidth;
  const isAuto = width === "auto";
  const maxW = hostW - EDGE * 2;
  const w = isAuto ? undefined : Math.min(width ?? anchor.w, maxW);
  const panelW = w ?? size.w;

  const anchorLeft = anchor.x - origin.x;
  const anchorRight = anchor.x + anchor.w - origin.x;
  let left = anchorLeft;
  if (panelW > 0) {
    // Prefer left-aligning with the anchor; if that would run past the right
    // edge, right-align with the anchor instead, then clamp to the edges.
    if (anchorLeft + panelW > hostW - EDGE) left = anchorRight - panelW;
    left = Math.max(EDGE, Math.min(left, hostW - panelW - EDGE));
  }

  let top = (side === "bottom"
    ? anchor.y + anchor.h + sideOffset
    : anchor.y - size.h - sideOffset) - origin.y;
  if (host && size.h > 0) {
    top = Math.max(EDGE, Math.min(top, host.h - size.h - EDGE));
  }

  const onContentLayout = (e: LayoutChangeEvent) => {
    setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });
  };

  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <Pressable
        ref={backdropRef}
        style={{ flex: 1 }}
        onPress={onClose}
        onLayout={(e) => {
          const { width: lw, height: lh } = e.nativeEvent.layout;
          setHost({ w: lw, h: lh });
          backdropRef.current?.measureInWindow((x, y) => setOrigin({ x, y }));
        }}
      >
        <Animated.View
          ref={ref as any}
          onStartShouldSetResponder={() => true}
          onLayout={onContentLayout}
          style={[
            {
              position: "absolute",
              top, left, ...(w !== undefined ? { width: w } : null),
              backgroundColor: colors.bg,
              borderColor: colors.borderSubtle, borderWidth: 1,
              borderRadius: radius.xl, padding: 8,
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
