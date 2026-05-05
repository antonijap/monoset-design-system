import { forwardRef, useState, type ReactNode } from "react";
import {
  Modal, Pressable, ScrollView, Text, TextInput, View,
  type StyleProp, type ViewStyle,
} from "react-native";
import { colors, fontSize, fontWeight, space, radius } from "./tokens";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  keywords?: string[];
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  filter?: (query: string, option: ComboboxOption) => boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

function defaultFilter(q: string, o: ComboboxOption): boolean {
  const query = q.toLowerCase();
  return (
    o.label.toLowerCase().includes(query) ||
    !!o.description?.toLowerCase().includes(query) ||
    !!o.keywords?.some((k) => k.toLowerCase().includes(query))
  );
}

/**
 * Searchable single-select. Opens a full-screen sheet on tap, with a
 * search field at the top and a scrollable list of matches.
 */
export const Combobox = forwardRef<View, ComboboxProps>(function Combobox(
  { options, value, onValueChange, placeholder = "Select…", searchPlaceholder = "Search…", emptyMessage = "No results.", filter = defaultFilter, disabled, style },
  ref,
) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = options.find((o) => o.value === value) || null;
  const filtered = query.trim() ? options.filter((o) => filter(query, o)) : options;

  return (
    <View ref={ref} style={style}>
      <Pressable
        onPress={() => !disabled && setOpen(true)}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: open, disabled }}
        disabled={disabled}
        style={({ pressed }) => ({
          flexDirection: "row", alignItems: "center", justifyContent: "space-between",
          paddingHorizontal: 14, paddingVertical: 12, minHeight: 44,
          borderWidth: 1, borderColor: pressed ? colors.fg3 : colors.border,
          borderRadius: 12,
          backgroundColor: disabled ? colors.bgMuted : colors.bg,
          opacity: disabled ? 0.6 : 1,
        })}
      >
        <Text style={{ fontSize: fontSize.base, color: selected ? colors.fg1 : colors.fg4 }}>
          {selected ? selected.label : placeholder}
        </Text>
        <Text style={{ fontSize: 12, color: colors.fg3 }}>▾</Text>
      </Pressable>

      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }} onPress={() => setOpen(false)}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              marginTop: "auto", maxHeight: "80%",
              backgroundColor: colors.bg,
              borderTopLeftRadius: 16, borderTopRightRadius: 16,
              paddingTop: 12, paddingBottom: space[7],
            }}
          >
            <View style={{ width: 36, height: 5, borderRadius: 999, backgroundColor: colors.border, alignSelf: "center", marginBottom: space[3] }}/>
            <View style={{ paddingHorizontal: space[5], paddingBottom: space[3], borderBottomWidth: 1, borderBottomColor: colors.borderSubtle }}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={searchPlaceholder}
                placeholderTextColor={colors.fg4}
                autoFocus
                style={{
                  fontSize: fontSize.base, color: colors.fg1,
                  paddingVertical: 10, paddingHorizontal: 12,
                  borderWidth: 1, borderColor: colors.border, borderRadius: 10,
                  backgroundColor: colors.bgSubtle,
                }}
              />
            </View>
            <ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: 360 }}>
              {filtered.length === 0 ? (
                <View style={{ paddingVertical: space[7], alignItems: "center" }}>
                  <Text style={{ fontSize: fontSize.sm, color: colors.fg3 }}>{emptyMessage}</Text>
                </View>
              ) : (
                filtered.map((opt) => {
                  const isSel = opt.value === value;
                  return (
                    <Pressable
                      key={opt.value}
                      disabled={opt.disabled}
                      onPress={() => {
                        onValueChange?.(opt.value);
                        setOpen(false);
                        setQuery("");
                      }}
                      style={({ pressed }) => ({
                        paddingHorizontal: space[5], paddingVertical: space[4],
                        backgroundColor: pressed ? colors.bgMuted : "transparent",
                        opacity: opt.disabled ? 0.5 : 1,
                      })}
                    >
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: fontSize.base, fontWeight: isSel ? fontWeight.semibold : fontWeight.regular, color: colors.fg1 }}>{opt.label}</Text>
                          {opt.description && <Text style={{ fontSize: fontSize.sm, color: colors.fg3, marginTop: 2 }}>{opt.description}</Text>}
                        </View>
                        {isSel && <Text style={{ color: colors.fg1, fontSize: 16 }}>✓</Text>}
                      </View>
                    </Pressable>
                  );
                })
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
});
