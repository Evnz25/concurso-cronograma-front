import { Pressable, StyleSheet, View } from "react-native";
import { colors, fonts, radius, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Avatar } from "../common/Avatar";
import { Icon } from "../common/Icon";

interface AppHeaderProps {
  title?: string;
  userName: string;
  streakDays: number;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
}

export function AppHeader({
  userName,
  streakDays,
  onOpenNotifications,
  onOpenProfile,
}: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <View style={styles.brandMark}>
          <Icon name="code" size={18} color={colors.white} />
        </View>
        <AppText style={styles.brandText}>
          Aprova<AppText style={styles.brandAccent}>Tech</AppText>
          <AppText color={colors.primaryText}>.</AppText>
        </AppText>
      </View>

      <View style={styles.actions}>
        <View style={styles.streak}>
          <Icon name="fire" size={16} color="#d47942" />
          <AppText style={styles.streakDays}>{streakDays}</AppText>
        </View>

        {onOpenNotifications && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notificações"
            onPress={onOpenNotifications}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          >
            <Icon name="bell" size={19} color={colors.textSoft} />
          </Pressable>
        )}

        <Avatar name={userName} size="small" onPress={onOpenProfile} ariaLabel="Meu perfil" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs + 2,
  },
  brandMark: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.text,
  },
  brandAccent: {
    fontFamily: fonts.heading,
    color: colors.primaryText,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
  },
  streak: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#fff6f0",
    borderRadius: radius.pill,
  },
  streakDays: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: "#d47942",
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
});
