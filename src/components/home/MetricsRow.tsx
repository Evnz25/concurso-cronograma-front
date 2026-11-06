import { StyleSheet, View } from "react-native";
import { formatNumber } from "@/services/formatService";
import { colors, fonts, radius, shadows, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Icon } from "../common/Icon";
import { ToneIcon } from "../common/ToneIcon";

const SPARKLINE = [20, 35, 26, 45, 38, 54, 62, 48, 70, 61, 82, 98];

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
        <View style={styles.sparklineContainer}>
          {SPARKLINE.slice(0, 8).map((height, i) => (
            <View
              key={i}
              style={[
                styles.sparkBar,
                {
                  height: `${height}%`,
                },
              ]}
            />
          ))}
        </View>
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
        <View style={styles.trendRow}>
          <Icon name="trend" size={13} color={colors.success} />
          <AppText variant="caption" color={colors.success}>
            +24%
          </AppText>
        </View>
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
        <View style={styles.trendRow}>
          <Icon name="trend" size={13} color={colors.success} />
          <AppText variant="caption" color={colors.success}>
            +5%
          </AppText>
        </View>
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
  sparklineContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    height: 16,
    marginTop: 6,
  },
  sparkBar: {
    flex: 1,
    backgroundColor: "#bca4df",
    borderRadius: 1,
    minHeight: 3,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 6,
  },
});
