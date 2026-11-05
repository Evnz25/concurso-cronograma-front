import type { Exam, ExamFilter, TrackId } from "@/interfaces";
import { EXAMS } from "./mocks/data";

export function getExams(): Exam[] {
  return EXAMS;
}

export function getExamById(id: string): Exam | undefined {
  return EXAMS.find((exam) => exam.id === id);
}

/** Aplica o filtro selecionado na listagem de oportunidades (RF11). */
export function filterExams(exams: Exam[], filter: ExamFilter, trackId: TrackId): Exam[] {
  if (filter === "mine") return exams.filter((exam) => exam.trackId === trackId);
  if (filter === "salary") return [...exams].sort((a, b) => b.salary - a.salary);
  return exams;
}

export function hasExamsForTrack(exams: Exam[], trackId: TrackId): boolean {
  return exams.some((exam) => exam.trackId === trackId);
}
