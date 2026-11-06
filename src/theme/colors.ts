import type { ColorTone } from "@/interfaces";

/** Paleta extraída do protótipo web (index.css do Figma Make). */
export const colors = {
  text: "#26283b",
  textSoft: "#5d5a6e",
  muted: "#9593a4",
  background: "#f7f8fb",
  surface: "#ffffff",
  border: "#e8e7ef",
  borderSoft: "#f0edf4",
  primary: "#8059ce",
  primaryText: "#8a64d7",
  primarySoft: "#f6f2fc",
  primaryBorder: "#e9e0f3",
  accent: "#9a7bc8",
  check: "#a98acb",
  danger: "#ba8582",
  success: "#6f9f8a",
  infoBg: "#f7f3fc",
  infoText: "#8f78a8",
  ringTrack: "#f1edf7",
  ringFill: "#a98bd2",
  accuracyFill: "#b39ad5",
  accuracyTrack: "#f1e5df",
  overlay: "rgba(38, 32, 53, 0.35)",
  white: "#ffffff",
} as const;

/** Cores de fundo/texto por tom (badges, ícones de matéria, logos). */
export const tones: Record<ColorTone, { bg: string; fg: string }> = {
  purple: { bg: "#f0eafa", fg: "#9876d5" },
  blue: { bg: "#ecf2fd", fg: "#7699ce" },
  green: { bg: "#eaf5f0", fg: "#6f9f8a" },
  orange: { bg: "#fbf0e3", fg: "#c19869" },
  yellow: { bg: "#fff3b7", fg: "#365a95" },
  neutral: { bg: "#f4f4f7", fg: "#9691a3" },
  mint: { bg: "#e8f3ee", fg: "#7fa896" },
  lavender: { bg: "#f2edf9", fg: "#a693c7" },
};

/** Cores sólidas usadas nas barras do gráfico de horas. */
export const chartColors: Record<ColorTone, string> = {
  purple: "#baa1df",
  blue: "#adc5e8",
  mint: "#b3cec2",
  lavender: "#cfc1e5",
  orange: "#e4caaa",
  green: "#a5c7ad",
  yellow: "#f0dc8a",
  neutral: "#d6d4de",
};
