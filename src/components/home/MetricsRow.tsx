import { StyleSheet, View } from "react-native";
import { formatNumber } from "@/services/formatService";
import { colors, fonts, radius, shadows, spacing } from "@/theme";
import { AppText } from "../common/AppText";

import { ToneIcon } from "../common/ToneIcon";

interface MetricsRowProps {
  studyHours: number;
  questionsSolved: number;
  accuracyPercent: number;
}

export function MetricsRow({ studyHours, questionsSolved, accuracyPercent }: MetricsRowProps) {
  return (
    <View style={styles.container}>
      {/* Horas */}
      <View style={styles.card}>
        <View style={styles.header}>
          <AppText variant="caption" numberOfLines={1}>
            Horas
          </AppText>
          <ToneIcon name="clock" tone="purple" size={26} iconSize={14} />
        </View>
        <AppText variant="subheading" style={styles.value}>
          {formatNumber(studyHours)}h
        </AppText>
        <AppText variant="caption">Nesta semana</AppText>
      </View>

      {/* Questões */}
      <View style={styles.card}>
        <View style={styles.header}>
          <AppText variant="caption" numberOfLines={1}>
            Questões
          </AppText>
          <ToneIcon name="book" tone="blue" size={26} iconSize={14} />
        </View>
        <AppText variant="subheading" style={styles.value}>
          {questionsSolved}
        </AppText>
        <AppText variant="caption">Nesta semana</AppText>
      </View>

      {/* Acertos */}
      <View style={styles.card}>
        <View style={styles.header}>
          <AppText variant="caption" numberOfLines={1}>
            Acertos
          </AppText>
          <ToneIcon name="target" tone="green" size={26} iconSize={14} />
        </View>
        <AppText variant="subheading" style={styles.value}>
          {accuracyPercent}%
        </AppText>
        <AppText variant="caption">Nesta semana</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm + 2,
    ...shadows.card,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  value: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text,
  },
});
