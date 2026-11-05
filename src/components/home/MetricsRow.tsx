import { formatNumber } from "@/services/formatService";
import { Icon } from "../common/Icon";

const SPARKLINE = [20, 35, 26, 45, 38, 54, 62, 48, 70, 61, 82, 98];

interface MetricsRowProps {
  studyHours: number;
  questionsSolved: number;
  accuracyPercent: number;
}

export function MetricsRow({ studyHours, questionsSolved, accuracyPercent }: MetricsRowProps) {
  return (
    <div className="metrics-row">
      <div className="metric-card">
        <div className="metric-top">
          <span className="metric-label">Tempo de estudo</span>
          <span className="metric-icon purple">
            <Icon name="clock" size={18} />
          </span>
        </div>
        <div className="metric-value">
          {formatNumber(studyHours)}
          <span>h</span>
          <small className="positive">
            <Icon name="trend" size={12} /> 18%
          </small>
        </div>
        <p>nesta semana</p>
        <div className="metric-sparkline purple-bars">
          {SPARKLINE.map((height, i) => (
            <i key={i} style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-top">
          <span className="metric-label">Questões resolvidas</span>
          <span className="metric-icon blue">
            <Icon name="book" size={18} />
          </span>
        </div>
        <div className="metric-value">
          {questionsSolved}
          <small className="positive">
            <Icon name="trend" size={12} /> 24%
          </small>
        </div>
        <p>continue nesse ritmo</p>
        <div className="tiny-chart">
          <svg viewBox="0 0 150 38" preserveAspectRatio="none">
            <path
              d="M0 34 15 30 28 33 43 22 57 24 71 15 85 18 101 10 116 13 130 4 150 1"
              fill="none"
              stroke="#6c98dd"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-top">
          <span className="metric-label">Taxa de acertos</span>
          <span className="metric-icon green">
            <Icon name="target" size={18} />
          </span>
        </div>
        <div className="metric-value">
          {accuracyPercent}
          <span>%</span>
          <small className="positive">+5%</small>
        </div>
        <p>acima da semana passada</p>
        <div className="metric-progress">
          <span />
        </div>
      </div>
    </div>
  );
}
