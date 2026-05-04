import { forwardRef, useEffect, useRef, type ReactNode } from "react";
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  View,
  Text,
  type ModalProps,
} from "react-native";
import { styles } from "./styles";

export interface SheetProps extends Omit<ModalProps, "children"> {
  /** Whether the sheet is visible. */
  open: boolean;
  /** Called when the user taps the scrim or otherwise dismisses. */
  onClose: () => void;
  /** Optional title shown at the top. */
  title?: ReactNode;
  /** Optional description below the title. */
  description?: ReactNode;
  /** Show the iOS-style grabber at the top. Default true. */
  grabber?: boolean;
  children?: ReactNode;
}

/**
 * BottomSheet built on RN Modal. Slides up from the bottom over a scrim.
 * Tap the scrim or call `onClose` to dismiss.
 */
export const Sheet = forwardRef<View, SheetProps>(function Sheet(
  { open, onClose, title, description, grabber = true, children, ...rest },
  ref,
) {
  const translateY = useRef(new Animated.Value(40)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: open ? 180 : 120,
        easing: Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: open ? 0 : 40,
        duration: open ? 280 : 180,
        easing: Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true,
      }),
    ]).start();
  }, [open, opacity, translateY]);

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
        <Pressable style={styles.msSheetScrim} onPress={onClose}/>
        <Animated.View
          ref={ref as any}
          style={[styles.msSheet, { transform: [{ translateY }] }]}
          accessibilityViewIsModal
        >
          {grabber && <View style={styles.msSheetGrabber}/>}
          {title && (
            <Text style={styles.msSheetTitle}>{title}</Text>
          )}
          {description && (
            <Text style={styles.msSheetDesc}>{description}</Text>
          )}
          <View style={{ marginTop: title || description ? 16 : 0 }}>
            {children}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
});
