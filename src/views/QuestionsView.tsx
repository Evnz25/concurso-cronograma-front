import { AppText } from "@/components/common/AppText";
import { Button } from "@/components/common/Button";
import { useRouter } from "expo-router";
import { PageHeading } from "@/components/common/PageHeading";
import { ScreenContainer } from "@/components/common/ScreenContainer";
import { SmartPill } from "@/components/common/SmartPill";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { useApp } from "@/context/AppContext";
import { isLastQuestion } from "@/services/questionService";

export function QuestionsView() {
  const router = useRouter();
  const {
    questions,
    session,
    selectOption,
    confirmAnswer,
    rateQuestion,
    goToNextQuestion,
    isReviewSession,
    simulation, finishPendingSimulation, busy, activeSchedule,
  } = useApp();

  const question = questions[session.index];

  const handleNext = async () => {
    const isFinished = await goToNextQuestion();
    if (isFinished) {
      router.push(isReviewSession || simulation || activeSchedule ? "/study" : "/stats");
    }
  };

  return (
    <ScreenContainer>
      <PageHeading
        eyebrow="PRÁTICA"
        title={simulation ? "Simulado da trilha" : isReviewSession ? "Revisões de hoje" : "Prática de questões"}
        aside={<SmartPill>Revisão espaçada</SmartPill>}
      />

      {simulation && !question ? (
        <Button label="Concluir simulado" disabled={busy} onPress={async () => {
          if (await finishPendingSimulation()) router.push("/study");
        }} />
      ) : question ? (
        <QuestionCard
          question={question}
          position={session.index + 1 + (simulation ? simulation.total - questions.length : 0)}
          total={simulation?.total ?? questions.length}
          selectedOption={session.selectedOption}
          revealed={session.revealed}
          rating={session.rating}
          isLast={isLastQuestion(session, questions.length)}
          onSelectOption={selectOption}
          onConfirm={confirmAnswer}
          onRate={rateQuestion}
          onNext={handleNext}
        />
      ) : (
        <AppText>
          Nenhuma questão cadastrada para esta trilha. Escolha outra trilha no perfil ou atualize os
          dados.
        </AppText>
      )}
    </ScreenContainer>
  );
}
