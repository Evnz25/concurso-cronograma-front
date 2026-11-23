import type {
  AccuracySummary,
  AnswerRecord,
  ColorTone,
  SrsPriority,
  StatsPeriod,
  StudyBlock,
  SubjectHours,
  ThemePerformanceRow,
} from "@/interfaces";
import { getStartOfWeek, localDate } from "./formatService";

function inPeriod(date: string | null | undefined, period: StatsPeriod): boolean {
  if (!date) return false;
  const now = new Date();
  const start =
    period === "week" ? getStartOfWeek(now) : new Date(now.getFullYear(), now.getMonth(), 1);
  start.setHours(0, 0, 0, 0);
  const time = new Date(date).getTime();
  return time >= start.getTime() && time <= now.getTime();
}
export function filterAnswers(answers: AnswerRecord[], period: StatsPeriod): AnswerRecord[] {
  return answers.filter((answer) => inPeriod(answer.answeredAt, period));
}
export function getAccuracy(answers: AnswerRecord[]): AccuracySummary {
  const hits = answers.filter((answer) => answer.correct).length;
  const total = answers.length;
  return {
    hits,
    errors: total - hits,
    total,
    percent: total ? Math.round((hits / total) * 100) : 0,
  };
}
export function getAccuracyRatio(answers: AnswerRecord[]): number {
  const { hits, total } = getAccuracy(answers);
  return total ? (hits / total) * 100 : 0;
}
export function getStudyHours(period: StatsPeriod, blocks: StudyBlock[]): number {
  return (
    blocks
      .filter((block) => block.completed && inPeriod(block.completedAt, period))
      .reduce((total, block) => total + block.durationMinutes, 0) / 60
  );
}
export function getQuestionsSolved(period: StatsPeriod, answers: AnswerRecord[]): number {
  return filterAnswers(answers, period).length;
}
export function getPendingReviewCount(answers: AnswerRecord[]): number {
  const latest = new Map<string, AnswerRecord>();
  answers.forEach((answer) => {
    if (
      !latest.has(answer.questionId) ||
      latest.get(answer.questionId)!.answeredAt <= answer.answeredAt
    )
      latest.set(answer.questionId, answer);
  });
  return [...latest.values()].filter(
    (answer) => answer.nextReview && answer.nextReview <= localDate(),
  ).length;
}
export function getSubjectHours(period: StatsPeriod, blocks: StudyBlock[]): SubjectHours[] {
  const rows = new Map<string, SubjectHours>();
  blocks
    .filter((block) => block.completed && inPeriod(block.completedAt, period))
    .forEach((block) => {
      const key = block.subjectId || block.title;
      const row = rows.get(key) || { title: block.title, hours: 0, color: block.color };
      row.hours += block.durationMinutes / 60;
      rows.set(key, row);
    });
  return [...rows.values()];
}
export function getChartMaxHours(data: SubjectHours[]): number {
  return Math.max(3, Math.ceil(Math.max(0, ...data.map((row) => row.hours)) / 3) * 3);
}
export function getChartAxis(data: SubjectHours[]): string[] {
  const max = getChartMaxHours(data);
  return [max, (max * 2) / 3, max / 3, 0].map((value) => value + "h");
}
export function getThemePerformance(answers: AnswerRecord[]): ThemePerformanceRow[] {
  const rows = new Map<string, ThemePerformanceRow>();
  answers.forEach((answer) => {
    const key = answer.themeId || answer.theme;
    const row: ThemePerformanceRow = rows.get(key) || {
      title: answer.theme,
      icon: "book",
      color: "purple",
      hits: 0,
      errors: 0,
      percent: 0,
      priority: "Em dia",
    };
    answer.correct ? row.hits++ : row.errors++;
    row.percent = Math.round((row.hits / (row.hits + row.errors)) * 100);
    row.priority = row.percent < 50 ? "Alta" : row.percent < 80 ? "Média" : "Em dia";
    rows.set(key, row);
  });
  return [...rows.values()];
}
export function getFocusStreak(answers: AnswerRecord[], blocks: StudyBlock[]): number {
  const days = new Set([
    ...answers.map((answer) => localDate(new Date(answer.answeredAt))),
    ...blocks
      .filter((block) => block.completed && block.completedAt)
      .map((block) => localDate(new Date(block.completedAt!))),
  ]);
  const day = new Date();
  if (!days.has(localDate(day))) day.setDate(day.getDate() - 1);
  let count = 0;
  while (days.has(localDate(day))) {
    count++;
    day.setDate(day.getDate() - 1);
  }
  return count;
}
export function getPriorityColor(priority: SrsPriority): ColorTone {
  return priority === "Alta" ? "orange" : priority === "Média" ? "purple" : "green";
}
export function getPeriodLabel(period: StatsPeriod): string {
  return period === "week" ? "Nesta semana" : "Neste mês";
}
