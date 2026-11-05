import type {
  AccuracySummary,
  AnswerRecord,
  ColorTone,
  SrsPriority,
  StatsPeriod,
  SubjectHours,
  ThemePerformanceRow,
} from "@/interfaces";
import { STATS_BASELINE, SUBJECT_HOURS, THEME_PERFORMANCE } from "./mocks/data";

export { STATS_BASELINE };

const MONTH_MULTIPLIER = 4;
const WEEK_CHART_MAX_HOURS = 6;

export function getAccuracy(answers: AnswerRecord[]): AccuracySummary {
  const hits = STATS_BASELINE.hits + answers.filter((a) => a.correct).length;
  const errors = STATS_BASELINE.errors + answers.filter((a) => !a.correct).length;
  const total = hits + errors;
  return { hits, errors, total, percent: total ? Math.round((hits / total) * 100) : 0 };
}

/** Percentual exato (sem arredondamento), usado em gráficos. */
export function getAccuracyRatio(answers: AnswerRecord[]): number {
  const { hits, total } = getAccuracy(answers);
  return total ? (hits / total) * 100 : 0;
}

export function getStudyHours(period: StatsPeriod, completedMinutes: number): number {
  const base = period === "week" ? STATS_BASELINE.weekHours : STATS_BASELINE.monthHours;
  return base + completedMinutes / 60;
}

export function getQuestionsSolved(period: StatsPeriod, answers: AnswerRecord[]): number {
  const base = period === "week" ? STATS_BASELINE.weekQuestions : STATS_BASELINE.monthQuestions;
  return base + answers.length;
}

/** RF10: questões aguardando revisão. */
export function getPendingReviewCount(answers: AnswerRecord[]): number {
  return Math.max(0, STATS_BASELINE.pendingReviews - answers.length);
}

export function getSubjectHours(period: StatsPeriod): SubjectHours[] {
  const multiplier = period === "week" ? 1 : MONTH_MULTIPLIER;
  return SUBJECT_HOURS.map((item) => ({ ...item, hours: item.hours * multiplier }));
}

export function getChartMaxHours(period: StatsPeriod): number {
  return period === "week" ? WEEK_CHART_MAX_HOURS : WEEK_CHART_MAX_HOURS * MONTH_MULTIPLIER;
}

/** Rótulos do eixo Y do gráfico de barras (do maior para o menor). */
export function getChartAxis(period: StatsPeriod): string[] {
  const max = getChartMaxHours(period);
  return [max, (max * 2) / 3, max / 3, 0].map((value) => `${value}h`);
}

export function getThemePerformance(answers: AnswerRecord[]): ThemePerformanceRow[] {
  return THEME_PERFORMANCE.map((row) => {
    const themeAnswers = answers.filter((a) => a.theme === row.title);
    const hits = row.hits + themeAnswers.filter((a) => a.correct).length;
    const errors = row.errors + themeAnswers.filter((a) => !a.correct).length;
    return { ...row, hits, errors, percent: Math.round((hits / (hits + errors)) * 100) };
  });
}

export function getPriorityColor(priority: SrsPriority): ColorTone {
  if (priority === "Alta") return "orange";
  if (priority === "Média") return "purple";
  return "green";
}

export function getPeriodLabel(period: StatsPeriod): string {
  return period === "week" ? "Nesta semana" : "Neste mês";
}
