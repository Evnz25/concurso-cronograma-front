import { Pressable, StyleSheet, View } from "react-native";
import type { WeekDay } from "@/interfaces";
import { colors, fonts, radius, shadows, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Card } from "../common/Card";
import { Icon } from "../common/Icon";

interface WeekCalendarProps {
  monthLabel: string;
  weekNumber: number;
  days: WeekDay[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onMoveWeek: (direction: number) => void;
}

export function WeekCalendar({
  monthLabel,
  weekNumber,
  days,
  selectedDate,
  onSelectDate,
  onMoveWeek,
}: WeekCalendarProps) {
  return (
    <Card>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Semana anterior"
          hitSlop={8}
          onPress={() => onMoveWeek(-1)}
          style={styles.previous}
        >
          <Icon name="chevron" size={20} color={colors.primary} />
        </Pressable>
        <View style={styles.month}>
          <AppText variant="heading">{monthLabel}</AppText>
          <AppText variant="caption">Semana {weekNumber}</AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Próxima semana"
          hitSlop={8}
          onPress={() => onMoveWeek(1)}
        >
          <Icon name="chevron" size={20} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.daysRow}>
        {days.map((day) => {
          const selected = selectedDate === day.date;
          return (
            <Pressable
              key={day.label}
              onPress={() => onSelectDate(day.date)}
              style={({ pressed }) => [
                styles.dayButton,
                selected && styles.daySelected,
                day.isPast && !selected && styles.dayPast,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`${day.label}, ${day.day}${day.hasStudy ? ", com estudo agendado" : ""}`}
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
  month: { alignItems: "center" },
  previous: { transform: [{ rotate: "180deg" }] },
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
