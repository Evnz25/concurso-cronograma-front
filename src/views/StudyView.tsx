import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { AppText } from "@/components/common/AppText";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { PageHeading } from "@/components/common/PageHeading";
import { ScreenContainer } from "@/components/common/ScreenContainer";
import { SmartPill } from "@/components/common/SmartPill";
import { DayOverview } from "@/components/schedule/DayOverview";
import { StudyBlockList } from "@/components/schedule/StudyBlockList";
import { WeekCalendar } from "@/components/schedule/WeekCalendar";
import { useApp } from "@/context/AppContext";
import { formatMonthYear, formatShortDate, getIsoWeek, localDate } from "@/services/formatService";
import { getDayPlan, getWeekDays } from "@/services/scheduleService";
import { spacing } from "@/theme";

export function StudyView() {
  const router = useRouter();
  const { scheduleBlocks, toggleBlock, today, reviews, startReview, busy } = useApp();
  const [selection, setSelection] = useState<string | null>(null);
  const selectedDate = selection ?? today;
  const reference = new Date(selectedDate + "T12:00:00");
  const weekDays = getWeekDays(reference, scheduleBlocks, today, new Set(reviews.keys()));
  const selectedWeekDay = weekDays.find((day) => day.date === selectedDate)!;
  const blocks = scheduleBlocks.filter((block) => block.date === selectedDate);
  const completedIds = blocks.filter((block) => block.completed).map((block) => block.id);
  const plan = getDayPlan(selectedWeekDay, blocks, completedIds.length);
  const dayReviews = reviews.get(selectedDate) ?? [];
  const themes = new Map<string, number>();
  for (const { question } of dayReviews) {
    themes.set(question.theme, (themes.get(question.theme) ?? 0) + 1);
  }
  const overdue = dayReviews.filter(({ due }) => due < today).length;
  const nextDate = [...reviews.keys()].filter((day) => day > selectedDate).sort()[0];
  function selectDate(date: string) {
    setSelection(date === today ? null : date);
  }

  return (
    <ScreenContainer>
      <PageHeading
        eyebrow="SEU PLANO, NO SEU RITMO"
        title="Cronograma"
        aside={<SmartPill>Ciclo de estudos</SmartPill>}
      />

      <WeekCalendar
        monthLabel={formatMonthYear(reference)}
        weekNumber={getIsoWeek(reference)}
        days={weekDays}
        selectedDate={selectedDate}
        onSelectDate={selectDate}
        onMoveWeek={(direction) => {
          const date = new Date(reference);
          date.setDate(date.getDate() + direction * 7);
          selectDate(localDate(date));
        }}
      />

      <View style={styles.dayHeading}>
        <View style={styles.dayTitleWrap}>
          <AppText variant="heading">{plan.title}</AppText>
          {blocks.length > 0 && <AppText variant="caption">{plan.subtitle}</AppText>}
        </View>
        {blocks.length > 0 && <Badge tone="purple">{plan.badge}</Badge>}
      </View>

      {dayReviews.length > 0 && (
        <Card style={styles.reviewCard}>
          <AppText variant="subheading">
            Revisão de {dayReviews.length} {dayReviews.length === 1 ? "questão" : "questões"}
          </AppText>
          {[...themes].map(([theme, count]) => (
            <AppText key={theme} variant="body">
              {theme} · {count}
            </AppText>
          ))}
          {overdue > 0 && <AppText variant="caption">{overdue} com revisão em atraso</AppText>}
          {selectedWeekDay.isToday && (
            <Button
              label="Iniciar revisão"
              disabled={busy}
              icon="arrow"
              onPress={() => {
                if (startReview()) router.push("/questions");
              }}
            />
          )}
        </Card>
      )}
      {blocks.length > 0 && (
        <Card>
          <StudyBlockList blocks={blocks} completedIds={completedIds} onToggle={toggleBlock} />
        </Card>
      )}
      {!blocks.length && !dayReviews.length && (
        <DayOverview plan={plan} onBackToToday={() => setSelection(null)} />
      )}
      {nextDate && (
        <Button
          variant="secondary"
          label={`Próxima revisão · ${formatShortDate(nextDate)}`}
          onPress={() => selectDate(nextDate)}
        />
      )}
      {selectedDate !== today && (blocks.length > 0 || dayReviews.length > 0) && (
        <Button variant="text" label="Voltar para hoje" onPress={() => setSelection(null)} />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  reviewCard: { gap: spacing.sm },
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
