import type { ThemePerformanceRow } from "@/interfaces";
import { getPriorityColor } from "@/services/statsService";
import { Icon } from "../common/Icon";
import { SmartPill } from "../common/SmartPill";

interface ThemePerformanceTableProps {
  rows: ThemePerformanceRow[];
}

/** Desempenho em questões por tema (RF14). */
export function ThemePerformanceTable({ rows }: ThemePerformanceTableProps) {
  return (
    <section className="panel performance-panel">
      <div className="section-heading">
        <div>
          <h2>Um olhar para cada tema</h2>
          <p>O SRS prioriza os conteúdos que precisam de mais atenção.</p>
        </div>
        <SmartPill iconSize={14}>Priorização inteligente</SmartPill>
      </div>
      <div className="performance-table">
        <div className="table-head">
          <span>CONTEÚDO</span>
          <span>ACERTOS / ERROS</span>
          <span>APROVEITAMENTO</span>
          <span>PRIORIDADE SRS</span>
        </div>
        {rows.map((row) => (
          <div className="table-row" key={row.title}>
            <span className="table-theme">
              <span className={`subject-icon ${row.color}`}>
                <Icon name={row.icon} size={18} />
              </span>
              <strong>{row.title}</strong>
            </span>
            <span className="hit-miss">
              <b>{row.hits}</b>
              <span>/</span>
              {row.errors}
            </span>
            <span className="table-progress">
              <span>
                <i style={{ width: `${row.percent}%` }} />
              </span>
              <strong>{row.percent}%</strong>
            </span>
            <span>
              <span className={`badge ${getPriorityColor(row.priority)}`}>
                {row.priority === "Alta" && <Icon name="spark" size={12} />}
                {row.priority}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
