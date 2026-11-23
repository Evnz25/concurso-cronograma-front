import { Pressable, StyleSheet, View } from "react-native";
import type { Track } from "@/interfaces";
import { colors, radius, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Card } from "../common/Card";
import { Icon } from "../common/Icon";
import { ToneIcon } from "../common/ToneIcon";
import { ProgressBar } from "../common/ProgressBar";
import { Button } from "../common/Button";

interface TrackCardProps {
  track: Track;
  progressPercent: number;
  onEdit: () => void;
  onExplore?: () => void;
}

export function TrackCard({ track, progressPercent, onEdit, onExplore }: TrackCardProps) {
  return (
    <Card>
      <View style={styles.header}>
        <AppText variant="heading">Sua trilha</AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Editar trilha"
          onPress={onEdit}
          style={({ pressed }) => [styles.editBtn, pressed && styles.pressed]}
        >
          <Icon name="settings" size={17} color={colors.accent} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <ToneIcon name={track.icon} tone="purple" size={44} iconSize={22} />
        <View style={styles.textWrap}>
          <AppText variant="subheading">{track.name}</AppText>
          <AppText variant="caption">{track.detail}</AppText>
        </View>
      </View>
      <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
        <AppText variant="caption">{Math.round(progressPercent)}% do cronograma concluído</AppText>
        <ProgressBar percent={progressPercent} />
        {onExplore && <Button label="Ver desempenho" variant="text" onPress={onExplore} />}
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
  editBtn: {
    padding: spacing.xs,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  pressed: {
    opacity: 0.7,
  },
});
