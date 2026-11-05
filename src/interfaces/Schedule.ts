import type { ColorTone, IconName } from "./Icon";

/** Bloco de estudo diário do cronograma (RNF02: no máximo 2h por matéria). */
export interface StudyBlock {
  id: string;
  title: string;
  topic: string;
  /** Horário de início no formato HH:mm. */
  startTime: string;
  durationMinutes: number;
  icon: IconName;
  color: ColorTone;
  tag: string;
  /** Indica que o bloco foi agendado pelo algoritmo de repetição espaçada. */
  isSrsReview: boolean;
}

/** Pausa programada entre dois blocos de estudo. */
export interface StudyBreak {
  startTime: string;
  endTime: string;
  durationMinutes: number;
}

export interface WeekDay {
  label: string;
  day: number;
  isPast: boolean;
  isToday: boolean;
  hasStudy: boolean;
}

export type DayStatus = "today" | "past" | "planned" | "rest";

/** Resumo textual exibido para o dia selecionado no calendário. */
export interface DayPlan {
  status: DayStatus;
  title: string;
  subtitle: string;
  badge: string;
  emptyTitle: string;
  emptyDescription: string;
  extraInfo?: string;
}
