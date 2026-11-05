import type { User } from "@/interfaces";
import { DEFAULT_TRACK_ID } from "./trackService";

export const DEFAULT_USER: User = {
  name: "Lucas Oliveira",
  email: "lucas.oliveira@email.com",
  trackId: DEFAULT_TRACK_ID,
};

export const EMPTY_USER: User = {
  name: "",
  email: "",
  trackId: DEFAULT_TRACK_ID,
};

export const MIN_PASSWORD_LENGTH = 8;

/** Iniciais exibidas no avatar (ex.: "Lucas Oliveira" → "LO"). */
export function getInitials(name: string): string {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("") || "AT"
  );
}

export function getFirstName(name: string): string {
  return name.split(" ")[0] || "estudante";
}
