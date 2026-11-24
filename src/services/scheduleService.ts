import type { DayPlan, StudyBlock, StudyBreak, WeekDay } from "@/interfaces";

import {
  localDate,
  formatDuration,
  formatMonthName,
  getStartOfWeek,
  minutesToTime,
  timeToMinutes,
} from "./formatService";

/** RNF02: limite de estudo consecutivo por matéria. */
export const MAX_CONSECUTIVE_MINUTES_PER_SUBJECT = 120;
/** Duração padrão da pausa programada entre sessões. */
export const BREAK_MINUTES = 15;
/** Intervalos maiores que este valor não são tratados como pausa programada. */
const MAX_SCHEDULED_BREAK_MINUTES = 30;

const WEEK_DAY_LABELS = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

export function getBlockEndMinutes(block: StudyBlock): number {
  return timeToMinutes(block.startTime) + block.durationMinutes;
}

/** Retorna a pausa programada que antecede o bloco no índice informado, se houver. */
export function getBreakBefore(blocks: StudyBlock[], index: number): StudyBreak | null {
  if (index <= 0 || !blocks[index]?.startTime || !blocks[index - 1]?.startTime) return null;
  const previousEnd = getBlockEndMinutes(blocks[index - 1]);
  const currentStart = timeToMinutes(blocks[index].startTime);
  const gap = currentStart - previousEnd;
  if (gap <= 0 || gap > MAX_SCHEDULED_BREAK_MINUTES) return null;
  return {
    startTime: minutesToTime(previousEnd),
    endTime: blocks[index].startTime,
    durationMinutes: gap,
  };
}

/**
 * RNF02: verifica se algum trecho do cronograma ultrapassa 2h consecutivas
 * da mesma matéria. Retorna os títulos das matérias que violam a regra.
 */
export function findConsecutiveLimitViolations(blocks: StudyBlock[]): string[] {
  const violations = new Set<string>();
  let streakMinutes = 0;
  blocks.forEach((block, index) => {
    const previous = blocks[index - 1];
    const isContinuation =
      previous &&
      previous.title === block.title &&
      getBlockEndMinutes(previous) === timeToMinutes(block.startTime);
    streakMinutes = isContinuation ? streakMinutes + block.durationMinutes : block.durationMinutes;
    if (streakMinutes > MAX_CONSECUTIVE_MINUTES_PER_SUBJECT) violations.add(block.title);
  });
  return [...violations];
}

export function getPlannedMinutes(blocks: StudyBlock[]): number {
  return blocks.reduce((sum, block) => sum + block.durationMinutes, 0);
}

export function getCompletedMinutes(blocks: StudyBlock[], completedIds: string[]): number {
  return blocks
    .filter((block) => completedIds.includes(block.id))
    .reduce((sum, block) => sum + block.durationMinutes, 0);
}

export function toggleCompleted(completedIds: string[], blockId: string): string[] {
  return completedIds.includes(blockId)
    ? completedIds.filter((id) => id !== blockId)
    : [...completedIds, blockId];
}

export function getGoalPercent(completedMinutes: number, plannedMinutes: number): number {
  if (!plannedMinutes) return 0;
  return Math.min(100, (completedMinutes / plannedMinutes) * 100);
}

export function getWeekDays(
  reference: Date = new Date(),
  blocks: StudyBlock[] = [],
  today = localDate(),
  reviewDates = new Set<string>(),
): WeekDay[] {
  const monday = getStartOfWeek(reference);
  return WEEK_DAY_LABELS.map((label, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const key = localDate(date);
    return {
      label,
      day: date.getDate(),
      date: key,
      isPast: key < today,
      isToday: key === today,
      hasStudy: reviewDates.has(key) || blocks.some((block) => block.date === key),
    };
  });
}
export function getDayPlan(day: WeekDay, blocks: StudyBlock[], completedCount: number): DayPlan {
  return {
    status: day.isToday ? "today" : day.isPast ? "past" : "planned",
    title: day.isToday
      ? "Seu plano de hoje"
      : "Plano de " + day.date?.split("-").reverse().join("/"),
    subtitle:
      formatDuration(getPlannedMinutes(blocks)) +
      " de foco · " +
      blocks.length +
      " blocos de estudo",
    badge: completedCount + " de " + blocks.length + " concluídos",
    emptyTitle: "Sem estudos agendados nesta data",
    emptyDescription: "Você pode iniciar um novo cronograma no perfil.",
  };
}
