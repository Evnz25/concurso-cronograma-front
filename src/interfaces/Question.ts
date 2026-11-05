import type { IconName } from "./Icon";

/** Questão de concurso agrupada por tema (RF07). */
export interface Question {
  id: string;
  theme: string;
  topic: string;
  source: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/** Resultado de uma questão respondida (base para o modo offline - RNF04). */
export interface AnswerRecord {
  questionId: string;
  theme: string;
  correct: boolean;
  difficulty?: Difficulty;
  answeredAt: string;
}

/** Avaliação de dificuldade feita pelo usuário após responder (RF09). */
export type Difficulty = "hard" | "medium" | "easy";

export interface DifficultyOption {
  value: Difficulty;
  label: string;
  reviewLabel: string;
  /** Intervalo, em dias, até a próxima revisão SRS. */
  intervalDays: number;
  icon: IconName;
}

/** Estado da sessão de resolução de questões em andamento. */
export interface QuestionSession {
  index: number;
  selectedOption: number | null;
  revealed: boolean;
  rating: Difficulty | null;
}
