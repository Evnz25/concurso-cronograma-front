import { Icon } from "../common/Icon";
import { SummaryRow } from "../common/SummaryRow";

interface SessionSummaryCardProps {
  answered: number;
  correct: number;
}

export function SessionSummaryCard({ answered, correct }: SessionSummaryCardProps) {
  return (
    <section className="panel session-card">
      <span className="subject-icon purple">
        <Icon name="target" size={24} />
      </span>
      <h2>Sua sessão de revisão</h2>
      <p>
        Conhecimento que fica.
        <br />
        Confiança que cresce.
      </p>
      <SummaryRow label="Questões respondidas" value={answered} />
      <SummaryRow label="Respostas corretas" value={correct} />
      <div className="purple-info">
        <Icon name="spark" size={20} /> Seu próximo ciclo se ajusta à dificuldade de cada questão.
      </div>
    </section>
  );
}
