import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import type { IconName } from "@/interfaces";
import { colors, fonts, radius } from "@/theme";
import { AppText } from "./AppText";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "danger" | "text";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const palette = PALETTE[variant];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === "text" ? styles.text : styles.box,
        { backgroundColor: palette.bg, borderColor: palette.border },
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <View style={styles.content}>
          <AppText
            style={[styles.label, { color: palette.fg }, variant === "text" && styles.textLabel]}
          >
            {label}
          </AppText>
          {icon && <Icon name={icon} size={variant === "text" ? 14 : 17} color={palette.fg} />}
        </View>
      )}
    </Pressable>
  );
}

const PALETTE: Record<Variant, { bg: string; fg: string; border: string }> = {
  primary: { bg: colors.primary, fg: colors.white, border: colors.primary },
  secondary: { bg: colors.surface, fg: colors.accent, border: "#e7ddee" },
  danger: { bg: colors.danger, fg: colors.white, border: colors.danger },
  text: { bg: "transparent", fg: colors.accent, border: "transparent" },
};

const styles = StyleSheet.create({
  base: { borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  box: { paddingVertical: 13, paddingHorizontal: 18, borderWidth: 1 },
  text: { paddingVertical: 6, alignSelf: "flex-start" },
  fullWidth: { alignSelf: "stretch" },
  content: { flexDirection: "row", alignItems: "center", gap: 10 },
  label: { fontFamily: fonts.semibold, fontSize: 14 },
  textLabel: { fontSize: 13 },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.45 },
});
