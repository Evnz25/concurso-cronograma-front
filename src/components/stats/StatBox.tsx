import type { ReactNode } from "react";
import type { ColorTone, IconName } from "@/interfaces";
import { Icon } from "../common/Icon";

interface StatBoxProps {
  icon: IconName;
  color: ColorTone;
  label: string;
  value: ReactNode;
  unit?: string;
  caption: string;
}

export function StatBox({ icon, color, label, value, unit, caption }: StatBoxProps) {
  return (
    <div className="panel stat-box">
      <span className={`metric-icon ${color}`}>
        <Icon name={icon} />
      </span>
      <p>{label}</p>
      <strong>
        {value}
        {unit && <small>{unit}</small>}
      </strong>
      <span className="positive">{caption}</span>
    </div>
  );
}
