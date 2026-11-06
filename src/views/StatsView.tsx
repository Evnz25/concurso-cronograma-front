import { useState } from "react";
import { StyleSheet, View } from "react-native";
import type { StatsPeriod } from "@/interfaces";
import { PageHeading } from "@/components/common/PageHeading";
import { ScreenContainer } from "@/components/common/ScreenContainer";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import { AccuracyChart } from "@/components/stats/AccuracyChart";
import { HoursBarChart } from "@/components/stats/HoursBarChart";
import { StatBox } from "@/components/stats/StatBox";
import { ThemePerformanceTable } from "@/components/stats/ThemePerformanceTable";
import { useApp } from "@/context/AppContext";
import { formatNumber } from "@/services/formatService";
import {
  getAccuracy,
  getAccuracyRatio,
  getChartAxis,
  getChartMaxHours,
  getPeriodLabel,
  getQuestionsSolved,
  getStudyHours,
  getSubjectHours,
  getThemePerformance,
} from "@/services/statsService";
import { spacing } from "@/theme";

const PERIOD_OPTIONS = [
  { value: "week" as const, label: "Semana" },
  { value: "month" as const, label: "Mês" },
];

export function StatsView() {
  const { answers, completedMinutes } = useApp();
  const [period, setPeriod] = useState<StatsPeriod>("week");
  const accuracy = getAccuracy(answers);

  return (
    <ScreenContainer>
      <PageHeading
        eyebrow="CADA EVOLUÇÃO MERECE SER VISTA"
        title="Seu esforço tem resultado"
        aside={
          <View style={styles.periodControl}>
            <SegmentedControl options={PERIOD_OPTIONS} value={period} onChange={setPeriod} />
          </View>
        }
      />

      <View style={styles.statsRow}>
        <StatBox
          icon="clock"
          color="purple"
          label="Horas"
          value={formatNumber(getStudyHours(period, completedMinutes))}
          unit="h"
          caption="+18%"
        />
        <StatBox
          icon="book"
          color="blue"
          label="Questões"
          value={getQuestionsSolved(period, answers)}
          caption="Evoluindo"
        />
        <StatBox
          icon="target"
          color="green"
          label="Acertos"
          value={accuracy.percent}
          unit="%"
          caption="+5%"
        />
      </View>

      <HoursBarChart
        data={getSubjectHours(period)}
        axis={getChartAxis(period)}
        maxHours={getChartMaxHours(period)}
        periodLabel={getPeriodLabel(period)}
      />

      <AccuracyChart accuracy={accuracy} ratio={getAccuracyRatio(answers)} />

      <ThemePerformanceTable rows={getThemePerformance(answers)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  periodControl: {
    width: 140,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
