import { forwardRef } from "react";
import { View, Text, Image, type ViewProps, type ImageSourcePropType } from "react-native";
import { styles } from "./styles";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends Omit<ViewProps, "children"> {
  /** Person name. Initials are derived from the first two words. */
  name?: string;
  /** Image source. If provided, replaces the initials. */
  source?: ImageSourcePropType;
  size?: AvatarSize;
}

function initials(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "").join("");
}

export const Avatar = forwardRef<View, AvatarProps>(function Avatar(
  { name, source, size = "md", style, ...rest },
  ref,
) {
  const sizeStyle =
    size === "sm" ? styles.msAvatarSm :
    size === "lg" ? styles.msAvatarLg :
                    styles.msAvatarMd;
  const textStyle =
    size === "sm" ? styles.msAvatarTextSm :
    size === "lg" ? styles.msAvatarTextLg :
                    styles.msAvatarTextMd;

  return (
    <View ref={ref} style={[styles.msAvatar, sizeStyle, style]} {...rest}>
      {source ? (
        <Image source={source} style={{ width: "100%", height: "100%" }} />
      ) : (
        <Text style={[styles.msAvatarText, textStyle]}>{initials(name)}</Text>
      )}
    </View>
  );
});
