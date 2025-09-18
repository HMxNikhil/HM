import React from "react";

export default function Progress({ steps, current = 0 }: { steps: string[]; current?: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-background/60 p-4">
      <ol className="space-y-3">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={s} className="flex items-center gap-3">
              <div className={`h-8 w-8 flex items-center justify-center rounded-full ${done ? 'bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white' : active ? 'border border-white/10 bg-background text-foreground' : 'border border-white/10 text-muted-foreground'}`}>
                {done ? '✓' : i + 1}
              </div>
              <div>
                <div className={`text-sm ${active ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{s}</div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
