import type { Difficulty } from "@/interfaces";
import { DIFFICULTY_OPTIONS } from "@/services/questionService";
import { Icon } from "../common/Icon";

interface DifficultyRatingProps {
  rating: Difficulty | null;
  onRate: (difficulty: Difficulty) => void;
}

/** Avaliação de dificuldade após responder a questão (RF09). */
export function DifficultyRating({ rating, onRate }: DifficultyRatingProps) {
  return (
    <>
      <h3>Como foi resolver esta questão?</h3>
      <p>Sua avaliação define quando vamos revisá-la novamente.</p>
      <div className="difficulty-buttons">
        {DIFFICULTY_OPTIONS.map((option) => (
          <button
            className={rating === option.value ? "rated" : ""}
            key={option.value}
            onClick={() => onRate(option.value)}
          >
            <Icon name={option.icon} size={20} />
            <strong>{option.label}</strong>
            <small>{option.reviewLabel}</small>
          </button>
        ))}
      </div>
    </>
  );
}
