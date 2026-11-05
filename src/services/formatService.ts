/** Data de referência do protótipo. Substituir por `new Date()` ao integrar com a API. */
export const CURRENT_DATE = new Date(2025, 5, 18);

const SHORT_MONTHS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** "quarta-feira, 18 de junho de 2025" */
export function formatLongDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** "18 de junho" */
export function formatDayMonth(date: Date): string {
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
}

/** "junho" */
export function formatMonthName(date: Date): string {
  return date.toLocaleDateString("pt-BR", { month: "long" });
}

/** "Junho de 2025" */
export function formatMonthYear(date: Date): string {
  return capitalize(date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }));
}

/** Converte "2025-06-28" em "28 jun, 2025". */
export function formatShortDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${String(day).padStart(2, "0")} ${SHORT_MONTHS[month - 1]}, ${year}`;
}

/** Número da semana ISO-8601. */
export function getIsoWeek(date: Date): number {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  return Math.ceil(((target.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
}

/** Segunda-feira da semana da data informada. */
export function getStartOfWeek(date: Date): Date {
  const start = new Date(date);
  const offset = (date.getDay() + 6) % 7;
  start.setDate(date.getDate() - offset);
  return start;
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

/** 90 → "1h 30min", 60 → "1h", 15 → "15 min" */
export function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!hours) return `${minutes} min`;
  return minutes ? `${hours}h ${minutes}min` : `${hours}h`;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatNumber(value: number): string {
  return value.toLocaleString("pt-BR");
}
