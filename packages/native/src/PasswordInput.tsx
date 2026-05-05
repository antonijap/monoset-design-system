import { forwardRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Input, type InputProps } from "./Input";
import { styles } from "./styles";
import { colors, fontSize, fontWeight } from "./tokens";

export interface PasswordInputProps extends Omit<InputProps, "secureTextEntry"> {
  /** Hide the show/hide toggle. */
  hideToggle?: boolean;
}

export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  function PasswordInput({ hideToggle, style, ...rest }, ref) {
    const [visible, setVisible] = useState(false);
    if (hideToggle) {
      return <Input ref={ref} secureTextEntry style={style} {...rest} />;
    }
    return (
      <View style={{ position: "relative", justifyContent: "center" }}>
        <Input
          ref={ref}
          secureTextEntry={!visible}
          style={[{ paddingRight: 70 }, style]}
          {...rest}
        />
        <Pressable
          onPress={() => setVisible((v) => !v)}
          style={({ pressed }) => ({
            position: "absolute", right: 6, height: 32, paddingHorizontal: 10,
            justifyContent: "center", borderRadius: 6,
            backgroundColor: pressed ? colors.bgMuted : "transparent",
          })}
          hitSlop={8}
          accessibilityLabel={visible ? "Hide password" : "Show password"}
        >
          <Text style={{ fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.fg2 }}>
            {visible ? "Hide" : "Show"}
          </Text>
        </Pressable>
      </View>
    );
  },
);
