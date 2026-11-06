import { StyleSheet, View } from "react-native";
import type { ColorTone, IconName } from "@/interfaces";
import { tones } from "@/theme";
import { Icon } from "./Icon";

interface ToneIconProps {
  name: IconName;
  tone?: ColorTone;
  size?: number;
  iconSize?: number;
}

/** Ícone dentro de um quadrado colorido (classes .subject-icon / .metric-icon do web). */
export function ToneIcon({ name, tone = "purple", size = 40, iconSize = 20 }: ToneIconProps) {
  const { bg, fg } = tones[tone];
  return (
    <View
      style={[
        styles.box,
        { width: size, height: size, backgroundColor: bg, borderRadius: size * 0.25 },
      ]}
    >
      <Icon name={name} size={iconSize} color={fg} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: "center", justifyContent: "center" },
});
