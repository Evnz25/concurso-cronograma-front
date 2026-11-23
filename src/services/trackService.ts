import type { Track, TrackId } from "@/interfaces";

export const DEFAULT_TRACK_ID: TrackId = "trilha-dev";

export const BACKEND_DEFAULT_TRACKS: Track[] = [
  {
    id: "trilha-dev",
    name: "Desenvolvimento",
    shortName: "Desenvolvimento",
    detail: "Lógica de Programação · Engenharia de Software · Banco de Dados",
    icon: "code",
  },
  {
    id: "trilha-redes",
    name: "Redes/Infraestrutura",
    shortName: "Redes",
    detail: "Redes de Computadores",
    icon: "server",
  },
  {
    id: "trilha-dados",
    name: "Dados",
    shortName: "Dados",
    detail: "Banco de Dados",
    icon: "database",
  },
  {
    id: "trilha-seg",
    name: "Segurança",
    shortName: "Segurança",
    detail: "Segurança da Informação e Defesa Cibernética",
    icon: "shield",
  },
  {
    id: "trilha-gov",
    name: "Governança",
    shortName: "Governança",
    detail: "Governança e Gestão de TI",
    icon: "briefcase",
  },
];

export function getTracks(customTracks?: Track[]): Track[] {
  return customTracks && customTracks.length > 0 ? customTracks : BACKEND_DEFAULT_TRACKS;
}

export function getTrackById(id: TrackId, tracks: Track[] = []): Track {
  const list = tracks.length > 0 ? tracks : BACKEND_DEFAULT_TRACKS;
  return (
    list.find((track) => track.id === id) ||
    list.find((track) => track.id === DEFAULT_TRACK_ID) ||
    list[0]
  );
}
