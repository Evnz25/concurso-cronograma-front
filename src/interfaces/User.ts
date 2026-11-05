import type { TrackId } from "./Track";

export interface User {
  name: string;
  email: string;
  trackId: TrackId;
}

/** Dados editáveis no formulário de perfil (RF01, RF02). */
export interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}
