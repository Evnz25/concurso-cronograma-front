import type { Exam } from "@/interfaces";
import { formatCurrency, formatShortDate } from "@/services/formatService";
import { getTrackById } from "@/services/trackService";
import { Icon } from "../common/Icon";

interface ExamCardProps {
  exam: Exam;
  onSelect: (examId: string) => void;
}

export function ExamCard({ exam, onSelect }: ExamCardProps) {
  const track = getTrackById(exam.trackId);
  return (
    <button className="exam-card" onClick={() => onSelect(exam.id)}>
      <span className={`org-logo ${exam.color}`}>
        {exam.org === "BB" ? <span className="bb-symbol">≋</span> : exam.org}
      </span>
      <span className="exam-info">
        <span className="exam-title">
          {exam.name}
          <span className="badge green">Inscrições abertas</span>
        </span>
        <span className="exam-job">{exam.job}</span>
        <span className="exam-details">
          <span>
            <Icon name="pin" size={13} />
            {exam.place}
          </span>
          <span>
            <Icon name={track.icon} size={13} />
            {track.shortName}
          </span>
        </span>
      </span>
      <span className="exam-right">
        <strong>{formatCurrency(exam.salary)}</strong>
        <small>até {formatShortDate(exam.registrationDeadline)}</small>
      </span>
      <Icon name="chevron" size={17} />
    </button>
  );
}
