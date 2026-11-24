import type { Question } from "../interfaces";
import type { ReviewEntry } from "../interfaces/Api";

// Formata a agenda ordenada da API para o calendário da trilha em exibição.
export function mapReviewDays(questions: Question[], agenda: ReviewEntry[], today: string) {
  const catalog = new Map(questions.map((question) => [question.id, question]));
  const days = new Map<string, { question: Question; due: string }[]>();
  for (const { questao_id, vencimento } of agenda) {
    const question = catalog.get(questao_id);
    if (!question) continue;
    const date = vencimento < today ? today : vencimento;
    const entries = days.get(date) ?? [];
    entries.push({ question, due: vencimento });
    days.set(date, entries);
  }
  return days;
}
