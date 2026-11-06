import { Pressable, StyleSheet, View } from "react-native";
import type { StudyBlock } from "@/interfaces";
import { formatDuration } from "@/services/formatService";
import { getBreakBefore } from "@/services/scheduleService";
import { colors, fonts, radius, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Badge } from "../common/Badge";
import { Icon } from "../common/Icon";
import { ToneIcon } from "../common/ToneIcon";

interface StudyBlockListProps {
  blocks: StudyBlock[];
  completedIds: string[];
  onToggle: (blockId: string) => void;
  compact?: boolean;
}

export function StudyBlockList({
  blocks,
  completedIds,
  onToggle,
  compact = false,
}: StudyBlockListProps) {
  return (
    <View style={styles.container}>
      {blocks.map((block, index) => {
        const done = completedIds.includes(block.id);
        const pause = compact ? null : getBreakBefore(blocks, index);
        const duration = formatDuration(block.durationMinutes);

        return (
          <View key={block.id} style={styles.itemWrapper}>
            {pause && (
              <View style={styles.breakLine}>
                <Icon name="coffee" size={14} color="#aaa08d" />
                <AppText style={styles.breakText}>
                  {pause.startTime} – {pause.endTime} · Pausa{" "}
                  <AppText style={styles.breakDuration}>
                    ({formatDuration(pause.durationMinutes)})
                  </AppText>
                </AppText>
              </View>
            )}

            <View style={[styles.block, done && styles.blockDone]}>
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: done }}
                accessibilityLabel={`Concluir ${block.title}`}
                onPress={() => onToggle(block.id)}
                style={[styles.checkbox, done && styles.checkboxChecked]}
              >
                {done && <Icon name="check" size={13} color={colors.white} />}
              </Pressable>

              <ToneIcon name={block.icon} tone={block.color} size={36} iconSize={18} />

              <View style={styles.copy}>
                <AppText
                  variant="subheading"
                  style={[styles.title, done && styles.titleDone]}
                  numberOfLines={1}
                >
                  {block.title}
                </AppText>
                <AppText variant="caption" numberOfLines={1}>
                  {compact ? `${block.startTime} · ${duration}` : block.topic}
                </AppText>
              </View>

              <View style={styles.meta}>
                <Badge tone={done ? "green" : block.color}>{done ? "Concluído" : block.tag}</Badge>
                {!compact && (
                  <AppText variant="caption" style={styles.timeText}>
                    {block.startTime} · {duration}
                  </AppText>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  itemWrapper: {
    gap: spacing.xs,
  },
  breakLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: "#ede8e1",
    borderStyle: "dashed",
  },
  breakText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: "#aaa08d",
  },
  breakDuration: {
    fontFamily: fonts.semibold,
    color: "#8c826f",
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  blockDone: {
    opacity: 0.65,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#ded9e7",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.check,
    borderColor: colors.check,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: colors.muted,
  },
  meta: {
    alignItems: "flex-end",
    gap: 4,
  },
  timeText: {
    fontSize: 11,
  },
});
