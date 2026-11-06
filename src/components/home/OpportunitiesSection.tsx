import type { Exam, ExamFilter } from "@/interfaces";
import { Icon } from "../common/Icon";
import { ExamCard } from "./ExamCard";

interface OpportunitiesSectionProps {
  exams: Exam[];
  filter: ExamFilter;
  showEmptyState: boolean;
  onFilterChange: (filter: ExamFilter) => void;
  onSelectExam: (examId: string) => void;
}

export function OpportunitiesSection({
  exams,
  filter,
  showEmptyState,
  onFilterChange,
  onSelectExam,
}: OpportunitiesSectionProps) {
  return (
    <section className="opportunities-section">
      <div className="section-heading">
        <div>
          <h2>
            Oportunidades para o seu futuro <span className="little-dot" />
          </h2>
        </div>
        <select
          aria-label="Filtrar concursos"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value as ExamFilter)}
        >
          <option value="all">Todos os editais</option>
          <option value="mine">Minha trilha</option>
          <option value="salary">Maior salário</option>
        </select>
      </div>
      <div className="exam-list">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} onSelect={onSelectExam} />
        ))}
        {showEmptyState && (
          <div className="empty-state">
            <Icon name="briefcase" size={28} />
            <h3>Novas oportunidades em breve</h3>
            <p>Nenhum edital desta trilha na nossa seleção demonstrativa.</p>
            <button
              className="text-button"
              onClick={() => onFilterChange("all")}
            >
              Ver todos os editais <Icon name="arrow" size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
