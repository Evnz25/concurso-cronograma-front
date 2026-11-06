import { Pressable, StyleSheet, View } from "react-native";
import { colors, fonts, radius, shadows, spacing } from "@/theme";
import { AppText } from "./AppText";
import { Icon } from "./Icon";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;
  return (
    <View style={styles.toast}>
      <View style={styles.iconBox}>
        <Icon name="check" size={15} color={colors.primary} />
      </View>
      <AppText style={styles.message}>{message}</AppText>
      <Pressable
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Fechar mensagem"
        style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
      >
        <Icon name="close" size={14} color={colors.muted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#e5daef",
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    maxWidth: "90%",
    ...shadows.floating,
    zIndex: 999,
  },
  iconBox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.text,
    flexShrink: 1,
  },
  closeBtn: {
    padding: 4,
  },
  pressed: {
    opacity: 0.6,
  },
});
