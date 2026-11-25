import { StyleSheet, View } from "react-native";
import type { SimulationSummary } from "@/interfaces/Api";
import { formatShortDate } from "@/services/formatService";
import { spacing } from "@/theme";
import { AppText } from "../common/AppText";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";

function weightChange(previous: number, current: number) {
  // Aumenta a precisão quando duas casas decimais esconderiam a mudança.
  for (const digits of [2, 4, 6, 10]) {
    const format = (value: number) => value.toLocaleString("pt-BR", { maximumFractionDigits: digits });
    if (format(previous) !== format(current)) {
      return `${current > previous ? "Aumentou" : "Diminuiu"} de ${format(previous)} para ${format(current)}`;
    }
  }
  return `Permaneceu em ${current.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}`;
}

export function SimulationResultModal({ title, summary, subjects, onClose }: {
  title: string;
  summary: SimulationSummary | null;
  subjects: { _id: string; nome: string }[];
  onClose: () => void;
}) {
  const names = new Map(subjects.map(s => [s._id, s.nome]));
  const blocksByDay = new Map<string, SimulationSummary["blocos"]>();
  for (const block of summary?.blocos ?? []) {
    if (!blocksByDay.has(block.data)) blocksByDay.set(block.data, []);
    blocksByDay.get(block.data)!.push(block);
  }
  return (
    <Modal onClose={onClose}>
      <View style={styles.content}>
        <AppText variant="heading" accessibilityRole="header">{title}</AppText>
        {summary ? (
          <>
            <AppText variant="subheading" accessibilityRole="header">Pesos por matéria</AppText>
            {summary.pesos.map(p => (
              <View key={p.materia_id}>
                <AppText variant="bodyStrong">{names.get(p.materia_id) ?? p.materia_id}</AppText>
                <AppText>{weightChange(p.anterior, p.atual)}</AppText>
              </View>
            ))}
            <AppText variant="subheading" accessibilityRole="header">Blocos alterados nesta semana</AppText>
            {summary.blocos.length === 0 && <AppText>Os blocos restantes continuam como estavam.</AppText>}
            {[...blocksByDay].map(([day, blocks]) => (
              <View key={day} style={styles.day}>
                <AppText variant="bodyStrong">{formatShortDate(day)}</AppText>
                {blocks.map(b => (
                  <AppText key={b.posicao}>
                    {b.posicao}º bloco · {names.get(b.anterior) ?? b.anterior} → {names.get(b.atual) ?? b.atual}
                  </AppText>
                ))}
              </View>
            ))}
          </>
        ) : <AppText>O comparativo deste simulado está indisponível.</AppText>}
        <Button label="Ver cronograma" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.md },
  day: { gap: spacing.xs },
});
