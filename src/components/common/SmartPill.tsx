import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { colors, fonts, radius } from "@/theme";
import { AppText } from "./AppText";
import { Icon } from "./Icon";

export function SmartPill({ children, iconSize = 14 }: { children: ReactNode; iconSize?: number }) {
  return (
    <View style={styles.pill}>
      <Icon name="spark" size={iconSize} color={colors.accent} />
      <AppText style={styles.text}>{children}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    borderRadius: radius.md,
    alignSelf: "flex-start",
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.accent,
  },
});
