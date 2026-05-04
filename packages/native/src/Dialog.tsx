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

export interface DialogProps extends Omit<ModalProps, "children"> {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  /** When true (default), tapping the scrim dismisses. */
  dismissible?: boolean;
  children?: ReactNode;
}

/**
 * Centered modal for confirmations and short flows. Use Sheet for anything
 * with multiple inputs or that benefits from feeling rooted to the bottom.
 */
export const Dialog = forwardRef<View, DialogProps>(function Dialog(
  { open, onClose, title, description, dismissible = true, children, ...rest },
  ref,
) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: open ? 180 : 120,
        easing: Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: open ? 1 : 0.96,
        duration: open ? 220 : 140,
        easing: Easing.bezier(0.3, 0, 0, 1),
        useNativeDriver: true,
      }),
    ]).start();
  }, [open, opacity, scale]);

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
      {...rest}
    >
      <Animated.View style={[styles.msDialogScrim, { opacity }]}>
        <Pressable
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          onPress={dismissible ? onClose : undefined}
        />
        <Animated.View
          ref={ref as any}
          style={[styles.msDialog, { transform: [{ scale }] }]}
          accessibilityViewIsModal
        >
          {title && <Text style={styles.msDialogTitle}>{title}</Text>}
          {description && <Text style={styles.msDialogDesc}>{description}</Text>}
          <View style={{ marginTop: title || description ? 16 : 0 }}>
            {children}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
});
