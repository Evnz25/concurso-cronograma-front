import type { AnswerRecord, Difficulty, Question, QuestionSession } from "@/interfaces";
import { PageHeading } from "@/components/common/PageHeading";
import { SmartPill } from "@/components/common/SmartPill";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { SessionSummaryCard } from "@/components/questions/SessionSummaryCard";
import { isLastQuestion } from "@/services/questionService";

interface QuestionsViewProps {
  questions: Question[];
  session: QuestionSession;
  answers: AnswerRecord[];
  onSelectOption: (index: number) => void;
  onConfirm: () => void;
  onRate: (difficulty: Difficulty) => void;
  onNext: () => void;
}

/** Resolução de questões por tema com avaliação de dificuldade (RF07, RF09). */
export function QuestionsView({
  questions,
  session,
  answers,
  onSelectOption,
  onConfirm,
  onRate,
  onNext,
}: QuestionsViewProps) {
  const question = questions[session.index];

  return (
    <>
      <PageHeading
        eyebrow="PRÁTICA QUE FIXA"
        title="Uma questão. Mais conhecimento"
        description="Pratique, entenda seus erros e fortaleça sua memória."
        aside={<SmartPill>Revisão espaçada</SmartPill>}
      />
      <div className="question-layout">
        <QuestionCard
          question={question}
          position={session.index + 1}
          total={questions.length}
          selectedOption={session.selectedOption}
          revealed={session.revealed}
          rating={session.rating}
          isLast={isLastQuestion(session, questions.length)}
          onSelectOption={onSelectOption}
          onConfirm={onConfirm}
          onRate={onRate}
          onNext={onNext}
        />
        <aside>
          <SessionSummaryCard
            answered={answers.length}
            correct={answers.filter((answer) => answer.correct).length}
          />
        </aside>
      </div>
    </>
  );
}
