import type { Exam } from "@/interfaces";
import { formatCurrency, formatShortDate } from "@/services/formatService";
import { Icon } from "../common/Icon";
import { Modal } from "../common/Modal";

interface ExamDetailsModalProps {
  exam: Exam;
  onClose: () => void;
  onPrepare: (exam: Exam) => void;
}

export function ExamDetailsModal({ exam, onClose, onPrepare }: ExamDetailsModalProps) {
  return (
    <Modal onClose={onClose}>
      <span className={`org-logo ${exam.color}`}>{exam.org}</span>
      <h2 id="modal-title">{exam.name}</h2>
      <p>{exam.job}</p>
      <div className="exam-modal-details">
        <div>
          <Icon name="pin" />
          {exam.place}
        </div>
        <div>
          <Icon name="briefcase" />
          {exam.vacancies} vagas
        </div>
        <div>
          <Icon name="calendar" />
          Inscrições até {formatShortDate(exam.registrationDeadline)}
        </div>
      </div>
      <h3 className="exam-salary">
        {formatCurrency(exam.salary)}
        <small>remuneração inicial</small>
      </h3>
      <p>{exam.description}</p>
      <div className="purple-info">
        Edital demonstrativo. Consulte os canais oficiais da instituição para confirmar vagas e
        inscrições.
      </div>
      <button className="primary-button" onClick={() => onPrepare(exam)}>
        Preparar para este concurso <Icon name="arrow" size={17} />
      </button>
    </Modal>
  );
}
