import { Icon } from "../common/Icon";

interface PendingReviewCardProps {
  pendingCount: number;
  onReview: () => void;
}

/** Alerta de exercícios pendentes (RF10). */
export function PendingReviewCard({ pendingCount, onReview }: PendingReviewCardProps) {
  return (
    <section className="pending-card">
      <div className="pending-top">
        <span className="pending-icon">
          <Icon name="bell" size={20} />
        </span>
        <span className="badge orange">PARA HOJE</span>
      </div>
      <h3>
        Sua memória precisa
        <br />
        de um reforço.
      </h3>
      <p>
        Você tem <strong>{pendingCount} questões</strong> para revisar.
        <br />
        Não deixe o conhecimento escapar!
      </p>
      <button onClick={onReview}>
        Revisar agora <Icon name="arrow" size={17} />
      </button>
    </section>
  );
}
