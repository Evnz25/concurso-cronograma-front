import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { PageHeading } from "@/components/common/PageHeading";
import { ScreenContainer } from "@/components/common/ScreenContainer";
import { SmartPill } from "@/components/common/SmartPill";
import { DayOverview } from "@/components/schedule/DayOverview";
import { StudyBlockList } from "@/components/schedule/StudyBlockList";
import { WeekCalendar } from "@/components/schedule/WeekCalendar";
import { useApp } from "@/context/AppContext";
import { formatMonthYear, getIsoWeek } from "@/services/formatService";
import { getDayPlan, getWeekDays } from "@/services/scheduleService";
import { spacing } from "@/theme";

export function StudyView() {
  const { scheduleBlocks, toggleBlock } = useApp();

  const weekDays = getWeekDays(new Date(), scheduleBlocks);
  const today = weekDays.find((day) => day.isToday) ?? weekDays[0];
  const [selectedDay, setSelectedDay] = useState(today.day);
  const selectedWeekDay = weekDays.find((day) => day.day === selectedDay) ?? today;
  const blocks = scheduleBlocks.filter((block) => block.date === selectedWeekDay.date);
  const completedIds = blocks.filter((block) => block.completed).map((block) => block.id);
  const plan = getDayPlan(selectedWeekDay, blocks, completedIds.length);

  return (
    <ScreenContainer>
      <PageHeading
        eyebrow="SEU PLANO, NO SEU RITMO"
        title="Cronograma"
        aside={<SmartPill>Ciclo de estudos</SmartPill>}
      />

      <WeekCalendar
        monthLabel={formatMonthYear(new Date())}
        weekNumber={getIsoWeek(new Date())}
        days={weekDays}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />

      <View style={styles.dayHeading}>
        <View style={styles.dayTitleWrap}>
          <AppText variant="heading">{plan.title}</AppText>
          <AppText variant="caption">{plan.subtitle}</AppText>
        </View>
        <Badge tone="purple">{plan.badge}</Badge>
      </View>

      {blocks.length > 0 ? (
        <Card>
          <StudyBlockList blocks={blocks} completedIds={completedIds} onToggle={toggleBlock} />
        </Card>
      ) : (
        <DayOverview plan={plan} onBackToToday={() => setSelectedDay(today.day)} />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  dayHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  dayTitleWrap: {
    flex: 1,
    gap: 2,
  },
});
