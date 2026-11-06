import { Pressable, StyleSheet, View } from "react-native";
import { colors, fonts, radius, shadows } from "@/theme";
import { AppText } from "./AppText";

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  accessibilityLabel?: string;
}

/** Substitui o <select> do protótipo web por botões lado a lado. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: SegmentedControlProps<T>) {
  return (
    <View
      style={styles.container}
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={[styles.option, selected && styles.selected]}
          >
            <AppText style={[styles.label, selected && styles.selectedLabel]}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  option: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: radius.sm + 2,
    alignItems: "center",
  },
  selected: { backgroundColor: colors.surface, ...shadows.card },
  label: { fontFamily: fonts.medium, fontSize: 12, color: colors.muted },
  selectedLabel: { color: colors.primary },
});
