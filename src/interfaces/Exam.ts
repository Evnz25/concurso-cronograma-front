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
  salary: number;
  /** Data limite de inscrição no formato ISO (YYYY-MM-DD). */
  registrationDeadline: string;
  trackId: TrackId;
  color: ColorTone;
  vacancies: number;
  description: string;
}

export type ExamFilter = "all" | "mine" | "salary";
