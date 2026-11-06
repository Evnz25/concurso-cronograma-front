import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import type { ColorTone, IconName } from "@/interfaces";
import { fonts, tones } from "@/theme";
import { AppText } from "./AppText";
import { Icon } from "./Icon";

interface BadgeProps {
  tone?: ColorTone;
  icon?: IconName;
  children: ReactNode;
}

export function Badge({ tone = "neutral", icon, children }: BadgeProps) {
  const { bg, fg } = tones[tone];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      {icon && <Icon name={icon} size={11} color={fg} />}
      <AppText style={[styles.text, { color: fg }]}>{children}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  text: { fontFamily: fonts.medium, fontSize: 11, lineHeight: 14 },
});
