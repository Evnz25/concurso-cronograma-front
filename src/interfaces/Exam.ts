import type { ColorTone } from "./Icon";
import type { TrackId } from "./Track";

/** Oportunidade de concurso público aberto (RF11). */
export interface Exam {
  id: string;
  /** Sigla exibida no logo da instituição. */
  org: string;
  name: string;
  job: string;
  place: string;
  salary: number | null;
  /** Data limite de inscrição no formato ISO (YYYY-MM-DD). */
  registrationDeadline: string;
  trackId: TrackId;
  trackIds?: TrackId[];
  trackNames?: string;
  sourceUrl?: string;
  color: ColorTone;
  vacancies: number | null;
  description: string;
}

export type ExamFilter = "all" | "mine" | "salary";
