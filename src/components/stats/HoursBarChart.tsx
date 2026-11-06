import { StyleSheet, View } from "react-native";
import type { SubjectHours } from "@/interfaces";
import { chartColors, colors, fonts, radius, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Badge } from "../common/Badge";
import { Card } from "../common/Card";

interface HoursBarChartProps {
  data: SubjectHours[];
  axis: string[];
  maxHours: number;
  periodLabel: string;
}

export function HoursBarChart({ data, axis, maxHours, periodLabel }: HoursBarChartProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <AppText variant="heading">Seu tempo bem investido</AppText>
          <AppText variant="caption">Horas de estudo por conteúdo</AppText>
        </View>
        <Badge tone="neutral">{periodLabel}</Badge>
      </View>

      <View style={styles.chartWrapper}>
        {/* Y Axis */}
        <View style={styles.axis}>
          {axis.map((label) => (
            <AppText key={label} variant="caption" style={styles.axisLabel}>
              {label}
            </AppText>
          ))}
        </View>

        {/* Columns */}
        <View style={styles.columns}>
          {data.map((item) => {
            const barHeight = Math.max(8, (item.hours / maxHours) * 100);
            const barColor = chartColors[item.color] ?? colors.primary;

            return (
              <View key={item.title} style={styles.column}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${barHeight}%`,
                        backgroundColor: barColor,
                      },
                    ]}
                  >
                    <AppText style={styles.barValue}>{item.hours}h</AppText>
                  </View>
                </View>
                <AppText variant="caption" numberOfLines={1} style={styles.colTitle}>
                  {item.title}
                </AppText>
              </View>
            );
          })}
        </View>
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
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  chartWrapper: {
    flexDirection: "row",
    height: 160,
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  axis: {
    justifyContent: "space-between",
    paddingBottom: 20,
    width: 28,
  },
  axisLabel: {
    fontSize: 10,
    textAlign: "right",
  },
  columns: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    gap: 4,
  },
  column: {
    flex: 1,
    alignItems: "center",
    height: "100%",
  },
  barTrack: {
    flex: 1,
    width: "100%",
    maxWidth: 32,
    justifyContent: "flex-end",
    backgroundColor: "#f5f3f8",
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 3,
  },
  barValue: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: colors.white,
  },
  colTitle: {
    fontSize: 9,
    marginTop: 4,
    textAlign: "center",
  },
});
