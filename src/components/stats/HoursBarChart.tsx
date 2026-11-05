import type { SubjectHours } from "@/interfaces";

interface HoursBarChartProps {
  data: SubjectHours[];
  axis: string[];
  maxHours: number;
  periodLabel: string;
}

/** Horas estudadas por matéria (RF14). */
export function HoursBarChart({ data, axis, maxHours, periodLabel }: HoursBarChartProps) {
  return (
    <section className="panel chart-panel">
      <div className="section-heading">
        <div>
          <h2>Seu tempo bem investido</h2>
          <p>Horas de estudo por conteúdo</p>
        </div>
        <span className="badge neutral">{periodLabel}</span>
      </div>
      <div className="bar-chart">
        <div className="chart-axis">
          {axis.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="chart-columns">
          {data.map((item) => (
            <div className="chart-column" key={item.title}>
              <div className="bar-track">
                <div
                  className={`chart-bar ${item.color}`}
                  style={{ height: `${(item.hours / maxHours) * 100}%` }}
                >
                  <span>{item.hours}h</span>
                </div>
              </div>
              <small>{item.title}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
