import type { ReactNode } from "react";
import { Modal as RNModal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { colors, radius, shadows, spacing } from "@/theme";
import { Icon } from "./Icon";

interface ModalProps {
  visible?: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ visible = true, onClose, children }: ModalProps) {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Pressable
            style={styles.closeBtn}
            accessibilityRole="button"
            accessibilityLabel="Fechar"
            onPress={onClose}
          >
            <Icon name="close" size={18} color={colors.muted} />
          </Pressable>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    width: "100%",
    maxWidth: 420,
    maxHeight: "85%",
    position: "relative",
    ...shadows.floating,
  },
  closeBtn: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
    padding: spacing.xs,
  },
  content: {
    paddingTop: spacing.xs,
  },
});
