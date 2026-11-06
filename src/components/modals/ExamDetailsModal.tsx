import { StyleSheet, View } from "react-native";
import type { Exam } from "@/interfaces";
import { formatCurrency, formatShortDate } from "@/services/formatService";
import { colors, fonts, radius, spacing, tones } from "@/theme";
import { AppText } from "../common/AppText";
import { Button } from "../common/Button";
import { Icon } from "../common/Icon";
import { Modal } from "../common/Modal";

interface ExamDetailsModalProps {
  exam: Exam;
  onClose: () => void;
  onPrepare: (exam: Exam) => void;
}

export function ExamDetailsModal({ exam, onClose, onPrepare }: ExamDetailsModalProps) {
  const orgTone = tones[exam.color] ?? tones.blue;

  return (
    <Modal onClose={onClose}>
      <View style={styles.content}>
        <View style={[styles.orgLogo, { backgroundColor: orgTone.bg }]}>
          <AppText style={[styles.orgText, { color: orgTone.fg }]}>
            {exam.org === "BB" ? "≋" : exam.org}
          </AppText>
        </View>

        <AppText variant="title" style={styles.title}>
          {exam.name}
        </AppText>
        <AppText variant="bodyStrong" color={colors.primaryText}>
          {exam.job}
        </AppText>

        <View style={styles.metaBox}>
          <View style={styles.metaRow}>
            <Icon name="pin" size={15} color={colors.muted} />
            <AppText variant="caption">{exam.place}</AppText>
          </View>
          <View style={styles.metaRow}>
            <Icon name="briefcase" size={15} color={colors.muted} />
            <AppText variant="caption">{exam.vacancies} vagas</AppText>
          </View>
          <View style={styles.metaRow}>
            <Icon name="calendar" size={15} color={colors.muted} />
            <AppText variant="caption">
              Inscrições até {formatShortDate(exam.registrationDeadline)}
            </AppText>
          </View>
        </View>

        <View style={styles.salaryBox}>
          <AppText variant="metric" color={colors.text}>
            {formatCurrency(exam.salary)}
          </AppText>
          <AppText variant="caption">remuneração inicial</AppText>
        </View>

        <AppText variant="body" style={styles.description}>
          {exam.description}
        </AppText>

        <View style={styles.infoBox}>
          <Icon name="spark" size={16} color={colors.accent} />
          <AppText variant="caption" style={styles.infoText}>
            Edital demonstrativo. Consulte os canais oficiais para confirmar vagas.
          </AppText>
        </View>

        <Button
          label="Preparar para este concurso"
          icon="arrow"
          onPress={() => onPrepare(exam)}
          fullWidth
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
  orgLogo: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  orgText: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
  },
  metaBox: {
    gap: 6,
    paddingVertical: spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  salaryBox: {
    paddingVertical: spacing.xs,
  },
  description: {
    lineHeight: 20,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.infoBg,
    borderRadius: radius.md,
  },
  infoText: {
    color: colors.infoText,
    flex: 1,
  },
});
