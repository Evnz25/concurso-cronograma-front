import type { ColorTone, IconName } from "./Icon";

export type StatsPeriod = "week" | "month";

/** Horas estudadas por matéria (RF14). */
export interface SubjectHours {
  title: string;
  hours: number;
  color: ColorTone;
}

export type SrsPriority = "Em dia" | "Média" | "Alta";

/** Desempenho em questões de uma mesma matéria (RF14). */
export interface SubjectPerformanceRow {
  title: string;
  icon: IconName;
  color: ColorTone;
  hits: number;
  errors: number;
  priority: SrsPriority;
  percent: number;
}

export interface AccuracySummary {
  hits: number;
  errors: number;
  total: number;
  percent: number;
}

/** Peso atual de uma matéria no ciclo ativo para distribuir o tempo de estudo. */
export interface SubjectWeight {
  subjectId: string;
  title: string;
  weight: number;
  sharePercent: number;
  weeklyMinutes: number;
  icon: IconName;
  color: ColorTone;
}
