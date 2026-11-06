import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { colors, spacing } from "@/theme";
import { AppText } from "./AppText";

interface PageHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  aside?: ReactNode;
}

export function PageHeading({ eyebrow, title, description, aside }: PageHeadingProps) {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {!!eyebrow && (
          <AppText variant="eyebrow" style={styles.eyebrow}>
            {eyebrow}
          </AppText>
        )}
        <AppText variant="title">
          {title}
          <AppText variant="title" color={colors.primaryText}>
            .
          </AppText>
        </AppText>
        {!!description && (
          <AppText variant="body" style={styles.description}>
            {description}
          </AppText>
        )}
      </View>
      {aside && <View style={styles.aside}>{aside}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  main: {
    flex: 1,
  },
  eyebrow: {
    marginBottom: spacing.xs,
  },
  description: {
    marginTop: spacing.xs,
  },
  aside: {
    marginLeft: spacing.sm,
  },
});
