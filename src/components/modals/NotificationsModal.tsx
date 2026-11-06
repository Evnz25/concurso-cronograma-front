import { StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Button } from "../common/Button";
import { Icon } from "../common/Icon";
import { Modal } from "../common/Modal";
import { ToneIcon } from "../common/ToneIcon";

interface NotificationsModalProps {
  pendingReviews: number;
  pendingBlocks: number;
  onClose: () => void;
  onStartReview: () => void;
}

export function NotificationsModal({
  pendingReviews,
  pendingBlocks,
  onClose,
  onStartReview,
}: NotificationsModalProps) {
  return (
    <Modal onClose={onClose}>
      <View style={styles.content}>
        <ToneIcon name="bell" tone="orange" size={48} iconSize={24} />
        <AppText variant="heading" style={styles.title}>
          Um lembrete para evoluir
        </AppText>
        <AppText variant="body" style={styles.description}>
          Você tem {pendingReviews} questões aguardando revisão e {pendingBlocks} blocos de estudo
          pendentes hoje.
        </AppText>

        <View style={styles.infoBox}>
          <Icon name="spark" size={18} color={colors.accent} />
          <AppText variant="caption" style={styles.infoText}>
            Revisar no momento certo ajuda a transformar conteúdo em memória de longo prazo.
          </AppText>
        </View>

        <Button label="Começar revisão" icon="arrow" onPress={onStartReview} fullWidth />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginTop: spacing.xs,
  },
  description: {
    textAlign: "center",
    lineHeight: 20,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.infoBg,
    borderRadius: radius.md,
    width: "100%",
  },
  infoText: {
    color: colors.infoText,
    flex: 1,
    lineHeight: 18,
  },
});
