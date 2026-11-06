import { Pressable, StyleSheet, View } from "react-native";
import type { Track, TrackId } from "@/interfaces";
import { colors, radius, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { ToneIcon } from "../common/ToneIcon";

interface TrackSelectorProps {
  tracks: Track[];
  selectedId: TrackId;
  onSelect: (trackId: TrackId) => void;
}

export function TrackSelector({ tracks, selectedId, onSelect }: TrackSelectorProps) {
  return (
    <View style={styles.container}>
      <AppText variant="heading" style={styles.title}>
        Qual é sua trilha?
      </AppText>
      <View style={styles.optionsList}>
        {tracks.map((track) => {
          const isSelected = track.id === selectedId;
          return (
            <Pressable
              key={track.id}
              onPress={() => onSelect(track.id)}
              style={({ pressed }) => [
                styles.option,
                isSelected && styles.optionSelected,
                pressed && styles.pressed,
              ]}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
            >
              <ToneIcon name={track.icon} tone="purple" size={38} iconSize={20} />
              <View style={styles.copy}>
                <AppText variant="subheading" style={styles.name}>
                  {track.name}
                </AppText>
                <AppText variant="caption">{track.detail}</AppText>
              </View>
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected && <View style={styles.radioDot} />}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  title: {
    fontSize: 16,
  },
  optionsList: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#ece3f3",
    borderRadius: radius.md,
  },
  optionSelected: {
    borderColor: "#b99bdc",
    backgroundColor: "#faf6ff",
  },
  pressed: {
    opacity: 0.8,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 14,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
