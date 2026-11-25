import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import type { ExamFilter, PageId } from "@/interfaces";
import { AppText } from "@/components/common/AppText";
import { Icon } from "@/components/common/Icon";
import { ToneIcon } from "@/components/common/ToneIcon";
import { PageHeading } from "@/components/common/PageHeading";
import { ScreenContainer } from "@/components/common/ScreenContainer";
import { DailyGoalCard } from "@/components/home/DailyGoalCard";
import { MetricsRow } from "@/components/home/MetricsRow";
import { OpportunitiesSection } from "@/components/home/OpportunitiesSection";
import { TrackCard } from "@/components/home/TrackCard";
import { AppHeader } from "@/components/layout/AppHeader";
import { useApp } from "@/context/AppContext";
import { filterExams } from "@/services/examService";
import { formatDayMonth, formatLongDate } from "@/services/formatService";
import { routeFor } from "@/services/navigationService";
import { getGoalPercent } from "@/services/scheduleService";
import {
  filterAnswers,
  getAccuracy,
  getQuestionsSolved,
  getStudyHours,
} from "@/services/statsService";
import { getTrackById } from "@/services/trackService";
import { colors, radius, spacing } from "@/theme";

export function HomeView() {
  const router = useRouter();
  const {
    user,
    tracks,
    exams,
    blocks,
    allBlocks,
    scheduleBlocks,
    completedIds,
    completedMinutes,
    plannedMinutes,
    answers,
    openExam,
    openModal,
    selectTrack,
  } = useApp();

  const [examFilter, setExamFilter] = useState<ExamFilter>("all");

  const filteredExams = useMemo(
    () => filterExams(exams, examFilter, user.trackId),
    [exams, examFilter, user.trackId],
  );

  const navigate = (page: PageId) => {
    router.push(routeFor(page) as any);
  };

  return (
    <ScreenContainer>
      <AppHeader
        userName={user.name}
        onOpenNotifications={() => openModal("notifications")}
        onOpenProfile={() => navigate("profile")}
      />

      <PageHeading
        eyebrow={formatLongDate(new Date()).toUpperCase()}
        title="Seu próximo passo é a aprovação"
        aside={
          <View style={styles.datePill}>
            <Icon name="calendar" size={14} color={colors.muted} />
            <AppText variant="caption">{formatDayMonth(new Date())}</AppText>
          </View>
        }
      />

      <MetricsRow
        studyHours={getStudyHours("week", allBlocks)}
        questionsSolved={getQuestionsSolved("week", answers)}
        accuracyPercent={getAccuracy(filterAnswers(answers, "week")).percent}
      />

      <DailyGoalCard
        completedMinutes={completedMinutes}
        plannedMinutes={plannedMinutes}
        goalPercent={getGoalPercent(completedMinutes, plannedMinutes)}
        completedBlocks={completedIds.length}
        totalBlocks={blocks.length}
      />

      <TrackCard
        track={getTrackById(user.trackId, tracks)}
        progressPercent={
          scheduleBlocks.length
            ? (scheduleBlocks.filter((block) => block.completed).length / scheduleBlocks.length) *
              100
            : 0
        }
        onEdit={() => navigate("profile")}
        onExplore={() => navigate("stats")}
      />

      <View style={styles.tracksSection}>
        <View style={styles.tracksHeader}>
          <AppText variant="subheading">Trilhas disponíveis ({tracks.length})</AppText>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigate("profile")}
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <AppText variant="caption" color={colors.accent}>
              Gerenciar no perfil
            </AppText>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tracksList}
        >
          {tracks.map((t) => {
            const isSelected = t.id === user.trackId;
            return (
              <Pressable
                key={t.id}
                onPress={() => selectTrack(t.id)}
                style={({ pressed }) => [
                  styles.trackPill,
                  isSelected && styles.trackPillSelected,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Selecionar trilha ${t.name}`}
              >
                <ToneIcon name={t.icon} tone="purple" size={32} iconSize={16} />
                <View style={styles.trackPillText}>
                  <AppText
                    variant="caption"
                    style={[styles.trackPillName, isSelected && styles.trackPillNameSelected]}
                    numberOfLines={1}
                  >
                    {t.shortName || t.name}
                  </AppText>
                  {isSelected ? (
                    <AppText variant="caption" style={styles.trackPillActiveTag}>
                      Ativa
                    </AppText>
                  ) : (
                    <AppText variant="caption" style={styles.trackPillHint} numberOfLines={1}>
                      {t.name}
                    </AppText>
                  )}
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <OpportunitiesSection
        exams={filteredExams}
        filter={examFilter}
        showEmptyState={filteredExams.length === 0}
        onFilterChange={setExamFilter}
        onSelectExam={(id) => openExam(id)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  datePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tracksSection: {
    gap: spacing.xs,
  },
  tracksHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  tracksList: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  trackPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 140,
  },
  trackPillSelected: {
    borderColor: colors.primary,
    backgroundColor: "#faf6ff",
  },
  trackPillText: {
    flexShrink: 1,
    gap: 1,
  },
  trackPillName: {
    fontWeight: "600",
    color: colors.text,
  },
  trackPillNameSelected: {
    color: colors.primary,
  },
  trackPillActiveTag: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 10,
  },
  trackPillHint: {
    color: colors.muted,
    fontSize: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
