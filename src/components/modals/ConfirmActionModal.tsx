import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { StyleSheet, TextInput, View } from "react-native";
import { colors, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";
import { ToneIcon } from "../common/ToneIcon";

interface ConfirmActionModalProps {
  variant: "reset" | "delete";
  onClose: () => void;
  onConfirm: (password?: string) => Promise<void>;
}

const CONTENT = {
  reset: {
    icon: "calendar" as const,
    tone: "purple" as const,
    title: "Um novo começo?",
    description:
      "Um novo cronograma será criado para a trilha atual. Seus estudos e respostas anteriores continuarão no histórico.",
    confirmLabel: "Iniciar novo ciclo",
  },
  delete: {
    icon: "user" as const,
    tone: "orange" as const,
    title: "Excluir seu perfil?",
    description:
      "Sua conta e todo o histórico serão excluídos do servidor. Esta ação não pode ser desfeita.",
    confirmLabel: "Sim, excluir perfil",
  },
} as const;

export function ConfirmActionModal({ variant, onClose, onConfirm }: ConfirmActionModalProps) {
  const content = CONTENT[variant];
  const { busy, error } = useApp();
  const [password, setPassword] = useState("");

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

        {variant === "delete" && (
          <TextInput
            accessibilityLabel="Senha atual para excluir conta"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Digite sua senha atual"
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: colors.border,
              padding: spacing.md,
              color: colors.text,
            }}
          />
        )}
        {!!error && <AppText color={colors.danger}>{error}</AppText>}
        <View style={styles.actions}>
          <View style={styles.actionBtn}>
            <Button
              variant="secondary"
              label="Cancelar"
              disabled={busy}
              onPress={onClose}
              fullWidth
            />
          </View>
          <View style={styles.actionBtn}>
            <Button
              variant={variant === "delete" ? "danger" : "primary"}
              label={content.confirmLabel}
              loading={busy}
              disabled={variant === "delete" && !password}
              onPress={() => {
                void onConfirm(password);
              }}
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
