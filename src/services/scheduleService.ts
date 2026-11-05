import type { DayPlan, StudyBlock, StudyBreak, WeekDay } from "@/interfaces";
import { STUDY_BLOCKS } from "./mocks/data";
import {
  CURRENT_DATE,
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
const STUDY_DAYS_PER_WEEK = 5;

export function getTodayBlocks(): StudyBlock[] {
  return STUDY_BLOCKS;
}

export function getBlockEndMinutes(block: StudyBlock): number {
  return timeToMinutes(block.startTime) + block.durationMinutes;
}

/** Retorna a pausa programada que antecede o bloco no índice informado, se houver. */
export function getBreakBefore(blocks: StudyBlock[], index: number): StudyBreak | null {
  if (index <= 0) return null;
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

export function getWeekDays(reference: Date = CURRENT_DATE): WeekDay[] {
  const monday = getStartOfWeek(reference);
  return WEEK_DAY_LABELS.map((label, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return {
      label,
      day: date.getDate(),
      isPast: date < reference && date.getDate() !== reference.getDate(),
      isToday: date.getDate() === reference.getDate(),
      hasStudy: index < STUDY_DAYS_PER_WEEK,
    };
  });
}

export function getDayPlan(
  weekDay: WeekDay,
  blocks: StudyBlock[],
  completedCount: number,
  reference: Date = CURRENT_DATE,
): DayPlan {
  const monthName = formatMonthName(reference);
  const title = weekDay.isToday ? "Seu plano de hoje" : `Plano de ${weekDay.day} de ${monthName}`;

  if (weekDay.isToday) {
    return {
      status: "today",
      title,
      subtitle: `${getPlannedMinutes(blocks) / 60} horas de foco · ${blocks.length} blocos de estudo`,
      badge: `${completedCount} de ${blocks.length} concluídos`,
      emptyTitle: "",
      emptyDescription: "",
    };
  }

  if (!weekDay.hasStudy) {
    return {
      status: "rest",
      title,
      subtitle: "Um respiro também faz parte da jornada.",
      badge: "Descanso",
      emptyTitle: "Tempo para recarregar",
      emptyDescription:
        "Aproveite sua pausa programada. Seu próximo ciclo começa na segunda-feira.",
    };
  }

  if (weekDay.isPast) {
    return {
      status: "past",
      title,
      subtitle: "Seu próximo ciclo de revisão.",
      badge: "Planejado",
      emptyTitle: "Seu histórico de estudos",
      emptyDescription:
        "Os blocos desta data já foram finalizados. Continue a jornada no plano de hoje.",
    };
  }

  return {
    status: "planned",
    title,
    subtitle: "Seu próximo ciclo de revisão.",
    badge: "Planejado",
    emptyTitle: "Preparando o próximo passo",
    emptyDescription: `Revisão de Banco de Dados · ${formatDuration(60)}`,
    extraInfo: `Engenharia de Software · ${formatDuration(90)} · Pausa de ${BREAK_MINUTES} min entre blocos`,
  };
}
