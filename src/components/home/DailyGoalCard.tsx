import { StyleSheet, View } from "react-native";
import { formatDuration } from "@/services/formatService";
import { colors, fonts, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Card } from "../common/Card";
import { Icon } from "../common/Icon";
import { ProgressRing } from "../common/ProgressRing";

interface DailyGoalCardProps {
  completedMinutes: number;
  plannedMinutes: number;
  goalPercent: number;
  completedBlocks: number;
  totalBlocks: number;
}

export function DailyGoalCard({
  completedMinutes,
  plannedMinutes,
  goalPercent,
  completedBlocks,
  totalBlocks,
}: DailyGoalCardProps) {
  const hours = Math.floor(completedMinutes / 60);
  const minutes = completedMinutes % 60;

  return (
    <Card>
      <View style={styles.header}>
        <AppText variant="heading">Meta diária</AppText>
        <Icon name="target" size={20} color={colors.accent} />
      </View>

      <View style={styles.ringContainer}>
        <ProgressRing percent={goalPercent} size={140} strokeWidth={11}>
          <View style={styles.ringCenter}>
            <AppText variant="metric">
              {hours}h{minutes ? ` ${minutes}min` : ""}
            </AppText>
            <AppText variant="caption">de {formatDuration(plannedMinutes)}</AppText>
          </View>
        </ProgressRing>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCol}>
          <AppText variant="subheading">
            {completedBlocks}{" "}
            <AppText variant="caption" color={colors.muted}>
              / {totalBlocks}
            </AppText>
          </AppText>
          <AppText variant="caption">blocos concluídos</AppText>
        </View>

        <View style={styles.statCol}>
          <AppText variant="subheading">{Math.round(goalPercent)}%</AppText>
          <AppText variant="caption">da meta de hoje</AppText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  ringContainer: {
    marginVertical: spacing.sm,
    alignItems: "center",
  },
  ringCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
  },
  statCol: {
    alignItems: "center",
  },
});
