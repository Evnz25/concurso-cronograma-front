import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { usePathname, useRouter } from "expo-router";
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
import { SimulationResultModal } from "@/components/modals/SimulationResultModal";
import { useApp } from "@/context/AppContext";
import { formatMonthYear, formatShortDate, getIsoWeek, localDate } from "@/services/formatService";
import { getDayPlan, getWeekDays } from "@/services/scheduleService";
import { spacing } from "@/theme";

export function StudyView() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    scheduleBlocks,
    nextWeek,
    toggleBlock,
    today,
    reviews,
    startSimulation,
    openSimulation,
    busy,
    simulationResult,
    dismissSimulationResult,
    rawTracks,
  } = useApp();
  const [selection, setSelection] = useState<string | null>(null);
  const selectedDate = selection ?? today;
  const reference = new Date(selectedDate + "T12:00:00");
  const reviewDates = new Set(reviews.keys());
  if (openSimulation) reviewDates.add(today);
  const weekDays = getWeekDays(reference, scheduleBlocks, today, reviewDates);
  const selectedWeekDay = weekDays.find((day) => day.date === selectedDate)!;
  const blocks = scheduleBlocks.filter((block) => block.date === selectedDate);
  const completedIds = blocks.filter((block) => block.completed).map((block) => block.id);
  const plan = getDayPlan(selectedWeekDay, blocks, completedIds.length);
  if (nextWeek && selectedDate >= nextWeek) {
    plan.emptyDescription =
      "O plano desta semana será calculado quando ela começar, com base nas questões respondidas nas semanas anteriores.";
  }
  const dayReviews = reviews.get(selectedDate) ?? [];
  const canResume = selectedWeekDay.isToday && openSimulation;
  const showSimulation = dayReviews.length > 0 || canResume;
  const subjects = new Map<string, number>();
  for (const { question } of dayReviews) {
    subjects.set(question.topic, (subjects.get(question.topic) ?? 0) + 1);
  }
  const overdue = dayReviews.filter(({ due }) => due < today).length;
  const nextDate = [...reviews.keys()].filter((day) => day > selectedDate).sort()[0];
  function selectDate(date: string) {
    setSelection(date === today ? null : date);
  }

  return (
    <ScreenContainer>
      {simulationResult && pathname === "/study" && (
        <SimulationResultModal
          title={simulationResult.title}
          summary={simulationResult.summary}
          subjects={rawTracks.find(track => track._id === simulationResult.trackId)?.materias ?? []}
          onClose={dismissSimulationResult}
        />
      )}
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

      {showSimulation && (
        <Card style={styles.reviewCard}>
          <AppText variant="subheading">
            {canResume ? "Simulado em andamento" : "Simulado de revisão"}
          </AppText>
          {[...subjects].map(([subject, count]) => (
            <AppText key={subject} variant="body">
              {subject} · {count} {count === 1 ? "questão" : "questões"}
            </AppText>
          ))}
          {overdue > 0 && <AppText variant="caption">{overdue} com revisão em atraso</AppText>}
          {selectedDate > today && (
            <AppText variant="caption">Disponível em {formatShortDate(selectedDate)}.</AppText>
          )}
          {selectedWeekDay.isToday && (
            <Button
              label={canResume ? "Continuar simulado" : "Iniciar simulado"}
              disabled={busy}
              icon="arrow"
              onPress={async () => {
                if (await startSimulation()) router.push("/questions");
              }}
            />
          )}
        </Card>
      )}
      {selectedWeekDay.isToday && blocks.length > 0 && !showSimulation && !nextDate && (
        <AppText variant="caption">
          Ao concluir um bloco, a revisão do conteúdo estudado entra no calendário quando há questões disponíveis.
        </AppText>
      )}
      {blocks.length > 0 && (
        <Card>
          <StudyBlockList blocks={blocks} completedIds={completedIds} onToggle={toggleBlock} />
        </Card>
      )}
      {!blocks.length && !showSimulation && (
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
