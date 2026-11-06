import { Pressable, StyleSheet, View } from "react-native";
import type { Exam } from "@/interfaces";
import { formatCurrency, formatShortDate } from "@/services/formatService";
import { getTrackById } from "@/services/trackService";
import { colors, fonts, radius, shadows, spacing, tones } from "@/theme";
import { AppText } from "../common/AppText";
import { Badge } from "../common/Badge";
import { Icon } from "../common/Icon";

interface ExamCardProps {
  exam: Exam;
  onSelect: (examId: string) => void;
}

export function ExamCard({ exam, onSelect }: ExamCardProps) {
  const track = getTrackById(exam.trackId);
  const orgTone = tones[exam.color] ?? tones.blue;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => onSelect(exam.id)}
      accessibilityRole="button"
    >
      <View style={[styles.orgLogo, { backgroundColor: orgTone.bg }]}>
        <AppText style={[styles.orgText, { color: orgTone.fg }]}>
          {exam.org === "BB" ? "≋" : exam.org}
        </AppText>
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <AppText variant="subheading" style={styles.name} numberOfLines={1}>
            {exam.name}
          </AppText>
          <Badge tone="green">Aberto</Badge>
        </View>

        <AppText variant="caption" style={styles.job} numberOfLines={1}>
          {exam.job}
        </AppText>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Icon name="pin" size={13} color={colors.muted} />
            <AppText variant="caption">{exam.place}</AppText>
          </View>
          <View style={styles.detailItem}>
            <Icon name={track.icon} size={13} color={colors.muted} />
            <AppText variant="caption">{track.shortName}</AppText>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <AppText variant="bodyStrong" color={colors.primaryText}>
            {formatCurrency(exam.salary)}
          </AppText>
          <AppText variant="caption">até {formatShortDate(exam.registrationDeadline)}</AppText>
        </View>
      </View>

      <Icon name="chevron" size={18} color={colors.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.8,
  },
  orgLogo: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  orgText: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.xs,
  },
  name: {
    flex: 1,
  },
  job: {
    color: colors.textSoft,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: 2,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
  },
});
