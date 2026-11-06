import { Pressable, StyleSheet, View } from "react-native";
import type { Difficulty } from "@/interfaces";
import { DIFFICULTY_OPTIONS } from "@/services/questionService";
import { colors, fonts, radius, shadows, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Icon } from "../common/Icon";

interface DifficultyRatingProps {
  rating: Difficulty | null;
  onRate: (difficulty: Difficulty) => void;
}

export function DifficultyRating({ rating, onRate }: DifficultyRatingProps) {
  return (
    <View style={styles.container}>
      <AppText variant="heading" style={styles.heading}>
        Como foi resolver esta questão?
      </AppText>
      <AppText variant="caption">Sua avaliação define quando vamos revisá-la novamente.</AppText>

      <View style={styles.buttonsRow}>
        {DIFFICULTY_OPTIONS.map((option) => {
          const isSelected = rating === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onRate(option.value)}
              style={({ pressed }) => [
                styles.btn,
                isSelected && styles.btnSelected,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Icon
                name={option.icon}
                size={22}
                color={isSelected ? colors.primary : colors.muted}
              />
              <AppText
                variant="subheading"
                style={[styles.label, isSelected && styles.labelSelected]}
              >
                {option.label}
              </AppText>
              <AppText
                variant="caption"
                style={[styles.reviewLabel, isSelected && styles.reviewLabelSelected]}
              >
                {option.reviewLabel}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
    gap: spacing.xs,
  },
  heading: {
    fontSize: 15,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  btn: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    alignItems: "center",
    gap: 4,
    ...shadows.card,
  },
  btnSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  label: {
    fontSize: 13,
  },
  labelSelected: {
    color: colors.primary,
  },
  reviewLabel: {
    fontSize: 10,
    textAlign: "center",
  },
  reviewLabelSelected: {
    color: colors.primaryText,
  },
  pressed: {
    opacity: 0.8,
  },
});
