import { useState } from "react";
import type { AnswerRecord, StatsPeriod } from "@/interfaces";
import { PageHeading } from "@/components/common/PageHeading";
import { AccuracyChart } from "@/components/stats/AccuracyChart";
import { HoursBarChart } from "@/components/stats/HoursBarChart";
import { StatBox } from "@/components/stats/StatBox";
import { ThemePerformanceTable } from "@/components/stats/ThemePerformanceTable";
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

interface StatsViewProps {
  answers: AnswerRecord[];
  completedMinutes: number;
}

/** Dashboard de estatísticas (RF14). */
export function StatsView({ answers, completedMinutes }: StatsViewProps) {
  const [period, setPeriod] = useState<StatsPeriod>("week");
  const accuracy = getAccuracy(answers);

  return (
    <>
      <PageHeading
        eyebrow="CADA EVOLUÇÃO MERECE SER VISTA"
        title="Seu esforço tem resultado"
        description="Veja o quanto você avançou e onde dar o próximo passo."
        aside={
          <select
            className="period-select"
            value={period}
            onChange={(e) => setPeriod(e.target.value as StatsPeriod)}
            aria-label="Período das estatísticas"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mês</option>
          </select>
        }
      />
      <div className="stats-top">
        <StatBox
          icon="clock"
          color="purple"
          label="Horas de estudo"
          value={formatNumber(getStudyHours(period, completedMinutes))}
          unit="h"
          caption="18% a mais que no período anterior"
        />
        <StatBox
          icon="book"
          color="blue"
          label="Questões resolvidas"
          value={getQuestionsSolved(period, answers)}
          caption="Cada questão é um passo à frente"
        />
        <StatBox
          icon="target"
          color="green"
          label="Aproveitamento geral"
          value={accuracy.percent}
          unit="%"
          caption="5 pontos acima da semana passada"
        />
      </div>
      <div className="charts-grid">
        <HoursBarChart
          data={getSubjectHours(period)}
          axis={getChartAxis(period)}
          maxHours={getChartMaxHours(period)}
          periodLabel={getPeriodLabel(period)}
        />
        <AccuracyChart accuracy={accuracy} ratio={getAccuracyRatio(answers)} />
      </div>
      <ThemePerformanceTable rows={getThemePerformance(answers)} />
    </>
  );
}
