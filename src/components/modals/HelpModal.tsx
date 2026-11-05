import { Icon } from "../common/Icon";
import { Modal } from "../common/Modal";

export function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <span className="subject-icon purple">
        <Icon name="help" size={24} />
      </span>
      <h2 id="modal-title">Seu guia para a aprovação</h2>
      <div className="help-items">
        <h3>1. Escolha sua trilha</h3>
        <p>No perfil, selecione uma das cinco áreas de TI.</p>
        <h3>2. Siga o seu ciclo</h3>
        <p>Conclua os blocos diários e respeite as pausas.</p>
        <h3>3. Responda e avalie</h3>
        <p>
          Na revisão, avalie cada questão como Fácil, Médio ou Difícil para definir o próximo
          intervalo.
        </p>
      </div>
      <button className="primary-button" onClick={onClose}>
        Entendi, vamos lá <Icon name="check" size={17} />
      </button>
    </Modal>
  );
}
