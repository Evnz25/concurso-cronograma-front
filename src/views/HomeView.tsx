import { useMemo, useState } from "react";
import type { AnswerRecord, ExamFilter, PageId, StudyBlock, User } from "@/interfaces";
import { Icon } from "@/components/common/Icon";
import { PageHeading } from "@/components/common/PageHeading";
import { DailyGoalCard } from "@/components/home/DailyGoalCard";
import { HeroBanner } from "@/components/home/HeroBanner";
import { MetricsRow } from "@/components/home/MetricsRow";
import { OpportunitiesSection } from "@/components/home/OpportunitiesSection";
import { PendingReviewCard } from "@/components/home/PendingReviewCard";
import { QuoteCard } from "@/components/home/QuoteCard";
import { TrackCard } from "@/components/home/TrackCard";
import { StudyBlockList } from "@/components/schedule/StudyBlockList";
import { filterExams, getExams, hasExamsForTrack } from "@/services/examService";
import { CURRENT_DATE, formatDayMonth, formatLongDate } from "@/services/formatService";
import { getGoalPercent } from "@/services/scheduleService";
import {
  STATS_BASELINE,
  getAccuracy,
  getPendingReviewCount,
  getQuestionsSolved,
  getStudyHours,
} from "@/services/statsService";
import { getTrackById } from "@/services/trackService";
import { getFirstName } from "@/services/userService";

interface HomeViewProps {
  user: User;
  blocks: StudyBlock[];
  completedIds: string[];
  completedMinutes: number;
  plannedMinutes: number;
  answers: AnswerRecord[];
  onToggleBlock: (blockId: string) => void;
  onNavigate: (page: PageId) => void;
  onSelectExam: (examId: string) => void;
}

/** Tela inicial: plano do dia, alertas (RF10) e oportunidades (RF11). */
export function HomeView({
  user,
  blocks,
  completedIds,
  completedMinutes,
  plannedMinutes,
  answers,
  onToggleBlock,
  onNavigate,
  onSelectExam,
}: HomeViewProps) {
  const [examFilter, setExamFilter] = useState<ExamFilter>("all");
  const exams = getExams();
  const filteredExams = useMemo(
    () => filterExams(exams, examFilter, user.trackId),
    [exams, examFilter, user.trackId],
  );

  return (
    <>
      <PageHeading
        eyebrow={formatLongDate(CURRENT_DATE).toUpperCase()}
        title="Seu próximo passo é a aprovação"
        description={`Bom dia, ${getFirstName(user.name)}! Vamos transformar dedicação em resultado?`}
        aside={
          <span className="date-pill">
            <Icon name="calendar" size={16} />
            {formatDayMonth(CURRENT_DATE)}
          </span>
        }
      />
      <div className="home-grid">
        <div className="main-column">
          <HeroBanner onContinue={() => onNavigate("study")} />
          <MetricsRow
            studyHours={getStudyHours("week", completedMinutes)}
            questionsSolved={getQuestionsSolved("week", answers)}
            accuracyPercent={getAccuracy(answers).percent}
          />
          <section className="panel schedule-panel">
            <div className="section-heading">
              <div>
                <h2>
                  Seu plano de hoje <span className="count-badge">{blocks.length} blocos</span>
                </h2>
                <p>Pequenos passos, grandes conquistas.</p>
              </div>
              <button className="text-button" onClick={() => onNavigate("study")}>
                Ver cronograma <Icon name="arrow" size={15} />
              </button>
            </div>
            <StudyBlockList
              blocks={blocks}
              completedIds={completedIds}
              onToggle={onToggleBlock}
              compact
            />
            <div className="schedule-footer">
              <Icon name="spark" size={15} />
              <span>Organizado para você pela repetição espaçada.</span>
              <span className="srs-label">SRS inteligente</span>
            </div>
          </section>
          <OpportunitiesSection
            exams={filteredExams}
            filter={examFilter}
            showEmptyState={examFilter === "mine" && !hasExamsForTrack(exams, user.trackId)}
            onFilterChange={setExamFilter}
            onSelectExam={onSelectExam}
          />
        </div>
        <aside className="right-column">
          <PendingReviewCard
            pendingCount={getPendingReviewCount(answers)}
            onReview={() => onNavigate("questions")}
          />
          <DailyGoalCard
            completedMinutes={completedMinutes}
            plannedMinutes={plannedMinutes}
            goalPercent={getGoalPercent(completedMinutes, plannedMinutes)}
            completedBlocks={completedIds.length}
            totalBlocks={blocks.length}
          />
          <TrackCard
            track={getTrackById(user.trackId)}
            progressPercent={STATS_BASELINE.trackProgressPercent}
            onEdit={() => onNavigate("profile")}
            onExplore={() => onNavigate("stats")}
          />
          <QuoteCard />
        </aside>
      </div>
    </>
  );
}
