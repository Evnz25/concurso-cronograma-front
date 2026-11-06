import { StyleSheet, View } from "react-native";
import { colors, radius } from "@/theme";

interface ProgressBarProps {
  percent: number;
  color?: string;
  trackColor?: string;
  height?: number;
}

export function ProgressBar({
  percent,
  color = colors.ringFill,
  trackColor = colors.ringTrack,
  height = 6,
}: ProgressBarProps) {
  const width = `${Math.max(0, Math.min(100, percent))}%` as const;
  return (
    <View style={[styles.track, { backgroundColor: trackColor, height }]}>
      <View style={[styles.fill, { width, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { borderRadius: radius.pill, overflow: "hidden", alignSelf: "stretch" },
  fill: { height: "100%", borderRadius: radius.pill },
});
