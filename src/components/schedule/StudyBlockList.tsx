import type { StudyBlock } from "@/interfaces";
import { formatDuration } from "@/services/formatService";
import { getBreakBefore } from "@/services/scheduleService";
import { Icon } from "../common/Icon";

interface StudyBlockListProps {
  blocks: StudyBlock[];
  completedIds: string[];
  onToggle: (blockId: string) => void;
  /** Versão resumida usada na tela inicial (sem pausas e com horário no subtítulo). */
  compact?: boolean;
}

export function StudyBlockList({
  blocks,
  completedIds,
  onToggle,
  compact = false,
}: StudyBlockListProps) {
  return (
    <div className={`study-blocks ${compact ? "compact" : ""}`}>
      {blocks.map((block, index) => {
        const done = completedIds.includes(block.id);
        const pause = compact ? null : getBreakBefore(blocks, index);
        const duration = formatDuration(block.durationMinutes);
        return (
          <div key={block.id}>
            {pause && (
              <div className="break-line">
                <Icon name="coffee" size={16} />
                <span>
                  {pause.startTime} – {pause.endTime}
                </span>{" "}
                Pausa
                <span className="break-duration">
                  {formatDuration(pause.durationMinutes)}
                </span>
              </div>
            )}
            <div className={`study-block ${done ? "is-done" : ""}`}>
              <button
                className={`check-control ${done ? "checked" : ""}`}
                role="checkbox"
                aria-checked={done}
                aria-label={`Concluir ${block.title}`}
                onClick={() => onToggle(block.id)}
              >
                {done && <Icon name="check" size={15} />}
              </button>
              <span className={`subject-icon ${block.color}`}>
                <Icon name={block.icon} size={21} />
              </span>
              <div className="block-copy">
                <h3>{block.title}</h3>
                <p>
                  {compact ? (
                    <>
                      <Icon name="clock" size={12} /> {block.startTime}{" "}
                      <span>·</span> {duration}
                    </>
                  ) : (
                    block.topic
                  )}
                </p>
              </div>
              {compact ? (
                <span
                  className={`badge ${done ? "green" : block.isSrsReview ? "purple" : "neutral"}`}
                >
                  {done
                    ? "Concluído"
                    : block.isSrsReview
                      ? "Revisão SRS"
                      : "A fazer"}
                </span>
              ) : (
                <div className="block-meta">
                  <span className={`badge ${block.color}`}>
                    {done ? "Concluído" : block.tag}
                  </span>
                  <span>
                    {block.startTime} · {duration}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
