import { Pressable, StyleSheet, View } from "react-native";
import type { Difficulty, Question } from "@/interfaces";
import { getOptionLetter, isCorrectAnswer } from "@/services/questionService";
import { colors, fonts, radius, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Icon } from "../common/Icon";
import { ProgressBar } from "../common/ProgressBar";
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
  const progressPercent = (position / total) * 100;

  return (
    <Card style={styles.card}>
      {/* Top Header */}
      <View style={styles.topRow}>
        <Badge tone="purple">{question.theme}</Badge>
        <AppText variant="caption">
          Questão {position} de {total}
        </AppText>
      </View>

      <ProgressBar percent={progressPercent} height={4} />

      {/* Source */}
      <View style={styles.sourceRow}>
        <Icon name="book" size={14} color={colors.muted} />
        <AppText variant="caption" style={styles.sourceText} numberOfLines={1}>
          {question.source} · {question.topic}
        </AppText>
      </View>

      {/* Question Text */}
      <AppText variant="subheading" style={styles.questionText}>
        {question.text}
      </AppText>

      {/* Options */}
      <View style={styles.optionsList}>
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = revealed && index === question.correctIndex;
          const isWrong = revealed && isSelected && index !== question.correctIndex;

          return (
            <Pressable
              key={option}
              disabled={revealed}
              onPress={() => onSelectOption(index)}
              style={({ pressed }) => [
                styles.optionBtn,
                isSelected && styles.optionSelected,
                isCorrect && styles.optionCorrect,
                isWrong && styles.optionWrong,
                pressed && !revealed && styles.pressed,
              ]}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
            >
              <View
                style={[
                  styles.letterBox,
                  isSelected && styles.letterBoxSelected,
                  isCorrect && styles.letterBoxCorrect,
                  isWrong && styles.letterBoxWrong,
                ]}
              >
                <AppText
                  style={[
                    styles.letterText,
                    isSelected && styles.letterTextSelected,
                    isCorrect && styles.letterTextCorrect,
                    isWrong && styles.letterTextWrong,
                  ]}
                >
                  {getOptionLetter(index)}
                </AppText>
              </View>

              <AppText
                variant="body"
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                  isCorrect && styles.optionTextCorrect,
                  isWrong && styles.optionTextWrong,
                ]}
              >
                {option}
              </AppText>

              {isCorrect && <Icon name="check" size={18} color={colors.success} />}
            </Pressable>
          );
        })}
      </View>

      {/* Action / Feedback */}
      {!revealed ? (
        <View style={styles.bottomBar}>
          <Button
            label="Confirmar resposta"
            icon="arrow"
            disabled={selectedOption === null}
            onPress={onConfirm}
            fullWidth
          />
        </View>
      ) : (
        <View style={styles.feedbackContainer}>
          <View style={[styles.explanation, correct ? styles.expSuccess : styles.expNeutral]}>
            <View style={styles.expHeader}>
              <Icon
                name={correct ? "check" : "book"}
                size={18}
                color={correct ? colors.success : "#b39670"}
              />
              <AppText variant="bodyStrong" style={{ color: correct ? colors.success : "#b39670" }}>
                {correct ? "Muito bem! Você acertou." : "Mais uma oportunidade de aprender."}
              </AppText>
            </View>
            <AppText variant="body" style={styles.expText}>
              {question.explanation}
            </AppText>
          </View>

          <DifficultyRating rating={rating} onRate={onRate} />

          <Button
            label={isLast ? "Concluir sessão" : "Próxima questão"}
            icon="arrow"
            disabled={!rating}
            onPress={onNext}
            fullWidth
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sourceText: {
    flex: 1,
  },
  questionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  optionsList: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#eae3f1",
    borderRadius: radius.md,
  },
  optionSelected: {
    backgroundColor: "#f7f1ff",
    borderColor: "#b395d8",
  },
  optionCorrect: {
    backgroundColor: "#f0f8f2",
    borderColor: "#a5c7ad",
  },
  optionWrong: {
    backgroundColor: "#fcf1ef",
    borderColor: "#e0b6ae",
  },
  pressed: {
    opacity: 0.8,
  },
  letterBox: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    backgroundColor: "#faf7fd",
    borderWidth: 1,
    borderColor: "#e9e1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  letterBoxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  letterBoxCorrect: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  letterBoxWrong: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  letterText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.accent,
  },
  letterTextSelected: {
    color: colors.white,
  },
  letterTextCorrect: {
    color: colors.white,
  },
  letterTextWrong: {
    color: colors.white,
  },
  optionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  optionTextSelected: {
    color: colors.text,
  },
  optionTextCorrect: {
    color: colors.text,
  },
  optionTextWrong: {
    color: colors.text,
  },
  bottomBar: {
    marginTop: spacing.sm,
  },
  feedbackContainer: {
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  explanation: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
  },
  expSuccess: {
    backgroundColor: "#f1f8f2",
    borderColor: "#deecdf",
  },
  expNeutral: {
    backgroundColor: "#fcf7f0",
    borderColor: "#ede3d6",
  },
  expHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  expText: {
    fontSize: 13,
    lineHeight: 19,
  },
});
