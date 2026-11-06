import { useMemo, useState } from "react";
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
import { CURRENT_DATE, formatMonthYear, getIsoWeek } from "@/services/formatService";
import { getDayPlan, getWeekDays } from "@/services/scheduleService";
import { spacing } from "@/theme";

export function StudyView() {
  const { blocks, completedIds, toggleBlock } = useApp();

  const weekDays = useMemo(() => getWeekDays(), []);
  const today = weekDays.find((day) => day.isToday) ?? weekDays[0];
  const [selectedDay, setSelectedDay] = useState(today.day);
  const selectedWeekDay = weekDays.find((day) => day.day === selectedDay) ?? today;
  const plan = getDayPlan(selectedWeekDay, blocks, completedIds.length);

  return (
    <ScreenContainer>
      <PageHeading
        eyebrow="SEU PLANO, NO SEU RITMO"
        title="Cronograma"
        aside={<SmartPill>SRS ativo</SmartPill>}
      />

      <WeekCalendar
        monthLabel={formatMonthYear(CURRENT_DATE)}
        weekNumber={getIsoWeek(CURRENT_DATE)}
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

      {plan.status === "today" ? (
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
