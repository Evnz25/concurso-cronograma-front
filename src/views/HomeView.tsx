import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import type { ExamFilter, PageId } from "@/interfaces";
import { AppText } from "@/components/common/AppText";
import { Icon } from "@/components/common/Icon";
import { PageHeading } from "@/components/common/PageHeading";
import { ScreenContainer } from "@/components/common/ScreenContainer";
import { DailyGoalCard } from "@/components/home/DailyGoalCard";
import { MetricsRow } from "@/components/home/MetricsRow";
import { OpportunitiesSection } from "@/components/home/OpportunitiesSection";
import { TrackCard } from "@/components/home/TrackCard";
import { AppHeader } from "@/components/layout/AppHeader";
import { useApp } from "@/context/AppContext";
import { filterExams, getExams, hasExamsForTrack } from "@/services/examService";
import { CURRENT_DATE, formatDayMonth, formatLongDate } from "@/services/formatService";
import { routeFor } from "@/services/navigationService";
import { getGoalPercent } from "@/services/scheduleService";
import {
  STATS_BASELINE,
  getAccuracy,
  getQuestionsSolved,
  getStudyHours,
} from "@/services/statsService";
import { getTrackById } from "@/services/trackService";
import { colors, radius, spacing } from "@/theme";

export function HomeView() {
  const router = useRouter();
  const { user, completedIds, completedMinutes, plannedMinutes, answers, openExam, openModal } =
    useApp();

  const [examFilter, setExamFilter] = useState<ExamFilter>("all");
  const exams = getExams();
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
        streakDays={STATS_BASELINE.focusStreakDays}
        onOpenNotifications={() => openModal("notifications")}
        onOpenProfile={() => navigate("profile")}
      />

      <PageHeading
        eyebrow={formatLongDate(CURRENT_DATE).toUpperCase()}
        title="Seu próximo passo é a aprovação"
        aside={
          <View style={styles.datePill}>
            <Icon name="calendar" size={14} color={colors.muted} />
            <AppText variant="caption">{formatDayMonth(CURRENT_DATE)}</AppText>
          </View>
        }
      />

      <MetricsRow
        studyHours={getStudyHours("week", completedMinutes)}
        questionsSolved={getQuestionsSolved("week", answers)}
        accuracyPercent={getAccuracy(answers).percent}
      />

      <DailyGoalCard
        completedMinutes={completedMinutes}
        plannedMinutes={plannedMinutes}
        goalPercent={getGoalPercent(completedMinutes, plannedMinutes)}
        completedBlocks={completedIds.length}
        totalBlocks={3}
      />

      <TrackCard
        track={getTrackById(user.trackId)}
        progressPercent={STATS_BASELINE.trackProgressPercent}
        onEdit={() => navigate("profile")}
        onExplore={() => navigate("stats")}
      />

      <OpportunitiesSection
        exams={filteredExams}
        filter={examFilter}
        showEmptyState={examFilter === "mine" && !hasExamsForTrack(exams, user.trackId)}
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
});
