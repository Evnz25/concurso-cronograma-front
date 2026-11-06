import { Pressable, StyleSheet, View } from "react-native";
import type { WeekDay } from "@/interfaces";
import { colors, fonts, radius, shadows, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Card } from "../common/Card";

interface WeekCalendarProps {
  monthLabel: string;
  weekNumber: number;
  days: WeekDay[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export function WeekCalendar({
  monthLabel,
  weekNumber,
  days,
  selectedDay,
  onSelectDay,
}: WeekCalendarProps) {
  return (
    <Card>
      <View style={styles.header}>
        <AppText variant="heading">{monthLabel}</AppText>
        <AppText variant="caption">Semana {weekNumber}</AppText>
      </View>

      <View style={styles.daysRow}>
        {days.map((day) => {
          const selected = selectedDay === day.day;
          return (
            <Pressable
              key={day.label}
              onPress={() => onSelectDay(day.day)}
              style={({ pressed }) => [
                styles.dayButton,
                selected && styles.daySelected,
                day.isPast && !selected && styles.dayPast,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected }}
            >
              <AppText
                style={[
                  styles.dayLabel,
                  selected && styles.textSelected,
                  day.isPast && !selected && styles.textPast,
                ]}
              >
                {day.label}
              </AppText>
              <AppText
                style={[
                  styles.dayNumber,
                  selected && styles.textSelected,
                  day.isPast && !selected && styles.textPast,
                ]}
              >
                {day.day}
              </AppText>
              {day.hasStudy && <View style={[styles.dot, selected && styles.dotSelected]} />}
            </Pressable>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  dayButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: 2,
    borderRadius: radius.md,
    alignItems: "center",
    gap: 3,
  },
  daySelected: {
    backgroundColor: colors.primary,
    ...shadows.selected,
  },
  dayPast: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.8,
  },
  dayLabel: {
    fontFamily: fonts.medium,
    fontSize: 10,
    color: colors.muted,
  },
  dayNumber: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.text,
  },
  textSelected: {
    color: colors.white,
  },
  textPast: {
    color: colors.muted,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 2,
  },
  dotSelected: {
    backgroundColor: colors.white,
  },
});
