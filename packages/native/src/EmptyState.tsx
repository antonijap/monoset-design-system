import { forwardRef, type ReactNode } from "react";
import { View, Text, type ViewProps } from "react-native";
import { styles } from "./styles";

export interface EmptyStateProps extends Omit<ViewProps, "children"> {
  title: ReactNode;
  body?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}

export const EmptyState = forwardRef<View, EmptyStateProps>(function EmptyState(
  { title, body, icon, action, style, ...rest },
  ref,
) {
  return (
    <View ref={ref} style={[styles.msEmpty, style]} {...rest}>
      {icon && <View style={styles.msEmptyIcon}>{icon}</View>}
      <Text style={styles.msEmptyTitle}>{title}</Text>
      {body && (typeof body === "string"
        ? <Text style={styles.msEmptyBody}>{body}</Text>
        : <View>{body}</View>
      )}
      {action}
    </View>
  );
});
