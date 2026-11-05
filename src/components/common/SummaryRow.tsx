import type { ReactNode } from "react";

interface SummaryRowProps {
  label: ReactNode;
  value: ReactNode;
}

export function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="summary-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
