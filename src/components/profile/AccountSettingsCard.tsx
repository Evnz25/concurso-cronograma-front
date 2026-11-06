import { Pressable, StyleSheet, View } from "react-native";
import { colors, fonts, radius, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Card } from "../common/Card";
import { Icon } from "../common/Icon";

interface AccountSettingsCardProps {
  onResetSchedule: () => void;
  onDeleteAccount: () => void;
}

export function AccountSettingsCard({
  onResetSchedule,
  onDeleteAccount,
}: AccountSettingsCardProps) {
  return (
    <Card style={styles.card}>
      <AppText variant="heading" style={styles.title}>
        Configurações da conta
      </AppText>

      {/* Iniciar novo cronograma */}
      <Pressable
        onPress={onResetSchedule}
        style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        <View style={styles.actionLeft}>
          <Icon name="calendar" size={18} color={colors.primary} />
          <View style={styles.actionText}>
            <AppText variant="subheading">Iniciar novo cronograma</AppText>
            <AppText variant="caption">
              Recomece seu ciclo de estudos e as revisões do algoritmo.
            </AppText>
          </View>
        </View>
        <Icon name="chevron" size={16} color={colors.muted} />
      </Pressable>

      <View style={styles.divider} />

      {/* Excluir conta */}
      <Pressable
        onPress={onDeleteAccount}
        style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        <View style={styles.actionLeft}>
          <Icon name="logout" size={18} color={colors.danger} />
          <View style={styles.actionText}>
            <AppText variant="subheading" color={colors.danger}>
              Excluir minha conta
            </AppText>
            <AppText variant="caption">
              Limpa seus dados e histórico de desempenho no aplicativo.
            </AppText>
          </View>
        </View>
        <Icon name="chevron" size={16} color={colors.muted} />
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  title: {
    fontSize: 16,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    flex: 1,
  },
  actionText: {
    flex: 1,
    gap: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSoft,
  },
  pressed: {
    opacity: 0.7,
  },
});
