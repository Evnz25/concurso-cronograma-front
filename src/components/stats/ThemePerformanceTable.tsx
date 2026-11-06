import { StyleSheet, View } from "react-native";
import type { ThemePerformanceRow } from "@/interfaces";
import { getPriorityColor } from "@/services/statsService";
import { colors, fonts, radius, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Badge } from "../common/Badge";
import { Card } from "../common/Card";
import { ProgressBar } from "../common/ProgressBar";
import { SmartPill } from "../common/SmartPill";
import { ToneIcon } from "../common/ToneIcon";

interface ThemePerformanceTableProps {
  rows: ThemePerformanceRow[];
}

export function ThemePerformanceTable({ rows }: ThemePerformanceTableProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <AppText variant="heading">Um olhar para cada tema</AppText>
          <AppText variant="caption">Priorização do SRS</AppText>
        </View>
        <SmartPill iconSize={13}>Inteligente</SmartPill>
      </View>

      <View style={styles.list}>
        {rows.map((row) => (
          <View key={row.title} style={styles.row}>
            <View style={styles.topLine}>
              <View style={styles.titleArea}>
                <ToneIcon name={row.icon} tone={row.color} size={30} iconSize={16} />
                <AppText variant="subheading" style={styles.title} numberOfLines={1}>
                  {row.title}
                </AppText>
              </View>
              <Badge tone={getPriorityColor(row.priority)}>{row.priority}</Badge>
            </View>

            <View style={styles.metricsLine}>
              <View style={styles.progressBarWrap}>
                <ProgressBar percent={row.percent} height={6} />
              </View>
              <AppText variant="caption" style={styles.percentText}>
                {row.percent}%
              </AppText>
              <AppText variant="caption" style={styles.hitMiss}>
                <AppText variant="bodyStrong" style={{ fontSize: 12 }}>
                  {row.hits}
                </AppText>
                /{row.errors}
              </AppText>
            </View>
          </View>
        ))}
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
  percentText: {
    width: 36,
    textAlign: "right",
    fontFamily: fonts.semibold,
  },
  hitMiss: {
    width: 44,
    textAlign: "right",
  },
});
