import { StyleSheet, View } from "react-native";
import type { DayPlan } from "@/interfaces";
import { colors, spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { ToneIcon } from "../common/ToneIcon";

interface DayOverviewProps {
  plan: DayPlan;
  onBackToToday: () => void;
}

export function DayOverview({ plan, onBackToToday }: DayOverviewProps) {
  const isRest = plan.status === "rest";

  return (
    <Card style={styles.card}>
      <ToneIcon
        name={isRest ? "coffee" : "calendar"}
        tone={isRest ? "orange" : "purple"}
        size={52}
        iconSize={26}
      />

      <AppText variant="heading" style={styles.title}>
        {plan.emptyTitle}
      </AppText>

      <AppText variant="body" style={styles.description}>
        {plan.emptyDescription}
      </AppText>

      {plan.extraInfo && (
        <AppText variant="caption" style={styles.extra}>
          {plan.extraInfo}
        </AppText>
      )}

      <Button variant="text" label="Voltar para hoje" icon="arrow" onPress={onBackToToday} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  title: {
    textAlign: "center",
    marginTop: spacing.xs,
  },
  description: {
    textAlign: "center",
    maxWidth: "90%",
  },
  extra: {
    textAlign: "center",
    color: colors.primaryText,
  },
});
