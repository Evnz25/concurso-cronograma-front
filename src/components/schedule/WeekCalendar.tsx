import type { WeekDay } from "@/interfaces";

interface WeekCalendarProps {
  monthLabel: string;
  weekNumber: number;
  days: WeekDay[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export function WeekCalendar({
  monthLabel,
  weekNumber,
  days,
  selectedDay,
  onSelectDay,
}: WeekCalendarProps) {
  return (
    <section className="panel calendar-panel">
      <div className="section-heading">
        <h2>{monthLabel}</h2>
        <span className="muted">Semana {weekNumber}</span>
      </div>
      <div className="week-days">
        {days.map((day) => (
          <button
            className={`${selectedDay === day.day ? "selected" : ""} ${day.isPast ? "past" : ""}`}
            onClick={() => onSelectDay(day.day)}
            key={day.label}
          >
            <span>{day.label}</span>
            <strong>{day.day}</strong>
            <i className={day.hasStudy ? "has-study" : ""} />
          </button>
        ))}
      </div>
    </section>
  );
}
