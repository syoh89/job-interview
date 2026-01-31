type ActivityDay = {
  day: number;
  level: 0 | 1 | 2 | 3;
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const activity: ActivityDay[] = [
  { day: 1, level: 1 },
  { day: 2, level: 2 },
  { day: 3, level: 0 },
  { day: 4, level: 3 },
  { day: 5, level: 2 },
  { day: 6, level: 1 },
  { day: 7, level: 0 },
  { day: 8, level: 2 },
  { day: 9, level: 1 },
  { day: 10, level: 3 },
  { day: 11, level: 0 },
  { day: 12, level: 2 },
  { day: 13, level: 1 },
  { day: 14, level: 2 },
  { day: 15, level: 3 },
  { day: 16, level: 2 },
  { day: 17, level: 1 },
  { day: 18, level: 0 },
  { day: 19, level: 2 },
  { day: 20, level: 1 },
  { day: 21, level: 3 },
  { day: 22, level: 0 },
  { day: 23, level: 1 },
  { day: 24, level: 2 },
  { day: 25, level: 3 },
  { day: 26, level: 1 },
  { day: 27, level: 0 },
  { day: 28, level: 2 },
];

const levelStyles = {
  0: "bg-surface",
  1: "bg-accent-soft",
  2: "bg-accent/40",
  3: "bg-accent",
} as const;

export default function StarryActivityCalendar() {
  return (
    <section className="rounded-card border border-border-subtle bg-surface-elevated p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            Activity Calendar
          </p>
          <h2 className="mt-2 text-xl font-semibold text-text-primary">이달의 활동 기록</h2>
        </div>
        <span className="rounded-full border border-border-subtle px-3 py-1 text-xs font-medium text-text-muted">
          January
        </span>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-2 text-xs text-text-muted">
        {weekDays.map((day) => (
          <span key={day} className="text-center font-medium">
            {day}
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-7 gap-2">
        {activity.map((item) => (
          <div
            key={item.day}
            className={`flex h-10 items-center justify-center rounded-lg border border-border-subtle text-xs font-semibold text-text-primary ${levelStyles[item.level]}`}
          >
            {item.day}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs text-text-muted">
        <span>낮음</span>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-surface border border-border-subtle" />
          <span className="h-2 w-2 rounded-full bg-accent-soft" />
          <span className="h-2 w-2 rounded-full bg-accent/40" />
          <span className="h-2 w-2 rounded-full bg-accent" />
        </div>
        <span>높음</span>
      </div>
    </section>
  );
}
