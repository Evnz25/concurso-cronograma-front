import { useState } from "react";
import { StyleSheet, View } from "react-native";
import type { StatsPeriod } from "@/interfaces";
import { PageHeading } from "@/components/common/PageHeading";
import { ScreenContainer } from "@/components/common/ScreenContainer";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import { AccuracyChart } from "@/components/stats/AccuracyChart";
import { HoursBarChart } from "@/components/stats/HoursBarChart";
import { StatBox } from "@/components/stats/StatBox";
import { SubjectWeightsCard } from "@/components/stats/SubjectWeightsCard";
import { SubjectPerformanceTable } from "@/components/stats/SubjectPerformanceTable";
import { useApp } from "@/context/AppContext";
import { formatNumber } from "@/services/formatService";
import {
  filterAnswers,
  getAccuracy,
  getAccuracyRatio,
  getChartAxis,
  getChartMaxHours,
  getPeriodLabel,
  getQuestionsSolved,
  getStudyHours,
  getSubjectHours,
  getSubjectWeights,
  getSubjectPerformance,
} from "@/services/statsService";
import { spacing } from "@/theme";

const PERIOD_OPTIONS = [
  { value: "week" as const, label: "Semana" },
  { value: "month" as const, label: "Mês" },
];

export function StatsView() {
  const { answers, allBlocks, activeSchedule, rawTracks } = useApp();
  const [period, setPeriod] = useState<StatsPeriod>("week");
  const periodAnswers = filterAnswers(answers, period);
  const accuracy = getAccuracy(periodAnswers);
  const subjectHours = getSubjectHours(period, allBlocks);
  const subjectWeights = getSubjectWeights(activeSchedule, rawTracks);

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
          value={formatNumber(getStudyHours(period, allBlocks))}
          unit="h"
          caption={getPeriodLabel(period)}
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
          caption={getPeriodLabel(period)}
        />
      </View>

      <HoursBarChart
        data={subjectHours}
        axis={getChartAxis(subjectHours)}
        maxHours={getChartMaxHours(subjectHours)}
        periodLabel={getPeriodLabel(period)}
      />

      <SubjectWeightsCard rows={subjectWeights} />

      <AccuracyChart accuracy={accuracy} ratio={getAccuracyRatio(periodAnswers)} />

      <SubjectPerformanceTable rows={getSubjectPerformance(periodAnswers)} />
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
