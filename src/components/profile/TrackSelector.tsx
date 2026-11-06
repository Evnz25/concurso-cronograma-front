import type { Track, TrackId } from "@/interfaces";
import { Icon } from "../common/Icon";

interface TrackSelectorProps {
  tracks: Track[];
  selectedId: TrackId;
  onSelect: (trackId: TrackId) => void;
}

/** Seleção de trilha de estudo (RF05). */
export function TrackSelector({
  tracks,
  selectedId,
  onSelect,
}: TrackSelectorProps) {
  return (
    <div className="track-selection">
      <h2>Qual é sua trilha?</h2>
      <div className="track-options">
        {tracks.map((track) => {
          const selected = track.id === selectedId;
          return (
            <button
              type="button"
              role="radio"
              aria-checked={selected}
              className={`track-option ${selected ? "selected" : ""}`}
              onClick={() => onSelect(track.id)}
              key={track.id}
            >
              <span className="subject-icon purple">
                <Icon name={track.icon} size={22} />
              </span>
              <span>
                <strong>{track.name}</strong>
                <small>{track.detail}</small>
              </span>
              <span className="track-radio">{selected && <span />}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
