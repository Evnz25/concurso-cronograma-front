import { Text, type TextProps } from "react-native";
import { typography, type TextVariant } from "@/theme";

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
}

/** Texto padrão do app, com as variantes tipográficas do tema. */
export function AppText({ variant = "body", color, style, ...props }: AppTextProps) {
  return <Text {...props} style={[typography[variant], color ? { color } : null, style]} />;
}
