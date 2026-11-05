import { useMemo, useState } from "react";
import type { Difficulty, StudyBlock } from "@/interfaces";
import { Icon } from "@/components/common/Icon";
import { PageHeading } from "@/components/common/PageHeading";
import { SmartPill } from "@/components/common/SmartPill";
import { CycleSummaryCard } from "@/components/schedule/CycleSummaryCard";
import { DayOverview } from "@/components/schedule/DayOverview";
import { DelayInfoBanner } from "@/components/schedule/DelayInfoBanner";
import { StudyBlockList } from "@/components/schedule/StudyBlockList";
import { WeekCalendar } from "@/components/schedule/WeekCalendar";
import { CURRENT_DATE, formatMonthYear, getIsoWeek } from "@/services/formatService";
import { getNextReviewLabel } from "@/services/questionService";
import {
  BREAK_MINUTES,
  MAX_CONSECUTIVE_MINUTES_PER_SUBJECT,
  getDayPlan,
  getWeekDays,
} from "@/services/scheduleService";

interface StudyViewProps {
  blocks: StudyBlock[];
  completedIds: string[];
  rating: Difficulty | null;
  onToggleBlock: (blockId: string) => void;
}

/** Cronograma dinâmico com blocos diários e pausas programadas (RNF02, RF12, RF13). */
export function StudyView({ blocks, completedIds, rating, onToggleBlock }: StudyViewProps) {
  const weekDays = useMemo(() => getWeekDays(), []);
  const today = weekDays.find((day) => day.isToday) ?? weekDays[0];
  const [selectedDay, setSelectedDay] = useState(today.day);
  const selectedWeekDay = weekDays.find((day) => day.day === selectedDay) ?? today;
  const plan = getDayPlan(selectedWeekDay, blocks, completedIds.length);

  return (
    <>
      <PageHeading
        eyebrow="SEU PLANO, NO SEU RITMO"
        title="Consistência que vira conquista"
        description="Um cronograma inteligente que evolui com o seu aprendizado."
        aside={<SmartPill>SRS ativo</SmartPill>}
      />
      <div className="study-layout">
        <div>
          <WeekCalendar
            monthLabel={formatMonthYear(CURRENT_DATE)}
            weekNumber={getIsoWeek(CURRENT_DATE)}
            days={weekDays}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
          <div className="section-heading day-heading">
            <div>
              <h2>{plan.title}</h2>
              <p>{plan.subtitle}</p>
            </div>
            <span className="badge purple">{plan.badge}</span>
          </div>
          {plan.status === "today" ? (
            <section className="panel full-schedule">
              <StudyBlockList
                blocks={blocks}
                completedIds={completedIds}
                onToggle={onToggleBlock}
              />
              <div className="schedule-footer">
                <Icon name="check" size={16} /> Marque cada bloco ao terminar seus estudos.
              </div>
            </section>
          ) : (
            <DayOverview plan={plan} onBackToToday={() => setSelectedDay(today.day)} />
          )}
          <DelayInfoBanner />
        </div>
        <aside>
          <CycleSummaryCard
            maxHoursPerSubject={MAX_CONSECUTIVE_MINUTES_PER_SUBJECT / 60}
            breakMinutes={BREAK_MINUTES}
            nextReviewLabel={getNextReviewLabel(rating)}
          />
        </aside>
      </div>
    </>
  );
}
