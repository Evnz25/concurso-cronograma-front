import type { AnswerRecord, DifficultyOption, Question, QuestionSession } from "@/interfaces";

/** Avaliação feita depois de conhecer o gabarito (RF09). */
export const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  {
    value: "hard",
    label: "Difícil",
    icon: "target",
  },
  {
    value: "medium",
    label: "Médio",
    icon: "clock",
  },
  {
    value: "easy",
    label: "Fácil",
    icon: "check",
  },
];

export const INITIAL_SESSION: QuestionSession = {
  index: 0,
  selectedOption: null,
  revealed: false,
  rating: null,
};

export function getOptionLetter(index: number): string {
  return String.fromCharCode(65 + index);
}

export function isCorrectAnswer(question: Question, optionIndex: number | null): boolean {
  return optionIndex === question.correctIndex;
}

export function createAnswerRecord(question: Question, optionIndex: number | null): AnswerRecord {
  return {
    questionId: question.id,
    theme: question.theme,
    correct: isCorrectAnswer(question, optionIndex),
    answeredAt: new Date().toISOString(),
  };
}

export function isLastQuestion(session: QuestionSession, total: number): boolean {
  return session.index === total - 1;
}

export function nextQuestion(session: QuestionSession): QuestionSession {
  return { ...INITIAL_SESSION, index: session.index + 1 };
}
