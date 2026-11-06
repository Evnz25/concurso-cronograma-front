import type { TextStyle } from "react-native";
import { colors } from "./colors";

/** Nomes das fontes carregadas em src/app/_layout.tsx (@expo-google-fonts). */
export const fonts = {
  regular: "DMSans_400Regular",
  medium: "DMSans_500Medium",
  semibold: "DMSans_600SemiBold",
  bold: "DMSans_700Bold",
  heading: "Manrope_800ExtraBold",
  headingMedium: "Manrope_700Bold",
} as const;

export type TextVariant =
  | "title"
  | "heading"
  | "subheading"
  | "body"
  | "bodyStrong"
  | "caption"
  | "eyebrow"
  | "metric";

export const typography: Record<TextVariant, TextStyle> = {
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.8,
    color: colors.text,
  },
  heading: {
    fontFamily: fonts.headingMedium,
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: -0.3,
    color: colors.text,
  },
  subheading: { fontFamily: fonts.semibold, fontSize: 15, lineHeight: 21, color: colors.text },
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, color: colors.textSoft },
  bodyStrong: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 21, color: colors.text },
  caption: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 17, color: colors.muted },
  eyebrow: { fontFamily: fonts.medium, fontSize: 11, letterSpacing: 1.2, color: colors.muted },
  metric: {
    fontFamily: fonts.heading,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.6,
    color: colors.text,
  },
};
