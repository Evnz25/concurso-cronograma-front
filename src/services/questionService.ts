import type {
  AnswerRecord,
  Difficulty,
  DifficultyOption,
  Question,
  QuestionSession,
} from "@/interfaces";
import { QUESTIONS } from "./mocks/data";

/** Opções de avaliação de dificuldade e seus intervalos de revisão SRS (RF09). */
export const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  {
    value: "hard",
    label: "Difícil",
    reviewLabel: "Revisar amanhã",
    intervalDays: 1,
    icon: "target",
  },
  {
    value: "medium",
    label: "Médio",
    reviewLabel: "Revisar em 3 dias",
    intervalDays: 3,
    icon: "clock",
  },
  {
    value: "easy",
    label: "Fácil",
    reviewLabel: "Revisar em 7 dias",
    intervalDays: 7,
    icon: "check",
  },
];

export const INITIAL_SESSION: QuestionSession = {
  index: 0,
  selectedOption: null,
  revealed: false,
  rating: null,
};

export function getQuestions(): Question[] {
  return QUESTIONS;
}

export function getDifficultyOption(value: Difficulty): DifficultyOption {
  return DIFFICULTY_OPTIONS.find((option) => option.value === value) ?? DIFFICULTY_OPTIONS[1];
}

/** Texto da próxima revisão SRS de acordo com a avaliação do usuário. */
export function getNextReviewLabel(rating: Difficulty | null): string {
  const { intervalDays } = getDifficultyOption(rating ?? "medium");
  return intervalDays === 1 ? "Amanhã" : `Em ${intervalDays} dias`;
}

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
