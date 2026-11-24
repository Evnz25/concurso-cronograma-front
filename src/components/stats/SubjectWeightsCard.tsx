import { StyleSheet, View } from "react-native";
import type { SubjectWeight } from "@/interfaces";
import { formatDuration } from "@/services/formatService";
import { getWeightTone } from "@/services/statsService";
import { colors, fonts, spacing, tones } from "@/theme";
import { AppText } from "../common/AppText";
import { Badge } from "../common/Badge";
import { Card } from "../common/Card";
import { ProgressBar } from "../common/ProgressBar";
import { SmartPill } from "../common/SmartPill";
import { ToneIcon } from "../common/ToneIcon";

interface SubjectWeightsCardProps {
  rows: SubjectWeight[];
}

export function SubjectWeightsCard({ rows }: SubjectWeightsCardProps) {
  const maxWeight = Math.max(0, ...rows.map((row) => row.weight));

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <AppText variant="heading">Pesos por matéria</AppText>
          <AppText variant="caption">Define quanto cada matéria deve ser estudada</AppText>
        </View>
        <SmartPill iconSize={13}>Ciclo atual</SmartPill>
      </View>

      <View style={styles.list}>
        {!rows.length && (
          <AppText variant="caption">Nenhum cronograma ativo para exibir os pesos.</AppText>
        )}
        {rows.map((row, index) => {
          const isLast = index === rows.length - 1;
          const relativePercent = maxWeight > 0 ? (row.weight / maxWeight) * 100 : 0;
          const barColor = tones[row.color]?.fg ?? colors.ringFill;
          const weightLabel = row.weight.toLocaleString("pt-BR", {
            maximumFractionDigits: 2,
          });

          return (
            <View key={row.subjectId} style={[styles.row, isLast && styles.lastRow]}>
              <View style={styles.topLine}>
                <View style={styles.titleArea}>
                  <ToneIcon name={row.icon} tone={row.color} size={30} iconSize={16} />
                  <AppText variant="subheading" style={styles.title} numberOfLines={1}>
                    {row.title}
                  </AppText>
                </View>
                <Badge tone={getWeightTone(row.weight)}>Peso {weightLabel}</Badge>
              </View>

              <View style={styles.metricsLine}>
                <View style={styles.progressBarWrap}>
                  <ProgressBar percent={relativePercent} color={barColor} height={6} />
                </View>
                <AppText variant="caption" style={styles.shareText}>
                  {row.sharePercent}%
                </AppText>
                {row.weeklyMinutes > 0 && (
                  <AppText variant="caption" style={styles.durationText}>
                    {formatDuration(row.weeklyMinutes)}
                  </AppText>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  list: {
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  row: {
    gap: 8,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  lastRow: {
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  topLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  titleArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flex: 1,
  },
  title: {
    fontSize: 13,
    flexShrink: 1,
  },
  metricsLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingLeft: 38,
  },
  progressBarWrap: {
    flex: 1,
  },
  shareText: {
    width: 36,
    textAlign: "right",
    fontFamily: fonts.semibold,
  },
  durationText: {
    minWidth: 44,
    textAlign: "right",
    color: colors.textSoft,
  },
});
