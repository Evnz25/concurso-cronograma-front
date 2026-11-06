import { useRouter } from "expo-router";
import { PageHeading } from "@/components/common/PageHeading";
import { ScreenContainer } from "@/components/common/ScreenContainer";
import { SmartPill } from "@/components/common/SmartPill";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { useApp } from "@/context/AppContext";
import { isLastQuestion } from "@/services/questionService";

export function QuestionsView() {
  const router = useRouter();
  const { questions, session, selectOption, confirmAnswer, rateQuestion, goToNextQuestion } =
    useApp();

  const question = questions[session.index];

  const handleNext = () => {
    const isFinished = goToNextQuestion();
    if (isFinished) {
      router.push("/stats" as any);
    }
  };

  return (
    <ScreenContainer>
      <PageHeading
        eyebrow="PRÁTICA"
        title="Uma questão. Mais conhecimento"
        aside={<SmartPill>Revisão espaçada</SmartPill>}
      />

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
    </ScreenContainer>
  );
}
