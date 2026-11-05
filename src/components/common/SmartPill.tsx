import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function SmartPill({ children, iconSize = 15 }: { children: ReactNode; iconSize?: number }) {
  return (
    <span className="smart-pill">
      <Icon name="spark" size={iconSize} /> {children}
    </span>
  );
}
