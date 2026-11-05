import { Icon } from "../common/Icon";
import { Modal } from "../common/Modal";

interface NotificationsModalProps {
  pendingReviews: number;
  pendingBlocks: number;
  onClose: () => void;
  onStartReview: () => void;
}

export function NotificationsModal({
  pendingReviews,
  pendingBlocks,
  onClose,
  onStartReview,
}: NotificationsModalProps) {
  return (
    <Modal onClose={onClose}>
      <span className="subject-icon orange">
        <Icon name="bell" size={23} />
      </span>
      <h2 id="modal-title">Um lembrete para evoluir</h2>
      <p>
        Você tem {pendingReviews} questões aguardando revisão e {pendingBlocks} blocos de estudo
        pendentes hoje.
      </p>
      <div className="purple-info">
        <Icon name="spark" size={20} />
        Revisar no momento certo ajuda a transformar conteúdo em memória de longo prazo.
      </div>
      <button className="primary-button" onClick={onStartReview}>
        Começar revisão <Icon name="arrow" size={17} />
      </button>
    </Modal>
  );
}
