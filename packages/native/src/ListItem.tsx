import { forwardRef, type ReactNode } from "react";
import { Pressable, View, Text, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { styles } from "./styles";

export interface ListItemProps extends Omit<PressableProps, "children" | "style"> {
  /** Primary text. */
  title: ReactNode;
  /** Secondary text rendered under the title. */
  subtitle?: ReactNode;
  /** Element rendered before the title (avatar, icon). */
  leading?: ReactNode;
  /** Element rendered after the body (badge, switch, chevron). */
  trailing?: ReactNode;
  /** Show a chevron when the row is tappable and `trailing` is omitted. */
  chevron?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const ListItem = forwardRef<any, ListItemProps>(function ListItem(
  { title, subtitle, leading, trailing, chevron, onPress, style, ...rest },
  ref,
) {
  const tappable = !!onPress;
  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={!tappable}
      style={({ pressed }) => [
        styles.msListItem,
        pressed && tappable && styles.msListItemPressed,
        style,
      ]}
      {...rest}
    >
      {leading}
      <View style={styles.msListItemBody}>
        {typeof title === "string"
          ? <Text style={styles.msListItemTitle} numberOfLines={1}>{title}</Text>
          : title}
        {subtitle && (typeof subtitle === "string"
          ? <Text style={styles.msListItemSubtitle} numberOfLines={1}>{subtitle}</Text>
          : subtitle)}
      </View>
      {trailing ?? (chevron && tappable
        ? <Text style={styles.msListItemChevron}>›</Text>
        : null)}
    </Pressable>
  );
});
