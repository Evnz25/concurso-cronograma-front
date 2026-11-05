import type { Difficulty, Question } from "@/interfaces";
import { getOptionLetter, isCorrectAnswer } from "@/services/questionService";
import { Icon } from "../common/Icon";
import { DifficultyRating } from "./DifficultyRating";

interface QuestionCardProps {
  question: Question;
  position: number;
  total: number;
  selectedOption: number | null;
  revealed: boolean;
  rating: Difficulty | null;
  isLast: boolean;
  onSelectOption: (index: number) => void;
  onConfirm: () => void;
  onRate: (difficulty: Difficulty) => void;
  onNext: () => void;
}

export function QuestionCard({
  question,
  position,
  total,
  selectedOption,
  revealed,
  rating,
  isLast,
  onSelectOption,
  onConfirm,
  onRate,
  onNext,
}: QuestionCardProps) {
  const correct = isCorrectAnswer(question, selectedOption);

  const answerClass = (index: number) =>
    [
      "answer",
      selectedOption === index && "selected",
      revealed && index === question.correctIndex && "correct",
      revealed && selectedOption === index && index !== question.correctIndex && "incorrect",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <section className="panel question-panel">
      <div className="question-top">
        <span className="badge purple">{question.theme}</span>
        <span className="muted">
          Questão {position} de {total}
        </span>
      </div>
      <div className="question-progress">
        <span style={{ width: `${(position / total) * 100}%` }} />
      </div>
      <div className="question-source">
        <Icon name="book" size={16} />
        {question.source}
        <span>·</span>
        {question.topic}
      </div>
      <h2 className="question-text">{question.text}</h2>
      <div className="answers">
        {question.options.map((option, index) => (
          <button
            key={option}
            disabled={revealed}
            className={answerClass(index)}
            onClick={() => onSelectOption(index)}
          >
            <span className="answer-letter">{getOptionLetter(index)}</span>
            <span>{option}</span>
            {revealed && index === question.correctIndex && <Icon name="check" size={20} />}
          </button>
        ))}
      </div>
      {!revealed ? (
        <div className="question-bottom">
          <span>
            <Icon name="shield" size={15} />
            Aqui, errar também é aprender.
          </span>
          <button className="primary-button" disabled={selectedOption === null} onClick={onConfirm}>
            Confirmar resposta <Icon name="arrow" size={17} />
          </button>
        </div>
      ) : (
        <div className="answer-feedback">
          <div className={`explanation ${correct ? "success" : ""}`}>
            <strong>
              <Icon name={correct ? "check" : "book"} size={19} />
              {correct ? "Muito bem! Você acertou." : "Mais uma oportunidade de aprender."}
            </strong>
            <p>{question.explanation}</p>
          </div>
          <DifficultyRating rating={rating} onRate={onRate} />
          <button className="primary-button next-question" disabled={!rating} onClick={onNext}>
            {isLast ? "Concluir sessão" : "Próxima questão"}
            <Icon name="arrow" size={17} />
          </button>
        </div>
      )}
    </section>
  );
}
