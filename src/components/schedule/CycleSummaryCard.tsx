import { Icon } from "../common/Icon";
import { SummaryRow } from "../common/SummaryRow";

interface CycleSummaryCardProps {
  maxHoursPerSubject: number;
  breakMinutes: number;
  nextReviewLabel: string;
}

export function CycleSummaryCard({
  maxHoursPerSubject,
  breakMinutes,
  nextReviewLabel,
}: CycleSummaryCardProps) {
  return (
    <section className="panel cycle-summary">
      <span className="subject-icon purple">
        <Icon name="spark" size={24} />
      </span>
      <h2>Inteligência a seu favor</h2>
      <p>
        Estude menos no automático.
        <br />
        Aprenda mais de verdade.
      </p>
      <SummaryRow label="Tempo máximo por matéria" value={`${maxHoursPerSubject} horas`} />
      <SummaryRow label="Pausa entre sessões" value={`${breakMinutes} min`} />
      <SummaryRow label="Próxima revisão SRS" value={nextReviewLabel} />
      <div className="purple-info">
        <Icon name="target" size={18} /> Priorizamos os temas que você precisa reforçar, sem deixar
        os outros para trás.
      </div>
    </section>
  );
}
