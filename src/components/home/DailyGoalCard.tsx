import type { CSSProperties } from "react";
import { formatDuration } from "@/services/formatService";
import { Icon } from "../common/Icon";

interface DailyGoalCardProps {
  completedMinutes: number;
  plannedMinutes: number;
  goalPercent: number;
  completedBlocks: number;
  totalBlocks: number;
}

export function DailyGoalCard({
  completedMinutes,
  plannedMinutes,
  goalPercent,
  completedBlocks,
  totalBlocks,
}: DailyGoalCardProps) {
  const hours = Math.floor(completedMinutes / 60);
  const minutes = completedMinutes % 60;
  return (
    <section className="panel daily-goal">
      <div className="section-heading">
        <h2>Meta diária</h2>
        <Icon name="target" size={19} />
      </div>
      <div
        className="goal-ring"
        style={{ "--progress": `${goalPercent}%` } as CSSProperties}
      >
        <div>
          <strong>
            {hours}
            <span>h</span>
            {minutes ? ` ${minutes}` : ""}
            <span>{minutes ? "min" : ""}</span>
          </strong>
          <p>de {formatDuration(plannedMinutes)} planejadas</p>
        </div>
      </div>
      <div className="goal-stats">
        <span>
          <strong>
            {completedBlocks}
            <small>/ {totalBlocks}</small>
          </strong>
          <small>blocos concluídos</small>
        </span>
        <span>
          <strong>
            {Math.round(goalPercent)}
            <small>%</small>
          </strong>
          <small>da meta de hoje</small>
        </span>
      </div>
    </section>
  );
}
