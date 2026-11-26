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
import { colors, radius } from "@/theme";

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
});
