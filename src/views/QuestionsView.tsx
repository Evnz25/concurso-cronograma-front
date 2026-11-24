import { AppText } from "@/components/common/AppText";
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
  } = useApp();

  const question = questions[session.index];

  const handleNext = async () => {
    const isFinished = await goToNextQuestion();
    if (isFinished) {
      router.push(isReviewSession ? "/study" : "/stats");
    }
  };

  return (
    <ScreenContainer>
      <PageHeading
        eyebrow="PRÁTICA"
        title={isReviewSession ? "Revisões de hoje" : "Uma questão. Mais conhecimento"}
        aside={<SmartPill>Revisão espaçada</SmartPill>}
      />

      {question ? (
        <QuestionCard
          question={question}
          position={session.index + 1}
          total={questions.length}
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
