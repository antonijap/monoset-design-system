import { forwardRef, type ReactNode } from "react";
import { SafeAreaView, View, type StyleProp, type ViewStyle } from "react-native";
import { colors } from "./tokens";

export interface AppShellProps {
  /** Top app bar element. Usually a `<NavigationHeader/>`. */
  header?: ReactNode;
  /** Bottom navigation. Usually a `<TabBar/>`. */
  tabBar?: ReactNode;
  children?: ReactNode;
  /** Background color of the safe area. Defaults to colors.bg. */
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The root layout for an app screen. Wraps content in a SafeAreaView,
 * stacks `header` (optional), the children, and `tabBar` (optional).
 * The middle section flexes; pass a ScrollView/FlatList as the child
 * to make content scrollable.
 *
 * Compose it with `NavigationHeader` and `TabBar`:
 *
 *   <AppShell
 *     header={<NavigationHeader title="Home"/>}
 *     tabBar={<TabBar items={...} value={...} onValueChange={...}/>}
 *   >
 *     <ScrollView>...</ScrollView>
 *   </AppShell>
 */
export const AppShell = forwardRef<View, AppShellProps>(function AppShell(
  { header, tabBar, children, backgroundColor = colors.bg, style },
  ref,
) {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor }, style]}>
      <View ref={ref} style={{ flex: 1 }}>
        {header}
        <View style={{ flex: 1, minHeight: 0 }}>
          {children}
        </View>
        {tabBar}
      </View>
    </SafeAreaView>
  );
});
