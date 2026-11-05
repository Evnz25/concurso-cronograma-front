import type { Track, TrackId } from "@/interfaces";
import { TRACKS } from "./mocks/data";

export const DEFAULT_TRACK_ID: TrackId = "development";

export function getTracks(): Track[] {
  return TRACKS;
}

export function getTrackById(id: TrackId): Track {
  return TRACKS.find((track) => track.id === id) ?? TRACKS[0];
}
