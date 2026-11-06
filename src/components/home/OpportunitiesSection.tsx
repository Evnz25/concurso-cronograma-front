import { StyleSheet, View } from "react-native";
import type { Exam, ExamFilter } from "@/interfaces";
import { colors, fonts, radius, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Button } from "../common/Button";
import { Icon } from "../common/Icon";
import { SegmentedControl } from "../common/SegmentedControl";
import { ExamCard } from "./ExamCard";

interface OpportunitiesSectionProps {
  exams: Exam[];
  filter: ExamFilter;
  showEmptyState: boolean;
  onFilterChange: (filter: ExamFilter) => void;
  onSelectExam: (examId: string) => void;
}

const FILTER_OPTIONS = [
  { value: "all" as const, label: "Todos" },
  { value: "mine" as const, label: "Minha trilha" },
  { value: "salary" as const, label: "Salário" },
];

export function OpportunitiesSection({
  exams,
  filter,
  showEmptyState,
  onFilterChange,
  onSelectExam,
}: OpportunitiesSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="heading">Oportunidades</AppText>
      </View>

      <SegmentedControl
        options={FILTER_OPTIONS}
        value={filter}
        onChange={onFilterChange}
        accessibilityLabel="Filtrar concursos"
      />

      <View style={styles.list}>
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} onSelect={onSelectExam} />
        ))}

        {showEmptyState && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Icon name="briefcase" size={26} color={colors.muted} />
            </View>
            <AppText variant="subheading" style={styles.emptyTitle}>
              Novas oportunidades em breve
            </AppText>
            <AppText variant="caption" style={styles.emptyText}>
              Nenhum edital desta trilha na seleção demonstrativa.
            </AppText>
            <Button
              variant="text"
              label="Ver todos os editais"
              icon="arrow"
              onPress={() => onFilterChange("all")}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  list: {
    gap: spacing.sm + 2,
  },
  emptyState: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.xs,
  },
  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    marginBottom: spacing.xs,
  },
});
