import { Icon } from "../common/Icon";
import { Modal } from "../common/Modal";

interface ConfirmActionModalProps {
  variant: "reset" | "delete";
  onClose: () => void;
  onConfirm: () => void;
}

const CONTENT = {
  reset: {
    icon: "calendar",
    color: "purple",
    title: "Um novo começo?",
    description:
      "Seus blocos concluídos, respostas e intervalos de revisão serão reiniciados. Seu perfil e sua trilha serão mantidos.",
    confirmLabel: "Iniciar novo ciclo",
  },
  delete: {
    icon: "user",
    color: "orange",
    title: "Excluir seu perfil?",
    description:
      "Os dados do perfil e o progresso desta demonstração serão limpos. Esta ação não pode ser desfeita.",
    confirmLabel: "Sim, excluir perfil",
  },
} as const;

/** Modal de dupla checagem para novo ciclo (RF08) e exclusão de conta (RF04). */
export function ConfirmActionModal({ variant, onClose, onConfirm }: ConfirmActionModalProps) {
  const content = CONTENT[variant];
  return (
    <Modal onClose={onClose}>
      <span className={`subject-icon ${content.color}`}>
        <Icon name={content.icon} size={24} />
      </span>
      <h2 id="modal-title">{content.title}</h2>
      <p>{content.description}</p>
      <div className="modal-actions">
        <button className="secondary-button" onClick={onClose}>
          Cancelar
        </button>
        <button
          className={`primary-button ${variant === "delete" ? "danger-button" : ""}`}
          onClick={onConfirm}
        >
          {content.confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
