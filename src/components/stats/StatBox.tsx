import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import type { ColorTone, IconName } from "@/interfaces";
import { colors, fonts, radius, shadows, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { ToneIcon } from "../common/ToneIcon";

interface StatBoxProps {
  icon: IconName;
  color: ColorTone;
  label: string;
  value: ReactNode;
  unit?: string;
  caption: string;
}

export function StatBox({ icon, color, label, value, unit, caption }: StatBoxProps) {
  return (
    <View style={styles.card}>
      <ToneIcon name={icon} tone={color} size={32} iconSize={16} />
      <AppText variant="caption">{label}</AppText>
      <View style={styles.valueRow}>
        <AppText variant="metric">{value}</AppText>
        {unit && <AppText variant="caption">{unit}</AppText>}
      </View>
      <AppText variant="caption" color={colors.success} numberOfLines={1}>
        {caption}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 4,
    ...shadows.card,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
});
