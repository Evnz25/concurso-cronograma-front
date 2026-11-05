import type { IconName } from "./Icon";

/** Trilhas de estudo disponíveis (RF05). */
export type TrackId = "development" | "infrastructure" | "data" | "security" | "governance";

export interface Track {
  id: TrackId;
  name: string;
  /** Nome curto usado em listagens compactas. */
  shortName: string;
  detail: string;
  icon: IconName;
}
