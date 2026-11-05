import type { Track } from "@/interfaces";
import { Icon } from "../common/Icon";

interface TrackCardProps {
  track: Track;
  progressPercent: number;
  onEdit: () => void;
  onExplore: () => void;
}

export function TrackCard({ track, progressPercent, onEdit, onExplore }: TrackCardProps) {
  return (
    <section className="panel focus-card">
      <div className="section-heading">
        <h2>Sua trilha</h2>
        <button aria-label="Editar trilha" onClick={onEdit}>
          <Icon name="settings" size={17} />
        </button>
      </div>
      <span className="focus-icon">
        <Icon name={track.icon} size={24} />
      </span>
      <h3>{track.name}</h3>
      <div className="track-progress">
        <span />
      </div>
      <div className="track-caption">
        <span>Seu progresso na trilha</span>
        <strong>{progressPercent}%</strong>
      </div>
      <button className="text-button" onClick={onExplore}>
        Explorar meu desempenho <Icon name="arrow" size={15} />
      </button>
    </section>
  );
}
