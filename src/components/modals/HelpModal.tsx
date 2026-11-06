import { StyleSheet, View } from "react-native";
import { colors, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";
import { ToneIcon } from "../common/ToneIcon";

export function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <View style={styles.content}>
        <ToneIcon name="help" tone="purple" size={48} iconSize={24} />
        <AppText variant="heading" style={styles.title}>
          Seu guia para a aprovação
        </AppText>

        <View style={styles.items}>
          <View style={styles.item}>
            <AppText variant="subheading">1. Escolha sua trilha</AppText>
            <AppText variant="caption">No perfil, selecione uma das cinco áreas de TI.</AppText>
          </View>

          <View style={styles.item}>
            <AppText variant="subheading">2. Siga o seu ciclo</AppText>
            <AppText variant="caption">
              Conclua os blocos diários e respeite as pausas programadas.
            </AppText>
          </View>

          <View style={styles.item}>
            <AppText variant="subheading">3. Responda e avalie</AppText>
            <AppText variant="caption">
              Na revisão, avalie cada questão para definir o próximo intervalo do SRS.
            </AppText>
          </View>
        </View>

        <Button label="Entendi, vamos lá" icon="check" onPress={onClose} fullWidth />
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
  items: {
    gap: spacing.md,
    width: "100%",
    paddingVertical: spacing.xs,
  },
  item: {
    gap: 2,
    backgroundColor: colors.primarySoft,
    padding: spacing.md,
    borderRadius: spacing.sm,
  },
});
