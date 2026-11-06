import { StyleSheet, View } from "react-native";
import { colors, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";
import { ToneIcon } from "../common/ToneIcon";

interface ConfirmActionModalProps {
  variant: "reset" | "delete";
  onClose: () => void;
  onConfirm: () => void;
}

const CONTENT = {
  reset: {
    icon: "calendar" as const,
    tone: "purple" as const,
    title: "Um novo começo?",
    description:
      "Seus blocos concluídos, respostas e intervalos de revisão serão reiniciados. Seu perfil e sua trilha serão mantidos.",
    confirmLabel: "Iniciar novo ciclo",
  },
  delete: {
    icon: "user" as const,
    tone: "orange" as const,
    title: "Excluir seu perfil?",
    description:
      "Os dados do perfil e o progresso desta demonstração serão limpos. Esta ação não pode ser desfeita.",
    confirmLabel: "Sim, excluir perfil",
  },
} as const;

export function ConfirmActionModal({ variant, onClose, onConfirm }: ConfirmActionModalProps) {
  const content = CONTENT[variant];

  return (
    <Modal onClose={onClose}>
      <View style={styles.content}>
        <ToneIcon name={content.icon} tone={content.tone} size={48} iconSize={24} />
        <AppText variant="heading" style={styles.title}>
          {content.title}
        </AppText>
        <AppText variant="body" style={styles.description}>
          {content.description}
        </AppText>

        <View style={styles.actions}>
          <View style={styles.actionBtn}>
            <Button variant="secondary" label="Cancelar" onPress={onClose} fullWidth />
          </View>
          <View style={styles.actionBtn}>
            <Button
              variant={variant === "delete" ? "danger" : "primary"}
              label={content.confirmLabel}
              onPress={onConfirm}
              fullWidth
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  title: {
    textAlign: "center",
    marginTop: spacing.xs,
  },
  description: {
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
    width: "100%",
    marginTop: spacing.xs,
  },
  actionBtn: {
    flex: 1,
  },
});
