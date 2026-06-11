import { forwardRef, useEffect, useRef, type ReactNode } from "react";
import {
  Animated, Easing, Modal, PanResponder, Pressable, View, Text, type ModalProps,
} from "react-native";
import { styles } from "./styles";
import { useReducedMotion } from "./useReducedMotion";

const HIDDEN = 1000;
const DISMISS_DISTANCE = 120;
const DISMISS_VELOCITY = 0.8;

export interface BottomSheetProps extends Omit<ModalProps, "children"> {
  /** Whether the sheet is visible. */
  open: boolean;
  /** Called when the user taps the scrim, drags down, or otherwise dismisses. */
  onClose: () => void;
  /** Optional title shown at the top. */
  title?: ReactNode;
  /** Optional description below the title. */
  description?: ReactNode;
  /** Show the grabber handle. Default: true. */
  grabber?: boolean;
  /** Allow dragging the sheet down to dismiss. Default: true. */
  dragToDismiss?: boolean;
  children?: ReactNode;
}

/**
 * A bottom sheet that slides up over a scrim. Tap the scrim, drag the handle
 * down, or call `onClose` to dismiss. Honors the OS reduce-motion setting.
 */
export const BottomSheet = forwardRef<View, BottomSheetProps>(function BottomSheet(
  { open, onClose, title, description, grabber = true, dragToDismiss = true, children, ...rest },
  ref,
) {
  const reduceMotion = useReducedMotion();
  const translateY = useRef(new Animated.Value(HIDDEN)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Keep the latest callbacks/flags reachable from the (stable) PanResponder.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const dragRef = useRef(dragToDismiss);
  dragRef.current = dragToDismiss;
  const reduceRef = useRef(reduceMotion);
  reduceRef.current = reduceMotion;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: reduceMotion ? 0 : open ? 180 : 120,
        easing: Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: open ? 0 : HIDDEN,
        duration: reduceMotion ? 0 : open ? 280 : 180,
        easing: Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true,
      }),
    ]).start();
  }, [open, opacity, translateY, reduceMotion]);

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => dragRef.current && g.dy > 4 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > DISMISS_DISTANCE || g.vy > DISMISS_VELOCITY) {
          Animated.timing(translateY, {
            toValue: HIDDEN,
            duration: reduceRef.current ? 0 : 200,
            easing: Easing.bezier(0.3, 0, 0, 1),
            useNativeDriver: true,
          }).start(() => onCloseRef.current());
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start();
        }
      },
    }),
  ).current;

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
      {...rest}
    >
      <Animated.View style={{ flex: 1, opacity }}>
        <Pressable style={styles.msSheetScrim} onPress={onClose} accessibilityLabel="Close" />
        <Animated.View
          ref={ref as never}
          style={[styles.msSheet, { transform: [{ translateY }] }]}
          accessibilityViewIsModal
        >
          <View {...pan.panHandlers}>
            {grabber && <View style={styles.msSheetGrabber} />}
            {title && <Text style={styles.msSheetTitle}>{title}</Text>}
            {description && <Text style={styles.msSheetDesc}>{description}</Text>}
          </View>
          <View style={{ marginTop: title || description ? 16 : 0 }}>
            {children}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
});
