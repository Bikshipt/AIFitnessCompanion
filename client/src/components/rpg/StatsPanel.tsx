import type { Stats } from "@shared/rpg";

interface Props {
  level: number;
  xp: number;
  stats: Stats;
}

export default function StatsPanel({ level, xp, stats }: Props) {
  const entries = Object.entries(stats);
  return (
    <div className="rounded-lg border bg-card text-card-foreground p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">Level {level}</div>
        <div className="text-sm text-muted-foreground">XP: {xp}</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {entries.map(([k, v]) => (
          <div key={k} className="rounded-md bg-muted p-2">
            <div className="text-xs text-muted-foreground">{k}</div>
            <div className="text-base font-medium">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


