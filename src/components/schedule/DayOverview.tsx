import type { DayPlan } from "@/interfaces";
import { Icon } from "../common/Icon";

interface DayOverviewProps {
  plan: DayPlan;
  onBackToToday: () => void;
}

/** Conteúdo exibido quando o dia selecionado não é o dia atual. */
export function DayOverview({ plan, onBackToToday }: DayOverviewProps) {
  return (
    <section className="panel future-day">
      <Icon name={plan.status === "rest" ? "coffee" : "calendar"} size={40} />
      <h3>{plan.emptyTitle}</h3>
      <p>{plan.emptyDescription}</p>
      {plan.extraInfo && <p>{plan.extraInfo}</p>}
      <button className="text-button" onClick={onBackToToday}>
        Voltar para hoje <Icon name="arrow" size={16} />
      </button>
    </section>
  );
}
