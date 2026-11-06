import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "@/theme";
import { AppText } from "./AppText";

interface SummaryRowProps {
  label: ReactNode;
  value: ReactNode;
}

export function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <View style={styles.row}>
      {typeof label === "string" ? <AppText variant="body">{label}</AppText> : label}
      {typeof value === "string" || typeof value === "number" ? (
        <AppText variant="bodyStrong">{value}</AppText>
      ) : (
        value
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.xs + 2,
  },
});
