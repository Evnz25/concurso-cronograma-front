import type { AccuracySummary } from "@/interfaces";

interface AccuracyChartProps {
  accuracy: AccuracySummary;
  /** Percentual exato usado no preenchimento do gráfico. */
  ratio: number;
}

export function AccuracyChart({ accuracy, ratio }: AccuracyChartProps) {
  return (
    <section className="panel accuracy-panel">
      <h2>Aprendizado em evolução</h2>
      <p>Distribuição das respostas</p>
      <div
        className="accuracy-ring"
        style={{ background: `conic-gradient(#b39ad5 0 ${ratio}%, #f1e5df 0)` }}
      >
        <div>
          <strong>
            {accuracy.percent}
            <span>%</span>
          </strong>
          <small>de acertos</small>
        </div>
      </div>
      <div className="accuracy-legend">
        <span>
          <i />
          Acertos <strong>{accuracy.hits}</strong>
        </span>
        <span>
          <i />
          Erros <strong>{accuracy.errors}</strong>
        </span>
      </div>
    </section>
  );
}
