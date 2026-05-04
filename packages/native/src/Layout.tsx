import { forwardRef, type ReactNode } from "react";
import { View, type ViewProps, type StyleProp, type ViewStyle } from "react-native";
import { styles } from "./styles";
import { space } from "./tokens";

type SpaceKey = keyof typeof space;

interface BaseLayoutProps extends Omit<ViewProps, "children"> {
  /** Gap token. 0-14, mapped to the spacing scale. */
  gap?: SpaceKey;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/* ─── Stack ─────────────────────────────────────────────────────── */

export interface StackProps extends BaseLayoutProps {
  /** Cross-axis alignment. Default: "stretch". */
  align?: "stretch" | "start" | "center" | "end";
}

const alignMap: Record<NonNullable<StackProps["align"]>, ViewStyle["alignItems"]> = {
  stretch: "stretch",
  start:   "flex-start",
  center:  "center",
  end:     "flex-end",
};

export const Stack = forwardRef<View, StackProps>(function Stack(
  { gap = 4, align = "stretch", children, style, ...rest },
  ref,
) {
  return (
    <View
      ref={ref}
      style={[styles.msStack, { gap: space[gap], alignItems: alignMap[align] }, style]}
      {...rest}
    >
      {children}
    </View>
  );
});

/* ─── Inline ────────────────────────────────────────────────────── */

export interface InlineProps extends BaseLayoutProps {
  /** Cross-axis alignment. Default: "center". */
  align?: "start" | "center" | "end" | "stretch";
  /** Main-axis alignment. Default: "start". */
  justify?: "start" | "center" | "end" | "between" | "around";
  /** Wrap items onto multiple lines. */
  wrap?: boolean;
}

const justifyMap: Record<NonNullable<InlineProps["justify"]>, ViewStyle["justifyContent"]> = {
  start:   "flex-start",
  center:  "center",
  end:     "flex-end",
  between: "space-between",
  around:  "space-around",
};

export const Inline = forwardRef<View, InlineProps>(function Inline(
  { gap = 3, align = "center", justify = "start", wrap, children, style, ...rest },
  ref,
) {
  return (
    <View
      ref={ref}
      style={[
        styles.msInline,
        {
          gap: space[gap],
          alignItems: alignMap[align],
          justifyContent: justifyMap[justify],
          flexWrap: wrap ? "wrap" : "nowrap",
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
});
