import { StyleSheet, View } from "react-native";
import type { AccuracySummary } from "@/interfaces";
import { colors, radius, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Card } from "../common/Card";
import { ProgressRing } from "../common/ProgressRing";

interface AccuracyChartProps {
  accuracy: AccuracySummary;
  ratio: number;
}

export function AccuracyChart({ accuracy, ratio }: AccuracyChartProps) {
  return (
    <Card style={styles.card}>
      <AppText variant="heading">Aprendizado em evolução</AppText>
      <AppText variant="caption">Distribuição das respostas</AppText>

      <View style={styles.ringContainer}>
        <ProgressRing
          percent={ratio}
          size={140}
          strokeWidth={14}
          color={colors.accuracyFill}
          trackColor={colors.accuracyTrack}
        >
          <View style={styles.center}>
            <AppText variant="metric">{accuracy.percent}%</AppText>
            <AppText variant="caption">de acertos</AppText>
          </View>
        </ProgressRing>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: colors.accuracyFill }]} />
          <AppText variant="caption">
            Acertos <AppText variant="bodyStrong">{accuracy.hits}</AppText>
          </AppText>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: colors.accuracyTrack }]} />
          <AppText variant="caption">
            Erros <AppText variant="bodyStrong">{accuracy.errors}</AppText>
          </AppText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 2,
    alignItems: "center",
  },
  ringContainer: {
    marginVertical: spacing.md,
  },
  center: {
    alignItems: "center",
  },
  legend: {
    flexDirection: "row",
    gap: spacing.xl,
    marginTop: spacing.xs,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
