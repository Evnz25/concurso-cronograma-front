import type { Exam, ExamFilter, TrackId } from "@/interfaces";
export function filterExams(exams: Exam[], filter: ExamFilter, trackId: TrackId): Exam[] {
  if (filter === "mine")
    return exams.filter((exam) => (exam.trackIds || [exam.trackId]).includes(trackId));
  if (filter === "salary") return [...exams].sort((a, b) => (b.salary || 0) - (a.salary || 0));
  return exams;
}
