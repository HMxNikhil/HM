export default function ProgressTracker({ step = 0 }: { step?: number }) {
  const steps = ['Theme', 'Idea', 'Architecture', 'Code', 'Docs'];
  return (
    <div className="rounded-lg border border-white/10 bg-background/60 p-4">
      <h4 className="text-sm font-semibold">Progress</h4>
      <ol className="mt-4 space-y-3">
        {steps.map((s, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li key={s} className="flex items-center gap-3">
              <span className={`h-8 w-8 flex items-center justify-center rounded-full ${done ? 'bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white' : active ? 'border border-white/10 bg-background text-foreground' : 'border border-white/10 text-muted-foreground'}`}>{done ? '✓' : i + 1}</span>
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
